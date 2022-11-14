import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from './pages/Home'
import PrivateRoutes from './utils/PrivateRoutes'



function App() {
  return (


    <BrowserRouter>
           <Routes>
            <Route element={<PrivateRoutes />}>
               <Route path="/home" element={<Home />} exact/>
            </Route>
            <Route element={ <Login />} path="/login" exact/>
            <Route element={<Register />} path="/register" exact/>
          </Routes>
    </BrowserRouter>


       


 );
}

export default App;
