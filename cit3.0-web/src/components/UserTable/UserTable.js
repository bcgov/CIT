import Container from "react-bootstrap/Container";
import { v4 } from "uuid";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./UserTable.css";
import UserListItem from "../UserListItem/UserListItem";
import UserFactory from "../../store/factory/UserFactory";

export default function UserTable(props) {
  const users = props.tableData;

  const table = (
    <div className="user-table w-100">
      <Container fluid>
        {!props.public && (
          <Row>
            <Col>
              <b>Name</b>
            </Col>
            <Col>
              <b>BCeID</b>
            </Col>
            <Col>
              <b>Communities</b>
            </Col>
            <Col>
              <b>Date Added</b>
            </Col>
            <Col>
              <b>Actions</b>
            </Col>
          </Row>
        )}
        {users &&
          users.map((userData) => {
            const user = UserFactory.createStateFromResponse(userData);
            return <UserListItem key={v4()} user={user} />;
          })}
      </Container>
    </div>
  );

  return table;
}
