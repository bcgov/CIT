import { Row, Col, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { formatDate } from "../../helpers/helpers";

const UserListItem = ({ user, handelEditAction, handleDeleteAction }) => (
  <div key={user.id} className="user-table-row w-100 p-2">
    <Row>
      <Col>{user.name}</Col>
      <Col>{user.email}</Col>
      <Col>
        {user.municipalities.length
          ? user.municipalities.map((muni, index) => (
              <p key={index}>{muni.name}</p>
            ))
          : null}
        {user.regionalDistricts.length
          ? user.regionalDistricts.map((RD, index) => (
              <p key={index}>{RD.name}</p>
            ))
          : null}
      </Col>
      <Col>{formatDate(user.dateCreated)}</Col>
      <Col>
        <div className="d-flex flex-column">
          <Button
            className="text-left"
            variant="link"
            onClick={handelEditAction}
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
      </Col>
    </Row>
  </div>
);

UserListItem.propTypes = {
  user: PropTypes.shape().isRequired,
  handelEditAction: PropTypes.func.isRequired,
  handleDeleteAction: PropTypes.func.isRequired,
};

export default UserListItem;
