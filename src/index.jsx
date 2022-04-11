import { createRoot } from "react-dom/client";
import * as serviceWorkerRegistration from "serviceWorkerRegistration";
import { BrowserRouter as Router } from "react-router-dom";
import reportWebVitals from "reportWebVitals";

import App from "./App";

import { Global } from "@emotion/react";
import { GlobalStyle } from "styles/global";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <>
    <Router>
      <App />
    </Router>
    <Global styles={GlobalStyle} />
  </>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();