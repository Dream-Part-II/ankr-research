import React, { Component } from 'react';

import { Staff } from '../../data/staff';

class Team extends Component {
    constructor() {
        super();
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
                        </li>
                    );
                })}
            </ul>
        );
    }
}

export default Team;