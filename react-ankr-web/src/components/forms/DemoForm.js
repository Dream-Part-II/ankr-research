import React, { Component } from "react";
import { FormGroup, FormControl, Button } from "react-bootstrap";

class DemoForm extends Component {

    //static sender = 'gebridob@gmail.com';

    /*
    handleCancel() {
        this.setState({
            message: ''
        });
    }
    */

    
    render() {
        return (
            <div>
                <h2>Request demos</h2>
                <form onSubmit = {this.props.handleSubmit} >
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
                    <FormGroup bsSize="large" 
                    onChange = {this.props.handleChange}>
                        <FormControl
                            type="text"
                            placeholder="Your message"
                        />
                    </FormGroup>

                    <Button type="submit">Send Message</Button>
                </form>
            </div>
        );
    };

};

export default DemoForm;