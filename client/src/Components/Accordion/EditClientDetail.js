import React, { Component } from 'react';
import axios from 'axios';
import ClientDetailService from './ClientDetailService';


class EditClientDetail extends Component {

    constructor(props) {
        super(props);
        this.addClientDetailService = new ClientDetailService();
        this.state = {
            value: ''
        }
    }

    componentDidMount = () => {
        axios.get('http://https://expcalc-dev.herokuapp.com/clientdetails/edit/'+this.props.match.params.id)
        .then((response) => {
            this.setState({
                value: response.data
            })
        })
        .catch((error) => {
            console.log(error);
        })

        axios.get('http://https://expcalc-dev.herokuapp.com/contracttypelists/')
        .then((response) => {
            // this.setState({
            //     contracttypelists: response.data
            // });
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
        })


        axios.get('http://https://expcalc-dev.herokuapp.com/industrytypes/')
        .then((response) => {
            // this.setState({
            //     industrytypes: response.data
            // });
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }


    

    handleChange = (event) => {
        // this.setState({
        //     value: event.target.value
        // });
    }

    handleSubmit = (event) => {
        let data = {"email":"manoj@gmail.com",
        "ClientName":"manoj1",
        "LifeWorks":true,
        "ContractType":"dafk",
        "AnticipatedRevenue":"345",
        "Population":"4553",
        "industry_Type":"sdfdssd"
};
        event.preventDefault();
        this.addClientDetailService.updateDate(data, this.props.match.params.id);
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
                            value={this.state.value}
                            onChange={this.handleChange}
                            className="form-control"
                            
                        />
                       
                    </label>
                    <br />
                    <label>
                        Client Name:
                        <input
                            type="text"
                            id="ClientName"
                            value={this.state.value}
                            onChange={this.handleChange}
                            className="form-control"
                        />
                       
                    </label>
                    <br />
                    <label>
                    LifeWorks:
                        <input
                            type="checkbox"
                            id="LifeWorks"
                            value={this.state.value}
                            onChange={this.handleChange}
                            className="form-control"
                        />
                       
                    </label>
                    <br />
                    <label>
                        Contract Type:
                        <input
                            type="text"
                            id="ContractType"
                            value={this.state.value}
                            onChange={this.handleChange}
                            className="form-control"
                        />
                       
                    </label>
                    <br />
                    <label>
                    Anticipated Revenue:
                        <input
                            type="text"
                            id ="AnticipatedRevenue"
                            value={this.state.value}
                            onChange={this.handleChange}
                            className="form-control"
                        />
                       
                    </label>
                    <br />
                    <label>
                    Population:
                        <input
                            type="text"
                            id="Population"
                            value={this.state.value}
                            onChange={this.handleChange}
                            className="form-control"
                        />
                       
                    </label>
                    <br />
                    <label>
                    industry Type:
                        <input
                            type="text"
                            id="industry_Type"
                            value={this.state.value}
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

export default EditClientDetail;
