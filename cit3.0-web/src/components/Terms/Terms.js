/* eslint-disable jsx-a11y/label-has-associated-control */
import PropTypes from "prop-types";
import { Alert } from "shared-components";

export default function Terms({ agreed, setAgreed }) {
  const input = (
    <div>
      <p>
        The Connectivity Division on behalf of the Ministry of Citizens’
        Services will be collecting business contact information for the purpose
        of promoting community investment opportunities in British Columbia.
        Information is collected under the{" "}
        <a href="https://www2.gov.bc.ca/gov/content/data/open-data/open-government-licence-bc">
          Open Government License - British Columbia
        </a>
        . Please do not include any third-party information (i.e. talk about
        others) and/or any personally identifiable information in the open text
        fields; only business related information should be supplied.
        <br />
      </p>
      <p>
        Should you have any questions about the collection of this business
        information please
        <a href="mailto:citinfo@gov.bc.ca">contact us</a>.
      </p>
      <input
        aria-labelledby="agree-label"
        className="mr-2"
        name="agree-check"
        value="agree-check"
        type="checkbox"
        onChange={(e) => setAgreed(e.target.checked)}
        checked={agreed}
      />
      <label id="agree-label" htmlFor="agree-check">
        <b>I agree to the Terms of Use</b>
      </label>
    </div>
  );
  return (
    <Alert
      icon={<></>}
      type="warning"
      styling="bcgov-warning-background"
      element={input}
    />
  );
}

Terms.defaultProps = {
  agreed: false,
};

Terms.propTypes = {
  agreed: PropTypes.bool,
  setAgreed: PropTypes.func.isRequired,
};
