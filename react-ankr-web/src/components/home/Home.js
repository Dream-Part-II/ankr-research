import React, { Component } from 'react';
import Main from './home/main';

class Home extends Component {
    render() {
        return(
            <div>
                Welcome to Home Page!
                <div> 
                    <Main /> 
                </div>
            </div>
            
            
        );
    }
}

export default Home;