import { useDispatch, useSelector } from 'react-redux'
import { AuthApi } from '../apis'
import { onChecking, onLogin, onLogout } from '../store'
import { toast } from 'react-toastify'



export const useAuthStore = () => {

    const dispatch = useDispatch()
    const { status, userInformation } = useSelector(state => state.auth)

    const startLogin = async ({ username, password }) => {

        dispatch(onChecking())
        try {
            const { data } = await AuthApi.post('/usuario/login/', { username, password })
            localStorage.setItem('token', data.access)
            localStorage.setItem('refresh', data.refresh)
            dispatch(onLogin({ username: data.username, rol: data.role, id: data.id, cliente_id: data.cliente_id }))
        } catch (error) {
            localStorage.clear()
            dispatch(onLogout())

        }
    }

    const checkToken = async () => {
        const token = localStorage.getItem('token')
        if (!token) return dispatch(onLogout())

        try {
            const { data } = await AuthApi.post('/usuario/refresh/', { refresh: localStorage.getItem('refresh') })
            localStorage.setItem('token', data.access)
            localStorage.setItem('refresh', data.refresh)
            dispatch(onLogin({ username: data.username, rol: data.role, id: data.id, cliente_id: data.cliente_id }))
        } catch (error) {
            localStorage.clear()
            dispatch( onLogout())
        }
    }

    const startLogout = () => {
        localStorage.clear()
        dispatch(onLogout())
    }

    return {
        //*Properties
        status,
        userInformation,

        //*Methods
        startLogin,
        checkToken,
        startLogout
    }
}