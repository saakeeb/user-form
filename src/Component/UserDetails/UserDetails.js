import React, { useEffect, useState } from 'react';

const UserDetails = () => {
    
    const [localData, setLocalData] = useState({})
    useEffect(()=> {
        const data = localStorage.getItem('userData') || {};
        setLocalData(JSON.parse(data))
    },[])

    return (
        <div>
            <h3>Member Details</h3>
            <h6>Member ID: {localData.id}</h6>
            <h6>Member Name: {localData.name}</h6>
            <h6>Member Email: {localData.email}</h6>
            <h6>Member Mobile No: {localData.mobile}</h6>
            <h6>Member Birthday: {localData.date}</h6>
            <h6>Member Password: {localData.password}</h6>
            <h6>Member Details: {localData.club}</h6>
        </div>
    );
};

export default UserDetails;