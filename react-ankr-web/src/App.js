import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';

import Home from './components/home/Home';
import About from './components/about/About';
import Product from './components/product/Product';
import Contacts from './components/contacts/Contacts';
import Navigation from './components/Navigation';
import FAQ from './components/FAQ/faq';
import Footer from './components/Footer';

// using SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs


class App extends Component {
  constructor() {
    super();

    this.state = {
      teamFormShow: false,
      partnerFormShow: false,
      demoFormShow: false,
      message: '',
      receiverEmail: 'bianz20@berkeley.edu',
      template: 'template_C0GJPd8I',
      senderEmail: ''
    }
  }

  // Functions handle teamForm show or hide
  handleTeamForm = () => {
    this.setState({ teamFormShow: !this.state.teamFormShow });
  }

  // Functions handle partnerForm show or hide
  handlePartnerForm = () => {
    this.setState({ partnerFormShow: !this.state.partnerFormShow });
  }

  // Functions handle demoForm show or hide
  handleDemoForm = () => {
    this.setState({demoFormShow: !this.state.demoFormShow});
  }

  sendFeedback = (templateId, senderEmail, receiverEmail, feedback) => {
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
      // Handle errors 
      .catch(err => console.error('Failed to send feedback. Error: ', err));

  }
  handleChange = (event) => {
    this.setState({
      message: event.target.value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log('sending message...')
    this.sendFeedback(
      this.state.template,
      this.state.senderEmail,
      this.state.receiverEmail,
      this.state.message
    );


  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navigation
              teamShow={this.state.teamFormShow}
              partnerShow={this.state.partnerFormShow}
              demoShow={this.state.demoFormShow}
              onTeamChange={this.handleTeamForm}
              onPartnerChange={this.handlePartnerForm}
              onDemoChange={this.handleDemoForm}
          />

          <Route path='/home' exact render={(props) => <Home {...props} demoShow={this.state.demoFormShow} onDemoChange={this.handleDemoForm} />} />
          <Route path='/about' component={About} />
          <Route path='/product' component={Product} />
          <Route path='/contacts' component={Contacts} />
          <Route path='/faq' component={FAQ} />

          <Footer
            teamShow={this.state.teamFormShow}
            partnerShow={this.state.partnerFormShow}
            onTeamChange={this.handleTeamForm}
            onPartnerChange={this.handlePartnerForm}
            handleChange = {this.handleChange}
            handleSubmit = {this.handleSubmit}
          />
        </div>
      </BrowserRouter> 
    );
  }
}

export default App;
