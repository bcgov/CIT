import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PowerBiReport from './PowerBiReport';

describe('<PowerBiReport />', () => {
  test('it should mount', () => {
    render(<PowerBiReport />);
    
    const powerBiReport = screen.getByTestId('PowerBiReport');

    expect(powerBiReport).toBeInTheDocument();
  });
});