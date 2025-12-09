import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import youssef from "/assets/Youssef.webp";
import { motion, useScroll, useTransform } from "framer-motion";
import Footer from "@/components/Footer";

const DEFAULT_IMAGE = `${youssef}`;

const AboutPage: React.FC = () => {
  const navigate = useNavigate();
  const navigate2 = useNavigate();
  const firstName = "Youssef Ahmed";
  const lastName = "Hamad";
  const imageSrc = DEFAULT_IMAGE;

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });


  const firstTextOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const firstTextScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.4]);
  const secondTextY = useTransform(scrollYProgress, [0, 1], [900, 1]);

  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: cardsScrollProgress } = useScroll({
    target: cardsContainerRef,
    offset: ["start start", "end end"]
  });


  return (
    <div className=" bg-black text-white relative">
      {/* HERO SECTION */}
      <section className="relative h-[100dvh] w-full">
        <div className="absolute left-1/2  top-[25%] sm:top-[20%] md:top-[20%] lg:top-[20%] xl:top-[35%] w-[250px] h-[250px] sm:w-[180px] sm:h-[220px] md:w-[220px] md:h-[260px] lg:w-[260px] lg:h-[300px] xl:w-[400px] xl:h-[400px] overflow-hidden z-10 -translate-x-1/2">
          <img
            src={imageSrc}
            alt="Portrait"
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-350 animate-slowJump" />
        </div>

        <motion.h1

          className=" w-full absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-[-40%] text-[12vw] sm:text-[7vw] md:text-[7vw] lg:text-[7vw] xl:text-[7vw] leading-[0.9] bubblegum-sans-regular  tracking-[-0.04em] text-center select-none pointer-events-none  z-20">
          <div

            className="block transition-transform duration-300 translate-x-[-10px] sm:translate-x-[-30px] md:translate-x-[-80px] lg:translate-x-[-90px] xl:translate-x-[-100px]">
            {firstName}
          </div>
          <div className="block transition-transform duration-300 translate-x-[150px] sm:translate-x-[250px] md:translate-x-[150px] lg:translate-x-[250px] xl:translate-x-[320px] w-[200px] sm:w-[200px] md:w-full lg:w-full xl:w-full">
            {lastName}
          </div>
        </motion.h1>

        <div className="absolute bottom-0 sm:bottom-2 md:bottom-4 lg:bottom-6 left-0 right-0 border-t border-white/20 text-[10px] xs:text-[11px] sm:text-[12px] md:text-[13px] uppercase tracking-[0.35em] text-white/80">
          <div className="relative px-2 xs:px-3 sm:px-4 md:px-6 py-1 sm:py-2 md:py-3">
            <div className="flex items-center justify-between">
              <span className="whitespace-nowrap truncate max-w-[30vw] xs:max-w-none">
                FrontEnd React Developer
              </span>
              <Link
                to="/YoussefHamadPortfolio/contact"
                className="whitespace-nowrap hover:text-white transition-colors text-nowrap"
              >
                Work with me
              </Link>
            </div>
            <span className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-none">
              <span className="text-white/50">✦</span> Scroll to Explore
            </span>
          </div>
        </div>
      </section>

      {/* Animated scroll section */}
      <section ref={containerRef} className="relative h-[200vh]">
        <div className="h-screen sticky top-0 flex justify-center items-center px-4 sm:px-6 md:px-8">
          {/* First text with fade and scale */}
          <motion.div
            className="absolute w-full max-w-[90vw] md:max-w-[80vw] lg:max-w-[900px]"
            style={{
              opacity: firstTextOpacity,
              scale: firstTextScale
            }}
          >
            <p className="text-center text-[1.2rem] sm:text-[1.8rem] md:text-[1.6rem] lg:text-[2rem] xl:text-[2.3rem] leading-relaxed text-white/80 mx-auto font-inter">
              Hi there! I’m{" "}
              <span className="text-white font-medium transition-colors duration-300 hover:text-sky-400">
                Youssef Ahmed Hamad
              </span>
              , a passionate{" "}
              <span className="text-white font-medium transition-colors duration-300 hover:text-sky-400">
                Front-End React Developer
              </span>{" "}
              crafting modern, interactive, and responsive web experiences.
              <br />
              <br />
              I build sleek, high-performing interfaces that don’t just look good but{" "}
              <span className="text-white font-medium transition-colors duration-300 hover:text-sky-400">
                feel amazing
              </span>
              . Whether it’s smooth animations, clean design systems, or scalable architectures,
              I turn ideas into digital experiences that{" "}
              <span className="text-white font-medium transition-colors duration-300 hover:text-sky-400">
                stand out
              </span>
              .
            </p>
          </motion.div>

          {/* Second text with vertical movement */}
          <motion.div
            className="absolute w-full max-w-[90vw] md:max-w-[80vw] lg:max-w-[800px] px-4"
            style={{ y: secondTextY }}
          >
            {/* INTRO PARAGRAPH */}
            <p className="text-white/80 text-[0.8rem] sm:text-[1.8rem] md:text-[1.2rem] lg:text-[1.6rem] xl:text-[1.8rem] leading-relaxed max-w-[800px]  ">
              My passion for web development started with a curiosity for how things work
              on the web. From crafting smooth UI interactions to fine-tuning performance,
              I honed my skills in React and modern front-end frameworks. I now build
              bespoke digital experiences that blend creativity and functionality.
            </p>

            {/* HIGHLIGHT PARAGRAPH */}
            <p className="mt-20 text-[0.6rem] sm:text-[1.9rem] md:text-[1.2rem] font-light leading-snug text-start max-w-[950px] mx-auto text-white/70">
              I specialize in{" "}
              <span className="text-white font-medium">
                React development, modern UI/UX design,
              </span>{" "}
              and{" "}
              <span className="text-white font-medium">
                seamless web experiences
              </span>{" "}
              helping brands and businesses build digital products that{" "}
              <span className="text-white font-medium">stand out</span>.
            </p>

            {/* CALL TO ACTION */}
            <div className="max-w-[800px]  space-y-6 text-start mt-20 ">
              <h3 className="text-lg font-semibold text-white">
                Let’s Build Something Exceptional
              </h3>
              <p className="text-white/80 text-[0.6rem] sm:text-[1rem] leading-relaxed">
                Your website isn’t just a digital space—it’s your brand’s story and first
                impression. Whether you need a sleek portfolio, a high-converting landing
                page, or a full-scale application, I bring creativity, strategy, and
                technical expertise to make it happen. Let’s collaborate and create
                something that connects with your audience and drives real impact.
              </p>
              <p className="text-white font-medium sm:text-[1rem] text-[0.6rem]">
                Have a project in mind?{" "}
                <span onClick={() => navigate('/YoussefHamadPortfolio/contact')} className="underline underline-offset-4 decoration-white hover:text-sky-400 transition-colors cursor-pointer">
                  Let’s talk.
                </span>
              </p>

              <button className="mt-4 border border-white text-white px-6 py-3 text-sm tracking-wider uppercase flex items-center gap-2  hover:bg-white hover:text-black transition-all duration-300"
                onClick={() => navigate('/YoussefHamadPortfolio/contact')}
              >
                Contact me
                <span className="text-lg">→</span>
              </button>

            </div>

          </motion.div>

        </div>

      </section>
      {/* Stacked cards */}
      <div ref={cardsContainerRef} className="h-[300vh] w-full bg-black mt-20">
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center">
          <h2 className="text-2xl sm:text-2xl md:text-4xl lg:text-4xl xl:text-4xl mb-16 text-white">What will you find in me</h2>

          <div className="relative h-[60vh] w-[350px] sm:w-[500px] md:w-[500px] lg:w-[500px] xl:w-[500px] ">
            {/* Card 1 */}
            <motion.div
              className="absolute w-full z-30 h-[100px] bg-black text-white flex items-center justify-center border border-white text-[4rem] font-semibold"
              style={{
                y: useTransform(cardsScrollProgress, [0, 0.25], [0, 0]),
                rotate: useTransform(cardsScrollProgress, [0, 0.25], [0, -10])
              }}
            >
              Creative
            </motion.div>

            {/* Card 2 */}
            <motion.div
              className="absolute mt-20 w-full z-40 h-[100px] bg-black text-white flex items-center justify-center border border-white text-[4rem] font-semibold"
              style={{
                y: useTransform(cardsScrollProgress, [0.2, 0.45], [100, -80]),
                rotate: useTransform(cardsScrollProgress, [0.2, 0.45], [0, 2])
              }}
            >
              Precision
            </motion.div>

            {/* Card 3 */}
            <motion.div
              className="absolute w-full mt-40 z-50 h-[100px] bg-black text-white flex items-center justify-center border border-white text-[4rem] font-semibold"
              style={{
                y: useTransform(cardsScrollProgress, [0.4, 0.65], [200, -160]),
                rotate: useTransform(cardsScrollProgress, [0.4, 0.65], [0, -5])
              }}
            >
              Innovation
            </motion.div>

            {/* Card 4 */}
            <motion.div
              className="absolute w-full z-50 mt-60 h-[100px] bg-black text-white flex items-center justify-center border border-white text-[4rem] font-semibold"
              style={{
                y: useTransform(cardsScrollProgress, [0.6, 0.85], [300, -240]),
                rotate: useTransform(cardsScrollProgress, [0.6, 0.85], [0, 10])
              }}
            >
              Passion
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <motion.footer className="max-h-[400px]" style={{
        y: useTransform(cardsScrollProgress, [0.6, 0.85], [0, -400]),
      }}>
        <Footer />
      </motion.footer>
    </div>

  );
};

export default AboutPage;
