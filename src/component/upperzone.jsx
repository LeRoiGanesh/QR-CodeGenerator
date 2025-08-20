import React from 'react';
import { MdQrCodeScanner } from 'react-icons/md';

const Upperzone = () => {
  return (
    <header className="w-full flex flex-col items-center justify-center py-7 bg-gradient-to-b from-indigo-900/95 to-blue-800/80 shadow-2xl rounded-b-3xl mb-2 animate-fade-in">
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-3 bg-white/70 px-6 py-4 rounded-2xl shadow-xl border border-indigo-100 backdrop-blur-md animate-slide-down">
          <MdQrCodeScanner size={42} className="text-indigo-700 animate-bounce-slow" />
          <span className="text-3xl font-extrabold tracking-tight text-indigo-900 font-sans drop-shadow">QR Code Pro</span>
        </div>
        <p className="text-xs sm:text-sm text-indigo-100 font-medium mt-3 text-center max-w-xs animate-fade-in">
          <span className="text-indigo-200 font-bold">La solution QR code la plus avancée et sécurisée.</span><br/>
          <span className="text-indigo-300">Générez, personnalisez, protégez et partagez vos QR codes multi-liens en toute simplicité.</span>
        </p>
      </div>
    </header>
  );
};

export default Upperzone;
