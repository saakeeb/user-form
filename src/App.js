import React, { createContext, useState } from 'react';
import './App.css';
import Header from './Component/Header/Header';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from './Component/Home/Home';
import UserForm from './Component/UserForm/UserForm';
import UserDetails from './Component/UserDetails/UserDetails';
import firebase from "firebase/app";
import "firebase/analytics";
import Register from './Component/Register/Register';
import PrivateRoute from './Component/PrivateRoute/PrivateRoute';

firebase.analytics();
export const UserContext = createContext()

function App() {
  const [loggedInUser, setLoggedInUser] = useState({})

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
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
          <PrivateRoute path="/details">
            <UserDetails></UserDetails>
          </PrivateRoute>
          <Route path="/register">
            <Register></Register>
          </Route>
          <Route path="/*">
            <h3>Please input correctly</h3>
            <h4>404 Error...</h4>
          </Route>
        </Switch>
      </Router>
      

    </UserContext.Provider>
  );
}

export default App;
