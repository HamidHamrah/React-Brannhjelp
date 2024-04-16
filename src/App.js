import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./Pages/Publication/Home"
import Create from './Pages/Publication/Create';
import AllPub from "./Pages/Publication/ListAllpublications"
import './Components/Layout/NavbarStyle.css';
import './Components/Publiation/Sidebar/Search.css';
import "./Components/Publiation/Create/Create.css"
import "./Components/Publiation/ListDelete/AllPub.css"
import Login from './Authentication/LoginRegister/Login';
import Register from './Authentication/LoginRegister/Register';
import ForgetPassword from './Authentication/ForgetPassword/ForgetPassword';
import ResetPassword from './Authentication/ForgetPassword/ResetPassword';
import Update from "./Pages/Publication/Update"
import React from 'react';
import RequireAuth from "./Authentication/RequireAuth"
import {AuthProvider} from "./Authentication/AuthContext"
import AllUsers from "./Pages/User/AllUsers"
import Read from "../src/Components/Publiation/Read/Read"
import Copyright from "../src/Components/Layout/Footer"
import UpdateUser from "./Pages/User/edit-user"

function App() {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route index element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path='Read/' element={<Read />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/ForgetPassword" element={<ForgetPassword />} />
            <Route path="/ResetPassword" element={<ResetPassword />} />
            <Route path='/edit-user/:id' element={<UpdateUser />} />
            {/* Protected Routes */}
            <Route path='/create' element={<RequireAuth><Create /></RequireAuth>} />
            <Route path='/All' element={<RequireAuth><AllPub /></RequireAuth>} />
            <Route path="/update/:id" element={<RequireAuth><Update /></RequireAuth>} />
            <Route path='/AllUsers' element={<RequireAuth><AllUsers /></RequireAuth>} />


          </Routes>
        </BrowserRouter>
      </AuthProvider>
      <Copyright sx={{ mt: 5 }} />
    </div>
  );
}

export default App;
