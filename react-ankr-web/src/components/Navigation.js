import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';


class Navigation extends Component {
    render() {
        return(
            <div className='nav'>
                <Link key={1} to=''>Home</Link>
                <Link key={2} to='/about'>About</Link>
                <Link key={3} to='/product'>Product</Link>
                <Link key={4} to='/contacts'>Contacts</Link>
                <a><li className="fab fa-staylinked"></li>JOIN OUR TEAM</a>
                <a><li className="fas fa-plus"></li>BECOME A PARTNER</a>
                <Button>REQUEST A DEMO</Button>
            </div>
        );
    }
}

export default Navigation;