import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link, useParams, useRouteMatch } from "react-router-dom";
import axios from "axios";
import authHeader from "../services/auth-header";
import { MDBDataTable } from "mdbreact";


const Admin = (props) => {
	const [users, setUsers] = useState([])

	useEffect(() =>{
		axios.get("http://localhost:8000/api/getalluser",{ headers: authHeader() })
			.then((response) => {
				console.log('users: ',response.data.users);
				setUsers(response.data.users);
			});
	},[]);
    let { path, url } = useRouteMatch();


    const userToken = JSON.parse(localStorage.getItem('userToken'));


    const removeData = (id) => {
        axios.get(`http://localhost:8000/api/delete/${id}`, { headers: authHeader() })
        // console.log('id: ',id)
            .then(() => {
                window.location.reload();
            });
    }

    const restoreData = (id) => {
        axios.patch(`http://localhost:8000/api/restore/${id}`+"?token="+userToken.token)
            .then(() => {
                window.location.reload();
            });
    }

    const JsonUsers=[];

    for(var i=0; i<Object.keys(users).length; i++){
        const id1 = users[i].id;
        if(i==0) {
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
                delete_or_restore: "Admin",
                tasks: 
                    <Link to={{
                            pathname:`/profile/addTask`,
                            param: id1,
                        }}>
                            <button className="btn btn-outline-primary small font-weight-bold shadow-lg">Add Task</button>
                        </Link>

            })
        }else{
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
                delete_or_restore:
                    !users[i].deleted_at && users[i].id?(
                        <button className="btn btn-outline-danger small font-weight-bold shadow-lg" onClick={() => removeData(id1)}>Delete</button>
                    ):(
                        <button className="btn btn-outline-info small font-weight-bold shadow-lg" onClick={() => restoreData(id1)}>Restore</button>
                    ),
                tasks:
                    !users[i].deleted_at && users[i].id?(
                        <Link to={{
                            pathname:`/profile/addTask`,
                            param: id1,
                        }}>
                            <button className="btn btn-outline-primary small font-weight-bold shadow-lg">Add Task</button>
                        </Link>
                    ):(
                        <button className="btn btn-outline-info small font-weight-bold shadow-lg">Deleted</button>
                    ),
                viewTasks:
                    !users[i].deleted_at && users[i].id?(
                        <Link to={{
                            pathname:`/profile/ViewUserTask`,
                            param: id1,
                        }}>
                            <button className="btn btn-outline-primary small font-weight-bold shadow-lg">View Task</button>
                        </Link>
                    ):(
                        <button className="btn btn-outline-info small font-weight-bold shadow-lg">Deletd</button>
                    ),
            })
        }
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
                label:"delete/restore",
                field:"delete_or_restore"
            },
            {
                label:"add task",
                field:"tasks"
            },
            {
                label:"Details",
                field:"viewTasks"
            }
        ],
        rows: JsonUsers
    };
    return(
        <div className="card">
            <Link to={`${path}/register`}>
                <button type="button" className="btn btn-primary small1" >Register User</button>
            </Link>
            <MDBDataTable striped bordered hover data={table} />
        </div>
    );  
};

export default Admin;