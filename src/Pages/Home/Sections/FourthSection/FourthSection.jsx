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

ScrollTrigger.config({
  ignoreMobileResize: true,
});

export default function FourthSection() {
  const baseRotation = 5;
  const baseY = -100;

  const services = [
    {
      title: "Web Development",
      description:
        "Fast, responsive, and built to perform—your website engineered without the messy technical nonsense.",
      image: regrese,
    },
    {
      title: "Web Design",
      description:
        "Designs that look good, feel right, and make your brand impossible to ignore.",
      image: coding4good,
    },
    {
      title: "The Full Package",
      description:
        "The all-in-one treatment: design and development working together to create something actually worth launching.",
      image: quickcopies,
    },
  ];

  const colors = ["var(--red)", "var(--green)", "var(--blue)"];

  useEffect(() => {
    const split = new SplitText(".top-txt-fourth-section h1", {
      type: "words",
      wordsClass: "word-top-fourth-section",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".main-fourth-section",
        start: "top 50%",
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

    ScrollTrigger.refresh();

    return () => {
      split.revert();
      tl.kill();
    };
  }, []);

  useEffect(() => {
    const mm = ScrollTrigger.matchMedia();
    const triggers = [];

    mm.add("(min-width: 1060px)", () => {
      services.forEach((_, index) => {
        const serviceClass = `.service-${index}`;
        const yTransform = baseY * index;
        const rotation = baseRotation * index;

        const anim = gsap.fromTo(
          serviceClass,
          index === 0
            ? { boxShadow: "3px 35px 46px -12px rgba(0,0,0,0.75)" }
            : {
                transform: `translate(0%, ${yTransform}%) translate3d(0px,0px,0px) rotate(-${rotation}deg)`,
                boxShadow: "3px 35px 46px -12px rgba(0,0,0,0.75)",
              },
          {
            transform:
              "translate(0%, 0%) translate3d(0px,0px,0px) rotate(0deg)",
            boxShadow:
              "rgba(0,0,0,0) 0px 40px 60px -30px,rgba(0,0,0,0) 0px 24px 40px -28px,rgba(0,0,0,0) 0px 12px 20px -18px",
            scrollTrigger: {
              trigger: serviceClass,
              start: "top bottom",
              end: "bottom center-=50px",
              scrub: true,
            },
          }
        );

        triggers.push(anim.scrollTrigger);
      });
    });

    ScrollTrigger.refresh();

    return () => {
      triggers.forEach((t) => t && t.kill());
      mm.revert();
    };
  }, [services]);

  return (
    <div className="main-fourth-section">
      <div className="fourth-section">
        <div className="top-txt-fourth-section">
          <h1>Core Services I Offer</h1>
          <span id="desc-fourth-section">Areas I truly thrive in.</span>
        </div>

        <div className="services-bottom">
          {services.map((service, index) => (
            <div
              key={index}
              className={`service service-${index}`}
              style={{
                zIndex: services.length - index + 1,
                transformOrigin: index > 0 ? "100% 0%" : undefined,
                backgroundColor: colors[index % colors.length],
              }}
            >
              <div className="service-left">
                <h1>{service.title}</h1>
                <span id="service-span">{service.description}</span>
                <BtnAnimated
                  sx={{ width: "256px", height: "54px" }}
                  fontSize={"25px"}
                  text={"Start  a project"}
                />
              </div>
              <div className="service-right">
                <img src={service.image} alt="" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
