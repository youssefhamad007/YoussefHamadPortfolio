// Parallax Flying Posters with click-to-detail navigation
import { AnimatePresence, motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useMemo, useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import project1 from '/assets/placeholder-projects/project1.jpg';
import project1_2 from '/assets/placeholder-projects/project1-2.jpg';
import project1_3 from '/assets/placeholder-projects/project1-3.jpg';
import project1_4 from '/assets/placeholder-projects/project1-4.jpg';
import project1_5 from '/assets/placeholder-projects/project1-5.jpg';
import project1_6 from '/assets/placeholder-projects/project1-6.jpg';
import project2 from '/assets/placeholder-projects/project2.jpg';
import project2_2 from '/assets/placeholder-projects/project2-2.jpg';
import project2_3 from '/assets/placeholder-projects/project2-3.jpg';
import project2_4 from '/assets/placeholder-projects/project2-4.jpg';
import project2_5 from '/assets/placeholder-projects/project2-5.jpg';
import project2_6 from '/assets/placeholder-projects/project2-6.jpg';
import project3 from '/assets/placeholder-projects/project3.jpg';
import project3_2 from '/assets/placeholder-projects/project3-2.jpg';
import project3_3 from '/assets/placeholder-projects/project3-3.jpg';
import project3_4 from '/assets/placeholder-projects/project3-4.jpg';
import project4 from '/assets/placeholder-projects/project4.jpg';
import project4_2 from '/assets/placeholder-projects/project4-2.jpg';
import project4_3 from '/assets/placeholder-projects/project4-3.jpg';
import project4_4 from '/assets/placeholder-projects/project4-4.jpg';
import project5 from '/assets/placeholder-projects/project5.jpg';
import project5_2 from '/assets/placeholder-projects/project5-2.jpg';
import project5_3 from '/assets/placeholder-projects/project5-3.jpg';
import project5_4 from '/assets/placeholder-projects/project5-4.jpg';
import project6 from '/assets/placeholder-projects/project6.jpg';
import project6_2 from '/assets/placeholder-projects/project6-2.jpg';
import project6_3 from '/assets/placeholder-projects/project6-3.jpg';
import project6_4 from '/assets/placeholder-projects/project6-4.jpg';

interface EnhancedFlyingPostersProps {
  items?: string[];
  planeWidth?: number;
  planeHeight?: number;
  distortion?: number;
  scrollEase?: number;
  cameraFov?: number;
  cameraZ?: number;
}

interface ProjectData {
  id: number;
  image: string;
  title: string;
  description: string;
  techniques: string[];
  tools: string[];
  gallery: string[];
  demo:string[]
}

const projectsData: ProjectData[] = [
  {
    id: 1,
    image: project1,
    title: 'Movies4u',
    description: 'responsive React app for browsing and searching movies, showing details like title, release date, genre, and rating, with Tailwind CSS styling for a clean, modern UI.',
    techniques: ['React', 'Tailwind CSS', 'REST API Integration', 'JavaScript', 'Responsive','Client-side routing'],
    tools: ['Vite', 'axios', 'Git & GitHub','GitHub Pages','ESLint'],
    gallery: [project1, project1_2,project1_3,project1_4,project1_5,project1_6],
    demo: ['https://youssefhamad007.github.io/Movies4u/'],
  },
  {
    id: 2,
    image: project2,
    title: 'CoffeNess',
    description: 'a sleek single-page React/TypeScript site powered by Vite and Tailwind CSS, featuring an e-commerce catalog, cart logic, smooth GSAP scroll animations, and a React Three Fiber 3D cup component.',
    techniques: ['React', 'TypeScript', 'Tailwind CSS','JavaScript','State Management'],
    tools: ['GSAP', 'React Three Fiber', 'Three.js','localStorage','GitHub Pages','Vite'],
    gallery: [project2, project2_2,project2_3,project2_4,project2_5,project2_6],
    demo: ['https://youssefhamad007.github.io/CoffeeNess/'],
  },
  {
    id: 3,
    image: project3,
    title: 'Data Pulse',
    description: 'Responsive React admin dashboard with interactive charts, user management, dark/light mode, and smooth Framer Motion animations. Focused on clean data visualization and real-time analytics.',
    techniques: ['React', 'Tailwind CSS', 'TypeScript','Responsive Design','Dark/Light Mode','State Management'],
    tools: ['Framer Motion', 'Recharts', 'Vite','GitHub Pages'],
    gallery: [project3, project3_2,project3_3,project3_4],
    demo: ['https://youssefhamad007.github.io/datapulse/'],
  },
  {
    id: 4,
    image: project4,
    title: 'EventSure',
    description: 'Interactive event booking app built with React and TypeScript, featuring a 3D global model, Framer Motion animations, shopping cart, and login/auth. Fully responsive with polished UI/UX.',
    techniques: ['React', 'TypeScript', 'Responsive Design','Animations'],
    tools: ['Three.js', 'Framer Motion', 'Tailwind CSS','Cart System','Authentication','Interactive UI'],
    gallery: [project4, project4_2,project4_3,project4_4],
    demo: ['https://youssefhamad007.github.io/EventSure'],
  },
  {
    id: 5,
    image: project5,
    title: 'Bookify',
    description: 'A responsive React web app with 3D book model, Framer Motion animations, shopping cart, and login/auth functionality.',
    techniques: ['React', 'TypeScript', 'Responsive Design','Animations'],
    tools: ['Three.js', 'Framer Motion', 'Tailwind CSS','Cart System','Authentication','Interactive UI'],
    gallery: [project5, project5_2,project5_3,project5_4],
    demo: ['https://youssefhamad007.github.io/Bookify/'],
  },
  {
    id: 6,
    image: project6,
    title: 'Just-Do-It',
    description: 'To-Do List – A minimal productivity app to add, track, and manage tasks, with motivational prompts and localStorage support.',
    techniques: ['HTML5', 'JavaScript', 'Responsive Design'],
    tools: ['Bootstrap', 'GitHub Pages'],
    gallery: [project6, project6_2,project6_3,project6_4],
    demo: ['https://youssefhamad007.github.io/To-Do-List/'],
  }
];

const vertexShader = `
precision highp float;
attribute vec3 position;
attribute vec2 uv;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform float uTime;
varying vec2 vUv;

void main() {
  vUv = uv;
  vec3 newpos = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(newpos, 1.0);
}
`;

const fragmentShader = `
precision highp float;
uniform vec2 uImageSize;
uniform vec2 uPlaneSize;
uniform sampler2D tMap;
varying vec2 vUv;

void main() {
  vec2 imageSize = uImageSize;
  vec2 planeSize = uPlaneSize;
  float imageAspect = imageSize.x / imageSize.y;
  float planeAspect = planeSize.x / planeSize.y;
  vec2 scale = vec2(1.0, 1.0);

  if (planeAspect > imageAspect) {
      scale.x = imageAspect / planeAspect;
  } else {
      scale.y = planeAspect / imageAspect;
  }

  vec2 uv = vUv * scale + (1.0 - scale) * 0.5;
  gl_FragColor = texture2D(tMap, uv);
}
`;

export default function EnhancedFlyingPosters({
  items = [project1,project2,project3,project4,project5,project6],
  planeWidth = 320,
  planeHeight = 320,
  cameraFov = 45,
  cameraZ = 20
}: EnhancedFlyingPostersProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // No WebGL canvas needed; we keep it purely Framer Motion for better perf
  const [animationTriggered, setAnimationTriggered] = useState(false);
  const [expandedProject, setExpandedProject] = useState<ProjectData | null>(null);
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);
  const [clickedPoster, setClickedPoster] = useState<{ index: number; project: ProjectData } | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isFullProject, setIsFullProject] = useState(false);
  const [fullProject, setFullProject] = useState<ProjectData | null>(null);
  const navigate = useNavigate();
  // Track viewport width to adjust positions responsively
  const [vw, setVw] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 1280);
  useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  
  // Cleanup scroll lock on unmount
  useEffect(() => {
    return () => {
      // Restore scroll when component unmounts
      const scrollY = document.body.getAttribute('data-scroll-y') || '0';
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.height = '';
      document.body.removeAttribute('data-scroll-y');
      if (scrollY !== '0') {
        window.scrollTo(0, parseInt(scrollY));
      }
    };
  }, []);

  // Reduce poster count for better performance
  const posterCount = 6;
  
  const limitedItems = useMemo(() => {
    const importedPosters: string[] = [
      project1 as string, 
      project2 as string, 
      project3 as string, 
      project4 as string, 
      project5 as string, 
      project6 as string
    ];
    return importedPosters;
  }, []);

  const limitedProjectsData = useMemo((): ProjectData[] => {
    const src = projectsData.slice(0, Math.max(projectsData.length, posterCount));
    const out: ProjectData[] = [];
    for (let i = 0; i < posterCount; i++) out.push(src[i % src.length]);
    return out;
  }, []);

  // Trigger animations when section enters view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animationTriggered) setAnimationTriggered(true);
      },
      { threshold: 0.3 }
    );
    const el = containerRef.current;
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, [animationTriggered]);

  // Parallax: map scroll progress within the section to upward movement for each poster
  // Using a smaller scroll range to make posters more responsive to scroll
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const smoothScrollProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  // Heading fades in when scrolling into section, then fades out
  const titleOpacity = useTransform(smoothScrollProgress, [0, 0.25, 0.25, 0.35], [0, 1, 1, 0]);
  // Title floating animation - moves up while entering, down while leaving
  const titleY = useTransform(smoothScrollProgress, [0, 0.25, 0.25, 0.35], [100, 0, 0, -50]);
  const titleScale = useTransform(smoothScrollProgress, [0, 0.25, 0.25, 0.35], [0.8, 1, 1, 1.1]);
  const postersOpacity = useTransform(smoothScrollProgress, [0.15, 0.28], [0, 1]);

  // Controlled positions for 6 posters: responsive across breakpoints
  const basePositions = useMemo(() => {
    // Breakpoints approximate Tailwind: md=768, lg=1024, xl=1280
    const isXl = vw >= 1280;
    const isLg = vw >= 1024 && vw < 1280;
    // md range (component only renders from md and up)
    const isMd = vw >= 768 && vw < 1024;

    if (isXl) {
      return [
        { top: '38vh', left: '18%' },
        { top: '80vh', right: '18%' },
        { top: '105vh', left: '14%' },
        { top: '190vh', right: '14%' },
        { top: '175vh', left: '10%' },
        { top: '230vh', right: '14%' },
      ];
    }
    if (isLg) {
      return [
        { top: '40vh', left: '16%' },
        { top: '80vh', right: '14%' },
        { top: '105vh', left: '12%' },
        { top: '190vh', right: '12%' },
        { top: '175vh', left: '9%' },
        { top: '230vh', right: '12%' },
      ];
    }
    if (isMd) {
      // Bring posters closer to center and slightly reduce vertical spacing
      return [
        { top: '36vh', left: '12%' },
        { top: '70vh', right: '8%' },
        { top: '95vh', left: '10%' },
        { top: '180vh', right: '8%' },
        { top: '155vh', left: '6%' },
        { top: '210vh', right: '8%' },
      ];
    }
    // Fallback (unlikely since desktop layout is md+)
    return [
      { top: '40vh', left: '16%' },
      { top: '60vh', right: '14%' },
      { top: '118vh', left: '12%' },
      { top: '158vh', right: '12%' },
      { top: '180vh', left: '9%' },
      { top: '208vh', right: '12%' },
    ];
  }, [vw]);

  // Movement distances: 3 posters travel far, 3 travel short distances
  const speeds = [150, 200, 180, 150, 180, 200]; // Similar base speeds
  // 3 posters with long destinations, 3 with short destinations
  const y0 = useTransform(smoothScrollProgress, [0.2, 0.8], [0, -1200]); // Long distance
  const y1 = useTransform(smoothScrollProgress, [0.15, 0.7], [0, -800]); // Longest distance
  const y2 = useTransform(smoothScrollProgress, [0.25, 0.85], [0, -800]); // Long distance
  const y3 = useTransform(smoothScrollProgress, [0.3, 0.7], [0, -1200]); // Short distance
  const y4 = useTransform(smoothScrollProgress, [0.4, 0.8], [0, -800]); // Short distance
  const y5 = useTransform(smoothScrollProgress, [0.35, 0.75], [800, -1000]); // Short distance
  const yTransforms = [y0, y1, y2, y3, y4, y5];

  const handlePosterClick = (index: number) => {
    const project = limitedProjectsData[index];
    console.log('Clicking project:', project); // Debug log
    
    // Start transition animation
    setClickedPoster({ index, project });
    setIsTransitioning(true);
    
    // Wait for animation to complete, then show full project
    setTimeout(() => {
      setFullProject(project);
      setIsFullProject(true);
      setIsTransitioning(false);
      // Lock main page scroll completely
      const scrollY = window.scrollY;
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.height = '100%';
      // Store scroll position
      document.body.setAttribute('data-scroll-y', scrollY.toString());
    }, 1600); // 1.6s for deeper zoom transition with mini page
  };
  
  const handleBackToWorks = () => {
    setIsFullProject(false);
    setFullProject(null);
    setClickedPoster(null);
    // Restore main page scroll completely
    const scrollY = document.body.getAttribute('data-scroll-y') || '0';
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    document.body.style.height = '';
    document.body.removeAttribute('data-scroll-y');
    // Restore scroll position
    window.scrollTo(0, parseInt(scrollY));
  };

  const closeExpanded = () => {
    setExpandedProject(null);
  };

  const nextImage = () => {
    if (expandedProject) {
      setCurrentGalleryIndex((prev) => 
        (prev + 1) % expandedProject.gallery.length
      );
    }
  };

  const prevImage = () => {
    if (expandedProject) {
      setCurrentGalleryIndex((prev) => 
        prev === 0 ? expandedProject.gallery.length - 1 : prev - 1
      );
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!expandedProject) return;
      if (e.key === 'Escape') setExpandedProject(null);
      if (e.key === 'ArrowLeft') setCurrentGalleryIndex((p) => (p === 0 ? (expandedProject.gallery.length - 1) : p - 1));
      if (e.key === 'ArrowRight') setCurrentGalleryIndex((p) => (p + 1) % expandedProject.gallery.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [expandedProject]);

  // Smooth custom cursor follow (lag) for poster hover
  const cursorTarget = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const cursorPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const cursorAnimating = useRef<boolean>(false);
  const rafId = useRef<number | null>(null);

  const startCursorAnimation = () => {
    if (cursorAnimating.current) return;
    cursorAnimating.current = true;
    const step = () => {
      const cursor = document.getElementById('custom-cursor');
      // Lerp factor controls the lag amount (smaller = slower)
      const alpha = 0.15;
      cursorPos.current.x += (cursorTarget.current.x - cursorPos.current.x) * alpha;
      cursorPos.current.y += (cursorTarget.current.y - cursorPos.current.y) * alpha;
      if (cursor) {
        cursor.style.left = cursorPos.current.x + 'px';
        cursor.style.top = cursorPos.current.y + 'px';
      }
      if (cursorAnimating.current) {
        rafId.current = requestAnimationFrame(step);
      }
    };
    rafId.current = requestAnimationFrame(step);
  };

  const stopCursorAnimation = () => {
    cursorAnimating.current = false;
    if (rafId.current) cancelAnimationFrame(rafId.current);
    rafId.current = null;
  };

  return (
    <>
      <div ref={containerRef} className="enhanced-flying-posters min-h-[300vh] relative bg-black overflow-hidden">
        {/* Animated Works title with scroll float effect - ALL DEVICES */}
        <motion.div className="sticky top-0 h-screen flex items-start md:items-center justify-center pointer-events-none z-[1] pt-24 md:pt-0 pb-32 md:pb-0"
          style={{ 
            opacity: titleOpacity,
            y: titleY,
            scale: titleScale
          }}
        >
          <h2 className="text-[16vw] md:text-[12vw] leading-none font-black tracking-tight text-white/90 select-none">
            Works
          </h2>
        </motion.div>
        
        {/* Mobile: Static grid layout */}
        <div className="block md:hidden px-10 sm:px-8 pb-16 pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-20 sm:gap-8 max-w-4xl mx-auto">
            {limitedItems.map((item, index) => (
              <div
                key={index}
                className="w-full aspect-[3/4] cursor-pointer transform transition-transform duration-200 hover:scale-105 h-[300px]"
                onClick={() => !isTransitioning && handlePosterClick(index)}
              >
                {/* Mini Project Page - Mobile */}
                <div 
                  className="w-full h-full overflow-hidden rounded-lg bg-black relative"
                  style={{
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}
                >
                  {/* Mini background */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center brightness-125 contrast-110"
                    style={{ backgroundImage: `url(${item})` }}
                  />
                  <div className="absolute inset-0 bg-black/40" />
                  
                  {/* Mini content */}
                  <div className="relative z-10 p-4 h-full flex flex-col justify-between text-white">
                    <div>
                      <h3 className="text-lg font-bold mb-2 line-clamp-2 drop-shadow-lg text-white">{limitedProjectsData[index].title}</h3>
                      <p className="text-xs opacity-90 line-clamp-3 drop-shadow-md">{limitedProjectsData[index].description}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-1">
                        {limitedProjectsData[index].techniques.slice(0, 2).map((tech, i) => (
                          <span key={i} className="px-2 py-1 bg-white/30 backdrop-blur-sm rounded-full text-xs font-medium drop-shadow-sm">{tech}</span>
                        ))}
                      </div>
                      <div className="text-xs opacity-80 drop-shadow-sm font-medium">Click to explore →</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Desktop: Animated posters */}
        {animationTriggered && (
          <motion.div className="hidden md:block posters-grid" style={{ opacity: postersOpacity }}>
            {limitedItems.map((item, index) => {
              const y = yTransforms[index % yTransforms.length];
              const pos = basePositions[index % basePositions.length];
              const isClicked = clickedPoster?.index === index;
              
              // Calculate movement to screen center from poster's position
              const calculateCenterMovement = () => {
                if (!isClicked) return { x: 0, y: 0 };
                
                // Get poster's current position more accurately
                let moveX;
                
                if (pos.left) {
                  // Left positioned poster
                  const leftPercent = parseFloat(pos.left);
                  moveX = `calc(50vw - ${leftPercent}vw - 125px)`;
                } else if (pos.right) {
                  // Right positioned poster - calculate from right edge
                  const rightPercent = parseFloat(pos.right);
                  moveX = `calc(50vw - (100vw - ${rightPercent}vw) + 125px)`;
                }
                
                // Y movement calculation - move to exact screen center
                const topVh = parseFloat(pos.top.replace('vh', ''));
                const moveY = `calc(50vh - ${topVh}vh)`;
                
                return { x: moveX, y: moveY };
              };
              
              const centerMovement = calculateCenterMovement();
              
              return (
                <motion.div
                  key={index}
                  className={`poster-item ${index % 2 === 0 ? 'poster-left' : 'poster-right'} group overflow-visible `}
                  initial={{ opacity: 0, scale: 0.98, y: 20 }}
                  animate={{
                    opacity: isClicked ? 1 : (isTransitioning ? 0.3 : 1),
                    scale: isClicked ? 6 : 1,
                    x: centerMovement.x,
                    y: centerMovement.y,
                    zIndex: isClicked ? 1000 : 10 + index
                  }}
                  transition={{
                    delay: isClicked ? 0 : 0.1 * index,
                    duration: isClicked ? 1.6 : 0.4,
                    ease: isClicked ? [0.19, 1, 0.22, 1] : 'easeOut'
                  }}
                  style={{
                    ...(pos.left ? { left: pos.left } : {}),
                    ...(pos.right ? { right: pos.right } : {}),
                    top: pos.top,
                    y: !isClicked ? y : undefined,
                    transformOrigin: 'center center',
                    position: 'absolute',
                    width: '550px',
                    height: '350px'
                  }}
                  onClick={() => !isTransitioning && handlePosterClick(index)}
                whileHover={!isTransitioning ? { 
                    scale: 1.02, 
                    filter: 'brightness(1.1)',
                    transition: { duration: 0.2 } 
                  } : {}}
                  whileTap={!isTransitioning ? { scale: 0.98, transition: { duration: 0.1 } } : {}}
                  onMouseEnter={(e) => {
                    const cursor = document.getElementById('custom-cursor');
                    if (cursor) {
                      cursor.style.display = 'flex';
                    }
                    // Initialize cursor position to avoid a jump
                    cursorPos.current = { x: e.clientX, y: e.clientY };
                    cursorTarget.current = { x: e.clientX, y: e.clientY };
                    startCursorAnimation();
                    e.currentTarget.style.cursor = 'none';
                  }}
                  onMouseMove={(e) => {
                    // Update target, animation loop handles actual movement for lag effect
                    cursorTarget.current = { x: e.clientX, y: e.clientY };
                  }}
                  onMouseLeave={(e) => {
                    const cursor = document.getElementById('custom-cursor');
                    if (cursor) {
                      cursor.style.display = 'none';
                    }
                    stopCursorAnimation();
                    e.currentTarget.style.cursor = 'default';
                  }}
                >
                  {/* Hover-only distant corner borders (simple, no blend/motion) */}
                  <div className="pointer-events-none absolute -top-12 -left-12 w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50">
                    <div className="absolute top-0 left-0 w-12 h-[1px] bg-white" />
                    <div className="absolute top-0 left-0 w-[1px] h-12 bg-white" />
                  </div>
                  <div className="pointer-events-none absolute -top-12 -right-12 w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50">
                    <div className="absolute top-0 right-0 w-12 h-[1px] bg-white" />
                    <div className="absolute top-0 right-0 w-[1px] h-12 bg-white" />
                  </div>
                  <div className="pointer-events-none absolute -bottom-12 -left-12 w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50">
                    <div className="absolute bottom-0 left-0 w-12 h-[1px] bg-white" />
                    <div className="absolute bottom-0 left-0 w-[1px] h-12 bg-white" />
                  </div>
                  <div className="pointer-events-none absolute -bottom-12 -right-12 w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50">
                    <div className="absolute bottom-0 right-0 w-12 h-[1px] bg-white" />
                    <div className="absolute bottom-0 right-0 w-[1px] h-12 bg-white" />
                  </div>
                  {/* Mini Project Page instead of static image */}
                  <div 
                    className="w-full h-full overflow-hidden rounded-lg bg-black relative transition-all duration-300"
                    style={{
                      border: '1px solid rgba(255, 255, 255, 0.2)'
                    }}
                  >
                    {/* Mini background */}
                    <div 
                      className="absolute inset-0 bg-cover bg-center brightness-125 contrast-110"
                      style={{ backgroundImage: `url(${item})` }}
                    />
                    <div className="absolute inset-0 bg-black/40" />
                    
                    {/* Mini content */}
                    <div className="relative z-10 p-4 h-full flex flex-col justify-between text-white">
                      <div>
                        <h3 className="text-lg font-bold mb-2 line-clamp-2 drop-shadow-lg text-white">{limitedProjectsData[index].title}</h3>
                        <p className="text-xs opacity-90 line-clamp-3 drop-shadow-md">{limitedProjectsData[index].description}</p>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex flex-wrap gap-1">
                          {limitedProjectsData[index].techniques.slice(0, 2).map((tech, i) => (
                            <span key={i} className="px-2 py-1 bg-white/30 backdrop-blur-sm rounded-full text-xs font-medium drop-shadow-sm">{tech}</span>
                          ))}
                        </div>
                        <div className="text-xs opacity-80 drop-shadow-sm font-medium">Click to explore →</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
        
        {/* Transition Overlay */}
        <AnimatePresence>
          {isTransitioning && (
            <motion.div
              className="fixed inset-0 bg-black z-[1500]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            />
          )}
        </AnimatePresence>
        
        {/* Full Project View */}
        <AnimatePresence>
          {isFullProject && fullProject && (
            <motion.div
              className="fixed inset-0 z-[2000] bg-black text-white overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              onWheel={(e) => e.stopPropagation()}
              style={{ touchAction: 'none' }}
            >
              {/* Fixed Background */}
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ 
                  backgroundImage: `url(${fullProject.image})`
                }}
              />
              <div className="absolute inset-0 bg-black/70" />
              
              {/* Scrollable Content */}
              <div 
                className="relative z-10 h-screen overflow-y-auto"
                onWheel={(e) => {
                  // Allow scrolling within this container only
                  e.stopPropagation();
                }}
              >
                {/* Top bar */}
                <div className="flex items-center justify-between px-4 sm:px-6 md:px-10 py-4 bg-gradient-to-b from-black/90 to-transparent">
                  <button
                    onClick={handleBackToWorks}
                    className="inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/20 text-white px-4 py-2 text-sm transition"
                  >
                    ← Back to Works
                  </button>
                  <a
                    href={`${fullProject.demo}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-white text-black px-4 py-2 text-sm font-semibold hover:bg-white/90 transition"
                  >
                    Live Demo ↗
                  </a>
                </div>

                {/* Hero - Removed pt-20 md:pt-24 */}
                <section className="pb-12">
                  <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10">
                    <div className="grid md:grid-cols-2 gap-8 items-end">
                      <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                      >
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white drop-shadow-2xl">{fullProject.title}</h1>
                        <p className="mt-4 text-base sm:text-lg text-white/90 leading-relaxed drop-shadow-lg">{fullProject.description}</p>
                      </motion.div>
                      <motion.div 
                        className="rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/20 bg-black/20 backdrop-blur-sm"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                      >
                        <img src={fullProject.image} alt={fullProject.title} loading='lazy' className="w-full h-[40vh] md:h-[50vh] object-cover opacity-80" />
                      </motion.div>
                    </div>
                  </div>
                </section>

                {/* Details */}
                <section className="py-12 md:py-16">
                  <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 grid md:grid-cols-3 gap-10">
                    <motion.div 
                      className="md:col-span-2"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                    >
                      <h2 className="text-2xl font-bold mb-4 text-white drop-shadow-lg">Gallery</h2>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {fullProject.gallery.map((src: string, i: number) => (
                          <img key={i} src={src} loading='lazy' alt={`${fullProject.title} ${i + 1}`} className="w-full h-64 object-cover rounded-lg ring-1 ring-white/20 shadow-xl" />
                        ))}
                      </div>
                    </motion.div>
                    <motion.aside 
                      className="space-y-8"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.8 }}
                    >
                      <div>
                        <h3 className="text-xl font-semibold mb-3 text-white drop-shadow-lg">Techniques</h3>
                        <div className="flex flex-wrap gap-2">
                          {fullProject.techniques.map((t: string, i: number) => (
                            <span key={i} className="px-3 py-1 rounded-full bg-white/10 text-white/90 text-sm">{t}</span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-3 text-white drop-shadow-lg">Tools</h3>
                        <div className="flex flex-wrap gap-2">
                          {fullProject.tools.map((t: string, i: number) => (
                            <span key={i} className="px-3 py-1 rounded-full bg-white/10 text-white/90 text-sm">{t}</span>
                          ))}
                        </div>
                      </div>
                    </motion.aside>
                  </div>
                </section>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Small click flourish overlay (brief zoom) */}
      <AnimatePresence>
        {expandedProject && (
          <motion.div className="fixed inset-0 z-[100] pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-black/40" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom cursor for poster hover - transparent, smaller, permanent corners */}
      <div id="custom-cursor" className="fixed left-0 top-0 z-[3000] hidden -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-100">
        <div className="relative">
          {/* Corner lines (permanent) - smaller than poster corners */}
          <div className="pointer-events-none absolute -top-6 -left-4 w-8 h-8 z-50">
            <div className="absolute top-0 left-0 w-3 h-[1px] bg-white" />
            <div className="absolute top-0 left-0 w-[1px] h-3 bg-white" />
          </div>
          <div className="pointer-events-none absolute -top-6 -right-4 w-8 h-6 z-50">
            <div className="absolute top-0 right-0 w-3 h-[1px] bg-white" />
            <div className="absolute top-0 right-0 w-[1px] h-3 bg-white" />
          </div>
          <div className="pointer-events-none absolute -bottom-6 -left-4 w-8 h-8 z-50">
            <div className="absolute bottom-0 left-0 w-3 h-[1px] bg-white" />
            <div className="absolute bottom-0 left-0 w-[1px] h-3 bg-white" />
          </div>
          <div className="pointer-events-none absolute -bottom-6 -right-4 w-8 h-8 z-50">
            <div className="absolute bottom-0 right-0 w-3 h-[1px] bg-white" />
            <div className="absolute bottom-0 right-0 w-[1px] h-3 bg-white" />
          </div>
          {/* Label */}
          <div className=" text-white text-lg  tracking-wide">
            VIEW
          </div>
        </div>
      </div>
    </>
  );
}