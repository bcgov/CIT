# CIT Pipeline Importers Summary

## Complete Importer Mapping Table

This table provides a comprehensive overview of all importers across all buckets in the CIT pipeline system, mapping each importer to its target database table, filename location, and external dependencies.

| Bucket       | Importer                            | Filename                                            | Database Table                                 | External Dependencies                |
| ------------ | ----------------------------------- | --------------------------------------------------- | ---------------------------------------------- | ------------------------------------ |
| **Bucket 1** | CensusDivisionsImporter             | `bucket1/bucket1_census_divisions.py`               | `pipeline_cen_prof_detailed_cd_attrs_sp`       | Statistics Canada Census Data        |
| **Bucket 1** | CensusSubdivisionsImporter          | `bucket1/bucket1_census_subdivisions.py`            | `pipeline_cen_prof_detailed_csd_attrs_sp`      | Statistics Canada Census Data        |
| **Bucket 1** | CensusSubdivisions2016Importer      | `bucket1/bucket1_census_subdivisions_2016.py`       | `pipeline_cen_prof_detailed_csd_attrs_sp_2016` | Statistics Canada Census Data (2016) |
| **Bucket 2** | NBDPHHSpeedsImporter                | `bucket2/bucket2_NBDPHHSpeeds.py`                   | `pipeline_nbdphhspeeds`                        | ISED Canada Broadband Data           |
| **Bucket 2** | CoreHousingNeedImporter             | `bucket2/bucket2_core_housing_need.py`              | `pipeline_corehousingneed`                     | Statistics Canada Housing Data       |
| **Bucket 2** | CSDCentroidImporter                 | `bucket2/bucket2_csd_centroid.py`                   | `pipeline_csdcentroid`                         | Manual CSV (c2021_csd_centroid.csv)  |
| **Bucket 2** | BusinessesByCSDImporter             | `bucket2/bucket2_businesses_by_csd.py`              | `pipeline_businessesbycsd`                     | Manual Excel (Tourism_NAICS.xlsx)    |
| **Bucket 2** | PHDemographicImporter               | `bucket2/bucket2_phdemographic.py`                  | `pipeline_phdemographicdistribution`           | Manual CSV (dbuid_csduid.csv)        |
| **Bucket 2** | MunicipalLandTitleTransfersImporter | `bucket2/bucket2_municipal_land_title_transfers.py` | `pipeline_municipallandtitletransfers`         | Manual CSV (csd_linkage.csv)         |
| **Bucket 2** | FNCommunitiesImporter               | `bucket2/bucket2_semiannually.py`                   | `pipeline_fncommunities`                       | BC Data Catalogue (DataBC)           |
| **Bucket 2** | RegionalDistrictsImporter           | `bucket2/bucket2_semiannually.py`                   | `pipeline_regionaldistrict`                    | BC Data Catalogue (DataBC)           |
| **Bucket 2** | MunicipalitiesImporter              | `bucket2/bucket2_semiannually.py`                   | `pipeline_municipality`                        | BC Data Catalogue (DataBC)           |
| **Bucket 2** | SchoolDistrictsImporter             | `bucket2/bucket2_semiannually.py`                   | `pipeline_schooldistrict`                      | BC Data Catalogue (DataBC)           |
| **Bucket 2** | TourismRegionsImporter              | `bucket2/bucket2_semiannually.py`                   | `pipeline_tourismregion`                       | BC Data Catalogue (DataBC)           |
| **Bucket 2** | WildfireZonesImporter               | `bucket2/bucket2_semiannually.py`                   | `pipeline_wildfirezone`                        | BC Data Catalogue (DataBC)           |
| **Bucket 2** | TsunamiZonesImporter                | `bucket2/bucket2_semiannually.py`                   | `pipeline_tsunamizone`                         | BC Data Catalogue (DataBC)           |
| **Bucket 2** | PopulationCentresImporter           | `bucket2/bucket2_semiannually.py`                   | `pipeline_populationcentre`                    | Statistics Canada Geographic Data    |
| **Bucket 2** | DisseminationAreasImporter          | `bucket2/bucket2_semiannually.py`                   | `pipeline_disseminationarea`                   | Statistics Canada Geographic Data    |
| **Bucket 2** | DisseminationBlocksImporter         | `bucket2/bucket2_semiannually.py`                   | `pipeline_disseminationblock`                  | Statistics Canada Geographic Data    |
| **Bucket 2** | ForwardSortationAreasImporter       | `bucket2/bucket2_semiannually.py`                   | `pipeline_forwardsortationarea`                | Statistics Canada Geographic Data    |
| **Bucket 2** | ElectoralDistrictsImporter          | `bucket2/bucket2_semiannually.py`                   | `pipeline_electoraldistrict`                   | BC Data Catalogue (DataBC)           |
| **Bucket 2** | EconomicRegionsImporter             | `bucket2/bucket2_semiannually.py`                   | `pipeline_censuseconomicregion`                | Statistics Canada Geographic Data    |
| **Bucket 2** | IndigenousLandsImporter             | `bucket2/bucket2_semiannually.py`                   | `pipeline_indigenouslands`                     | BC Data Catalogue (DataBC)           |
| **Bucket 3** | CommunitiesImporter                 | `bucket3/bucket3.py`                                | `pipeline_community`                           | Manual CSV (COMMUNITIES_V6.csv)      |
| **Bucket 4** | AgriculturalLandReserveImporter     | `bucket4/bucket4_monthly.py`                        | `pipeline_agriculturallandreserve`             | BC Data Catalogue (DataBC)           |
| **Bucket 4** | ServicesImporter                    | `bucket4/bucket4_semiannually.py`                   | `pipeline_service`                             | Manual CSV (ISP_Hex_FSI.csv)         |
| **Bucket 4** | HealthAuthorityBoundariesImporter   | `bucket4/bucket4_semiannually.py`                   | `pipeline_healthauthorityboundary`             | BC Data Catalogue (DataBC)           |
| **Bucket 4** | NaturalResourceRegionsImporter      | `bucket4/bucket4_semiannually.py`                   | `pipeline_naturalresourceregion`               | BC Data Catalogue (DataBC)           |
| **Bucket 4** | DevelopmentRegionsImporter          | `bucket4/bucket4_semiannually.py`                   | `pipeline_developmentregion`                   | BC Data Catalogue (DataBC)           |
| **Bucket 4** | LandDistrictsImporter               | `bucket4/bucket4_semiannually.py`                   | `pipeline_landdistrict`                        | BC Data Catalogue (DataBC)           |
| **Bucket 4** | ParksImporter                       | `bucket4/bucket4_semiannually.py`                   | `pipeline_bcparks`                             | BC Data Catalogue (DataBC)           |
| **Bucket 4** | ProtectedLandsImporter              | `bucket4/bucket4_semiannually.py`                   | `pipeline_protectedlands`                      | BC Data Catalogue (DataBC)           |
| **Bucket 4** | ConservedLandsImporter              | `bucket4/bucket4_semiannually.py`                   | `pipeline_conservedlands`                      | BC Data Catalogue (DataBC)           |
| **Bucket 4** | NationalParksImporter               | `bucket4/bucket4_semiannually.py`                   | `pipeline_nationalparks`                       | BC Data Catalogue (DataBC)           |
| **Bucket 4** | WatershedsImporter                  | `bucket4/bucket4_semiannually.py`                   | `pipeline_watersheds`                          | BC Data Catalogue (DataBC)           |
| **Bucket 4** | WaterLicencesImporter               | `bucket4/bucket4_semiannually.py`                   | `pipeline_waterlicences`                       | BC Data Catalogue (DataBC)           |
| **Bucket 4** | PostSecondaryInstitutionsImporter   | `bucket4/bucket4_semiannually.py`                   | `pipeline_postsecondaryinstitutions`           | BC Data Catalogue (DataBC)           |
| **Bucket 4** | AirportsImporter                    | `bucket4/bucket4_semiannually.py`                   | `pipeline_airports`                            | BC Data Catalogue (DataBC)           |
| **Bucket 4** | RecreationSitesImporter             | `bucket4/bucket4_semiannually.py`                   | `pipeline_recreationsites`                     | BC Data Catalogue (DataBC)           |
| **Bucket 4** | LakesImporter                       | `bucket4/bucket4_semiannually.py`                   | `pipeline_lake`                                | BC Data Catalogue (DataBC)           |
| **Bucket 4** | RiversImporter                      | `bucket4/bucket4_semiannually.py`                   | `pipeline_river`                               | BC Data Catalogue (DataBC)           |
| **Bucket 4** | RailwaysImporter                    | `bucket4/bucket4_semiannually.py`                   | `pipeline_railway`                             | BC Data Catalogue (DataBC)           |
| **Bucket 4** | RoadsAndHighwaysImporter            | `bucket4/bucket4_semiannually.py`                   | `pipeline_roadsandhighways`                    | BC Data Catalogue (DataBC)           |
| **Bucket 4** | ResearchCentresImporter             | `bucket4/bucket4_semiannually.py`                   | `pipeline_researchcentre`                      | BC Data Catalogue (DataBC)           |
| **Bucket 4** | IndianReserveBandNameImporter       | `bucket4/bucket4_semiannually.py`                   | `pipeline_indianreservebandname`               | BC Data Catalogue (DataBC)           |
| **Bucket 5** | ProjectsImporter                    | `bucket5/bucket5_monthly.py`                        | `pipeline_projects`                            | BC Data Catalogue (DataBC)           |
| **Bucket 5** | FirstRespondersImporter             | `bucket5/bucket5_monthly.py`                        | `pipeline_firstresponders`                     | BC Data Catalogue (DataBC)           |
| **Bucket 5** | PortAndTerminalImporter             | `bucket5/bucket5_port_and_terminal.py`              | `pipeline_portandterminal`                     | BC Data Catalogue (DataBC)           |
| **Bucket 5** | CustomsPortOfEntryImporter          | `bucket5/bucket5_customs_ports_of_entry.py`         | `pipeline_customsportofentry`                  | BC Data Catalogue (DataBC)           |
| **Bucket 5** | HospitalsImporter                   | `bucket5/bucket5_semiannually.py`                   | `pipeline_hospitals`                           | BC Data Catalogue (DataBC)           |
| **Bucket 5** | HealthClinicsImporter               | `bucket5/bucket5_semiannually.py`                   | `pipeline_healthclinics`                       | BC Data Catalogue (DataBC)           |
| **Bucket 5** | WalkInClinicsImporter               | `bucket5/bucket5_semiannually.py`                   | `pipeline_walkinclinics`                       | BC Data Catalogue (DataBC)           |
| **Bucket 5** | PharmaciesImporter                  | `bucket5/bucket5_semiannually.py`                   | `pipeline_pharmacies`                          | BC Data Catalogue (DataBC)           |
| **Bucket 5** | LongTermCareImporter                | `bucket5/bucket5_semiannually.py`                   | `pipeline_longtermcare`                        | BC Data Catalogue (DataBC)           |
| **Bucket 5** | AssistedLivingImporter              | `bucket5/bucket5_semiannually.py`                   | `pipeline_assistedliving`                      | BC Data Catalogue (DataBC)           |
| **Bucket 5** | IndependentSchoolsImporter          | `bucket5/bucket5_semiannually.py`                   | `pipeline_independentschools`                  | BC Data Catalogue (DataBC)           |
| **Bucket 5** | PublicSchoolsImporter               | `bucket5/bucket5_semiannually.py`                   | `pipeline_publicschools`                       | BC Data Catalogue (DataBC)           |
| **Bucket 5** | LibrariesImporter                   | `bucket5/bucket5_semiannually.py`                   | `pipeline_libraries`                           | BC Data Catalogue (DataBC)           |
| **Bucket 5** | CourtLocationsImporter              | `bucket5/bucket5_semiannually.py`                   | `pipeline_courtlocations`                      | BC Data Catalogue (DataBC)           |
| **Bucket 5** | CorrectionalCentresImporter         | `bucket5/bucket5_semiannually.py`                   | `pipeline_correctionalcentres`                 | BC Data Catalogue (DataBC)           |
| **Bucket 5** | ServiceBCLocationsImporter          | `bucket5/bucket5_semiannually.py`                   | `pipeline_servicebclocations`                  | BC Data Catalogue (DataBC)           |
| **Bucket 5** | ICBCLocationsImporter               | `bucket5/bucket5_semiannually.py`                   | `pipeline_icbclocations`                       | BC Data Catalogue (DataBC)           |
| **Bucket 5** | FireHallsImporter                   | `bucket5/bucket5_semiannually.py`                   | `pipeline_firehalls`                           | BC Data Catalogue (DataBC)           |
| **Bucket 5** | PoliceLocationsImporter             | `bucket5/bucket5_semiannually.py`                   | `pipeline_policelocations`                     | BC Data Catalogue (DataBC)           |
| **Bucket 5** | AmbulanceStationsImporter           | `bucket5/bucket5_semiannually.py`                   | `pipeline_ambulancestations`                   | BC Data Catalogue (DataBC)           |
| **Bucket 7** | LinkageCSDImporter                  | `bucket7/bucket7.py`                                | `pipeline_linkagewithcensus`                   | Manual CSV (csd_linkage.csv)         |
| **Bucket 7** | BCNetworkConnectivityImporter       | `bucket7/bucket7_bc_network_connectivity.py`        | `pipeline_bcnetworkconnectivity`               | BC Data Catalogue (DataBC)           |
| **Bucket 7** | BCWildfireZonesImporter             | `bucket7/bucket7_bc_wildfire_zones.py`              | `pipeline_bcwildfirezone`                      | BC Data Catalogue (DataBC)           |

