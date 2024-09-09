import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL
})

api.interceptors.request.use((config) => {

    const token = localStorage.getItem('token');

    if(!token) return config;

    config.headers.Authorization = `Bearer ${token}`;
    config.headers['Content-Type'] = 'application/json';

    return config;
});

export { api };