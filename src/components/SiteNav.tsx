import React from "react";
import BubbleMenu from "./BubbleMenu";
import Ylogo from '/assets/Ylogo.png'

// Global main navigation used across all routes
const SiteNav: React.FC = () => {
  return (
    <BubbleMenu
      logo={<span style={{ fontWeight: 700, fontSize: '1.5rem' }}><img src={Ylogo} loading="lazy" /></span>}
      logoHref="/YoussefHamadPortfolio/home"
      logoAriaLabel="Home"
      menuAriaLabel="Toggle navigation"
      menuBg="#ffffff"
      menuContentColor="#111111"
      useFixedPosition={true}
      animationEase="back.out(1.5)"
      animationDuration={0.5}
      staggerDelay={0.12}
    />
  );
};

export default SiteNav;
