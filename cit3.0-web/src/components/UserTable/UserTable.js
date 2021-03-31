import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { v4 } from "uuid";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./UserTable.css";
import { Button } from "shared-components";
import { Modal, Button as BTN } from "react-bootstrap";
import UserListItem from "../UserListItem/UserListItem";
import UserFactory from "../../store/factory/UserFactory";
import { useKeycloakWrapper } from "../../hooks/useKeycloakWrapper";
import {
  deleteUser,
  getUsers,
  updateUserAssignments,
} from "../../store/actions/user";

const UserTable = () => {
  const keycloak = useKeycloakWrapper();

  const [isDelete, setDelete] = useState(false);
  const [show, setShow] = useState(false);
  const [label, setLabel] = useState("");
  const [body, setBody] = useState("");
  const [users, setUsers] = useState([]);
  const [userToUpdate, setUserToUpdate] = useState({});
  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
  };

  const handleRemoveMunicipality = (index) => {
    userToUpdate.municipalities = userToUpdate.municipalities.filter(
      (_, ind) => ind !== index
    );
    setUserToUpdate({ ...userToUpdate });
  };

  const handleRemoveRegional = (index) => {
    userToUpdate.regionalDistricts = userToUpdate.regionalDistricts.filter(
      (_, ind) => ind !== index
    );
    setUserToUpdate({ ...userToUpdate });
  };

  const handelEditAction = (user) => {
    setUserToUpdate(user);
  };

  // Needed to break reactivity of userToUpdate
  useEffect(() => {
    // Bad reactivity, exit
    if (!Object.entries(userToUpdate).length || isDelete) {
      return;
    }
    setLabel("Edit User");
    setBody(
      <Container>
        <Row>
          <p>Communities</p>
        </Row>
        <Row>
          <Col>
            {userToUpdate.municipalities.length ? (
              userToUpdate.municipalities.map((muni, index) => (
                <Row>
                  <Col key={index}>{muni.name}</Col>
                  <Col>
                    <BTN
                      variant="link"
                      onClick={() => handleRemoveMunicipality(index)}
                    >
                      Remove
                    </BTN>
                  </Col>
                </Row>
              ))
            ) : (
              <Row />
            )}
            {userToUpdate.regionalDistricts.length ? (
              userToUpdate.regionalDistricts.map((RD, index) => (
                <Row>
                  <Col key={index}>{RD.name}</Col>
                  <Col>
                    <BTN
                      variant="link"
                      onClick={() => handleRemoveRegional(index)}
                    >
                      Remove
                    </BTN>
                  </Col>
                </Row>
              ))
            ) : (
              <Row />
            )}
          </Col>
        </Row>
      </Container>
    );
    handleShow();
  }, [userToUpdate]);

  const handleDeleteAction = (user) => {
    setUserToUpdate(user);
    setDelete(true);
    setLabel("Delete User");
    setBody(
      `Please confirm you want to delete ${user.name} from the list of users?`
    );
    handleShow();
  };

  const handleDelete = (user) => {
    deleteUser(user, keycloak.obj.token).then(() => {
      setShow(false);
      getUsers().then((response) => {
        setUsers(response.data);
      });
    });
  };

  const handleSave = (user) => {
    updateUserAssignments(user, keycloak.obj.token).then(() => {
      setShow(false);
      getUsers().then((response) => {
        setUsers(response.data);
      });
    });
  };

  const handleSubmit = () => {
    if (isDelete) {
      handleDelete(userToUpdate);
    } else {
      handleSave(userToUpdate);
    }
  };

  useEffect(() => {
    getUsers().then((response) => {
      setUsers(response.data);
    });
  }, []);

  return (
    <div className="user-table w-100 ">
      <Container fluid className="bordered-light">
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
        {users &&
          users.map((userData) => {
            const user = UserFactory.createStateFromResponse(userData);
            return (
              <UserListItem
                key={v4()}
                user={user}
                handelEditAction={() => handelEditAction(user)}
                handleDeleteAction={() => handleDeleteAction(user)}
              />
            );
          })}
      </Container>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>{label}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{body}</Modal.Body>
        <Modal.Footer>
          <Button
            label="Cancel"
            styling="BC-Gov-SecondaryButton mr-auto modal-reset-button btn"
            onClick={handleClose}
          />
          <Button
            label={isDelete ? "Confirm" : "Save"}
            styling="bcgov-normal-blue modal-save-button btn"
            onClick={handleSubmit}
          />
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserTable;
