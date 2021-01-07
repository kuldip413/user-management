import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link, useParams, useRouteMatch } from "react-router-dom";
import axios from "axios";

const Verify = (props) =>{
	useEffect(() => {
		const search = window.location.search;
		const params = new URLSearchParams(search);
		const foo = params.get('token');
		console.log(foo);
		axios .post("http://localhost:8000/api/email/verify?token=" + foo)
			.then(() => {
                props.history.push("/profile");
				window.location.reload();
            });
	},[]);
	return(
		<div>
			<h1>verification in progress</h1>
		</div>
	);
};

export default Verify;