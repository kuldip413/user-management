import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './component.css'

import { login } from "../actions/auth";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const Login = (props) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const { isLoggedIn } = useSelector(state => state.auth);
    const { message } = useSelector(state => state.message);

    const dispatch = useDispatch();

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };

    const onresetPassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleLogin = (e) => {
        e.preventDefault();

        setLoading(true);

        dispatch(login(email, password))
            .then(() => {
                props.history.push("/profile");
                window.location.reload();
            })
            .catch(() => {
                setLoading(false);
            });

    };

    if (isLoggedIn) {
        return < Redirect to= "/profile" />;
    } 

    return (
        <form onSubmit={handleLogin} >
        <div className="container1">
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <h3>Sign In</h3>

                    <div className="form-group">
                        <label>Email address</label>
                        <input 
                            type="email" 
                            className="form-control"
                            name="email"
                            value={email}
                            onChange={onChangeEmail}
                            validations={[required]} 
                            placeholder="Enter email" 
                        />

                        <label>Password</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            placeholder="Enter password"
                            name="password"
                            value={password}
                            onChange={onresetPassword}
                            validations={[required]} 
                        />

                        <button className="btn btn-primary btn-block" disabled={loading}>
                            {loading && (
                                <span className="spinner-border spinner-border-sm"></span>
                            )}
                            <span>Submit</span>
                        </button>
                    </div>

                    {message && (
                        <div className="form-group">
                          <div className="alert alert-danger" role="alert">
                            {message}
                          </div>
                        </div>
                    )}
                    <p className="forgot-password text-right">
                        Forgot <a href="/forgotPassword">password?</a>
                    </p>
                </div>
            </div>
        </div>
        </form>
    );
};

export default Login;