## External Data Sources Summary

### Primary Data Providers

1. **Statistics Canada**

   - Census demographic and geographic data
   - 2021 and 2016 census datasets
   - Administrative boundary definitions
   - Population and housing statistics

2. **BC Data Catalogue (DataBC)**

   - Provincial government datasets
   - Administrative boundaries
   - Infrastructure and service locations
   - Environmental and natural resource data
   - Connectivity and telecommunications data

3. **Innovation, Science and Economic Development Canada (ISED)**

   - National Broadband Data Portal
   - Internet speed and connectivity metrics

4. **Manual Data Sources**
   - COMMUNITIES_V6.csv (curated community definitions)
   - c2021_csd_centroid.csv (Census 2021 centroid coordinates)
   - Tourism_NAICS.xlsx (Tourism business classifications by CSD)
   - dbuid_csduid.csv (Dissemination block to CSD linkage)
   - csd_linkage.csv (Census subdivision administrative linkages)
   - ISP_Hex_FSI.csv (Internet service provider coverage by hexagonal grid)
   - Tsunami_Zone_Names.csv (Tsunami notification zone name mappings)

### Data Source Types

- **WMS Services**: Real-time geographic data from BC Data Catalogue
- **CSV Files**: Structured tabular data from Statistics Canada and manual sources
- **Excel Files**: Manually maintained project and service data
- **API Endpoints**: Dynamic data retrieval from government data portals

