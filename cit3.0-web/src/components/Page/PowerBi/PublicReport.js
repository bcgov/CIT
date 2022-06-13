import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import ReportOverview from "../../ReportOverview/ReportOverview";
import "../HomePage/HomePage.scss";

export default function PublicReport() {
  const { zonetype, id, name } = useParams();

  const toZoneTypeString = (str) =>
    str
      .toLowerCase()
      .split("-")
      .map((word) => word.replace(word[0], word[0].toUpperCase()))
      .join(" ");

  const zoneType = toZoneTypeString(zonetype);

  let reportFilter;
  if (id) {
    reportFilter = {
      zoneType,
      zoneId: id,
    };
  } else {
    reportFilter = {
      zoneType,
      zoneName: name,
    };
  }

  console.log({ reportFilter });
  return (
    <>
      <Container className="my-4 user-story-top-container">
        <ReportOverview reportFilter={reportFilter} />
      </Container>
    </>
  );
}
