// api.js
import Axios from "axios";

const api = Axios.create({
    baseURL: 'http://localhost:1337/',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

export default api;