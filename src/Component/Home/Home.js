import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <h1>Welcome to our club</h1>
            <h3>You can join our club by submitting the form</h3>
            <h4>You can fill up form <Link to="/form">here</Link>.</h4>
        </div>
    );
};

export default Home;