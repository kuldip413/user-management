import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link, useParams, useRouteMatch } from "react-router-dom";
import UserService from "../services/user.service";
import axios from "axios";
import Users from "./users";
import Admin from "./admin";
import Task from "./task";
import TaskAdmin from "./taskAdmin";
import Assignee from "./assignee";
import AssigneeAdmin from "./assigneeAdmin";
import AllTaskAdmin from "./allTaskAdmin";
import AddTask from "./addTask";
import EditTask from "./editTask";
import ViewTask from "./viewTask";
import UserTasks from "./userTasks";
import Dashboard from "./dashboard";
import Register from "./register";
import Verify from "./verify"

import "./component.css";


const Profile = (props) => {

	const [content, setContent] = useState("");
	const [id, setId] = useState("");
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [roles, setRoles] = useState("");
	const [emailVerified, setEmailVerified] = useState("");
	const [currentUser, setCurrentUser] = useState(false);

	let { path, url } = useRouteMatch();


    const userToken = JSON.parse(localStorage.getItem('userToken'));

    const requestVerification = () => {
    	axios.post("http://localhost:8000/api/email/request-verification?token="+ userToken.token);
    }

	useEffect(() => {
    	UserService.getProfile().then(
      		(response) => {
        		setId(response.data.id);
        		setName(response.data.name);
        		setEmail(response.data.email);
        		setRoles(response.data.roles);
        		setEmailVerified(response.data.email_verified_at);
        		// props.history.push(`${url}/dashboard`);
      		},
      		(error) => {
        		const _content =
          			(error.response &&
            			error.response.data &&
            			error.response.data.message) ||
          			error.message ||
          			error.toString();

        	setContent(_content);
      		},
    	);
  	}, []);


	return(
		<div>
			{roles ? (
				<div className="left">
					<header className="jumbotron">
		    			<h3>{name}</h3>
					</header>
					<p>
						<strong>Id:</strong>{id}
					</p>
					<p>
						<strong>Email:</strong>{email}
					</p>
					<p>
						<strong>Email Verified:</strong>{emailVerified}
					</p>
					{ !roles.includes('Admin') ? (
						<div>
							<div className="left-bottom">
			                	<Link to={{
			                		pathname:`${url}/users`,
			                		param:{id}
			                	}}>
			                		<b>Users</b>
			                	</Link>
							</div>
							<div className="left-bottom">
								<Link to={{
			                		pathname:`${url}/task`,
			                		param:{id}
			                	}}>
			                    	<b>Tasks</b>
			                	</Link>
							</div>
						</div>
					):(
						<div>
							<div className="left-bottom">
								<Link to={{
			                		pathname:`${url}/admin`,
			                		param:{id}
			                	}}>
			                    	<b>Users</b>
			                	</Link>
							</div>
							<div className="left-bottom">
								<Link to={{
			                		pathname:`${url}/taskAdmin`,
			                		param:{id}
			                	}}>
			                    	<b>Tasks</b>
			                	</Link>
							</div>
						</div>
					)}
				</div>
			) : (
				<div className="right">
			        <div className="card1">
			        	<h6>Email is not verified ,kindly verify your email</h6>
			            <form onSubmit={requestVerification} >
			            		<button type="submit" className="btn btn-primary btn-block">Request Verification</button>
			            </form>
		            </div>
				</div>
			)}
			<div className="right">
				<Switch>
					<Route path={`${path}/users`} component={Users}/>
					<Route exact path={`${path}/admin`} component={Admin}/>
					<Route path={`${path}/admin/register`} component = {Register}/>
					<Route path={`${path}/verify`} component = {Verify}/>
					<Route path={`${path}/task`} component={Task}/>
					<Route path={`${path}/taskAdmin`} component={TaskAdmin}/>
					<Route path={`${path}/assignee`} component={Assignee}/>
					<Route path={`${path}/assigneeAdmin`} component={AssigneeAdmin}/>
					<Route path={`${path}/allTaskAdmin`} component={AllTaskAdmin}/>
					<Route path={`${path}/addTask`} component={AddTask}/>
					<Route path={`${path}/editTask`} component={EditTask}/>
					<Route path={`${path}/viewTask`} component={ViewTask}/>	
					<Route path={`${path}/userTasks`} component={UserTasks}/>
				</Switch>
			</div>
		</div>
	);
};

export default Profile;