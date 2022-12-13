import React, { useEffect, useState } from "react";
import axios from "axios";
//import React, { useState } from 'react';
import UserData from "./UserData";
import ReactDOM from "react-dom";

import {KTSVG} from '../../_metronic/helpers'
import {Modal} from 'react-bootstrap'

const classUrl ="https://v4uiw8hfke.execute-api.ap-south-1.amazonaws.com/dev/api/1.0/classes/";




export function QuestionView() {
    
    const [ allClass, setClass ] = useState([]);

    const [ subject, setSubject ] = useState([]);

    const [ difficultyLevel, setDifficultyLevel ] = useState([]);

    const [ allQuestion, setAllQuestion ] = useState([]);

    const [questionPost, setQuestionPost] = useState({
        difficultyLevel:"",
        subject:""
    });
    
    // const [ choices, setChoices ] = useState([
    //     c1
    // ]);

    useEffect(()=>{
        getAllClass();
        getAllDifficultyLevel();
    },[]);


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
                //console.log(res.data.data);
                setSubject(res.data.data);
            }).catch(error => console.error('error'));
        }
    }

    const getQuestionSubjectWise = (subject) => {
        let quejUrl = "https://v4uiw8hfke.execute-api.ap-south-1.amazonaws.com/dev/api/1.0/getQuestions/";
        console.log('subject');
        console.log(subject);
    }

    

    const getAllDifficultyLevel = () => {
        //let classId = selects;
        let subjUrl = "https://v4uiw8hfke.execute-api.ap-south-1.amazonaws.com/dev/api/1.0/getAllDifficultyLevel";
            axios.get(subjUrl).then((res) => {
                // console.log(res.data.data);
                setDifficultyLevel(res.data.data);
            }).catch(error => console.error('error'));
    }

    const handleSubmit = (e) => {
         e.preventDefault();
         let quejUrl = "https://v4uiw8hfke.execute-api.ap-south-1.amazonaws.com/dev/api/1.0/getQuestions/";

        axios.post(quejUrl,questionPost).then((res) => {
            console.log(res.data.data);
            setAllQuestion(res.data.data);

        }).catch(error => console.error('error'));
        
    }

    const handleInput = (e) => {
        const name  = e.target.name;
        const value = e.target.value;
           // console.log(name + ' ' + value);

            setQuestionPost({...questionPost, [name]: value});
       
    }

    const addQuestion = () => {
        let queUrl = "https://v4uiw8hfke.execute-api.ap-south-1.amazonaws.com/dev/api/1.0/addQuestion";
        let data = questionPost;
        axios.post(queUrl,data).then((res) => {
            console.log('question submit');
            console.log(res.data);
            setQuestionPost({
                validFor:"",
                level:"",
                question: "",
                questionImageUrl:"",
                choices:[],
                correctAnswer:""
            });

            document.getElementById("questionForm").reset();

            // if(res.data.type == 'success'){
            //     setQuestionPost({});
            // }
        }).catch(error => console.error('error'));
    }

    const handleDelete = (e) => {   
        
        let delConf = window.confirm('Are you sure delete this Question');
        if(delConf){
            console.log(e.target.id);
            let delUrl = "https://v4uiw8hfke.execute-api.ap-south-1.amazonaws.com/dev/api/1.0/deleteQuestion/" + e.target.id;
            axios({
                method: "DELETET",
                url: delUrl
              })
                .then(function (response) {
                    window.location.reload();
                //   console.log(response);
                })
                .catch(function (response) {
                  //handle error
                //   console.log(response);
                });
        }
    }

    const handleEdit = (e) => {
        console.log(e.target.id)
        // setUpdateId(e.target.id);
        // handleShow();
    //    console.log(packages);
        // setEditSubjectId(e.target.id);
        // getSubjectIdWise(e.target.id);
        
    }
   
    

    return ( 
     <div>
        <div className="card card-custom">
            <div className="card-header">
                <h3 className="card-title">View Question</h3>
                <div className="card-toolbar">
                    {/* <button type="button" className="btn btn-sm btn-light">
                        Action
                    </button> */}
                </div>
            </div>
            <div className="card-body">
            <form onSubmit={handleSubmit} id="questionForm">
            <div class="container">
                <div className="row">
                    <div className="col">
                    <div className="mb-10">
                        <label className="form-label">Select Class</label>
                        <select className="form-control sm" id="classId"  onChange={(e) => getSubjectClassWise(e.target.value)}  required>
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
                    </div>
                    <div className="col">
                    <div className="mb-10">
                        <label className="form-label">Select Subject</label>
                        <select className="form-control sm" id="subjectId" name="subject" onChange={handleInput} required  >
                            <option value= ''>Select Subject</option>
                            {
                                subject.map((subject, index)=>{
                                return(
                                    <option key={subject['_id']} value={subject['_id']} >{subject['name']}</option>
                                )
                                })
                            }
                        </select>
                </div>
                    </div>
                    <div className="col">
                    <div className="mb-10">
                        <label className="form-label">Difficulty Level</label>
                        <select className="form-control sm" id="Difficulty-Level" value={questionPost.level} name="difficultyLevel" onChange={handleInput} required>
                            <option value= ''>Select Difficulty Level</option>
                            {
                                difficultyLevel.map((difficultyLevel, index)=>{
                                return(
                                    <option key={difficultyLevel['_id']} value={difficultyLevel['_id']} >{difficultyLevel['name']}</option>
                                )
                                })
                            }
                        </select>
                        </div>
                    </div>
                    <div className="col">
                    <div className="col-md-12">
                        <label className="form-label">Submit</label><br/>
                        <button className="btn btn-info ">Submit</button>
                </div>
                    </div>
                </div>
                </div>
                </form>
              
            </div>
            <div className="card-footer">
        
            </div>
        </div>
        <br/>
        <div className="card card-custom" >
            <div className="card-header">
                <h3 className="card-title"> Questions</h3>
                <div className="card-toolbar">
            
                </div>
            </div>
            <div className="card-body">
            <table className="table table-striped">
            <thead>
                <tr className="fw-bold fs-6 text-gray-800 border-bottom border-gray-200">
                    <th style={{width: '25%'}}>Question</th>
                    <th>Level</th>
                    <th>Choices</th>
                    <th>Correct Answer</th>
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
                    
                    allQuestion.map((que, index)=>{
                        // let propertyNames = Object.keys(user['currentStandard']);
                        // console.log(propertyNames);
                        //let cs = user['currentStandard'] ? user['currentStandard']:{_id: '',class:'',standard:''};
                        let choices = que['choices'] ? que['choices'] : ['','','',''];
            
                    return(
                        // <UserData />
                    <tr key={que['_id']}>
                        <td>{que['question']}</td>
                        <td>{que['level'].description}</td>
                        <td>
                            <li>{que['choices'][0]}</li>
                            <li>{que['choices'][1]}</li>
                            <li>{que['choices'][2]}</li>
                            <li>{que['choices'][3]}</li>
                        </td>
                        <td>{que['correctAnswer']}</td>
                        <td>
                                <button   className="btn btn-sm" >
                                   <i id={que['_id']} onClick={handleDelete} className="fa fa-trash" style={{color:"red"}}></i>
                                </button>

                                <button className="btn btn-sm" onClick={handleEdit} >
                                   <i id={que['_id']} className="fa fa-pen" style={{color:"green"}}></i>
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


      

    </div>
    )
}