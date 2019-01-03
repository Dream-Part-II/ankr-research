import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Navigation extends Component {
    render() {
        return(
            <div className='nav'>
                <Link key={1} to=''>Home</Link>
                <Link key={2} to='/about'>About</Link>
                <Link key={3} to='/product'>Product</Link>
                <Link key={4} to='/contacts'>Contacts</Link>
                <a>JOIN OUR TEAM</a>
                <a>BECOME A PARTNER</a>
            </div>
        );
    }
}

export default Navigation;