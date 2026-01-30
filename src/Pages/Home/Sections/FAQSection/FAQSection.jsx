import React from "react";
import "./FAQSection.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import CustomEase from "gsap/CustomEase";
import { useEffect, useState, useRef } from "react";

gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase);

const faqs = [
  {
    question: "Do you offer both design & development?",
    answer:
      "Yes. I provide both design and development services. I can manage the entire process end to end, or support you at any specific stage.",
  },
  {
    question: "Can you work with no-code tools like Webflow/WordPress?",
    answer:
      "I don't use no-code platforms like Webflow or WordPress. I work entirely with custom code. To keep things easy for you, I include a custom CMS for simple content management.",
  },
  {
    question: "Do you work with existing designs?",
    answer:
      "Yes, I work with existing designs, but only when they align with my quality standards. I don't tweak or patch designs. If the design needs work, I start fresh to ensure a clean and cohesive result.",
  },
  {
    question: "Do you work with agencies or other freelancers?",
    answer:
      "Yes, absolutely. I enjoy working with agencies and other freelancers and I'm comfortable collaborating within established teams and processes.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);
  const answerRefs = useRef([]);
  const itemRefs = useRef([]);
  const prevOpenIndex = useRef(openIndex);

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) return;

    const split = new SplitText(".top-txt-faq-section h1", {
      type: "words",
      wordsClass: "word-top-faq-section",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".main-faq-section",
        start: "top 50%",
      },
    });

    tl.fromTo(
      ".word-top-faq-section",
      { scaleY: 0.7, opacity: 0, filter: "blur(2px)" },
      {
        scaleY: 1,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.6,
        ease: "back.out(1.6)",
        stagger: 0.02,
      },
    )
      .fromTo(
        "#desc-faq-section",
        { opacity: 0, y: 20, filter: "blur(2px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.4,
          ease: "back.out(1.6)",
        },
        0.8,
      )
      .fromTo(
        ".faq-card",
        { opacity: 0, y: 20, filter: "blur(2px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.4,
          ease: "back.out(1.6)",
        },
        1,
      );

    return () => {
      split.revert();
      tl.kill();
    };
  }, []);

  useEffect(() => {
    CustomEase.create("smoothEase", "0.825, 0.08, 0.04, 1");

    const prev = prevOpenIndex.current;
    const curr = openIndex;

    const openAnswer = answerRefs.current[curr];
    if (openAnswer) {
      gsap.killTweensOf(openAnswer);

      gsap.set(openAnswer, { height: "auto" });
      const h = openAnswer.scrollHeight;
      gsap.set(openAnswer, { height: 0 });

      gsap.to(openAnswer, {
        height: h,
        duration: 0.4,
        ease: "power3.out",
        onComplete: () => {
          gsap.set(openAnswer, { height: "auto" });
        },
      });
    }

    if (prev !== curr) {
      const closeAnswer = answerRefs.current[prev];
      if (closeAnswer) {
        gsap.killTweensOf(closeAnswer);

        gsap.to(closeAnswer, {
          height: 0,
          duration: 0.4,
          ease: "power3.out",
        });
      }
    }

    prevOpenIndex.current = curr;
  }, [openIndex]);

  return (
    <div className="main-faq-section">
      <div className="faq-section">
        <div className="top-txt-faq-section">
          <h1>Got questions? I have answers.</h1>
          <span id="desc-faq-section">Answers to some FAQ's</span>
        </div>
        <div className="faq-card">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`faq-item ${openIndex === index ? "open" : "closed"}`}
              ref={(el) => (itemRefs.current[index] = el)}
            >
              <div
                className="faq-question"
                onClick={() => {
                  if (openIndex !== index) setOpenIndex(index);
                }}
              >
                <span>{faq.question}</span>
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M23.3807 25.3693L24.375 26.3638L26.3638 24.375L25.3693 23.3807L16.9887 15L25.3693 6.61934L26.3638 5.62497L24.375 3.63623L23.3807 4.6306L15 13.0112L6.61934 4.6306L5.62497 3.63623L3.63623 5.62497L4.6306 6.61934L13.0112 15L4.6306 23.3807L3.63623 24.375L5.62497 26.3638L6.61934 25.3693L15 16.9887L23.3807 25.3693Z"
                    fill="black"
                  />
                </svg>
              </div>
              <div
                className="faq-answer"
                ref={(el) => (answerRefs.current[index] = el)}
              >
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
