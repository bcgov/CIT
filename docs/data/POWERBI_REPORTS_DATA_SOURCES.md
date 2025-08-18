# 📊 Power BI Report Data Flow

We have 2 main report segments in Power BI at the moment:  
This document provides an understanding of the **data tables directly used** by each report page.

- **Overview**  
  Has 5 pages:
  - Connectivity
  - Assets & Infrastructure
  - Economic
  - Social
  - Print
- **Internal – BCA**

---

## Filters on All Pages

The following filters work for all reports (passed from the React app):

- `zone_type` (e.g., All of British Columbia, Community, etc.)
- `zone_name` (e.g., Abbotsford)
- `zone_id`

> `Region Distribution` and `Census Profile URLs` are used for the purpose of filters.

---

## Report: Internal – BCA

This report has a single page. `BC ASSESSMENT`
**Main Power BI tables used:**

- `BCA Census Subdivision`
- `Agricultural Land Reserve`
- `Region Distribution` and `Dim Census Subdivision` (drives page filters like zone_type, zone_name, zone_id and is referenced in measures, e.g., via SELECTEDVALUE('Region Distribution'[zone_type]))
  Dimension table links to your fact tables like BCA Census Subdivision, Agricultural Land Reserve, etc.

---

### Data Mapping Table

| SECTION     | Table                                                             | Visual                         | Field(s)                                                                                                                                                                                                      |
| ----------- | ----------------------------------------------------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Industrial  | BCA Census Subdivision (`actual_use_code_category='Industrial'`)  | Industrial Parcels by Size     | `SUM(number_properties_5to25_acres)`, `SUM(number_properties_lt5_acres)`, `SUM(number_properties_gt25_acres)`                                                                                                 |
|             |                                                                   | Industrial Land Utilization    | `SUM(number_underutilized_property) / [Total Properties - Utilization]`, `SUM(number_utilized_property) / [Total Properties - Utilization]`, `SUM(number_vacant_property) / [Total Properties - Utilization]` |
|             |                                                                   | Average Industrial Land Value  | `AVERAGE(average_land_value)`                                                                                                                                                                                 |
|             |                                                                   | Average Land Value per Acre    | `AVERAGE(average_land_value) / AVERAGE(average_land_area_acres)`                                                                                                                                              |
|             |                                                                   | Total Land Area in Acres       | `COALESCE(SUM(Total Land Area))`                                                                                                                                                                              |
| Farm        | BCA Census Subdivision (`actual_use_code_category='Farm'`)        | Average Farm Land Value        | `AVERAGE(average_land_value)`                                                                                                                                                                                 |
|             |                                                                   | Average Land Value per Acre    | `AVERAGE(average_land_value) / AVERAGE(average_land_area_acres)`                                                                                                                                              |
|             |                                                                   | Total Land Area in Acres       | `SUM(Total Land Area)`                                                                                                                                                                                        |
|             |                                                                   | Farm Parcels by Size           | `SUM(number_properties_5to25_acres)`, `SUM(number_properties_lt5_acres)`, `SUM(number_properties_gt25_acres)`                                                                                                 |
|             | Agricultural Land Reserve, Region Distribution                    | Agricultural Land Reserve      | `SUM('Agricultural Land Reserve'[feature_area_sqm]) / 1000000` where `Region Distribution'[zone_type] = "Regional District"`                                                                                  |
|             |                                                                   | % of Province                  | `DIVIDE([ALR Land Area Sqkm], [Province Area Sqkm])`                                                                                                                                                          |
| Residential | BCA Census Subdivision (`actual_use_code_category='Residential'`) | Average Residential Land Value | `AVERAGE(average_land_value)`                                                                                                                                                                                 |
|             |                                                                   | Average Land Value per Acre    | `AVERAGE(average_land_value) / AVERAGE(average_land_area_acres)`                                                                                                                                              |
|             |                                                                   | Number of Residential Sales    | `number_of_sales_24mo - number_of_sales_12mo`, `number_of_sales_60mo - number_of_sales_24mo`, `number_of_sales_12mo - number_of_sales_6mo`, `number_of_sales_6mo`                                             |
| Commercial  | BCA Census Subdivision (`actual_use_code_category='Commercial'`)  | Average Commercial Land Value  | `AVERAGE(average_land_value)`                                                                                                                                                                                 |
|             |                                                                   | Total Sqft Commercial          | `SUM(average_area_sqft_comm)`                                                                                                                                                                                 |
|             |                                                                   | Average Land Value per Acre    | `AVERAGE(average_land_value) / AVERAGE(average_land_area_acres)`                                                                                                                                              |
|             |                                                                   | # of Commercial Buildings      | `SUM(number_commercial_bldgs)`                                                                                                                                                                                |

