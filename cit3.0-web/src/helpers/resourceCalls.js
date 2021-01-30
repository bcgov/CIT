/* eslint-disable prettier/prettier */
import axios from "axios";

export async function getAddressData(address) {
  return axios.get(
    `https://geocoder.api.gov.bc.ca/addresses.json?addressString=${address}`,
    {
      headers: {
        apikey: process.env.REACT_APP_GEOCODER_API_KEY,
      },
    }
  );
}

export async function getResourceData(resourceId) {
  return (
    axios
    .get(
      `https://catalogue.data.gov.bc.ca/api/3/action/datastore_search?resource_id=${resourceId}&limit=10000`
    )
    // eslint-disable-next-line arrow-body-style
    .then((data) => {
      // console.log("data", data);
      return data.data.result.records;
    })
    .catch((err) => {
      console.log("getResourceData ERR: ", err);
      return null;
    })
  )
}

export async function getDistanceViaRoutePlanner(mainCoords, resourceCoords) {
  // const test = `https://router.api.gov.bc.ca/distance.json?points=-123.70794%2C48.77869%2C-123.53785%2C48.38200`
  const result = await axios.get(
    `https://router.api.gov.bc.ca/distance.json?points=${mainCoords[1]}%${mainCoords[0]}%${resourceCoords[1]}%${resourceCoords[0]}`,
    {
      headers: {
        apikey: process.env.REACT_APP_GEOCODER_API_KEY,
      },
    }
  );
  console.log(result);
  return result;
}

export function addDistanceToResources(resources, coords) {
  return resources.map(async (resource) => {
    const distance = await getDistanceViaRoutePlanner(coords, [
      resource.LATITUDE,
      resource.LONGITUDE,
    ]);
    const updatedResource = { ...resource, distance };
    return updatedResource;
  });
}

export function distanceBetween2Points(p1, p2) {
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
    console.log(error)
    return null;
  }
 
}

export function returnResourcesWithinMaxDistance(
  resources,
  maxDistance,
  coords
) {
  const nearbyResources = resources.filter(
    (resource) =>
      distanceBetween2Points(coords, [resource.LATITUDE || resource.Latitude || resource.SCHOOL_LATITUDE, resource.LONGITUDE || resource.Longitude || resource.SCHOOL_LONGITUDE]) <=
      maxDistance
  );
  return nearbyResources;
}

const addDistanceToResourcesMine = (resources, coords) => resources.map((resource) => {
  const distance = distanceBetween2Points(coords, [
    resource.LATITUDE || resource.Latitude || resource.SCHOOL_LATITUDE,
    resource.LONGITUDE || resource.Longitude || resource.SCHOOL_LONGITUDE,
  ]);
  const updatedResource = { ...resource, distance };
  return updatedResource;
  })

export const getProximityData = async (resources, coords) => {
  const final = Promise.all(Object.entries(resources).map(async ([resource, resourceId]) => {
    const resourceData = await getResourceData(resourceId);
    const resourcesWithinMax = returnResourcesWithinMaxDistance(resourceData, 50, coords)
    return [resource, addDistanceToResourcesMine(resourcesWithinMax, coords)];
  }));
  const result = await final;
  return Object.fromEntries(result);
};
