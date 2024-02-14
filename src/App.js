import './App.css';
import "./Components/Navbar/NavbarStyle.css";
import './Components/ListAllPublications/Style.css'
import Navbar from "./Components/Navbar/Navbar"
import Publications from './Components/ListAllPublications/ListPublications'
function App() {
  return (
    <div>
      <Navbar />
      <Publications /> {/* Render the Publications component here */}
    </div>
  );
}

export default App;
