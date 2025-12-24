import React from "react";
import "./BtnAnimated.css";
import gsap from "gsap";

export default function BtnAnimated({ sx, text, onClick }) {
  return (
    <div style={sx} onClick={onClick} className="btn-animated">
      <div className="btn-left-icon">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M9.53033 2.21966L9 1.68933L7.93934 2.74999L8.46967 3.28032L12.4393 7.24999H1.75H1V8.74999H1.75H12.4393L8.46967 12.7197L7.93934 13.25L9 14.3107L9.53033 13.7803L14.6036 8.70709C14.9941 8.31657 14.9941 7.6834 14.6036 7.29288L9.53033 2.21966Z"
            fill="#7D0303"
          />
        </svg>
      </div>
      <div className="btn-text">
        <span>{text}</span>
      </div>
    </div>
  );
}
