import axios from "axios";

const API = axios.create({
    baseURL: 'https://wallet-api.chairuldev.my.id/api/'
})

export default API
