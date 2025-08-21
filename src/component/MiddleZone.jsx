import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'react-qr-code';
import { toPng } from 'html-to-image';
import HowItWorksAccordion from './HowItWorksAccordion';
import QRModal from './QRModal';

// Ajout d'un state pour l'index sélectionné dans l'historique

const MiddleZone = ({ onGenerate }) => {
  const [links, setLinks] = useState([
    { url: '', password: '' }
  ])
  const [history, setHistory] = useState([])
  const [fgColor, setFgColor] = useState("#000000")
  const [bgColor, setBgColor] = useState("#ffffff")
  const [latestQR, setLatestQR] = useState(null);
  const [selectedHistoryIdx, setSelectedHistoryIdx] = useState(null);

  // Pour la modale QR
  const [modalOpen, setModalOpen] = useState(false);
  const [modalQR, setModalQR] = useState(null);
  const [modalFg, setModalFg] = useState("#000000");
  const [modalBg, setModalBg] = useState("#ffffff");
  const [modalLogo, setModalLogo] = useState("");
  const [modalTextCenter, setModalTextCenter] = useState("");

  const qrRef = useRef(null) // pour télécharger plus tard

  useEffect(() => {
    const saved = localStorage.getItem('qrHistory');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  const addToHistory = (data) => {
    const updated = [data, ...history];
    setHistory(updated);
    localStorage.setItem('qrHistory', JSON.stringify(updated));
  };

  const handleGenerate = () => {
    // Validation stricte
    if (links.length === 0 || links.every(l => !l.url)) {
      alert("Veuillez ajouter au moins un lien.");
      return;
    }
    if (links.length === 1 && links[0].url && !links[0].password) {
      // Générer un QR qui pointe directement vers l'URL
      const id = crypto.randomUUID();
      const data = {
        id,
        content: links[0].url,
        fgColor,
        bgColor,
        createdAt: new Date().toISOString(),
      };
      if (typeof onGenerate === 'function') {
        onGenerate(data);
      }
    setLatestQR(data);
    setLinks([{ url: '', password: '' }]);
    addToHistory(data);
      return;
    }
    if (links.length > 1) {
      for (let i = 0; i < links.length; i++) {
        if (!links[i].url) {
          alert(`Le lien #${i + 1} est vide.`);
          return;
        }
        if (!links[i].password) {
          alert(`Chaque lien doit avoir un mot de passe (lien #${i + 1}).`);
          return;
        }
      }
    }
    const id = crypto.randomUUID();
    const domain = "https://qr-code-generator-nine-mu.vercel.app/";
    const qrPayload = {
      id,
      links: links.filter(l => l.url),
      fgColor,
      bgColor,
      createdAt: new Date().toISOString(),
    };
    const encoded = encodeURIComponent(btoa(JSON.stringify(qrPayload)));
    const protectedUrl = `${domain}/qr?data=${encoded}`;
    const data = {
      id,
      content: protectedUrl,
      fgColor,
      bgColor,
      createdAt: new Date().toISOString(),
    };
    if (typeof onGenerate === 'function') {
      onGenerate(data);
    }
    setLatestQR(data);
    setLinks([{ url: '', password: '' }]);
    addToHistory(data);
  };


  // Gestion de l'affichage sécurisé des QR codes de l'historique
  const [visibleQR, setVisibleQR] = useState({});
  const [passwordInputs, setPasswordInputs] = useState({});

  const handleShowQR = (entry) => {
    if (!entry.password) {
      setVisibleQR((prev) => ({ ...prev, [entry.id]: true }));
      return;
    }
    setVisibleQR((prev) => ({ ...prev, [entry.id]: false }));
  };

  const handlePasswordChange = (e, entry) => {
    setPasswordInputs((prev) => ({ ...prev, [entry.id]: e.target.value }));
  };

  const handlePasswordSubmit = (entry) => {
    if (passwordInputs[entry.id] === entry.password) {
      setVisibleQR((prev) => ({ ...prev, [entry.id]: true }));
    } else {
      setVisibleQR((prev) => ({ ...prev, [entry.id]: false }));
      alert('Mot de passe incorrect');
    }
  };

  const handleDownload = () => {
    if (!qrRef.current) return;
    toPng(qrRef.current)
      .then((dataUrl) => {
        const a = document.createElement("a");
        a.href = dataUrl;
        a.download = `qr-${latestQR?.id}.png`;
        a.click();
      })
      .catch((err) => console.error("Erreur de téléchargement", err));
  };

  // Téléchargement depuis la modale
  const handleModalDownload = () => {
    const qrNode = document.getElementById('modal-qr-preview');
    if (!qrNode) return;
    toPng(qrNode)
      .then((dataUrl) => {
        const a = document.createElement("a");
        a.href = dataUrl;
        a.download = `qr-edit.png`;
        a.click();
      })
      .catch((err) => console.error("Erreur de téléchargement", err));
  };

  return (
    <div className="flex flex-col items-center px-2 py-4 text-xs w-full">
      <div className="flex flex-row w-full max-w-lg gap-4 items-start justify-center">
        {/* Bloc génération */}
        <div className="w-full max-w-md bg-gradient-to-br from-indigo-50 to-blue-100 rounded-2xl p-4 shadow-2xl border border-indigo-100 flex flex-col gap-3">
          <h2 className="font-bold text-center text-indigo-900 text-lg tracking-tight mb-1">🔒 Générateur de QR Codes Sécurisés</h2>
          <p className="text-center text-gray-500 mb-2">Ajoutez plusieurs liens, protégez chacun par un mot de passe différent, personnalisez votre QR code, ajoutez un logo ou texte au centre pour un rendu professionnel.</p>
          <div className="flex flex-col gap-2">
            {links.map((link, idx) => (
              <div key={idx} className="flex gap-1 items-center">
                <input
                  type="text"
                  value={link.url}
                  onChange={e => {
                    const newLinks = [...links];
                    newLinks[idx].url = e.target.value;
                    setLinks(newLinks);
                  }}
                  placeholder={`Lien #${idx + 1}`}
                  className="flex-1 p-2 border border-indigo-200 rounded-lg bg-white shadow-sm text-xs focus:ring-2 focus:ring-indigo-300 outline-none"
                />
                <input
                  type="password"
                  value={link.password}
                  onChange={e => {
                    const newLinks = [...links];
                    newLinks[idx].password = e.target.value;
                    setLinks(newLinks);
                  }}
                  placeholder="Mot de passe"
                  className="w-28 p-2 border border-indigo-200 rounded-lg bg-white shadow-sm text-xs focus:ring-2 focus:ring-indigo-300 outline-none"
                />
                {links.length > 1 && (
                  <button
                    type="button"
                    className="text-red-500 font-bold px-1 hover:bg-red-100 rounded"
                    onClick={() => setLinks(links.filter((_, i) => i !== idx))}
                    title="Supprimer ce lien"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded mb-1 hover:bg-indigo-200 border border-indigo-200 text-xs font-semibold"
            onClick={() => {
              // Vérifier que le dernier lien a un mot de passe avant d'ajouter
              if (links.length > 0 && (!links[links.length - 1].url || !links[links.length - 1].password)) {
                alert("Veuillez renseigner un mot de passe pour le lien précédent avant d'ajouter un nouveau lien.");
                return;
              }
              setLinks([...links, { url: '', password: '' }]);
            }}
          >
            + Ajouter un lien
          </button>
          <div className="flex justify-between items-center mt-2 mb-1">
            <label className="flex items-center gap-1 text-xs font-medium text-indigo-900">QR Color <input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="ml-1" /></label>
            <label className="flex items-center gap-1 text-xs font-medium text-indigo-900">Fond <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="ml-1" /></label>
          </div>
          <div className="flex gap-2 mt-2">
            <button
            type="button"
            className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-4 py-2 rounded-xl border border-green-700 shadow hover:scale-105 transition font-bold tracking-wide text-xs"
            onClick={() => {
              // Validation stricte pour la prévisualisation
              if (links.length === 0 || links.every(l => !l.url)) {
                alert("Veuillez ajouter au moins un lien.");
                return;
              }
              // Toujours ouvrir la modale, même pour un lien unique sans mot de passe
              let modalUrl = "";
              if (links.length === 1 && links[0].url && !links[0].password) {
                // QR direct vers l'URL
                modalUrl = links[0].url;
              } else {
                // QR protégé
                if (links.length > 1) {
                  for (let i = 0; i < links.length; i++) {
                    if (!links[i].url) {
                      alert(`Le lien #${i + 1} est vide.`);
                      return;
                    }
                    if (!links[i].password) {
                      alert(`Chaque lien doit avoir un mot de passe (lien #${i + 1}).`);
                      return;
                    }
                  }
                }
                const id = crypto.randomUUID();
                const domain = "https://qr-code-generator-nine-mu.vercel.app/";
                const qrPayload = {
                  id,
                  links: links.filter(l => l.url),
                  fgColor,
                  bgColor,
                  createdAt: new Date().toISOString(),
                };
                const encoded = encodeURIComponent(btoa(JSON.stringify(qrPayload)));
                modalUrl = `${domain}/qr?data=${encoded}`;
              }
              setModalQR(modalUrl);
              setModalFg(fgColor);
              setModalBg(bgColor);
              setModalLogo("");
              setModalTextCenter("");
              setModalOpen(true);
            }}
          >
            👁️ Prévisualiser & Modifier
          </button>
          </div>
        </div>

        {/* Bloc historique sous forme de select */}
        <div className="w-full bg-white rounded-2xl shadow-2xl border border-indigo-100 p-4 flex flex-col gap-2">
          <h2 className="text-lg font-bold mb-2 text-indigo-900 flex items-center gap-2">🗂️ Historique</h2>
          {history.length === 0 ? (
            <p className="text-gray-400 text-xs">Aucun QR généré.</p>
          ) : (
            <div className="flex flex-row gap-4 overflow-x-auto pb-2">
              {history.map((entry, idx) => (
                <div key={entry.id} className="min-w-[160px] max-w-[180px] flex-shrink-0 bg-white rounded-xl shadow border border-indigo-100 p-3 flex flex-col items-center">
                  <span className="text-xs font-semibold text-indigo-800 mb-1 text-center">
                    {new Date(entry.createdAt).toLocaleString('fr-FR', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' })}<br/>QR #{idx + 1}
                  </span>
                  <div id={`qr-history-${entry.id}`} className="bg-white p-2 rounded shadow flex items-center justify-center" style={{position: 'relative', width: 100, height: 100}}>
                    <QRCode value={entry.content} bgColor={entry.bgColor} fgColor={entry.fgColor} size={100} />
                    {(entry.logo || entry.textCenter) && (
                      <div
                        style={{
                          position: 'absolute',
                          left: '50%',
                          top: '50%',
                          transform: 'translate(-50%, -50%)',
                          width: 22,
                          height: 22,
                          background: 'rgba(255,255,255,0.95)',
                          borderRadius: 5,
                          boxShadow: `0 2px 8px 0 ${entry.centerShadowColor || '#6366f1'}`,
                          border: `1.5px solid ${entry.centerBorderColor || '#000'}`,
                          padding: 0,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          zIndex: 2,
                        }}
                      >
                        {entry.logo ? (
                          <img
                            src={entry.logo}
                            alt="Logo"
                            style={{width: 18, height: 18, borderRadius: 3, background: '#fff', objectFit: 'contain'}}
                          />
                        ) : (
                          <span
                            style={{
                              fontFamily: entry.textFont || 'sans-serif',
                              color: entry.textColor || '#1e293b',
                              fontWeight: entry.textWeight || 'bold',
                              fontSize: entry.textCenter && entry.textCenter.length > 6 ? '0.6rem' : '0.75rem',
                              maxWidth: '16px',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                              textAlign: 'center',
                              wordBreak: 'break-word',
                              display: 'inline-block',
                              textShadow: `0 1px 4px ${entry.centerShadowColor || '#6366f1'}`,
                            }}
                          >
                            {entry.textCenter && entry.textCenter.length > 8 ? entry.textCenter.slice(0, 8) + '...' : entry.textCenter}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      const node = document.getElementById(`qr-history-${entry.id}`);
                      if (!node) return;
                      toPng(node)
                        .then((dataUrl) => {
                          const a = document.createElement("a");
                          a.href = dataUrl;
                          a.download = `qr-${entry.id}.png`;
                          a.click();
                        })
                        .catch((err) => console.error("Erreur de téléchargement", err));
                    }}
                    className="mt-2 text-xs bg-gradient-to-r from-green-500 to-emerald-500 text-white px-2 py-1 rounded-lg shadow hover:scale-105 transition font-semibold"
                  >
                    📥 Télécharger
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
 
      </div>

      {/* QR généré direct (preview) */}
      {latestQR && (
        <>
          <div
            id={`qr-preview-${latestQR.id}`}
            className="bg-white mt-4 p-3 rounded-xl shadow-xl border border-indigo-100 flex flex-col items-center w-full max-w-xs"
          >
            {latestQR.content ? (
              <QRCode value={latestQR.content} bgColor={latestQR.bgColor} fgColor={latestQR.fgColor} size={160} />
            ) : (
              <p className="text-red-500">Erreur : impossible d'afficher le QR code.</p>
            )}
          </div>
          <button
            onClick={() => {
              const node = document.getElementById(`qr-preview-${latestQR.id}`);
              if (!node) return;
              toPng(node)
                .then((dataUrl) => {
                  const a = document.createElement("a");
                  a.href = dataUrl;
                  a.download = `qr-${latestQR?.id}.png`;
                  a.click();
                })
                .catch((err) => console.error("Erreur de téléchargement", err));
            }}
            className="mt-2 text-xs bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1.5 rounded-lg shadow hover:scale-105 transition font-semibold"
          >
            📥 Télécharger ce QR
          </button>
        </>
      )}

      {/* Modale QR édition/preview */}
      <QRModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        qrData={modalQR}
        fgColor={modalFg}
        bgColor={modalBg}
        logo={modalLogo}
        setFgColor={setModalFg}
        setBgColor={setModalBg}
        setLogo={setModalLogo}
        setTextCenter={setModalTextCenter}
        textCenter={modalTextCenter}
        onDownload={handleModalDownload}
        addToHistory={addToHistory}
      />

      {/* Accordéon explicatif en bas */}
      <HowItWorksAccordion />
    </div>
  );
};

export default MiddleZone;
