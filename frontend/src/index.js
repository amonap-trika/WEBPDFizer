import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <BrowserRouter>
    <App />
    <ToastContainer />

  </BrowserRouter>,
  document.getElementById("root")
);

serviceWorker.unregister();
