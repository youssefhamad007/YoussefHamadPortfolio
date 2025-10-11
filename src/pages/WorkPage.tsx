import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef,useMemo } from 'react';
import Footer from '@/components/Footer';
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

interface ProjectData {
  id: number;
  image: string;
  title: string;
  description: string;
  techniques: string[];
  tools: string[];
  gallery: string[];
  demo: string[];
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

export default function WorkPage() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [expandedProject, setExpandedProject] = useState<ProjectData | null>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const posterCount = 6;
const limitedProjectsData = useMemo((): ProjectData[] => {
    const src = projectsData.slice(0, Math.max(projectsData.length, posterCount));
    const out: ProjectData[] = [];
    for (let i = 0; i < posterCount; i++) out.push(src[i % src.length]);
    return out;
  }, []);
  const handleMouseMove = (e: React.MouseEvent, index: number) => {
    setHoveredProject(index);
    if (cursorRef.current) {
      cursorRef.current.style.left = `${e.clientX}px`;
      cursorRef.current.style.top = `${e.clientY}px`;
    }
  };
  const [clickedPoster, setClickedPoster] = useState<{ index: number; project: ProjectData } | null>(null);
  const [isFullProject, setIsFullProject] = useState(false);
  const [fullProject, setFullProject] = useState<ProjectData | null>(null);
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
  const handleProjectClick = (project: ProjectData) => {
    setFullProject(project);
    setIsFullProject(true);
    
    // Lock scroll
    const scrollY = window.scrollY;
    document.body.style.overflow = 'hidden';
    document.body.style.top = `-${scrollY}px`;
    document.body.setAttribute('data-scroll-y', scrollY.toString());
  };
  
  const closeProject = () => {
    setIsFullProject(false);
    setFullProject(null);
    
    // Restore scroll
    const scrollY = document.body.getAttribute('data-scroll-y') || '0';
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.removeAttribute('data-scroll-y');
    window.scrollTo(0, parseInt(scrollY));
  };

  return (
    <div className="min-h-screen bg-black py-20 px-4 sm:px-8 md:px-12 lg:px-20">
      {/* Custom cursor */}
      <div 
        ref={cursorRef} 
        className="fixed hidden md:hidden pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2"
      >
        {/* Corner lines */}
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

      <h2 className="text-4xl md:text-8xl font-black tracking-tight text-white/90 mb-16 text-center mt-[10%]">
        Works
      </h2>
      
      {/* Static flex column layout */}
      <div className="flex flex-col items-center gap-16 mt-[20%] px-2 md:px-20">
  {Array.from({ length: Math.ceil(projectsData.length / 2) }, (_, rowIndex) => (
    <div
      key={rowIndex}
      className="flex flex-col sm:flex-row justify-center items-center gap-16 w-full"
    >
      {projectsData.slice(rowIndex * 2, rowIndex * 2 + 2).map((project, index) => (
        <motion.div
          key={project.id}
          className="group relative w-full max-w-4xl aspect-[3/4] cursor-none h-[400px] mt-10 "
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          whileHover={{ scale: 1.02 }}
          onMouseEnter={() => {
            setHoveredProject(index);
            if (cursorRef.current) cursorRef.current.style.display = 'block';
          }}
          onMouseMove={(e) => handleMouseMove(e, index)}
          onMouseLeave={() => {
            setHoveredProject(null);
            if (cursorRef.current) cursorRef.current.style.display = 'none';
          }}
          onClick={() => handleProjectClick(project)}
        >
          {/* Hover corner borders */}
          <div className="pointer-events-none absolute -top-4 -left-4 w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50">
            <div className="absolute top-0 left-0 w-12 h-[1px] bg-white" />
            <div className="absolute top-0 left-0 w-[1px] h-12 bg-white" />
          </div>
          <div className="pointer-events-none absolute -top-4 -right-4 w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50">
            <div className="absolute top-0 right-0 w-12 h-[1px] bg-white" />
            <div className="absolute top-0 right-0 w-[1px] h-12 bg-white" />
          </div>
          <div className="pointer-events-none absolute -bottom-4 -left-4 w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50">
            <div className="absolute bottom-0 left-0 w-12 h-[1px] bg-white" />
            <div className="absolute bottom-0 left-0 w-[1px] h-12 bg-white" />
          </div>
          <div className="pointer-events-none absolute -bottom-4 -right-4 w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50">
            <div className="absolute bottom-0 right-0 w-12 h-[1px] bg-white" />
            <div className="absolute bottom-0 right-0 w-[1px] h-12 bg-white" />
          </div>

          {/* Project Card */}
          <div className="w-full h-full overflow-hidden rounded-lg bg-black relative transition-all duration-300 group-hover:brightness-110">
            <div
              className="absolute inset-0 bg-cover bg-center brightness-125 contrast-110"
              style={{ backgroundImage: `url(${project.image})` }}
            />
            <div className="absolute inset-0 bg-black/40" />

            <div className="relative z-10 p-4 h-full flex flex-col justify-between text-white">
              <div>
                <h3 className="text-lg font-bold mb-2 line-clamp-2 drop-shadow-lg">
                  {project.title}
                </h3>
                <p className="text-xs opacity-90 line-clamp-3 drop-shadow-md">
                  {project.description}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex flex-wrap gap-1">
                  {project.techniques.slice(0, 2).map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-white/30 backdrop-blur-sm rounded-full text-xs font-medium drop-shadow-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="text-xs opacity-80 drop-shadow-sm font-medium">
                  {hoveredProject === index ? 'Click to explore →' : ''}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  ))}
</div>
      {/* Project Details Modal */}
      <AnimatePresence>
          {isFullProject && fullProject && (
            <motion.div
              className="fixed inset-0 z-[5000] bg-black text-white overflow-hidden"
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
                        <img src={fullProject.image} loading='lazy' alt={fullProject.title} className="w-full h-[40vh] md:h-[50vh] object-cover opacity-80" />
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
        <AnimatePresence>
        {expandedProject && (
          <motion.div className="fixed inset-0 z-[100] pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-black/40" />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="mt-[20%]">
        <Footer  />
      </div>
    </div>
  );
}