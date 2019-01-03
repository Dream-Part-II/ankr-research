import React, { Component } from 'react';
import Main from './main';
import WhatsAnkr from './whats_ankr';
import WhyAnkr from './why_ankr';
import UseCases from './use_cases';
import RoadMap from './road_map';
import Partners from './partners';
import LatestNews from './latest_news';
import Footer from '../Footer';
import DemoForm from '../forms/DemoForm';

class Home extends Component {
    render() {
        return(
            <div>
                Welcome to Home Page!
                <div> 
                    <Main /> 
                    <WhatsAnkr />
                    <WhyAnkr />
                    <UseCases />
                    <RoadMap />
                    <Partners />
                    <LatestNews />
                    <Footer />
                    
                </div>
            </div>
            
            
        );
    }
}

export default Home;