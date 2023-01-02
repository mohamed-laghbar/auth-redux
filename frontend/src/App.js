import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from './pages/Home'
import PrivateRoutes from './utils/PrivateRoutes'
import ResetPassword from "./pages/ResetPassword";
import SetNewPassword from "./pages/SetNewPassword";


function App() {
  return (


    <BrowserRouter>
           <Routes>
           {/* Private routes */}
            <Route element={<PrivateRoutes />}>
               <Route path="/home" element={<Home />} exact/>
            </Route>

            {/* Public routes */}
            <Route element={ <Login />} path="/login" exact/>
            <Route element={<Register />} path="/register" exact/>
            <Route element={<SetNewPassword />} path="/setnewpassword/:token" exact/>
            <Route element={<ResetPassword />} path="/resetpassword" exact/>
          </Routes>
    </BrowserRouter>


       


 );
}

export default App;
