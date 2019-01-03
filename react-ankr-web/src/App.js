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


  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navigation />
          <Route path='/' exact component={Home} />
          <Route path='/about' component={About} />
          <Route path='/product' component={Product} />
          <Route path='/contacts' component={Contacts} />
          <Route path='/faq' component={FAQ} />
          <Footer />
        </div>
      </BrowserRouter> 
    );
  }
}

export default App;
