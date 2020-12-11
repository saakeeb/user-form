import React, { useEffect, useState } from 'react';

import firebase from "firebase/app";
import "firebase/analytics";

firebase.analytics();

const UserDetails = () => {
    
    const [localData, setLocalData] = useState({})
    useEffect(()=> {
        const data = localStorage.getItem('userData');
        if(data){
            setLocalData(JSON.parse(data));
        }
        
    },[])
    // const hide = ()=>{

    // }
    return (
        <div>
            <h3>Member Details</h3>
            <h6>Member ID: {localData.id}</h6>
            {
                localData.name && <h6>Member Name: {localData.name}</h6>
            }
            {
                localData.email && <h6>Member Email: {localData.email}</h6>
            }
            {
                localData.mobile && <h6>Member Mobile No: {localData.mobile}</h6>
            }
            {
                localData.date && <h6>Member Birthday: {localData.date}</h6>
            }
            {
                localData.password && <h6>Member Password: {localData.password}</h6>
            }
            {
                localData.club && <h6>Member Details: {localData.club}</h6>
            }
            
        </div>
    );
};

export default UserDetails;