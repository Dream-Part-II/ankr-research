import React, { Component } from "react";
import { FormGroup, FormControl, Button } from "react-bootstrap";


class DemoForm extends Component {
    render() {
        return (
            <div>
                <h2>Request demos</h2>
                <form>
                    <label>Learn how you can leverage distributed computing network in your organization</label>
                    <FormGroup>
                        <FormControl
                            type="text"
                            placeholder="Your name"
                        />

                        <FormControl
                            type="email"
                            placeholder="Your email"
                        />

                        <FormControl
                            type="text"
                            placeholder="Your phone"
                        />

                        <FormControl
                            type="text"
                            placeholder="Your position"
                        />
                    </FormGroup>
                    <FormGroup bsSize="large">
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