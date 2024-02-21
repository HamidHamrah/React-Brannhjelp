import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from "./Pages/Home"
import Create from './Pages/Create';
import AllPub from "./Pages/ListAllpublications"
import './Components/Navbar/NavbarStyle.css';
import './Components/ListAllPublications/Search.css';
import "./Components/Create/Create.css"
import "./Components/Authentication/Login.css"
import "./Components/ListAllPublications/AllPub.css"
import Login from './Components/Authentication/Login';
import Register from './Components/Authentication/Register';

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
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