## Bucket Execution Dependencies

### Execution Order

1. **Bucket 1** (Census Foundation) - No dependencies
2. **Bucket 2** (Administrative Boundaries) - Depends on Bucket 1 census data
3. **Bucket 3** (Communities) - Depends on Buckets 1-2 for geographic relationships
4. **Bucket 4** (Provincial Infrastructure) - Depends on administrative boundaries from Bucket 2
5. **Bucket 5** (Service Locations) - Depends on geographic foundation from previous buckets
6. **Bucket 7** - Depends on all previous buckets for cross-references

### Internal Database Dependencies

#### Bucket 1 Dependencies

- None (foundation layer)

#### Bucket 2 Dependencies

- Census subdivisions and divisions from Bucket 1

#### Bucket 3 Dependencies

- Census data from Bucket 1
- Administrative boundaries from Bucket 2
- Regional districts, municipalities, school districts for foreign key relationships

#### Bucket 4 Dependencies

- Administrative boundaries from Bucket 2 for geographic context

#### Bucket 5 Dependencies

- All previous buckets for spatial relationships and opportunity model calculations

#### Bucket 7 Dependencies

- Bucket 1: Census subdivisions for linkage model
- Bucket 2: Regional districts, school districts, tourism regions, wildfire zones, tsunami zones
- Bucket 4: Census economic regions, health authority boundaries, natural resource regions

