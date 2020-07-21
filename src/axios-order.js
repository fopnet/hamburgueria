import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://hamburgueria-75c22.firebaseio.com/',
});

export default instance;
