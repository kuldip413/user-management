import React, { useState } from "react";
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

const  Forgot = (props) => {

    const [email, setEmail] = useState("");

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };
    const handleReset = (e) => {
        e.preventDefault();

        axios.post("http://localhost:8000/api/password/reset-request",{email})
            .then(() => {
                props.history.push("./resetPassword");
                window.location.reload();
            });
    }
    return (
    	<div className="card2">
	        <form onSubmit={handleReset} >
	            <h3>Forgot Password</h3>

	            <div className="form-group">
	                <label>Email address</label>
	                <input 
	                    type="email" 
	                    className="form-control" 
	                    value={email}
	                    onChange={onChangeEmail}
	                    validations={[required]}
	                    placeholder="Enter email" />
	            </div>

	            <button type="submit" className="btn btn-primary btn-block">Submit</button>
	        </form>
        </div>
    );
};

export default Forgot;