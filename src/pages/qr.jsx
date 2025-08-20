
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const QRPage = () => {
  const [searchParams] = useSearchParams();
  const dataParam = searchParams.get('data');
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  if (!dataParam) return <div className="p-8 text-center">QR invalide.</div>;

  let qrData = null;
  try {
    qrData = JSON.parse(atob(decodeURIComponent(dataParam)));
  } catch {
    return <div className="p-8 text-center">QR corrompu ou non reconnu.</div>;
  }

  // Si pas de tableau de liens, fallback ancien format
  if (!qrData.links) {
    qrData.links = [
      { url: qrData.originalUrl || '', password: qrData.password || '' }
    ];
  }

  // Redirection automatique si un seul lien sans mot de passe
  if (
    qrData.links.length === 1 &&
    qrData.links[0].url &&
    !qrData.links[0].password &&
    /^https?:\/\//.test(qrData.links[0].url)
  ) {
    window.location.href = qrData.links[0].url;
    return <div className="p-8 text-center">Redirection...</div>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const idx = qrData.links.findIndex(link => link.password === input);
    if (idx === -1) {
      setError("Mot de passe incorrect");
      setSuccess(false);
      return;
    }
    setError("");
    setSuccess(true);
    setTimeout(() => {
      const link = qrData.links[idx];
      if (link.url && /^https?:\/\//.test(link.url)) {
        window.location.href = link.url;
      }
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-emerald-100 animate-fade-in">
      <div className="flex flex-col items-center gap-2 mb-6">
        <span className="text-4xl">🔒</span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-indigo-900 tracking-tight drop-shadow mb-2 animate-slide-up">QR multi-lien sécurisé</h1>
        <p className="text-gray-500 text-base text-center max-w-lg animate-fade-in">Entrez le mot de passe associé à votre QR code pour accéder au lien protégé. Chaque QR peut contenir plusieurs liens, chacun avec son propre mot de passe.</p>
      </div>
      <div className="w-full max-w-md bg-white/90 rounded-2xl shadow-2xl border border-indigo-100 p-8 flex flex-col gap-6 animate-slide-up">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 items-center">
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="qr-password" className="text-xs font-semibold text-indigo-900 mb-1 flex items-center gap-2">
              <span className="text-lg">🔑</span> Mot de passe
            </label>
            <input
              id="qr-password"
              type="password"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Mot de passe..."
              className="border border-indigo-200 rounded-lg p-3 text-lg w-full shadow focus:ring-2 focus:ring-indigo-300 outline-none bg-white"
              autoFocus
            />
          </div>
          <button type="submit" className="bg-gradient-to-r from-blue-600 to-emerald-500 text-white rounded-xl p-3 font-bold shadow-lg hover:scale-105 transition w-full flex items-center justify-center gap-2 text-base">
            <span className="text-lg">🚀</span> Accéder
          </button>
          {error && <span className="text-red-500 text-sm animate-shake">{error}</span>}
          {success && <span className="text-green-600 font-semibold animate-fade-in">Mot de passe correct ! Redirection...</span>}
        </form>
      </div>
      <style>{`
        .animate-fade-in { animation: fadeIn 0.7s ease; }
        .animate-slide-up { animation: slideUp 0.7s cubic-bezier(.4,2,.3,1); }
        .animate-shake { animation: shake 0.4s linear; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(40px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes shake { 0% { transform: translateX(0); } 20% { transform: translateX(-6px); } 40% { transform: translateX(6px); } 60% { transform: translateX(-4px); } 80% { transform: translateX(4px); } 100% { transform: translateX(0); } }
      `}</style>
    </div>
  );
};

export default QRPage;
