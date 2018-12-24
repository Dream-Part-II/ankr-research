import React, { Component } from "react";
import { FormGroup, FormControl, Button } from "react-bootstrap";


class PartnerForm extends Component {
    render() {
        return (
            <div>
                <h2>Become a partner</h2>
                <form>
                    <label>Explore Ankr ecosystem for the right opportunities and networks to help you achieve business success.</label>
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

                        <FormControl
                            type="text"
                            placeholder="Your company"
                        />

                        <FormControl
                            type="text"
                            placeholder="Your company website"
                        />
                    </FormGroup>

                    <FormGroup bsSize="large">
                        <FormControl
                            type="text"
                            placeholder="Your message"
                        />
                    </FormGroup>

                    <FormGroup>
                        <FormControl
                            type="file"
                        />
                    </FormGroup>

                    <Button type="submit">Send Message</Button>
                </form>
            </div>
        );
    }

}

export default PartnerForm;