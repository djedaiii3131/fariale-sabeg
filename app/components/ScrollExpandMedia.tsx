'use client';

import { useState, ReactNode } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

interface ScrollExpandMediaProps {
  children?: ReactNode;
}

const ScrollExpandMedia = ({ children }: ScrollExpandMediaProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  const introScale = useTransform(scrollY, [0, 500], [1, 0], { clamp: true });
  const introOpacity = useTransform(scrollY, [0, 500], [1, 0], { clamp: true });
  const revealScale = useTransform(scrollY, [0, 500], [0.8, 1], { clamp: true });
  const revealOpacity = useTransform(scrollY, [0, 500], [0, 1], { clamp: true });
  const navOpacity = useTransform(scrollY, [300, 500], [0, 1], { clamp: true });
  const contentOpacity = useTransform(scrollY, [500, 900], [0, 1], { clamp: true });

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 300);
  });

  return (
    <div className="overflow-x-hidden">
      <section className="relative w-screen min-h-screen overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{ scale: introScale, opacity: introOpacity }}
        >
          <Image src="/bg-intro.jpg" alt="Intro background" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-black/10" />
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src="/logo.jpg"
              alt="Fariale Sabeg"
              width={250}
              height={250}
              className="object-contain animate-spin3d"
              style={{ mixBlendMode: 'screen' }}
            />
          </div>
        </motion.div>

        <motion.div
          className="absolute inset-0"
          style={{ scale: revealScale, opacity: revealOpacity }}
        >
          <Image src="/bg-fariale.jpg" alt="Reveal background" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-black/20" />
        </motion.div>

        <motion.div
          className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-8 py-5"
          style={{ opacity: navOpacity, pointerEvents: isScrolled ? 'auto' : 'none' }}
        >
          <div className="text-white text-sm font-semibold uppercase tracking-[4px]">Fariale Sabeg</div>
          <a
            href="https://www.planity.com/fariale-sabeg-59790-ronchin"
            target="_blank"
            rel="noreferrer"
            className="border border-white/70 text-white text-[10px] tracking-[2px] uppercase px-5 py-2.5 hover:bg-white hover:text-black transition-all"
          >
            Rendez-vous
          </a>
        </motion.div>
      </section>

      <motion.div className="relative z-10" style={{ opacity: contentOpacity }}>
        {children}
      </motion.div>
    </div>
  );
};

export default ScrollExpandMedia;
