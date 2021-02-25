import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import axios from "axios";

import OpportunitiesMap from "./OpportunitiesMap";

export default function OpportunityMapContainer() {
  const [opportunities, setOpportunities] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/pipeline/opportunities`)
      .then((data) => {
        console.log(data.data.results);
        setOpportunities(data.data.results);
      })
      .catch((err) => {
        console.log(err);
        setOpportunities([]);
      });
  }, [opportunities]);
  return <OpportunitiesMap opportunities={opportunities} />;
}
