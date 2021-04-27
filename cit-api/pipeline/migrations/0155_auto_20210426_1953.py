# Generated by Django 2.2.16 on 2021-04-26 19:53

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pipeline', '0154_auto_20210423_1530'),
    ]

    operations = [
        migrations.RunSQL("""DROP VIEW IF EXISTS public.cit_opportunities_vw;
            CREATE OR REPLACE VIEW public.cit_opportunities_vw
            AS
            SELECT o.id AS opportunity_id,
                o.opportunity_address,
                st_y(o.geo_position) AS latitude,
                st_x(o.geo_position) AS longitude,
                o.date_created,
                o.date_updated,
                ( SELECT a.status_name AS approval_status_name
                    FROM pipeline_approvalstatus a
                    WHERE a.status_code::text = o.approval_status_id::text) AS approval_status_name,
                ( SELECT a.status_description AS approval_status_description
                    FROM pipeline_approvalstatus a
                    WHERE a.status_code::text = o.approval_status_id::text) AS approval_status_description,
                ( SELECT a.active_status AS approval_status_active_ind
                    FROM pipeline_approvalstatus a
                    WHERE a.status_code::text = o.approval_status_id::text) AS approval_status_active_ind,
                o.business_contact_email,
                o.business_contact_name,
                o.community_link AS community_url,
                o.elevation_at_location AS location_elevation,
                o.environmental_information,
                o.opportunity_description,
                o.opportunity_electrical_capacity,
                o.opportunity_electrical_connected AS opportunity_electrical_connected_ind,
                o.opportunity_link AS opportunity_url,
                o.opportunity_name,
                o.opportunity_natural_gas_capacity,
                o.opportunity_natural_gas_connected AS opportunity_natural_gas_connected_ind,
                o.opportunity_road_connected AS opportunity_road_connected_ind,
                o.opportunity_sewer_capacity,
                o.opportunity_sewer_connected AS opportunity_sewer_connected_ind,
                o.opportunity_water_capacity,
                o.opportunity_water_connected AS opportunity_water_connected_ind,
                o.parcel_ownership,
                o.parcel_size AS parcel_size_acres,
                o.pid,
                o.soil_drainage,
                o.soil_name,
                o.soil_texture,
                o.public_note,
                o.date_published,
                o.opportunity_preferred_development_v2 as opportunity_preferred_development,
                ( SELECT l.name
                    FROM pipeline_landusezoning l
                    WHERE l.code::text = o.land_use_zoning::text) AS land_use_zoning_name,
                ( SELECT l.name
                    FROM pipeline_landusezoning l
                    WHERE l.code::text = o.ocp_zoning_code::text) AS ocp_zoning_name,
                ( SELECT p.name
                    FROM pipeline_propertystatus p
                    WHERE p.code::text = o.opportunity_property_status::text) AS opportunity_property_status_name,
                o.nearest_transmission_line AS nearest_transmission_line_distance,
                ( SELECT l.name
                    FROM pipeline_airportdistance d,
                        pipeline_airport a,
                        pipeline_location l
                    WHERE d.id = o.nearest_airport AND d.airport_id = a.location_ptr_id AND a.location_ptr_id = l.id) AS nearest_airport,
                ( SELECT a.description
                    FROM pipeline_airportdistance d,
                        pipeline_airport a
                    WHERE d.id = o.nearest_airport AND d.airport_id = a.location_ptr_id) AS nearest_airport_type,
                ( SELECT a.aerodrome_status
                    FROM pipeline_airportdistance d,
                        pipeline_airport a
                    WHERE d.id = o.nearest_airport AND d.airport_id = a.location_ptr_id) AS nearest_airport_aerodrome_status,
                ( SELECT a.aircraft_access_ind
                    FROM pipeline_airportdistance d,
                        pipeline_airport a
                    WHERE d.id = o.nearest_airport AND d.airport_id = a.location_ptr_id) AS nearest_airport_aircraft_access_ind,
                ( SELECT a.elevation
                    FROM pipeline_airportdistance d,
                        pipeline_airport a
                    WHERE d.id = o.nearest_airport AND d.airport_id = a.location_ptr_id) AS nearest_airport_airport_elevation,
                ( SELECT a.fuel_availability_ind
                    FROM pipeline_airportdistance d,
                        pipeline_airport a
                    WHERE d.id = o.nearest_airport AND d.airport_id = a.location_ptr_id) AS nearest_airport_fuel_availability_ind,
                ( SELECT a.helicopter_access_ind
                    FROM pipeline_airportdistance d,
                        pipeline_airport a
                    WHERE d.id = o.nearest_airport AND d.airport_id = a.location_ptr_id) AS nearest_airport_helicopter_access_ind,
                ( SELECT a.max_runway_length
                    FROM pipeline_airportdistance d,
                        pipeline_airport a
                    WHERE d.id = o.nearest_airport AND d.airport_id = a.location_ptr_id) AS nearest_airport_max_runway_length,
                ( SELECT a.number_of_runways
                    FROM pipeline_airportdistance d,
                        pipeline_airport a
                    WHERE d.id = o.nearest_airport AND d.airport_id = a.location_ptr_id) AS nearest_airport_number_of_runways,
                ( SELECT a.runway_surface
                    FROM pipeline_airportdistance d,
                        pipeline_airport a
                    WHERE d.id = o.nearest_airport AND d.airport_id = a.location_ptr_id) AS nearest_airport_runway_surface,
                ( SELECT a.oil_availability_ind
                    FROM pipeline_airportdistance d,
                        pipeline_airport a
                    WHERE d.id = o.nearest_airport AND d.airport_id = a.location_ptr_id) AS nearest_airport_oil_availability_ind,
                ( SELECT a.seaplane_access_ind
                    FROM pipeline_airportdistance d,
                        pipeline_airport a
                    WHERE d.id = o.nearest_airport AND d.airport_id = a.location_ptr_id) AS nearest_airport_seaplane_access_ind,
                ( SELECT d.airport_distance
                    FROM pipeline_airportdistance d
                    WHERE d.id = o.nearest_airport) AS nearest_airport_distance,
                ( SELECT l.name
                    FROM pipeline_firstresponderdistance d,
                        pipeline_firstresponder f,
                        pipeline_location l
                    WHERE d.id = o.nearest_ambulance_station AND d.first_responder_id = f.location_ptr_id AND f.location_ptr_id = l.id) AS nearest_ambulance_station,
                ( SELECT d.first_responder_distance
                    FROM pipeline_firstresponderdistance d
                    WHERE d.id = o.nearest_ambulance_station) AS nearest_ambulance_station_distance,
                ( SELECT l.name
                    FROM pipeline_firstresponderdistance d,
                        pipeline_firstresponder f,
                        pipeline_location l
                    WHERE d.id = o.nearest_coast_guard_station AND d.first_responder_id = f.location_ptr_id AND f.location_ptr_id = l.id) AS nearest_coast_guard_station,
                ( SELECT d.first_responder_distance
                    FROM pipeline_firstresponderdistance d
                    WHERE d.id = o.nearest_coast_guard_station) AS nearest_coast_guard_station_distance,
                ( SELECT l.name
                    FROM pipeline_customsportofentrydistance d,
                        pipeline_customsportofentry c,
                        pipeline_location l
                    WHERE d.id = o.nearest_customs_port_of_entry AND d.port_id = c.location_ptr_id AND c.location_ptr_id = l.id) AS nearest_customs_port_of_entry,
                ( SELECT c.customs_port_type
                    FROM pipeline_customsportofentrydistance d,
                        pipeline_customsportofentry c
                    WHERE d.id = o.nearest_customs_port_of_entry AND d.port_id = c.location_ptr_id) AS nearest_customs_port_type,
                ( SELECT c.customs_port_street_address
                    FROM pipeline_customsportofentrydistance d,
                        pipeline_customsportofentry c
                    WHERE d.id = o.nearest_customs_port_of_entry AND d.port_id = c.location_ptr_id) AS nearest_customs_port_street_address,
                ( SELECT c.customs_port_municipality
                    FROM pipeline_customsportofentrydistance d,
                        pipeline_customsportofentry c
                    WHERE d.id = o.nearest_customs_port_of_entry AND d.port_id = c.location_ptr_id) AS nearest_customs_port_municipality,
                ( SELECT d.customs_port_distance
                    FROM pipeline_customsportofentrydistance d
                    WHERE d.id = o.nearest_customs_port_of_entry) AS nearest_customs_port_of_entry_distance,
                ( SELECT l.name
                    FROM pipeline_firstresponderdistance d,
                        pipeline_firstresponder f,
                        pipeline_location l
                    WHERE d.id = o.nearest_fire_station AND d.first_responder_id = f.location_ptr_id AND f.location_ptr_id = l.id) AS nearest_fire_station,
                ( SELECT d.first_responder_distance
                    FROM pipeline_firstresponderdistance d
                    WHERE d.id = o.nearest_fire_station) AS nearest_fire_station_distance,
                ( SELECT l.name
                    FROM pipeline_hospitaldistance d,
                        pipeline_hospital h,
                        pipeline_location l
                    WHERE d.id = o.nearest_health_center AND d.hospital_id = h.location_ptr_id AND h.location_ptr_id = l.id) AS nearest_hospital,
                ( SELECT h.rg_name
                    FROM pipeline_hospitaldistance d,
                        pipeline_hospital h
                    WHERE d.id = o.nearest_health_center AND d.hospital_id = h.location_ptr_id) AS nearest_hospital_region_name,
                ( SELECT h.hours
                    FROM pipeline_hospitaldistance d,
                        pipeline_hospital h
                    WHERE d.id = o.nearest_health_center AND d.hospital_id = h.location_ptr_id) AS nearest_hospital_hours,
                ( SELECT h.sv_description
                    FROM pipeline_hospitaldistance d,
                        pipeline_hospital h
                    WHERE d.id = o.nearest_health_center AND d.hospital_id = h.location_ptr_id) AS nearest_hospital_services,
                ( SELECT d.hospital_distance
                    FROM pipeline_hospitaldistance d
                    WHERE d.id = o.nearest_health_center) AS nearest_hospital_distance,
                ( SELECT r.name
                    FROM pipeline_roadsandhighwaysdistance d,
                        pipeline_roadsandhighways r
                    WHERE d.id = o.nearest_highway AND d.highway_id = r.id) AS nearest_highway_name,
                ( SELECT r.road_name_alias1
                    FROM pipeline_roadsandhighwaysdistance d,
                        pipeline_roadsandhighways r
                    WHERE d.id = o.nearest_highway AND d.highway_id = r.id) AS nearest_highway_alias_1,
                ( SELECT r.road_name_alias2
                    FROM pipeline_roadsandhighwaysdistance d,
                        pipeline_roadsandhighways r
                    WHERE d.id = o.nearest_highway AND d.highway_id = r.id) AS nearest_highway_alias_2,
                ( SELECT r.number_of_lanes
                    FROM pipeline_roadsandhighwaysdistance d,
                        pipeline_roadsandhighways r
                    WHERE d.id = o.nearest_highway AND d.highway_id = r.id) AS nearest_highway_number_of_lanes,
                ( SELECT d.highway_distance
                    FROM pipeline_roadsandhighwaysdistance d
                    WHERE d.id = o.nearest_highway) AS nearest_highway_distance,
                ( SELECT l.name
                    FROM pipeline_lakedistance d,
                        pipeline_lake l
                    WHERE d.id = o.nearest_lake AND d.lake_id = l.id) AS nearest_lake,
                ( SELECT d.lake_distance
                    FROM pipeline_lakedistance d
                    WHERE d.id = o.nearest_lake) AS nearest_lake_distance,
                ( SELECT l.name
                    FROM pipeline_firstresponderdistance d,
                        pipeline_firstresponder f,
                        pipeline_location l
                    WHERE d.id = o.nearest_police_station AND d.first_responder_id = f.location_ptr_id AND f.location_ptr_id = l.id) AS nearest_police_station,
                ( SELECT d.first_responder_distance
                    FROM pipeline_firstresponderdistance d
                    WHERE d.id = o.nearest_police_station) AS nearest_police_station_distance,
                ( SELECT l.name
                    FROM pipeline_portandterminaldistance d,
                        pipeline_portandterminal p,
                        pipeline_location l
                    WHERE d.id = o.nearest_port AND d.port_id = p.location_ptr_id AND p.location_ptr_id = l.id) AS nearest_port,
                ( SELECT p.authority
                    FROM pipeline_portandterminaldistance d,
                        pipeline_portandterminal p
                    WHERE d.id = o.nearest_port AND d.port_id = p.location_ptr_id) AS nearest_port_authority,
                ( SELECT p.description
                    FROM pipeline_portandterminaldistance d,
                        pipeline_portandterminal p
                    WHERE d.id = o.nearest_port AND d.port_id = p.location_ptr_id) AS nearest_port_type,
                ( SELECT p.commodities_handled
                    FROM pipeline_portandterminaldistance d,
                        pipeline_portandterminal p
                    WHERE d.id = o.nearest_port AND d.port_id = p.location_ptr_id) AS nearest_port_commodities_handled,
                ( SELECT p.physical_address
                    FROM pipeline_portandterminaldistance d,
                        pipeline_portandterminal p
                    WHERE d.id = o.nearest_port AND d.port_id = p.location_ptr_id) AS nearest_port_address,
                ( SELECT d.port_distance
                    FROM pipeline_portandterminaldistance d
                    WHERE d.id = o.nearest_port) AS nearest_port_distance,
                ( SELECT l.name
                    FROM pipeline_postsecondarydistance d,
                        pipeline_postsecondaryinstitution p,
                        pipeline_location l
                    WHERE d.id = o.nearest_post_secondary AND d.location_id = p.location_ptr_id AND p.location_ptr_id = l.id) AS nearest_post_secondary_name,
                ( SELECT p.institution_type
                    FROM pipeline_postsecondarydistance d,
                        pipeline_postsecondaryinstitution p
                    WHERE d.id = o.nearest_post_secondary AND d.location_id = p.location_ptr_id) AS nearest_post_secondary_type,
                ( SELECT d.location_distance
                    FROM pipeline_postsecondarydistance d
                    WHERE d.id = o.nearest_post_secondary) AS nearest_post_secondary_distance,
                ( SELECT r.name
                    FROM pipeline_railwaydistance d,
                        pipeline_railway r
                    WHERE d.id = o.nearest_railway AND d.railway_id = r.id) AS nearest_railway_name,
                ( SELECT r.use_type
                    FROM pipeline_railwaydistance d,
                        pipeline_railway r
                    WHERE d.id = o.nearest_railway AND d.railway_id = r.id) AS nearest_railway_use_type,
                ( SELECT r.number_of_tracks
                    FROM pipeline_railwaydistance d,
                        pipeline_railway r
                    WHERE d.id = o.nearest_railway AND d.railway_id = r.id) AS nearest_railway_number_of_tracks,
                ( SELECT r.electrification
                    FROM pipeline_railwaydistance d,
                        pipeline_railway r
                    WHERE d.id = o.nearest_railway AND d.railway_id = r.id) AS nearest_railway_electrification,
                ( SELECT r.status
                    FROM pipeline_railwaydistance d,
                        pipeline_railway r
                    WHERE d.id = o.nearest_railway AND d.railway_id = r.id) AS nearest_railway_status,
                ( SELECT r.operator_english_name
                    FROM pipeline_railwaydistance d,
                        pipeline_railway r
                    WHERE d.id = o.nearest_railway AND d.railway_id = r.id) AS nearest_railway_operator,
                ( SELECT r.track_classification
                    FROM pipeline_railwaydistance d,
                        pipeline_railway r
                    WHERE d.id = o.nearest_railway AND d.railway_id = r.id) AS nearest_railway_track_class,
                ( SELECT d.railway_distance
                    FROM pipeline_railwaydistance d
                    WHERE d.id = o.nearest_railway) AS nearest_railway_distance,
                ( SELECT l.name
                    FROM pipeline_researchcentredistance d,
                        pipeline_researchcentre r,
                        pipeline_location l
                    WHERE d.id = o.nearest_research_centre AND d.research_centre_id = r.location_ptr_id AND r.location_ptr_id = l.id) AS nearest_research_centre,
                ( SELECT r.research_specialties
                    FROM pipeline_researchcentredistance d,
                        pipeline_researchcentre r
                    WHERE d.id = o.nearest_research_centre AND d.research_centre_id = r.location_ptr_id) AS nearest_research_specialties,
                ( SELECT r.research_centre_affiliation
                    FROM pipeline_researchcentredistance d,
                        pipeline_researchcentre r
                    WHERE d.id = o.nearest_research_centre AND d.research_centre_id = r.location_ptr_id) AS nearest_research_centre_affiliation,
                ( SELECT r.inst_acrnm
                    FROM pipeline_researchcentredistance d,
                        pipeline_researchcentre r
                    WHERE d.id = o.nearest_research_centre AND d.research_centre_id = r.location_ptr_id) AS nearest_research_centre_acronym,
                ( SELECT r.research_sector
                    FROM pipeline_researchcentredistance d,
                        pipeline_researchcentre r
                    WHERE d.id = o.nearest_research_centre AND d.research_centre_id = r.location_ptr_id) AS nearest_research_centre_research_sector,
                ( SELECT r.cntr_type
                    FROM pipeline_researchcentredistance d,
                        pipeline_researchcentre r
                    WHERE d.id = o.nearest_research_centre AND d.research_centre_id = r.location_ptr_id) AS nearest_research_centre_type,
                ( SELECT r.institution
                    FROM pipeline_researchcentredistance d,
                        pipeline_researchcentre r
                    WHERE d.id = o.nearest_research_centre AND d.research_centre_id = r.location_ptr_id) AS nearest_research_centre_institution,
                ( SELECT d.research_centre_distance
                    FROM pipeline_researchcentredistance d
                    WHERE d.id = o.nearest_research_centre) AS nearest_research_center_distance,
                ( SELECT r.name
                    FROM pipeline_riverdistance d,
                        pipeline_river r
                    WHERE d.id = o.nearest_river AND d.river_id = r.id) AS nearest_river,
                ( SELECT d.river_distance
                    FROM pipeline_riverdistance d
                    WHERE d.id = o.nearest_river) AS nearest_river_distance,
                o.opportunity_rental_price,
                o.opportunity_sale_price,
                ( SELECT c.place_name
                    FROM pipeline_communitydistance d,
                        pipeline_community c
                    WHERE d.id = o.nearest_community AND d.community_id = c.id) AS community_name,
                ( SELECT c.community_type
                    FROM pipeline_communitydistance d,
                        pipeline_community c
                    WHERE d.id = o.nearest_community AND d.community_id = c.id) AS community_type,
                ( SELECT c.band_number
                    FROM pipeline_communitydistance d,
                        pipeline_community c
                    WHERE d.id = o.nearest_community AND d.community_id = c.id) AS band_number,
                ( SELECT c.fn_community_name
                    FROM pipeline_communitydistance d,
                        pipeline_community c
                    WHERE d.id = o.nearest_community AND d.community_id = c.id) AS first_nation_community_name,
                ( SELECT c.nation
                    FROM pipeline_communitydistance d,
                        pipeline_community c
                    WHERE d.id = o.nearest_community AND d.community_id = c.id) AS first_nation,
                ( SELECT c.incorporated
                    FROM pipeline_communitydistance d,
                        pipeline_community c
                    WHERE d.id = o.nearest_community AND d.community_id = c.id) AS incorporated_ind,
                ( SELECT c.is_coastal
                    FROM pipeline_communitydistance d,
                        pipeline_community c
                    WHERE d.id = o.nearest_community AND d.community_id = c.id) AS is_coastal_ind,
                ( SELECT c.nearest_transmission_distance
                    FROM pipeline_communitydistance d,
                        pipeline_community c
                    WHERE d.id = o.nearest_community AND d.community_id = c.id) AS nearest_transmission_distance,
                ( SELECT c.transmission_line_description
                    FROM pipeline_communitydistance d,
                        pipeline_community c
                    WHERE d.id = o.nearest_community AND d.community_id = c.id) AS transmission_line_description,
                ( SELECT c.hexuid
                    FROM pipeline_communitydistance d,
                        pipeline_community c
                    WHERE d.id = o.nearest_community AND d.community_id = c.id) AS nearest_community_hex_code_id,
                ( SELECT c.census_subdivision_id
                    FROM pipeline_communitydistance d,
                        pipeline_community c
                    WHERE d.id = o.nearest_community AND d.community_id = c.id) AS nearest_community_csd,
                ( SELECT d.community_distance
                    FROM pipeline_communitydistance d
                    WHERE d.id = o.nearest_community) AS nearest_community_distance,
                ( SELECT m.name
                    FROM pipeline_municipality m
                    WHERE m.id = o.municipality_id) AS municipality,
                ( SELECT r.name
                    FROM pipeline_regionaldistrict r
                    WHERE r.id = o.regional_district_id) AS regional_district,
                o.network_at_road,
                o.network_avg
            FROM pipeline_opportunity o;
        """)
    ]