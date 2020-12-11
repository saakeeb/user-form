import React from 'react';
import './App.css';
import Header from './Component/Header/Header';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from './Component/Home/Home';
import UserForm from './Component/UserForm/UserForm';
import UserDetails from './Component/UserDetails/UserDetails';
import firebase from "firebase/app";
import "firebase/analytics";
import Register from './Component/Register/Register';

firebase.analytics();


function App() {
  return (
    <div className="App">
      <Router>
        <Header></Header>
        <Switch>
          <Route exact path="/">
            <Home></Home>
          </Route>
          <Route path="/home">
            <Home></Home>
          </Route>
          <Route path="/form">
            <UserForm></UserForm>
          </Route>
          <Route path="/details">
            <UserDetails></UserDetails>
          </Route>
          <Route path="/register">
            <Register></Register>
          </Route>
          <Route path="/*">
            <h3>Please input correctly</h3>
            <h4>404 Error...</h4>
          </Route>
        </Switch>
      </Router>
      

    </div>
  );
}

export default App;