---

## Report: Overview

### Page 1: Connectivity

- `Region Distribution` and `Dim Census Subdivision` (drives page filters like zone_type, zone_name, zone_id and is referenced in measures, e.g., via SELECTEDVALUE('Region Distribution'[zone_type]))

> **Other filters in page:**  
> Filters by year (2016 and 2021 for `Census Demographics`)

**Main Power BI tables used:**

- `Census`
- `Connectivity`
- `Service`
- `Connectivity Projects`

**Data Mapping Table:**

| SECTION               | Table                                                   | Visual                              | Field                                                                | Filters/Remarks    |
| --------------------- | ------------------------------------------------------- | ----------------------------------- | -------------------------------------------------------------------- | ------------------ |
| Census Demographics   | Census<br>Region Distribution<br>Dim Census Subdivision | Total Population                    | `pop_total_census`                                                   |                    |
|                       |                                                         | Population Change %                 | `(pop_total_census - pop_total_prev_census) / pop_total_prev_census` |                    |
|                       |                                                         | Provincial Pop Change %             | same formula without region filters (province-wide)                  |                    |
|                       |                                                         | Median Age                          | `Census[pop_median_age]`                                             |                    |
|                       |                                                         | Province Median Age                 | hardcoded values for year                                            |                    |
|                       |                                                         | Median Household Income             | `hshld_income_median`                                                | year-based default |
|                       |                                                         | Prov. Median Household Income       | hardcoded values for year                                            |                    |
| Connectivity          | Connectivity                                            | Households with 50/10 Connection    | `SUM(totalconnected)`                                                | year = 2021        |
|                       |                                                         | Total households in selected region | `SUM(totalhouseholds)`                                               |                    |
|                       |                                                         | Connected HouseHolds                | `SUM(totalconnected)`, `SUM(totalhouseholds)`                        |                    |
| Network Services      | Service                                                 | Available Services in the area      | ISP name/count                                                       |                    |
|                       |                                                         | Service Providers in the area       | ISP name                                                             | year = 2021        |
| Connectivity Projects | Connectivity Projects                                   | Table                               | `project_name`, `proponent`, `status`, `Project Benefits`            | year = 2021        |

---

### Page 2: Assets & Infrastructure

> **Other filters in page:**
>
> Filters by year (2016 and 2021 for `Census Demographics`)
> Facility Selector/Slicer bound to Dim Location Type
> `Dim Location Type` (1) ──► (∗) `Location` (via Location Type key).

**Main Power BI tables used:**

- `Location`
- `*Dim Location Type*`

**Data Mapping Table:**

| SECTION           | Table                         | Visual                                                                              | Field                                                     | Filters/Remarks                                  |
| ----------------- | ----------------------------- | ----------------------------------------------------------------------------------- | --------------------------------------------------------- | ------------------------------------------------ |
| Health            | Location                      | Hospitals                                                                           | `SUM(Hospitals)`                                          |                                                  |
|                   |                               | Pharmacies                                                                          | `SUM(Pharmacies)`                                         |                                                  |
|                   |                               | Laboratory Service                                                                  | `SUM(Laboratory Service)`                                 |                                                  |
|                   |                               | Diagnostic Facilities                                                               | `SUM(Diagnostic Facilities)`                              |                                                  |
|                   |                               | Clinics                                                                             | `SUM(Clinics)`                                            |                                                  |
| Transportation    | Location                      | Port And Terminal                                                                   | `SUM(Port And Terminal)`                                  |                                                  |
|                   |                               | Customs Ports Of Entry                                                              | `SUM(Customs Ports Of Entry)`                             |                                                  |
|                   |                               | Airports                                                                            | `SUM(Airports)`                                           |                                                  |
| Public            | Location                      | Emergency Social Service Facilities                                                 | `SUM(Emergency Social Service Facilities)`                |                                                  |
|                   |                               | Civic Facilities                                                                    | `SUM(Civic Facilities)`                                   |                                                  |
|                   |                               | Courts                                                                              | `SUM(Courts)`                                             |                                                  |
|                   |                               | Service BC Locations                                                                | `SUM(Service BC Locations)`                               |                                                  |
|                   |                               | Local Govt Offices                                                                  | `SUM(Local Govt Offices)`                                 |                                                  |
|                   |                               | First Responders                                                                    | `SUM(First Responders)`                                   |                                                  |
|                   |                               | Public Library                                                                      | `SUM(Public Library)`                                     |                                                  |
| Education         | Location                      | Similar calculation to above                                                        |                                                           |                                                  |
| Facility Selector | Dim Location Type             | Distinct list of location types (excludes "Major Projects" and "Timber Facilities") |                                                           | Bound to `Dim Location Type[Location Type Desc]` |
| Facility Map      | Location<br>Dim Location Type |                                                                                     | `Location Name`, `Location Type`, `Latitude`, `Longitude` | `Dim Location Type` links to `Location`          |

