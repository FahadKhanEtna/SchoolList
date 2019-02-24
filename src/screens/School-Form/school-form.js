import React from 'react';
import { Button, Form, FormGroup, Input } from 'reactstrap';

const states = require('../../json/states.json')

export default class SchoolForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      stateList: [],
      abbreviationValue: 'al',
    }
    this.showSchoolList = this.showSchoolList.bind(this)
  }

  componentDidMount() {
    states.map(prop => {
        this.state.stateList.push(prop)
        this.setState({stateList: this.state.stateList})
        return true
    });
  }

  handleChange = (event) => {
    this.setState({ abbreviationValue: event.target.value });
  };

  showSchoolList(value) {
    value = value.toLowerCase()
    window.location.href = "/school-list/"+value
  }

  showfrenchSchoolList() {
    window.location.href = "/french-school-list"
  }

  render() {
    const { stateList, abbreviationValue} = this.state;
    return (
      <div>
        <Form>
          <FormGroup>
            <h2>Select Your State</h2>
            <Input onChange={this.handleChange} value={abbreviationValue} type="select" name="select" id="exampleSelect">
              {
                stateList.map(item => (
                  <option key={item.abbreviation} value={item.abbreviation}>
                    {item.name}({item.abbreviation})
                  </option>
                ))
              }
            </Input>          
          </FormGroup>
          <Button color="success" onClick={()=>this.showSchoolList(abbreviationValue)}>Submit</Button><br/><br/>
          <Button color="success" onClick={()=>this.showfrenchSchoolList()}>French Schools</Button>
        </Form>
      </div>
    );
  }
}