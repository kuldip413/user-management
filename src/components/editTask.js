import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link, useParams, useRouteMatch } from "react-router-dom";
import axios from "axios";
import authHeader from "../services/auth-header";
import { MDBDataTable } from "mdbreact";


const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const EditTask = (props) =>{

	const [title, setTitle]= useState("");
	const [description, setDescription] = useState("");
	const [due_date, setDueDate] = useState("");
	const [idTask, setIdTask] = useState("");
    const [task1, setTask1] = useState([]);

	const userToken = JSON.parse(localStorage.getItem('userToken'));

	useEffect(()=>{
		if(props.location.param){
			setIdTask(props.location.param);
			console.log(props.location.param);
            axios.get(`http://localhost:8000/api/user/tasks/${props.location.param}?token=`+ userToken.token)
            .then(
                (response) =>{
                    // setTask1(response.data.task);
                    // console.log(response.data.task.title);
                    // console.log(response.data.task);
                    setTitle(response.data.task.title);
                    setDescription(response.data.task.description);
                    // setDueDate(response.data.task.due_date);
                }
            );
		}
		else{
			props.history.push("/profile/users");
		}
	},[]);

	const onChangeTitle = (e) =>{
		const title = e.target.value;
		setTitle(title);
	};
	const onChangeDescription = (e) =>{
		const description= e.target.value;
		setDescription(description);
	};
	const onChangeDate = (e)=>{
		const due_date = e.target.value;
		setDueDate(due_date);
	} 

	const editTask = (e) => {
        e.preventDefault();

        axios.patch(`http://localhost:8000/api/user/editTask/${idTask}?token=`+ userToken.token, {
        	title,
        	description,
        	due_date,
        })
        	.then(() => {
                props.history.push("/profile/users");
            });
    };
	return(
		<form onSubmit={editTask} >
			<div className="auth-wrapper">
                <div className="auth-inner">
                    <h3>Edit Task </h3>
                    <div>
                        <div className="form-group">
                            <label>Title</label>
                            <input 
                                type="text" 
                                className="form-control"
                                value={title}
                                onChange={onChangeTitle}
                                validations={[required]}
                                name="name"
                                placeholder="Title" 
                            />
                            <label>Description</label>
                            <textarea
					            className="form-control"
					            rows="5"
					            value={description}
                                onChange={onChangeDescription}
                                validations={[required]}
					            name="email"
	                            placeholder="Enter description"
					        />
                            <label>Date</label>
                            <input 
                                type="datetime-local" 
                                className="form-control" 
                                name="password"
                                value={due_date}
                                onChange={onChangeDate}
                                validations={[required]}
                                placeholder="Date" 
                            />
                        </div>
                        <button type="submit" className="btn btn-primary btn-block">Add</button>
                    </div> 
               
                </div>
            </div>
        </form>
	);
};

export default EditTask;