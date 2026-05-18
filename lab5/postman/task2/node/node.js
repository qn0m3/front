const axios = require('axios');

axios.get('https://vk.com')
    .then(response => {
        console.log('Node.js: статус', response.status);
    })
    .catch(error => {
        console.error('Node.js: ошибка', error.message);
    });