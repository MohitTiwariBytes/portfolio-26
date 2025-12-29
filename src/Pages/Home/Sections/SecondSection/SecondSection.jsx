import React, { useEffect, useState, useRef } from "react";
import "./SecondSection.css";

import regrese from "../../../../assets/Images/regreseProjectPhoto.webp";
import quickcopies from "../../../../assets/Images/quickCopiesProjectPhoto.webp";
import coding4good from "../../../../assets/Images/coding4GoodProjectPhoto.webp";

import BtnAnimated from "../../../../Components/Buttons/Animated/BtnAnimated";
import BtnNormal from "../../../../Components/Buttons/Normal/BtnNormal";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import { useLenis } from "lenis/react";

gsap.registerPlugin(ScrollTrigger, SplitText);

const projects = [
  {
    id: 1,
    title: "Regrese®",
    type: "Development",
    image: regrese,
    link: "https://re-regrese.cz",
    credits: {
      Design: "Haritos Constantinos",
      Development: "Mohit Tiwari",
      Studio: "Ala Design Studio",
      "Brand Design": "Alena Figurová",
    },
  },
  {
    id: 2,
    title: "Quick Copies",
    type: "Development",
    image: quickcopies,
    link: "https://quickcopies.com",
    credits: {
      Design: "Stas Kolesnik",
      Development: "Mohit Tiwari",
      Studio: "SHVDOW",
    },
  },
  {
    id: 3,
    title: "Coding 4 Good",
    type: "Development",
    image: coding4good,
    link: "https://coding4good.in",
    credits: {
      Design: "Mohit Tiwari",
      Development: "Mohit Tiwari",
    },
  },
];

export default function SecondSection() {
  const [buttonStyle, setButtonStyle] = useState({
    fontSize: 20,
    widthMain: "620px",
    heightMain: "46px",
    widthSecondary: "96px",
    heightSecondary: "46px",
  });

  const [isCreditsOpen, setIsCreditsOpen] = useState(false);
  const [activeCredits, setActiveCredits] = useState(null);
  const modalRef = useRef(null);
  const modalOverlayRef = useRef(null);
  const lenis = useLenis();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 572) {
        setButtonStyle({
          fontSize: 16,
          widthMain: "445px",
          heightMain: "36px",
          widthSecondary: "70px",
          heightSecondary: "36px",
        });
      } else {
        setButtonStyle({
          fontSize: 20,
          widthMain: "620px",
          heightMain: "46px",
          widthSecondary: "87px",
          heightSecondary: "46px",
        });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 🔹 STOP SCROLLING WHEN MODAL IS OPEN
  useEffect(() => {
    if (isCreditsOpen) {
      lenis?.stop();
    } else {
      lenis?.start();
    }
  }, [isCreditsOpen, lenis]);

  // 🔹 CLICK OUTSIDE TO CLOSE
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isCreditsOpen &&
        modalRef.current &&
        !modalRef.current.contains(event.target)
      ) {
        setIsCreditsOpen(false);
      }
    };

    if (isCreditsOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCreditsOpen]);

  useEffect(() => {
    if (!modalRef.current) return;

    if (isCreditsOpen) {
      document.body.classList.add("credits-open");

      gsap.fromTo(
        modalRef.current,
        { opacity: 0, y: 20, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: "backEase",
        }
      );
    } else {
      document.body.classList.remove("credits-open");

      gsap.to(modalRef.current, {
        opacity: 0,
        y: 20,
        scale: 0.96,
        duration: 0.3,
        ease: "backEase",
        onComplete: () => setActiveCredits(null),
      });
    }
  }, [isCreditsOpen]);

  useEffect(() => {
    const split = new SplitText(".top-txt-second-section h1", {
      type: "words",
      wordsClass: "word-top-second-section",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".main-second-section",
        start: "top bottom-=250px",
      },
    });

    tl.fromTo(
      ".word-top-second-section",
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
      "#desc-second-section",
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

    tl.fromTo(
      ".work-txt",
      { opacity: 0, y: 20, filter: "blur(2px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.4,
        ease: "back.out(1.6)",
      },
      1
    );

    tl.fromTo(
      ".projects-bottom .project",
      { opacity: 0, y: 20, filter: "blur(2px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.4,
        ease: "back.out(1.4)",
        stagger: 0.06,
      },
      1
    );

    return () => {
      split.revert();
      tl.kill();
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <div className="main-second-section main-home-page">
      {/* MODAL — NOT MOVED */}
      <div
        className="modal-credits"
        ref={modalRef}
        style={{ pointerEvents: isCreditsOpen ? "auto" : "none" }}
      >
        <div className="top-modal-credits">
          <div className="txt-modal-top">
            <h1>Credits</h1>
            <span>Appreciation and acknowledgements</span>
          </div>

          <svg
            width="44"
            height="44"
            viewBox="0 0 44 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => setIsCreditsOpen(false)}
            style={{ cursor: "pointer" }}
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M34.2918 37.2083L35.7501 38.6669L38.667 35.75L37.2084 34.2916L24.9169 21.9999L37.2084 9.70835L38.667 8.24994L35.7501 5.33313L34.2918 6.79154L22.0001 19.0831L9.70847 6.79154L8.25007 5.33313L5.33325 8.24994L6.79166 9.70835L19.0833 21.9999L6.79166 34.2916L5.33325 35.75L8.25007 38.6669L9.70847 37.2083L22.0001 24.9168L34.2918 37.2083Z"
              fill="black"
            />
          </svg>
        </div>

        <div className="credits-main">
          {activeCredits &&
            Object.entries(activeCredits).map(([role, name]) => (
              <div className="credit" key={role}>
                <h1>{role}:</h1>
                <h1>{name}</h1>
              </div>
            ))}
        </div>
      </div>

      <div className="second-section">
        <div className="top-txt-second-section">
          <h1>
            Making cool <z>sh#t</z> since <z>'23</z>
          </h1>

          <span id="desc-second-section">
            I've been into creating wonderful websites since 2023. Ever since
            then, I've collaborated with multiple designers and agencies to
            deliver the best outcome possible.
          </span>
        </div>

        <div className="projects-bottom">
          <div className="work-txt">
            <span>Recent</span>
            <span id="aloo-txt">
              Work <p>{projects.length}</p>
            </span>
          </div>

          <div className="projects-wrapper">
            {projects.map((project) => (
              <div className="project" key={project.id}>
                <div className="project-img">
                  <img src={project.image} alt="" />
                </div>

                <div className="wrap-project">
                  <div className="project-info">
                    <div className="txt-project">
                      <h1>{project.title}</h1>
                      <span>{project.type}</span>
                    </div>
                  </div>

                  <div className="btns-project">
                    <BtnAnimated
                      sx={{
                        width: buttonStyle.widthMain,
                        height: buttonStyle.heightMain,
                      }}
                      fontSize={buttonStyle.fontSize}
                      onClick={() =>
                        window.open(
                          project.link,
                          "_blank",
                          "noopener,noreferrer"
                        )
                      }
                      text="Open Website"
                    />

                    <BtnNormal
                      sx={{
                        width: buttonStyle.widthSecondary,
                        height: buttonStyle.heightSecondary,
                      }}
                      fontSize={buttonStyle.fontSize}
                      text="Credits"
                      animated={false}
                      onClick={() => {
                        setActiveCredits(project.credits);
                        setIsCreditsOpen(true);
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
