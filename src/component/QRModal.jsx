import React, { useState } from 'react';
import QRCode from 'react-qr-code';

const QRModal = ({ open, onClose, qrData, fgColor, bgColor, logo, setFgColor, setBgColor, setLogo, setTextCenter, textCenter, onDownload, addToHistory }) => {
  const [secureLogo, setSecureLogo] = useState(true);
  const [textFont, setTextFont] = useState('sans-serif');
  const [textColor, setTextColor] = useState('#1e293b');
  const [textWeight, setTextWeight] = useState('bold');
  const [centerShadowColor, setCenterShadowColor] = useState('#6366f1');
  const [centerBorderColor, setCenterBorderColor] = useState('#000');

  if (!open) return null;
  const handleDownloadAndHistory = () => {
    if (typeof addToHistory === 'function') {
      addToHistory({
        id: crypto.randomUUID(),
        content: qrData,
        fgColor,
        bgColor,
        logo,
        textCenter,
        createdAt: new Date().toISOString(),
      });
    }
        // Téléchargement direct via html-to-image
        const qrNode = document.getElementById('modal-qr-preview');
        if (qrNode) {
          import('html-to-image').then(({ toPng }) => {
            toPng(qrNode)
              .then((dataUrl) => {
                const a = document.createElement("a");
                a.href = dataUrl;
                a.download = `qr-edit.png`;
                a.click();
              })
              .catch((err) => console.error("Erreur de téléchargement", err));
          });
        }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-indigo-100/60 via-white/80 to-emerald-100/60 backdrop-blur-xl animate-fade-in">
      <div className="rounded-3xl shadow-2xl border border-gray-200 p-0 w-full max-w-2xl flex flex-col items-stretch gap-0 relative animate-slide-up" style={{boxShadow: '0 8px 32px 0 rgba(60,60,120,0.18)', border: '1.5px solid #e0e7ef', background: 'rgba(255,255,255,0.85)'}}>
        <button className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-2xl font-bold transition hover:scale-125 z-10" onClick={onClose} title="Fermer">×</button>
        <div className="flex flex-col md:flex-row items-stretch gap-0">
          <div className="flex flex-col items-center justify-center p-7 md:p-8 bg-gradient-to-br from-white/90 via-indigo-50/80 to-emerald-50/80 rounded-3xl md:rounded-l-3xl md:rounded-r-none shadow-lg w-full md:w-1/2 border-r border-gray-100">
            <h3 className="text-indigo-900 font-extrabold text-xl mb-4 tracking-tight drop-shadow text-center">Aperçu QR</h3>
            <div className="relative flex items-center justify-center mb-2">
              <div className="relative flex flex-col items-center justify-center bg-white/95 rounded-2xl shadow-lg p-5" style={{width: 220, height: 220, boxShadow: '0 4px 24px 0 rgba(60,60,120,0.10)'}}>
                <div id="modal-qr-preview">
                  <div style={{position: 'relative', width: 180, height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <QRCode value={qrData} fgColor={fgColor} bgColor={bgColor} size={180} />
                    {(logo || textCenter) &&
                      <div
                        style={{
                          position: 'absolute',
                          left: '50%',
                          top: '50%',
                          transform: 'translate(-50%, -50%)',
                          width: 40,
                          height: 40,
                          background: 'rgba(255,255,255,0.95)',
                          borderRadius: 8,
                          boxShadow: `0 2px 12px 0 ${centerShadowColor}`,
                          border: `2.5px solid ${centerBorderColor}`,
                          padding: 0,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          zIndex: 2,
                        }}
                      >
                        {logo ? (
                          <img
                            src={logo}
                            alt="Logo"
                            className={secureLogo ? "w-8 h-8 rounded border-2 border-white shadow object-contain bg-white" : "w-8 h-8 rounded border border-white shadow object-contain"}
                            style={secureLogo ? {boxShadow: "0 0 10px #fff"} : {}}
                          />
                        ) : (
                          <span
                            style={{
                              fontFamily: textFont,
                              color: textColor,
                              fontWeight: textWeight,
                              fontSize: textCenter && textCenter.length > 6 ? '0.8rem' : '1rem',
                              maxWidth: '34px',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                              textAlign: 'center',
                              wordBreak: 'break-word',
                              display: 'inline-block',
                              textShadow: `0 1px 4px ${centerShadowColor}`,
                            }}
                          >
                            {textCenter && textCenter.length > 8 ? textCenter.slice(0, 8) + '...' : textCenter}
                          </span>
                        )}
                      </div>
                    }
                  </div>
                </div>
                {(logo || textCenter) &&
                  <div
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none"
                    style={{
                      width: 40,
                      height: 40,
                      background: 'rgba(255,255,255,0.95)',
                      borderRadius: 8,
                      boxShadow: `0 2px 12px 0 ${centerShadowColor}`,
                      border: `2.5px solid ${centerBorderColor}`,
                      padding: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 2,
                    }}
                  >
                    {logo ? (
                      <img
                        src={logo}
                        alt="Logo"
                        className={secureLogo ? "w-8 h-8 rounded border-2 border-white shadow object-contain bg-white" : "w-8 h-8 rounded border border-white shadow object-contain"}
                        style={secureLogo ? {boxShadow: "0 0 10px #fff"} : {}}
                      />
                    ) : (
                      <span
                        style={{
                          fontFamily: textFont,
                          color: textColor,
                          fontWeight: textWeight,
                          fontSize: textCenter && textCenter.length > 6 ? '0.8rem' : '1rem',
                          maxWidth: '34px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          textAlign: 'center',
                          wordBreak: 'break-word',
                          display: 'inline-block',
                          textShadow: `0 1px 4px ${centerShadowColor}`,
                        }}
                      >
                        {textCenter && textCenter.length > 8 ? textCenter.slice(0, 8) + '...' : textCenter}
                      </span>
                    )}
                  </div>
                }
              </div>
            </div>
            <button onClick={handleDownloadAndHistory} className="mt-6 text-sm bg-gradient-to-r from-green-500 to-emerald-500 text-white px-5 py-2 rounded-xl shadow-lg hover:scale-105 transition font-bold w-full flex items-center justify-center gap-2">
              <span className="text-lg">📥</span> Télécharger
            </button>
          </div>
          <div className="flex flex-col gap-4 p-7 md:p-8 w-full md:w-1/2 bg-gradient-to-br from-white/80 via-indigo-50/60 to-emerald-50/60 rounded-3xl md:rounded-r-3xl md:rounded-l-none">
            <h4 className="text-indigo-900 font-bold text-base mb-4 tracking-tight text-center">Personnalisation</h4>
            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="flex flex-col gap-2 bg-white/90 rounded-xl shadow p-3 border border-gray-100">
                <label className="text-xs font-semibold text-indigo-900 mb-1">Bordure du centre</label>
                <input type="color" value={centerBorderColor} onChange={e => setCenterBorderColor(e.target.value)} className="w-8 h-8 rounded-lg border-2 border-gray-300 mx-auto" />
              </div>
              <div className="flex flex-col gap-2 bg-white/90 rounded-xl shadow p-3 border border-gray-100">
                <label className="text-xs font-semibold text-indigo-900 mb-1">Couleur QR</label>
                <input type="color" value={fgColor} onChange={e => setFgColor(e.target.value)} className="w-8 h-8 rounded-lg border-2 border-gray-300 mx-auto" />
              </div>
              <div className="flex flex-col gap-2 bg-white/90 rounded-xl shadow p-3 border border-gray-100">
                <label className="text-xs font-semibold text-indigo-900 mb-1">Fond</label>
                <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} className="w-8 h-8 rounded-lg border-2 border-gray-300 mx-auto" />
              </div>
              <div className="flex flex-col gap-2 bg-white/90 rounded-xl shadow p-3 border border-gray-100">
                <label className="text-xs font-semibold text-indigo-900 mb-1">Ombre du centre</label>
                <input type="color" value={centerShadowColor} onChange={e => setCenterShadowColor(e.target.value)} className="w-8 h-8 rounded-lg border-2 border-gray-300 mx-auto" />
              </div>
              <div className="flex flex-col gap-2 bg-white/90 rounded-xl shadow p-3 border border-gray-100 col-span-2">
                <label className="text-xs font-semibold text-indigo-900 mb-1">Logo au centre</label>
                <div className="flex items-center gap-2">
                  <input type="file" accept="image/*" onChange={e => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = ev => setLogo(ev.target.result);
                      reader.readAsDataURL(file);
                    }
                  }} className="w-full" />
                  {logo && (
                    <button type="button" className="text-xs text-red-500 bg-red-100 px-2 py-1 rounded-lg shadow hover:bg-red-200 transition" onClick={() => setLogo("")}>Retirer</button>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-2 bg-white/90 rounded-xl shadow p-3 border border-gray-100 col-span-2">
                <label className="text-xs font-semibold text-indigo-900 mb-1">Texte stylé au centre</label>
                <div className="flex flex-wrap gap-2 items-center">
                  <input type="text" value={textCenter} onChange={e => setTextCenter(e.target.value)} className="p-1 border rounded-lg text-xs shadow w-24" placeholder="Votre texte..." />
                  <select value={textFont} onChange={e => setTextFont(e.target.value)} className="p-1 border rounded-lg text-xs shadow">
                    <option value="sans-serif">Sans Serif</option>
                    <option value="serif">Serif</option>
                    <option value="monospace">Monospace</option>
                    <option value="cursive">Cursive</option>
                    <option value="fantasy">Fantasy</option>
                  </select>
                  <select value={textWeight} onChange={e => setTextWeight(e.target.value)} className="p-1 border rounded-lg text-xs shadow">
                    <option value="normal">Normal</option>
                    <option value="bold">Gras</option>
                    <option value="bolder">Très gras</option>
                    <option value="lighter">Fin</option>
                  </select>
                  <input type="color" value={textColor} onChange={e => setTextColor(e.target.value)} className="w-8 h-8 rounded-lg border-2 border-gray-300" title="Couleur du texte" />
                  {textCenter && (
                    <button type="button" className="text-xs text-red-500 bg-red-100 px-2 py-1 rounded-lg shadow hover:bg-red-200 transition" onClick={() => setTextCenter("")}>Retirer</button>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-2 bg-white/90 rounded-xl shadow p-3 border border-gray-100 col-span-2">
                <label className="flex items-center gap-2 text-xs font-semibold text-indigo-900">
                  <input type="checkbox" checked={secureLogo} onChange={e => setSecureLogo(e.target.checked)} className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
                  Utiliser un logo sécurisé
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRModal;
