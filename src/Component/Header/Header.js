import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import firebaseConfig from '../../Firebase.Config';


firebase.initializeApp(firebaseConfig);
firebase.analytics();
firebase.analytics().logEvent('notification_received');


const Header = () => {
    const headerStyle = {
        display: 'flex',
        justifyContent: 'space-around',
        backgroundColor: 'lightGrey',
        height: '40px',
        listStyleType:'none',
        fontSize: '25px'
    }

    const [user, setUser] = useState({
        isSignIn : false,
        name : '',
        email : '',
        photo : ''
    })

    const provider = new firebase.auth.GoogleAuthProvider();
    const handleSignIn = ()=>{
        firebase.auth().signInWithPopup(provider)
        .then(res => {
            const {displayName, email, photoURL} = res.user;
            const token = res.credential.accessToken;
            const signIn = {
                isSignIn : true,
                name: displayName,
                email: email,
                photo: photoURL
            };
            setUser(signIn);

            console.log(displayName, email, photoURL, 'token:', token);
            console.log(res);
        })
        .catch(error => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.email;
            const credential = error.credential;
            console.log(errorMessage, email);
        })
    }
    const handleSignOut = ()=>{
        firebase.auth().signOut()
        .then(res => {
            const signOut =  {
                isSignIn : false,
                name: '',
                email: '',
                photo: '' 
            }
            setUser(signOut);
          })
        .catch(error => {
            const errorMessage = error.message;
            console.log(errorMessage);
        });
    }

    return (
        <div>
            <nav>
                <ul style={headerStyle}>
                    <li><Link to='/home' style={{textDecoration: 'none'}}>Home</Link></li>
                    <li><Link to='/form' style={{textDecoration: 'none'}}>User Form</Link></li>
                    <li><Link to='/details' style={{textDecoration: 'none'}}>User Details</Link></li>
                    {
                        user.isSignIn ? <button style={{backgroundColor:'lightGrey', border:'none', cursor:'pointer'}} onClick={handleSignOut}>Sign Out</button> :
                        <button style={{backgroundColor:'lightGrey', border:'none', cursor:'pointer'}} onClick={handleSignIn}>Sign In</button>
                    }
                    {
                        user.isSignIn && <div style={{display:'flex'}}>
                            <l1 style={{position:'relative'}}>Welcome, {user.name}</l1>
                            <img src={user.photo} alt="" style={{height:'38px', borderRadius:'50%'}}/> 
                        </div>
                    }
                    <li><Link to='/register' style={{textDecoration: 'none'}}>Sign Up</Link></li>
                </ul>
            </nav>
        </div>
    );
};

export default Header;