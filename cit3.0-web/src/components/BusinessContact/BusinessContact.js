import React from "react";
import PropTypes from "prop-types";
import styles from "./BusinessContact.module.css";

const DEFAULT_VALUE = "N/A";

const BusinessContact = ({ name, email }) => {
  let mailToEmail = "";
  if (email !== DEFAULT_VALUE) {
    mailToEmail = `mailto:${email}`;
  }
  return (
    <div data-testid="BusinessContact" className={styles.BusinessContact}>
      <div className="d-flex flex-row mb-2">
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 24 24"
          size="48"
          height="48"
          width="48"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
        <h5>Business Contact</h5>
      </div>
      <div>
        <div className="d-flex flex-row">
          <span className="key" htmlFor="business-name">
            Name:
          </span>
          <b id="business-name">{name}</b>
        </div>
        <div className="d-flex flex-row">
          <span className="key" htmlFor="business-email">
            Email:
          </span>
          {mailToEmail ? (
            <a href={mailToEmail}>
              <b id="business-email">{email}</b>
            </a>
          ) : (
            <b id="business-email">{email}</b>
          )}
        </div>
      </div>
    </div>
  );
};

BusinessContact.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
};

BusinessContact.defaultProps = {
  name: DEFAULT_VALUE,
  email: DEFAULT_VALUE,
};

export default BusinessContact;
