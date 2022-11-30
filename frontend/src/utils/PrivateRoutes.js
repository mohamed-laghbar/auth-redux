import { Outlet, Navigate } from 'react-router-dom'
import Cookie from 'js-cookie'



const PrivateRoutes = () => {

  
    const token =  Cookie.get('token')
          
    console.log(token) 

    return(
        token ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoutes