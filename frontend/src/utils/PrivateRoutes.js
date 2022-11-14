import { Outlet, Navigate } from 'react-router-dom'
import Cookie from 'js-cookie'

const token =  Cookie.get('token');
const PrivateRoutes = () => {
    return(
        token ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoutes