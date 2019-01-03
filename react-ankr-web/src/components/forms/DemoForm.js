import React, { Component } from "react";
import { FormGroup, FormControl, Button } from "react-bootstrap";


// var postmark = require("postmark");
// var client = new postmark.ServerClient("f3d3ef1a-12d4-49b9-b416-5f547e38c77d");

class DemoForm extends Component {
    state = {
        feedback: '',
        formSubmitted: false,
        receiverEmail: 'bianz20@berkeley.edu',
        template: 'template_C0GJPd8I',
        senderEmail: 'gebridob@gmail.com'
    };

    handleCancel = this.handleCancel.bind(this);
    handleChange = this.handleChange.bind(this);
    handleSubmit = this.handleSubmit.bind(this);

    

    //static sender = 'gebridob@gmail.com';

    handleCancel() {
        this.setState({
            feedback: ''
        });
    }

    handleChange(event) {
        this.setState({
            feedback: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();


        
        console.log('sending feedback')
        this.sendFeedback(
            this.state.template,
            this.state.senderEmail,
            this.state.receiverEmail,
            this.state.feedback
        );

        this.setState({
            formSubmitted: true
        });
    }

    sendFeedback(templateId, senderEmail, receiverEmail, feedback) {
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
            // Handle errors here however you like
            .catch(err => console.error('Failed to send feedback. Error: ', err));

    }
    render() {
        return (
            <div>
                <h2>Request demos</h2>
                < form onSubmit = {
                this.handleSubmit
                } >
                    <label>Learn how you can leverage distributed computing network in your organization</label>
                    <FormGroup>
                        <FormControl
                            type="text"
                            placeholder="Your name"

                        />

                        <FormControl
                            type="email"
                            placeholder="Your email address"
                        />

                        <FormControl
                            type="text"
                            placeholder="Your phone number"
                        />

                        <FormControl
                            type="text"
                            placeholder="Your position"
                        />
                    </FormGroup>
                    <FormGroup bsSize="large" onChange={
                        this.handleChange
                    }>
                        <FormControl
                            type="text"
                            placeholder="Your message"
                        />
                    </FormGroup>

                    <Button type="submit">Send Message</Button>
                </form>
            </div>
        );
    }

}

export default DemoForm;