import axios from "axios";


const baseUrl = axios.create({
    baseUrl : 'https://password-manager-backend-mut7.onrender.com'
})

export default baseUrl