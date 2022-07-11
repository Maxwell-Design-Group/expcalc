import axios from 'axios';

class ClientDetailService {

    sendData(data) {
        axios.post('https://expcalc-dev.herokuapp.com:4200/ClientDetail/add/post', {
            item: data
        })
        .then((response) => {
            this.setState({
                items: response.data
            })
        })
        .catch((error) => {
            console.log(error);
        });
    }

    updateDate(data, id) {
        axios.post('https://expcalc-dev.herokuapp.com:4200/ClientDetail/update/'+id, {
            ClientDetail: data
        })
        .then((response) => {
            this.asetState({
                ClientDetail: response.data
            })
        })
        .catch((error) => {
            console.log(error)
        })
    }

    deleteData(id) {
        axios.get('https://expcalc-dev.herokuapp.com:4200/ClientDetail/delete/'+id)
        .then(() => {
            console.log('Deleted')
        })
        .catch((error) => {
            console.log(error)
        })
    }
}

export default ClientDetailService;
