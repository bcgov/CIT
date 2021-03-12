import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import InputRangeWithTextboxes from './InputRangeWithTextboxes';

describe('<InputRangeWithTextboxes />', () => {
  test('it should mount', () => {
    render(<InputRangeWithTextboxes />);
    
    const inputRangeWithTextboxes = screen.getByTestId('InputRangeWithTextboxes');

    expect(inputRangeWithTextboxes).toBeInTheDocument();
  });
});