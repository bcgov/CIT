/* eslint-disable */
import React from 'react';
import { storiesOf } from '@storybook/react';
import LocationsPanel from './LocationsPanel';

const coords = {
    lat: -123.723323,
    lng: 48.785009
};

const munis = [
    {name: "Duncan", link: "www.example.com", distance: 1.23},
    {name: "Duncan", link: "www.example.com", distance: 4.56},
    {name: "Duncan", link: "www.example.com", distance: 7.89},
];

storiesOf('LocationsPanel', module).add('default', () => <LocationsPanel address="3045 Gibbins Road, Duncan, BC" coords={coords} municipalities={munis} />);