## Data Volume Overview

### High-Volume Tables

- `pipeline_location_distance`: over 700,000 records with distance, travel time, community id (foreign key to `pipeline_community`), and location id (foreign key to `pipeline_location`)
- `pipeline_cen_prof_detailed_csd_attrs_sp`: 5,162 census subdivisions with 500+ demographic fields
- `pipeline_cen_prof_detailed_cd_attrs_sp`: 293 census divisions with 500+ demographic fields
- `pipeline_disseminationblock`: Detailed geographic units (highest granularity)
- `pipeline_bcnetworkconnectivity`: Hexagonal grid coverage across BC

### Medium-Volume Tables

- Administrative boundaries (regional districts, municipalities, school districts)
- Service locations (hospitals, schools, emergency services)
- Infrastructure features (parks, water licences, airports)

### Low-Volume Tables

- `pipeline_community`: 203 curated community definitions
- High-level administrative regions (health authorities, development regions)
- Specialized zones (wildfire management, tsunami notification)

## Integration Patterns

### Geographic Hierarchy

- Census geography provides demographic foundation
- Administrative boundaries enable governance analysis
- Service locations support accessibility analysis
- Infrastructure data enables comprehensive planning

### Cross-Reference System

- LinkageWithCensus model connects all administrative systems
- Community model serves as central hub for analysis
- Location-based models support distance and accessibility calculations

## Distance Calculation Tables

The CIT system includes a distance calculation subsystem that operates as a post-processing layer after the bucket 5 imports. This system calculates proximity and accessibility metrics for all communities and service locations. In addition, it has manual distance calculations for several tables.

### Distance Table Architecture

