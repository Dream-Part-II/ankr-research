import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';

import Navigation from './components/Navigation';
import Home from './components/home/Home';
import About from './components/about/About';
import Product from './components/product/Product';
import Contacts from './components/contacts/Contacts';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navigation />
          <Route path='/' exact component={Home} />
          <Route path='/about' component={About} />
          <Route path='/product' component={Product} />
          <Route path='/contacts' component={Contacts} />
        </div>
      </BrowserRouter> 
    );
  }
}

export default App;
