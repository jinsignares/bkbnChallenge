import { FETCH_ALL_CONTACTS_SUCCESS, FETCH_ALL_CONTACTS_REQUEST, FETCH_ALL_CONTACTS_FAIL, REGISTER_CONTACT_SUCCESS, REGISTER_CONTACT_REQUEST, REGISTER_CONTACT_FAIL, FETCH_CONTACT_REQUEST, FETCH_CONTACT_SUCCESS, FETCH_CONTACT_FAIL, DELETE_CONTACT_REQUEST, DELETE_CONTACT_SUCCESS, DELETE_CONTACT_FAIL, UPDATE_CONTACT_REQUEST, UPDATE_CONTACT_SUCCESS, UPDATE_CONTACT_FAIL, SET_ALERT, REMOVE_ALERT } from "../constants/contactsConstants";

export const contactsReducer = (
  state = {
    count: 0,
    perPage: 10,
    currentPage: 1,
    totalPages: 0,
    results: [],
    loading: false,
    result: null,
    alert: {
      message: '',
      type: null,
      active: false
    }
  }, action
) => {
  const { type, payload } = action;
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
        ...payload,
      };
    case FETCH_ALL_CONTACTS_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case FETCH_CONTACT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_CONTACT_SUCCESS:
      return {
        ...state,
        loading: false,
        result: payload,
      };
    case FETCH_CONTACT_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case REGISTER_CONTACT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case REGISTER_CONTACT_SUCCESS:
      return {
        ...state,
        loading: false,
        results: [...state.results, payload.data]
      };
    case REGISTER_CONTACT_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case UPDATE_CONTACT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_CONTACT_SUCCESS:
      const index = state.results.findIndex(toUpdate => toUpdate.id == payload.id)
      const newArray = [...state.results];
      newArray[index] = payload
      return {
        ...state,
        results: newArray
      };
    case UPDATE_CONTACT_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case DELETE_CONTACT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_CONTACT_SUCCESS:
      const toDelete = state.results.findIndex(toUpdate => toUpdate.id == payload)
      const array = [...state.results];
      if (toDelete > -1) {
        array.splice(toDelete, 1);
      }
      return {
        ...state,
        loading: false,
        results: [...array],
        result: null
      };
    case DELETE_CONTACT_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case SET_ALERT:
      return {
        ...state,
        alert: {
          message: payload.message,
          type: payload.type,
          active: true
        }
      }
    case REMOVE_ALERT:
      return {
        ...state,
        alert: {
          active: false
        }
      }
    default: {
      return state;
    }
  }
}