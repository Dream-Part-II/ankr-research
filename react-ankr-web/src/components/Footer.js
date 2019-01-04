import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Button, FormControl, FormGroup} from "react-bootstrap";

import TeamForm from './forms/TeamForm';
import PartnerFrom from './forms/PartnerForm';

class Footer extends Component {
    render() {
        return (
            <div className="footer">
                {/*Add TeamForm and PartnerForm here, followed by "stay_tuned"*/}
                <TeamForm show={this.props.teamShow} onChange={this.props.onTeamChange} />
                <PartnerFrom show={this.props.partnerShow} onChange={this.props.onPartnerChange} />

                {/*"stay_tuned" below*/}
                <div className="stay_tuned">
                    <div className="left">
                        <h2>Stay tuned</h2>
                        <div>Stay tuned for the latest news</div>

                        <form onSubmit = {this.props.handleSubmit}>
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
                                <li><a href="about#our-story">STORY</a></li>
                                <li><a href="about#career">CAREER</a></li>
                                <li><a href="about#team">TEAM</a></li>
                                <li><a href="product">PRODUCT</a></li>
                                <li><a href="home#news">NEWS</a></li>
                            </ul>
                        </div>
                        <div className="support_footer">
                            <h5>Support</h5>
                            <ul>
                                <li><a href="faq">FAQ</a></li>
                                <li><a href="contacts#contacts">CONTACT</a></li>
                                <li><a href="https://www.ankr.network/pdf/LOGO%20ASSETS.pdf" target="_blank">LOGO ASSETS</a></li>
                                <li><a href="https://www.ankr.network/pdf/AnkrWhitepaper.pdf" target="_blank">WHITE PAPER</a></li>
                                <li><a href="product#tech_overview">TECHNOLOGY</a></li>
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