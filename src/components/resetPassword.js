import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import axios from "axios";


const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const ResetPassword = (props) =>{

    const [password, setPassword] = useState("");
    const [password_confirmation, setPassword_confirmation] = useState("");
    const { message } = useSelector(state => state.message);

    const onresetPassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const onresetPassword_confirmation = (e) => {
        const password_confirmation = e.target.value;
        setPassword_confirmation(password_confirmation);
    };

    const handleReset = (e) => {
        e.preventDefault();

        const search = window.location.search;
        const params = new URLSearchParams(search);
        const foo = params.get('token');
        const em = params.get('email');
        console.log(foo);
        console.log(em);
        axios.post("http://localhost:8000/api/password/reset?token=" + foo + "&email=" + em ,{
            password,
            password_confirmation,
        })
            .then(() => {
                props.history.push("/login");
                // window.location.reload();
            });
    };
   return(
        <form onSubmit={handleReset} >
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <h3>Reset</h3>
                    <div>
                        <div className="form-group">
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
                        <button type="submit" className="btn btn-primary btn-block">Submit</button>
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

export default ResetPassword;