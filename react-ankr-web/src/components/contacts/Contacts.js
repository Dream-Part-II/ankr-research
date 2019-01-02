import React, { Component } from 'react';

import ContactForm from '../forms/ContactForm';
import Footer from '../Footer';

class Contacts extends Component {
    render() {
        return(
            <div className="contacts">
                {/*1st part: "contacts"*/}
                <div>
                    <h2>Contacts</h2>
                    <div className="us">
                        <span className="fas fa-map-marker-alt"></span>
                        <div>San Francisco Office</div>
                        <div>609 Mission St 2nd floor</div>
                        <div>San Francisco, CA 94105</div>
                    </div>

                    <div className="china">
                        <span className="fas fa-map-marker-alt"></span>
                        <div>Shanghai Office</div>
                        <div>Room 1108, Neo Bay Technology Building,</div>
                        <div>951 Jianchuan Road, District of Minghang</div>
                        <div>1108室零号湾科技大楼（闵行区剑川路951号)</div>
                    </div>

                    <div>
                        <span className="far fa-envelope"></span>
                        support@ankr.network
                    </div>
                </div>

                {/*2nd part: "Contact form"*/}
                <div>
                    <ContactForm/>
                </div>

                {/*3rd part: "footer"*/}
                <div>
                    <Footer/>
                </div>



            </div> 
        );   
    }
}

export default Contacts;