import React, { useEffect, useState } from "react";
import axios from "axios";
//import React, { useState } from 'react';
import UserData from "./UserData";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import {AsideMenuItem} from '../../_metronic/layout/components/aside/AsideMenuItem'


import {Modal} from 'react-bootstrap'


const url = "https://v4uiw8hfke.execute-api.ap-south-1.amazonaws.com/dev/api/1.0/getRegisteredUsers/";



export function Admin() {
    const [ users, setUsers ] = useState([]);
    const [ packages, setPackage ] = useState([]);
    const [ updateId, setUpdateId ] = useState([]);

    const [userDetails, setUserDetails] = useState([]);
    const [ allClass, setClass ] = useState([]);

    const [pageCount, setPageCount] = useState([]);
    const [offsetNo, setOffsetNo] = useState(0);

    useEffect(()=>{
        getAllUser(); 
        getAllPackages();
        getAllClass();
    },[]);

    const getAllUser = (limit = 2500, offset = 0) =>{
        let data = {
            "limit": ""+limit +"", 
            "offset":""+offset +""
        };
        axios.post(url,data).then((res) => {
            // console.log(res.data.totalCount);
            setUsers(res.data.Data);
            userPagination(res.data.totalCount);
        }).catch(error => console.error('error'));
    }

    const userPagination =(total) =>{
        let totalPage = Math.ceil(total / 10);
        let arr = new Array(totalPage).fill("").map((_, i) => i + 1);
        setPageCount(arr);
    }

    const pageHandle = (offset) => {
        getAllUser(10, offset);
        setOffsetNo(offset);
    }

    const classUrl ="https://v4uiw8hfke.execute-api.ap-south-1.amazonaws.com/dev/api/1.0/classes/";
    const getAllClass = () =>{
        axios.get(classUrl).then((res) => {
            //console.log(res.data.Data);
            setClass(res.data);
        }).catch(error => console.error('error'));
    }
    
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDelete = (e) => {   
        
        let delConf = window.confirm('Are you sure delete this User');
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
                //   console.log(response);
                })
                .catch(function (response) {
                  //handle error
                //   console.log(response);
                });
        }
    }

    const getAllPackages = () => {
        let packageUrl = "https://v4uiw8hfke.execute-api.ap-south-1.amazonaws.com/dev/api/1.0/allPackages/";
        axios.get(packageUrl).then((res) => {
            //console.log(res.data.Data);
            setPackage(res.data.Data);
            // console.log( packages);
        }).catch(error => console.error('error'));
    }

    const handleEdit = (e) => {
        //console.log(e.target.id)
        setUpdateId(e.target.id);
        getUserDetails(e.target.id);
        // handleShow();
        
    //    console.log(packages);
        // setEditSubjectId(e.target.id);
        // getSubjectIdWise(e.target.id);
        
    }

    const getUserDetails = (id) =>{
        let url = "https://v4uiw8hfke.execute-api.ap-south-1.amazonaws.com/dev/api/1.0/getUserDetails/"+id;
        axios.get(url).then((res) => {
            console.log(res.data.data);
            setUserDetails(res.data.data);
            handleShow();
        }).catch(error => console.error('error'));
    }

    const handleUpdate = (e) => {
        e.preventDefault();

        let pack = document.getElementById('packId').value;
        let arr = pack.split(",");
        let id = arr[1];
        let name = arr[0];
        console.log(name + id);
        console.log(updateId);
        let phone = document.getElementById('userPhone').value;
        let classIdValue = document.getElementById('classId').value;
        let classIdArr = classIdValue.split(",");
        let classId = classIdArr[0];
        let standard = classIdArr[1];
        let clsName  = classIdArr[2];
        //alert(classId + " "+ standard + " "+ clsName);
        let data = {
            "currentStandard":{
                "_id": classId,
                "class": clsName,
                "standard": standard
            },
            "phone": phone,
            "assignedPackage" : [
                {"_id":id, "name":name}
            ]
        }

        let updateUrl = "https://v4uiw8hfke.execute-api.ap-south-1.amazonaws.com/dev/api/1.0/updateUser/"+updateId;
        axios({
            method: "put",
            url: updateUrl,
            data: data
          })
            .then(function (response) {
                document.getElementById("packageUpdForm").reset();
                handleClose();
                getAllUser();
                //alert('Package successfully updated.');
              console.log(response);
            })
            .catch(function (response) {
              //handle error
              console.log(response);
            });

    }

    return (
     <div className='row'>

            <div className="card card-custom">
            <div className="card-header">
                {/* <h3 className="card-title">Users Management</h3> */}
                <ul class="nav nav-tabs card-header-tabs">
                    <li class="nav-item">
                        <Link className="nav-link"  to="/users">Users</Link>
                    </li>
                    <li class="nav-item">
                        <Link className="nav-link active"  to="/admin">Admin</Link>
                    </li>
                </ul>
                <div className="card-toolbar">
                    {/* <button 
                      type="button" 
                      className="btn btn-sm btn-light"
                    >
                        Add Admin
                    </button> */}
                </div>
            </div>
            <div className="card-body">
            <table className="table table-hover table-striped">
            <thead>
                <tr className="fw-bold fs-6 text-gray-800 border-bottom border-gray-200">
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    {/* <th>Class</th> */}
                    <th>Standard</th>
                    <th>Package</th>
                    <th>Type</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {/* <tr>
                    <td>Tiger Nixon</td>
                    <td>System Architect</td>
                    <td>Edinburgh</td>
                    <td>61</td>
                    <td>2011/04/25</td>
                    <td>$320,800</td>
                </tr> */}
                {
                    users.map((user, index)=>{
                        // let propertyNames = Object.keys(user['currentStandard']);
                        // console.log(propertyNames);
                        let cs = user['currentStandard'] ? user['currentStandard']:{_id: '',class:'',standard:''};
                        let pack = user['assignedPackage'] ? user['assignedPackage']: {"_id":"", "name":""};

                        let packSt = pack[0] ? pack[0]: {"_id": "","name": ""};
                        
                        //console.log(packSt.name)
                    return(
                            (user['role'] == 'admin')?
                            <tr key={user['_id']}>
                                <td>{user['name']}</td>
                                <td>{user['phone']}</td>
                                <td>{user['email']}</td>
                                {/* <td>{cs.class}</td> */}
                                <td>{cs.standard}</td>
                                <td>
                                    {packSt.name}
                                </td>
                                <td>
                                    {user['role'] ? user['role']: 'User' }
                                </td>
                                <td>
                                <button   className="btn btn-sm" >
                                        <i id={user['_id']} onClick={handleDelete} className="fa fa-trash" style={{color:"red"}}></i>
                                        </button>
                                        &nbsp;
                                        {/* <button className="btn btn-sm"  >
                                        <i id={user['_id']} className="fa fa-pen" style={{color:"green"}}></i>
                                        </button> */}
                                        &nbsp;
                                        <button className="btn btn-sm" onClick={handleEdit} >
                                        <i id={user['_id']} className="fa fa-pen" style={{color:"green"}}></i>
                                        </button>
                                </td>
                            </tr>: ''
                    )
                    })
                }


                {/* <ul className="pagination">
                    {
                        pageCount.map((pg, index)=>{
                                        
                            
                            return(
                                (offsetNo == (index * 10))?
                                    <li className="page-item">
                                        <a href="#" className="page-link active" onClick={e => pageHandle((index) * 10)}>
                                        {index + 1}
                                        </a>
                                   </li> :
                                   <li className="page-item">
                                   <a href="#" className="page-link" onClick={e => pageHandle((index) * 10)}>
                                   {index + 1}
                                   </a>
                                  </li>

                            )
                            })
                    }
                </ul> */}
            </tbody>
            </table>
            </div>
            <div className="card-footer">
                
            </div>
            </div>

    
            {/* <button
                type="button"
                className="btn btn-primary"
                onClick={handleShow}
            >
                Add User
            </button> */}

      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Update User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form  id="packageUpdForm" onSubmit={handleUpdate} >
             <div>
                {/* <div className="mb-10">
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
                </div> */}
                <div className="mb-10">
                <label className="form-label">Class</label>
                    <select className="form-control sm" id="classId" name="avilableFor"   required  >
                                <option value= ''>Select Class</option>
                                {
                                    allClass.map((allClass, index)=>{
                                        let classId = userDetails.currentStandard ? userDetails.currentStandard._id : 0;
                                        return(
                                           
                                            (allClass['_id'] == classId)?
                                            <option key={allClass['_id']} value={[allClass['_id'],allClass['standard'],allClass['class']]} selected >{allClass['standard']}</option>
                                            : <option key={allClass['_id']} value={[allClass['_id'],allClass['standard'],allClass['class']]} >{allClass['standard']}</option>
                                           
                                            //  <option key={allClass['_id']} value={allClass['_id']} >{allClass['standard']}</option>
                                        )
                                        })
                                }
                    </select>
                </div>
                <div className="mb-10">
                <label className="form-label">Phone</label>
                <input
                    type="text"
                    id='userPhone'
                    className="form-control form-control-white"
                    placeholder="Phone"
                    defaultValue={userDetails.phone}
                    required
                />
                </div>
                <div className="mb-10">
                    <label className="form-label">Packages</label>
                    <select className="form-control sm" id="packId" name="validclass"  required  >
                                <option value= ''>Select Package</option>
                                {
                                    

                                    // userDetails
                                    packages.map((pack, index)=>{
                                        
                                        let id = userDetails.assignedPackage?((userDetails.assignedPackage[0])?userDetails.assignedPackage[0]._id:''):0;
                                        return(
                                            ( id ==  pack['_id'] )  ? 
                                         <option key={pack['_id']} value={[ pack['name'],pack['_id']]} selected >{pack['name']}</option> :
                                         <option key={pack['_id']} value={[ pack['name'],pack['_id']]} >{pack['name']}</option>

                                             //<option key={pack['_id']} value={[ pack['name'],pack['_id']]} >{pack['name']}</option>
                                        )
                                        })
                                }
                    </select>
                </div>

                <div className="mb-10">
                        <label className="form-label"></label>
                        <button className="btn btn-info">Save</button>
                </div>

             </div>
             </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-light"
            onClick={handleClose}
            >
          Close
         </button>
         {/* <button
            type="button"
            className="btn btn-primary"
            onClick={handleClose}
            >
          Save
         </button> */}
        </Modal.Footer>
      </Modal>

        
        
    </div>
    )
}