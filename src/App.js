import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import jwtDecode from "jwt-decode";
// Redux
import { useDispatch } from "react-redux";
import { SET_AUTHENTICATED } from "./redux/types";
import { logoutUser, getUserData } from "./redux/actions/userActions";
// Components
import Navbar from "./components/layout/Navbar";
import themeObject from "./util/theme";
import AuthRoute from "./util/AuthRoute";
// Pages
import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";
import user from "./pages/user";

import axios from "axios";

const theme = createMuiTheme(themeObject);

axios.defaults.baseURL =
  "https://us-central1-screamer-6a1d7.cloudfunctions.net/api";

const App = () => {
  const token = localStorage.FBIdToken;
  const dispatch = useDispatch();
  if (token) {
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
      dispatch(logoutUser());
      window.location.href = "/login";
    } else {
      dispatch({ type: SET_AUTHENTICATED });
      axios.defaults.headers.common["Authorization"] = token;
      dispatch(getUserData());
    }
  }

  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <Navbar />
        <div className="container">
          <Switch>
            <Route exact path="/" component={home} />
            <AuthRoute exact path="/login" component={login} />
            <AuthRoute exact path="/signup" component={signup} />
            <Route exact path="/users/:handle" component={user} />
            <Route
              exact
              path="/users/:handle/scream/:screamId"
              component={user}
            />
          </Switch>
        </div>
      </Router>
    </MuiThemeProvider>
  );
};

export default App;
