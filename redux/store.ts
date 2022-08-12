import {legacy_createStore as createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import { contactsReducer } from './reducers/contactsReducer';

const rootReducer = combineReducers({
    contacts: contactsReducer,
});
const composeEnhancers = composeWithDevTools({
  trace: true,
  traceLimit: 100,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleware))
);

export default store;
