import React from 'react';
import { gsap } from 'gsap';

interface MenuItemProps {
  link: string;
  texts: string[];
  images: string[];
  desc?: string;
}

interface FlowingMenuProps {
  items?: MenuItemProps[];
}

const FlowingMenu: React.FC<FlowingMenuProps> = ({ items = [] }) => {
  return (
    <div className="w-full h-full overflow-hidden">
      <nav className="flex flex-col h-full m-0 p-0">
        {items.map((item, idx) => (
          <MenuItem key={idx} {...item} />
        ))}
      </nav>
    </div>
  );
};

const MenuItem: React.FC<MenuItemProps> = React.memo(({ link, texts, images }) => {
  const itemRef = React.useRef<HTMLDivElement>(null);
  const marqueeRef = React.useRef<HTMLDivElement>(null);
  const marqueeInnerRef = React.useRef<HTMLDivElement>(null);
  const tlRef = React.useRef<gsap.core.Timeline | null>(null);

  const animationDefaults = { duration: 0.6, ease: 'expo' };

  // Preload images once per item to avoid flicker on first hover
  React.useEffect(() => {
    images?.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [images]);

  const findClosestEdge = (mouseX: number, mouseY: number, width: number, height: number): 'top' | 'bottom' => {
    const topEdgeDist = Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY, 2);
    const bottomEdgeDist = Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY - height, 2);
    return topEdgeDist < bottomEdgeDist ? 'top' : 'bottom';
  };

  const handleMouseEnter = (ev: React.MouseEvent<HTMLDivElement>) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(ev.clientX - rect.left, ev.clientY - rect.top, rect.width, rect.height);

    // Kill any existing timeline to avoid conflicts
    if (tlRef.current) {
      tlRef.current.kill();
      tlRef.current = null;
    }
    const tl = gsap.timeline({ defaults: animationDefaults, overwrite: 'auto' });
    tl.set([marqueeRef.current, marqueeInnerRef.current], { force3D: true })
      .set(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' })
      .set(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' })
      .to([marqueeRef.current, marqueeInnerRef.current], { y: '0%' });
    tlRef.current = tl;
  };

  const handleMouseLeave = (ev: React.MouseEvent<HTMLDivElement>) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(ev.clientX - rect.left, ev.clientY - rect.top, rect.width, rect.height);

    if (tlRef.current) {
      tlRef.current.kill();
      tlRef.current = null;
    }
    const tl = gsap.timeline({ defaults: animationDefaults, overwrite: 'auto' });
    tl.set([marqueeRef.current, marqueeInnerRef.current], { force3D: true })
      .to(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' })
      .to(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' });
    tlRef.current = tl;
  };

  const title = React.useMemo(() => (texts && texts.length > 0 ? texts[0] : ''), [texts]);

  const buildSequence = React.useCallback(
    (prefix: string) => {
      const nodes: React.ReactNode[] = [];
      const maxLen = Math.max(texts?.length ?? 0, images?.length ?? 0);
      for (let i = 0; i < maxLen; i++) {
        if (texts[i]) {
          nodes.push(
            <span
              key={`${prefix}-t-${i}`}
              className="text-[#060010] uppercase font-normal text-[1.3vh] sm:text-[3.2vh] md:text-[4vh] leading-[1.2] p-[1vh_1.5vw_0]"
            >
              {texts[i]}
            </span>
          );
        }
        if (images[i]) {
          nodes.push(
            <div
              key={`${prefix}-i-${i}`}
              className="w-[140px] sm:w-[180px] md:w-[200px] h-[6vh] sm:h-[6.5vh] md:h-[7vh] my-[1.5em] sm:my-[2em] mx-[2vw] p-[1em_0] rounded-[40px] sm:rounded-[50px] bg-cover bg-center"
              style={{ backgroundImage: `url(${images[i]})` }}
            />
          );
        }
      }
      if (nodes.length === 0) {
        if (texts?.length) {
          texts.forEach((t, i) =>
            nodes.push(
              <span
                key={`${prefix}-ft-${i}`}
                className="text-[#060010] uppercase font-normal text-[2.7vh] sm:text-[3.2vh] md:text-[4vh] leading-[1.2] p-[1vh_1.5vw_0]"
              >
                {t}
              </span>
            )
          );
        }
        if (images?.length) {
          images.forEach((img, i) =>
            nodes.push(
              <div
                key={`${prefix}-fi-${i}`}
                className="w-[140px] sm:w-[180px] md:w-[200px] h-[6vh] sm:h-[6.5vh] md:h-[7vh] my-[1.5em] sm:my-[2em] mx-[2vw] p-[1em_0] rounded-[40px] sm:rounded-[50px] bg-cover bg-center"
                style={{ backgroundImage: `url(${img})` }}
              />
            )
          );
        }
      }
      return nodes;
    },
    [texts, images]
  );

  const repeatedMarqueeContent = React.useMemo(() => {
    return Array.from({ length: 4 }).map((_, idx) => (
      <React.Fragment key={idx}>{buildSequence(`r${idx}`)}</React.Fragment>
    ));
  }, [buildSequence]);

  return (
    <div
      className="group flex-1 relative overflow-hidden text-center shadow-[0_-1px_0_0_#fff] min-h-[88px] sm:min-h-[100px] md:min-h-[120px]"
      ref={itemRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <a
        className="flex items-center justify-center h-full relative cursor-pointer uppercase no-underline font-semibold text-white text-[3.2vh] sm:text-[3.6vh] md:text-[4vh] px-3 hover:text-[#060010] group-hover:text-[#060010] focus:text-white focus-visible:text-[#060010]"
        href={link}
      >
        {title}
      </a>
      <div
        className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none bg-white translate-y-[101%] will-change-transform"
        ref={marqueeRef}
      >
        <div className="h-full w-[200%] flex will-change-transform" ref={marqueeInnerRef}>
          <div className="flex items-center relative h-full w-[200%] will-change-transform animate-marquee">
            {repeatedMarqueeContent}
          </div>
        </div>
      </div>
    </div>
  );
});

export default FlowingMenu;

// Note: this is also needed
// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
//   theme: {
//     extend: {
//       translate: {
//         '101': '101%',
//       },
//       keyframes: {
//         marquee: {
//           'from': { transform: 'translateX(0%)' },
//           'to': { transform: 'translateX(-50%)' }
//         }
//       },
//       animation: {
//         marquee: 'marquee 15s linear infinite'
//       }
//     }
//   },
//   plugins: [],
// };
