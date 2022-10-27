import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch, Routes } from 'react-router-dom';
import Home from '../../pages/Home';
import Navbar from '../Navbar';
import Login from '../../pages/Login';
import PostAdd from '../../pages/PostAdd';
import Publication from '../../pages/Publication';

const index = () => {
  return (
    <div>
      <Routes>
      <Route path='/login' element={<Login/>} />
      </Routes>
        <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path='/add' element={<PostAdd />} />
        <Route path='/list' element={< Publication />} />
      </Routes>
    </div>
  );
};

export default index;