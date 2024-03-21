import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./Pages/Publication/Home"
import Create from './Pages/Publication/Create';
import AllPub from "./Pages/Publication/ListAllpublications"
import './Components/Layout/NavbarStyle.css';
import './Components/Publiation/Search/Search.css';
import "./Components/Publiation/Create/Create.css"
import "./Components/Publiation/List-Delet/AllPub.css"
import Login from './Components/Authentication/Auth/Login and Register/Login';
import Register from './Components/Authentication/Auth/Login and Register/Register';
import Update from "./Pages/Publication/Update"
import React from 'react';
import RequireAuth from "./Components/Authentication/Auth/RequireAuth"
import {AuthProvider} from "./Components/Authentication/Auth/AuthContext"
import { useAuth } from './Components/Authentication/Auth/AuthContext';


function App() {
  const { user } = useAuth();
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route index element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />

            {/* Protected Routes */}
            <Route path='/create' element={<RequireAuth><Create /></RequireAuth>} />
            <Route path='/All' element={<RequireAuth><AllPub /></RequireAuth>} />
            <Route path="/update/:id" element={<RequireAuth><Update /></RequireAuth>} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
