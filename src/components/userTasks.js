import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link, useParams, useRouteMatch } from "react-router-dom";
import axios from "axios";
import authHeader from "../services/auth-header";
import { MDBDataTable } from "mdbreact";

import HighchartsReact from 'highcharts-react-official';
import PieChart from 'highcharts-react-official';
import Highcharts from 'highcharts';


const UserTasks = (props)=>{

	const [tasks, setTasks] = useState([])
	const [completed, setCompleted] = useState(0);
	const [assigned , setAssigned] = useState(0);
	const [progress, setProgress] = useState(0);

	useEffect(() =>{
		if(props.location.param){
			axios.get(`http://localhost:8000/api/user/userTasks/${props.location.param}`,{ headers: authHeader() })
				.then((response) => {
					// console.log('tasks: ',JSON.stringify(response.data.tasks));
					console.log(props.location.param);
					// console.log(response.data);
					setTasks(response.data.tasks);
				});
			axios.get(`http://localhost:8000/api/user/taskCount/${props.location.param}`,{ headers: authHeader() })
				.then((response)=>{
					setCompleted(response.data.Completed);
					setAssigned(response.data.assigned);
					setProgress(response.data.inProgress);
					console.log(response.data);
				});
		}
		else{
			props.history.push("/profile/admin");
		}
	},[]);


	const JsonTasks=[];

	// console.log(Object.keys(tasks).length);
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
			assigned_by: tasks[i].assigned_by,
			status: tasks[i].status,
		})
	}

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

	const table={
     	columns:[
			{
				label: "Id",
				field: "id",
				sort: "asc",
				width: 100
			},
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
				label: "assigned_by",
				field: "assigned_by",
				sort: "asc",
				width: 100
			},
			{
				label: "Status",
				field: "status",
				sort: "asc",
				width: 100
			},
		],
		rows: JsonTasks
    };
	return(
		<div>
			<div className="card-chart">
				<PieChart highcharts={Highcharts} options={options} />
			</div>
			<div className="card">
	            <MDBDataTable striped bordered hover data={table} />
	        </div>
	    </div>
	);
};

export default UserTasks;