import React, { useEffect, useRef, useState } from "react";
import ReactLenis from "lenis/react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home";

// Component to handle scroll reset on route changes
function ScrollToTop() {
  const { pathname } = useLocation();
  const lenisRef = useRef(null);

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);

    // Also reset Lenis scroll if available
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    }
  }, [pathname]);

  return null;
}

function App() {
  const lenisRef = useRef(null);
  const [lenisEnabled, setLenisEnabled] = useState(false);

  useEffect(() => {
    // Force scroll to top immediately on mount
    window.scrollTo(0, 0);

    // Prevent scroll restoration by browser
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Hide body overflow initially
    document.body.style.overflow = "hidden";

    // Wait for everything to load and then recalculate
    const initTimer = setTimeout(() => {
      // Enable Lenis
      setLenisEnabled(true);

      // Recalculate Lenis dimensions and scroll to top
      if (lenisRef.current?.lenis) {
        lenisRef.current.lenis.resize();
        lenisRef.current.lenis.scrollTo(0, { immediate: true });
      }

      // Allow body scrolling
      document.body.style.overflow = "auto";
    }, 100);

    // Cleanup
    return () => {
      clearTimeout(initTimer);
      document.body.style.overflow = "auto";

      // Restore default scroll restoration
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "auto";
      }
    };
  }, []);

  return (
    <>
      <ReactLenis
        root
        ref={lenisRef}
        options={{
          lerp: 0.1,
          duration: 1.2,
          smoothWheel: true,
          prevent: !lenisEnabled,
        }}
      >
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/home" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </ReactLenis>
    </>
  );
}

export default App;
