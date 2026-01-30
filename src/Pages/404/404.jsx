import React, { useEffect, useRef } from "react";
import "./404.css";
import Navbar from "../../Components/Navbar/Navbar";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import BtnAnimated from "../../Components/Buttons/Animated/BtnAnimated";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(CustomEase, SplitText);

export default function ErrorPage() {
  const INTENSITY = 1;

  const svgContainerRef = useRef(null);

  const layer1Ref = useRef(null);
  const layer2Ref = useRef(null);
  const layer3Ref = useRef(null);
  const layer4Ref = useRef(null);
  const layer5Ref = useRef(null);

  useEffect(() => {
    if (!svgContainerRef.current) return;

    CustomEase.create("backEase", ".26,.2,0,1.31");

    const split1 = new SplitText(".wrapper-error-page h1", {
      type: "words",
      wordsClass: "word-error-page",
    });

    const layers = [
      { ref: layer1Ref, duration: 0.4, move: 1 },
      { ref: layer2Ref, duration: 0.7, move: 1 },
      { ref: layer3Ref, duration: 1.0, move: 1 },
      { ref: layer4Ref, duration: 1.4, move: 1 },
      { ref: layer5Ref, duration: 1.8, move: 1 },
    ];

    const setters = layers.map(({ ref, duration, move }) => ({
      x: gsap.quickTo(ref.current, "x", {
        duration,
        ease: "power4.out",
      }),
      y: gsap.quickTo(ref.current, "y", {
        duration,
        ease: "power4.out",
      }),
      rotation: gsap.quickTo(ref.current, "rotation", {
        duration,
        ease: "power4.out",
      }),
      move,
    }));

    const maxMove = 58 * INTENSITY;
    const maxRotate = 6 * INTENSITY;

    let resetTimeout;

    gsap.fromTo(
      ".svg-layer-effect",
      {
        opacity: 0,
        y: "100px",
        filter: "blur(12px)",
      },
      {
        opacity: 1,
        y: "0px",
        filter: "blur(0px)",
        duration: 0.6,
        ease: "backEase",
      },
    );
    gsap.fromTo(
      ".wrapper-error-page h1",
      {
        filter: "blur(2px)",
        y: "20px",
        opacity: 0,
      },
      {
        y: "0px",
        filter: "blur(0px)",
        opacity: 1,
        ease: "backEase",
        duration: 0.6,
        delay: 0.2,
        stagger: 0.02,
      },
    );
    gsap.fromTo(
      ".wrapper-btn",
      {
        filter: "blur(2px)",
        y: "20px",
        opacity: 0,
      },
      {
        y: "0px",
        filter: "blur(0px)",
        opacity: 1,
        ease: "backEase",
        duration: 0.6,
        delay: 0.3,
        stagger: 0.02,
      },
    );

    const resetLayers = () => {
      setters.forEach(({ x, y, rotation }) => {
        x(0);
        y(0);
        rotation(0);
      });
    };

    const onMouseMove = (e) => {
      const rect = svgContainerRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      const dx = gsap.utils.clamp(-maxMove, maxMove, (e.clientX - cx) / 10);
      const dy = gsap.utils.clamp(-maxMove, maxMove, (e.clientY - cy) / 10);
      const rot = gsap.utils.clamp(-maxRotate, maxRotate, dx / 3);

      setters.forEach(({ x, y, rotation, move }) => {
        x(dx * move);
        y(dy * move);
        rotation(rot * move);
      });

      clearTimeout(resetTimeout);
      resetTimeout = setTimeout(resetLayers, 1000);
    };

    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      clearTimeout(resetTimeout);
    };
  }, [INTENSITY]);

  const svgContent = (
    <>
      <path
        style={{ position: "relative", zIndex: 3 }}
        d="M129.966 357.675L177.743 30.3829C178.899 22.4662 169.923 17.09 163.489 21.8447L23.6657 125.168C17.5666 129.675 19.4343 139.242 26.7808 141.124L217.912 190.092"
        stroke="#DA4242"
        strokeWidth="40"
      />
      <path
        style={{ position: "relative", zIndex: 2 }}
        d="M616.787 371.871L664.565 44.5789C665.72 36.6623 656.745 31.286 650.31 36.0408L510.487 139.364C504.388 143.871 506.256 153.438 513.602 155.32L704.734 204.288"
        stroke="#0D8DFF"
        strokeWidth="40"
      />
      <path
        style={{ position: "relative", zIndex: 1 }}
        d="M450.731 47.4387H279.098C273.901 47.4387 269.784 51.8279 270.116 57.0143L285.654 299.473C285.927 303.728 289.148 307.207 293.368 307.808L361.546 317.507C365.805 318.112 369.896 315.621 371.312 311.559L459.229 59.4017C461.269 53.552 456.926 47.4387 450.731 47.4387Z"
        stroke="#00C853"
        strokeWidth="40"
      />
    </>
  );

  return (
    <div className="main-error-page">
      <Navbar />

      <div className="error-page">
        <div className="wrapper-error-page">
          <div className="svg-layer-effect" ref={svgContainerRef}>
            <svg
              ref={layer1Ref}
              className="svg-layer layer-1"
              width="710"
              height="375"
              viewBox="0 0 710 375"
              fill="none"
            >
              {svgContent}
            </svg>

            <svg
              ref={layer2Ref}
              className="svg-layer layer-2"
              width="710"
              height="375"
              viewBox="0 0 710 375"
              fill="none"
            >
              {svgContent}
            </svg>

            <svg
              ref={layer3Ref}
              className="svg-layer layer-3"
              width="710"
              height="375"
              viewBox="0 0 710 375"
              fill="none"
            >
              {svgContent}
            </svg>

            <svg
              ref={layer4Ref}
              className="svg-layer layer-4"
              width="710"
              height="375"
              viewBox="0 0 710 375"
              fill="none"
            >
              {svgContent}
            </svg>

            <svg
              ref={layer5Ref}
              className="svg-layer layer-5"
              width="710"
              height="375"
              viewBox="0 0 710 375"
              fill="none"
            >
              {svgContent}
            </svg>
          </div>
          <h1>Not found, I suggest heading straight to the homepage.</h1>
          <div className="wrapper-btn">
            <BtnAnimated
              text={"Take me home"}
              onClick={() => {
                window.location.replace("/");
              }}
            ></BtnAnimated>
          </div>
        </div>
      </div>
    </div>
  );
}
