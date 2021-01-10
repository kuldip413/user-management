import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link, useParams, useRouteMatch } from "react-router-dom";
import axios from "axios";
import authHeader from "../services/auth-header";
import { MDBDataTable } from "mdbreact";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import HighchartsReact from 'highcharts-react-official';
import PieChart from 'highcharts-react-official';
import Highcharts from 'highcharts';


const TaskAdmin = (props)=>{

	const [tasks, setTasks] = useState([]);
	const [completed, setCompleted] = useState(0);
	const [assigned , setAssigned] = useState(0);
	const [progress, setProgress] = useState(0);
	const [checked, setChecked] = useState(false);
	const [taskToday, setTaskToday] = useState([]);

	useEffect(()=>{
		axios.get("http://localhost:8000/api/user/tasks",{ headers: authHeader() })
			.then((response) => {
				// console.log('tasks: ',response.data.tasks);
				setTasks(response.data.tasks);
			});
		axios.get("http://localhost:8000/api/user/taskCount",{ headers: authHeader() })
			.then((response)=>{
				setCompleted(response.data.Completed);
				setAssigned(response.data.assigned);
				setProgress(response.data.inProgress);
				console.log(response.data);
			});
	},[]);

	const JsonTasks=[];
	const JsonToday=[];
	const userToken = JSON.parse(localStorage.getItem('userToken'));

	const handleUpdate = (id, e) =>{
		const status = e.target.value;
		console.log(status);
		axios.patch(`http://localhost:8000/api/user/updateTask/${id}?token=`+ userToken.token,{
			status
		})
			.then(()=>{
				window.location.reload();
			});
	}

	const handleCheck = (e) =>{
		setChecked(!checked);
		axios.get("http://localhost:8000/api/user/todayTasks",{ headers: authHeader() })
			.then((response)=>{
				console.log(response.data.tasks);
				setTaskToday(response.data.tasks);
			});
	}

	for(var i=0; i<Object.keys(tasks).length; i++){
		const id1 = tasks[i].id;
		JsonTasks.push({
			id: tasks[i].id,
			view:
				<Link to={{
            		pathname:`/profile/viewTask`,
            		param: id1,
			    }}> 
					<button className="btn btn-outline-primary small font-weight-bold shadow-lg">View</button>
				</Link>,
			title: tasks[i].title,
			description: tasks[i].description,
			due_date: tasks[i].due_date,
			update: 
				<div>
					<h6>{tasks[i].status}</h6>
					<select onChange={(e)=>handleUpdate(id1,e)}>
							<option name="assigned">Assigned</option>
		        			<option name="inProgress" >InProgress</option>
		        			<option name="completed">completed</option>
	        		</select>
	        	</div>,
				
			// role: 
			// 	users[i].roles ==="Admin" ?(
			// 		<span className="badge badge-success badge-pill">Admin</span>
			// 	):(
			// 		<span className="badge badge-warning badge-pill">User</span>
			// 	),
			// task:
			// 	<button className="btn btn-outline-primary small font-weight-bold shadow-lg">Add Task</button>
		})
	}

	for(var i=0; i<Object.keys(taskToday).length; i++){
		const id1 = taskToday[i].id;
		JsonToday.push({
			id: taskToday[i].id,
			view:
				<Link to={{
            		pathname:`/profile/viewTask`,
            		param: id1,
			    }}> 
					<button className="btn btn-outline-primary small font-weight-bold shadow-lg">View</button>
				</Link>,
			title: taskToday[i].title,
			description: taskToday[i].description,
			due_date: taskToday[i].due_date,
			update: 
				<div>
					<h6>{taskToday[i].status}</h6>
					<select onChange={(e)=>handleUpdate(id1,e)}>
							<option name="assigned">Assigned</option>
		        			<option name="inProgress" >InProgress</option>
		        			<option name="completed">completed</option>
	        		</select>
	        	</div>,
				
			// role: 
			// 	users[i].roles ==="Admin" ?(
			// 		<span className="badge badge-success badge-pill">Admin</span>
			// 	):(
			// 		<span className="badge badge-warning badge-pill">User</span>
			// 	),
			// task:
			// 	<button className="btn btn-outline-primary small font-weight-bold shadow-lg">Add Task</button>
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
				label: "Update",
				field: "update"
			}
		],
		rows: JsonTasks
	};

	const todaysTasks={
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
				label: "Update",
				field: "update"
			}
		],
		rows: JsonToday
	};

	const options = {
		title: {
	        text: 'Task Stats'
	    },
		chart: {
			type: "pie"
				},
				series: [
				{
				  data: [
				    {
				      name: 'Completed',
				      y: completed
				    },
				    {
				      name: 'Not Started',
				      y: assigned
				    },
				    {
				      name: 'In Progress',
				      y: progress
				    }
				  ]
				}
			]
		};

	return(
		<div>
			<div className="card-chart">
				<PieChart highcharts={Highcharts} options={options} />
			</div>
			<div className="left1">
				<input type="checkbox" id="check1" onChange={handleCheck} checked={checked}/>
				<label for="check11"> Show Today's Task</label>
			</div>
			<div className="card">
				{checked ? (
					<MDBDataTable striped bordered hover data={todaysTasks} />
					) : (<div></div>)
				}
			</div>
			<div className="card">
				<nav class="navbar navbar-expand-lg navbar-light bg-light">
					<div class="collapse navbar-collapse" id="navbarNavAltMarkup">
						<div class="navbar-nav">
					  		<Link to={"/profile/taskAdmin"} className="nav-link">
			                    <button className="btn btn-primary ">Your Task</button>
			                </Link>
			                <Link to={"/profile/assigneeAdmin"} className="nav-link">
			                    <button className="btn btn-outline-primary ">assigned by you</button>
			                </Link>
			                <Link to={"/profile/allTaskAdmin"} className="nav-link">
			                    <button className="btn btn-outline-primary ">All Tasks</button>
			                </Link>
						</div>
					</div>
				</nav>				
				<MDBDataTable striped bordered hover data={table} />
			</div>
		</div>
	);
};

export default TaskAdmin;