import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-indigo-400 via-white to-emerald-300 relative overflow-hidden animate-fade-in">
      <div className="absolute inset-0 pointer-events-none z-0">
        <svg width="100%" height="100%" viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute top-0 left-0 w-full h-full">
          <circle cx="1200" cy="200" r="300" fill="#6366f1" fillOpacity="0.12" />
          <circle cx="300" cy="700" r="200" fill="#10b981" fillOpacity="0.10" />
        </svg>
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center gap-8 p-8 animate-slide-up">
        <h1 className="text-4xl md:text-6xl font-extrabold text-indigo-900 drop-shadow mb-2 text-center">QR Code Generator Pro</h1>
        <p className="text-lg md:text-2xl text-gray-700 font-medium text-center max-w-2xl mb-4">Créez des QR codes sécurisés, personnalisés, avec logo ou texte au centre, historique, et protection par mot de passe. Interface ultra-moderne, rapide et intuitive.</p>
        <ul className="flex flex-col md:flex-row gap-4 md:gap-8 items-center justify-center mb-6">
          <li className="bg-white/80 rounded-xl shadow-lg px-6 py-4 border border-indigo-100 text-indigo-900 font-semibold text-base flex items-center gap-2"><span className="text-2xl">🔒</span> Protection par mot de passe</li>
          <li className="bg-white/80 rounded-xl shadow-lg px-6 py-4 border border-emerald-100 text-emerald-900 font-semibold text-base flex items-center gap-2"><span className="text-2xl">🎨</span> Personnalisation avancée</li>
          <li className="bg-white/80 rounded-xl shadow-lg px-6 py-4 border border-indigo-100 text-indigo-900 font-semibold text-base flex items-center gap-2"><span className="text-2xl">🗂️</span> Historique intelligent</li>
        </ul>
        <button
          className="bg-gradient-to-r from-indigo-500 to-emerald-500 text-white text-xl font-bold px-8 py-4 rounded-2xl shadow-xl hover:scale-105 transition flex items-center gap-3 animate-bounce"
          onClick={() => navigate("/Dashboard")}
        >
          <span className="text-2xl">🚀</span> Je veux générer un QR code
        </button>
      </div>
      <footer className="absolute bottom-0 left-0 w-full py-4 text-center text-xs text-gray-500 z-10">
        &copy; {new Date().getFullYear()} QR Code Generator Pro. Tous droits réservés.
      </footer>
    </div>
  );
};

export default LandingPage;
