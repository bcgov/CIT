import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ReviewOpportunity from './ReviewOpportunity';

describe('<ReviewOpportunity />', () => {
  test('it should mount', () => {
    render(<ReviewOpportunity />);
    
    const reviewOpportunity = screen.getByTestId('ReviewOpportunity');

    expect(reviewOpportunity).toBeInTheDocument();
  });
});