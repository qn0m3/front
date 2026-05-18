import axios from 'axios';

axios.get('https://json.geoiplookup.io/')
    .then(response => {
        console.log('Браузер: статус', response.status);
        console.log('Данные:', response.data);
    })
    .catch(error => {
        console.error('Браузер: ошибка', error);
    });