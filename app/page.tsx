'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

function RevealSection({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function LetterByLetter({ text }: { text: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  return (
    <span ref={ref}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: i * 0.04 }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

const allPhotos = Array.from({ length: 16 }, (_, i) => `/coupe-${i + 1}.jpeg`);
const barPhotos = ['/bar-1.jpeg', '/bar-2.jpeg', '/bar-3.jpeg', '/bar-4.jpeg'];

const prestations = [
  {
    num: '01',
    title: 'Coupes & Coiffage',
    tag: 'L\'essentiel sublimé',
    desc: 'Chaque coupe est pensée comme une œuvre — adaptée à votre morphologie, votre style de vie, votre personnalité. Brushing de précision, mise en forme sur-mesure, coiffures événementielles pour femmes, hommes et enfants.',
  },
  {
    num: '02',
    title: 'Couleurs & Techniques',
    tag: 'La palette de vos envies',
    desc: 'Balayage, babylights, highlights, ombré hair, coloration pleine, gloss et patine lumineuse… Chaque nuance est choisie pour sublimer votre carnation et magnifier votre regard.',
  },
  {
    num: '03',
    title: 'Soins & Botox Kératine',
    tag: 'Le soin du cheveu comme un rituel',
    desc: 'Soins intensifs restructurants, botox kératine et traitements réparateurs redonnent souplesse, brillance et vitalité à vos cheveux. Un moment de soin profond, comme un rituel de beauté haut de gamme.',
  },
  {
    num: '04',
    title: 'Lissage & Permanente',
    tag: 'La transformation durable',
    desc: 'Lissage brésilien, au tanin, à la kératine ou indien — chaque technique sélectionnée selon la nature de vos cheveux pour un résultat naturel et durable. Permanentes douces pour des boucles définies.',
  },
  {
    num: '05',
    title: 'Extensions',
    tag: 'Volume & longueur sur-mesure',
    desc: 'Extensions à bande adhésive posées à froid, dans une palette de teintes soigneusement sélectionnées pour un rendu 100% naturel. Longueur, volume, densité — la chevelure de vos rêves.',
  },
];

function GlobalSlideshow() {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % allPhotos.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="relative w-full h-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.img
          key={current}
          src={allPhotos[current]}
          alt="Prestation salon"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5">
        {allPhotos.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => setCurrent(i)}
            animate={{ width: current === i ? 20 : 6, opacity: current === i ? 1 : 0.3 }}
            transition={{ duration: 0.3 }}
            className="h-1 rounded-full bg-[#C8A96E]"
          />
        ))}
      </div>
    </div>
  );
}

function BarSlideshow() {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % barPhotos.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="relative w-full h-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.img
          key={current}
          src={barPhotos[current]}
          alt="Le Bar"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
        {barPhotos.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => setCurrent(i)}
            animate={{ width: current === i ? 24 : 6, opacity: current === i ? 1 : 0.4 }}
            transition={{ duration: 0.3 }}
            className="h-0.5 rounded-full bg-white"
          />
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [showButton, setShowButton] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [activePrestation, setActivePrestation] = useState(0);
useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => setShowButton(true), 4000);
      return () => clearTimeout(timer);
    }
  }, [loading]);

 if (loading) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden">
    <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
  <source src="/intro2.mp4" type="video/mp4" />
