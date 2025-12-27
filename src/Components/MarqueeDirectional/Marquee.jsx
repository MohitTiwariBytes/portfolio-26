import React, { useEffect, useRef, useState } from "react";
import "./Marquee.css";

export default function Marquee({
  children,
  baseSpeed = 120,
  baseDirection = "left",
}) {
  const wrapperRef = useRef(null);
  const groupRef = useRef(null);
  const startedRef = useRef(false);
  const rafRef = useRef(null);
  const lastTimeRef = useRef(0);
  const offsetRef = useRef(0);
  const [repeat, setRepeat] = useState(1);
  const singleWidthRef = useRef(0);

  // direction mapping and opposite setup
  const directionMap = { left: -1, right: 1 };
  const baseDirValue = directionMap[baseDirection] ?? -1;
  const oppositeDirValue = baseDirValue * -1;

  const directionRef = useRef(baseDirValue);
  const lastScrollYRef = useRef(window.scrollY);

  // Detect touch device
  const isTouchDevice =
    "ontouchstart" in window || navigator.maxTouchPoints > 0;

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    requestAnimationFrame(() => {
      const group = groupRef.current;
      if (!group) return;
      const groupWidth = group.offsetWidth;
      singleWidthRef.current = groupWidth || 1;
      const windowWidth = window.innerWidth;
      const repeatCount = Math.ceil(windowWidth / groupWidth) + 2;
      setRepeat(repeatCount);
    });
  }, []);

  // Scroll handling (direction + boost) - only on non-touch devices
  useEffect(() => {
    if (isTouchDevice) return; // Skip scroll handling on touch devices

    const handleScroll = () => {
      const currentY = window.scrollY;
      const dy = currentY - lastScrollYRef.current;
      lastScrollYRef.current = currentY;

      if (dy === 0) return;

      // Determine direction based on scroll
      if (dy > 0) {
        // scrolling down → move opposite direction
        directionRef.current = oppositeDirValue;
      } else if (dy < 0) {
        // scrolling up → move base direction
        directionRef.current = baseDirValue;
      }

      // Apply boost
      const boostStrength = Math.abs(dy) * 0.4;
      offsetRef.current += directionRef.current * boostStrength;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [baseDirValue, oppositeDirValue, isTouchDevice]);

  // Animation loop
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const step = (now) => {
      const dt = (now - lastTimeRef.current) / 1000;
      lastTimeRef.current = now;

      offsetRef.current += directionRef.current * baseSpeed * dt;

      const singleW = singleWidthRef.current;
      const firstChild = wrapper.firstElementChild;
      const lastChild = wrapper.lastElementChild;

      // move left
      if (directionRef.current === -1 && firstChild) {
        const rect = firstChild.getBoundingClientRect();
        if (rect.right <= 0) {
          wrapper.appendChild(firstChild);
          offsetRef.current += singleW;
        }
      }

      // move right
      if (directionRef.current === 1 && lastChild) {
        const rect = lastChild.getBoundingClientRect();
        if (rect.left >= window.innerWidth) {
          wrapper.prepend(lastChild);
          offsetRef.current -= singleW;
        }
      }

      wrapper.style.transform = `translateX(${offsetRef.current}px)`;
      rafRef.current = requestAnimationFrame(step);
    };

    lastTimeRef.current = performance.now();
    rafRef.current = requestAnimationFrame(step);

    return () => cancelAnimationFrame(rafRef.current);
  }, [repeat, baseSpeed]);

  return (
    <div className="main-marquee" aria-hidden="true">
      <div className="marquee-inner" ref={wrapperRef}>
        {[...Array(repeat)].map((_, i) => (
          <div
            className="marquee-group"
            key={i}
            ref={i === 0 ? groupRef : null}
          >
            {children}
          </div>
        ))}
      </div>
    </div>
  );
}
