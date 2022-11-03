import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch, Routes } from 'react-router-dom';
import Home from '../../pages/Home';
import Login from '../../pages/Login';


const index = () => {
  return (
    <div>
      <Routes>
      <Route path='/' element={<Login/>} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
};

export default index;