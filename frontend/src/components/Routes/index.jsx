import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch, Routes } from 'react-router-dom';
import Home from '../../pages/Home';
import Login from '../../pages/Login';
import PostAdd from '../Post/PostAdd';


const index = () => {
  return (
    <div>
      <Routes>
      <Route path='/' element={<Login/>} />
        <Route path="/home" element={<Home />} />
        <Route path='/add' element={<PostAdd />} />
      </Routes>
    </div>
  );
};

export default index;