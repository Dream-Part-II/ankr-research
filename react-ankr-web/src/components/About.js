import React, { Component } from 'react';


class About extends Component {
    render() {
        return(
            <div className="about">
                <div className="change-world">
                    <h2>We Dare to Change the World</h2>
                    <p>Building a better cloud is never an easy task, but we believe we are paving the way for 
                        a more open cloud ecosystem where businesses and consumers across the world can interconnect 
                        and benefit.</p>

                    <div>
                        <div>
                            {/*<img src="" alt="" /> */}
                            <h4>Build</h4>
                            <div>Build a resource-efficient blockchain framework</div>
                        </div>
                        <div>
                            {/*<img src="" alt="" /> */}
                            <h4>Connect</h4>
                            <div>Connect the computing power across the world</div>
                        </div>
                        <div>
                            {/*<img src="" alt="" /> */}
                            <h4>Evolve</h4>
                            <div>Continue improving and pushing our limits</div>
                        </div>
                    </div>
                </div>  
                
                <div className="our-story">
                    <h2>Our story</h2>
                    <p>"I believe that cloud computing should be ubiquitous in the near future, but it’s currently monopolized 
                        by tech giants. High margins are charged against users due to high infrastructure and human capital costs.</p>
                    <p>There should be a way for researchers, students, and startups to access affordable cloud computing that
                         isn’t centralized. Therefore, I founded Ankr together with Stanley Wu and Ryan Fang.</p>
                    <p>Stanley was my mentor during my internship. As for Ryan, our mutual trust established gradually 
                        throughout our college career.</p>
                    <p>We were roommates for four years, and I witnessed how he progressed from an ambitious freshman to a 
                        competent investment baking analyst.</p>
                    <p>Our goal is to make this team a family and keep pushing our boundaries to realize our ultimate goal: 
                        making the blockchain token model accessible, and decentralized cloud computing an everyday reality."</p>
                    <div>
                        <div>
                            <div>Chandler Song</div>
                            {/*Ankr Logo & Song's Title */}
                        </div>
                        <div className="signature-song">{/*<img src="" alt="chandler signature" /> */}</div>
                    </div>
                </div>

                


            </div> 
        );   
    }
}

export default About;