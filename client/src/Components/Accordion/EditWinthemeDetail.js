import React, { Component } from 'react';
import axios from 'axios';
import WinthemeDetailService from './WinthemeDetailService';


class EditWinthemeDetail extends Component {

    constructor(props) {
        super(props);
        this.addWinthemeDetailService = new WinthemeDetailService();
        this.state = {
            value: ''
        }
    }

    componentDidMount = () => {
        axios.get('http://https://expcalc-dev.herokuapp.com/winthemedetails/edit/'+this.props.match.params.id)
        .then((response) => {
            this.setState({
                value: response.data
            })
        })
        .catch((error) => {
            console.log(error);
        })
    }

    handleChange = (event) => {
        this.setState({
            value: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.addWinthemeDetailService.updateDate([{"email":"manoj@gmail.com","winthemedetail":"Leadership-Visibility"}], this.props.match.params.id);
        this.props.history.push('/index');
    }

    render() {
        return(
            <div className="container">
                <form onSubmit={this.handleSubmit}>
                    <label>
                        email:
                        <input
                            type="text"
                            id="email"
                            value={this.state.value.email}
                            onChange={this.handleChange}
                            className="form-control"
                        />
                    </label>
                    <br />
                    <label>
                         WinthemeDetail:
                        <input
                            type="text"
                            id="winthemedetail"
                            value={this.state.value.WinthemeDetail}
                            onChange={this.handleChange}
                            className="form-control"
                        />
                    </label>
                    <br />
                    <input
                        type="submit"
                        value="Update"
                        className="btn btn-primary"
                    />
                </form>
            </div>
        );
    }
}

export default EditWinthemeDetail;
