import React from "react";
import "./Hero.css";
import gsap from "gsap";
import Navbar from "../../../../Components/Navbar/Navbar";
import BtnAnimated from "../../../../Components/Buttons/Animated/BtnAnimated";

export default function Hero() {
  return (
    <div className="main-hero-section">
      <div className="hero-section">
        <div className="top-txt-hero">
          <h1>
            Building sites for brands fed up with the generic{" "}
            <z id="strike">nonsense.</z>
          </h1>
          <span id="desc-hero">
            My name is Mohit Tiwari and I am a 14 year old creative web dev from
            India, I help brands and people like you in making their website
            stand out from the rest of the competition. No bullsh#t, No
            shortcuts, Just real results.
          </span>
          <div className="btn-hero">
            <BtnAnimated text={"Get In Touch"}></BtnAnimated>
          </div>
        </div>
      </div>
    </div>
  );
}
