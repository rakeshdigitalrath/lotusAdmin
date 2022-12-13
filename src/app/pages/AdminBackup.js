import React, { useEffect, useState } from "react";
import axios from "axios";
//import React, { useState } from 'react';
import UserData from "./UserData";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";

import {Modal} from 'react-bootstrap'


const url = "https://v4uiw8hfke.execute-api.ap-south-1.amazonaws.com/dev/api/1.0/getRegisteredUsers/";



export function AdminBackup() {
    const [ users, setUsers ] = useState([]);

    const [creatUser, setCreatUser ] = useState(
        {
            "name" : "",
            "phone" :"",
            "email" : "",
            "password" : "",
            "role"     :"admin"
        }
    );

    useEffect(()=>{
        getAllUser(); 
    },[]);

    const getAllUser = (limit = 100, offset = 0) =>{
        let data = {
            "limit": ""+limit +"", 
            "offset":""+offset +""
        };
        axios.post(url,data).then((res) => {
            //console.log(res.data.Data);
            setUsers(res.data.Data);
        }).catch(error => console.error('error'));
    }
    
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDelete = (e) => {   
        
        let delConf = window.confirm('Are you sure delete this User' + e.target.id);
        if(delConf){
            console.log(e.target.id);
            let delUrl = "https://v4uiw8hfke.execute-api.ap-south-1.amazonaws.com/dev/api/1.0/deleteUser/" + e.target.id;
            axios({
                method: "put",
                url: delUrl
              })
                .then(function (response) {
                    setUsers([]);
                    getAllUser(); 
                  console.log(response);
                })
                .catch(function (response) {
                  //handle error
                  console.log(response);
                });
        }
    }

    const handleEdit = (e) => {
        console.log(e.target.id)
        // setEditSubjectId(e.target.id);
        // getSubjectIdWise(e.target.id);
        
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // creatUser.role = 'admin';
        console.log(creatUser);
        // validFor  valid-class
        // createPackage.validFor.push(createPackage.validclass);

        // console.log(createPackage);

        let userUrl = "https://v4uiw8hfke.execute-api.ap-south-1.amazonaws.com/dev/api/1.0/register";
        let data = creatUser;
        axios.post(userUrl,data).then((res) => {
            
            document.getElementById("adminForm").reset();
            // getAllUser();
            handleClose();
        }).catch(
             function (response) {
                alert('Something went wrong Please try Again!');
                console.log(response);
              }
        );
    }

    const handleInput = (e) => {
        const name  = e.target.name;
        const value = e.target.value; 
        setCreatUser({...creatUser, [name]: value});  

        //console.log(creatUser);
    }

    return (
     <div className='row'>

            <div className="card card-custom">
            <div className="card-header">
                {/* <h3 className="card-title">Add Admin</h3> */}
                <ul class="nav nav-tabs card-header-tabs">
                    <li class="nav-item">
                        <Link className="nav-link"  to="/users">Users</Link>
                    </li>
                    <li class="nav-item">
                        <Link className="nav-link active"  to="/admin">Admin</Link>
                    </li>
                </ul>
                <div className="card-toolbar">
                    <button 
                      type="button" 
                      className="btn btn-sm btn-light"
                      onClick={handleShow}
                    >
                        Add Admin
                    </button>
                </div>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit} id="adminForm">
                <div>
                    <div className="mb-10">
                        <label className="form-label">Name</label>
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            placeholder="User Name"
                            onChange={handleInput}
                            autoComplete="off"
                            required
                        />
                        </div>
                        <div className="mb-10">
                        <label className="form-label">Phone No</label>
                        <input
                            type="text" id="phone"
                            name="phone"
                            className="form-control form-control-solid"
                            placeholder="Phone No"
                            onChange={handleInput}
                            autoComplete="off"
                            required
                        />
                        </div>
                        <div className="mb-10">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control form-control-white"
                            placeholder="Email Id"
                            onChange={handleInput}
                            autoComplete="off"
                            required
                        />
                        </div>
                        <div className="mb-10">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="form-control form-control-white"
                            placeholder="Password"
                            onChange={handleInput}
                            autoComplete="off"
                            required
                        />
                        </div>

                        <div className="mb-10">
                            <label className="form-label"></label>
                            <button className="btn btn-info">Save</button>
                        </div>
                </div>
                </form>
            </div>
            <div className="card-footer">
                
            </div>
            </div>



      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Update User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
             <div>
             <div className="mb-10">
                <label className="form-label">Name</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="User Name"
                />
                </div>
                <div className="mb-10">
                <label className="form-label">Phone No</label>
                <input
                    type="text"
                    className="form-control form-control-solid"
                    placeholder="Phone No"
                />
                </div>
                <div className="mb-10">
                <label className="form-label">Email</label>
                <input
                    type="text"
                    className="form-control form-control-white"
                    placeholder="Email Id"
                />
                </div>
                <div className="mb-10">
                <label className="form-label">Class</label>
                <input
                    type="text"
                    className="form-control form-control-white"
                    placeholder="Class"
                />
                </div>
             </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-light"
            onClick={handleClose}
            >
          Close
         </button>
         <button
            type="button"
            className="btn btn-primary"
            onClick={handleClose}
            >
          Save
         </button>
        </Modal.Footer>
      </Modal>

        
        
    </div>
    )
}