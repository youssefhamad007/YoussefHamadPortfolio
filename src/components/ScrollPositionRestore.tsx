import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Restores scroll position on hard refresh without altering existing refresh logic
export default function ScrollPositionRestore() {
  const location = useLocation();
  const STORAGE_KEY = 'scroll:pos';

  useEffect(() => {
    // Save on unload/refresh
    const save = () => {
      try {
        const data = {
          x: window.scrollX || 0,
          y: window.scrollY || 0,
          pathname: location.pathname,
          ts: Date.now(),
        };
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch {}
    };

    window.addEventListener('beforeunload', save);
    // Also save when page is hidden (mobile switch apps)
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') save();
    });

    return () => {
      window.removeEventListener('beforeunload', save);
    };
  }, [location.pathname]);

  useEffect(() => {
    // Attempt restore on mount (after layout)
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const data = JSON.parse(raw) as { x: number; y: number; pathname: string; ts: number };
      if (data && data.pathname === location.pathname) {
        // Allow layout to settle before scrolling
        requestAnimationFrame(() => {
          window.scrollTo({ left: data.x ?? 0, top: data.y ?? 0 });
        });
      }
    } catch {}
  }, [location.pathname]);

  return null;
}
