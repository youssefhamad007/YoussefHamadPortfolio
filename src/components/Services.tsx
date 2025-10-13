import React from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import FlowingMenu from './FlowingMenu'
import responsive from '/assets/responsive.png'
import responsivePreview from '/assets/responsive-preview.png'
import tailwind from '/assets/tailwind.png'
import react from '/assets/react.png'
import reactPreview from '/assets/react-preview.png'
import nextjs from '/assets/next.js.png'
import seo from '/assets/Seo.png'
import figma from '/assets/figma.png'
import pixelPerfect from '/assets/Pixel-perfect.png'

const Services = () => {
  const containerRef = React.useRef<HTMLDivElement>(null)

  // Scroll-driven heading animation (mirrors EnhancedFlyingPosters)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] })
  const smoothScrollProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  const titleOpacity = useTransform(smoothScrollProgress, [0, 0.35, 0.35, 0.45], [0, 1, 1, 0])
  const titleY = useTransform(smoothScrollProgress, [0, 0.25, 0.25, 0.35], [100, 0, 0, -100])
  const titleScale = useTransform(smoothScrollProgress, [0, 0.25, 0.25, 0.35], [0.8, 1, 1, 1.1])

  const services = React.useMemo(
    () => [
      {
        link: '/YoussefHamadPortfolio/about',
        texts: ['Responsive Design', 'Mobile-first layouts', 'Tailwind'],
        images: [responsive, responsivePreview, tailwind]
      },
      {
        link: '/YoussefHamadPortfolio/about',
        texts: ['React Development', 'Scalable SPAs'],
        images: [react, reactPreview]
      },
      {
        link: '/YoussefHamadPortfolio/about',
        texts: ['Next.js Apps', 'SEO & performance'],
        images: [nextjs, seo]
      },
      {
        link: '/YoussefHamadPortfolio/about',
        texts: ['UI/UX Prototyping', 'Pixel-perfect designs'],
        images: [figma, pixelPerfect]
      }
    ],
    []
  );

  return (
    <section
      id="services"
      ref={containerRef}
      className="relative bg-black overflow-hidden min-h-[140vh] sm:min-h-[160vh] md:min-h-[200vh]"
    >
      {/* Sticky Services title with scroll float effect - mirrors Works */}
      <motion.div
        className="sticky top-0 h-[85vh] sm:h-screen flex items-center justify-center pointer-events-none z-[1] pt-0 sm:pt-28 md:pt-0 pb-0 sm:pb-12 md:pb-0"
        style={{ opacity: titleOpacity, y: titleY, scale: titleScale }}
      >
        <h2 className="text-[14vw] sm:text-[14vw] md:text-[12vw] leading-none font-black tracking-tight text-white/90 select-none">
          Services
        </h2>
      </motion.div>

      {/* Content container */}
      <div
        style={{ position: 'relative' }}
        className="px-3 sm:px-6 md:px-8 w-full max-w-8xl mx-auto h-[540px] sm:h-[640px] md:h-[880px] lg:h-[980px] mt-6 sm:mt-0"
      >
        <FlowingMenu items={services} />
      </div>
    </section>
  )
}

export default Services