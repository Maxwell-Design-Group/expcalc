import axios from 'axios';

class ContracttypeListService {

    sendData(data) {
        axios.post('https://expcalc-dev.herokuapp.com:4200/contracttypelists/add/post', {
            contracttypelist: data
        })
        .then((response) => {
            this.setState({
                contracttypelists: response.data
            })
        })
        .catch((error) => {
            console.log(error);
        });
    }

    updateDate(data, id) {
        axios.post('https://expcalc-dev.herokuapp.com:4200/contracttypelists/update/'+id, {
            contracttypelist: data
        })
        .then((response) => {
            this.asetState({
                contracttypelists: response.data
            })
        })
        .catch((error) => {
            console.log(error)
        })
    }

    deleteData(id) {
        axios.get('https://expcalc-dev.herokuapp.com:4200/contracttypelists/delete/'+id)
        .then(() => {
            console.log('Deleted')
        })
        .catch((error) => {
            console.log(error)
        })
    }
}

export default ContracttypeListService;
