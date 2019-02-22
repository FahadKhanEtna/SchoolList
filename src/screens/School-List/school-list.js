import React, { Component } from 'react';
import { Table, Button, Alert } from 'reactstrap';
import SearchBar from '../../components/Search-Bar/search-bar'
import SimpleMap from '../../components/Map/map';
import Loader from 'react-loader-spinner';
import './school-list.css'

const APP_ID = "578af7fa"
const API_KEY = "049e1305b39b0c26229915211077f01b"
const API_URL = "https://api.schooldigger.com/v1.1/schools"

export default class SchoolList extends Component {

  constructor(props) {
    super(props);
    this.state = {
        schoolListEmpty: false,
        numberOfSchool: '',
        schoolList: [], 
        fixSchoolList: [], 
        toogle: false,
        oneSchool: false,
        noSchool: false,
        isLoading: true
    }
  }

  componentDidMount() {
    let STATE_CODE = this.props.match.params.id
    fetch(API_URL+'?st='+STATE_CODE+'&appID='+APP_ID+'&appKey='+API_KEY)
    .then(res=>res.json())
    .then(school=> {
        if(school.code===400) {
            this.setState({
                schoolListEmpty:true,
                isLoading:false
            })
        }
        this.setState({
            numberOfSchool: school.numberOfPages
        })
        school.schoolList.map(prop => {
            this.state.schoolList.push(prop)
            this.setState({
                schoolList: this.state.schoolList,
                fixSchoolList: this.state.schoolList,
                isLoading:false
            })
            return true
        });
    })
  }

  goToSchoolForm() {
    window.location.href = "/"
  }

  onClickSearch(searchSchool) {
        let listLength = this.state.fixSchoolList.length
        let res = false;
        for (let i=0; i<=listLength-1; i++) {
            let checkSchool = this.state.fixSchoolList[i].schoolName
            if (searchSchool === checkSchool) {
                this.setState({
                    schoolList: []
                })  
                this.setState({
                    schoolList: [this.state.fixSchoolList[i]],
                    oneSchool: true
                })
                res = true;                     
            }         
        }
        if(res===false) {
            this.setState({
                noSchool: true,
            })
            setTimeout(() => {
                this.setState({
                    noSchool:false
                });
            }, 3000)
        }        
  }

  allSchools() {
      this.setState({
        schoolList: this.state.fixSchoolList,
        oneSchool: false
      })
  }

  showMap() {
    this.setState({
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
                    {val.address.city}, CA {val.address.zip}-{val.address.zip4}<br/> 
                </td>
                <td>
                    <Button onClick={()=>this.showMap()}>Show Map</Button>
                </td>
            </tr>
        )
    })
    return (
      <div className="school-list-container">
        <div>
            <h2>number of schools : {this.state.numberOfSchool}</h2>
            {this.state.isLoading?<Loader type="Circles" color="#28a745" height={80} width={80}/>:''}
            { this.state.toogle?
                <div className="map-container">
                    <div className="close-cross-container ">
                        <span className="close-cross" onClick={()=>this.hideMap()}>X</span>
                        <SimpleMap/>
                    </div>
                </div>
            :'' }
            <div className="go-form-container">    
                <div className="go-form-button">
                    <Button color="success" onClick={()=>this.goToSchoolForm()}>Scholl Form</Button>
                </div>
                <div className="search-bar">
                    <SearchBar callback={this.onClickSearch.bind(this)}/>
                </div>  
            </div>
            { this.state.oneSchool?
                    <div className="show-all-container">    
                        <p onClick={()=>this.allSchools()} className="show-all-button">Show All Schools</p>
                    </div>
            :'' }
            { this.state.noSchool?                  
                    <Alert color="danger">No School Found</Alert>
            :'' }   
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