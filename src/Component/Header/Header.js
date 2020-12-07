import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    const headerStyle = {
        display: 'flex',
        justifyContent: 'space-around',
        backgroundColor: 'lightGrey',
        height: '40px',
        listStyleType:'none',
        fontSize: '25px',
        

    }
    return (
        <div>
            <nav>
                <ul style={headerStyle}>
                    <li><Link to='/home' style={{textDecoration: 'none'}}>Home</Link></li>
                    <li><Link to='/form' style={{textDecoration: 'none'}}>User Form</Link></li>
                    <li><Link to='/details' style={{textDecoration: 'none'}}>User Details</Link></li>
                </ul>
            </nav>
        </div>
    );
};

export default Header;