'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { label: 'ACCUEIL', href: '/#cinematique' },
  { label: 'SALON', href: '/salon' },
  { label: 'PRODUITS', href: '/boutique' },
  { label: 'RÉSERVATION', href: 'https://www.planity.com/fariale-sabeg-59790-ronchin' },
];

export default function GlobalMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(!open)}
        className="fixed top-6 left-6 z-50 flex flex-col gap-1.5">
        <motion.div animate={{ rotate: open ? 45 : 0, y: open ? 8 : 0 }} className="w-6 h-0.5 bg-[#C8A96E]" />
        <motion.div animate={{ opacity: open ? 0 : 1 }} className="w-6 h-0.5 bg-[#C8A96E]" />
        <motion.div animate={{ rotate: open ? -45 : 0, y: open ? -8 : 0 }} className="w-6 h-0.5 bg-[#C8A96E]" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#0a0806] z-40 flex flex-col items-center justify-center gap-10">
            
            <button onClick={() => setOpen(false)}
              className="absolute top-6 right-6 text-[#C8A96E] hover:text-white transition text-3xl"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              ✕
            </button>

            {links.map((l, i) => (
              <motion.a key={i} href={l.href}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => setOpen(false)}
                className="text-[#F5EDE3] hover:text-[#C8A96E] transition text-2xl tracking-[0.4em]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                {l.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}