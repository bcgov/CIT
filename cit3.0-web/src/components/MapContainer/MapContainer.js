import React, { useState, useEffect } from 'react';
import Map from '../Map/Map';
import { Input, Button } from 'shared-components';
import InvestOpForm from '../InvestOpForm/InvestOpForm';
import {
    getAddressData,
    getHospitalData,
    returnResourcesWithinMaxDistance

} from '../../helpers/resourceCalls'

export default function MapContainer() {

    const [ address, setAddress ] = useState("");
    const [ coords, setCoords ] = useState( [49.2827, -123.1207]);
    // const [ addressProps, setAddressProps ] = useState({});
    const [ hospitals, setHospitals ] = useState([]);
    const [nearbyHospitals, setNearbyHospitals] = useState([])

    const getResources = async () => {
        const data = await getAddressData(address);
        // setAddressProps(data)
        console.log("data: ", data)
        setCoords([data.data.features[0].geometry.coordinates[1], data.data.features[0].geometry.coordinates[0]])
    }

    useEffect(() => {
        console.log("in use effect", coords)
        const hospitalData = async () => {
            const data = await getHospitalData()
            console.log(data)
            const hospitalArr = data.data.result.records
            const nearbyHospitals = returnResourcesWithinMaxDistance(hospitalArr, 50, coords);
            setNearbyHospitals(nearbyHospitals);
        }
        if (coords[0] !== 49.2827) {
             hospitalData()    
        }
    }, [coords])

    // useEffect(() => {
    //     if (hospitals.length) {
    //         console.log("nearbyHospitals2")
    //         const nearbyHospitals = returnResourcesWithinMaxDistance(hospitals, 50, coords);
    //         setNearbyHospitals(nearbyHospitals);
    //     }
        
    // }, [hospitals])

    // const getAddressData = () => {
    //     axios.get(`https://geocoder.api.gov.bc.ca/addresses.json?addressString=${address}`, {
    //         headers: {
    //             'apikey': process.env.REACT_APP_GEOCODER_API_KEY
    //         }
    //     })
    //     .then(async(data) => {
    //         // console.log(data)
    //         setCoords([data.data.features[0].geometry.coordinates[1], data.data.features[0].geometry.coordinates[0]]);
    //         setAddressProps(data.data.features[0].properties);        
    //     })
    //     .catch(err => console.log("ERROR: ", err))
    // }


    // const getHospitalData = () => {
    //     axios.get("https://catalogue.data.gov.bc.ca/api/3/action/datastore_search?resource_id=5ff82cf4-0448-4063-804a-7321f0f2b4c6&limit=10000")
    //     .then(data => {
    //         console.log(data.data.result.records)
    //         setHospitals(data.data.result.records)
    //         returnResourcessWithinMaxDistance(data.data.result.records, 50);
    //     })
    // }

    // useEffect(getHospitalData, [coords])

    // const distanceBetween2Points = (p1, p2) => {
    //     const lat1 = p1[0]/(180/Math.PI)
    //     const lat2 = p2[0]/(180/Math.PI)
    //     const lon1 = p1[1]/(180/Math.PI)
    //     const lon2 = p2[1]/(180/Math.PI)
    //     const distance = 6371*Math.acos(Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon1 -lon2))
    //     console.log(distance + "kms")
    //     return distance
    // }

    // const returnResourcessWithinMaxDistance = (resources, maxDistance) => {
    //     // console.log("hospitals: ", hospitals);
    //     console.log("state coords: should be 123.3953581: ",coords)
    //     let nearbyResources = 
    //     resources.filter(resource => {
    //         // console.log( [hospital.LATITUDE, hospital.LONGITUDE])
    //         return distanceBetween2Points([48.59509, -123.3953581], [resource.LATITUDE, resource.LONGITUDE]) <= maxDistance 
    //     });
    //     console.log("nearby: ", nearbyResources)
    // }


    const input = {
        label: "",
        id: "address",
        placeholder: "Address",
        isReadOnly: false,
        isRequired: true,
        styling: "bcgov-editable-white"
    }


    return (
        
        <div className="d-flex flex-column justify-content-between">
            {console.log("rendered", coords)}
            {console.log("NEARBY: ", nearbyHospitals)}
            <Input input={{...input}} onChange={setAddress}/>
            <Button 
                onClick={getResources}
                label="Search"
                styling="bcgov-normal-blue btn" 
            />
            {/* {distanceBetween2Points([48.594199, -123.411323], [48.59509, -123.395381])} */}
            <div className="d-flex justify-content-center align-items-center p-2 m-2" style={{height: '500px', width: '500px'}}>
                <Map coords={coords}/>
            </div>
            <div>
                {/* <InvestOpForm /> */}
            </div>
            {
                nearbyHospitals.length ?
                nearbyHospitals.map((hospital, i) => {
                    return <div key={i}>{hospital.SV_NAME}</div>
                }) : null
            }
        </div>
        
    )

}