</video>
      <div className="absolute inset-0 bg-black/40" />
    
     {/* Bouton Entrer */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showButton ? 1 : 0, y: showButton ? 0 : 20 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          onClick={() => setLoading(false)}
          disabled={!showButton}
          className="relative z-10 mt-80 group"
          style={{ fontFamily: 'Cormorant Garamond, serif' }}
        >
          <span className="block px-14 py-4 border border-[#C9A84C] text-[#C9A84C] text-xs tracking-[0.4em] uppercase transition-all duration-500 group-hover:bg-[#C9A84C] group-hover:text-[#0a0804]">
            Entrer
          </span>
        </motion.button>
</div>
    );
  }


  if (activeSection !== 'home') {
    return (
      <main className="min-h-screen bg-[#080604] text-white">
        <button onClick={() => setMenuOpen(!menuOpen)} className="fixed top-6 left-6 z-40 flex flex-col gap-1.5 hover:opacity-70 transition">
          <motion.div animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 12 : 0 }} className="w-6 h-0.5 bg-[#C8A96E]" />
          <motion.div animate={{ opacity: menuOpen ? 0 : 1 }} className="w-6 h-0.5 bg-[#C8A96E]" />
          <motion.div animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -12 : 0 }} className="w-6 h-0.5 bg-[#C8A96E]" />
        </button>
        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#0a0806] z-30 flex flex-col items-center justify-center gap-12">
              <button onClick={() => setMenuOpen(false)} className="absolute top-6 right-6 text-[#F5EDE3] hover:text-[#C8A96E] transition text-2xl">✕</button>
              {[
                { label: 'ACCUEIL', section: 'home' },
                { label: 'SALON', section: 'salon' },
                { label: 'PRESTATIONS', section: 'prestations' },
                { label: 'PRODUITS', section: 'produits' },
              ].map((item, i) => (
                <motion.button key={i} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 + i * 0.1 }}
                  onClick={() => { if (item.section === 'produits') { window.location.href = '/boutique'; } else { setActiveSection(item.section); } setMenuOpen(false); }}
                  className="text-[#F5EDE3] hover:text-[#C8A96E] transition tracking-[0.2em] text-2xl font-light"
                  style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  {item.label}
                </motion.button>
              ))}
              <motion.button initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}
                onClick={() => { window.open('https://www.planity.com/fariale-sabeg-59790-ronchin', '_blank'); setMenuOpen(false); }}
                className="text-[#F5EDE3] hover:text-[#C8A96E] transition tracking-[0.2em] text-2xl font-light"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                RENDEZ-VOUS
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        activeS{false && (
          <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-[#1A1510] py-24 px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-20">
                <h2 className="text-5xl md:text-6xl font-light tracking-wide mb-4 text-[#C8A96E]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Le Salon</h2>
                <p className="text-white/70 max-w-2xl mx-auto">Une expérience luxe et cinématique dédiée à votre beauté</p>
              </div>
              <div className="grid md:grid-cols-2 gap-16 mb-20">
                <div>
                  <h3 className="text-2xl text-[#C8A96E] mb-8 tracking-[2px]">INFOS PRATIQUES</h3>
                  <div className="space-y-8">
                    <div><p className="text-[#C8A96E] text-sm tracking-[2px] mb-2">ADRESSE</p><p className="text-white/80">28 Rue Lavoisier<br />59790 Ronchin</p></div>
                    <div><p className="text-[#C8A96E] text-sm tracking-[2px] mb-2">TÉLÉPHONE</p><a href="tel:+33981402573" className="text-white/80 hover:text-[#C8A96E] transition">+33 9 81 40 25 73</a></div>
                    <div><p className="text-[#C8A96E] text-sm tracking-[2px] mb-2">HORAIRES</p><p className="text-white/80">Mar–Ven : 09:30–18:30<br />Jeudi : 09:30–21:00<br />Samedi : 09:00–17:30</p></div>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl text-[#C8A96E] mb-8 tracking-[2px]">LE BAR</h3>
                  <p className="text-white/70 mb-6">Champagnes, vins sélectionnés, softs bio • Café et thé offerts</p>
                  <div className="space-y-3 text-sm">
                    {[
                      { name: 'Champagne Étienne Oudart', price: '12,50 €' },
                      { name: 'Petit Chablis', price: '8 €' },
                      { name: 'Pétula Luberon Rosé', price: '6,50 €' },
                      { name: 'Grand Marennon Rouge', price: '6 €' },
                      { name: 'Anosteké Blonde 8°', price: '4,50 €' },
                      { name: 'Clean Soda Bio', price: '4 €' },
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between text-white/70 border-b border-white/10 pb-2">
                        <span>{item.name}</span><span className="text-[#C8A96E]">{item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="text-center mt-20">
                <a href="https://www.planity.com/fariale-sabeg-59790-ronchin" target="_blank" rel="noreferrer"
                  className="inline-block px-12 py-4 bg-[#C8A96E] text-black hover:bg-white transition-all duration-300 text-sm tracking-[3px] uppercase font-semibold">
                  Prendre Rendez-vous
                </a>
              </div>
            </div>
          </motion.section>
        )}

        {activeSection === 'prestations' && (
          <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-[#0F0D0A] py-24 px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-5xl md:text-6xl font-light tracking-wide mb-16 text-center text-[#C8A96E]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Nos Prestations</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {prestations.map((service, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.05 }}
                    className="bg-white/5 p-8 hover:bg-[#C8A96E]/20 transition-all duration-300">
                    <h3 className="text-xl text-white mb-3 tracking-wide">{service.title}</h3>
                    <p className="text-white/70 text-sm leading-relaxed">{service.desc}</p>
                  </motion.div>
                ))}
              </div>
              <div className="text-center mt-16">
                <a href="https://www.planity.com/fariale-sabeg-59790-ronchin" target="_blank" rel="noreferrer"
                  className="inline-block px-12 py-4 bg-[#C8A96E] text-black hover:bg-white transition-all duration-300 text-sm tracking-[3px] uppercase font-semibold">
                  Réserver Une Prestation
                </a>
              </div>
            </div>
          </motion.section>
        )}

        {activeSection === 'produits' && (
          <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-[#1A1510] py-24 px-8 flex flex-col items-center justify-center">
            <div className="text-center">
              <h2 className="text-5xl md:text-6xl font-light tracking-wide mb-6 text-[#C8A96E]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Produits Premium</h2>
              <p className="text-white/70 max-w-2xl mb-12 text-lg">Sélection exclusive de produits capillaires haut de gamme.</p>
              <a href="https://www.planity.com/fariale-sabeg-59790-ronchin" target="_blank" rel="noreferrer"
                className="inline-block px-12 py-4 bg-[#C8A96E] text-black hover:bg-white transition-all duration-300 text-sm tracking-[3px] uppercase font-semibold">
                Consulter Notre Catalogue
              </a>
            </div>
          </motion.section>
        )}

        <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="fixed bottom-6 right-6 z-20 px-6 py-2 border border-[#C8A96E] text-[#C8A96E] hover:bg-[#C8A96E] hover:text-black transition-all duration-300 text-xs tracking-[2px] uppercase"
          onClick={() => setActiveSection('home')}>
          Retour
        </motion.button>
      </main>
    );
  }

  return (
    <main className="bg-[#080604] text-white overflow-x-hidden">

      {/* Hamburger */}
      <button onClick={() => setMenuOpen(!menuOpen)} className="fixed top-6 left-6 z-40 flex flex-col gap-1.5 hover:opacity-70 transition">
        <motion.div animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 12 : 0 }} className="w-6 h-0.5 bg-[#C8A96E]" />
        <motion.div animate={{ opacity: menuOpen ? 0 : 1 }} className="w-6 h-0.5 bg-[#C8A96E]" />
        <motion.div animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -12 : 0 }} className="w-6 h-0.5 bg-[#C8A96E]" />
      </button>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#0a0806] z-30 flex flex-col items-center justify-center gap-12">
            <button onClick={() => setMenuOpen(false)} className="absolute top-6 right-6 text-[#F5EDE3] hover:text-[#C8A96E] transition text-2xl">✕</button>
            {[
              { label: 'SALON', section: 'salon' },
              { label: 'PRESTATIONS', section: 'prestations' },
              { label: 'PRODUITS', section: 'produits' },
            ].map((item, i) => (
              <motion.button key={i} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 + i * 0.1 }}
                onClick={() => { if (item.section === 'salon') { window.location.href = '/salon'; } else { setActiveSection(item.section); } setMenuOpen(false); }}
                className="text-[#F5EDE3] hover:text-[#C8A96E] transition tracking-[0.2em] text-2xl font-light"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                {item.label}
              </motion.button>
            ))}
            <motion.button initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}
              onClick={() => { window.open('https://www.planity.com/fariale-sabeg-59790-ronchin', '_blank'); setMenuOpen(false); }}
              className="text-[#F5EDE3] hover:text-[#C8A96E] transition tracking-[0.2em] text-2xl font-light"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              RENDEZ-VOUS
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ HERO ═══ */}
      <section className="relative w-screen min-h-screen flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg, #2D1F14, #8B6F5E, #C8A96E, #8B6F5E, #2D1F14)', backgroundSize: '400% 400%' }}>
        <div className="absolute inset-0 bg-[rgba(15,10,8,0.30)]" />
        <div className="relative z-10 flex flex-col items-center justify-center text-center">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }}
            className="text-[7vw] font-light mb-10 tracking-[0.3em] text-[#F5EDE3]"
            style={{ fontFamily: "'Palatino Linotype', Palatino, serif" }}>
            FARIALE SABEG
          </motion.h1>
          <div className="flex gap-5 items-center justify-center mb-14">
            {["L'ART", 'DE', 'VOUS', 'REDÉFINIR'].map((word, i) => (
              <motion.span key={i}
                animate={{ color: ['rgba(245, 237, 227, 0.3)', '#C8A96E', 'rgba(245, 237, 227, 0.3)'] }}
                transition={{ duration: 4, delay: i, repeat: Infinity, repeatType: 'loop', times: [0, 0.25, 1] }}
                className="text-[1.8vw] tracking-[0.5em] font-light"
                style={{ fontFamily: "'Palatino Linotype', Palatino, serif" }}>
                {word}
              </motion.span>
            ))}
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.2 }}
            style={{ display: 'flex', gap: '2rem', justifyContent: 'center' }}>
            <a href="https://instagram.com/fariale.sabeg" target="_blank" rel="noopener noreferrer"
              style={{ padding: '1rem 2.8rem', border: '2px solid #C8A96E', color: '#C8A96E', letterSpacing: '0.4em', fontSize: '0.75rem', textDecoration: 'none', fontFamily: "'Palatino Linotype', serif", background: 'rgba(200,169,110,0.08)', transition: 'all 0.3s ease' }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#C8A96E'; (e.currentTarget as HTMLAnchorElement).style.color = '#0a0806'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(200,169,110,0.08)'; (e.currentTarget as HTMLAnchorElement).style.color = '#C8A96E'; }}>
              EXPLORE
            </a>
            <a href="#cinematique"
              style={{ padding: '1rem 2.8rem', border: '2px solid #8B6F5E', color: '#F5EDE3', letterSpacing: '0.4em', fontSize: '0.75rem', textDecoration: 'none', fontFamily: "'Palatino Linotype', serif", background: 'rgba(139,111,94,0.15)', transition: 'all 0.3s ease', cursor: 'pointer' }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#8B6F5E'; (e.currentTarget as HTMLAnchorElement).style.color = '#F5EDE3'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(139,111,94,0.15)'; (e.currentTarget as HTMLAnchorElement).style.color = '#F5EDE3'; }}>
              BIENVENUE
            </a>
          </motion.div>
        </div>
      </section>

      {/* ═══ SECTION CINÉMATIQUE ═══ */}
      <section id="cinematique" className="relative bg-[#050403] overflow-hidden">
        <div className="py-10 border-y border-[#C8A96E]/15 overflow-hidden">
          <motion.div animate={{ x: ['0%', '-50%'] }} transition={{ duration: 18, repeat: Infinity, ease: 'linear' }} className="flex whitespace-nowrap">
            {[...Array(2)].map((_, j) => (
              <span key={j} className="flex items-center">
                {['EXPERTISE', 'ÉLÉGANCE', 'AUTHENTICITÉ', 'LUXE', 'FARIALE SABEG', 'RONCHIN', 'PASSION', 'EXCELLENCE'].map((word, i) => (
                  <span key={i} className="flex items-center">
                    <span className="text-[#C8A96E]/60 text-xs tracking-[6px] uppercase px-8">{word}</span>
                    <span className="text-[#C8A96E]/30 text-lg">·</span>
                  </span>
                ))}
              </span>
            ))}
          </motion.div>
        </div>
        <div className="py-32 px-8 text-center relative">
          {[...Array(12)].map((_, i) => (
            <motion.div key={i} className="absolute rounded-full bg-[#C8A96E]"
              style={{ width: '2px', height: '2px', left: (i * 8.5) + '%', top: (20 + (i % 3) * 30) + '%', opacity: 0.2 }}
              animate={{ y: [0, -30, 0], opacity: [0.1, 0.4, 0.1] }}
              transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.3 }} />
          ))}
         <h2 className="text-4xl md:text-6xl lg:text-7xl font-light text-[#F5EDE3] leading-tight mb-16" style={{ fontFamily: "'Palatino Linotype', serif" }}>
  L'art de révéler <br />
 <motion.span
  className="text-[#C8A96E] block"
  initial={{ opacity: 0, x: 80 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }}
