import { Row, Col, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { formatDate } from "../../helpers/helpers";

const UserListItem = ({ user, handleEditAction, handleDeleteAction }) => (
  <div key={user.id} className="user-table-row w-100 p-2">
    <Row>
      <Col>{user.name}</Col>
      <Col>{user.email}</Col>
      <Col>
        {user.municipalities.length
          ? user.municipalities.map((muni) => (
              <p key={`m${muni.id}`}>{muni.name}</p>
            ))
          : null}
        {user.regionalDistricts.length
          ? user.regionalDistricts.map((Rd) => (
              <p key={`r${Rd.id}`}>{Rd.name}</p>
            ))
          : null}
      </Col>
      <Col>{formatDate(user.dateCreated)}</Col>
      <Col>
        {user.name !== "Unknown" ? (
          <div className="d-flex flex-column">
            <Button
              className="text-left"
              variant="link"
              onClick={handleEditAction}
            >
              Edit
            </Button>
            <Button
              className="text-left"
              variant="link"
              onClick={handleDeleteAction}
            >
              Delete User
            </Button>
          </div>
        ) : null}
      </Col>
    </Row>
  </div>
);

UserListItem.propTypes = {
  user: PropTypes.shape().isRequired,
  handleEditAction: PropTypes.func.isRequired,
  handleDeleteAction: PropTypes.func.isRequired,
};

export default UserListItem;
