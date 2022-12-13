import React, { useEffect, useState } from "react";
import axios from "axios";
//import React, { useState } from 'react';
import UserData from "./UserData";
import ReactDOM from "react-dom";

import {KTSVG} from '../../_metronic/helpers'
import {Modal} from 'react-bootstrap'

const classUrl ="https://v4uiw8hfke.execute-api.ap-south-1.amazonaws.com/dev/api/1.0/classes/";




export function Question() {
    
    const [ allClass, setClass ] = useState([]);

    const [ subject, setSubject ] = useState([]);

    const [ difficultyLevel, setDifficultyLevel ] = useState([]);

    const [questionPost, setQuestionPost] = useState({
        validFor:"",
        level:"",
        question: "",
        questionImageUrl:"",
        choices:[],
        correctAnswer:""

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
        
        //  console.log('question');
        questionPost.choices.push(questionPost.c1);
        questionPost.choices.push(questionPost.c2);
        questionPost.choices.push(questionPost.c3);
        questionPost.choices.push(questionPost.c4);
         //console.log(questionPost);
         addQuestion();
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
            alert('Question submited successfully.');

            // if(res.data.type == 'success'){
            //     setQuestionPost({});
            // }
        }).catch(error => console.error('error'));
    }
   
    

    return ( 
     <div>
        <div className="card card-custom">
            <div className="card-header">
                <h3 className="card-title">Question Management</h3>
                <div className="card-toolbar">
                    {/* <button type="button" className="btn btn-sm btn-light">
                        Action
                    </button> */}
                </div>
            </div>
            <div className="card-body">
                {/* <b>Add Question</b> */}
                <form onSubmit={handleSubmit} id="questionForm">
                <div className="mb-10">
                        <label className="form-label">Select Class</label>
                        <select className="form-control sm" id="classId"  onChange={(e) => getSubjectClassWise(e.target.value)}  required>
                            <option value= ''>Select Class</option>
                            {
                                allClass.map((allClass, index)=>{
                                    return(
                                        // <UserData />
                                    // <tr key={allClass['_id']}>
                                        
                                    // </tr>
                                    <option key={allClass['_id']} value={allClass['_id']} >{allClass['standard']}</option>
                                    )
                                    })
                            }
                        </select>
                </div>
                <div className="mb-10">
                        <label className="form-label">Select Subject</label>
                        <select className="form-control sm" id="subjectId" name="validFor" onChange={handleInput} required >
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
                <div className="mb-10">
                        <label className="form-label">Difficulty Level</label>
                        <select className="form-control sm" id="Difficulty-Level" value={questionPost.level} name="level" onChange={handleInput} required>
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
                <div className="mb-10">
                        <label className="form-label">Question</label>
                        <textarea
                            className="form-control"
                            placeholder="question"
                            autoComplete="off"
                            value={questionPost.question}
                            name="question"
                            onChange={handleInput}
                            required
                        />
                </div>

                <div className="mb-10">
                        <label className="form-label">Question Image</label>
                        <input type="file" className="form-control"></input>
                </div>

                <div className="mb-10">
                        <label className="form-label">Choices 1</label>
                        <input
                            type="text"
                            className="form-control"
                            autoComplete="off"
                            name="c1"
                            onChange={handleInput}
                            required
                        />
                </div>

                <div className="mb-10">
                        <label className="form-label">Choices 2</label>
                        <input
                            type="text"
                            className="form-control"
                            autoComplete="off"
                            name="c2"
                            onChange={handleInput}
                            required
                        />
                </div>
                <div className="mb-10">
                        <label className="form-label">Choices 3</label>
                        <input
                            type="text"
                            className="form-control"
                            autoComplete="off"
                            name="c3"
                            onChange={handleInput}
                            required
                        />
                </div>

                <div className="mb-10">
                        <label className="form-label">Choices 4</label>
                        <input
                            type="text"
                            className="form-control"
                            autoComplete="off"
                            name="c4"
                            onChange={handleInput}
                            required
                        />
                </div>
                <div className="mb-10">
                        <label className="form-label">Correct Answer</label>
                        <select className="form-control" value={questionPost.correctAnswer}  name="correctAnswer" onChange={handleInput} required>
                        <option value="">Select Correct Answer No</option>
                            <option value={1}> 1 </option>
                            <option value={2}> 2 </option>
                            <option value={1}> 3 </option>
                            <option value={1}> 4 </option>
                        </select>
                </div>

                <div className="mb-10">
                        <label className="form-label"></label>
                        <button className="btn btn-info">Submit</button>
                </div>
                </form>
            </div>
            <div className="card-footer">
        
    </div>
    </div>
  

    </div>
    )
}