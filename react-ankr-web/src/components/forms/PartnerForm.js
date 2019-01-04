import React, { Component } from "react";
import { FormGroup, FormControl, Button, Modal } from "react-bootstrap";


class PartnerForm extends Component {
    render() {
        return (
            <div>
                <Button onClick={this.props.onChange}><span className="fas fa-plus">BECOME A PARTNER</span></Button>

                <Modal show={this.props.show}>
                    <Modal.Header>
                        <Modal.Title>Become a partner</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
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
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={this.props.onChange}>Close</Button>
                    </Modal.Footer>
                </Modal>



            </div>
        );
    }

}

export default PartnerForm;