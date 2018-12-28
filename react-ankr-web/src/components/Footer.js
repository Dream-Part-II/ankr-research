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

                        <div>
                            <span class="far fa-envelope"></span>
                            support@ankr.network
                        </div>
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
                                <a href="https://medium.com/ankr-network" target="_blank"><li><li className="fab fa-medium-m">Medium</li></li></a>
                                <a href="https://twitter.com/ankrnetwork?lang=en" target="_blank"><li><li className="fab fa-twitter">Twitter</li></li></a>
                                <a href="https://t.me/anrknetworkann" target="_blank"><li><li className="fab fa-telegram-plane">Telegram</li></li></a>
                                <a href="https://www.youtube.com/channel/UCr6z1C2Ti0DOS_zNqh62U-A" target="_blank"><li><li className="fab fa-youtube">Youtube</li></li></a>
                                <li><li className="fab fa-weixin">Wechat</li></li>
                                <a href="https://www.instagram.com/ankrnetwork/" target="_blank"><li><li className="fab fa-instagram">Instagram</li></li></a>
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