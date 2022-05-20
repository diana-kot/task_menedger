import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import store from "@store/store";
import {fetchUserData} from './store/Auth/actions'


import App from "./App";
import reportWebVitals from "./reportWebVitals";

import "./scss/app.scss";


store.dispatch(fetchUserData());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
