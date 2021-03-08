import axios from "axios";

export async function getAddressData(address) {
  return axios.get(
    `https://geocoder.api.gov.bc.ca/addresses.json?addressString=${address}&autoComplete=true&maxResults=15`,
    {
      headers: {
        apikey: process.env.REACT_APP_GEOCODER_API_KEY,
      },
    }
  );
}

// TODO: Get address Data from lat long -> /sites/nearest.{output format} (geocoder)

export async function getResourceData(resourceId) {
  return axios
    .get(
      `https://catalogue.data.gov.bc.ca/api/3/action/datastore_search?resource_id=${resourceId}&limit=10000`
    )
    .then((data) => data.data.result.records)
    .catch(() => null);
}

export async function getDistanceViaRoutePlanner(mainCoords, resourceCoords) {
  const result = await axios.get(
    `https://router.api.gov.bc.ca/distance.json?points=${mainCoords[1]}%2C${mainCoords[0]}%2C${resourceCoords[1]}%2C${resourceCoords[0]}`,
    {
      headers: {
        apikey: process.env.REACT_APP_BC_ROUTE_PLANNER_API_KEY,
      },
    }
  );
  return result;
}

function distanceBetween2Points(p1, p2) {
  try {
    const lat1 = p1[0] / (180 / Math.PI);
    const lat2 = p2[0] / (180 / Math.PI);
    const lon1 = p1[1] / (180 / Math.PI);
    const lon2 = p2[1] / (180 / Math.PI);
    const distance =
      6371 *
      Math.acos(
        Math.sin(lat1) * Math.sin(lat2) +
          Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon1 - lon2)
      );
    return distance;
  } catch (error) {
    return null;
  }
}

export function addDistanceToResources(resources, coords) {
  return resources.map(async (resource) => {
    const distance = await getDistanceViaRoutePlanner(coords, [
      resource.LATITUDE || resource.Latitude || resource.SCHOOL_LATITUDE,
      resource.LONGITUDE || resource.Longitude || resource.SCHOOL_LONGITUDE,
    ]);
    const updatedResource = { ...resource, distance };
    return updatedResource;
  });
}

const addDistanceToResourcesMine = (resources, coords) =>
  resources.map((resource) => {
    const distance = distanceBetween2Points(coords, [
      resource.LATITUDE || resource.Latitude || resource.SCHOOL_LATITUDE,
      resource.LONGITUDE || resource.Longitude || resource.SCHOOL_LONGITUDE,
    ]);
    const updatedResource = { ...resource, distance };
    return updatedResource;
  });

function returnResourcesWithinMaxDistance(resources, maxDistance, coords) {
  const nearbyResources = resources.filter(
    (resource) =>
      distanceBetween2Points(coords, [
        resource.LATITUDE || resource.Latitude || resource.SCHOOL_LATITUDE,
        resource.LONGITUDE || resource.Longitude || resource.SCHOOL_LONGITUDE,
      ]) <= maxDistance
  );
  return nearbyResources;
}

export const getProximityData = async (resources, coords) => {
  try {
    const final = Promise.all(
      Object.entries(resources).map(async ([resource, resourceId]) => {
        const resourceData = await getResourceData(resourceId);
        const resourcesWithinMax = returnResourcesWithinMaxDistance(
          resourceData,
          50,
          coords
        );
        return [
          resource,
          addDistanceToResourcesMine(resourcesWithinMax, coords),
        ];
      })
    );
    const result = await final;
    return Object.fromEntries(result);
  } catch (error) {
    console.log("Error retrieving proximity data");
    return null;
  }
};
