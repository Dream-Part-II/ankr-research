import React, { Component } from 'react';
import StaffCarousel from '../carousel/StaffCarousel';

import { Staff } from '../../data/staff';


class Team extends Component {
    constructor(props) {
        super(props);
        this.state = {
            staff: Staff,
            carouselShow: false,
        };
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
                            <li key={idx}>
                                <button onClick={this.handleClick}>
                                    <img src={person.img} alt="staff"/>
                                    {person.name}
                                </button>
                                {person.title}
                            </li>
                        );
                    })}
                </ul>

                <StaffCarousel show={this.state.carouselShow} onChange={this.handleClick} />
            </div>

        );
    }
}

export default Team;