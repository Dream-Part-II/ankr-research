import React, { Component } from 'react';
import StaffCarousel from '../carousel/StaffCarousel';

import { Staff } from '../../data/staff';


class Team extends Component {
    constructor(props) {
        super(props);
        this.state = {
            staff: Staff,
            carouselShow: false,
            staffID: 0
        };
    }

    // event handlers with parameters property initializer
    handleEventChange = (idx) => (e) => {
        e.preventDefault();
        this.setState({ carouselShow: !this.state.carouselShow, staffID: idx });
    }

    handleClick = () => {
        this.setState({ carouselShow: !this.state.carouselShow });
    }

    render() {
        return (
            <div>
                <ul>
                    {this.state.staff.map((person, idx) => {
                        return (
                            <li key={idx} onClick={this.handleEventChange(idx)}>
                                <img src={person.img} alt="staff"/>
                                {person.name}
                                {person.title}
                            </li>
                        );
                    })}
                </ul>

                <StaffCarousel id={this.state.staffID} show={this.state.carouselShow} onChange={this.handleClick} />
            </div>

        );
    }
}

export default Team;