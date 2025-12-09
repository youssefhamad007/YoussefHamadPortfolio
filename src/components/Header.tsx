import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import bg2p from '/assets/bg2p.webp';
import bg2 from '/assets/bg2.webm';
import bg3p from '/assets/bg3p.webp';
import bg3 from '/assets/bg3.webm';
import bg4p from '/assets/bg4p.webp';
import bg4 from '/assets/bg4.webm';
import ethereal from '/assets/Ethereal Abstract Flower.webp';
import etherealVideo from '/assets/Sep_27__0626_32s_202509270641_kktxa.webm';
import profilephoto from '/assets/profile-photo.webp';

import React from 'react'


const Header = () => {
  type Media = { image: string; video: string };
  // Define multiple media sets (video + matching photo). Replace paths for variety.
  const mediaSets: Media[] = [
    {
      image: bg2p,
      video: bg2,
    },
    {
      image: bg3p,
      video: bg3,
    },
    {
      image: bg4p,
      video: bg4,
    },
    {
      image: ethereal,
      video: etherealVideo,
    },
  ];
  // Deterministic cycling using a simple LAST pointer.
  // Advance ONLY on real page refresh; keep the same selection on SPA route changes.
  const LAST_KEY = 'heroMediaLastV2';
  const isHardReload = (() => {
    try {
      // Ignore route change markers completely

      // Standard navigation type checks
      const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
      if (nav && 'type' in nav) {
        return nav.type === 'reload';
      }
      // Legacy fallback
      if (performance && performance.navigation) {
        return performance.navigation.type === 1; // 1 = reload
      }
      return false;
    } catch (e) {
      console.error('Navigation check error:', e);
      return false;
    }
  })();
  const pool = mediaSets.slice(0, 4);
  const getInitialIdx = (): number => {
    try {
      const last = localStorage.getItem(LAST_KEY) || '';
      const lastIdx = pool.findIndex(m => m.video === last);
      // Only advance to next when the page is actually reloaded
      if (lastIdx >= 0) {
        return isHardReload ? (lastIdx + 1) % pool.length : lastIdx;
      }
      return 0;
    } catch { return 0; }
  };
  const initialIdx = getInitialIdx();
  const initialChoiceRef = useRef<Media | null>(null);
  if (!initialChoiceRef.current) initialChoiceRef.current = pool[initialIdx];
  // Media selection that ONLY changes on hard refresh
  const [selectedVideo, setSelectedVideo] = useState<Media>(() => {
    // Check if we have a saved background from previous session
    if (!isHardReload) {
      // If not a hard reload, try to get the saved background from localStorage
      const saved = localStorage.getItem('current-background');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (pool.some(m => m.video === parsed.video)) {
            return parsed;
          }
        } catch (e) {
          console.warn('Failed to parse saved background', e);
        }
      }
    }

    // On hard reload or if no saved background, use the cycling logic
    return pool[getInitialIdx()];
  });

  // Save to localStorage whenever selection changes (persists across sessions)
  useEffect(() => {
    localStorage.setItem('current-background', JSON.stringify(selectedVideo));
  }, [selectedVideo]);
  // Displayed image updates after scroll-to-top on selection
  const [displayedImage, setDisplayedImage] = useState<string>(initialChoiceRef.current.image);
  // After mount, persist the chosen as LAST (idempotent even under StrictMode/HMR)
  useEffect(() => {
    try { localStorage.setItem(LAST_KEY, initialChoiceRef.current!.video); } catch (e) { /* ignore */ }
  }, []);
  const heroContainerRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [isHeroAnimationComplete, setIsHeroAnimationComplete] = useState(false);

  // Motion values for manual scroll control
  const heroProgress = useMotionValue(0);
  const smoothProgress = useSpring(heroProgress, { stiffness: 200, damping: 20 });

  // Transform values based on hero animation progress
  const photoScale = useTransform(smoothProgress, [0, 1], [1.1, 0.8]);
  const backgroundOpacity = useTransform(smoothProgress, [0, 0.8], [1, 1]);
  // Text transforms - match video shrinking timing exactly
  const textOpacity = useTransform(smoothProgress, [0, 0.8], [1, 0]);
  const textScale = useTransform(smoothProgress, [0, 0.15, 0.3, 0.5, 0.7], [1, 0.95, 0.85, 0.75, 0.7]);
  const textY = useTransform(smoothProgress, [0, 0.15, 0.3, 0.5, 0.7], [0, 20, 40, 60, 80]);
  const textX = useTransform(smoothProgress, [0, 0.15, 0.3, 0.5, 0.7], [0, 0, 0, 0, 0]);
  // Padding and margin scaling
  const paddingScale = useTransform(smoothProgress, [0, 0.15, 0.3, 0.5, 0.7], [1, 0.95, 0.85, 0.75, 0.7]);
  const marginScale = useTransform(smoothProgress, [0, 0.15, 0.3, 0.5, 0.7], [1, 0.95, 0.85, 0.75, 0.7]);
  const colorfulBgOpacity = useTransform(smoothProgress, [0, 1], [0, 0]);
  // Keep background visible from the start and do not fade the video; it only shrinks
  const videoOpacity = useTransform(smoothProgress, [0, 1], [1, 1]);

  // Video continuously shrinks (no fade), stays centered
  const videoScale = useTransform(smoothProgress, [0, 0.15, 0.3, 0.5, 0.7], [1, 0.95, 0.85, 0.75, 0.7]);
  const videoBorderRadius = useTransform(smoothProgress, [0, 0.1, 0.25, 0.4, 0.6, 0.7], ['0%', '8px', '16px', '24px', '32px', '40px']);
  const videoY = useTransform(smoothProgress, [0, 0.15, 0.3, 0.5, 0.7], [0, 0, 0, 0, 0]);
  const videoX = useTransform(smoothProgress, [0, 0.15, 0.3, 0.5, 0.7], [0, 0, 0, 0, 0]);
  const videoWidth = useTransform(smoothProgress, [0, 0.1, 0.25, 0.4, 0.7, 1], ['100%', '95%', '85%', '75%', '65%', '10%']);
  const videoHeight = useTransform(smoothProgress, [0, 0.1, 0.25, 0.4, 0.7, 1], ['100%', '90%', '75%', '65%', '35%', '10%']);
  // Fade out the main centered video near the end (slightly earlier) to overlap with selector fade-in
  const mainVideoEndFade = useTransform(smoothProgress, [0.82, 0.98], [1, 0]);

  // Load and play hero video ONLY when in view for performance
  const videoElRef = useRef<HTMLVideoElement | null>(null);
  const [shouldLoadHero, setShouldLoadHero] = useState<boolean>(false);
  // Gate to avoid flip-flopping: once we enter switcher phase, keep video unloaded until we go back near top
  const switcherGateRef = useRef<'top' | 'switcher'>('top');
  useEffect(() => {
    const el = videoElRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (switcherGateRef.current === 'top') {
          setShouldLoadHero(true);
          // try play when visible
          el.play().catch(() => { });
        } else {
          // In switcher phase, ensure it's paused/unloaded
          el.pause();
        }
      } else {
        el.pause();
      }
    }, { threshold: 0.2 });
    obs.observe(el);
    // Initial check (in case already in view on mount)
    try {
      const rect = el.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (inView) setShouldLoadHero(true);
    } catch (e) { /* ignore */ }
    return () => obs.disconnect();
  }, [selectedVideo.video]);

  // Also pause/resume once we enter/leave the switcher phase (before the section ends)
  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (v) => {
      const el = videoElRef.current;
      // Use hysteresis to avoid flicker: enter switcher at 0.75, leave at 0.3
      if (switcherGateRef.current === 'top' && v >= 0.75) {
        switcherGateRef.current = 'switcher';
        if (el) el.pause();
      } else if (switcherGateRef.current === 'switcher' && v <= 0.3) {
        switcherGateRef.current = 'top';
        // After re-enabling load, attempt to play if the element is in view
        Promise.resolve().then(() => {
          const el2 = videoElRef.current;
          if (!el2) return;
          try {
            const rect = el2.getBoundingClientRect();
            const inView = rect.top < window.innerHeight && rect.bottom > 0;
            if (inView) el2.play().catch(() => { });
          } catch (e) { /* ignore */ }
        });
      }
    });
    return () => unsubscribe();
  }, [smoothProgress]);

  // Responsive end targets for hero text so animation lands in the right place across breakpoints
  const [vw, setVw] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 1280);
  useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const isSm = vw < 640;
  const isMd = vw >= 768 && vw < 500;
  const isLg = vw >= 1024 && vw < 1280;
  // End positions tuned per breakpoint to align with shrunken video center
  const endTopX = isSm ? '16vw' : isMd ? '28vw' : isLg ? '34vw' : '15vw';
  const endTopY = isSm ? '8vh' : isMd ? '10vh' : isLg ? '12vh' : '14vh';
  const endBottomX = isSm ? '-6vw' : isMd ? '-10vw' : isLg ? '0vw' : '0vw';
  const endBottomY = isSm ? '-10vh' : isMd ? '-34vh' : isLg ? '0vh' : '-40vh';

  // Additional transforms: bring top and bottom text toward center as we scroll
  // Top block starts top-left; nudge it toward center
  const topTextX = useTransform(smoothProgress, [0, 0.7, 1], ['0vw', endTopX, endTopX]);
  const topTextY = useTransform(smoothProgress, [0, 0.7, 1], ['0vh', '12vh', endTopY]);
  // Bottom group starts lower and split; move it upward and inward towards center
  const bottomTextX = useTransform(smoothProgress, [0, 0.7, 1], ['0vw', endBottomX, endBottomX]);
  const bottomTextY = useTransform(smoothProgress, [0, 0.7, 1], ['0vh', endBottomY, endBottomY]);

  // Spacing reductions (padding/margin) while scrolling
  // Top block padding-top reduces
  const topPaddingT = useTransform(smoothProgress, [0, 1], [24, 8]); // px
  // "freedoms" line left margin reduces
  const freedomsML = useTransform(smoothProgress, [0, 1], [120, 8]); // px
  // Bottom desktop row gap reduces
  const bottomRowGap = useTransform(smoothProgress, [0, 1], [40, 12]); // px (2.5rem -> 0.75rem)
  // Left description padding-right reduces
  const bottomLeftPR = useTransform(smoothProgress, [0, 1], [32, 8]); // px
  // Right block margin-right reduces
  const bottomRightMR = useTransform(smoothProgress, [0, 1], [-30, 15]); // px
  // "imagination" line extra padding-right reduces
  const imaginationPR = useTransform(smoothProgress, [0, 1], [80, 8]); // px

  // Selector overlay motion: appears as hero nears completion (earlier to create overlap)
  const selectorOpacity = useTransform(smoothProgress, [0.8, 0.98], [0, 1]);
  const selectorScale = useTransform(smoothProgress, [0.8, 0.98], [0.98, 1]);
  // Only allow interaction when sufficiently visible
  const [selectorInteractive, setSelectorInteractive] = useState(false);
  useEffect(() => {
    const unsub = smoothProgress.on("change", (v) => {
      // Enable when we're well into the selector reveal; disable otherwise
      setSelectorInteractive(v >= 0.9);
    });
    return () => unsub();
  }, [smoothProgress]);

  // Use a stable list order to avoid DOM node churn when selection changes
  const allMedia: Media[] = mediaSets.slice(0, 4);

  // Robust smooth scroll to top using requestAnimationFrame (works across browsers)
  const smoothScrollToTop = (duration = 800): Promise<void> => {
    return new Promise((resolve) => {
      const startY = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
      if (startY <= 2) { resolve(); return; }
      const startTime = performance.now();
      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
      const step = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / duration);
        const eased = easeOutCubic(progress);
        const nextY = Math.round(startY * (1 - eased));
        window.scrollTo(0, nextY);
        if (progress < 1) requestAnimationFrame(step);
        else resolve();
      };
      requestAnimationFrame(step);
    });
  };

  // Handle selection: swap video, then smooth scroll to top, then swap background image
  const handleSelect = async (media: Media) => {
    if (isDuringRouteChange) {
      setSelectedVideo(media);
      setDisplayedImage(media.image);
      return;
    }

    // Original animation logic for manual selections
    setSelectedVideo(media);
    await smoothScrollToTop(900);
    setDisplayedImage(media.image);
  };

  // Drive hero animation by scroll progress within the hero container (pinned via sticky)
  // The container is taller (e.g., ~200vh), while the hero content is sticky (top:0, h-screen).
  const { scrollYProgress: heroSectionProgress } = useScroll({ target: heroContainerRef, offset: ["start start", "end start"] });

  useEffect(() => {
    const unsub = heroSectionProgress.on("change", (v) => {
      // Remap so hero finishes by ~60% of the container scroll for a faster feel
      const span = 0.3; // portion of container scroll used for hero anim
      const mapped = Math.max(0, Math.min(1, v / span));
      heroProgress.set(mapped);
      setIsHeroAnimationComplete(mapped >= 1);
    });
    return () => { unsub(); };
  }, [heroSectionProgress, heroProgress]);

  const [isDuringRouteChange, setIsDuringRouteChange] = useState(false);

  // Detect route changes - preserve small screen implementation
  useEffect(() => {
    const handleRouteChange = () => {
      const isRouteChange = sessionStorage.getItem('route-change') === 'true';
      setIsDuringRouteChange(isRouteChange);
      if (isRouteChange) {
        // For small screens, we want to keep the route change marker
        // This ensures the handleSelect function uses the simplified path
        const isMobileView = window.innerWidth < 768;
        if (!isMobileView) {
          sessionStorage.removeItem('route-change');
        }
      }
    };

    handleRouteChange();
    window.addEventListener('storage', handleRouteChange);
    window.addEventListener('resize', handleRouteChange);
    return () => {
      window.removeEventListener('storage', handleRouteChange);
      window.removeEventListener('resize', handleRouteChange);
    };
  }, []);

  return (
    <>
      {/* Hero Section - pinned (sticky) until animation finishes */}
      <section ref={heroContainerRef} id="hero" className="relative min-h-[160vh]">
        <div ref={heroRef} className="sticky top-0 h-screen overflow-hidden">
          {/* Underlay Image Layer revealed on scroll (replacing video.mp4) */}
          <motion.div className="absolute inset-0 z-[1] overflow-hidden " style={{ opacity: videoOpacity }}>
            <img
              src={displayedImage}
              alt="Black Flower Close-Up"
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </motion.div>

          <motion.div className="absolute inset-0 z-[2]" style={{ opacity: backgroundOpacity }}>
            {/* Video container - shrinks with animation */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={false}
            >
              <motion.div
                style={{
                  scale: videoScale,
                  borderRadius: videoBorderRadius,
                  y: videoY,
                  x: videoX,
                  width: videoWidth,
                  height: videoHeight,
                  opacity: mainVideoEndFade,
                  transformOrigin: 'center center',
                  willChange: 'transform, opacity'
                }}
                className="overflow-hidden relative bg-black"
                initial={false}
              >
                <video
                  key={selectedVideo.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  ref={videoElRef}
                  preload={'metadata'}

                  className="w-full h-full object-cover bg-black"
                  style={{ backfaceVisibility: 'hidden', transform: 'translateZ(0)', willChange: 'transform, opacity' }}
                >
                  <source src={selectedVideo.video} type="video/webm" />
                  Your browser does not support the video tag.
                </video>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            className="absolute inset-0 z-[3]"
            style={{ opacity: colorfulBgOpacity }}
          />

          {/* Media selector overlay - shows a 4-item row: selected video + other options */}
          <motion.div
            className={`absolute inset-0 z-[5] ${selectorInteractive ? 'pointer-events-auto' : 'pointer-events-none'}`}
            initial={false}
            style={{ opacity: selectorOpacity, scale: selectorScale, willChange: 'opacity, transform' }}
          >
            <div className="w-full h-full flex items-center justify-center px-4">
              {/* Container centered near the shrunken video position */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 place-items-center w-full max-w-[980px]">
                {allMedia.map((m) => {
                  const isActive = m.video === selectedVideo.video;
                  return (
                    <motion.button
                      key={m.video}
                      tabIndex={selectorInteractive ? 0 : -1}
                      whileHover={!isActive ? { scale: 1.05 } : undefined}
                      whileTap={!isActive ? { scale: 0.98 } : undefined}
                      className={
                        `focus:outline-none rounded-xl overflow-hidden shadow-[0_10px_24px_rgba(0,0,0,0.35)] ` +
                        (isActive ? 'pointer-events-none border border-white/20' : `${selectorInteractive ? 'pointer-events-auto' : 'pointer-events-none'} border border-white/10`)
                      }
                      style={isActive ? { scale: 1.06 } : undefined}
                      onClick={!isActive ? () => handleSelect(m) : undefined}
                      aria-pressed={isActive}
                      aria-hidden={!selectorInteractive}
                      aria-label={isActive ? 'Current background' : 'Choose background'}
                      disabled={isActive}
                    >
                      <div className="w-[38vw] sm:w-[32vw] md:w-[20vw] lg:w-[16vw] max-w-[220px] min-w-[120px] aspect-video relative bg-black">
                        <img src={m.image} alt="Preview" loading='lazy' className="absolute inset-0 w-full h-full object-cover" />
                        {!isActive && <div className="absolute inset-0 bg-black/20" />}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="relative z-[3] h-full mx-auto px-4 sm:px-6 md:px-10 lg:px-20 lg:py-20"
            style={{
              opacity: textOpacity,
              scale: textScale,
              y: textY,
              x: textX,
              transformOrigin: 'center center'
            }}
          >
            {/* Flex layout: top block and bottom row with space-between */}
            <div className="flex h-full flex-col">
              {/* Top-left: New / freedoms */}
              <motion.div
                className="pt-6 sm:pt-8 md:pt-16 lg:pt-20  text-white select-none"
                style={{ scale: paddingScale, transformOrigin: 'left top', x: topTextX, y: topTextY, paddingTop: topPaddingT }}
              >
                {/* Mobile variant */}
                <div className="block md:hidden">
                  <div className="mt-12 sm:mt-16 lg:mt-0 xl:mt-10 font-extrabold tracking-tight leading-tight text-[clamp(2rem,10vw,6rem)] drop-shadow-[0_6px_24px_rgba(0,0,0,0.35)]">Youssef</div>
                  <motion.div
                    className="mt-1 sm:mt-2 ml-1 sm:ml-12 font-serif italic leading-tight text-[clamp(1.5rem,7vw,3rem)] opacity-90 drop-shadow-[0_6px_24px_rgba(0,0,0,0.35)]"
                    style={{ scale: marginScale, transformOrigin: 'left center' }}
                  >
                    Ahmed Hamad
                  </motion.div>
                </div>

                {/* Desktop and up variant */}
                <div className="hidden md:block">
                  <div className="mt-12 sm:mt-16 md:mt-[100px] lg:mt-0 xl:mt-10 font-extrabold tracking-tight leading-tight text-[clamp(2rem,8vw,7rem)] drop-shadow-[0_6px_24px_rgba(0,0,0,0.35)]">Youssef</div>
                  <motion.div
                    className="mt-1 sm:mt-2 ml-1 sm:ml-12 md:ml-16 lg:ml-20 font-serif italic leading-tight text-[clamp(1.75rem,6.5vw,4.5rem)] opacity-90 drop-shadow-[0_6px_24px_rgba(0,0,0,0.35)]"
                    style={{ scale: marginScale, transformOrigin: 'left center', marginLeft: freedomsML }}
                  >
                    Ahmed Hamad
                  </motion.div>
                </div>
              </motion.div>

              {/* Mobile: Stack vertically, Desktop: Side by side */}
              <motion.div
                className="mt-[50px] sm:mt-[50px] md:mt-[300px] lg:mt-[250px] xl:mt-[250px]"
                style={{ scale: marginScale, transformOrigin: 'center top', x: bottomTextX, y: bottomTextY }}
              >
                {/* Mobile and small tablet: Stacked layout */}
                <motion.div
                  className="block md:hidden space-y-16 "
                  style={{ scale: paddingScale, transformOrigin: 'center top' }}
                >

                  {/* Mobile and small tablet: Stacked layout */}
                  {/* "of imagination" text - mobile stacked FIRST */}
                  <div className="text-white select-none flex flex-col items-end px-4">
                    <div className="font-serif italic leading-tight text-[clamp(1.5rem,7vw,2.5rem)] opacity-95 drop-shadow-[0_10px_32px_rgba(0,0,0,0.45)]">
                      Front-End
                    </div>
                    <div className="font-serif italic leading-tight text-[clamp(1.5rem,7vw,2.5rem)] opacity-95 drop-shadow-[0_10px_32px_rgba(0,0,0,0.45)]">
                      React Developer
                    </div>
                  </div>

                  {/* Description paragraph - mobile stacked SECOND */}
                  <div className="text-white/85 select-none text-left px-4">
                    <p className="text-[clamp(0.8rem,3.6vw,2rem)] leading-relaxed">
                      <span className="font-semibold">I build modern, interactive, and responsive websites</span>
                      using React, JavaScript, and Framer Motion. Passionate about turning ideas into
                      seamless user experiences.
                    </p>
                  </div>
                </motion.div>

                {/* Desktop: Side by side layout */}
                <motion.div
                  className="hidden md:flex w-full items-end justify-between gap-6 lg:gap-10"
                  style={{ scale: paddingScale, transformOrigin: 'center bottom', gap: bottomRowGap }}
                >
                  <motion.div className="text-white/85 select-none text-left min-w-0 flex-1 pr-6 lg:pr-8 max-w-[35vw]"
                    style={{ paddingRight: bottomLeftPR }}
                  >
                    <p className="text-[clamp(0.95rem,2vw,2rem)] leading-relaxed">
                      <span className="font-semibold">I build modern, interactive, and responsive websites </span>
                      using React, JavaScript, and Framer Motion. Passionate about turning ideas into seamless user experiences.
                    </p>
                  </motion.div>

                  <motion.div className="text-white select-none flex-none mr-6 lg:mr-14 xl:mr-20 flex items-end flex-col"
                    style={{ marginRight: bottomRightMR }}
                  >
                    <div className="font-serif italic leading-tight text-[clamp(2.25rem,5.5vw,5rem)] opacity-95 drop-shadow-[0_10px_32px_rgba(0,0,0,0.45)]">
                      Front-End
                    </div>
                    <motion.div className="font-serif italic leading-tight text-[clamp(2.25rem,5.5vw,4rem)] opacity-95 drop-shadow-[0_10px_32px_rgba(0,0,0,0.45)] lg:pr-10"
                      style={{ paddingRight: imaginationPR }}
                    >
                      React Developer
                    </motion.div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="absolute inset-0 z-[4] flex items-end justify-center pl-40"
            style={{ scale: photoScale, transformOrigin: '50% 100%' }}
          >
            <img
              src={profilephoto}
              alt="Profile silhouette"
              loading='lazy'
              decoding='async'
              className="object-contain w-[100vw] max-w-[100vh] max-h-[32vh] sm:w-[75vw] sm:max-w-[100vw] sm:max-h-[32vh] md:w-auto md:max-w-[420px] md:max-h-[60vh] lg:max-w-[560px] lg:max-h-[68vh] xl:max-w-[45vw] "
            />
          </motion.div>
        </div>
      </section>
    </>
  )
};

export default Header