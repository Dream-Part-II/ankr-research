import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import TeamForm from './forms/TeamForm';
import PartnerForm from './forms/PartnerForm';
import DemoForm from './forms/DemoForm';


class Navigation extends Component {
    render() {
        return(
            <div className='nav'>
                <Link key={1} to=''>Home</Link>
                <Link key={2} to='/about'>About</Link>
                <Link key={3} to='/product'>Product</Link>
                <Link key={4} to='/contacts'>Contacts</Link>
                <TeamForm show={this.props.teamShow} onChange={this.props.onTeamChange} />
                <PartnerForm show={this.props.partnerShow} onChange={this.props.onPartnerChange} />
                <DemoForm show={this.props.demoShow} onChange={this.props.onDemoChange}/>
            </div>
        );
    }
}

export default Navigation;