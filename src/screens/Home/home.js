import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';

import SchoolForm from '../School-Form/school-form';
import SchoolList from '../School-List/school-list';
import FrenchSchoolList from '../French-School-List/french-school-list';

export default class Home extends Component {

  render() {
    return (
      <Router>
        <div>
          <h1>Schools</h1>
          <Route exact path='/' component={SchoolForm} />
          <Route path='/school-list/:id' component={SchoolList}/>
          <Route path='/french-school-list' component={FrenchSchoolList}/>
        </div>
      </Router>
    );
  }
}