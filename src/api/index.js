import axios from "axios";

const API = axios.create({
    baseURL: 'https://apirs.chairuldev.my.id/api/'
})

export default API
