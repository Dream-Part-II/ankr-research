import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';

import Home from './components/Home';
import About from './components/About';
import Product from './components/Product';
import Contacts from './components/Contacts';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
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
