import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link, useParams, useRouteMatch } from "react-router-dom";
import axios from "axios";
import authHeader from "../services/auth-header";
import { MDBDataTable } from "mdbreact";

const AssigneeAdmin = ()=>{
	const[tasks, setTasks] = useState([]);
	// const[assignstate, setAssignstate] = useState(1);

	useEffect(()=>{
		axios.get("http://localhost:8000/api/user/getAssign",{ headers: authHeader() })
			.then((response) => {
				// console.log('tasks: ',response.data.tasks);
				setTasks(response.data.tasks);
			});
	},[]);

	const removeTask = (idTask) =>{
		axios.get(`http://localhost:8000/api/user/deleteTask/${idTask}`,{ headers: authHeader() })
			.then(() => {
                window.location.reload();
            });
	};

	const JsonTasks=[];

	for(var i=0; i<Object.keys(tasks).length; i++){
		const idTask = tasks[i].id;
		JsonTasks.push({
			id: tasks[i].id,
			view:
				<Link to={{
            		pathname:`/profile/viewTask`,
            		param: idTask,
			    }}> 
					<button className="btn btn-outline-primary small font-weight-bold shadow-lg">View</button>
				</Link>,
			title: tasks[i].title,
			description: tasks[i].description,
			due_date: tasks[i].due_date,
			edit:
				<Link to={{
                    pathname:`/profile/editTask`,
                    param: idTask,
                }}>
					<button className="btn btn-outline-primary small font-weight-bold shadow-lg ">Edit</button>
				</Link>,
			delete:
				<button className="btn btn-outline-danger small font-weight-bold shadow-lg" onClick={() => { if (window.confirm('Are you sure you wish to delete this task?')) removeTask(idTask)}}>Delete</button>
		})
	}

	const table={
		columns:[
			{
				label: "Details",
				field: "view",
				sort: "asc",
				width: 100
			},
			{
				label: "title",
				field: "title",
				sort: "asc",
				width: 100
			},
			{
				label: "description",
				field: "description",
				sort: "asc",
				width: 100
			},
			{
				label: "due_date",
				field: "due_date",
				sort: "asc",
				width: 100
			},
			{
				label: "Edit",
				field: "edit"
			},
			{
				label: "Delete",
				field: "delete"
			},
		],
		rows: JsonTasks
	};

	return(
		<div className="card">
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<div className="collapse navbar-collapse" id="navbarNavAltMarkup">
					<div className="navbar-nav">
				  		<Link to={"/profile/taskAdmin"} className="nav-link">
		                    <button className="btn btn-outline-primary ">Your Task</button>
		                </Link>
		                <Link to={"/profile/assigneeAdmin"} className="nav-link">
		                    <button className="btn btn-primary ">assigned by you</button>
		                </Link>
		                <Link to={"/profile/allTaskAdmin"} className="nav-link">
		                    <button className="btn btn-outline-primary ">All Tasks</button>
		                </Link>
					</div>
				</div>
			</nav>
			<MDBDataTable striped bordered hover data={table} />
		</div>
	);
};

export default AssigneeAdmin;