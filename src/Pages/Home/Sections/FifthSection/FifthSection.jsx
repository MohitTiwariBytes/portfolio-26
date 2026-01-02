import React, { useEffect } from "react";
import "./FifthSection.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import BtnAnimated from "../../../../Components/Buttons/Animated/BtnAnimated";
import { openFormModal } from "../../../../Components/Forms/FormContact/FormContact";

gsap.registerPlugin(ScrollTrigger, SplitText);

/* =======================
   PRICING DATA (CONTROL)
======================= */

const CHECK_ICON = (
  <svg
    width="21"
    height="21"
    viewBox="0 0 21 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15.0957 5.06604L14.4977 5.84798L10.1137 11.5809L9.56967 11.0369L8.70928 10.1765L12.9338 4.65207L13.5317 3.87012L15.0957 5.06604ZM5.39332 15.2132L6.43427 16.2542C5.5461 16.9242 4.25868 16.8726 3.4285 16.0426L0.8783 13.4929L0.182167 12.797L1.57413 11.4047L2.27027 12.1007L4.82047 14.6503C4.83704 14.6668 4.85487 14.6813 4.87365 14.6935L5.39332 15.2132ZM20.076 5.84799L20.6738 5.06604L19.11 3.87013L18.512 4.65208L10.8913 14.6176C10.7708 14.7752 10.539 14.7906 10.3987 14.6504L7.84837 12.1007L7.15223 11.4047L5.76029 12.797L6.45642 13.4929L9.00674 16.0426C9.98904 17.0247 11.6115 16.917 12.4552 15.8136L20.076 5.84799Z"
      fill="black"
    />
  </svg>
);

const PRICING_LIST = [
  {
    title: "Onepager",
    duration: "6-8 WEEKS",
    description:
      "Your brand’s first step. A sharp, fast one-pager that means business.",
    scope: [
      "1 custom page tailored to your needs.",
      "Legal Pages",
      "CMS Panel",
    ],
    price: "$2,000",
  },
  {
    title: "Full Website",
    duration: "8-12 WEEKS",
    description:
      "Five-page website — more room, more story, less of the boring stuff.",
    scope: ["Up to 10 custom pages", "Legal Pages", "CMS Panel"],
    price: "$4,000",
  },
  {
    title: "Web Experience",
    duration: "12-18 WEEKS",
    description:
      "A web experience built your way — custom everything, from pages to pixels to the fancy 3D stuff.",
    scope: ["Custom amount of pages", "Legal Pages", "CMS Panel"],
    price: "$7,000+",
  },
];

/* =======================
   COMPONENT
======================= */

export default function FifthSection() {
  useEffect(() => {
    const cards = document.querySelectorAll(".pricing-card");
    if (!cards.length) return;

    const syncHeights = () => {
      cards.forEach((c) => (c.style.height = "auto"));

      let max = 0;
      cards.forEach((c) => {
        max = Math.max(max, c.offsetHeight);
      });

      cards.forEach((c) => {
        c.style.height = `${max}px`;
      });
    };

    const resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(syncHeights);
    });

    cards.forEach((card) => resizeObserver.observe(card));

    const handleResize = () => {
      requestAnimationFrame(syncHeights);
    };

    window.addEventListener("resize", handleResize);

    // initial run
    syncHeights();

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) return;

    const split = new SplitText(".top-txt-fifth-section h1", {
      type: "words",
      wordsClass: "word-top-fifth-section",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".main-fifth-section",
        start: "top 50%",
      },
    });

    tl.fromTo(
      ".word-top-fifth-section",
      { scaleY: 0.7, opacity: 0, filter: "blur(2px)" },
      {
        scaleY: 1,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.6,
        ease: "back.out(1.6)",
        stagger: 0.02,
      }
    )
      .fromTo(
        "#desc-fifth-section",
        { opacity: 0, y: 20, filter: "blur(2px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.4,
          ease: "back.out(1.6)",
        },
        0.8
      )
      .fromTo(
        ".pricing-card",
        { opacity: 0, y: 20, filter: "blur(2px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.4,
          ease: "back.out(1.6)",
          stagger: 0.04,
        },
        0.8
      );

    return () => {
      split.revert();
      tl.kill();
    };
  }, []);

  return (
    <div className="main-fifth-section">
      <div className="fifth-section">
        <div className="top-txt-fifth-section">
          <h1>Pricing, The cost of leveling up</h1>
          <span id="desc-fifth-section">
            Indicative pricing based on the scope, complexity, and results
            you’re aiming for.
          </span>
        </div>

        <div className="bottom-pricing-cards">
          {PRICING_LIST.map((item, index) => (
            <div className="pricing-card" key={index}>
              <div className="top-pricing-card">
                <div className="grp-1-tp">
                  <h1>{item.title}</h1>
                  <span>{item.duration}</span>
                </div>
                <span id="desc-price">{item.description}</span>
              </div>

              <div className="bottom-pricing-card">
                <div className="scope-pricing-card">
                  <p id="scope-txt">Scope:</p>
                  <div className="wrap-scope">
                    {item.scope.map((scopeItem, i) => (
                      <div className="scope-grp" key={i}>
                        {CHECK_ICON}
                        <p>{scopeItem}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="price">
                  <div className="txt-price">
                    <span id="starting-text">Starting At:</span>
                    <h1>{item.price}</h1>
                  </div>
                  <BtnAnimated
                    onClick={openFormModal}
                    text={"Start A Project"}
                    sx={{ width: "100%", height: "54px" }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
