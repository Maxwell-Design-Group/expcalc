import axios from 'axios';

class WinthemeDetailService {

    sendData(data) {
        axios.post('http://https://expcalc-dev.herokuapp.com/winthemedetails/add/post', data)
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
        axios.post('http://https://expcalc-dev.herokuapp.com/winthemedetails/update/'+id, data)
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
        axios.get('http://https://expcalc-dev.herokuapp.com/winthemedetails/delete/'+id)
        .then(() => {
            console.log('Deleted')
        })
        .catch((error) => {
            console.log(error)
        })
    }
}

export default WinthemeDetailService;
