import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./Pages/Publication/Home.tsx"
import Create from './Pages/Publication/Create.tsx';
import AllPub from "./Pages/Publication/ListAllpublications.tsx"
import './Components/Layout/NavbarStyle.css';
import './Components/Publication/Sidebar/Search.css';
import "./Components/Publication/Create/Create.css"
import "./Components/Publication/ListDelete/AllPub.css"
import Login from './Authentication/LoginRegister/Login.tsx';
import Register from './Authentication/LoginRegister/Register.tsx';
import ForgetPassword from './Authentication/ForgetPassword/ForgetPassword.tsx';
import ResetPassword from './Authentication/ForgetPassword/ResetPassword.tsx';
import Update from "./Pages/Publication/Update.tsx"
import React from 'react';
import RequireAuth from "./Authentication/RequireAuth.jsx"
import {AuthProvider} from "./Authentication/AuthContext.jsx"
import AllUsers from "./Pages/User/AllUsers.tsx"
import Read from "../src/Components/Publication/Read/Read.tsx"
import Copyright from "../src/Components/Layout/Footer.tsx"
import UpdateUser from "./Pages/User/edit-user.tsx"

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
