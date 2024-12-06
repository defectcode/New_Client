import axios from 'axios';

const API = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL, // Setează adresa backend-ului
    withCredentials: true, // Include cookie-urile în cereri
});

export default API;
