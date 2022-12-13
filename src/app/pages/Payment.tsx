import React, { useEffect, useState } from "react";
import axios from "axios";
//import React, { useState } from 'react';
import UserData from "./UserData";
import ReactDOM from "react-dom";


const url = "https://v4uiw8hfke.execute-api.ap-south-1.amazonaws.com/dev/api/1.0/getPaymentDetails/";



export function Payment() {
    const [ users, setUsers ] = useState([]);

    useEffect(()=>{
        getAllUser(); 
    },[]);

    const getAllUser = (limit = 10, offset = 0) =>{
        let data = {
            "limit": ""+limit +"", 
            "offset":""+offset +""
        };
        axios.post(url,data).then((res) => {
            //console.log(res.data.Data);
            setUsers(res.data.Data);
        }).catch(error => console.error('error'));
    }
    
    console.log('user');

    return (
     <div className='row'>

            <div className="card card-custom">
            <div className="card-header">
                <h3 className="card-title">Payment Management</h3>
                <div className="card-toolbar">
                    <button type="button" className="btn btn-sm btn-light">
                        Action
                    </button>
                </div>
            </div>
            <div className="card-body">
                <table className="table">
                <thead>
                    <tr className="fw-bold fs-6 text-gray-800 border-bottom border-gray-200">
                        <th>Email</th>
                        <th>Price</th>
                        <th>Created </th>
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
                            <td>{user['email']}</td>
                            <td>{user['amount']}</td>
                            <td>{user['createdAt']}</td>
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