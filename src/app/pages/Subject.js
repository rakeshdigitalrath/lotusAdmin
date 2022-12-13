import React, { useEffect, useState } from "react";
import axios from "axios";
//import React, { useState } from 'react';
import UserData from "./UserData";
import ReactDOM from "react-dom";

import {Modal} from 'react-bootstrap'


const url = "https://v4uiw8hfke.execute-api.ap-south-1.amazonaws.com/dev/api/1.0/getPaymentDetails/";

const classUrl ="https://v4uiw8hfke.execute-api.ap-south-1.amazonaws.com/dev/api/1.0/classes/";



export function Subject() {
    const [ users, setUsers ] = useState([]);

    const [ allClass, setClass ] = useState([]);

    const [ subject, setSubject ] = useState([]);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showE, setShowE] = useState(false);
   
    const handleShowE = () => setShowE(true);

    const [ saveSubject, setSaveSubject ] = useState([]);

    const [ updateSubject, setUpdateSubject ] = useState([]);

    const [editSubjectId, setEditSubjectId ] = useState([]);

    //const [ subjectIdwise, setSubjectIdwise ] = useState([]);
    const [ subjectIdwise, setSubjectIdwise ] = useState(
        {
            "_id": "",
            "name": "",
            "avilableFor": {
                "_id": "",
                "class": "",
                "standard": ""
            },
            "folderId": "",
            "__v": 0
        }
    );

    const handleCloseE = () => {
        setShowE(false);
        // setSubjectIdwise(
        //     {
        //         "_id": "",
        //         "name": "",
        //         "avilableFor": {
        //             "_id": "",
        //             "class": "",
        //             "standard": ""
        //         },
        //         "folderId": "",
        //         "__v": 0
        //     }
        // );
    }


    useEffect(()=>{
        //getAllUser(); 
        getAllClass();
        //getSubjectClassWise();
    },[]);


    const handleInput = (e) => {
        const name  = e.target.name;
        const value = e.target.value;
           setSaveSubject({...saveSubject, [name]: value});
           
       
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        addQuestion();
        //console.log(saveSubject);
    }


    const addQuestion = () => {
        let subUrl = "https://v4uiw8hfke.execute-api.ap-south-1.amazonaws.com/dev/api/1.0/addSubject";
        var bodyFormData = new FormData();
        bodyFormData.append('name', saveSubject.name);
        bodyFormData.append('avilableFor', saveSubject.avilableFor);
        bodyFormData.append('file', saveSubject.file);
        bodyFormData.append('folderId', 0);
        axios({
            method: "post",
            url: subUrl,
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data" },
          })
            .then(function (response) {
                document.getElementById("subjectForm").reset();
                handleClose();
                alert('Subject successfully saved.');
              console.log(response);
            })
            .catch(function (response) {
              //handle error
              console.log(response);
            });
    }

    const handleDelete = (e) => {   
        
        let delConf = window.confirm('Are you sure delete this Subject');
        if(delConf){
            console.log(e.target.id);
            let delUrl = "https://v4uiw8hfke.execute-api.ap-south-1.amazonaws.com/dev/api/1.0/deleteSubject/" + e.target.id;
            axios({
                method: "delete",
                url: delUrl
              })
                .then(function (response) {
                    document.getElementById("cForm").reset();
                    setSubject([]);
                  console.log(response);
                })
                .catch(function (response) {
                  //handle error
                  console.log(response);
                });
        }
    }

    const handleEdit = (e) => {
        setEditSubjectId(e.target.id);
        getSubjectIdWise(e.target.id);
        
    }

    const handleInputE = (e) => {
        
        const name  = e.target.name;
        // const name  = subjectIdwise.name;
        const value = e.target.value;
        console.log(e);
         setUpdateSubject({...updateSubject, [name]: value});
           
    }

    const handleUpdate = (e) => {
        e.preventDefault();


        let subEUrl = "https://v4uiw8hfke.execute-api.ap-south-1.amazonaws.com/dev/api/1.0/updateSubject/" + editSubjectId;
        var bodyFormData = new FormData();
        bodyFormData.append('name', (updateSubject.name)?updateSubject.name:subjectIdwise.name);
        bodyFormData.append('avilableFor', (updateSubject.avilableFor)?updateSubject.avilableFor:subjectIdwise.avilableFor._id);
        bodyFormData.append('file', updateSubject.file);

        axios({
            method: "put",
            url: subEUrl,
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data" },
          })
            .then(function (response) {
                document.getElementById("subjectForm").reset();
                handleCloseE();
                alert('Subject successfully updated.');
                // setSubjectIdwise(
                //     {
                //         "_id": "",
                //         "name": "",
                //         "avilableFor": {
                //             "_id": "",
                //             "class": "",
                //             "standard": ""
                //         },
                //         "folderId": "",
                //         "__v": 0
                //     }
                // );
              console.log(response);
            })
            .catch(function (response) {
              //handle error
              console.log(response);
            });

        // console.log(editSubjectId);
        // console.log(updateSubject);
    }

    

    const getAllClass = () =>{
        axios.get(classUrl).then((res) => {
            //console.log(res.data.Data);
            setClass(res.data);
        }).catch(error => console.error('error'));
    }

    const getSubjectClassWise = (classId = '') => {
        //let classId = selects;
        let subjUrl = "https://v4uiw8hfke.execute-api.ap-south-1.amazonaws.com/dev/api/1.0/getSubjects/" + classId ;
        if(classId != ''){
            axios.get(subjUrl).then((res) => {
                //console.log(res.data.Data);
                setSubject(res.data.data);
            }).catch(error => console.error('error'));
        }
    }

    const getSubjectIdWise = (subjectId) =>{
        let subUrl = "https://v4uiw8hfke.execute-api.ap-south-1.amazonaws.com/dev/api/1.0/getSubjectDetails/" + subjectId ;
        axios.get(subUrl).then((res) => {
            console.log('subject details');
            
            setSubjectIdwise(res.data.data);
            console.log(subjectIdwise);
            handleShowE();            //setUpdateSubject({name:subjectIdwise.name});

            // subjectIdwise, setSubjectIdwise
            // setClass(res.data);
        }).catch(error => console.error('error'));
    }

    const handleChange = () => {
        //console.log(target.value);
        //setSelected(event.target.value);
        //console.log(e.target.value);
        console.log(document.getElementById('classId'));
      };
    
    // console.log('user');
    // console.log(users);
    // console.log(allClass);
    // console.log('subject');
    // console.log(subject);

    return (
     <div>
        <div className="card card-custom">
            <div className="card-header">
                <h3 className="card-title">Subject Management</h3>
                <div className="card-toolbar">
                <div className="card-toolbar">
                    <button 
                      type="button" 
                      className="btn btn-sm btn-light"
                      onClick={handleShow}
                    >
                        Add Subject
                    </button>
                </div>
                </div>
            </div>
            <div className="card-body">
                <form id="cForm">
                <div className="mb-10">
                        <label className="form-label">Get Subjects Class wise</label>
                        <select className="form-control sm" id="classId"  onChange={(e) => getSubjectClassWise(e.target.value)}  >
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
                </form>
            </div>
            <div className="card-footer">
        
            </div>
         </div>
        <br/>
         <div className="card card-custom">
            <div className="card-header">
                <h3 className="card-title">Subjects</h3>
                <div className="card-toolbar">
                    {/* <button type="button" className="btn btn-sm btn-light">
                        Action
                    </button> */}
                </div>
            </div>
            <div className="card-body">
                <div className="mb-10">
                <table className="table table-striped">
                <thead>
                    <tr className="fw-bold fs-6 text-gray-800 border-bottom border-gray-200">
                        {/* <th>Image</th> */}
                        <th>Name</th>
                        <th>Class</th>
                        <th>Standard</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    
                    {
                        subject.map((subject, index)=>{
                         let availFor = subject['avilableFor']? subject['avilableFor']:{_id:'',class:'',standard:''};
                        return(
                            // <UserData />
                        <tr key={subject['_id']}>
                            {/* <td>
                                <img src={subject['imageUrl']} height={50} width={50} alt="Image"></img>
                            </td> */}
                            <td>{subject['name']}</td>
                            <td>{availFor.class}</td>
                            <td>{availFor.standard}</td>
                            <td>
                                <button  onClick={handleDelete} className="btn btn-sm" >
                                   <i id={subject['_id']} className="fa fa-trash" style={{color:"red"}}></i>
                                </button>
                                &nbsp;
                                <button className="btn btn-sm" onClick={handleEdit} >
                                   <i id={subject['_id']} className="fa fa-pen" style={{color:"green"}}></i>
                                </button>
                                {/* {subject['_id']} */}
                            </td>
                        </tr>
                        )
                        })
                    }
                </tbody>
            </table>  
                </div>
            </div>
            <div className="card-footer">
        
            </div>
         </div>

            <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Subject</Modal.Title>
        </Modal.Header>
        
        <Modal.Body>
        <form onSubmit={handleSubmit} id="subjectForm" >
             <div>
                <div className="mb-10">
                    <label className="form-label">Subject Name</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Subject Name"
                        name="name"
                        onChange={handleInput}
                        autoComplete="off"
                        required
                    />
                </div>
                <div className="mb-10">
                    <label className="form-label">Subject Image</label>
                    <input
                        type="file"
                        className="form-control"
                        placeholder="Subject Name"
                        name="file"
                        onChange={handleInput}
                    />
                </div>
                {/* <input type="hidden" name="folderId" value="0" onChange={handleInput} /> */}
                <div className="mb-10">
                <label className="form-label">Class</label>
                    <select className="form-control sm" id="classId" name="avilableFor" onChange={handleInput}  required  >
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


     {/* Update modal */}

      <Modal show={showE} onHide={handleCloseE} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Subject</Modal.Title>
        </Modal.Header>
        
        <Modal.Body>
        <form onSubmit={handleUpdate} id="subjectForm" >
             <div>
                <div className="mb-10">
                    <label className="form-label">Subject Name</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Subject Name"
                        name="name"
                        onChange={handleInputE}
                        autoComplete="off"
                        defaultValue = {subjectIdwise.name}
                        required
                    />
                </div>
                <div className="mb-10">
                    <label className="form-label">Subject Image</label>
                    <input
                        type="file"
                        className="form-control"
                        placeholder="Subject Name"
                        name="file"
                        onChange={handleInputE}
                    />
                </div>
                {/* <input type="hidden" name="folderId" value="0" onChange={handleInput} /> */}
                <div className="mb-10">
                <label className="form-label">Class</label>
                    <select className="form-control sm" id="classId" name="avilableFor" onChange={handleInputE}  required  >
                                <option value= ''>Select Class</option>
                                {
                                    allClass.map((allClass, index)=>{
                                        return(
                                           
                                            (allClass['_id'] == subjectIdwise.avilableFor._id)?
                                            <option key={allClass['_id']} value={allClass['_id']} selected >{allClass['standard']}</option>
                                            : <option key={allClass['_id']} value={allClass['_id']} >{allClass['standard']}</option>
                                           
                                            // <option key={allClass['_id']} value={allClass['_id']} >{allClass['standard']}</option>
                                        )
                                        })
                                }
                    </select>
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