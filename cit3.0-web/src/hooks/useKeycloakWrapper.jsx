import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import Roles from "../constants/roles";

/**
 * Provides extension methods to interact with the `keycloak` object.
 */
export function useKeycloakWrapper() {
  const { keycloak, isAuthenticated } = useContext(AuthContext);
  const userInfo = keycloak?.tokenParsed || null;

  /**
   * Determine if the user belongs to the specified 'role'
   * @param {string|string[]} role - The role name or an array of role names
   */
  const hasRole = (role) =>
    role !== undefined &&
    role !== null &&
    userInfo?.client_roles &&
    (typeof role === "string"
      ? userInfo.client_roles.includes(role)
      : role.some((r) => userInfo.client_roles.includes(r)));

  /**
   * Return an array of roles the user belongs to
   */
  const roles = () => userInfo?.client_roles || [];

  /**
   * Return the user's username
   */
  const username = () => userInfo?.preferred_username || "";

  /**
   * Return the user's display name
   */
  const displayName = () => userInfo?.name || userInfo?.idir_username || "";

  /**
   * Return the user's identity provider
   */
  const idp = () =>
    userInfo?.preferred_username?.includes("@")
      ? userInfo.preferred_username.split("@")[1]
      : "";

  /**
   * Return the user's first name
   */
  const firstName = () => userInfo?.given_name || "";

  /**
   * Return the user's last name
   */
  const lastName = () => userInfo?.family_name || "";

  /**
   * Return the user's email
   */
  const email = () => userInfo?.email || "";

  return {
    obj: keycloak,
    authenticated: isAuthenticated,
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

export default useKeycloakWrapper;
