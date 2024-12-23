import axios from 'axios';

const API = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://vellov.com/api',
    withCredentials: true, 
});

export default API;
