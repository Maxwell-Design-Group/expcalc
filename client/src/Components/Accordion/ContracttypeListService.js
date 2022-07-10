import axios from 'axios';

class ContracttypeListService {

    sendData(data) {
        axios.post('http://https://expcalc-dev.herokuapp.com/contracttypelists/add/post', {
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
        axios.post('http://https://expcalc-dev.herokuapp.com/contracttypelists/update/'+id, {
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
        axios.get('http://https://expcalc-dev.herokuapp.com/contracttypelists/delete/'+id)
        .then(() => {
            console.log('Deleted')
        })
        .catch((error) => {
            console.log(error)
        })
    }
}

export default ContracttypeListService;
