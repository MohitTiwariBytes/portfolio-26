import React, { useEffect } from "react";
import "./CTA.css";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";
import BtnNormal from "../../../../Components/Buttons/Normal/BtnNormal";
import mascot from "../../../../assets/Images/mascot.png";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function CTA() {
  useEffect(() => {
    const mm = gsap.matchMedia();

    const split = new SplitText(".cta h1", {
      type: "words",
      wordsClass: "word-top-cta-section",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".main-cta",
        start: "top 50%",
        end: "top top",
        scrub: true,
      },
    });

    tl.fromTo(
      ".word-top-cta-section",
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
      ".btn-cta",
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
      ".arrows-grp",
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

    mm.add("(min-width: 817px)", () => {
      gsap.fromTo(
        "#mascot-mohit",
        {
          top: "50px",
        },
        {
          top: "-110px",
          scrollTrigger: {
            trigger: ".main-cta",
            start: "top bottom-=100px",
            end: "top top",
            scrub: true,
          },
        }
      );
    });

    mm.add("(max-width: 816px)", () => {
      gsap.fromTo(
        "#mascot-mohit",
        {
          top: "50px",
        },
        {
          top: "-60px",
          scrollTrigger: {
            trigger: ".main-cta",
            start: "top bottom-=100px",
            end: "top top",
            scrub: true,
          },
        }
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <div className="main-cta">
      <div className="wrap-cta">
        <img id="mascot-mohit" src={mascot} alt="Mohit's mascot" />
        <div className="cta">
          <h1>Ready to build something that’s actually worth looking at?</h1>
          <div className="btn-cta">
            <BtnNormal
              sx={{ width: "173px", height: "53px" }}
              text={"Get in Touch"}
            ></BtnNormal>
          </div>
        </div>
        <div className="arrows-grp">
          <svg
            width="114"
            height="168"
            viewBox="0 0 114 168"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.5 165.052C2.5 160.272 3.13287 150.028 9.64852 126.069C12.5032 115.571 19.3189 101.224 23.8401 91.1634C30.7422 75.8041 37.6241 66.0304 47.8027 54.6902C54.5005 48.1112 64.31 39.8585 72.053 34.1788C79.796 28.4991 85.1754 25.6425 90.7178 22.6992"
              stroke="#33C791"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <path
              d="M79.2111 2.50049C88.7328 4.72235 105.389 11.1379 111.156 13.3934C113.062 14.1385 106.443 24.219 101.117 33.2555C100.316 34.8666 99.3669 36.4536 98.245 38.6996C97.1231 40.9455 95.8574 43.8021 93.5944 47.7072"
              stroke="#33C791"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </svg>
          <svg
            width="50"
            height="150"
            viewBox="0 0 50 150"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M31.8331 147.237C32.8446 138.548 32.177 120.291 30.9935 111.37C29.5037 100.138 29.8101 91.9896 27.2915 67.5927C26.1891 56.9143 25.7642 42.8316 24.9246 32.12C24.7527 30.5926 24.7527 29.2575 24.5858 28.069C24.4189 26.8805 24.0851 25.8791 23.7412 23.8359"
              stroke="#DA4242"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <path
              d="M2.50012 42.0423C2.83391 37.6828 6.8495 21.5901 10.5819 12.7244C12.4023 8.40025 14.294 5.639 15.8062 3.78798C16.5641 2.86021 17.6521 2.27076 18.8356 2.59443C25.0663 8.96678 34.4832 21.0843 42.0643 29.51C44.9723 32.595 45.9737 33.2626 47.0054 34.9619"
              stroke="#DA4242"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </svg>
          <svg
            width="115"
            height="168"
            viewBox="0 0 115 168"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M111.827 165.052C111.827 160.272 111.192 150.028 104.656 126.069C101.793 115.571 94.9561 101.224 90.421 91.1634C83.4976 75.8041 76.5945 66.0304 66.3845 54.6902C59.666 48.1112 49.8263 39.8585 42.0594 34.1788C34.2925 28.4991 28.8966 25.6425 23.3371 22.6992"
              stroke="#0D8DFF"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <path
              d="M34.8793 2.50049C25.3281 4.72235 8.62089 11.1379 2.83538 13.3934C0.924239 14.1385 7.56286 24.219 12.9059 33.2555C13.709 34.8666 14.6613 36.4536 15.7866 38.6996C16.912 40.9455 18.1816 43.8021 20.4516 47.7072"
              stroke="#0D8DFF"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
