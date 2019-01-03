import React, { Component } from 'react';
import Main from './main';
import WhatsAnkr from './whats_ankr';
import WhyAnkr from './why_ankr';
import UseCases from './use_cases';
import RoadMap from './road_map';
import Partners from './partners';
import LatestNews from './latest_news';
<<<<<<< HEAD

=======
import Footer from '../Footer';
import DemoForm from '../forms/DemoForm';
>>>>>>> c330426e44b404b846ab63d878e31d613410ef92

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
<<<<<<< HEAD
=======
                    <Footer />
                    
>>>>>>> c330426e44b404b846ab63d878e31d613410ef92
                </div>
            </div>
            
            
        );
    }
}

export default Home;