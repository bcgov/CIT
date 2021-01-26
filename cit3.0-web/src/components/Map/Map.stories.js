import React from 'react';
import Map from './Map';

export default {
    title: 'Map',
    component: Map
};

const coords = [48.452708, -123.369984];

export const InvestmentsMap = () => (
    <div style={{height: '800px'}}>
        <Map coords={coords} scrollWheelZoom={true}/>
    </div>
);
