import axios from "axios"

const REST_API_BASE_URL = 'http://localhost:8080/api/admin/users';

export const ListUsers = () => axios.get(REST_API_BASE_URL);

export const createUser = (user) => axios.post(REST_API_BASE_URL);