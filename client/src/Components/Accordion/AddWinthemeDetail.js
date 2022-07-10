import React, { Component } from 'react';
import WinthemeDetailService from './WinthemeDetailService';
import axios from 'axios';

class AddWinthemeDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        }
        this.addWinthemeDetailService = new WinthemeDetailService();
    }

    componentDidMount = () => {
        // axios.get('http://https://expcalc-dev.herokuapp.com/winthemes')
        // .then((response) => {
        //     // this.setState({
        //     //     winthemes: response.data
        //     // });
        //     console.log(response.data);
        // })
        // .catch((error) => {
        //     console.log(error);
        // })
    }

    handleChange = (event) => {
        // this.setState({
        //     value: event.target.value
        // })
    }

    handleSubmit = (event) => {
        //alert(this.state.value);
        event.preventDefault();
        this.addWinthemeDetailService.sendData({"email":"manoj@gmail.com","winthemedetail":"Operational-Results"});
        this.props.history.push('/');
    }

    render() {
        return(
            <div className="container">
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Add email:
                        <input
                            type="text"
                            id ="email"
                            value={this.state.value}
                            onChange={this.handleChange}
                            className="form-control"
                        />
                        </label>
                        <br />
                        <label>
                        Add WinthemeDetail:
                        <input
                            type="text"
                            id ="winthemedetail"
                            value={this.state.value}
                            onChange={this.handleChange}
                            className="form-control"
                        />
                        </label>
                        <br />
                        <input
                            type="submit"
                            value="submit"
                            className="btn btn-primary"
                        />
                    
                </form>
            </div>
        );
    }
}

export default AddWinthemeDetail;
