import React, { Component } from 'react';
import ClientDetailService from './ClientDetailService';
import axios from 'axios';

class AddClientDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            ClientName: '',
            LifeWorks: false,
            ContractType: '',
            AnticipatedRevenue: 0,
            Population: 0,
            industry_Type: '',
            
        }
        this.addClientDetailService = new ClientDetailService();
    }

    componentDidMount = () => {
        axios.get('http://https://expcalc-dev.herokuapp.com/contracttypelists')
        .then((response) => {
            // this.setState({
            //     contracttypelists: response.data
            // });
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
        });


        axios.get('http://https://expcalc-dev.herokuapp.com/industrytypes')
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
        // })
    }

    handleSubmit = (event) => {

        // this.setState({
        //     email: (document.getElementById("email")).value,
        //     ClientName: (document.getElementById("ClientName")).value,
        //     LifeWorks: (document.getElementById("LifeWorks")).value,
        //     ContractType: (document.getElementById("ContractType")).value,
        //     AnticipatedRevenue: parseFloat((document.getElementById("AnticipatedRevenue")).value),
        //     Population: parseFloat((document.getElementById("Population")).value),
        //     industry_Type: (document.getElementById("industry_Type").value),
        // })

                
        event.preventDefault();
        this.addClientDetailService.sendData({"email":"manoj@gmail.com",
                                                "ClientName":"manoj",
                                                "LifeWorks":true,
                                                "ContractType":"dafk",
                                                "AnticipatedRevenue":"345",
                                                "Population":"4553",
                                                "industry_Type":"sdfdssd"
    });
    // this.addClientDetailService.sendData({"email":(document.getElementById("email")).value,
    //                                             "ClientName":(document.getElementById("ClientName")).value,
    //                                             "LifeWorks":(document.getElementById("LifeWorks")).value,
    //                                             "ContractType":(document.getElementById("ContractType")).value,
    //                                             "AnticipatedRevenue":parseFloat((document.getElementById("AnticipatedRevenue")).value),
    //                                             "Population":parseFloat((document.getElementById("Population")).value),
    //                                             "industry_Type":(document.getElementById("industry_Type").value)
    // });
        this.props.history.push('/');
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
                            value="submit"
                            className="btn btn-primary"
                        />
                </form>
            </div>
        );
    }
}

export default AddClientDetail;
