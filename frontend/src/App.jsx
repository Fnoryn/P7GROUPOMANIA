// import { Route, } from 'react-router-dom';
// import Home from './pages/Home';
// import PostAdd from './pages/PostAdd';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Navbar from './components/Navbar';
// import Publication from './pages/Publication';
// import Login from './pages/Login';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import {UidContext } from "./components/AppContext";
import Routes from "./components/Routes";
import { useDispatch } from 'react-redux';
import { getUser } from './actions/user.actions';


const App = () =>{
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();


  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials: true,
      })
        .then((res) => {
          setUid(res.data);
        })
        .catch((err) => console.log("No token"));
    };
    fetchToken();
    if (uid) dispatch(getUser(uid))
  }, [uid]);

  return(
    <UidContext.Provider value={uid}>
      <Routes/>
    </UidContext.Provider>
  )

}

// function App() {

//   return (
//     <>
//     <Routes>
//       <Route path='/' element={<Login />} /> 
//     </Routes>
//     <Navbar />
//     <Routes>
//       <Route path="/home" element={<Home />} />
//       <Route path="/add" element={<PostAdd />} />
//       <Route path="/list" element={<Publication/>} />
//     </Routes>
//     </>

//   );
// }

export default App;