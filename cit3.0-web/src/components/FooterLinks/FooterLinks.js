import { useState } from "react";
import PropTypes from "prop-types";
import { Row, Col } from "react-bootstrap";
import { Button } from "shared-components";
import { useHistory } from "react-router-dom";

export default function FooterLinks({ type }) {
  const history = useHistory();

  const searchPage = {
    heading: "Promote investment properties in your community",
    subText:
      "Are you working for a community and would like to promote local investment opportunities such as the ones you can discover on this site?  Click here to start adding your Community's opportunities.",
    buttonText: "Add a Listing",
    link: "/investmentopportunities/dashboard",
  };

  const AddOppPage = {
    heading: "View Community Investment Opportunities in B.C.",
    subText:
      "Would you like to see all the investment opportunities in your region or find inspiration for a new listing?  View the Investment Opportunities Tool.",
    buttonText: "Search Opportunities",
    link: "/investmentopportunities/search",
  };
  const [data] = useState(type === "search-page" ? searchPage : AddOppPage);

  return (
    <Row className="footer-main">
      <Col sm={9}>
        <h3 className="pb-2">{data.heading}</h3>
        <p>{data.subText}</p>
      </Col>
      <Col sm={3} className="d-flex justify-content-center align-items-center">
        <Button
          onClick={() => history.push(data.link)}
          styling="button-yellow primary btn"
          label={data.buttonText}
        />
      </Col>
    </Row>
  );
}

FooterLinks.propTypes = {
  type: PropTypes.string.isRequired,
};
