import React, { Component } from 'react';
import WinthemeDetailService from './WinthemeDetailService';
import axios from 'axios';
import TableRow from './TableRow';


class IndexWinthemeDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            winthemedetails: ''
        }
    }

    componentDidMount = () => {
        axios.get('http://localhost:4200/winthemedetails')
        .then((response) => {
            this.setState({
                winthemedetails: response.data
            });
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    tabRow = () => {
        if(this.state.winthemedetails instanceof Array) {
            return this.state.winthemedetails.map((object, i) => {
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
                            <td>WinthemeDetail Id</td>
                            <td>Email</td>
                            <td>Win theme</td>
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

export default IndexWinthemeDetail;
