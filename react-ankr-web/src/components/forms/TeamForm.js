import React, { Component } from "react";
import { FormGroup, FormControl, Button, Modal } from "react-bootstrap";
import bracket from "../../images/bracket.svg";
import f1 from "../../images/f-1.svg";

import '../../css/TeamForm.css';


class TeamForm extends Component {

    render() {
        return (
            <div className="teamForm">
                <Button onClick={this.props.onChange}>
                    <div className={this.props.navBar ? "team-form-logo" : "footer-team-form-logo"}>
                        <img className="footer-forms-btn-left-bracket" src={bracket} alt="logo bracket" />
                        <img className="footer-forms-btn-f1" src={f1} alt="join logo"/>
                    </div>
                    <div>
                        <span className="fab fa-staylinked">JOIN OUR TEAM</span>
                        <div className={this.props.navBar ? "team-form-desc" : "footer-team-form-desc"}>Build next-generation products with us</div>
                    </div>
                </Button>

                <Modal show={this.props.show}>
                    <Modal.Header>
                        <Modal.Title>Join our team</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
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
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={this.props.onChange} >Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }

}

export default TeamForm;