# 📌 Data Source to Database Table Mapping

This document provides the mapping between **Power BI tables** and their corresponding **database tables, views, or files** in the data pipeline.
A more graphical illustration is available in [this Figma board](https://www.figma.com/board/06bnsXwHRwZTNADlvMzvpT/Untitled?node-id=24-834&t=pQJv2Fj3flD3khsW-0).

| **Power BI Table**            | **DB Table(s)**                                                                                  | **DB View(s) / File(s)**                 |
| ----------------------------- | ------------------------------------------------------------------------------------------------ | ---------------------------------------- |
| Post-Secondary Institution    | `pipeline_postsecondaryinstitution`                                                              |                                          |
| Project                       | `pipeline_project`                                                                               |                                          |
| School                        | `pipeline_school`                                                                                |                                          |
| Service                       | `pipeline_service`<br>`pipeline_phdemographicdistribution`                                       |                                          |
| Location                      | `pipeline_location`<br>`pipeline_project`<br>`pipeline_cen_prof_detailed_csd_attrs_sp`           |                                          |
| Natural Resource Region       | `pipeline_naturalresourceregion`                                                                 |                                          |
| Census                        |                                                                                                  | `cit_census_subdivisions_vw`             |
| Agricultural Land Reserve     | `pipeline_agriculturallandreserve`                                                               |                                          |
| Region Distribution           |                                                                                                  | `cit_regions_distribution_vw`            |
| Housing                       | `pipeline_housing_data`                                                                          |                                          |
| Region Distribution 2         |                                                                                                  | `cit_regions_distribution_vw`            |
| Dim Census Subdivision        | `pipeline_linkagewithcensus`<br>`pipeline_regionaldistrict`                                      | `cit_census_subdivisions_vw`             |
| Business by Census            | `pipeline_businessesbycsd`<br>`pipeline_cen_prof_detailed_csd_attrs_sp`<br>`pipeline_naicscodes` |                                          |
| Connectivity                  | `pipeline_phdemographicdistribution`<br>`pipeline_nbdphhspeeds`                                  |                                          |
| Connectivity Projects         | `pipeline_connectivityinfrastructureprojects`<br>`pipeline_community`                            |                                          |
| Census Infrastructure Access  | `pipeline_community`<br>`pipeline_location`<br>`pipeline_locationdistance`                       |                                          |
| Core Housing Needs            | `pipeline_csdcorehousingneed`                                                                    |                                          |
| Small Business Count          | `pipeline_csdsmallbusinesses`                                                                    |                                          |
| Municipal Land Title Transfer | `pipeline_municipallandtitletransfers`                                                           |                                          |
| Municipal Tax Rates           | `pipeline_municipaltaxrates`                                                                     |                                          |
| Dim Communities               | `pipeline_community`                                                                             |                                          |
| BCA Census Subdivision        | `pipeline_bcassessmentcensussubdivision`                                                         |                                          |
| BCA Economic Region           | `pipeline_bcassessmenteconomicregion`                                                            |                                          |
| BCA Regional District         | `pipeline_bcassessmentregionaldistrict`                                                          |                                          |
| Census_Population_Age         | _(Census – see above)_                                                                           |                                          |
| Census Attributes             | _(Census – see above)_                                                                           |                                          |
| Location Lat long             | _(External file)_                                                                                | `c2021_FeatureToPoint_TableToExcel.xlsx` |
| Dim Location Type             | `pipeline_location`                                                                              |                                          |
| Census Location Access        | `pipeline_community`<br>`pipeline_locationdistance`<br>`pipeline_location`                       |                                          |

---

## 📂 Tables Used in Views

The following **database tables** are referenced in **view definitions** used by Power BI reports.

### **1️⃣ cit_regions_distribution_vw**

- `pipeline_cen_prof_detailed_csd_attrs_sp`
- `pipeline_linkagewithcensus`
- `pipeline_regionaldistrict`
- `pipeline_tourismregion`
- `pipeline_censuseconomicregion`
- `pipeline_bcwildfirezone`
- `pipeline_tsunamizone`
- `pipeline_healthauthorityboundary`
- `pipeline_schooldistrict`
- `pipeline_naturalresourceregion`
- `pipeline_community`
- `pipeline_wildfirezone`

---

### **2️⃣ cit_census_subdivisions_vw**

- `pipeline_cen_prof_detailed_csd_attrs_sp`
- `pipeline_census_subdivision_2016`

---

# 📌 Database Objects Used in Power BI

This document provides a **reverse lookup** of all **database objects** (tables, views, and external files) used in Power BI reports, along with the Power BI tables that reference them.

---

## 📂 Database to Power BI Mapping

| **Database Object**                           | **Type**      | **Referenced By Power BI Table(s)**                                                                                         |
| --------------------------------------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `pipeline_postsecondaryinstitution`           | Table         | Post-Secondary Institution                                                                                                  |
| `pipeline_project`                            | Table         | Project, Location                                                                                                           |
| `pipeline_school`                             | Table         | School                                                                                                                      |
| `pipeline_service`                            | Table         | Service                                                                                                                     |
| `pipeline_phdemographicdistribution`          | Table         | Service, Connectivity                                                                                                       |
| `pipeline_location`                           | Table         | Location, Census Infrastructure Access, Dim Location Type, Census Location Access                                           |
| `pipeline_cen_prof_detailed_csd_attrs_sp`     | Table         | Location, Business by Census, cit_regions_distribution_vw, `cit_census_subdivisions_vw`                                     |
| `pipeline_naturalresourceregion`              | Table         | Natural Resource Region, `cit_regions_distribution_vw`                                                                      |
| `pipeline_agriculturallandreserve`            | Table         | Agricultural Land Reserve                                                                                                   |
| `pipeline_linkagewithcensus`                  | Table         | Dim Census Subdivision, `cit_regions_distribution_vw`                                                                       |
| `pipeline_regionaldistrict`                   | Table         | Dim Census Subdivision, `cit_regions_distribution_vw`                                                                       |
| `pipeline_businessesbycsd`                    | Table         | Business by Census                                                                                                          |
| `pipeline_naicscodes`                         | Table         | Business by Census                                                                                                          |
| `pipeline_nbdphhspeeds`                       | Table         | Connectivity                                                                                                                |
| `pipeline_community`                          | Table         | Census Infrastructure Access, Dim Communities, Connectivity Projects, Census Location Access, `cit_regions_distribution_vw` |
| `pipeline_locationdistance`                   | Table         | Census Infrastructure Access, Census Location Access                                                                        |
| `pipeline_csdcorehousingneed`                 | Table         | Core Housing Needs                                                                                                          |
| `pipeline_csdsmallbusinesses`                 | Table         | Small Business Count                                                                                                        |
| `pipeline_municipallandtitletransfers`        | Table         | Municipal Land Title Transfer                                                                                               |
| `pipeline_municipaltaxrates`                  | Table         | Municipal Tax Rates                                                                                                         |
| `pipeline_bcassessmentcensussubdivision`      | Table         | BCA Census Subdivision                                                                                                      |
| `pipeline_bcassessmenteconomicregion`         | Table         | BCA Economic Region                                                                                                         |
| `pipeline_bcassessmentregionaldistrict`       | Table         | BCA Regional District                                                                                                       |
| `pipeline_connectivityinfrastructureprojects` | Table         | Connectivity Projects                                                                                                       |
| `pipeline_tourismregion`                      | Table         | `cit_regions_distribution_vw`                                                                                               |
| `pipeline_censuseconomicregion`               | Table         | `cit_regions_distribution_vw`                                                                                               |
| `pipeline_bcwildfirezone`                     | Table         | `cit_regions_distribution_vw`                                                                                               |
| `pipeline_tsunamizone`                        | Table         | `cit_regions_distribution_vw`                                                                                               |
| `pipeline_healthauthorityboundary`            | Table         | `cit_regions_distribution_vw`                                                                                               |
| `pipeline_schooldistrict`                     | Table         | `cit_regions_distribution_vw`                                                                                               |
| `pipeline_wildfirezone`                       | Table         | cit*regions_distribution_vw *(alternate version)\_                                                                          |
| `pipeline_census_subdivision_2016`            | Table         | `cit_census_subdivisions_vw`                                                                                                |
| **cit_census_subdivisions_vw**                | View          | Census, Dim Census Subdivision, Census Attributes                                                                           |
| **cit_regions_distribution_vw**               | View          | Region Distribution, Region Distribution 2                                                                                  |
| **c2021_FeatureToPoint_TableToExcel.xlsx**    | External File | Location Lat long                                                                                                           |

---

## ✅ Summary

- **Total Unique Database Tables:** 33
- **Total Views:** 2
- **Total External Files:** 1

> These objects represent **all database dependencies for Power BI reports** in this project, consolidated from pipeline data tables, reference lookups, and system views.