---

### Page 3: Economic

> **Other filters in page**

> Filters by year (2016 and 2021 for `Census Demographics`, `Income` and `Housing`)

**Main Power BI tables used:**

- `Census`
- `Census Attributes`
- `Business by Census`
- `Project`

**Data Mapping Table:**

| SECTION                               | Table                       | Visual                                     | Field                                                                    | Filters/Remarks |
| ------------------------------------- | --------------------------- | ------------------------------------------ | ------------------------------------------------------------------------ | --------------- |
| Summary Left                          | Census                      | Labour Force                               | `SUM(labour_force_total)` for 2016 & 2021                                |                 |
|                                       |                             | Labour Force Participation                 | calculated from labour force and working-age population                  |                 |
|                                       |                             | Unemployment Rate                          | derived from unemployed/ labour force                                    |                 |
|                                       |                             | Employment Rate                            | derived from employed / working-age population                           |                 |
| Summary Right (province wide)         | Census                      | Province-wide Labour Force & Participation | same as above but without region/zone filters                            |                 |
| Labour Force by Occupation            | Census Attributes<br>Census | Graph                                      | `Category = "Occupation"`                                                |                 |
| Labour Force by Industry              | Census Attributes<br>Census | Graph                                      | `Category = "Industry"`                                                  |                 |
| Educational Attainment                | Census Attributes<br>Census | Graph                                      | `Category = "Education"`                                                 |                 |
| Employment in Resource Sectors        | Census                      | Resource Sector %                          | `(SUM(industry_agriculture) + SUM(industry_mining)) / SUM(num_employed)` |                 |
| Top Industries by Business Count      | Business by Census          | Graph                                      | Top 5 NAICS two-digit codes by business count                            |                 |
| Share of Business in Resource Sectors | Business by Census          | Graph                                      | Sectors `NAIC=11` and `NAIC=21` as % of total                            |                 |
| Top Major Projects by Project Type    | Project                     | Graph                                      | Project counts by type, top 10                                           |                 |

---

### Page 4: Social

**Main Power BI tables used:**

- `Census`
- `Census Attributes`
- `Housing`
- `Census_Population_Age` _(Derived from Census)_

**Data Mapping Table:**

| SECTION             | Table                           | Visual                       | Field                                                                            | Filters/Remarks |
| ------------------- | ------------------------------- | ---------------------------- | -------------------------------------------------------------------------------- | --------------- |
| Census Demographics | Census                          | Summary                      | `SUM(labour_force_total)` for 2016 & 2021, growth %, etc.                        |                 |
| Social              | Census<br>Census_Population_Age | Population by Age and Gender | Age groups by gender with region/year filters                                    |                 |
|                     | Census                          | Visible Minorities           | `pop_total_census` - `(visible_minority_num_male + visible_minority_num_female)` |                 |
|                     | Census                          | Indigenous Identification    | `aboriginal_identity` and complement                                             |                 |
| Income              | Census Attributes               | Total Income Distribution    | `Category = "Income"`                                                            |                 |
|                     |                                 | Total Low-Income Status      | `Category = "Low Income"`                                                        |                 |
| Housing             | Census                          |                              | Building permits, housing variables                                              |                 |
| Building Permits    | Housing                         |                              | Permit counts and types                                                          |                 |

---

## Report: CS

This report has a single page. `Criteria Search`
**Main Power BI tables used:**

- `Census`
- `Connectivity`
- `Dim Communities`
- `Dim Census Subdivision`
- `Region Distribution` and `Dim Census Subdivision` (drives page filters like zone_type, zone_name, zone_id and is referenced in measures, e.g., via SELECTEDVALUE('Region Distribution'[zone_type]))
  Dimension table links to your fact tables like BCA Census Subdivision, Agricultural Land Reserve, etc.

### Data Mapping Table

| SECTION      | Table                                   | Visual                              |
| ------------ | --------------------------------------- | ----------------------------------- |
| Map          | Dim Census Subdivision                  | Map                                 |
|              | Dim Census Subdivision, Dim Communities | Census Subdivisions and Communities |
| Demographics | Census, Connectivity                    | Averages                            |

---

## Report: Compare

This report has a single page. `Compare`

> Uses the some common components from Overview Report in a comparision view
