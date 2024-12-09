import axios from 'axios';

const API_URL = "https://blog-app-backend-apis.vercel.app"
// const API_URL = "http://localhost:5001"

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true, 
});

export default api;
