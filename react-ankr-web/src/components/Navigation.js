import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import TeamForm from './forms/TeamForm';
import PartnerForm from './forms/PartnerForm';
import DemoForm from './forms/DemoForm';

import logo from '../images/logo-icon.svg';
import '../css/Navigation.css';


class Navigation extends Component {
    render() {
        return(
            <div className='nav'>
                <div className="nav-logo">
                    <img src={logo} alt="ankr-logo"/>
                    <span>Ankr</span>
                </div>

                <div className="nav-tags">
                    <Link key={1} to='/'>Home</Link>
                    <Link key={2} to='/about'>About</Link>
                    <Link key={3} to='/product'>Product</Link>
                    <Link key={4} to='/contacts'>Contacts</Link>
                </div>

                <div className="nav-forms">
                    <TeamForm show={this.props.teamShow} onChange={this.props.onTeamChange} />
                    <PartnerForm show={this.props.partnerShow} onChange={this.props.onPartnerChange} />
                    <DemoForm show={this.props.demoShow} onChange={this.props.onDemoChange}/>
                </div>
            </div>
        );
    }
}

export default Navigation;