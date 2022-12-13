import React, { useEffect, useState } from "react";
import axios from "axios";
//import React, { useState } from 'react';
import UserData from "./UserData";
import ReactDOM from "react-dom";

import {Modal} from 'react-bootstrap'


const url = "https://v4uiw8hfke.execute-api.ap-south-1.amazonaws.com/dev/api/1.0/allPackages/";
const classUrl ="https://v4uiw8hfke.execute-api.ap-south-1.amazonaws.com/dev/api/1.0/classes/";



export function Package() {
    const [ users, setUsers ] = useState([]);

    const [ allClass, setClass ] = useState([]);

    const [ createPackage, setCreatePackage ] = useState({
        name: "",
        price: "",
        validFor: [],
        validclass: ""
    });


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showE, setShowE] = useState(false);
    const handleCloseE = () => setShowE(false);
    const handleShowE = () => setShowE(true);

    const [editSubjectId, setEditSubjectId ] = useState([]);
    const [ updateSubject, setUpdateSubject ] = useState([]);
    const [ packageIdwise, setPackagetIdwise ] = useState(
        {
            "createdAt": "",
            "deleteFlag": false,
            "validFor": [
                {
                    "_id": "",
                    "class": "",
                    "standard": ""
                },
                {
                    "_id": "",
                    "class": "",
                    "standard": ""
                },
                {
                    "_id": "",
                    "class": "",
                    "standard": ""
                }
            ],
            "accessTo": [
                "",
                "",
                ""
            ],
            "_id": "",
            "name": "",
            "sortBy": 2,
            "price": 0,
            "__v": 0
        }
    );

    useEffect(()=>{
        getAllUser(); 
        getAllClass();
    },[]);

    const getAllUser = (limit = 10, offset = 0) =>{
        let data = {
            "limit": ""+limit +"", 
            "offset":""+offset +""
        };
        axios.get(url).then((res) => {
            //console.log(res.data.Data);
            setUsers(res.data.Data);
        }).catch(error => console.error('error'));
    }

    const getAllClass = () =>{
        axios.get(classUrl).then((res) => {
            //console.log(res.data.Data);
            setClass(res.data);
        }).catch(error => console.error('error'));
    }
    
    //console.log('user');

    const handleInput = (e) => {
        const name  = e.target.name;
        const value = e.target.value; 
        setCreatePackage({...createPackage, [name]: value});  
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        // validFor  valid-class
        createPackage.validFor.push(createPackage.validclass);

        console.log(createPackage);

        let packageUrl = "https://v4uiw8hfke.execute-api.ap-south-1.amazonaws.com/dev/api/1.0/createPackage";
        let data = createPackage;
        axios.post(packageUrl,data).then((res) => {
            
            document.getElementById("packageForm").reset();
            getAllUser();
            handleClose();
        }).catch(error => console.error('error'));
    }

    const handleDelete = (e) => {   
        
        let delConf = window.confirm('Are you sure delete this Package ?');
        if(delConf){
            console.log(e.target.id);
            let delUrl = "https://v4uiw8hfke.execute-api.ap-south-1.amazonaws.com/dev/api/1.0/deletePackage/" + e.target.id;
            axios({
                method: "put",
                url: delUrl
              })
                .then(function (response) {
                    // document.getElementById("cForm").reset();
                    // setSubject([]);
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
        //console.log(e.target.id);
        setEditSubjectId(e.target.id);
        getPackageIdWise(e.target.id);
        // handleShowE();
    }

    const getPackageIdWise = (packageId) =>{
        let subUrl = "https://v4uiw8hfke.execute-api.ap-south-1.amazonaws.com/dev/api/1.0/getPackageDetails/" + packageId ;
        axios.get(subUrl).then((res) => {
            console.log('package details');
            setPackagetIdwise(res.data.data);
            console.log(packageIdwise);
            handleShowE();
        }).catch(error => console.error('error'));
    }

    const handleInputE = (e) => {
        const name  = e.target.name;
        const value = e.target.value;
        setUpdateSubject({...updateSubject, [name]: value});
           
    }

    const handleUpdate = (e) => {
        e.preventDefault();


        let subEUrl = "https://v4uiw8hfke.execute-api.ap-south-1.amazonaws.com/dev/api/1.0/updatePackage/" + editSubjectId;
        

        axios({
            method: "put",
            url: subEUrl,
            data: updateSubject
          })
            .then(function (response) {
                document.getElementById("packageUpdForm").reset();
                handleCloseE();
                getAllUser();
                alert('Package successfully updated.');
              console.log(response);
            })
            .catch(function (response) {
              //handle error
              console.log(response);
            });

        console.log(editSubjectId);
        console.log(updateSubject);
    }

    return (
     <div>

            <div className="card card-custom">
            <div className="card-header">
                <h3 className="card-title">Package Management</h3>
                <div className="card-toolbar">
                    <button 
                      type="button" 
                      className="btn btn-sm btn-light"
                      onClick={handleShow}
                    >
                        Create Package
                    </button>
                </div>
            </div>
            <div className="card-body">
                <table className="table table-striped">
                <thead>
                    <tr className="fw-bold fs-6 text-gray-800 border-bottom border-gray-200">
                        <th style={{width: '20%'}}>Name</th>
                        <th>Price</th>
                        <th>Action</th>
                        {/* <th>Created </th> */}
                        {/* <th>Class</th>
                        <th>Standard</th>
                        <th>Package</th> */}
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
                        return(
                            // <UserData />
                        <tr key={user['_id']}>
                            <td>{user['name']}</td>
                            <td>{user['price']}</td>
                            {/* <td>{user['createdAt']}</td> */}
                            <td>
                                <button  onClick={handleDelete} className="btn btn-sm" >
                                   <i id={user['_id']} className="fa fa-trash" style={{color:"red"}}></i>
                                </button>
                                &nbsp;
                                <button id={user['_id']} className="btn btn-sm" onClick={handleEdit} >
                                   <i id={user['_id']} className="fa fa-pen" style={{color:"green"}}></i>
                                </button> 
                               
                            </td>
                        </tr>
                        )
                        })
                    }
                </tbody>
            </table>
            </div>
            <div className="card-footer">
            </div>
            </div>


            <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Create Package</Modal.Title>
        </Modal.Header>
        
        <Modal.Body>
        <form onSubmit={handleSubmit} id="packageForm" >
             <div>
                <div className="mb-10">
                    <label className="form-label">Package Name</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Package Name"
                        name="name"
                        onChange={handleInput}
                        autoComplete="off"
                        required
                    />
                </div>
            
                {/* <input type="hidden" name="folderId" value="0" onChange={handleInput} /> */}
                <div className="mb-10">
                <label className="form-label">Class</label>
                    <select className="form-control sm" id="classId" name="validclass" onChange={handleInput}  required  >
                                <option value= ''>Select Class</option>
                                {
                                    allClass.map((allClass, index)=>{
                                        return(
                                        <option key={allClass['_id']} value={allClass['_id']} >{allClass['standard']}</option>
                                        )
                                        })
                                }
                    </select>
                </div>

                <div className="mb-10">
                    <label className="form-label">Package Price</label>
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Package Price"
                        name="price"
                        onChange={handleInput}
                        autoComplete="off"
                        required
                    />
                </div>

                <div className="mb-10">
                        <label className="form-label"></label>
                        <button className="btn btn-info">Submit</button>
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
    
            >
          Save
         </button> */}
        
        </Modal.Footer>
        
      </Modal>


      <Modal show={showE} onHide={handleCloseE} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Package</Modal.Title>
        </Modal.Header>
        
        <Modal.Body>
        <form onSubmit={handleUpdate} id="packageUpdForm" >
             <div>
                <div className="mb-10">
                    <label className="form-label">Package Name</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Package Name"
                        name="name"
                        onChange={handleInputE}
                        autoComplete="off"
                        defaultValue={packageIdwise.name}
                        required
                    />
                </div>
            
                {/* <input type="hidden" name="folderId" value="0" onChange={handleInput} /> */}
                <div className="mb-10">
                <label className="form-label">Class</label>
                    <select className="form-control sm" id="classId" name="validclass" onChange={handleInputE}  required  >
                                <option value= ''>Select Class</option>
                                {
                                    allClass.map((allClass, index)=>{
                                        return(

                                         (packageIdwise.validFor[0]._id ==  allClass['_id'] )  ? 
                                         <option key={allClass['_id']} value={allClass['_id']} selected >{allClass['standard']}</option> :
                                         <option key={allClass['_id']} value={allClass['_id']} >{allClass['standard']}</option>

                                        // <option key={allClass['_id']} value={allClass['_id']} >{allClass['standard']}</option>
                                        )
                                        })
                                }
                    </select>
                </div>

                <div className="mb-10">
                    <label className="form-label">Package Price</label>
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Package Price"
                        name="price"
                        onChange={handleInputE}
                        defaultValue={packageIdwise.price}
                        autoComplete="off"
                        required
                    />
                </div>

                <div className="mb-10">
                        <label className="form-label"></label>
                        <button className="btn btn-info">Update</button>
                </div>
             </div>
             </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-light"
            onClick={handleCloseE}
            >
          Close
         </button>
         {/* <button
            type="button"
            className="btn btn-primary"
    
            >
          Save
         </button> */}
        
        </Modal.Footer>
        
      </Modal>
        
        
    </div>
    )
}