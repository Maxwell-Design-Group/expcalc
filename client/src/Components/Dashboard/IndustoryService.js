import axios from 'axios';

class IndustoryService {

    sendData(data) {
        axios.post('https://expcalc-dev.herokuapp.com/Industory/add/post', {
            Industory: data
        })
        .then((response) => {
            this.setState({
                Industory: response.data
            })
        })
        .catch((error) => {
            console.log(error);
        });
    }

    updateDate(data, id) {
        axios.post('https://expcalc-dev.herokuapp.com/Industory/update/'+id, {
            Industory: data
        })
        .then((response) => {
            this.asetState({
                Industory: response.data
            })
        })
        .catch((error) => {
            console.log(error)
        })
    }

    deleteData(id) {
        axios.get('https://expcalc-dev.herokuapp.com/Industory/delete/'+id)
        .then(() => {
            console.log('Deleted')
        })
        .catch((error) => {
            console.log(error)
        })
    }
}

export default IndustoryService;
