import React, { Component } from "react";

import ErrorBoundry from "../error-boundry";

import "./app.css";

export default class App extends Component {

  render() {

    return (
      <ErrorBoundry>
        <h1>Hello</h1>
      </ErrorBoundry>
    );
  }
}
