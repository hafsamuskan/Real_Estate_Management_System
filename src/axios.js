import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8080/api/admin', // Adjust the base URL as needed
});

export default instance;
