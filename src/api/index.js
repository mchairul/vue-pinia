import axios from "axios";

const API = axios.create({
    baseURL: 'https://tristar-booking.chairuldev.my.id/api/'
})

export default API
