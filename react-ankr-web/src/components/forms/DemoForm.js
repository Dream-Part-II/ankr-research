import React, { Component } from "react";
import { FormGroup, FormControl, Button, Modal } from "react-bootstrap";
import closeBtn from '../../images/modal-close-icon.png';
import '../../css/DemoForm.css';


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
                <button onClick={this.props.onChange}>REQUEST A DEMO</button>

                <Modal
                    show={this.props.show}
                    dialogClassName="demo-form-modal"
                >

                    <Modal.Body>
                        < form
                            onSubmit = {this.handleSubmit}
                            className="demo-form-main"
                        >
                            <button className="demo-form-close-btn" onClick={this.props.onChange}>
                                <img src={closeBtn}/>
                            </button>
                            <div className="demo-form-title">Request demos</div>
                            <div className="demo-form-divider"></div>
                            <label>Learn how you can leverage distributed computing network in your organization</label>

                            <div className="demo-form-middle">
                                <FormGroup className="demo-form-middle-left">
                                    <FormControl
                                        type="text"
                                        placeholder="Your name"
                                        className="demo-form-middle-left-item"
                                    />

                                    <FormControl
                                        type="email"
                                        placeholder="Your email address"
                                        className="demo-form-middle-left-item"
                                    />

                                    <FormControl
                                        type="text"
                                        placeholder="Your phone number"
                                        className="demo-form-middle-left-item"
                                    />
                                </FormGroup>

                                <FormGroup
                                    onChange={this.handleChange}
                                    className="demo-form-middle-right"
                                >
                                    <FormControl
                                        type="text"
                                        placeholder="Your position"
                                        className="demo-form-middle-right-item"
                                    />
                                    <FormControl
                                        type="text"
                                        placeholder="Your message"
                                        className="demo-form-middle-right-item-message"
                                    />
                                </FormGroup>
                            </div>

                            <div className="demo-form-send-btn">
                                <button  type="submit">Send Message</button>
                            </div>

                        </form>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }

}

export default DemoForm;