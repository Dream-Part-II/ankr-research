import React, { Component } from "react";
import { FormGroup, FormControl, Button } from "react-bootstrap";


class TeamForm extends Component {
    render() {
        return (
            <div>
                <h2>Join our team</h2>
                <form>
                    <label>We create a culture of fun and collaboration and are looking for dedicated people
                        who want to make a real impact around the world.
                    </label>

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
                    </FormGroup>

                    <FormGroup>
                        <FormControl componentClass="select">
                            <option value="Product Manager">Product Manager</option>
                            <option value="Business Development Assistant">Business Development Assistant</option>
                            <option value="Front-end Developer">Front-end Developer</option>
                            <option value="Software Engineer">Software Engineer</option>
                        </FormControl>
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

export default TeamForm;