import React, { useEffect } from "react";
import "./Hero.css";
import gsap from "gsap";
import Navbar from "../../../../Components/Navbar/Navbar";
import BtnAnimated from "../../../../Components/Buttons/Animated/BtnAnimated";
import regrese from "../../../../assets/Images/regreseProjectPhoto.webp";
import quickcopies from "../../../../assets/Images/quickCopiesProjectPhoto.webp";
import coding4good from "../../../../assets/Images/coding4GoodProjectPhoto.webp";
import Marquee from "../../../../Components/MarqueeDirectional/Marquee";

export default function Hero() {
  useEffect(() => {
    const setHeroMinHeight = () => {
      const hero = document.querySelector(".main-hero-section");
      if (!hero) return;

      const MIN_HEIGHT = 800;
      const MAX_HEIGHT = 1000;
      const viewportHeight = window.innerHeight;

      const clampedHeight = Math.min(
        Math.max(viewportHeight, MIN_HEIGHT),
        MAX_HEIGHT
      );

      hero.style.minHeight = `${clampedHeight}px`;
    };

    setHeroMinHeight(); // run once on load
  }, []);

  return (
    <div className="main-hero-section">
      <Navbar />

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
            <BtnAnimated text={"Get In Touch"} />
          </div>
        </div>
      </div>

      <div className="marquee-btm">
        <Marquee baseDirection="left" baseSpeed={120}>
          <div className="img-grp-marquee">
            <img src={regrese} alt="Regrese" />
            <img src={coding4good} alt="Coding4Good" />
            <img src={quickcopies} alt="Quick Copies" />
          </div>
        </Marquee>
      </div>
    </div>
  );
}
