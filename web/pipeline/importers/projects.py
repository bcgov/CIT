import csv
import os
import re

from pipeline.importers.utils import import_data_into_point_model
from pipeline.models.location_assets import Project
from pipeline.utils import get_quarterly_date_str_as_date

ALTERNATIVE_FIELD_NAMES = {
    "projid": "project_id",
    "projnm": "project_name",
    "projtyp": "project_type",
    "projecttype": "project_type",
    "description": "project_description",
    "desc": "project_description",
    "muninm": "municipality",
    "dvlprnm": "developer",
    "industry construction classification": "construction_subtype",
    "estcost ($million)": "estimated_cost",
    "est cost ($million)": "estimated_cost",
    "estcost": "estimated_cost",
    "est cost ($million": "estimated_cost",
    "est cost (mil)": "estimated_cost",
    "status": "project_status",
    "stage": "project_stage",
    "public": "public_funding_ind",
    "green building": "green_building_ind",
    "clean energy": "clean_energy_ind",
    "first_nation_ind": "indigenous_ind",
    "first nation": "indigenous_ind",
    "first_nation_name": "indigenous_names",
    "first_nation_names": "indigenous_names",
    "first_nation_agreement": "indigenous_agreement",
    "update_activity": "updated_fields",
    "start date": "start_date",
    "start": "start_date",
    "completion date": "completion_date",
    "compl": "completion_date",
    "complete": "completion_date",
    "finish date": "completion_date",
    "finish": "completion_date",
}

QUARTERS_MAP = {
    "late": "Q4",
    "fall": "Q4",
    "summer": "Q3",
    "spring": "Q2",
    "early": "Q1",
    "dec": "Q4",
    "oct": "Q4",
    "nov": "Q4",
    "sep": "Q3",
    "aug": "Q3",
    "jul": "Q3",
    "jun": "Q2",
    "may": "Q2",
    "apr": "Q2",
    "april": "Q2",
    "mar": "Q1",
    "march": "Q1",
    "feb": "Q1",
    "jan": "Q1",
}

QUARTER_PATTERN = r'^Q[1-4]$'


def import_projects(dir_path):
    directory = os.fsencode(dir_path)

    for file in sorted(os.listdir(directory), reverse=True):
        filename = os.fsdecode(file)
        if filename.endswith(".csv"):
            print("filename", filename)

            with open(os.path.join(dir_path, filename), mode='r', encoding='utf-8-sig', errors='ignore') as f:

                skip_projects_csv_preamble_rows(f)
                reader = csv.DictReader(f)
                data = list(reader)

                for row in data:
                    project = normalize_projects_field_names(row)
                    project = handle_projects_fields_edge_cases(project, filename)

                    print("project", project)

                    instance = import_data_into_point_model("projects", Project, project, dry_run=True)
                    print("instance", instance)


def skip_projects_csv_preamble_rows(file):
    while True:
        last_pos = file.tell()
        line = file.readline()
        non_null_fields = [field for field in line.strip().split(",") if field != '']
        if len(non_null_fields) > 10:
            break

    file.seek(last_pos)


def normalize_projects_field_names(row):
    project = {}

    field_names_to_replace = [key for key in row.keys() if key.lower() in ALTERNATIVE_FIELD_NAMES]
    for field_name in field_names_to_replace:
        field_value = row.pop(field_name)
        canonical_field_name = ALTERNATIVE_FIELD_NAMES[field_name.lower()]
        row[canonical_field_name] = field_value

    # normalize all field names
    for key in row.keys():
        normalized_key = key.upper().replace(" ", "_").replace(":", "").strip()
        project[normalized_key] = row[key]

        # deal with annoying edge cases
        if ":" in project[normalized_key]:
            project[normalized_key] = project[normalized_key].split(":")[-1].strip()

        if project[normalized_key] == '':
            project[normalized_key] = None

    return project


def handle_projects_fields_edge_cases(project, filename):
    if "LAST_UPDATE" not in project.keys():
        project["LAST_UPDATE"] = get_last_update_field_from_filename(filename)

    # TODO clean standardized dates (enforce YYYY-Q[1-4] format)

    if "START_DATE" in project.keys() and "STANDARDIZED_START_DATE" not in project.keys():
        project["STANDARDIZED_START_DATE"] = get_standardized_project_date(project["START_DATE"])

    if "COMPLETION_DATE" in project.keys() and "STANDARDIZED_COMPLETION_DATE" not in project.keys():
        project["STANDARDIZED_COMPLETION_DATE"] = get_standardized_project_date(project["COMPLETION_DATE"])

    # if a project is missing the lat/lon columns, try to look for other (more recent) years
    # to see if they contain the lat/lon columns. we import project csv files in reverse
    # chronological order, and older years tend to be missing columns.
    if "LATITUDE" not in project.keys() and "LONGITUDE" not in project.keys():
        pass
        existing_projects = Project.objects.filter(
            project_id=project['project_id'],
            latitude__isnull=False, longitude__isnull=False)
        if existing_projects:
            print("existing_projects", existing_projects)
            existing_project = existing_projects.first()
            project['LATITUDE'] = existing_project.latitude
            project['LONGITUDE'] = existing_project.longitude

    return project


def get_standardized_project_date(fuzzy_date):

    match = re.search(r'(.*)(\d{4})$', fuzzy_date)
    if match is None:
        return None

    quarter, year = match.groups()

    # from the data it seems like entries with only a year correspond to Q4
    if not quarter:
        quarter = 'Q4'

    if re.search(QUARTER_PATTERN, quarter):
        quarter_cleaned = quarter
    else:
        quarter_cleaned = QUARTERS_MAP[quarter.strip().lower()] if quarter.strip().lower() in QUARTERS_MAP else None

    if quarter_cleaned:
        return '{}-{}'.format(year, quarter_cleaned)
    else:
        return year


def get_last_update_field_from_filename(filename):
    year, quarter = filename.split(".")[0].split("_")
    quarterly_date_str = "{}-{}".format(year, quarter)
    return get_quarterly_date_str_as_date(quarterly_date_str).strftime("%Y-%m-%d")
