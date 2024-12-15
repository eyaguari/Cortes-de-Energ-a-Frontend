import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export const ProtectedRoute = ({ element, allowedRoles }) => {
    
    const { userInformation } = useSelector(state => state.auth)
    const { rol } = userInformation

    if (!rol) {
        return <Navigate to="/auth/login" />
    }
    
    if (!allowedRoles.includes(rol)) {
        return <Navigate to="/" />
    }
    
    return element;
}

   