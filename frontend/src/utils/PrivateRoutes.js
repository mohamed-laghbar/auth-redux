import { Outlet, Navigate } from "react-router-dom";
import Cookie from "js-cookie";

const PrivateRoutes = () => {
  const token = Cookie.get("token");

  return token ? <Outlet /> : <Navigate to="/login" /> ;
};

export const PublicRoutes = ()=>{
  const token = Cookie.get("token");

  return token ? <Navigate to="/home" /> : <Navigate to="/login" /> ;
}

export default PrivateRoutes ;
