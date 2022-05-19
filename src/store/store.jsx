import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import { combineReducers } from "redux";

import { authReducer } from "./Auth/reducer";
import { tasksReducer } from "./GetTask/reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  tasks: tasksReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
export default store;
