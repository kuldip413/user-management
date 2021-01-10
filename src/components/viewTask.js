import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link, useParams, useRouteMatch } from "react-router-dom";
import axios from "axios";


const ViewTask = (props)=>{

	const [id, setId] = useState("");
	const [title, setTitle] = useState("");
	const [description,setDescription] = useState("");
	const [date,setDate] = useState("");
	const [status,setStatus] = useState("");
	const [assignedBy, setAssignedBy] = useState("");
	const [assignee, setAssignee] = useState("");
	const [completedAt, setCompletedAt] = useState("");

	const userToken = JSON.parse(localStorage.getItem('userToken'));

	useEffect(()=>{
		if(props.location.param){
			// setAssignedTo(props.location.param);
			// console.log(props.location.param);
			axios.get(`http://localhost:8000/api/user/tasks/${props.location.param}?token=`+ userToken.token)
            .then(
                (response) =>{
                    // setTask1(response.data.task);
                    // console.log(response.data.task.title);
                    console.log(response.data.task);
                    setId(response.data.task.id);
                    setStatus(response.data.task.status);
                    setAssignee(response.data.task.assigned_to);
                    setAssignedBy(response.data.task.assigned_by);
                    setTitle(response.data.task.title);
                    setDescription(response.data.task.description);
                    setDate(response.data.task.due_date);
                    setCompletedAt(response.data.task.completred_at);
                }
            );
		}
		else{
			props.history.push("/profile");
		}
	},[]);
	// console.log(props.location.param);
	return(
		<div>
			<div className="auth-wrapper">
                <div className="auth-inner">
					<h3>Task Details</h3>
					<div className="form-group">
						<h6><strong>Task Id :</strong> {id}</h6>
						<h6><strong>Assigner Id :</strong> {assignedBy}</h6>
						<h6><strong>Assignee Id:</strong> {assignee}</h6>
						<h6><strong>Status :</strong> {status}</h6>
						
						<label>Title</label>
                            <input 
                                type="text" 
                                className="form-control"
                                value={title}
                                name="name"
                                placeholder="Title"
                                readonly="readonly" 
                            />
                            <label>Description</label>
                            <textarea
					            className="form-control"
					            rows="5"
					            value={description}
					            name="email"
	                            placeholder="Enter description"
	                            readonly="readonly"
					        />
					        {!status.includes("completed") ?(
					        	<div>
		                            <label>Due Date</label>
		                            <input 
		                                type="text" 
		                                className="form-control" 
		                                name="password"
		                                value={date}
		                                placeholder="Date" 
		                                readonly="readonly"
		                            />
	                            </div>
                        	):(
                        		<div>
		                            <label>Completion Date</label>
		                            <input 
		                                type="text" 
		                                className="form-control" 
		                                name="password"
		                                value={completedAt}
		                                placeholder="Date" 
		                                readonly="readonly"
		                            />
	                            </div>
	                        )}	
					</div>
				</div>
			</div>
		</div>
	);
};

export default ViewTask;