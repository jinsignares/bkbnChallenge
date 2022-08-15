import {legacy_createStore as createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import { contactsReducer } from './reducers/contactsReducer';
import { createWrapper } from "next-redux-wrapper";

const rootReducer = combineReducers({
    contacts: contactsReducer,
});
const composeEnhancers = composeWithDevTools({
  trace: true,
  traceLimit: 100,
});

const initialState = {};

const middleware = [thunk];

const initStore = () => {
    return createStore(
        rootReducer,
        initialState,
        composeEnhancers(applyMiddleware(...middleware))
      );
}

export const wrapper = createWrapper(initStore);
