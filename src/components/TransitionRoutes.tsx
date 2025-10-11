import React, { useEffect, useRef, useState, useMemo } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import WorkPage from "../pages/WorkPage";
import ContactPage from "../pages/ContactPage";

const DURATION = 1.5;
const EASE = [0.22, 1, 0.36, 1] as const;

// Memoized page components - they should work without any props
const MemoizedHomePage = React.memo(HomePage);
const MemoizedAboutPage = React.memo(AboutPage);
const MemoizedWorkPage = React.memo(WorkPage);
const MemoizedContactPage = React.memo(ContactPage);

// Component to render the appropriate page based on pathname
const PageContent = React.memo(({ pathname }: { pathname: string }) => {
  switch (pathname) {
    case "/YoussefHamadPortfolio/home":
      return <MemoizedHomePage />;
    case "/YoussefHamadPortfolio/about":
      return <MemoizedAboutPage />;
    case "/YoussefHamadPortfolio/work":
      return <MemoizedWorkPage />;
    case "/YoussefHamadPortfolio/contact":
      return <MemoizedContactPage />;
    case "/":
      return <Navigate to="/YoussefHamadPortfolio/home" replace />;
    default:
      return <Navigate to="/YoussefHamadPortfolio/home" replace />;
  }
});

export default function TransitionRoutes() {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState(location);
  const [transitionLocation, setTransitionLocation] = useState(location);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    // Only start transition if location actually changed
    if (location.key !== prevLocation.key) {
      setTransitionLocation({ ...location }); // Create a new object to freeze the state
      setIsTransitioning(true);
      
      const prevBg = document.body.style.backgroundColor;
      document.body.style.backgroundColor = "#000";

      timeoutRef.current = window.setTimeout(() => {
        setPrevLocation(location);
        setIsTransitioning(false);
        document.body.style.backgroundColor = prevBg;
      }, DURATION * 1000);
    }

    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [location, prevLocation.key]);

  // Memoized content elements
  const currentContent = useMemo(() => (
    <PageContent pathname={location.pathname} />
  ), [location.pathname]);

  const prevContent = useMemo(() => (
    <PageContent pathname={prevLocation.pathname} />
  ), [prevLocation.pathname]);

  const transitionContent = useMemo(() => (
    <PageContent pathname={transitionLocation.pathname} />
  ), [transitionLocation.pathname]);

  if (!isTransitioning) {
    return currentContent;
  }

  return (
    <>
      {/* Outgoing page - previous location content sliding out */}
      <motion.div
        key={`out-${prevLocation.key}`}
        className="fixed inset-0 z-[900] bg-black"
        initial={{ y: 0 }}
        animate={{ y: "-100vh" }}
        transition={{ duration: DURATION, ease: EASE }}
        style={{ willChange: "transform" }}
      >
        {prevContent}
      </motion.div>

      {/* Incoming page - transition location content sliding in (frozen) */}
      <motion.div
        key={`in-${transitionLocation.key}`}
        className="fixed inset-0 z-[901] bg-black"
        initial={{ y: "100vh" }}
        animate={{ y: 0 }}
        transition={{ duration: DURATION, ease: EASE }}
        style={{ willChange: "transform" }}
      >
        {transitionContent}
      </motion.div>
    </>
  );
}