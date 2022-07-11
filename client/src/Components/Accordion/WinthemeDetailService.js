import axios from 'axios';

class WinthemeDetailService {

    sendData(data) {
        axios.post('https://expcalc-dev.herokuapp.com:4200/winthemedetails/add/post', data)
        .then((response) => {
            this.setState({
                winthemedetails: response.data
            })
        })
        .catch((error) => {
            console.log(error);
        });
    }

    updateDate(data, id) {
        axios.post('https://expcalc-dev.herokuapp.com:4200/winthemedetails/update/'+id, data)
        .then((response) => {
            this.asetState({
                winthemedetails: response.data
            })
        })
        .catch((error) => {
            console.log(error)
        })
    }

    deleteData(id) {
        axios.get('https://expcalc-dev.herokuapp.com:4200/winthemedetails/delete/'+id)
        .then(() => {
            console.log('Deleted')
        })
        .catch((error) => {
            console.log(error)
        })
    }
}

export default WinthemeDetailService;
