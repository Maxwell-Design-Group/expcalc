import React, { Component } from 'react';
import ClientDetailService from './ClientDetailService';
import axios from 'axios';
import TableRow from './TableRow';


class IndexClientDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            clientdetails: ''
        }
    }

    componentDidMount = () => {
        axios.get('https://expcalc-dev.herokuapp.com:4200/clientdetails')
        .then((response) => {
            this.setState({
                clientdetails: response.data
            });
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    tabRow = () => {
        if(this.state.clientdetails instanceof Array) {
            return this.state.clientdetails.map((object, i) => {
                return <TableRow obj={object} key={i} />
            })
        }
    }

    render() {
        return (
            <div className="container">
                <h1 className='text-center'>MERN CRUD APPLICATION</h1>
                <br />
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <td>ClientDetail Id</td>
                            <td>email</td>
                            <td>Client Name</td>
                            <td>LifeWorks</td>
                            <td>Contract Type</td>
                            <td>Anticipated Revenue</td>
                            <td>Population</td>
                            <td>industry Type</td>                            
                        </tr>
                    </thead>
                    <tbody>
                        {this.tabRow()}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default IndexClientDetail;
