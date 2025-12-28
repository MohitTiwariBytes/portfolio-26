import React, { useEffect, useRef, useState } from "react";
import "./BtnNormal.css";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);

export default function BtnNormal({
  animated = true, // 👈 BOOLEAN FLAG
  onClick,
  text,
  sx,
  fontSize,
}) {
  // 🔴 EARLY RETURN — NO ANIMATION MODE
  if (!animated) {
    return (
      <div className="main-btn-normal">
        <button style={sx} onClick={onClick}>
          <span style={{ fontSize }}>{text}</span>
        </button>
      </div>
    );
  }

  // ===============================
  // ANIMATED VERSION (UNCHANGED)
  // ===============================

  const spanRef = useRef(null);
  const wrapperRef = useRef(null);
  const buttonRef = useRef(null);

  const [spanPositions, setSpanPositions] = useState({
    span1X: 0,
    span1Y: 0,
    span2Y: 0,
    span3Y: 0,
    span4X: 0,
    span5X: 0,
  });

  const isTouchDevice =
    "ontouchstart" in window || navigator.maxTouchPoints > 0;

  useEffect(() => {
    CustomEase.create("bouncyEasing", "0.175, 0.885, 0.32, 1.275");

    const measureSizes = () => {
      const allSpans = wrapperRef.current?.querySelectorAll("span");
      if (allSpans && allSpans.length >= 5) {
        const s1 = allSpans[0].getBoundingClientRect();
        const s2 = allSpans[1].getBoundingClientRect();
        const s3 = allSpans[2].getBoundingClientRect();
        const s4 = allSpans[3].getBoundingClientRect();
        const s5 = allSpans[4].getBoundingClientRect();

        setSpanPositions({
          span1X: s1.x,
          span1Y: s1.y,
          span2Y: s2.y,
          span3Y: s3.y,
          span4X: s4.x,
          span5X: s5.x,
        });
      }
    };

    requestAnimationFrame(measureSizes);
  }, [text]);

  const getMouseEnterDirection = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const top = y;
    const bottom = rect.height - y;
    const left = x;
    const right = rect.width - x;

    const min = Math.min(top, bottom, left, right);
    if (min === top) return "UP";
    if (min === bottom) return "DOWN";
    if (min === left) return "LEFT";
    if (min === right) return "RIGHT";
  };

  const handleMouseEnter = (e) => {
    if (isTouchDevice) return;

    const dir = getMouseEnterDirection(e);

    const vDown = spanPositions.span1Y - spanPositions.span2Y;
    const vUp = spanPositions.span3Y - spanPositions.span1Y;
    const hLeft = spanPositions.span1X - spanPositions.span4X;
    const hRight = spanPositions.span5X - spanPositions.span1X;

    const map = {
      DOWN: { y: -vDown, x: 0 },
      UP: { y: vUp, x: 0 },
      LEFT: { x: hLeft, y: 0 },
      RIGHT: { x: -hRight, y: 0 },
    };

    gsap.to(wrapperRef.current, {
      ...map[dir],
      ease: "elastic(0.4, 0.4)",
      duration: 0.7,
    });
  };

  const handleMouseLeave = () => {
    if (isTouchDevice) return;
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
            <span key={i} ref={i === 0 ? spanRef : null} style={{ fontSize }}>
              {text}
            </span>
          ))}
        </div>
      </button>
    </div>
  );
}
