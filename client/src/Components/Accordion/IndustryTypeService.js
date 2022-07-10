import axios from 'axios';

class IndustryTypeService {

    sendData(data) {
        axios.post('http://https://expcalc-dev.herokuapp.com/industrytypes/add/post', {
            industrytype: data
        })
        .then((response) => {
            this.setState({
                industrytypes: response.data
            })
        })
        .catch((error) => {
            console.log(error);
        });
    }

    updateDate(data, id) {
        axios.post('http://https://expcalc-dev.herokuapp.com/industrytypes/update/'+id, {
            industrytype: data
        })
        .then((response) => {
            this.asetState({
                industrytypes: response.data
            })
        })
        .catch((error) => {
            console.log(error)
        })
    }

    deleteData(id) {
        axios.get('http://https://expcalc-dev.herokuapp.com/industrytypes/delete/'+id)
        .then(() => {
            console.log('Deleted')
        })
        .catch((error) => {
            console.log(error)
        })
    }
}

export default IndustryTypeService;
