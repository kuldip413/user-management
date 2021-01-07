import React from "react";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useDispatch} from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "./components/login";
import SignUp from "./components/signup";
import Forgot from "./components/forgot";
import ResetPassword from "./components/resetPassword";
import Profile from "./components/profile";
import { logout } from "./actions/auth";
import { history } from "./helpers/history";

const App = () => {

  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(logout());
  };

  return (<Router history={history}>
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top shadow1">
        <div className="container ">
          <Link className="navbar-brand" to={"/login"}>UI</Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            {localStorage.getItem('userToken') ? (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/forgotPassword"} className="nav-link">
                    Reset Password
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={logOut}>
                    Log Out
                  </a>
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/sign-up"} className="nav-link">
                    Sign Up
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
      <Switch>
        <Route exact path='/' component={Login} />
        <Route path="/login" component={Login} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/profile" component={Profile}/>
        <Route path="/forgotPassword" component={Forgot}/>
        <Route path="/resetPassword" component={ResetPassword}/>
      </Switch>
    </div></Router>
  );
};

export default App;