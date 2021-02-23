import React, { lazy, Suspense } from 'react';

const LazyOpportunityPage = lazy(() => import('./OpportunityPage'));

const OpportunityPage = props => (
  <Suspense fallback={null}>
    <LazyOpportunityPage {...props} />
  </Suspense>
);

export default OpportunityPage;
