import React, { useEffect } from "react";
import "./FourthSection.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import regrese from "../../../../assets/Images/regreseProjectPhoto.webp";
import quickcopies from "../../../../assets/Images/quickCopiesProjectPhoto.webp";
import coding4good from "../../../../assets/Images/coding4GoodProjectPhoto.webp";

import BtnAnimated from "../../../../Components/Buttons/Animated/BtnAnimated";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function FourthSection() {
  useEffect(() => {
    const split = new SplitText(".top-txt-fourth-section h1", {
      type: "words",
      wordsClass: "word-top-fourth-section",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".main-fourth-section",
        start: "top bottom-=250px",
      },
    });

    tl.fromTo(
      ".word-top-fourth-section",
      { scaleY: 0.7, opacity: 0, filter: "blur(2px)" },
      {
        scaleY: 1,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.6,
        ease: "back.out(1.6)",
        stagger: 0.02,
      }
    );

    tl.fromTo(
      "#desc-fourth-section",
      { opacity: 0, y: 20, filter: "blur(2px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.4,
        ease: "back.out(1.6)",
      },
      0.8
    );

    return () => {
      split.revert();
      tl.kill();
      ScrollTrigger.refresh();
    };
  }, []);

  useEffect(() => {
    const mm = ScrollTrigger.matchMedia();

    mm.add("(min-width: 1060px)", () => {
      gsap.fromTo(
        ".service.one",
        {
          boxShadow:
            "rgba(0, 0, 0, 0.30) 0px 120px 180px -80px, rgba(0, 0, 0, 0.22) 0px 80px 140px -70px, rgba(0, 0, 0, 0.15) 0px 40px 80px -50px",
        },
        {
          boxShadow:
            "rgba(0, 0, 0, 0) 0px 40px 60px -30px,rgba(0, 0, 0, 0) 0px 24px 40px -28px,rgba(0, 0, 0, 0) 0px 12px 20px -18px",
          scrollTrigger: {
            trigger: ".service.one",
            start: "top bottom",
            end: "bottom center-=250px",
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        ".service.two",
        {
          transform:
            "translate(0%, -73.6863%) translate3d(0px, 0px, 0px) rotate(-3.6843deg)",
          boxShadow:
            "rgba(0, 0, 0, 0.30) 0px 120px 180px -80px, rgba(0, 0, 0, 0.22) 0px 80px 140px -70px, rgba(0, 0, 0, 0.15) 0px 40px 80px -50px",
        },
        {
          transform:
            "translate(0%, 0%) translate3d(0px, 0px, 0px) rotate(0deg)",
          boxShadow:
            "rgba(0, 0, 0, 0) 0px 40px 60px -30px,rgba(0, 0, 0, 0) 0px 24px 40px -28px,rgba(0, 0, 0, 0) 0px 12px 20px -18px",
          scrollTrigger: {
            trigger: ".service.two",
            start: "top bottom",
            end: "bottom center-=250px",
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        ".service.three",
        {
          transform:
            "translate(0%, -147.373%) translate3d(0px, 0px, 0px) rotate(-7.3686deg)",
          boxShadow:
            "rgba(0, 0, 0, 0.30) 0px 120px 180px -80px, rgba(0, 0, 0, 0.22) 0px 80px 140px -70px, rgba(0, 0, 0, 0.15) 0px 40px 80px -50px",
        },
        {
          transform:
            "translate(0%, 0%) translate3d(0px, 0px, 0px) rotate(0deg)",
          boxShadow:
            "rgba(0, 0, 0, 0) 0px 40px 60px -30px,rgba(0, 0, 0, 0) 0px 24px 40px -28px,rgba(0, 0, 0, 0) 0px 12px 20px -18px",
          scrollTrigger: {
            trigger: ".service.two",
            start: "top bottom",
            end: "bottom center-=250px",
            scrub: true,
          },
        }
      );
    });
  }, []);

  return (
    <div className="main-fourth-section">
      <div className="fourth-section">
        <div className="top-txt-fourth-section">
          <h1>Core Services I Offer</h1>
          <span id="desc-fourth-section">Areas I truly thrive in.</span>
        </div>

        <div className="services-bottom">
          <div className="service one">
            <div className="service-left">
              <h1>Web Development</h1>
              <span id="service-span">
                Fast, responsive, and built to perform—your website engineered
                without the messy technical nonsense.
              </span>
              <BtnAnimated
                sx={{ width: "256px", height: "54px" }}
                fontSize={"25px"}
                text={"Start  a project"}
              />
            </div>
            <div className="service-right">
              <img src={regrese} alt="" />
            </div>
          </div>

          <div className="service two">
            <div className="service-left">
              <h1>Web Design</h1>
              <span id="service-span">
                Designs that look good, feel right, and make your brand
                impossible to ignore.
              </span>
              <BtnAnimated
                sx={{ width: "256px", height: "54px" }}
                fontSize={"25px"}
                text={"Start  a project"}
              />
            </div>
            <div className="service-right">
              <img src={coding4good} alt="" />
            </div>
          </div>

          <div className="service three">
            <div className="service-left">
              <h1>The Full Package</h1>
              <span id="service-span">
                The all-in-one treatment: design and development working
                together to create something actually worth launching.
              </span>
              <BtnAnimated
                sx={{ width: "256px", height: "54px" }}
                fontSize={"25px"}
                text={"Start  a project"}
              />
            </div>
            <div className="service-right">
              <img src={quickcopies} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
