import React, { useEffect, useRef, useState } from "react";
import "./BtnNormal.css";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);

export default function BtnNormal({ onClick, text, sx }) {
  const spanRef = useRef(null); // text span ref
  const wrapperRef = useRef(null);
  const buttonRef = useRef(null); // button ref

  const [textSize, setTextSize] = useState({ width: 0, height: 0 });
  const [buttonSize, setButtonSize] = useState({ width: 0, height: 0 });
  const [spanPositions, setSpanPositions] = useState({
    span1X: 0,
    span1Y: 0,
    span2Y: 0,
    span3Y: 0,
    span4X: 0,
    span5X: 0,
  });

  // Detect touch device
  const isTouchDevice =
    "ontouchstart" in window || navigator.maxTouchPoints > 0;

  useEffect(() => {
    CustomEase.create("bouncyEasing", "0.175, 0.885, 0.32, 1.275");
    // Wait for layout to complete before measuring
    const measureSizes = () => {
      if (spanRef.current) {
        const rect = spanRef.current.getBoundingClientRect();
        setTextSize({ width: rect.width, height: rect.height });
      }

      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        setButtonSize({ width: rect.width, height: rect.height });
      }

      // Measure actual span positions
      const allSpans = wrapperRef.current?.querySelectorAll("span");
      if (allSpans && allSpans.length >= 5) {
        const span1Rect = allSpans[0].getBoundingClientRect();
        const span2Rect = allSpans[1].getBoundingClientRect();
        const span3Rect = allSpans[2].getBoundingClientRect();
        const span4Rect = allSpans[3].getBoundingClientRect();
        const span5Rect = allSpans[4].getBoundingClientRect();

        setSpanPositions({
          span1X: span1Rect.x,
          span1Y: span1Rect.y,
          span2Y: span2Rect.y,
          span3Y: span3Rect.y,
          span4X: span4Rect.x,
          span5X: span5Rect.x,
        });
      }
    };

    // Use requestAnimationFrame to ensure DOM is painted
    requestAnimationFrame(measureSizes);
  }, [text]);

  // Function to detect mouse enter direction
  const getMouseEnterDirection = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const w = rect.width;
    const h = rect.height;

    const top = y;
    const bottom = h - y;
    const left = x;
    const right = w - x;

    const min = Math.min(top, bottom, left, right);
    if (min === top) return "UP";
    if (min === bottom) return "DOWN";
    if (min === left) return "LEFT";
    if (min === right) return "RIGHT";
  };

  const handleMouseEnter = (e) => {
    if (isTouchDevice) return; // disable effect on touch
    const direction = getMouseEnterDirection(e);

    // Calculate dynamic offsets based on actual measured positions
    const verticalOffsetDown = spanPositions.span1Y - spanPositions.span2Y;
    const verticalOffsetUp = spanPositions.span3Y - spanPositions.span1Y;
    const horizontalOffsetLeft = spanPositions.span1X - spanPositions.span4X;
    const horizontalOffsetRight = spanPositions.span5X - spanPositions.span1X;

    if (direction === "DOWN") {
      gsap.to(wrapperRef.current, {
        y: -verticalOffsetDown,
        x: 0,
        ease: "elastic(0.4, 0.4)",
        duration: 0.7,
      });
    }
    if (direction === "UP") {
      gsap.to(wrapperRef.current, {
        y: verticalOffsetUp,
        x: 0,
        ease: "elastic(0.4, 0.4)",
        duration: 0.7,
      });
    }
    if (direction === "LEFT") {
      gsap.to(wrapperRef.current, {
        x: horizontalOffsetLeft,
        y: 0,
        ease: "elastic(0.4, 0.4)",
        duration: 0.7,
      });
    }
    if (direction === "RIGHT") {
      gsap.to(wrapperRef.current, {
        x: -horizontalOffsetRight,
        y: 0,
        ease: "elastic(0.4, 0.4)",
        duration: 0.7,
      });
    }
  };

  const handleMouseLeave = () => {
    if (isTouchDevice) return; // disable effect on touch
    gsap.to(wrapperRef.current, {
      x: 0,
      y: 0,
      ease: "elastic(0.4, 0.4)",
      duration: 0.7,
    });
  };

  return (
    <div className="main-btn-normal">
      <button
        ref={buttonRef}
        style={sx}
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div ref={wrapperRef} className="wrap-btn">
          {[0, 1, 2, 3, 4].map((_, i) => (
            <span key={i} ref={i === 0 ? spanRef : null}>
              {text}
            </span>
          ))}
        </div>
      </button>
    </div>
  );
}
