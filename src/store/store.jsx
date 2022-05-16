import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import { combineReducers } from "redux";

import { authReducer } from "./auth/reducer";

const rootReducer = combineReducers({
    auth: authReducer,
 
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
export default store