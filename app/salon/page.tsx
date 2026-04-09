"use client";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState } from "react";

export default function Salon() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const videoScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);

  return (
    <main ref={containerRef} className="bg-[#050403] text-white overflow-hidden">

      {/* VIDEO FOND */}
      <div className="fixed inset-0 z-0">
        <motion.video
          autoPlay loop muted playsInline
          style={{ scale: videoScale }}
          className="w-full h-full object-cover"
        >
          <source src="/salon-video.mp4" type="video/mp4" />
        </motion.video>
        <div className="absolute inset-0 bg-[#050403]/65" />
      </div>

      <div className="relative z-10">

        {/* HERO */}
        <section className="min-h-screen flex flex-col items-center justify-center text-center px-8">

          <motion.p
            initial={{ opacity: 0, letterSpacing: "1em" }}
            animate={{ opacity: 1, letterSpacing: "0.4em" }}
            transition={{ duration: 2, delay: 0.3 }}
            className="text-[#C8A96E] text-xs uppercase mb-10"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Coiffure · Ronchin · Depuis 2014
          </motion.p>

          {/* TITRE SHIMMER */}
        <div className="mb-10 flex justify-center">
  {"Le Salon".split("").map((char, i) => (
    <motion.span
      key={i}
      initial={{ opacity: 0, y: -80, rotateX: -90 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{
        duration: 0.7,
        delay: 0.5 + i * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "clamp(80px, 20vw, 240px)",
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
            transition={{ duration: 1, delay: 1.2 }}
            className="text-white/60 text-2xl max-w-xl leading-relaxed"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Un espace où l'art capillaire rencontre l'élégance —
            dédié aux <span className="text-[#C8A96E]">femmes</span> et aux <span className="text-[#C8A96E]">hommes</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            className="absolute bottom-10 flex flex-col items-center gap-2"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-px h-16 bg-gradient-to-b from-[#C8A96E] to-transparent"
            />
          </motion.div>
        </section>

        {/* DESCRIPTION + BAR */}
        <section className="py-40 px-8">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="border-l-2 border-[#C8A96E] pl-12 mb-24"
            >
              <p
                className="text-[#F5EDE3] font-light leading-relaxed mb-10"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(22px, 2.5vw, 34px)",
                }}
              >
                Fariale Sabeg, c'est bien plus qu'un salon. C'est une{" "}
                <em className="italic text-[#C8A96E]">expérience sensorielle</em> unique —
                où l'art capillaire rencontre l'élégance d'un espace de vie.
                Diagnostic personnalisé, écoute sincère, résultat qui vous ressemble.
              </p>
              <p
                className="text-[#C8A96E]/80 font-light leading-relaxed"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(18px, 2vw, 26px)",
                }}
              >
                🥂 Le Bar — Champagnes, vins sélectionnés, softs bio · Café et thé offerts
              </p>
            </motion.div>
          </div>
        </section>

        {/* INFOS STYLE CARTE */}
<section className="py-20 px-8">
  <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">

    {/* CARTE GAUCHE — PHOTO + INFOS */}
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="bg-[#0d0b08]/85 backdrop-blur-sm border border-[#C8A96E]/25 overflow-hidden"
    >
      <div className="relative h-72 overflow-hidden group">
        <img
          src="/facade.jpg"
          alt="Fariale Sabeg"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0b08] via-transparent to-transparent" />
      </div>

      <div className="p-10">
        <h3
          className="text-[#F5EDE3] mb-8"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "32px",
            fontWeight: 300,
            letterSpacing: "0.05em",
          }}
        >
          Fariale <span className="italic text-[#C8A96E]">Sabeg</span>
        </h3>

        <div className="space-y-5 mb-10">
          <div className="flex items-start gap-4">
            <span className="text-[#C8A96E] mt-1">📍</span>
            <div>
              <p className="text-[#F5EDE3] text-lg font-light"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                28 Rue Lavoisier<br />59790 Ronchin
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[#C8A96E]">📞</span>
            
            <a href="tel:+33981402573"
  className="text-[#F5EDE3] text-lg font-light hover:text-[#C8A96E] transition-colors"
  style={{ fontFamily: "'Cormorant Garamond', serif" }}
>
  09 81 40 25 73
</a>
          </div>
        </div>

        
          <a href="https://www.planity.com/fariale-sabeg-59790-ronchin"
          target="_blank"
          rel="noreferrer"
          className="inline-block w-full text-center py-5 border border-[#C8A96E] text-[#C8A96E] text-sm tracking-[0.25em] uppercase hover:bg-[#C8A96E] hover:text-black transition-all duration-300"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Prendre Rendez-vous
        </a>
      </div>
    </motion.div>

    {/* CARTE DROITE — HORAIRES */}
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.15 }}
      viewport={{ once: true }}
      className="bg-[#0d0b08]/85 backdrop-blur-sm border border-[#C8A96E]/25 p-10 flex flex-col justify-center"
    >
      <p
        className="text-[#C8A96E] text-xs tracking-[0.35em] uppercase mb-10"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        Horaires d'ouverture
      </p>

      <div className="space-y-2">
        {[
          { j: "Mardi — Vendredi", h: "09:30 – 18:30" },
          { j: "Jeudi", h: "09:30 – 21:00" },
          { j: "Samedi", h: "09:00 – 17:30" },
          { j: "Dimanche & Lundi", h: "Fermé" },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            viewport={{ once: true }}
            className="flex justify-between items-center py-5 border-b border-[#C8A96E]/15"
          >
            <span
              className="text-[#F5EDE3] font-light"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px" }}
            >
              {item.j}
            </span>
            <span
              className={`font-light ${item.h === "Fermé" ? "text-white/25" : "text-[#C8A96E]"}`}
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px" }}
            >
              {item.h}
            </span>
          </motion.div>
        ))}
      </div>

      
    </motion.div>

  </div>
</section>
        {/* HORAIRES */}
        

        {/* PHOTO FACADE */}
        <section className="py-16 px-8">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="relative overflow-hidden group"
            >
              <img
                src="/facade.jpg"
                alt="Façade Fariale Sabeg"
                className="w-full object-cover h-[500px] group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050403] via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8">
                <p className="text-[#C8A96E] text-xs tracking-[0.3em] uppercase mb-2"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  Nous trouver
                </p>
                <p className="text-[#F5EDE3] text-2xl font-light"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  28 Rue Lavoisier, 59790 Ronchin
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA RDV */}
        

      </div>
    </main>
  );
}

function MagneticCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-100, 100], [4, -4]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-4, 4]), { stiffness: 300, damping: 30 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="p-10 border border-[#C8A96E]/20 bg-[#0d0b08]/80 backdrop-blur-sm hover:border-[#C8A96E]/60 transition-colors duration-500 cursor-default"
    >
      {children}
    </motion.div>
  );
}