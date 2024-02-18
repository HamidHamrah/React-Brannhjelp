import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from "./Pages/Home"
import Create from './Pages/Create';
import AllPub from "./Pages/ListAllpublications"
import './Components/Navbar/NavbarStyle.css';
import './Components/ListAllPublications/Style.css';
import "./Components/Create/Create.css"

function App() {
  return (
    <div>
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path='/create' element={<Create />} />
            <Route path='/All' element={<AllPub />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
