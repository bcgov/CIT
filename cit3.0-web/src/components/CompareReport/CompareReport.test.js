import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CompareReport from './CompareReport';

describe('<CompareReport />', () => {
  test('it should mount', () => {
    render(<CompareReport />);
    
    const compareReport = screen.getByTestId('CompareReport');

    expect(compareReport).toBeInTheDocument();
  });
});