| Table Name                            | Purpose                                  | Calculation Method                   | Bucket Integration       |
| ------------------------------------- | ---------------------------------------- | ------------------------------------ | ------------------------ |
| `pipeline_locationdistance`           | General distance calculations            | Distance to nearest services         | Bucket 5 post-processing |
| `pipeline_postsecondaryDistance`      | Post-secondary institution accessibility | Specialized opportunity analysis     | Independent calculation  |
| `pipeline_communitydistance`          | Inter-community distance metrics         | Community-to-community relationships | Independent calculation  |
| `pipeline_municipalitydistance`       | Municipal boundary proximity             | Municipality accessibility analysis  | Independent calculation  |
| `pipeline_indianreservebanddistance`  | First Nations community proximity        | Indigenous community accessibility   | Independent calculation  |
| `pipeline_lakedistance`               | Proximity to water bodies (lakes)        | Natural feature accessibility        | Independent calculation  |
| `pipeline_riverdistance`              | Proximity to water bodies (rivers)       | Natural feature accessibility        | Independent calculation  |
| `pipeline_roadsandhighwaysdistance`   | Transportation infrastructure access     | Highway and road accessibility       | Independent calculation  |
| `pipeline_airportdistance`            | Airport accessibility                    | Air transportation access            | Independent calculation  |
| `pipeline_railwaydistance`            | Railway infrastructure proximity         | Rail transportation access           | Independent calculation  |
| `pipeline_portandterminaldistance`    | Marine transportation access             | Port and terminal accessibility      | Independent calculation  |
| `pipeline_customsportofentrydistance` | Border crossing accessibility            | International border access          | Independent calculation  |
| `pipeline_researchcentredistance`     | Research facility proximity              | Innovation ecosystem access          | Independent calculation  |
| `pipeline_firstresponderdistance`     | Emergency services accessibility         | Public safety service access         | Independent calculation  |
| `pipeline_hospitaldistance`           | Healthcare facility accessibility        | Healthcare service access            | Independent calculation  |

### Distance Calculation Process

#### Primary Calculation Workflow (Bucket 5 Integration)

1. **Management Command**: `bucket_5_semiannually.py`

   - Imports all location-based services (15 location types)
   - Automatically triggers distance calculations after import
   - Calls `calculate_nearest_location_types_outside_50k()` function

2. **Calculation Logic**:

   - For each community, checks if services exist within 50km radius
   - If no services within 50km, calculates distance to nearest service
   - Creates `LocationDistance` records with both straight-line and driving distances
   - Integrates with BC Government Route Planner API for driving times

3. **Location Types Processed** (from `LOCATION_TYPES` constant):
   - airports, civic_facilities, clinics, customs_ports_of_entry
   - diagnostic_facilities, emergency_social_service_facilities, hospitals
   - laboratory_service, local_govt_offices, pharmacies, port_and_terminal
   - public_library, schools, servicebc_locations, timber_facilities

#### Independent Distance Calculations

**Standalone Command**: `compute_distances_outside_50k.py`

- Can be executed independently of bucket imports
- Useful for recalculating distances when location data changes
- Calls the same calculation functions as Bucket 5 workflow

### Distance Calculation Features

#### Advanced Distance Metrics

1. **Straight-line Distance**: Direct geographic distance (as the crow flies)
2. **Driving Distance**: Actual road network distance via BC Route Planner API
3. **Travel Time**: Estimated driving time between locations
4. **Travel Time Display**: Human-readable travel time format

#### Special Handling

1. **First Responders**: Separate calculations for fire, police, and ambulance services
2. **Municipality Flags**: Tracks whether services are within municipal boundaries
3. **50km Threshold**: Only calculates distances for communities lacking nearby services

### Integration with Bucket System

| Integration Type        | Description                                                | Execution Timing            |
| ----------------------- | ---------------------------------------------------------- | --------------------------- |
| **Bucket 5 Embedded**   | Distance calculations run automatically after data import  | Every semiannual execution  |
| **Independent Command** | Standalone distance calculation without full bucket import | On-demand or scheduled      |
| **Dependency Chain**    | Requires location data from Buckets 4-5 before execution   | Post-import processing only |

### Data Dependencies

#### Input Requirements

- **Community Data**: From Bucket 3 (`pipeline_community`)
- **Location Data**: From Buckets 4-5 (all service location tables)
- **Geographic Data**: From Buckets 1-2 (administrative boundaries)

#### External API Dependencies

- **BC Route Planner API**: `router.api.gov.bc.ca` for driving distances and times
- **PostGIS**: Spatial database functions for geographic calculations
