import axios from 'axios';

axios.get('https://vk.com')
    .then(response => {
        console.log('Браузер: статус', response.status);
        console.log('Заголовки:', response.headers);
    })
    .catch(error => {
        console.error('Браузер: ошибка', error.message);
    });