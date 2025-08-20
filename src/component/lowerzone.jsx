import React from 'react';
import { FaTwitter, FaFacebookF, FaInstagram } from 'react-icons/fa';

const Lowerzone = () => {
  return (
    <footer className="w-full bg-gradient-to-t from-indigo-900 to-blue-900 text-indigo-100 py-7 px-2 rounded-t-3xl shadow-2xl mt-8 flex flex-col items-center text-xs animate-fade-in">
      <div className="flex flex-col items-center gap-1 mb-2">
        <span className="font-extrabold tracking-wide text-indigo-200 text-lg drop-shadow">QR Code Pro</span>
        <span className="text-[10px] text-indigo-300">© 2025 WGM Tech. Tous droits réservés.</span>
        <span className="text-[10px] text-indigo-300">La solution QR code la plus avancée et sécurisée.</span>
      </div>
      <div className="flex gap-5 mt-2">
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition transform hover:scale-110"><FaTwitter size={20} className="animate-bounce-slow" /></a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 transition transform hover:scale-110"><FaFacebookF size={20} className="animate-bounce-slow" /></a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-300 transition transform hover:scale-110"><FaInstagram size={20} className="animate-bounce-slow" /></a>
      </div>
      <div className="mt-3 text-[10px] text-indigo-200 text-center">Design & code par <span className="font-bold text-indigo-100">WGM Tech</span></div>
    </footer>
  );
};

export default Lowerzone;
