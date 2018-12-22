import React, { Component } from 'react';

import ChangeWorld from './ChangeWorld';
import Story from './Story';


class About extends Component {
    render() {
        return(
            <div className="about"> 
                <ChangeWorld />
                <Story />

                


            </div> 
        );   
    }
}

export default About;