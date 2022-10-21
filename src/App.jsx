import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PostAdd from './pages/PostAdd';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import Publication from './pages/Publication';
import Login from './pages/Login';

function App() {
  return (
    <>
   
    <Routes>
      <Route path='/' element={<Login />} /> 
    </Routes> 
    <Navbar />
    <Routes>
         
      <Route path="/home" element={<Home />} />
      <Route path="/add" element={<PostAdd />} />
      <Route path="/list" element={<Publication/>} />
    </Routes>
    </>

  );
}

export default App;