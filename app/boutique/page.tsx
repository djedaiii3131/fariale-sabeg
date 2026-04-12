'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const categories = [
  {
    id: 'shampoings',
    label: 'Shampoings',
    produits: [
      { nom: 'Shampooing Nutri', prix: '19,00 €', desc: 'Nourrit et répare en profondeur les cheveux secs et abîmés.', image: '/shampoing.nutri.jpeg' },
      { nom: 'Shampooing Couleur', prix: '19,00 €', desc: 'Préserve l\'éclat et la longévité des colorations.', image: '/shampoing.couleur.jpeg' },
      { nom: 'Shampooing Kératine', prix: '21,00 €', desc: 'Lisse et fortifie grâce à la kératine pure.', image: '/shampoing.keratine.jpeg' },
      { nom: 'Shampooing Déjaunisseur', prix: '21,00 €', desc: 'Neutralise les reflets jaunes, révèle le blond parfait.', image: '/shampoing.dejaunissant.jpeg' },
      { nom: 'Shampooing Bouclé', prix: '19,00 €', desc: 'Définit et hydrate les boucles sans effet pesant.', image: '/shampoing.bouclant.jpeg' },
      { nom: 'Shampooing Enfant', prix: '15,00 €', desc: 'Douceur extrême pour les petites têtes.', image: '/shampoing.enfant.jpeg' },
      { nom: 'Shampooing Anti-Chute', prix: '14,00 €', desc: 'Stimule le cuir chevelu et renforce la fibre capillaire.', image: '/shampoing.antichute.jpeg' },
      { nom: 'Shampooing Sébo-Correcteur', prix: '14,00 €', desc: 'Régule l\'excès de sébum pour un cuir chevelu équilibré.', image: '/shampoing.sebocorrecteur.jpeg' },
      { nom: 'Shampooing Tonifiant', prix: '14,00 €', desc: 'Revitalise et redonne vie aux cheveux ternes.', image: '/shampoing.tonifiant.jpeg' },
      { nom: 'Shampooing Corps & Cheveux Homme', prix: '19,50 €', desc: 'Soin 2-en-1 taillé pour l\'homme moderne.', image: '/shampoing.cheveuxetcorps.jpeg' },
    ],
  },
  {
    id: 'masques',
    label: 'Masques',
    produits: [
      { nom: 'Masque Nutri', prix: '24,00 €', desc: 'Nutrition intense pour une chevelure transformée.', image: '/masque.nutri.jpeg' },
      { nom: 'Masque Couleur', prix: '24,00 €', desc: 'Ravive et fixe la couleur entre deux colorations.', image: '/masque.couleur.jpeg' },
      { nom: 'Masque Kératine', prix: '26,00 €', desc: 'Soin reconstituant à la kératine active.', image: '/masque.keratine.jpeg' },
      { nom: 'Masque Déjaunisseur', prix: '25,00 €', desc: 'Pigments violets pour blonds lumineux et purs.', image: '/masque.dejaunissant.jpeg' },
    ],
  },
  {
    id: 'soins',
    label: 'Soins & Huiles',
    produits: [
      { nom: 'Huile Sublimatrice', prix: '28,50 €', desc: 'Sérum précieux qui sublime et protège chaque mèche.', image: '/huile.sublimatrice.jpeg' },
      { nom: 'Huile Sublime Monoï', prix: '22,00 €', desc: 'Éclat tropical, nutrition légère et parfum envoûtant.', image: '/huile.monoi.jpeg' },
      { nom: 'Élixir Rose Amande', prix: '22,00 €', desc: 'Élixir délicat aux notes florales pour une brillance absolue.', image: '/elixir.roseamande.jpeg' },
    ],
  },
  {
    id: 'coiffants',
    label: 'Coiffants',
    produits: [
      { nom: 'Crème Bouclante', prix: '20,00 €', desc: 'Définition et légèreté pour sublimer les boucles naturelles.', image: '/creme.bouclante.jpeg' },
      { nom: 'Spray 12-en-1', prix: '23,00 €', desc: 'Soin multifonction : lissant, protecteur, brillant et plus.', image: '/spray2en1.jpeg' },
      { nom: 'Pâte Coiffante', prix: '19,00 €', desc: 'Tenue naturelle et mate pour un styling précis.', image: '/pate.coiffante.jpeg' },
      { nom: 'Gel Coiffant', prix: '18,00 €', desc: 'Fixation longue durée sans effet carton.', image: '/gel.coiffant.jpeg' },
    ],
  },
];

const blobs = [
  '60% 40% 70% 30% / 50% 60% 40% 50%',
  '40% 60% 30% 70% / 60% 40% 50% 50%',
  '70% 30% 50% 50% / 40% 60% 60% 40%',
  '50% 50% 60% 40% / 70% 30% 40% 60%',
];

