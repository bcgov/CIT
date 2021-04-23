import { Container, Row, Col } from "react-bootstrap";
import Table from "react-bootstrap/Table";

const elements = [
  {
    "Data Source": "BC Airports",
    "Metadata URL":
      "https://catalogue.data.gov.bc.ca/dataset/76b1b7a3-2112-4444-857a-afccf7b20da8",
  },
  {
    "Data Source": "Census Profiles (2016)",
    "Metadata URL": "https://catalogue.data.gov.bc.ca/group/census-profiles",
  },
  {
    "Data Source": "Customs Port of Entry",
    "Metadata URL":
      "https://catalogue.data.gov.bc.ca/dataset/4fac3ad6-8749-4741-ac98-527b23e4b0b2",
  },
  {
    "Data Source": "Digital Road Atlas (DRA)",
    "Metadata URL":
      "https://catalogue.data.gov.bc.ca/dataset/bb060417-b6e6-4548-b837-f9060d94743e",
  },
  {
    "Data Source": "Elevation (from Soils data)",
    "Metadata URL":
      "https://catalogue.data.gov.bc.ca/dataset/20150a67-5a2d-425f-8216-ff0f97f68df9",
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
    "Data Source": "Geolocated Placenames (Communities)",
    "Metadata URL":
      "https://open.canada.ca/data/en/dataset/fe945388-1dd9-4a4a-9a1e-5c552579a28c",
  },
  {
    "Data Source": "Hospitals",
    "Metadata URL":
      "https://catalogue.data.gov.bc.ca/dataset/383eaf98-afd7-436a-9556-67ecf14f64a7",
  },
  {
    "Data Source": "Municipalities",
    "Metadata URL":
      "https://catalogue.data.gov.bc.ca/dataset/e3c3c580-996a-4668-8bc5-6aa7c7dc4932",
  },
  {
    "Data Source": "Northern Rockies Census Division",
    "Metadata URL": "",
  },
  {
    "Data Source": "ParcelMap BC",
    "Metadata URL":
      "https://catalogue.data.gov.bc.ca/dataset/29a6171a-fab6-4644-b0f7-5d4e466f6837",
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
    "Data Source": "Roads(national broadband data)",
    "Metadata URL":
      "https://open.canada.ca/data/en/dataset/00a331db-121b-445d-b119-35dbbe3eedd9",
  },
  {
    "Data Source": "Soils Survey",
    "Metadata URL":
      "https://catalogue.data.gov.bc.ca/dataset/20150a67-5a2d-425f-8216-ff0f97f68df9",
  },
  {
    "Data Source": "Tsunami Notification Zones",
    "Metadata URL":
      "https://catalogue.data.gov.bc.ca/dataset/d9bafe48-5bf7-461b-a8d6-ba6d1e2245f0",
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
