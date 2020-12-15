import React, { useState , useContext } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/analytics";
import { useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';




firebase.analytics();


const Register = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const [newUser, setNewUser] = useState(false);

    const [userUp, setUserUp] = useState({
        isSignIn : false,
        email: '',
        photo: '',
        password: '',
        name: '',
        error: '',
        success: false
    })

    
    let history = useHistory();
    let location = useLocation();

    let { from } = location.state || { from: { pathname: "/" } };

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
        if(newUser && userUp.email && userUp.password){
            firebase.auth().createUserWithEmailAndPassword(userUp.email, userUp.password)
            .then(res => {
                const userErrorInfo = {...userUp};
                userErrorInfo.error = '';
                userErrorInfo.success = true;
                setUserUp(userErrorInfo);
                updateUser(userUp.name);
                history.replace(from);
            })
            .catch(error => {
                const userErrorInfo = {...userUp};
                userErrorInfo.success = false;
                userErrorInfo.error = error.message;
                setUserUp(userErrorInfo);

            })
        }
        if(!newUser && userUp.email && userUp.password ){
            firebase.auth().signInWithEmailAndPassword(userUp.email, userUp.password)
            .then((res) => {
                const userErrorInfo = {...userUp};
                userErrorInfo.error = '';
                userErrorInfo.success = true;
                setUserUp(userErrorInfo);
                setLoggedInUser(userErrorInfo);
                history.replace(from);
                console.log('user sign in successfully', res);
            })
            .catch((error) => {
                const userErrorInfo = {...userUp};
                userErrorInfo.success = false;
                userErrorInfo.error = error.message;
                setUserUp(userErrorInfo);
            });
        }
        e.target.reset();
        e.preventDefault();
    }

    const updateUser = name =>{
        var user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: name
            })
            .then(() => {
                console.log('successfully submitted');
            })
            .catch(error=> {
                console.log(error);
        });
    }


    return (
        <div style={{textAlign:'center'}}>
            
            <h1>Fill the sign up form </h1>
            <p>Name: {userUp.name}</p>
            <p>Email: {userUp.email}</p>
            <p>Password: {userUp.password}</p>
            <input type="checkbox" name="newUser" id="" onChange={()=> setNewUser(!newUser)}/>
            <label htmlFor="newUser">Sign up for new user</label>
            <form onSubmit={handleSubmit}>
                {newUser &&
                    <input type="text" name="name" id="text" onBlur={handleClick} placeholder='Your Name' required/>
                }
                <br/>
                <input type="text" name="email" id="email" onBlur={handleClick} placeholder='Your Email' required/>
                <br/>
                <input type="password" name="password" id="password" onBlur={handleClick} placeholder='Your Password' title='6 character with 1 numeric value' required/>
                <br/>
                <input type="submit" value={newUser ? 'Sign Up' : 'Sign In'}/>
            </form>
            <p style={{color:'red'}}>{userUp.error}</p>
            {
                userUp.success && <p style={{color:'green'}}>Your account {newUser ? 'created' : 'logged in'} successfully</p>
            }
        </div>
    );
};

export default Register;