import axios from "axios";
import { getEnvVariables } from '../helpers/getEnvVariables'

const { VITE_API_URL } = getEnvVariables();

const authApi = axios.create({
    baseURL: VITE_API_URL
});

//TODO: CONFIGURAR INTERCEPTORES
authApi.interceptors.request.use(
    (config) => {
        config.headers = {
            ...config.headers,
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return config
    }
)

export default authApi;
