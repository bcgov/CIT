import { Container, Row, Col } from "react-bootstrap";
import Table from "react-bootstrap/Table";

const elements = [
  {
    "Data Source": "Census",
    "Metadata URL":
      "https://www12.statcan.gc.ca/rest/census-recensement/CPR2016.json?",
  },
  {
    "Data Source": "Civic Facilities",
    "Metadata URL":
      "https://catalogue.data.gov.bc.ca/dataset/ea7cd54f-1820-4f4a-8b2c-40c8a51f84bd",
  },
  {
    "Data Source": "Civic_leaders",
    "Metadata URL":
      "civicinfo.csv - should this be: https://www.civicinfo.bc.ca/people",
  },
  {
    "Data Source": "Communities",
    "Metadata URL":
      "COMMUNITIES_V6.csv - should this be: https://open.canada.ca/data/en/dataset/fe945388-1dd9-4a4a-9a1e-5c552579a28c",
  },
  {
    "Data Source": "Court Locations",
    "Metadata URL":
      "https://catalogue.data.gov.bc.ca/dataset/c95a2ad5-f62a-43d6-8678-80a617b6200e",
  },
  {
    "Data Source": "Current Census Regions",
    "Metadata URL":
      "https://catalogue.data.gov.bc.ca/dataset/1aebc451-a41c-496f-8b18-6f414cde93b7",
  },
  {
    "Data Source": "Customs Port of Entry",
    "Metadata URL":
      "https://catalogue.data.gov.bc.ca/dataset/4fac3ad6-8749-4741-ac98-527b23e4b0b2",
  },
  {
    "Data Source": "Diagnostic Facilities",
    "Metadata URL":
      "https://catalogue.data.gov.bc.ca/dataset/4f75e9f6-1459-4ae2-990d-b53b1c389525",
  },
  {
    "Data Source": "Digital Road Atlas (DRA)",
    "Metadata URL":
      "https://catalogue.data.gov.bc.ca/dataset/bb060417-b6e6-4548-b837-f9060d94743e",
  },
  {
    "Data Source": "Emergency Social Services Facilities",
    "Metadata URL":
      "https://catalogue.data.gov.bc.ca/dataset/8473689f-2d06-4e84-ac8b-e91033fd0f0b",
  },
  {
    "Data Source": "Environmental Assessment Office (EAO) Points",
    "Metadata URL":
      "https://catalogue.data.gov.bc.ca/dataset/bc1c5380-6fca-4666-996b-049ad8ca04cc",
  },
  {
    "Data Source": "First Nations Reserves",
    "Metadata URL":
      "https://catalogue.data.gov.bc.ca/dataset/c2ce81af-78c1-467c-b47e-c392cd0a771f",
  },
  {
    "Data Source": "First Responders",
    "Metadata URL":
      "https://catalogue.data.gov.bc.ca/dataset/652c49eb-7295-4ae2-8f26-39103f23b50d",
  },
  {
    "Data Source": "Freshwater Atlas Lakes",
    "Metadata URL":
      "https://catalogue.data.gov.bc.ca/dataset/cb1e3aba-d3fe-4de1-a2d4-b8b6650fb1f6",
  },
  {
    "Data Source": "Freshwater Atlas Rivers",
    "Metadata URL":
      "https://catalogue.data.gov.bc.ca/dataset/f7dac054-efbf-402f-ab62-6fc4b32a619e",
  },
  {
    "Data Source": "Health Authority Boundaries",
    "Metadata URL":
      "https://catalogue.data.gov.bc.ca/dataset/7bc6018f-bb4f-4e5d-845e-c529e3d1ac3b",
  },
  {
    "Data Source": "Hexagonal Grid",
    "Metadata URL":
      "https://catalogue.data.gov.bc.ca/dataset/a3badeec-feed-41d9-b33d-5ae41c19f27d",
  },
  {
    "Data Source": "Hospitals",
    "Metadata URL":
      "https://catalogue.data.gov.bc.ca/dataset/383eaf98-afd7-436a-9556-67ecf14f64a7",
  },
  {
    "Data Source": "Laboratory Services in BC",
    "Metadata URL":
      "https://catalogue.data.gov.bc.ca/dataset/401671c5-4fc4-4ffb-9e29-0cdc3c9433ba",
  },
  {
    "Data Source": "Local Government Offices",
    "Metadata URL":
      "https://catalogue.data.gov.bc.ca/dataset/0fe8083a-881a-4fa8-8925-3a23b788e1b9",
  },
  {
    "Data Source": "Major Processing Timber Processing Facilities",
    "Metadata URL":
      "https://catalogue.data.gov.bc.ca/dataset/67daf53d-e3bb-45ee-9121-8aa1193b7492",
  },
  {
    "Data Source": "Major Projects",
    "Metadata URL":
      "https://www2.gov.bc.ca/gov/content/employment-business/economic-development/industry/bc-major-projects-inventory",
  },
  {
    "Data Source": "Mapped Floodplains (Historical)",
    "Metadata URL":
      "https://catalogue.data.gov.bc.ca/dataset/cdf4900e-90c0-449f-beea-43b669bd76a8",
  },
  {
    "Data Source": "Municipalities",
    "Metadata URL":
      "https://catalogue.data.gov.bc.ca/dataset/e3c3c580-996a-4668-8bc5-6aa7c7dc4932",
  },
  {
    "Data Source": "Natural Resource Regions",
    "Metadata URL":
      "https://catalogue.data.gov.bc.ca/dataset/dfc492c0-69c5-4c20-a6de-2c9bc999301f",
  },
  {
    "Data Source": "Northern Rockies Census Division",
    "Metadata URL": "",
  },
  {
    "Data Source": "Permitted Mine Areas  - Major Mines",
    "Metadata URL":
      "https://catalogue.data.gov.bc.ca/dataset/01e8a35e-35e3-4b48-93a7-b0d7c9705b62",
  },
  {
    "Data Source": "Ports and Terminals",
    "Metadata URL":
      "https://catalogue.data.gov.bc.ca/dataset/5f3c273a-7a0d-4b5f-8059-b34cc3f116c7",
  },
  {
    "Data Source": "Post Secondary Institutions",
    "Metadata URL":
      "https://catalogue.data.gov.bc.ca/dataset/81558d54-1f96-46c2-94fe-56d26f69c4f5",
  },
  {
    "Data Source": "Provincial Electoral Districts",
    "Metadata URL":
      "https://catalogue.data.gov.bc.ca/dataset/9530a41d-6484-41e5-b694-acb76e212a58",
  },
  {
    "Data Source": "Railway Track",
    "Metadata URL":
      "https://catalogue.data.gov.bc.ca/dataset/4ff93cda-9f58-4055-a372-98c22d04a9f8",
  },
  {
    "Data Source": "Regional Districts",
    "Metadata URL":
      "https://catalogue.data.gov.bc.ca/dataset/d1aff64e-dbfe-45a6-af97-582b7f6418b9",
  },
  {
    "Data Source": "Research Centres",
    "Metadata URL":
      "https://catalogue.data.gov.bc.ca/dataset/7859ae46-2aa1-47ee-a05b-7d0daa472678",
  },
  {
    "Data Source": "Roads(national boradband data)",
    "Metadata URL":
      "https://open.canada.ca/data/en/dataset/00a331db-121b-445d-b119-35dbbe3eedd9",
  },
  {
    "Data Source": "School Districts",
    "Metadata URL":
      "https://catalogue.data.gov.bc.ca/dataset/78ec5279-4534-49a1-97e8-9d315936f08b",
  },
  {
    "Data Source": "Schools K-12",
    "Metadata URL":
      "https://catalogue.data.gov.bc.ca/dataset/95da1091-7e8c-4aa6-9c1b-5ab159ea7b42",
  },
  {
    "Data Source": "Service BC Locations",
    "Metadata URL":
      "https://catalogue.data.gov.bc.ca/dataset/2b44d212-5438-47a9-ad23-20eb8ada9709",
  },
  {
    "Data Source": "Tourism Room Revenues and Property Counts",
    "Metadata URL":
      "https://www2.gov.bc.ca/gov/content/data/statistics/business-industry-trade/industry/tourism",
  },
  {
    "Data Source": "Tsunami Notification Zones",
    "Metadata URL":
      "https://catalogue.data.gov.bc.ca/dataset/d9bafe48-5bf7-461b-a8d6-ba6d1e2245f0",
  },
  {
    "Data Source": "Walk-in Clinics",
    "Metadata URL":
      "https://catalogue.data.gov.bc.ca/dataset/5e2707c3-0aa4-4d2d-aedc-4dd0914b686a",
  },
  {
    "Data Source": "Wildfire Wildland Urban Interface Risk Class",
    "Metadata URL":
      "https://catalogue.data.gov.bc.ca/dataset/3c71551e-c1aa-4272-9c89-64fbd22a910d",
  },
];

export default function Datasources() {
  const headers = Object.keys(elements[0]);
  return (
    <Container style={{ margin: "5vh 10vw" }}>
      <Row>
        <Col>
          <h2 className="h1">Datasources</h2>
          <Table>
            <thead>
              <tr>
                <th>{headers[0]}</th>
                <th>{headers[1]}</th>
              </tr>
            </thead>
            <tbody>
              {elements
                ? elements.map((element) => (
                    <tr>
                      <th>{element[headers[0]]}</th>
                      <th>
                        <a
                          target="_blank"
                          rel="noreferrer"
                          href={element[headers[1]]}
                        >
                          {element[headers[1]]}
                        </a>
                      </th>
                    </tr>
                  ))
                : null}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}
