/* eslint-disable */
import React from 'react';
import { storiesOf } from '@storybook/react';
import BusinessContact from './BusinessContact';

storiesOf('BusinessContact', module).add('default', () => <BusinessContact />);
storiesOf('BusinessContact', module).add('assigned', () => <BusinessContact name="Jane Doe" email="jane.doe@example.com" />);