>
  ce que vous êtes
</motion.span>
</h2>
         
          <div className="flex items-center justify-center gap-8 md:gap-16">
            {['COUPER', 'SUBLIMER', 'TRANSFORMER'].map((mot, i) => (
              <motion.div key={i} className="flex items-center gap-8 md:gap-16">
                <motion.span
                  animate={{ opacity: [0.15, 1, 0.15], color: ['rgba(200,169,110,0.3)', '#C8A96E', 'rgba(200,169,110,0.3)'], textShadow: ['0 0 0px transparent', '0 0 30px rgba(200,169,110,0.6)', '0 0 0px transparent'] }}
                  transition={{ duration: 2, delay: i * 0.7, repeat: Infinity, repeatDelay: 1.5 }}
                   className="text-sm md:text-base tracking-[6px] uppercase font-light"
                  style={{ fontFamily: "'Palatino Linotype', serif" }}>
                  {mot}
                </motion.span>
                {i < 2 && <span className="text-[#C8A96E]/20 text-2xl">·</span>}
              </motion.div>
            ))}
          </div>
        </div>
        <div className="py-10 border-y border-[#C8A96E]/15 overflow-hidden">
          <motion.div animate={{ x: ['-50%', '0%'] }} transition={{ duration: 22, repeat: Infinity, ease: 'linear' }} className="flex whitespace-nowrap">
            {[...Array(2)].map((_, j) => (
              <span key={j} className="flex items-center">
                {['BALAYAGE', 'EXTENSIONS', 'BOTOX KÉRATINE', 'LISSAGE', 'COLORISTE', 'COUPE FEMME', 'BRUSHING', 'SOIN INTENSIF'].map((word, i) => (
                  <span key={i} className="flex items-center">
                    <span className="text-white/20 text-xs tracking-[6px] uppercase px-8">{word}</span>
                    <span className="text-white/10 text-lg">·</span>
                  </span>
                ))}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ SECTION PRESTATIONS ═══ */}
      <section className="relative bg-[#06050A] py-32 overflow-hidden">
        <RevealSection className="text-center mb-20 px-8">
          <p className="text-[#C8A96E] text-xs tracking-[6px] uppercase mb-4">Notre savoir-faire</p>
          <h2 className="text-5xl md:text-7xl font-light text-white" style={{ fontFamily: "'Palatino Linotype', serif" }}>
            Des prestations <em className="text-[#C8A96E]">d'exception</em>
          </h2>
        </RevealSection>
        <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-0 items-start">
          <div className="flex flex-col justify-center pr-0 md:pr-20 mb-16 md:mb-0">
            <div className="space-y-0">
              {prestations.map((p, i) => (
                <motion.div key={i} onClick={() => setActivePrestation(i)}
                  className={`py-7 border-b cursor-pointer transition-all duration-500 ${activePrestation === i ? 'border-[#C8A96E]/50' : 'border-white/8 hover:border-white/20'}`}
                  whileHover={{ x: 6 }}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-5">
                      <span className={`text-xs tracking-[2px] transition-colors duration-300 ${activePrestation === i ? 'text-[#C8A96E]' : 'text-white/25'}`}>{p.num}</span>
                      <h3 className={`text-xl md:text-2xl font-light tracking-wide transition-colors duration-300 ${activePrestation === i ? 'text-[#C8A96E]' : 'text-white/70'}`}
                        style={{ fontFamily: "'Palatino Linotype', serif" }}>
                        {p.title}
                      </h3>
                    </div>
                    <motion.span animate={{ rotate: activePrestation === i ? 45 : 0 }} transition={{ duration: 0.3 }}
                      className={`text-2xl transition-colors duration-300 ${activePrestation === i ? 'text-[#C8A96E]' : 'text-white/20'}`}>
                      +
                    </motion.span>
                  </div>
                  <AnimatePresence>
                    {activePrestation === i && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.4 }} className="overflow-hidden">
                        <p className="text-[#C8A96E]/70 text-xs tracking-[3px] uppercase mb-3 pl-9">{p.tag}</p>
                        <p className="text-white/55 text-sm leading-[1.9] pl-9 max-w-md">{p.desc}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
            <div className="mt-12">
              <a href="https://www.planity.com/fariale-sabeg-59790-ronchin" target="_blank" rel="noreferrer"
                className="inline-block px-10 py-3 border border-[#C8A96E] text-[#C8A96E] hover:bg-[#C8A96E] hover:text-black transition-all duration-300 text-xs tracking-[4px] uppercase">
                Prendre Rendez-vous
              </a>
            </div>
          </div>
          <RevealSection className="relative">
            <div className="sticky top-8 h-[75vh] rounded-sm overflow-hidden">
              <GlobalSlideshow />
            </div>
          </RevealSection>
        </div>
      </section>

            {/* ═══ L'UNIVERS ═══ */}
      <section id="univers" className="relative min-h-screen bg-[#0D0B08] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="/salon-coiffure.jpg" alt="Salon" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D0B08] via-[#0D0B08]/80 to-transparent" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-8 py-32 grid md:grid-cols-2 gap-20 items-center">
          <RevealSection>
            <p className="text-[#C8A96E] text-xs tracking-[4px] uppercase mb-6">L'Univers Fariale</p>
            <h2 className="text-5xl md:text-6xl font-light leading-tight mb-8 text-[#F5EDE3]" style={{ fontFamily: "'Palatino Linotype', serif" }}>
              Un espace où<br /><em style={{ color: '#C8A96E', fontStyle: 'italic' }}>chaque détail</em><br />est pensé pour vous
            </h2>
            <p className="text-white/60 text-lg leading-relaxed mb-10 max-w-md">
              Fariale Sabeg, c'est bien plus qu'un salon. C'est une expérience sensorielle unique — où l'art capillaire rencontre l'élégance d'un espace de vie.
            </p>
            <a href="https://www.planity.com/fariale-sabeg-59790-ronchin" target="_blank" rel="noreferrer"
              className="inline-block px-10 py-3 border border-[#C8A96E] text-[#C8A96E] hover:bg-[#C8A96E] hover:text-black transition-all duration-300 text-xs tracking-[3px] uppercase">
              Prendre Rendez-vous
            </a>
          </RevealSection>
          <div className="flex flex-col gap-8">
            {[
              { num: '01', title: 'Expertise', desc: 'Des années de maîtrise capillaire au service de votre beauté unique.' },
              { num: '02', title: 'Authenticité', desc: 'Une relation de confiance, une écoute sincère, un résultat qui vous ressemble.' },
              { num: '03', title: 'Luxe discret', desc: 'Un cadre raffiné, une carte de boissons soignée, une expérience mémorable.' },
            ].map((item, i) => (
              <RevealSection key={i}>
                <div className="flex gap-6 items-start border-b border-white/10 pb-8">
                  <span className="text-[#C8A96E]/40 text-4xl font-light" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{item.num}</span>
                  <div>
                    <h3 className="text-white text-lg tracking-[2px] mb-2 uppercase">{item.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>{/* ═══ SECTION BAR ═══ */}
      <section className="relative bg-[#0A0608] overflow-hidden">

        {/* Ligne défilante haut */}
        <div className="py-8 border-y border-white/5 overflow-hidden">
          <motion.div animate={{ x: ['0%', '-50%'] }} transition={{ duration: 25, repeat: Infinity, ease: 'linear' }} className="flex whitespace-nowrap">
            {[...Array(2)].map((_, j) => (
              <span key={j} className="flex items-center">
                {['CHAMPAGNE', 'VINS SÉLECTIONNÉS', 'SOFTS BIO', 'CAFÉ & THÉ', 'AMBIANCE UNIQUE', 'ART & SAVEURS', 'FARIALE SABEG'].map((word, i) => (
                  <span key={i} className="flex items-center">
                    <span className="text-white/15 text-xs tracking-[6px] uppercase px-8">{word}</span>
                    <span className="text-white/10 text-lg">·</span>
                  </span>
                ))}
              </span>
            ))}
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-8 py-32 grid md:grid-cols-2 gap-20 items-center">

          {/* Gauche — slideshow bar */}
          <RevealSection className="relative h-[70vh] overflow-hidden rounded-sm">
            <BarSlideshow />
          </RevealSection>

          {/* Droite — texte */}
          <RevealSection>
            <p className="text-white/30 text-xs tracking-[6px] uppercase mb-6">L'expérience en plus</p>
            <h2 className="text-5xl md:text-6xl font-light leading-tight mb-8 text-white"
              style={{ fontFamily: "'Palatino Linotype', serif" }}>
              Un verre.<br />
              <em className="text-[#C8A96E]">Une pause.</em><br />
              Un moment.
            </h2>
            <p className="text-white/50 text-lg leading-relaxed mb-8 max-w-md">
              Chez Fariale Sabeg, la beauté se vit à 360°. Pendant votre soin, laissez-vous porter par une sélection de champagnes, vins fins, softs bio et jus frais — servis dans un cadre unique, entouré d'œuvres d'art.
            </p>
            <p className="text-white/35 text-sm leading-relaxed mb-12 max-w-md">
              Café et thé offerts à chaque visite. Parce que prendre soin de vous, c'est aussi prendre le temps.
            </p>

            {/* Boissons */}
            <div className="space-y-3">
              {[
                { name: 'Champagne Étienne Oudart', type: 'Champagne' },
                { name: 'Petit Chablis · Silène · Grand Marennon', type: 'Vins' },
                { name: 'Anosteké Blonde 8°', type: 'Bière' },
                { name: 'Clean Soda Bio · Jus frais', type: 'Softs' },
                { name: 'Café · Thé', type: 'Offerts' },
              ].map((item, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center justify-between border-b border-white/8 pb-3">
                  <span className="text-white/60 text-sm">{item.name}</span>
                  <span className="text-[#C8A96E]/60 text-xs tracking-[2px] uppercase">{item.type}</span>
                </motion.div>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>


      {/* === SECTION NOS PRODUITS === */}
<section className="relative w-full h-[600px] overflow-hidden flex items-center justify-center">
  <img
    src="/produits.jpeg"
    alt="Gamme Fariale Sabeg"
    className="absolute inset-0 w-full h-full object-cover object-center"
  />
  <div className="absolute inset-0 bg-black/50" />
  <div className="relative z-10 text-center px-6 flex flex-col items-center">
    <p className="text-[#C8A96E] text-xs tracking-[0.35em] uppercase mb-4"
      style={{ fontFamily: "'Cormorant Garamond', serif" }}>
      Coiffure Fariale Sabeg
    </p>
    <h2 className="text-white font-light leading-tight mb-4"
      style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(44px, 7vw, 88px)" }}>
      Notre <em className="italic text-[#C8A96E]">gamme</em>
    </h2>
    <p className="text-white/60 text-lg mb-10 tracking-wider"
      style={{ fontFamily: "'Cormorant Garamond', serif" }}>
      Des soins pensés par des professionnels
    </p>
    <a href="/boutique"
      className="inline-block px-12 py-4 bg-[#C8A96E] text-black text-sm tracking-[0.25em] uppercase rounded-full hover:bg-[#b8945a] hover:scale-105 transition-all duration-300"
      style={{ fontFamily: "'Cormorant Garamond', serif" }}>
      Voir la boutique
    </a>
  </div>
</section>

   


      {/* === NOTRE SALON === */}
<div className="w-full h-px bg-[#C8A96E]/20" /><a href="/salon" className="block relative h-[70vh] overflow-hidden group cursor-pointer">
  <motion.div
    initial={{ scale: 1 }}
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    className="w-full h-full">
    <img src="/FARIALEhair.jpeg" alt="Notre Salon" className="w-full h-full object-cover" />
  </motion.div>
  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/55 transition-all duration-500" />
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="absolute inset-0 flex flex-col items-center justify-center text-center">
    <h2 className="text-white font-light text-6xl md:text-8xl mb-4"
      style={{ fontFamily: "'Cormorant Garamond', serif" }}>
      Notre <span className="italic">Salon</span>
    </h2>
    <div className="w-12 h-px bg-[#C8A96E] mb-4 group-hover:w-24 transition-all duration-500" />
    <p className="text-white/60 text-sm tracking-[0.3em] uppercase">28 Rue Lavoisier · Ronchin</p>
  </motion.div>
</a>

{/* === STATS ANIMÉES === */}
<section className="bg-[#080808] py-20 px-8 border-t border-[#C8A96E]/10">
  <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
    {[
  { value: 4.9, suffix: '/5', label: 'NOTE GOOGLE' },
{ value: 60, suffix: ' avis', label: 'AVIS GOOGLE' },
{ value: 5.0, suffix: '/5', label: 'NOTE PLANITY' },
{ value: 128, suffix: ' avis', label: 'AVIS PLANITY' },
    ].map((stat, i) => (
      <motion.div key={i}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: i * 0.15 }}
        viewport={{ once: true }}>
        <div className="text-4xl md:text-5xl font-light text-[#C8A96E] mb-3"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          {stat.value}<span className="text-2xl">{stat.suffix}</span>
        </div>
        <p className="text-white/40 text-xs tracking-[0.4em]">{stat.label}</p>
      </motion.div>
    ))}
  </div>
</section>

  </main>
  );
}