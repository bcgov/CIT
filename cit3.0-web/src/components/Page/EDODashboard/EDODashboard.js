import { useState, useEffect } from "react";
import { Button } from "shared-components";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./EDODashboard.css";
import { useDispatch, useSelector } from "react-redux";
import OpportunityTable from "../../OpportunityTable/OpportunityTable";
import { resetOpportunity } from "../../../store/actions/opportunity";
import { GET_OPPORTUNITIES_LIST_URL } from "../../../store/constants/api-urls";
import { getUser, resetUser, setUser } from "../../../store/actions/user";
import { useKeycloakWrapper } from "../../../hooks/useKeycloakWrapper";
import UserFactory from "../../../store/factory/UserFactory";

export default function EDODashboard() {
  const [tableData, setTableData] = useState(null);
  const [communities, setCommunities] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const keycloak = useKeycloakWrapper();
  const user = useSelector((state) => state.user);
  const getUserOpportunities = () => {
    getUser({ email: keycloak.email }).then((response) => {
      const { data: users } = response;
      if (users.length) {
        const appUser = users[0];
        const places = [];
        appUser.municipalities.forEach((m) => places.push(m.name));
        appUser.regional_districts.forEach((r) => places.push(r.name));
        setCommunities(places.join(", "));
        axios
          .get(`${GET_OPPORTUNITIES_LIST_URL}?user_id=${appUser.id}`)
          .then((data) => {
            setTableData(data.data.results);
          })
          .catch((err) => {
            /* eslint-disable-next-line */
            console.error(err);
            setTableData([]);
          });
      }
    });
  };
  useEffect(() => {
    getUserOpportunities();
  }, []);

  // Capture first login
  useEffect(() => {
    getUserOpportunities();
  }, [user]);

  const goToMap = () => {
    dispatch(resetOpportunity());
    dispatch(resetUser());
    history.push("/opportunity");
  };

  let dataSection;
  let addOpportunityButton;

  if (!tableData) {
    dataSection = null;
    addOpportunityButton = null;
  } else if (tableData.length === 0) {
    dataSection = (
      <>
        <h1 className="dashboard-header">
          Your Community Promoted Opportunities
        </h1>
        <p className="dashboard-text">
          As soon as you add opportunities, you can see the status and manage
          them here.
        </p>
      </>
    );
    addOpportunityButton = (
      <Button
        onClick={goToMap}
        label="Add your first opportunity"
        styling="bcgov-normal-blue btn"
      />
    );
  } else {
    dataSection = (
      <>
        <h1 className="dashboard-header">
          {`Your Promoted Opportunities${
            communities ? ` in ${communities}` : ""
          }`}
        </h1>
        <OpportunityTable tableData={tableData} />
      </>
    );
    addOpportunityButton = (
      <Button
        onClick={goToMap}
        label="+ Add your opportunity"
        styling="bcgov-normal-blue btn"
      />
    );
  }

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-header">How it works</h1>
      <p className="dashboard-text">
        Community representatives can add up to five properties per community to
        be featured on the tool. To create a new listing, follow a simple
        process to add some key information about the property. The tool will
        automatically provide additional location information to help investors
        and site selectors quickly evaluate whether the site meets their
        specific needs. All listings will be reviewed prior to publication and
        will go live within 3-5 business days.
      </p>
      <p className="dashboard-text">
        Before you add a listing, review the eligibility criteria to ensure the
        property meets the eligibility criteria.
      </p>
      <ul>
        <li>
          Properties must be zoned for industrial, commercial, or agricultural
          use. Industrial properties of any size may be listed. Commercial and
          agricultural
        </li>
        <li>Land must be available for sale or lease.</li>
        <li>
          Land may be publicly or privately owned but may only be listed with
          the written permission of the landowner.
        </li>
        <li>
          Land must be free of constraints that could impact the developable
          area or range of land uses permitted on the property.
          <br />
          Potential constraints could include, but are not limited to:
          <ul>
            <li>Restrictions on title</li>
            <li>Future planned roads or existing rights-of-way</li>
            <li>dentified flood zone</li>
            <li>
              Presence of provincially significant cultural or natural heritage
              features
            </li>
          </ul>
        </li>
      </ul>
      <p className="dashboard-text mb-4">
        Listings must be approved by either a municipality, regional district,
        electoral area, province, First Nation or a regional economic
        development organization, and from the Chief Administrative Officer or
        their delegate.
      </p>
      <div className="add-opportunity-button">{addOpportunityButton}</div>
      <hr />
      {dataSection}
    </div>
  );
}
