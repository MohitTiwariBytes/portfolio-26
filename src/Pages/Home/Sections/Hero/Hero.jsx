import React, { useEffect } from "react";
import "./Hero.css";
import gsap from "gsap";
import Navbar from "../../../../Components/Navbar/Navbar";
import BtnAnimated from "../../../../Components/Buttons/Animated/BtnAnimated";
import regrese from "../../../../assets/Images/regreseProjectPhoto.webp";
import quickcopies from "../../../../assets/Images/quickCopiesProjectPhoto.webp";
import coding4good from "../../../../assets/Images/coding4GoodProjectPhoto.webp";
import Marquee from "../../../../Components/MarqueeDirectional/Marquee";
import SplitText from "gsap/SplitText";
import CustomEase from "gsap/CustomEase";
import { Link } from "react-router-dom";
import { openFormModal } from "../../../../Components/Forms/FormContact/FormContact";

gsap.registerPlugin(SplitText, CustomEase);

export default function Hero() {
  useEffect(() => {
    CustomEase.create("backEase", ".26,.2,0,1.31");
    // const setHeroMinHeight = () => {
    //   const hero = document.querySelector(".main-hero-section");
    //   if (!hero) return;

    //   const MIN_HEIGHT = 800;
    //   const MAX_HEIGHT = 10000;
    //   const viewportHeight = window.innerHeight;

    //   const clampedHeight = Math.min(
    //     Math.max(viewportHeight, MIN_HEIGHT),
    //     MAX_HEIGHT
    //   );

    //   hero.style.minHeight = `${clampedHeight}px`;
    // };

    // setHeroMinHeight(); // run once on load

    const split1 = new SplitText(".top-txt-hero h1", {
      type: "words",
      wordsClass: "word-top-h1++",
    });

    gsap.fromTo(
      ".word-top-h1",
      {
        transform: "scaleY(0.7)",
        filter: "blur(2px)",
        opacity: 0,
      },
      {
        transform: "scaleY(1)",
        filter: "blur(0px)",
        opacity: 1,
        ease: "backEase",
        duration: 0.6,
        stagger: 0.02,
        delay: 0.3,
      }
    );
    gsap.fromTo(
      "#desc-hero",
      {
        opacity: 0,
        filter: "blur(2px)",
        y: "20px",
      },
      {
        y: "0px",
        filter: "blur(0px)",
        opacity: 1,
        duration: 0.4,
        delay: 0.8,
        ease: "backEase",
      }
    );
    gsap.fromTo(
      ".btn-hero",
      {
        opacity: 0,
        filter: "blur(2px)",
        y: "20px",
      },
      {
        y: "0px",
        filter: "blur(0px)",
        opacity: 1,
        duration: 0.4,
        delay: 0.9,
        ease: "backEase",
      }
    );
    gsap.fromTo(
      ".marquee-btm",
      {
        opacity: 0,
        filter: "blur(2px)",
        y: "20px",
      },
      {
        y: "0px",
        filter: "blur(0px)",
        opacity: 1,
        duration: 0.4,
        delay: 0.9,
        ease: "backEase",
      }
    );
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
            My name is Mohit Tiwari, a creative web developer from India. I help
            brands build websites that stand out from the competition. No
            bullsh#t. No shortcuts. Just real results.
          </span>

          <div className="btn-hero">
            <BtnAnimated onClick={openFormModal} text={"Get In Touch"} />
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
