import { useKeycloak } from "@react-keycloak/web";
import Roles from "../constants/roles";

/**
 * Provides extension methods to interact with the `keycloak` object.
 */
export function useKeycloakWrapper() {
  const { keycloak } = useKeycloak();
  const userInfo = keycloak && keycloak.userInfo;

  /**
   * Determine if the user belongs to the specified 'role'
   * @param role - The role name or an array of role name
   */
  const hasRole = (role) =>
    role !== undefined &&
    role !== null &&
    userInfo &&
    userInfo.client_roles &&
    (typeof role === "string"
      ? userInfo.client_roles.includes(role)
      : role.some((r) => userInfo.client_roles.includes(r)));

  /**
   * Return an array of roles the user belongs to
   */
  const roles = () =>
    userInfo && userInfo.client_roles ? [...userInfo.client_roles] : [];

  /**
   * Return the user's username
   */
  const username = () => userInfo && userInfo.username;

  /**
   * Return the user's display name
   */
  const displayName = () =>
    userInfo && (userInfo.name || userInfo.idir_username);

  /**
   * Return the user's identity provider
   */
  const idp = () =>
    userInfo &&
    userInfo.preferred_username.slice(
      userInfo.preferred_username.indexOf("@") + 1
    );

  /**
   * Return the user's first name
   */
  const firstName = () =>
    userInfo && (userInfo.firstName || userInfo.given_name);

  /**
   * Return the user's last name
   */
  const lastName = () =>
    userInfo && (userInfo.lastName || userInfo.family_name);

  /**
   * Return the user's email
   */
  const email = () => userInfo && userInfo.email;

  return {
    obj: keycloak,
    username: username(),
    displayName: displayName(),
    firstName: firstName(),
    lastName: lastName(),
    email: email(),
    idp: idp(),
    isAdmin:
      hasRole(Roles.SYSTEM_ADMINISTRATOR) || hasRole(Roles.SUPER_ADMINISTRATOR),
    roles: roles(),
    hasRole,
  };
}

export default { useKeycloakWrapper };
