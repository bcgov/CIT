# 📊 Power BI Report Data Flow

We have 2 main report segments in Power BI at the moment:

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

---

## Report: Internal – BCA

This report has a single page.  
**Main Power BI tables used:**

- `BCA Census Subdivision`
- `Agricultural Land Reserve`
- `Region Distribution`

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

> **Other filters in page:**  
> Filters by year (2016 and 2021 for `Census Demographics`)

**Main Power BI tables used:**

- `Census`
- `Connectivity`
- `Service`
- `Connectivity Projects`
- `Dim Census Subdivision`

**Data Mapping Table:**

| SECTION               | Table                                                                                                                                                       | Visual                              | Field                                                              | Filters/Remarks                                                  |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- | ------------------------------------------------------------------ | ---------------------------------------------------------------- |
| Census Demographics   | Census<br><br>Filters by year and region using below tables<br>Region Distribution/Region Distribution 2<br>and Dim Census Subdivision (for region filters) | Total Population                    | pop_total_census                                                   |                                                                  |
|                       |                                                                                                                                                             | Population Change %                 | (pop_total_census - pop_total_prev_census) / pop_total_prev_census |                                                                  |
|                       |                                                                                                                                                             | Provincial Pop Change %             |                                                                    | Population Change % above without region filters (province-wide) |
|                       |                                                                                                                                                             | Median Age                          | Census[pop_median_age]                                             |                                                                  |
|                       |                                                                                                                                                             | Province Median Age                 |                                                                    | Returns 46 when the year is "2016", otherwise returns 45.5.      |
|                       |                                                                                                                                                             | Median Household Income             | hshld_income_median                                                | defaults when no region - SelectedYear = "2016" ? 55136 : 75000  |
|                       |                                                                                                                                                             | Prov. Median Household Income       |                                                                    | Returns 55136 when the year is "2016", otherwise returns 75000.  |
| Connectivity          | Connectivity                                                                                                                                                | Households with 50/10 Connection    | SUM[totalconnected]                                                | forces year = 2021                                               |
|                       |                                                                                                                                                             | Total households in selected region | SUM[totalhouseholds]                                               |                                                                  |
|                       |                                                                                                                                                             | Connected HouseHolds                | SUM[totalconnected]<br>SUM[totalhouseholds]                        |                                                                  |
|                       | Dim Census Subdivision                                                                                                                                      |                                     | CSDUID                                                             |                                                                  |
| Network Services      | Service                                                                                                                                                     | Available Services in the area      | Service Provider (isp_id in original table)<br>and count           |                                                                  |
|                       |                                                                                                                                                             | Service Providers in the area       | Service Provider (isp_id in original table)                        | forces year = 2021                                               |
| Connectivity Projects | Connectivity Projects                                                                                                                                       | table                               | project_name, proponent, status, Project Benefits                  | forces year = 2021                                               |

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

| SECTION           | Table                         | Visual                                                                                                                            | Field                                                                                                                                         | Filters/Remarks                                                                    |
| ----------------- | ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Health            | Location                      | Hospitals                                                                                                                         | SUM('Location'[Hospitals])                                                                                                                    |                                                                                    |
|                   |                               | Pharmacies                                                                                                                        | sum('Location'[Pharmacies])                                                                                                                   |                                                                                    |
|                   |                               | Laboratory Service                                                                                                                | sum('Location'[Laboratory Service])                                                                                                           |                                                                                    |
|                   |                               | Diagnostic Facilities                                                                                                             | sum('Location'[Diagnostic Facilities])                                                                                                        |                                                                                    |
|                   |                               | Clinics                                                                                                                           | sum('Location'[Clinics])                                                                                                                      |                                                                                    |
| Transportation    | Location                      | Port And Terminal                                                                                                                 | sum('Location'[Port And Terminal])                                                                                                            |                                                                                    |
|                   |                               | Customs Ports Of Entry                                                                                                            | sum('Location'[Customs Ports Of Entry])                                                                                                       |                                                                                    |
|                   |                               | Airports                                                                                                                          | sum('Location'[Airports])                                                                                                                     |                                                                                    |
| Public            | Location                      | Emergency Social Service Facilities                                                                                               | sum('Location'[Emergency Social Service Facilities])                                                                                          |                                                                                    |
|                   |                               | Civic Facilities                                                                                                                  | sum('Location'[Civic Facilities])                                                                                                             |                                                                                    |
|                   |                               | Courts                                                                                                                            | sum('Location'[Courts])                                                                                                                       |                                                                                    |
|                   |                               | Service BC Locations                                                                                                              | sum('Location'[Service BC Locations])                                                                                                         |                                                                                    |
|                   |                               | Local Govt Offices                                                                                                                | sum('Location'[Local Govt Offices])                                                                                                           |                                                                                    |
|                   |                               | First Responders                                                                                                                  | sum('Location'[First Responders])                                                                                                             |                                                                                    |
|                   |                               | Public Library                                                                                                                    | sum('Location'[Public Library])                                                                                                               |                                                                                    |
| Education         | Location                      | Calculated similar way to above                                                                                                   |                                                                                                                                               |                                                                                    |
| Facility Selector | Dim Location Type             | A distinct, alphabetically sorted list (max 101) of location type descriptions excluding "Major Projects" and "Timber Facilities" |                                                                                                                                               | The slicer is bound to Dim Location Type[Location Type Desc] (or [Location Type]). |
| Facilty Map       | Location<br>Dim Location Type |                                                                                                                                   | Location[Location Name],<br>Dim Location Type[Location Type]<br>CALCULATE(SUM('Location'[Latitude]))<br>CALCULATE(SUM('Location'[Longitude])) | Dim Location Type (1) ──► (∗) Location (via Location Type key).                    |

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

