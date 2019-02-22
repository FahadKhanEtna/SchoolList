import React, { Component } from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './screens/Home/home';

export default class App extends Component {

  render() {
    return (
      <div className="App">
        <Home/>
      </div>
    );
  }
}