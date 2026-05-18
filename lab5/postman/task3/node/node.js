const axios = require('axios');

axios.get('https://json.geoiplookup.io/')
    .then(response => {
        console.log('Node.js: статус', response.status);
        console.log('Данные:', response.data);
    })
    .catch(console.error);