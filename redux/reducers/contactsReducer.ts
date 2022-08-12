import { FETCH_ALL_CONTACTS_SUCCESS, FETCH_ALL_CONTACTS_REQUEST, FETCH_ALL_CONTACTS_FAIL } from "../constants/contactsConstants";

export const contactsReducer = (
    state = {}, action
  ) => {
    const {type, payload} = action;
    switch (type) {
      case FETCH_ALL_CONTACTS_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case FETCH_ALL_CONTACTS_SUCCESS:
        return {
          ...state,
          loading: false,
          clients: payload,
        };
      case FETCH_ALL_CONTACTS_FAIL:
        return {
          ...state,
          loading: false,
          error: payload,
        };
      default:
        return state;
    }
  };