import React, {Component} from 'react';

export default class SearchBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchSchool: "",
            placeHolder:"Search your school..."
        }
    }

    render() {
        return(
            <div>
                <input onKeyUp={this.handleChange.bind(this)} type="text" placeholder={this.state.placeHolder}/>
                <span>
                    <button onClick={this.handleClick.bind(this)}>Go</button>
                </span>
            </div>
        )
    }

    handleChange(event) {
        this.setState({searchSchool: event.target.value});
    }

    handleClick(event) {
        this.props.callback(this.state.searchSchool)
    }
}