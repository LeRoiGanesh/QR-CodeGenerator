import React, { useState } from 'react';

const steps = [
  {
    title: '1. Ajoutez vos liens',
    content: "Saisissez un ou plusieurs liens à protéger. Pour chaque lien, définissez un mot de passe unique. Vous pouvez personnaliser les couleurs du QR code pour un rendu professionnel."
  },
  {
    title: '2. Générez et partagez',
    content: "Cliquez sur 'Générer' pour créer votre QR code sécurisé. Téléchargez-le et partagez-le où vous voulez (affiche, site web, document, etc.)."
  },
  {
    title: '3. Accès sécurisé',
    content: "Lorsqu’un utilisateur scanne le QR code, il arrive sur une page de saisie de mot de passe. Selon le mot de passe entré, il sera redirigé vers le lien correspondant. Impossible d’accéder à un lien sans le bon mot de passe."
  },
  {
    title: '4. Historique local',
    content: "Retrouvez tous vos QR codes générés dans l’historique local (non partagé, non stocké sur un serveur)."
  }
];

const HowItWorksAccordion = () => {
  const [open, setOpen] = useState(null);
  return (
    <div className="w-full max-w-xs mx-auto mt-4 text-xs">
      <h3 className="text-center text-lg font-bold mb-2 text-indigo-800">Comment ça marche ?</h3>
      <div className="rounded-xl bg-white shadow divide-y divide-gray-200">
        {steps.map((step, idx) => (
          <div key={idx}>
            <button
              className={`w-full flex justify-between items-center px-4 py-3 font-semibold focus:outline-none transition text-left ${open === idx ? 'bg-indigo-50 text-indigo-700' : 'bg-white text-gray-800'}`}
              onClick={() => setOpen(open === idx ? null : idx)}
              aria-expanded={open === idx}
            >
              <span>{step.title}</span>
              <span className="ml-2">{open === idx ? '−' : '+'}</span>
            </button>
            {open === idx && (
              <div className="px-4 pb-3 text-gray-700 animate-fade-in">
                {step.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorksAccordion;
