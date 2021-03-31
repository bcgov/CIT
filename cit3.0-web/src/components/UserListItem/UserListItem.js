import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { formatDate } from "../../helpers/helpers";

const UserListItem = ({ user }) => (
  <div key={user.id} className="user-table-row w-100">
    <Row>
      <Col>{user.name}</Col>
      <Col>{user.email}</Col>
      <Col>
        {user.municipalities.length &&
          user.municipalities.map((muni) => (
            <>
              <p>{muni.name}</p>
              <br />
            </>
          ))}
        {user.regionalDistricts.length &&
          user.regionalDistricts.map((RD) => (
            <>
              <p>{RD.name}</p>
              <br />
            </>
          ))}
      </Col>
      <Col>{formatDate(user.dateCreated)}</Col>
      <Col />
    </Row>
  </div>
);

UserListItem.propTypes = {
  user: PropTypes.shape().isRequired,
};

export default UserListItem;
