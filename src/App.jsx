import React from 'react'
import './index.css'
import MiddleZone from './component/MiddleZone'
import Upperzone from './component/upperzone'
import Lowerzone from './component/lowerzone'
import QRPage from './pages/qr'
// import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HowItWorksAccordion from './component/HowItWorksAccordion'

const App = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-gradient-to-b to-gray-100 from-blue-300">
      <Upperzone />
      <MiddleZone />
      <Lowerzone />
    </div>
  )
}

export default App
