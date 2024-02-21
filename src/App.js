import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from "./Pages/Home"
import Create from './Pages/Create';
import AllPub from "./Pages/ListAllpublications"
import './Components/Navbar/NavbarStyle.css';
import './Components/Actions/Search/Search.css';
import "./Components/Actions/Create/Create.css"
import "./Components/Authentication/Login.css"
import "./Components/Actions/List/AllPub.css"
import Login from './Components/Authentication/Login';
import Register from './Components/Authentication/Register';
import Update from "./Components/Actions/Update/Update"


function App() {
  return (
    <div>
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path='/create' element={<Create />} />
            <Route path='/All' element={<AllPub />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Update" element={<Update />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;