import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import "./styles.css";
import Root from "./views/Root";

ReactDOM.render(
  <Router basename={process.env.PUBLIC_URL}>
    <Root />,
  </Router>,
  document.getElementById("root"),
);
