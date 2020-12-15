import React, { useState, useContext  } from 'react';
import { Link } from 'react-router-dom';
import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import firebaseConfig from '../../Firebase.Config';
import { useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';


firebase.initializeApp(firebaseConfig);
firebase.analytics();
firebase.analytics().logEvent('notification_received');


const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const headerStyle = {
        display: 'flex',
        justifyContent: 'space-around',
        backgroundColor: 'lightGrey',
        height: '40px',
        listStyleType:'none',
        fontSize: '25px'
    }
    let history = useHistory();
    let location = useLocation();

    let { from } = location.state || { from: { pathname: "/" } };

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
            setLoggedInUser(signIn);

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
            setLoggedInUser({});
          })
        .catch(error => {
            const errorMessage = error.message;
            console.log(errorMessage);
        });
    }

    const fbProvider = new firebase.auth.FacebookAuthProvider();
    const handleFacebook = ()=>{
        firebase.auth().signInWithPopup(fbProvider)
        .then(result => {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            const token = result.credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            console.log('facebook', result, token, user);
            // ...
            })
            .catch(error => {
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                console.log(errorCode, errorMessage, email, credential);
        });
    }

    return (
        <div>
            <nav>
                <ul style={headerStyle}>
                    <Link to='/home' style={{textDecoration: 'none'}}>Home</Link>
                    <Link to='/form' style={{textDecoration: 'none'}}>User Form</Link>
                    <Link to='/details' style={{textDecoration: 'none'}}>User Details</Link>
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
                    <Link to='/register' style={{textDecoration: 'none'}}>Sign Up</Link>
                    <button type="submit" onClick={handleFacebook}>Login with Facebook</button>
                </ul>
            </nav>
        </div>
    );
};

export default Header;