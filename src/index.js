import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Routes,
  Route } from "react-router-dom";
import './index.css';
import MainPage from './components/main/MainPage';
import Login from './components/login/Login';




ReactDOM.render(
  
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route
        path="*"
        element={
          <main style={{ paddingTop: "15rem", paddingBottom: "10rem" }}>
            <h2 style = {{textAlign: "center"}}> 
              Tu nic nie ma!
            </h2>
          </main>
        }
      />
      </Routes>
    </BrowserRouter>,
  document.getElementById('root')
);