export default function Boutique() {
  const [activeCat, setActiveCat] = useState(0);
  const [activeProd, setActiveProd] = useState(0);
  const cat = categories[activeCat];
  const prod = cat.produits[activeProd];

  return (
    <main className="bg-[#080808] min-h-screen text-white" style={{ fontFamily: "'Cormorant Garamond', serif" }}>

      {/* BANDEAU DÉFILANT */}
      <div className="absolute top-0 left-0 right-0 border-b border-[#C8A96E]/20 py-3 overflow-hidden z-10">
        <motion.div animate={{ x: ['0%', '-50%'] }} transition={{ duration: 25, repeat: Infinity, ease: 'linear' }} className="flex items-center gap-12 whitespace-nowrap" style={{ willChange: 'transform' }}>
 
         {[...Array(6)].map((_, i) => (
            <span key={i} className="flex items-center gap-12 text-[#C8A96E]/60 text-xs tracking-[0.35em] uppercase">
              COIFFURE FARIALE SABEG <span className="text-[#C8A96E]">✦</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-8 pt-20">
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}
          className="text-[#C8A96E] text-xs tracking-[0.5em] uppercase mb-6">
          Coiffure Fariale Sabeg
        </motion.p>
        <div className="overflow-hidden mb-10">
          <motion.h1 initial={{ y: '100%' }} animate={{ y: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontSize: 'clamp(50px, 9vw, 130px)', lineHeight: 1 }}>
            <span className="font-light text-[#C8A96E]">Notre Gamme </span>
            <span className="font-light italic text-[#F5EDE3]">de Produits</span>
          </motion.h1>
        </div>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.8 }}
          className="text-white/40 text-xl max-w-lg leading-relaxed">
          Des soins pensés par des professionnels, formulés pour sublimer chaque type de cheveux.
        </motion.p>
      </section>

      {/* CATALOGUE */}
      <section className="min-h-screen">
        {/* TABS */}
        <div className="flex justify-center border-y border-[#C8A96E]/20">
          {categories.map((c, i) => (
            <button key={i} onClick={() => { setActiveCat(i); setActiveProd(0); }}
              className={`px-8 py-5 text-xs tracking-[0.4em] uppercase transition-all duration-500 ${activeCat === i ? 'text-[#C8A96E] border-b-2 border-[#C8A96E]' : 'text-white/30 hover:text-white/60'}`}>
              {c.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={activeCat}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-2 min-h-screen">

            {/* IMAGE BLOB FLOTTANTE */}
            <div className="relative flex items-center justify-center bg-[#0a0a0a] overflow-hidden">
              {/* Halo */}
              <div className="absolute w-80 h-80 rounded-full bg-[#C8A96E]/5 blur-3xl pointer-events-none" />

              <AnimatePresence mode="wait">
                <motion.div key={prod.image}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.5 }}
                  className="relative"
                  style={{ width: 320, height: 320 }}>

   <motion.div
  animate={{ y: [0, -10, 0] }}
  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
  style={{ width: '100%', height: '100%', position: 'relative' }}
>
  <motion.div
    animate={{ opacity: [0.4, 1, 0.4] }}
    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    style={{
      position: 'absolute', inset: -2,
      border: '1px solid #C8A96E',
      boxShadow: '0 0 20px rgba(200,169,110,0.3), inset 0 0 20px rgba(200,169,110,0.05)',
    }}
  />
  {[['top-0 left-0', 'border-t border-l'],['top-0 right-0', 'border-t border-r'],['bottom-0 left-0', 'border-b border-l'],['bottom-0 right-0', 'border-b border-r']].map(([pos, border], i) => (
    <div key={i} className={`absolute ${pos} w-6 h-6 border-[#C8A96E] ${border}`} />
  ))}
  <img src={prod.image} alt={prod.nom} style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center', background: 'linear-gradient(135deg, #1a1208, #0d0b06)' }} />
</motion.div>

              </AnimatePresence>

              {/* Numéro */}
              <div className="absolute bottom-8 left-8 text-[#C8A96E]/15 text-8xl font-light select-none">
                0{activeProd + 1}
              </div>
            </div>

            {/* INFOS */}
            <div className="flex flex-col justify-center px-12 py-16 bg-[#080808]">
              <AnimatePresence mode="wait">
                <motion.div key={activeProd}
                  initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.4 }}>
                  <p className="text-[#C8A96E] text-xs tracking-[0.5em] uppercase mb-3">{cat.label}</p>
                  <h2 className="text-4xl md:text-5xl font-light text-[#F5EDE3] mb-4">{prod.nom}</h2>
                  <p className="text-white/50 leading-relaxed mb-6 max-w-sm">{prod.desc}</p>
                  <div className="text-3xl text-[#C8A96E] font-light mb-8">{prod.prix}</div>
                  <a href="https://www.planity.com/fariale-sabeg-59790-ronchin" target="_blank" rel="noreferrer"
                    className="inline-block border border-[#C8A96E] text-[#C8A96E] hover:bg-[#C8A96E] hover:text-black transition-all duration-300 px-10 py-4 text-xs tracking-[0.4em] uppercase">
                    Commander
                  </a>
                </motion.div>
              </AnimatePresence>

{/* Navigation flèches */}
              <div className="mt-12 flex items-center justify-between px-4">
                <motion.button
                  onClick={() => setActiveProd(i => i > 0 ? i - 1 : cat.produits.length - 1)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-14 h-14 border border-[#C8A96E]/40 text-[#C8A96E] hover:bg-[#C8A96E]/10 transition-all duration-300 flex items-center justify-center text-xl"
                >
                  ←
                </motion.button>
                <div className="flex gap-2">
                  {cat.produits.map((_, i) => (
                    <button key={i} onClick={() => setActiveProd(i)}
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${activeProd === i ? 'bg-[#C8A96E] w-6' : 'bg-[#C8A96E]/20'}`}
                    />
                  ))}
                </div>
                <motion.button
                  onClick={() => setActiveProd(i => i < cat.produits.length - 1 ? i + 1 : 0)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-14 h-14 border border-[#C8A96E]/40 text-[#C8A96E] hover:bg-[#C8A96E]/10 transition-all duration-300 flex items-center justify-center text-xl"
                >
                  →
                </motion.button>
              </div>
            </div>

          </motion.div>
        </AnimatePresence>
      </section>
    </main>
  );
}