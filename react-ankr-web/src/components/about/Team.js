import React, { Component } from 'react';
import StaffCarousel from '../carousel/StaffCarousel';

import { Staff } from '../../data/staff';


class Team extends Component {
    constructor(props) {
        super(props);
        this.state = {
            staff: Staff
        };
    }

    render() {
        return (
            <ul>
                {this.state.staff.map((person, idx) => {
                    return (
                        <li key={idx}>
                            <img src={person.img} alt="staff"/>
                            {person.name} {person.title}
                            <StaffCarousel id={idx}/>
                        </li>
                    );
                })}
            </ul>
        );
    }
}

export default Team;