import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import OpportunityDeletePage from './OpportunityDeletePage';

describe('<OpportunityDeletePage />', () => {
  test('it should mount', () => {
    render(<OpportunityDeletePage />);
    
    const opportunityDeletePage = screen.getByTestId('OpportunityDeletePage');

    expect(opportunityDeletePage).toBeInTheDocument();
  });
});