import React, { useState } from 'react';
import QRCode from 'react-qr-code';

// Ce composant simule une page de déverrouillage QR code
// Il attend en props : content, password, fgColor, bgColor
const ProtectedQR = ({ content, password, fgColor = '#000', bgColor = '#fff', originalContent }) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input === password) {
      setError('');
      // Redirection si originalContent est une URL
      if (originalContent && /^https?:\/\//.test(originalContent)) {
        window.location.href = originalContent;
      } else if (originalContent) {
        // Si ce n'est pas une URL, on affiche le texte
        alert(originalContent);
      }
    } else {
      setError('Mot de passe incorrect');
    }
  };

  if (!password) {
    // Pas de mot de passe, affichage direct
    return <QRCode value={content} fgColor={fgColor} bgColor={bgColor} />;
  }

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 items-center">
        <input
          type="password"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Mot de passe"
          className="border rounded p-2"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Valider</button>
        {error && <span className="text-red-500 text-sm">{error}</span>}
      </form>
    </div>
  );
};

export default ProtectedQR;
