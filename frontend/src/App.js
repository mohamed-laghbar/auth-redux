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
               <Route path="" element={<Login />} />
               <Route path="home" element={<Home />} />
            </Route>
            <Route element={<Login/>} path="/login"/>
          </Routes>
    </BrowserRouter>


       


 );
}

export default App;
