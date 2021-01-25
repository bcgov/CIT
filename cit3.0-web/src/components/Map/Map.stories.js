import React from 'react';
import 'leaflet/dist/leaflet.css';
import Map from './Map';

export default {
    title: 'Map',
    component: Map
};

const coords = [48.452708, -123.369984];

export const MapStory = () => (
    <div id="mapContainer" style={{height: '800px'}}>
        <Map coords={coords} scrollWheelZoom={true}/>
    </div>
);