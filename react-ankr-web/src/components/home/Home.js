import React, { Component } from 'react';
import Main from './main';
import DemoForm from '../forms/DemoForm';


class Home extends Component {
    constructor (props) {
        super(props);

        this.state = {
            message: '',
            receiverEmail: 'bianz20@berkeley.edu',
            template: 'template_C0GJPd8I',
            senderEmail: ''
            }
    }
    sendFeedback = (templateId, senderEmail, receiverEmail, feedback) => {
        console.log(senderEmail);
        console.log(receiverEmail);
        window.emailjs
        .send('contact', templateId, {
                    senderEmail,
                    receiverEmail,
                    feedback
                })
        .then(res => {
                    this.setState({
                        formEmailSent: true
                    });
                })
                // Handle errors 
        .catch(err => console.error('Failed to send feedback. Error: ', err));

    }
    handleChange = (event) => {
        this.setState({
            message: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log('sending feedback')
        this.sendFeedback(
            this.state.template,
            this.state.senderEmail,
            this.state.receiverEmail,
            this.state.message
        );

        this.setState({
            formSubmitted: true
        });
    }


    render() {
        return(
            <div>
                Welcome to Home Page!
                <div> 
                    <Main />
                    <DemoForm 
                    handleChange = {this.handleChange}
                    handleSubmit = {this.handleSubmit}
                    />
                </div>
            </div>
            
            
        );
    }
}

export default Home;