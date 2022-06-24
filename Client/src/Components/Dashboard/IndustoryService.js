import axios from 'axios';

class IndustoryService {

    sendData(data) {
        axios.post('http://localhost:4200/Industory/add/post', {
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
        axios.post('http://localhost:4200/Industory/update/'+id, {
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
        axios.get('http://localhost:4200/Industory/delete/'+id)
        .then(() => {
            console.log('Deleted')
        })
        .catch((error) => {
            console.log(error)
        })
    }
}

export default IndustoryService;