| SECTION                               | Table                                             | Visual                                               | Field                                                                                                                                                                   | Filters/Remarks |
| ------------------------------------- | ------------------------------------------------- | ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| Summary Left                          | Census (filters applied for region)               | Labour Force                                         | SUM('Census'[labour_force_total]) census_year 2016                                                                                                                      |                 |
|                                       |                                                   |                                                      | SUM('Census'[labour_force_total]) census_year 2021                                                                                                                      |                 |
|                                       |                                                   |                                                      | DIVIDE([Labour Force 2021],[Labour Force 2016])-1)\*100                                                                                                                 |                 |
|                                       |                                                   | Labour Force Participation                           | calculated similarly                                                                                                                                                    |                 |
|                                       |                                                   | Unemployment Rate                                    |                                                                                                                                                                         |                 |
|                                       |                                                   | Employment Rate                                      |                                                                                                                                                                         |                 |
| Summary Right (province wide)         | Census (for all zone types)                       | Calculated similarly but without region/zone filters |                                                                                                                                                                         |                 |
| Labour Force by Occupation            | Census Attributes<br>Census<br>2016 and 2021 data | Graph                                                | Census Attributes[Category] = "Occupation"                                                                                                                              |                 |
| Labour Force by Industry              | Census Attributes<br>Census<br>2016 and 2021 data | Graph                                                | Census Attributes[Category] = "Industry"                                                                                                                                |                 |
| Educational Attainment                | Census Attributes<br>Census<br>2016 and 2021 data | Graph                                                | Census Attributes[Category] = "Education"                                                                                                                               |                 |
| Employment in Resource Sectors        | Census                                            | with and without (whole province) any zone filters   | DIVIDE((SUM('Census'[industry_agriculture])+SUM('Census'[industry_mining])),SUM('Census'[num_employed]),0)                                                              |                 |
| Top Industries by Business Count      | Business by Census                                | Graph                                                | top 5 two-digit NAICS by business count.                                                                                                                                |                 |
| Share of Business in Resource Sectors | Business by Census                                | Graph                                                | where 2_digit_NAIC = '11' and 2_digit_NAIC = '21'<br>for Total Count of Business Mining & Oil & Gas and<br>Total Count of Business Agriculture Forestry Fishing Hunting |                 |
|                                       |                                                   | % of all businesses                                  | Above 2 sectors as a percentage of total number_of_businesses                                                                                                           |                 |
| Top Major Projects by Project Type    | Project                                           | Graph                                                | Compute project counts by type and show top 10                                                                                                                          |                 |

---

### Page 4: Social

**Main Power BI tables used:**

- `Census`
- `Census Attributes`
- `Housing`
- `Census_Population_Age` _(Derived from Census)_

**Data Mapping Table:**

| SECTION             | Table                                              | Visual                       | Field                                                                        |
| ------------------- | -------------------------------------------------- | ---------------------------- | ---------------------------------------------------------------------------- |
| Census Demographics | Census (filters applied for region)                | Summary                      | SUM calculated for each year 2016 and 2021, similar to other projects        |
|                     |                                                    |                              | SUM('Census'[labour_force_total]) census_year 2021                           |
|                     |                                                    |                              | DIVIDE([Labour Force 2021],[Labour Force 2016])-1)\*100                      |
| Social              | Census (Census_Population_Age derived from Census) | Population by Age and Gender | Age Groups By gender<br>year and region filters are in affect                |
|                     | Census                                             | Visible Minorities           | [pop_total_census]-[(visible_minority_num_male+visible_minority_num_female)] |
|                     |                                                    | Indigenous Identification    | [aboriginal_identity]<br>[pop_total_census] - [aboriginal_identity]          |
| Income              | Census Attributes                                  | Total Income Distribution    | Amounts for Income Category where Census Attributes[Category] = "Income"     |
|                     |                                                    | Total Low-Income Status      | Census Attributes[Category] = "Low Income"                                   |
| Housing             | Census                                             |                              |                                                                              |
| Building Permits    | Housing                                            |                              |                                                                              |
