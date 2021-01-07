import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link, useParams, useRouteMatch } from "react-router-dom";
import axios from "axios";
import authHeader from "../services/auth-header";
import { MDBDataTable } from "mdbreact";


const Users = (props) => {
	const [users, setUsers] = useState([])

	useEffect(() =>{
		axios.get("http://localhost:8000/api/users",{ headers: authHeader() })
			.then((response) => {
				console.log('users: ',JSON.stringify(response.data.users));
				console.log(props.location.param);
				setUsers(response.data.users);
			});
	},[]);

	const JsonUsers=[];

	// console.log(Object.keys(users).length);
	for(var i=0; i<Object.keys(users).length; i++){
		const id1 = users[i].id;
		JsonUsers.push({
			id: users[i].id,
			name: users[i].name,
			email: users[i].email,
			role: 
				users[i].roles ==="Admin" ?(
					<span className="badge badge-success badge-pill">Admin</span>
				):(
					<span className="badge badge-warning badge-pill">User</span>
				),
			task:
				<Link to={{
            		pathname:`/profile/addTask`,
            		param: id1,
			    }}>
		            <button className="btn btn-outline-primary small font-weight-bold shadow-lg">Add Task</button>
		        </Link>
		})
	}

	const table={
		columns:[
			{
				label: "id",
				field: "id",
				sort: "asc",
				width: 100
			},
			{
				label: "name",
				field: "name",
				sort: "asc",
				width: 100
			},
			{
				label: "email",
				field: "email",
				sort: "asc",
				width: 100
			},
			{
				label: "role",
				field: "role",
				sort: "asc",
				width: 100
			},
			{
				label:"add task",
				field:"task"
			},
		],
		rows: JsonUsers
	};
	return(
		<div className="card">
			<MDBDataTable striped bordered hover data={table} />
		</div>
	); 	
};


export default Users;