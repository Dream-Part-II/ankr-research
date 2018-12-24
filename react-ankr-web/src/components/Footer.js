import React, { Component } from 'react';
import {Button, FormControl, FormGroup} from "react-bootstrap";

import TeamForm from './forms/TeamForm';
import PartnerFrom from './forms/PartnerForm';

class Footer extends Component {
    render() {
        return (
            <div className="footer">
                {/*Add TeamForm and PartnerForm here, followed by "stay_tuned"*/}
                <TeamForm />
                <PartnerFrom />

                {/*"stay_tuned" below*/}
                <div className="stay_tuned">
                    <div className="left">
                        <h2>Stay tuned</h2>
                        <div>Stay tuned for the latest news</div>

                        <form>
                            <FormGroup>
                                <FormControl type="text" placeholder="Your email address" />
                            </FormGroup>

                            <Button type="submit">Subscribe</Button>
                        </form>

                        <div>support@ankr.network</div>
                    </div>

                    <div className="right">
                        <div className="about_footer">
                            <h5>About</h5>
                            <ul>
                                <li>STORY</li>
                                <li>CAREER</li>
                                <li>TEAM</li>
                                <li>PRODUCT</li>
                                <li>NEWS</li>
                            </ul>
                        </div>
                        <div className="support_footer">
                            <h5>Support</h5>
                            <ul>
                                <li>FAQ</li>
                                <li>CONTACT</li>
                                <li>LOGO ASSETS</li>
                                <li>WHITE PAPER</li>
                                <li>TECHNOLOGY</li>
                            </ul>
                        </div>
                        <div className="social_footer">
                            <h5>Social</h5>
                            <ul>
                                <li>Medium</li>
                                <li>Twitter</li>
                                <li>Telegram</li>
                                <li>Youtube</li>
                                <li>Wechat</li>
                                <li>Instagram</li>
                            </ul>
                        </div>

                    </div>


                </div>

                <footer>
                    <p>&copy; 2018 Ankr All rights reserved</p>
                </footer>
            </div>
        );
    }
}

export default Footer;