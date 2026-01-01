import React from "react";
import "./LinkText.css";
import { Link } from "react-router-dom";

export default function LinkText({ text, to, sx }) {
  const offsetIncrement = 0.01;

  const renderChars = () => {
    return [...text].map((char, i) => (
      <span
        key={i}
        style={{
          display: "inline-block",
          transition: "all 0.35s cubic-bezier(.26,.2,0,1.31)",
          transitionDelay: `${i * offsetIncrement}s`,
          whiteSpace: char === " " ? "pre" : "normal",
        }}
      >
        {char}
      </span>
    ));
  };

  return (
    <div className="main-link-txt">
      <Link style={sx} to={to}>
        {renderChars()}
      </Link>
    </div>
  );
}
