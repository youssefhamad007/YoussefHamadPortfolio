import React, { useEffect } from 'react'
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import ScrollFloat from './ScrollFloat';
import LogoLoop from './Logoloob';
import { SiReact, SiNextdotjs, SiTypescript,SiHtml5 ,SiRedux,SiGraphql,SiTestinglibrary,SiDocker,SiFirebase,SiJest, SiTailwindcss,SiMongodb ,SiVite ,SiJavascript,SiGithub,SiCss3,SiJquery ,SiExpress,SiBootstrap } from 'react-icons/si';
import { TbBrandThreejs,TbBrandFramerMotion,TbJson  } from "react-icons/tb";
import { DiNodejs,DiNpm,DiResponsive   } from "react-icons/di";
import ScrollReveal from './ScrollReveal';

declare global {
  interface Window {
    gsap: typeof import('gsap').gsap & {
      scrollTrigger: typeof import('gsap/ScrollTrigger').ScrollTrigger;
    };
  }
}

const About = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Force GSAP scroll triggers to recalculate after route change
    if (typeof window !== 'undefined' && window.gsap?.scrollTrigger) {
      window.gsap.scrollTrigger.refresh();
    }
  }, [location.pathname]);

  return (
    <section id="about" className="bg-black min-h-[140vh] pt-28 md:pt-40 pb-24 md:pb-32">
  <div className="max-w-6xl md:max-w-7xl mx-auto text-center px-6">

    <ScrollFloat
      containerClassName="mb-24 md:mb-80"                // outer h2
      textClassName="font-bold text-white text-7xl md:text-8xl" // spans
      animationDuration={1.4}                    // faster per char
      ease="back.inOut(2)"                     // gsap ease
      scrollStart="top bottom+=150%"        // keep early start
      scrollEnd="bottom top-=70%"           // keep long window
      stagger={0.05}                         // faster stagger
    >
      Iam...
    </ScrollFloat>

    <ScrollReveal
      baseOpacity={0.05}
      enableBlur={true}
      baseRotation={0}
      blurStrength={8}
      rotationEnd="bottom top+=50%"        
      wordAnimationEnd="bottom top+=40%"    
      containerClassName="mb-52 md:mb-72 min-h-[70vh] max-w-6xl md:max-w-8xl mx-auto"
      textClassName="text-white text-5xl md:text-5xl leading-[2.1] md:leading-[2.3]"
    >
      A Front-End React Developer with 2+ years’ experience building modern, high-performance web apps. Expert in React, Next.js, and smooth, performance-driven animations that boost user engagement. Known for turning ideas into pixel-perfect, user-friendly designs while delivering clean, scalable code under tight deadlines.
    </ScrollReveal>
  </div>

  {/* Full-width LogoLoop (Logoloob) showcase at the end of About */}
  <div className=" w-screen relative overflow-hidden" style={{ height: '200px' }}>
    <LogoLoop
      className="text-white"
      logos={[
        { node: <SiReact />, title: 'React', href: 'https://react.dev' },
{ node: <SiNextdotjs />, title: 'Next.js', href: 'https://nextjs.org' },
{ node: <SiTypescript />, title: 'TypeScript', href: 'https://www.typescriptlang.org' },
{ node: <SiJavascript />, title: 'JavaScript', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
{ node: <SiHtml5 />, title: 'HTML5', href: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
{ node: <SiCss3 />, title: 'CSS3', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
{ node: <SiTailwindcss />, title: 'Tailwind CSS', href: 'https://tailwindcss.com' },
{ node: <SiBootstrap />, title: 'Bootstrap', href: 'https://getbootstrap.com' },
{ node: <TbBrandFramerMotion />, title: 'Framer Motion', href: 'https://www.framer.com/motion/' },
{ node: <TbBrandThreejs />, title: 'Three.js', href: 'https://threejs.org' },
{ node: <SiVite />, title: 'Vite', href: 'https://vitejs.dev' },
{ node: <DiResponsive />, title: 'Responsive Design', href: '#' }, // no site, concept only
{ node: <TbJson />, title: 'JSON', href: 'https://www.json.org/json-en.html' },
{ node: <SiGithub />, title: 'GitHub', href: 'https://github.com' },
{ node: <DiNpm />, title: 'npm', href: 'https://www.npmjs.com' },

// Optional but nice to show full-stack skills
{ node: <DiNodejs />, title: 'Node.js', href: 'https://nodejs.org' },
{ node: <SiExpress />, title: 'Express.js', href: 'https://expressjs.com' },
{ node: <SiMongodb />, title: 'MongoDB', href: 'https://www.mongodb.com' },

// Extras you can add to stand out
{ node: <SiRedux />, title: 'Redux', href: 'https://redux.js.org' },
{ node: <SiGraphql />, title: 'GraphQL', href: 'https://graphql.org' },
{ node: <SiFirebase />, title: 'Firebase', href: 'https://firebase.google.com' },
{ node: <SiJest />, title: 'Jest (Testing)', href: 'https://jestjs.io' },
{ node: <SiTestinglibrary />, title: 'React Testing Library', href: 'https://testing-library.com' },
{ node: <SiDocker />, title: 'Docker', href: 'https://www.docker.com' },
      ]}
      speed={40}
      direction="left"
      logoHeight={48}
      gap={40}
      pauseOnHover
      scaleOnHover
      fadeOut
      fadeOutColor="#000000"
      ariaLabel="Technology partners"
    />
  </div>
</section>

  )
}

export default About