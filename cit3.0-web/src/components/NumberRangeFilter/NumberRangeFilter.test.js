import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import NumberRangeFilter from './NumberRangeFilter';

describe('<NumberRangeFilter />', () => {
  test('it should mount', () => {
    render(<NumberRangeFilter />);
    
    const numberRangeFilter = screen.getByTestId('NumberRangeFilter');

    expect(numberRangeFilter).toBeInTheDocument();
  });
});