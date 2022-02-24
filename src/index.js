import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Routes,
  Route } from "react-router-dom";
import './index.css';
import MainPage from './components/main/MainPage';
import Login from './components/login/Login';
import Logout from './components/login/Logout';



ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);


