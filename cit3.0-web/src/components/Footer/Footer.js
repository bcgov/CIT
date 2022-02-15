import { Link } from "react-router-dom";

const LinkElement = (url, label) => (
  <li className="nav-item m-1">
    <a
      className="nav-link"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      {label}
    </a>
  </li>
);

const LinkRouteElement = (url, label) => (
  <li className="nav-item m-1">
    <Link className="nav-link" to={url}>
      {label}
    </Link>
  </li>
);

const FooterToggler = () => (
  <button
    className="navbar-toggler"
    type="button"
    data-toggle="collapse"
    data-target="#footerBar"
  >
    <span className="navbar-toggler-icon" />
  </button>
);

export default function Footer() {
  return (
    <footer className="bcgov-footer">
      <nav
        className="navbar navbar-expand-sm navbar-dark justify-content-end"
        aria-label="Footer"
      >
        <FooterToggler />
        <div className="collapse navbar-collapse flex-grow-0" id="footerBar">
          <ul className="navbar-nav text-right">
            {LinkElement("mailto:citinfo@gov.bc.ca", "Contact Us")}
            {LinkElement("https://www2.gov.bc.ca", "BC Government")}
            {LinkRouteElement("/Disclaimer", "Disclaimer")}
            {LinkElement(
              "https://www2.gov.bc.ca/gov/content/home/privacy",
              "Privacy"
            )}
            {LinkElement(
              "https://www2.gov.bc.ca/gov/content/home/accessibility",
              "Accessibility"
            )}
            {LinkElement(
              "https://www2.gov.bc.ca/gov/content/home/copyright",
              "Copyright"
            )}
          </ul>
        </div>
      </nav>
    </footer>
  );
}
