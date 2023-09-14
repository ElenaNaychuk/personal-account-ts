import React from 'react';
import { Routes, Route } from "react-router-dom";
import {LoginPage} from "./pages/LoginPage";
import {ContactPage} from "./pages/ContactPage";
import {ErrorPage} from "./pages/ErrorPage";
import {HomePage} from "./pages/HomePage";
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/contacts" element={<ContactPage />} />
        <Route path="/*" element={<ErrorPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
