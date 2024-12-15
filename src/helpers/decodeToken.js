import { jwtDecode } from 'jwt-decode'


const token = localStorage.getItem('token');

export const decodeToken = () => {
    if (token) {
        const decodedToken = jwtDecode(token);
        return decodedToken;
    }
    return null;
}