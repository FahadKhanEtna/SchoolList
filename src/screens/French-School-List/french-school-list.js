import React, { Component } from 'react';
import { Table, Button, Alert } from 'reactstrap';
import SimpleMap from '../../components/Map/map';
import './french-school-list.css'

const schools = require('../../json/api.json')


export default class FrenchSchoolList extends Component {

  constructor(props) {
    super(props);
    this.state = {
        schoolListEmpty: false,
        numberOfSchool: '',
        schoolList: schools, 
        fixSchoolList: schools, 
        toogle: false,
        oneSchool: false,
        noSchool: false,
        isLoading: true,
    }
  }

  goToSchoolForm() {
    window.location.href = "/"
  }

  showMap(latitude, longitude) {
    this.setState({
        longitude : longitude,
        latitude: latitude,
        toogle : true
    })
  }

  hideMap() {
    this.setState({
        toogle : false
    })
  }

  render() { 
    let schoolList = this.state.schoolList.map((val, index) => {  
        return (
            <tr key={index} className="property-content">
                <td>{val.schoolName}</td>
                <td>{val.schoolYearlyDetails[0].numberOfStudents}</td>
                <td>
                    {val.address.street} <br/>
                    {val.address.city}, CA {val.address.zip}<br/>
                </td>
                <td>
                    <Button onClick={()=>this.showMap(val.address.latLong.latitude, val.address.latLong.longitude)}>Show Map</Button>
                </td>
            </tr>
        )
    })
    return (
      <div className="school-list-container">
        <div>
            <h2>French Schools</h2>
            { this.state.toogle?
                <div className="map-container">
                    <div className="close-cross-container ">
                        <span className="close-cross" onClick={()=>this.hideMap()}>X</span>
                        <SimpleMap longitude={this.state.longitude} latitude={this.state.latitude}/>
                    </div>
                </div>
            :'' }
            <div className="go-form-container">    
                <div className="go-form-button">
                    <Button color="success" onClick={()=>this.goToSchoolForm()}>Scholl Form</Button>
                </div>
            </div>
            <Table>
                <thead>
                    <tr>
                        <th>School Name</th>
                        <th>Number Of Students</th>
                        <th>Address</th>
                        <th>Location</th>
                    </tr>
                </thead>
                <tbody>
                    {schoolList}
                </tbody>
            </Table>
            {this.state.schoolListEmpty?<Alert color="danger">There is no school in this state, choose another state</Alert>:''}
        </div>
      </div>
    );
  }
}