import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './component.css'
import authHeader from "../services/auth-header";
import { registerAdmin } from "../actions/auth";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const Register = (props) => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password_confirmation, setPassword_confirmation] = useState("");
    const [successful, setSuccessful] = useState(false);

    const { message } = useSelector(state => state.message);
    const dispatch = useDispatch();

    useEffect( () => {
        console.log(props.location.param);
    },[]);

    const onChangeName = (e) => {
        const name = e.target.value;
        setName(name);
        // console.log(props.state.name,name)
    };

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };
    const onresetPassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const onresetPassword_confirmation = (e) => {
        const password_confirmation = e.target.value;
        setPassword_confirmation(password_confirmation);
    };

    const handleRegister = (e) => {
        e.preventDefault();
        setSuccessful(false);

        dispatch(registerAdmin(name, email, password, password_confirmation))
            .then(() => {
                setSuccessful(true);
            })
            .catch(() => {
                setSuccessful(false);
            });
    };

    return (
        <form onSubmit={handleRegister} >
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <h3>Register</h3>
                    <div>
                        <div className="form-group">
                            <label>Name</label>
                            <input 
                                type="text" 
                                className="form-control"
                                name="name"
                                value={name} 
                                onChange={onChangeName}
                                validations={[required]}
                                placeholder="Full name" 
                            />
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
                                name="password"
                                value={password}
                                onChange={onresetPassword}
                                validations={[required]}
                                placeholder="Enter password" 
                            />
                            <label>Confirm Password</label>
                            <input 
                                type="password" 
                                className="form-control"
                                name="password"
                                value={password_confirmation}
                                onChange={onresetPassword_confirmation}
                                validations={[required]} 
                                placeholder="Confirm password" 
                            />
                        </div>
                        <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                    </div> 
                    {message && (
                        <div className="form-group">
                          <div className="alert alert-danger" role="alert">
                            {message}
                          </div>
                        </div>
                    )}
                </div>
            </div>
        </form>
    );
};

export default Register;