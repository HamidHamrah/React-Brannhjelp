import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./Pages/Publication/Home"
import Create from './Pages/Publication/Create';
import AllPub from "./Pages/Publication/ListAllpublications"
import './Components/Layout/NavbarStyle.css';
import './Components/Publiation/Search/Search.css';
import "./Components/Publiation/Create/Create.css"
import "./Components/Authentication/Login.css"
import "./Components/Publiation/List-Delet/AllPub.css"
import Login from './Components/Authentication/Login';
import Register from './Components/Authentication/Register';
import Update from "./Pages/Publication/Update"
import React from 'react';
import { AuthProvider } from './AuthContext';


function App() {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path='/create' element={<Create />} />
            <Route path='/All' element={<AllPub />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/update/:id" element={<Update />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;