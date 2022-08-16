import { get, post, remove, update } from "../../API/fetcher";
import { contacts_url } from "../../API/urls";
import { FETCH_ALL_CONTACTS_SUCCESS, FETCH_ALL_CONTACTS_REQUEST, FETCH_ALL_CONTACTS_FAIL, REGISTER_CONTACT_SUCCESS, REGISTER_CONTACT_REQUEST, REGISTER_CONTACT_FAIL, DELETE_CONTACT_REQUEST, DELETE_CONTACT_SUCCESS, DELETE_CONTACT_FAIL, FETCH_CONTACT_REQUEST, FETCH_CONTACT_SUCCESS, FETCH_CONTACT_FAIL, UPDATE_CONTACT_REQUEST, UPDATE_CONTACT_SUCCESS, UPDATE_CONTACT_FAIL, SET_ALERT, REMOVE_ALERT } from "../constants/contactsConstants";

export const fetchContacts = () => async (dispatch) => {
    try {
        dispatch({
            type: FETCH_ALL_CONTACTS_REQUEST,
        });
        const { data } = await get(
            `${contacts_url}`
        );
        dispatch({
            type: FETCH_ALL_CONTACTS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: FETCH_ALL_CONTACTS_FAIL,
            payload: error.message,
        });
        dispatch(setAlert('There was an error fetching the data.', 'error'))
    }
};

export const fetchContact = (id) => async (dispatch) => {
    try {
        dispatch({
            type: FETCH_CONTACT_REQUEST,
        });
        const { data } = await get(
            `${contacts_url}/${id}`
        );

        dispatch({
            type: FETCH_CONTACT_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: FETCH_CONTACT_FAIL,
            payload: error.message,
        });
        dispatch(setAlert(error.message, 'error'))
    }
};

export const registerContact = (values, callback) => async (dispatch) => {
    try {
        dispatch({
            type: REGISTER_CONTACT_REQUEST
        })
        const response = await post(
            `${contacts_url}`, values
        );

        if (response.status == 200) {
            dispatch({
                type: REGISTER_CONTACT_SUCCESS,
                payload: response,
            })
            callback()
            dispatch(setAlert('Created contact successfully!', 'success'))
        } else {
            dispatch({
                type: REGISTER_CONTACT_FAIL,
                payload: response.message
            })
            dispatch(setAlert(response.response.data.message, 'error'))
        }
    } catch (error) {
        dispatch({
            type: REGISTER_CONTACT_FAIL,
            payload: error.response
        })
        dispatch(setAlert(error.response, 'error'))
    }
}

export const updateContact = (id, values) => async (dispatch) => {
    try {
        dispatch({
            type: UPDATE_CONTACT_REQUEST
        })
        const response = await update(
            `${contacts_url}/${id}`, values
        );

        if (response.status == 200) {
            dispatch({
                type: UPDATE_CONTACT_SUCCESS,
                payload: response.data,
            })
            dispatch(setAlert('Updated contact successfully!', 'success'))
        } else {
            dispatch({
                type: UPDATE_CONTACT_FAIL,
                payload: response.message
            })
            dispatch(setAlert(response.response.data.message, 'error'))
        }
    } catch (error) {
        dispatch({
            type: UPDATE_CONTACT_FAIL,
            payload: error.message
        })
        dispatch(setAlert(error.message, 'error'))
    }
}

export const deleteContact = (id) => async (dispatch) => {
    try {
        dispatch({
            type: DELETE_CONTACT_REQUEST
        })
        const response = await remove(
            `${contacts_url}/${id}`
        );

        if (response.status == 200) {
            dispatch({
                type: DELETE_CONTACT_SUCCESS,
                payload: id,
            })
            dispatch(setAlert('Contact deleted.', 'info'))
        }
    } catch (error) {
        dispatch({
            type: DELETE_CONTACT_FAIL,
            payload: error.message
        })
        dispatch(setAlert(error.message, 'error'))
    }
}

export const setAlert = (message, type) => async (dispatch) => {
    dispatch({
        type: SET_ALERT,
        payload: { message, type }
    })

    setTimeout(() => {
        dispatch({
            type: REMOVE_ALERT,
        })
    }, 2700);
}

export const removeAlert = () => async (dispatch) => {
    dispatch({
        type: REMOVE_ALERT,
    })
}