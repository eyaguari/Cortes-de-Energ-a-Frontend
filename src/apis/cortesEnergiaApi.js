import axios from "axios";
import { getEnvVariables } from '../helpers/getEnvVariables'

const { VITE_API_URL } = getEnvVariables();

const cortesEnergiaApi = axios.create({
    baseURL: VITE_API_URL
});

//TODO: CONFIGURAR INTERCEPTORES


//* Interceptor para agregar el token a las peticiones
cortesEnergiaApi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers = {
                ...config.headers,
                Authorization: `Bearer ${token}`
            }
        }
        return config
    }, (error) => {
        return Promise.reject(error)
    }
)


export default cortesEnergiaApi;
