import { useKeycloak } from "@react-keycloak/web";
import _ from "lodash";
import Roles from "../constants/roles";
import Claims from "../constants/claims";

// /**
//  * IUserInfo interface, represents the userinfo provided by keycloak.
//  */
// export interface IUserInfo {
//   displayName?: string;
//   username: string;
//   name?: string;
//   preferred_username?: string;
//   firstName?: string;
//   lastName?: string;
//   email: string;
//   groups: string[];
//   roles: string[];
//   given_name?: string;
//   family_name?: string;
//   agencies: number[];
// }

// /**
//  * IKeycloak interface, represents the keycloak object for the authenticated user.
//  */
// export interface IKeycloak {
//   obj: any;
//   displayName?: string;
//   username: string;
//   name?: string;
//   preferred_username?: string;
//   firstName?: string;
//   lastName?: string;
//   email?: string;
//   roles: string[];
//   agencyId?: number;
//   isAdmin: boolean;
//   hasRole(role?: string | Array<string>): boolean;
//   hasClaim(claim?: string | Array<string>): boolean;
//   hasAgency(agency?: number): boolean;
//   agencyIds: number[];
//   canUserEditProperty: (property: IProperty | null) => boolean;
//   canUserViewProperty: (property: IProperty | null) => boolean;
//   canUserDeleteProperty: (property: IProperty | null) => boolean;
// }

/**
 * Provides extension methods to interact with the `keycloak` object.
 */
export function useKeycloakWrapper() {
  const { keycloak } = useKeycloak();
  const userInfo = keycloak && keycloak.userInfo;

  /**
   * Determine if the user has the specified 'claim'
   * @param claim - The name of the claim
   */
  const hasClaim = (claim) =>
    claim !== undefined &&
    claim !== null &&
    userInfo &&
    userInfo.roles &&
    (typeof claim === "string"
      ? userInfo.roles.includes(claim)
      : claim.some((c) => userInfo.roles.includes(c)));

  /**
   * Determine if the user belongs to the specified 'role'
   * @param role - The role name or an array of role name
   */
  const hasRole = (role) =>
    role !== undefined &&
    role !== null &&
    userInfo &&
    userInfo.groups &&
    (typeof role === "string"
      ? userInfo.groups.includes(role)
      : role.some((r) => userInfo.groups.includes(r)));

  /**
   * Determine if the user belongs to the specified 'agency'
   * @param agency - The agency name
   */
  const hasAgency = (agency) =>
    agency !== undefined &&
    agency !== null &&
    userInfo &&
    userInfo.agencies &&
    userInfo.agencies.includes(agency);

  /**
   * Return an array of roles the user belongs to
   */
  const roles = () => (userInfo && userInfo.groups ? [...userInfo.groups] : []);

  /**
   * Return the user's username
   */
  const username = () => userInfo && userInfo.username;

  /**
   * Return the user's display name
   */
  const displayName = () =>
    userInfo && (userInfo.name || userInfo.preferred_username);

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

  /**
   * Return true if the user has permissions to edit this opportunity
   */
  const canUserEditOpportunity = (property) =>
    !!property &&
    (hasClaim(Claims.ADMIN_PROPERTIES) ||
      (hasClaim(Claims.PROPERTY_EDIT) &&
        !!property.agencyId &&
        hasAgency(property.agencyId) &&
        !_.some(
          property.projectNumbers ? property.projectNumbers : "",
          _.method("includes", "SPP")
        )));

  /**
   * Return true if the user has permissions to delete this property
   */
  const canUserDeleteOpportunity = (property) =>
    !!property &&
    (hasClaim(Claims.ADMIN_PROPERTIES) ||
      (hasClaim(Claims.PROPERTY_EDIT) &&
        !!property.agencyId &&
        hasAgency(property.agencyId) &&
        !_.some(
          property.projectNumbers ? property.projectNumbers : "",
          _.method("includes", "SPP")
        )));

  /**
   * Return true if the user has permissions to edit this property
   */
  const canUserViewOpportunity = (property) =>
    !!property &&
    (hasClaim(Claims.ADMIN_PROPERTIES) ||
      (hasClaim(Claims.PROPERTY_VIEW) &&
        !!property.agencyId &&
        hasAgency(property.agencyId)));

  return {
    obj: keycloak,
    username: username(),
    displayName: displayName(),
    firstName: firstName(),
    lastName: lastName(),
    email: email(),
    isAdmin:
      hasRole(Roles.SYSTEM_ADMINISTRATOR) ||
      hasRole(Roles.AGENCY_ADMINISTRATOR),
    roles: roles(),
    agencyId: userInfo && userInfo.agencies.find((x) => x),
    hasRole,
    hasClaim,
    hasAgency,
    agencyIds: userInfo && userInfo.agencies,
    canUserEditOpportunity,
    canUserDeleteOpportunity,
    canUserViewOpportunity,
  };
}

export default { useKeycloakWrapper };
