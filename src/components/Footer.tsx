// Footer component with copyright and background
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiArrowUp } from 'react-icons/fi';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [hovered, setHovered] = useState(false);
  
  const handleBackToTop = () => {
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      // fallback
      window.scrollTo(0, 0);
    }
  };
  
  // Timing helpers
  const ease = [0.22, 1, 0.36, 1] as const;
  
  return (
    <footer className=" bg-black text-white h-[100vh]">
      <section className="max-w-6xl mx-auto px-4 py-24 sm:py-28 md:py-32 text-center">
        {/* Center CTA Circle */}
        <div className="flex items-center justify-center">
          <motion.a
            href="https://wa.me/+201200745033"
            target='_blank'
            aria-label="Let's Talk"
            className="group relative rounded-full w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 overflow-hidden flex items-center justify-center select-none bg-black"
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onTapStart={() => setHovered(true)}
            onTapCancel={() => setHovered(false)}
            onTap={() => setHovered(false)}
          >
            {/* Outer concentric rings (ensure visible and above hover bg) */}
            <div
              className="pointer-events-none absolute inset-0 rounded-full border-2 border-white/90 z-40 drop-shadow-[0_0_6px_rgba(255,255,255,0.25)]"
              style={{ transform: 'translateZ(0)' }}
            />
            <div
              className="pointer-events-none absolute rounded-full border border-white/60 z-30"
              style={{ inset: '10px', transform: 'translateZ(0)' }}
            />

            {/* Large circular white background (centered) */}
            <motion.div
              className="absolute inset-0 m-auto rounded-full bg-white"
              style={{ zIndex: 10, width: '85%', height: '85%' }}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={hovered ? { opacity: 1, scale: 0.7 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8, ease }}
            />

            {/* Label */}
            <span className="relative z-10 inline-flex items-center justify-center px-6 py-3">
              <motion.span
                initial={{ color: '#ffffff' }}
                animate={hovered ? { color: '#000000', transition: { delay: 0.12, duration: 0.25, ease } } : { color: '#ffffff' }}
                className="relative z-10 text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight"
              >
                Let's Talk
              </motion.span>
            </span>
          </motion.a>
        </div>

        {/* Email */}
        <div className="mt-10 sm:mt-12">
          <a
            href="mailto:Youssefhamad007@gmail.com"
            className="text-white  text-sm sm:text-base md:text-6xl "
          >
            Youssefhamad007@gmail.com
          </a>
        </div>

        {/* Social Icons Row */}
        <div className="mt-10 sm:mt-12 flex items-center justify-center gap-4 sm:gap-6">
          {[
            { name: 'GitHub', href: 'https://github.com/youssefhamad007', color: '#ffffff', Icon: FaGithub },
            { name: 'LinkedIn', href: 'https://www.linkedin.com/in/youssef-hamad-uxui', color: '#0A66C2', Icon: FaLinkedin },
            {
              name: 'Gmail',
              href: 'mailto:Youssefhamad007@gmail.com',
              color: '#EA4335',
              Icon: SiGmail,
              bg: 'conic-gradient(from 45deg, #EA4335 0% 25%, #FBBC05 25% 50%, #34A853 50% 75%, #4285F4 75% 100%)'
            },
            {
              name: 'Instagram',
              href: 'https://www.instagram.com/youssif_hamad?igsh=cnEyYzNKOHNnajJI',
              color: '#E4405F',
              Icon: FaInstagram,
              bg: 'linear-gradient(135deg, #feda75 0%, #fa7e1e 25%, #d62976 50%, #962fbf 75%, #4f5bd5 100%)'
            },
          ].map(({ name, href, color, Icon, bg }) => (
            <a
              key={name}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              aria-label={name}
              className="group relative w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-white/25 flex items-center justify-center overflow-hidden"
              style={{ color }}
            >
              {/* Animated background that scales in on hover, using the brand color */}
              <span
                className="absolute inset-0 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-300 ease-out"
                style={{ background: bg ?? color, zIndex: 1 }}
                aria-hidden
              />
              <Icon className="relative z-10 text-[20px] sm:text-[22px] transition-colors duration-300 group-hover:text-black" />
            </a>
          ))}
        </div>

        {/* Back to top */}
        <div className="mt-8 sm:mt-10">
          <motion.button
            type="button"
            onClick={handleBackToTop}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-white/90 hover:text-white hover:border-white/40 transition-colors"
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
          >
            <motion.span
              animate={{ y: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
              className="inline-flex"
              aria-hidden
            >
              <FiArrowUp />
            </motion.span>
            <span>Back to top</span>
          </motion.button>
        </div>

        {/* Copyright (subtle) */}
        <div className="mt-10 text-xs text-white/40">&copy; {currentYear} Desined And Built by Youssef Hamad</div>
      </section>
    </footer>
  );
}