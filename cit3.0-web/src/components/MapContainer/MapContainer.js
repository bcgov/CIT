import React, { useState, useEffect } from 'react';
import Map from '../Map/Map';
import { Input, Button } from 'shared-components';
// import InvestOpForm from '../InvestOpForm/InvestOpForm';
import {
    getAddressData,
    getHospitalData,
    returnResourcesWithinMaxDistance

} from '../../helpers/resourceCalls'

export default function MapContainer() {

    const [ address, setAddress ] = useState("");
    const [ coords, setCoords ] = useState( [49.2827, -123.1207]);
    const [nearbyHospitals, setNearbyHospitals] = useState([])

    const getResources = async () => {
        const data = await getAddressData(address);
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
