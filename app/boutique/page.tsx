'use client';
import { ZoomParallax } from '../ui/zoom-parallax';
import React from 'react';
import { motion } from 'framer-motion';


export default function Boutique() {
  React.useEffect(() => {
    import('@studio-freight/lenis').then(({ default: Lenis }) => {
      const lenis = new Lenis();
      function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf); }
      requestAnimationFrame(raf);
    });
  }, []);

 const images = [
  { src: '/produit-1.jpeg', alt: 'Shampooing Bouclant' },
  { src: '/produit-2.jpeg', alt: 'Huile Sublimatrice Rose Amande' },
  { src: '/produit-3.jpeg', alt: 'Masque Couleur' },
  { src: '/produit-4.jpeg', alt: 'Shampooing Enfant' },
  { src: '/produit-5.jpeg', alt: 'Shampooing Prévention Chute' },
  { src: '/produits.jpeg', alt: 'Gamme Fariale Sabeg' },
];
  return (
    <main className="bg-[#050403] text-white">
     <section className="min-h-screen flex flex-col items-center justify-center text-center px-8 relative overflow-hidden">

  {/* BANDEAU DÉFILANT */}
  <div className="absolute top-0 left-0 right-0 border-b border-[#C8A96E]/20 py-3 overflow-hidden">
    <motion.div
      animate={{ x: ["0%", "-50%"] }}
      transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      className="flex items-center gap-12 whitespace-nowrap"
    >
      {[...Array(8)].map((_, i) => (
        <div key={i} className="flex items-center gap-6">
          <img src="/logo.jpg" alt="Logo" className="w-8 h-8 object-contain opacity-60" />
          <span
            className="text-[#C8A96E]/60 text-xs tracking-[0.3em] uppercase"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Coiffure Fariale Sabeg
          </span>
        </div>
      ))}
    </motion.div>
  </div>

  {/* SURTITRE */}
  <motion.p
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, delay: 0.3 }}
    className="text-[#C8A96E] uppercase mb-6"
    style={{
      fontFamily: "'Cormorant Garamond', serif",
      fontSize: "clamp(16px, 2.5vw, 28px)",
      letterSpacing: "0.4em",
    }}
  >
    Coiffure Fariale Sabeg
  </motion.p>

  {/* TITRE NOS PRODUITS */}
  <div className="flex justify-center flex-wrap mb-8">
    {"Nos Produits".split("").map((char, i) => (
      <motion.span
        key={i}
        initial={{ opacity: 0, y: -60, rotateX: -90 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.7, delay: 0.6 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(60px, 15vw, 180px)",
          fontWeight: 300,
          lineHeight: 0.9,
          display: "inline-block",
          color: char === " " ? "transparent" : "#C8A96E",
          width: char === " " ? "0.3em" : "auto",
          textShadow: "0 0 40px rgba(200,169,110,0.3)",
        }}
      >
        {char}
      </motion.span>
    ))}
  </div>

  <motion.p
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, delay: 1.4 }}
    className="text-white/50 text-xl max-w-lg leading-relaxed"
    style={{ fontFamily: "'Cormorant Garamond', serif" }}
  >
    Des soins pensés par des professionnels, formulés pour sublimer chaque type de cheveux.
  </motion.p>

</section>

      <ZoomParallax images={images} />

      <section className="py-32 px-8 bg-[#050403]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { img: '/produit-1.jpeg', nom: 'Shampooing Bouclant', desc: 'Hydratation · Brillance', prix: '24€' },
              { img: '/produit-2.jpeg', nom: 'Huile Rose Amande', desc: 'Sublimation · Nutrition', prix: '32€' },
              { img: '/produit-3.jpeg', nom: 'Masque Couleur', desc: 'Éclat · Protection', prix: '28€' },
              { img: '/produit-4.jpeg', nom: 'Shampooing Enfant', desc: 'Douceur · Fréquence', prix: '18€' },
              { img: '/produit-5.jpeg', nom: 'Prévention Chute', desc: 'Force · Densité', prix: '26€' },
            ].map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden mb-6">
                  <img
                    src={p.img}
                    alt={p.nom}
                    className="w-full h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050403]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-6 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    
                      <a href="https://www.planity.com/fariale-sabeg-59790-ronchin"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block px-8 py-3 border border-[#C8A96E] text-[#C8A96E] text-xs tracking-[0.2em] uppercase hover:bg-[#C8A96E] hover:text-black transition-all duration-300"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      Commander
                    </a>
                  </div>
                </div>
                <p className="text-[#C8A96E] text-xs tracking-[0.2em] uppercase mb-2"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  {p.desc}
                </p>
                <h3 className="text-[#F5EDE3] text-xl font-light mb-1"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  {p.nom}
                </h3>
                <p className="text-[#C8A96E] text-lg"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  {p.prix}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="text-center py-16">
        <motion.a
          href="/"
          whileHover={{ x: -5 }}
          className="text-white/20 text-xs tracking-[0.3em] uppercase hover:text-[#C8A96E] transition-colors"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          ← Retour
        </motion.a>
      </div>
    </main>
  );
}