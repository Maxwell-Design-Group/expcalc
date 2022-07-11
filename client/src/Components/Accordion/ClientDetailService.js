import axios from 'axios';

class ClientDetailService {

    sendData(data) {
        axios.post('https://expcalc-dev.herokuapp.com:4200/clientdetails/add/post', data)
        .then((response) => {
            this.setState({
                clientdetails: response.data
            })
        })
        .catch((error) => {
            console.log(error);
        });
    }

    updateDate(data, id) {
        axios.post('https://expcalc-dev.herokuapp.com:4200/clientdetails/update/'+id, data)
        .then((response) => {
            this.asetState({
                clientdetails: response.data
            })
        })
        .catch((error) => {
            console.log(error)
        })
    }

    deleteData(id) {
        axios.get('https://expcalc-dev.herokuapp.com:4200/clientdetails/delete/'+id)
        .then(() => {
            console.log('Deleted')
        })
        .catch((error) => {
            console.log(error)
        })
    }
}

export default ClientDetailService;
