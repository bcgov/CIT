import axios from 'axios'


export async function getAddressData(address) {
    return await axios.get(`https://geocoder.api.gov.bc.ca/addresses.json?addressString=${address}`, {
        headers: {
            'apikey': process.env.REACT_APP_GEOCODER_API_KEY
        }
    })
    // .then((data) => {
    //     console.log(data)
    //     // setCoords([data.data.features[0].geometry.coordinates[1], data.data.features[0].geometry.coordinates[0]]);
    //     // setAddressProps(data.data.features[0].properties);       
    //     return data.data.features[0] 
    // })
    // .catch(err => console.log("ERROR: ", err))
}


export async function getHospitalData() {
    return await axios.get("https://catalogue.data.gov.bc.ca/api/3/action/datastore_search?resource_id=5ff82cf4-0448-4063-804a-7321f0f2b4c6&limit=10000")
    // .then(data => {
    //     console.log(data.data.result.records)
    //     return data.data.result.records
    // })
}


export function distanceBetween2Points(p1, p2) {
    const lat1 = p1[0]/(180/Math.PI)
    const lat2 = p2[0]/(180/Math.PI)
    const lon1 = p1[1]/(180/Math.PI)
    const lon2 = p2[1]/(180/Math.PI)
    const distance = 6371*Math.acos(Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon1 -lon2))
    return distance
}

export function returnResourcesWithinMaxDistance(resources, maxDistance, coords) {
    // console.log("hospitals: ", hospitals);
    console.log("state coords: should be 123.3953581: ",coords)
    let nearbyResources = 
    resources.filter(resource => {
        // console.log( [hospital.LATITUDE, hospital.LONGITUDE])
        return distanceBetween2Points(coords, [resource.LATITUDE, resource.LONGITUDE]) <= maxDistance 
    });
    console.log("nearby: ", nearbyResources)
    return nearbyResources
}

