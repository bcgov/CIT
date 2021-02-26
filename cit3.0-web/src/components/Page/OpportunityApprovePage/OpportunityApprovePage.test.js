import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import OpportunityApprovePage from './OpportunityApprovePage';

describe('<OpportunityApprovePage />', () => {
  test('it should mount', () => {
    render(<OpportunityApprovePage />);
    
    const opportunityApprovePage = screen.getByTestId('OpportunityApprovePage');

    expect(opportunityApprovePage).toBeInTheDocument();
  });
});