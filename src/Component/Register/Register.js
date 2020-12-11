import React, { useState } from 'react';
import firebase from "firebase/app";


const Register = () => {
    const [userUp, setUserUp] = useState({
        isSignIn : false,
        email: '',
        photo: '',
        password: '',
        name: '',
        error: '',
        success: false
    })
    const handleClick =  (e)=>{
        const name = e.target.name;
        const value = e.target.value;
        
        let isFieldValid = true;
        if(name === 'email'){
            isFieldValid = /\S+@\S+\.\S+/.test(value);
        }
        if(name === 'password'){
            const isValidLength = value.length >= 6;
            const isValidPass = /\d{1}/.test(value)
            isFieldValid = isValidLength && isValidPass;
        }
        if(isFieldValid){
            const userInfo = {...userUp};
            userInfo[name] = value;
            setUserUp(userInfo);
        }
    }
    const handleSubmit  = (e)=>{
        if(userUp.email && userUp.password && userUp.name){
            firebase.auth().createUserWithEmailAndPassword(userUp.email, userUp.password)
            .then(res => {
                const userErrorInfo = {...userUp};
                userErrorInfo.error = '';
                userErrorInfo.success = true;
                setUserUp(userErrorInfo);
            })
            .catch(error => {
                const userErrorInfo = {...userUp};
                userErrorInfo.success = false;
                userErrorInfo.error = error.message;
                setUserUp(userErrorInfo);

            })
        }
        e.target.reset();
        e.preventDefault();
    }

    return (
        <div>
            <h1>Fill the sign up form </h1>
            <p>Name: {userUp.name}</p>
            <p>Email: {userUp.email}</p>
            <p>Password: {userUp.password}</p>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" id="text" onBlur={handleClick} placeholder='Your Name' required/>
                <br/>
                <input type="text" name="email" id="email" onBlur={handleClick} placeholder='Your Email' required/>
                <br/>
                <input type="password" name="password" id="password" onBlur={handleClick} placeholder='Your Password' title='6 character with 1 numeric value' required/>
                <br/>
                <input type="submit" value="Submit"/>
            </form>
            <p style={{color:'red'}}>{userUp.error}</p>
            {
                userUp.success && <p style={{color:'green'}}>Your account added successfully</p>
            }
        </div>
    );
};

export default Register;