import _ from "lodash";
import {
  ADD_ALL,
  ADD_ADDRESS,
  ADD_COORDS,
  ADD_PID,
  ADD_GEOMETRY,
  ADD_PARCEL_OWNER,
  ADD_PARCEL_SIZE,
  ADD_SITE_ID,
  ADD_BUSINESS_CONTACT,
  ADD_BUSINESS_CONTACT_NAME,
  ADD_BUSINESS_CONTACT_EMAIL,
  ADD_RESOUCE_IDS,
  ADD_NEARBY_RESOUCES,
  RESET_OPPORTUNITY,
  ADD_SITE_INFO,
  ADD_USER_INFO,
  ADD_RENTAL_PRICE,
  ADD_SALE_PRICE,
  ADD_NAME,
  ADD_SERVICE,
  ADD_SERVICE_CAPACITY,
  ADD_APPROVAL_STATUS,
  ADD_PUBLIC_NOTE,
  ADD_PRIVATE_NOTE,
} from "../constants/action-types";

import { OPPORTUNITY_MODEL } from "../models/opportunity";

/**
 * Opportunity get/reset actions get processed
 *
 * @param {Object} state set to initial state, then contains the current state
 * @param {String} action.type incoming action type
 * @param {String} action.payload incoming action payload, varying on opportunity field
 */
export default function opportunity(
  state = { ...OPPORTUNITY_MODEL() },
  action
) {
  /* eslint-disable no-param-reassign */
  switch (action.type) {
    case ADD_ALL:
      state = { ...OPPORTUNITY_MODEL() };
      state = _.mergeWith(state, action.payload);
      break;
    case RESET_OPPORTUNITY:
      state = OPPORTUNITY_MODEL();
      break;
    case ADD_ADDRESS:
      state.address = action.payload;
      break;
    case ADD_COORDS:
      state.coords = action.payload;
      break;
    case ADD_BUSINESS_CONTACT_NAME:
      state.businessContactName = action.payload;
      break;
    case ADD_BUSINESS_CONTACT_EMAIL:
      state.businessContactEmail = action.payload;
      break;
    case ADD_APPROVAL_STATUS:
      state.approvalStatus = action.payload;
      break;
    case ADD_PUBLIC_NOTE:
      state.publicNote = action.payload;
      break;
    case ADD_PRIVATE_NOTE:
      state.privateNote = action.payload;
      break;
    case ADD_BUSINESS_CONTACT:
      state.businessContactName = action.payload.name;
      state.businessContactEmail = action.payload.email;
      break;
    case ADD_SITE_INFO:
      state.siteInfo = { ...state.siteInfo, ...action.payload };
      break;
    case ADD_PID:
      state.siteInfo.PID.value = action.payload;
      break;
    case ADD_GEOMETRY:
      if (!action.payload) {
        state.siteInfo.geometry.coordinates = null;
      } else if (!state.siteInfo.geometry.coordinates) {
        state.siteInfo.geometry = {
          ...state.siteInfo.geometry,
          ...action.payload,
        };
      } else {
        state.siteInfo.geometry.coordinates = [
          ...state.siteInfo.geometry.coordinates,
          ...action.payload.coordinates,
        ];
      }
      break;
    case ADD_PARCEL_OWNER:
      if (
        state.siteInfo.parcelOwnership.name &&
        state.siteInfo.parcelOwnership.name !== action.payload &&
        action.payload
      ) {
        state.siteInfo.parcelOwnership.name = `/${action.payload}`;
      } else {
        state.siteInfo.parcelOwnership.name = action.payload;
      }

      break;
    case ADD_PARCEL_SIZE:
      if (state.siteInfo.parcelSize.value && action.payload) {
        state.siteInfo.parcelSize.value += action.payload;
      } else {
        state.siteInfo.parcelSize.value = action.payload;
      }
      break;
    case ADD_SITE_ID:
      state.siteInfo.siteId.value = action.payload;
      break;
    case ADD_USER_INFO:
      state.userInfo[action.payload.key].value = action.payload.value;
      break;
    case ADD_RENTAL_PRICE:
      state.userInfo.saleOrLease.rentalPrice = action.payload;
      break;
    case ADD_SALE_PRICE:
      state.userInfo.saleOrLease.salePrice = action.payload;
      break;
    case ADD_SERVICE:
      state.services[action.payload.key].name = action.payload.value;
      break;
    case ADD_SERVICE_CAPACITY:
      state.services[action.payload.key].value = action.payload.capacity;
      break;
    case ADD_NAME:
      state.name = action.payload;
      break;
    case ADD_RESOUCE_IDS:
      state.resourceIds = action.payload;
      break;
    case ADD_NEARBY_RESOUCES:
      state.nearbyResources = action.payload;
      break;
    default:
      break;
  }
  return state;
}
