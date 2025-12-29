import React, { useEffect, useState } from "react";
import "./ThirdSection.css";
import gsap from "gsap";
import arnav from "../../../../assets/Images/arnav.webp";
import haritos from "../../../../assets/Images/haritos.webp";
import BtnAnimated from "../../../../Components/Buttons/Animated/BtnAnimated";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const REVIEWS = [
  {
    name: "Arnav Ravinder",
    image: arnav,
    title: "Founder, Coding4Good",
    projectLink: "https://coding4good.in",
    review: `“Mohit is a very talented young freelancer and they can make
    responsive websites across designs. They work very quickly and
    communicate/iterate well. He would be a good asset to any team
    // good freelancer to build your own site!”`,
  },
  {
    name: "Haritos Constantinos",
    image: haritos,
    title: "Founder & Director @thedatabase.co",
    projectLink: "https://re-regrese.cz",
    review: `“Mohit Tiwari brought incredible effort and a genuine will to
    collaborate throughout our project. He took the time to deeply
    understand the project's needs and delivered creative,
    thoughtful solutions that elevated the outcome. A true partner
    in every sense.”`,
  },
];

export default function ThirdSection() {
  const [buttonStyle, setButtonStyle] = useState({
    fontSize: 25,
    width: "232px",
    height: "54px",
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 572) {
        setButtonStyle({
          fontSize: 18,
          width: "170px",
          height: "40px",
        });
      } else {
        setButtonStyle({
          fontSize: 25,
          width: "232px",
          height: "54px",
        });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function syncReviewHeights() {
    const reviews = document.querySelectorAll(".review");
    if (!reviews.length) return;

    reviews.forEach((r) => (r.style.height = "auto"));

    let maxHeight = 0;
    reviews.forEach((r) => {
      maxHeight = Math.max(maxHeight, r.offsetHeight);
    });

    reviews.forEach((r) => {
      r.style.height = `${maxHeight}px`;
    });
  }

  window.addEventListener("load", syncReviewHeights);

  window.addEventListener("resize", () => {
    clearTimeout(window.__reviewResizeTimeout);
    window.__reviewResizeTimeout = setTimeout(syncReviewHeights, 100);
  });

  useEffect(() => {
    const split = new SplitText(".top-txt-third-section h1", {
      type: "words",
      wordsClass: "word-top-third-section",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".main-third-section",
        start: "top bottom-=250px",
      },
    });

    tl.fromTo(
      ".word-top-third-section",
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
      "#desc-third-section",
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
      ".review",
      { opacity: 0, y: 20, filter: "blur(2px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.4,
        stagger: 0.06,
        ease: "back.out(1.6)",
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
    <div className="main-third-section">
      <div className="third-section">
        <div className="top-txt-third-section">
          <h1>Here’s what they say...</h1>
          <span id="desc-third-section">
            What my partners think about working with me.
          </span>
        </div>

        <div className="reviews-bottom">
          <div className="reviews-wrapper">
            {REVIEWS.map((r, i) => (
              <div className="review" key={i}>
                <div className="review-top">
                  <div className="review-top-left">
                    <div className="pfp">
                      <img src={r.image} alt={r.name} />
                    </div>
                    <div className="txt-wrap">
                      <h1>{r.name}</h1>
                      <span>{r.title}</span>
                    </div>
                  </div>

                  <div className="btn-review-right">
                    <BtnAnimated
                      sx={{
                        width: buttonStyle.width,
                        height: buttonStyle.height,
                      }}
                      fontSize={buttonStyle.fontSize}
                      text="Open Project"
                      onClick={() => window.open(r.projectLink, "_blank")}
                    />
                  </div>
                </div>

                <div className="divider-dashed"></div>

                <div className="review-txt">
                  <h1>{r.review}</h1>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
