import React, { Component } from 'react';
import { Opennings } from "../../data/opennings";

class Opens extends Component {
    constructor() {
        super();
        this.state = {
            opens: Opennings,
        };
    }

    render() {
        return (
            <ul>
                {this.state.opens.map((open, idx) => {
                    return (
                        <li key={idx}>
                            {open.title}
                            {open.type}
                            {open.location}
                            <button>SEND REQUEST</button>
                        </li>
                    )
                })}
            </ul>
        );
    }
}

export default Opens;
