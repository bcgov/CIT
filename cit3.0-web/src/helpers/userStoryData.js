import axios from "axios";

export async function getCensusEconomicRegions() {
  const url = "/api/opportunity/options/census-economic-regions";

  const response = await axios.get(url);
  const result = response.data.data.map((x) => ({
    value: x.economic_region_id,
    label: x.name,
  }));

  return result;
}

export async function getCensusSubdivisions() {
  const url = "/api/opportunity/options/census-subdivisions";

  const response = await axios.get(url);
  const result = response.data.data.map((x) => ({
    value: x.census_subdivision_id,
    label: x.census_subdivision_name,
  }));

  return result;
}

export async function getCommunities() {
  const url = "/api/opportunity/options/communities";

  const response = await axios.get(url);
  const result = response.data.data.map((x) => ({
    value: x.id,
    label: x.place_name,
  }));

  return result;
}

export async function getNaturalResourceRegions() {
  const url = "/api/opportunity/options/natural-resource-regions";

  const response = await axios.get(url);
  const result = response.data.data.map((x) => ({
    value: x.org_unit,
    label: x.name,
  }));

  return result;
}

export async function getHealthAuthorityBoundaries() {
  const url = "/api/opportunity/options/health-authority-boundaries";

  const response = await axios.get(url);
  const result = response.data.data.map((x) => ({
    value: x.id,
    label: x.name,
  }));

  return result;
}

export async function getRegionalDistricts() {
  const url = "/api/opportunity/options/regional-districts";

  const response = await axios.get(url);
  const result = response.data.data.map((x) => ({
    value: x.id,
    label: x.name,
  }));

  return result;
}

export async function getTourismRegions() {
  const url = "/api/opportunity/options/tourism-regions";

  const response = await axios.get(url);
  const result = response.data.data.map((x) => ({
    value: x.tourism_region_id,
    label: x.tourism_region_name,
  }));

  return result;
}

export async function getTsunamiZones() {
  const url = "/api/opportunity/options/tsunami-zones";

  const response = await axios.get(url);
  const result = response.data.data.map((x) => ({
    value: x.id,
    label: x.tsunami_zone_name,
  }));

  return result;
}

export async function getWildfireZones() {
  const url = "/api/opportunity/options/wildfire-zones";

  const response = await axios.get(url);
  const result = response.data.data.map((x) => ({
    value: x.id,
    label: x.name,
  }));

  return result;
}

export async function getSchoolDistricts() {
  const url = "/api/opportunity/options/school-districts";

  const response = await axios.get(url);
  const result = response.data.data.map((x) => ({
    value: x.area_id,
    label: x.name,
  }));

  return result;
}
