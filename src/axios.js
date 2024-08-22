import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8080/api/admin', 
});

export default instance;
