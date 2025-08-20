import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import QRPage from './pages/qr';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/qr" element={<QRPage />} />
        <Route path="/Dashboard" element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
