import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import TeamForm from './forms/TeamForm';


class Navigation extends Component {
    render() {
        return(
            <div className='nav'>
                <Link key={1} to=''>Home</Link>
                <Link key={2} to='/about'>About</Link>
                <Link key={3} to='/product'>Product</Link>
                <Link key={4} to='/contacts'>Contacts</Link>
                <TeamForm show={this.props.teamShow} onChange={this.props.onTeamChange} />

                <Button>REQUEST A DEMO</Button>

            </div>
        );
    }
}

export default Navigation;