import React, { useRef, useState } from "react";
import "./Footer.css";
import gsap from "gsap";
import BtnAnimated from "../../../../Components/Buttons/Animated/BtnAnimated";

export default function Footer() {
  const textRef = useRef(null);
  const copied = useRef(false);
  const [showCheckmark, setShowCheckmark] = useState(false);

  const handleCopy = async () => {
    if (copied.current) return;

    copied.current = true;
    await navigator.clipboard.writeText("hello@codedbymohit.xyz");

    setShowCheckmark(true);

    gsap.to(textRef.current, {
      opacity: 0,
      duration: 0,
      onComplete: () => {
        textRef.current.textContent = "Copied!";
        gsap.to(textRef.current, { opacity: 1, duration: 0 });
      },
    });

    setTimeout(() => {
      gsap.to(textRef.current, {
        opacity: 0,
        duration: 0,
        onComplete: () => {
          textRef.current.textContent = "Copy Email";
          gsap.to(textRef.current, { opacity: 1, duration: 0 });
          copied.current = false;
          setShowCheckmark(false);
        },
      });
    }, 2000);
  };

  return (
    <div className="main-footer-section">
      <div className="footer">
        <div className="left-footer">
          <div className="left-top-footer">
            <h1>
              Have a project in mind?{" "}
              <span id="red-txt">Let's turn it into a reality.</span> No
              nonsense, no <z id="strike">bullsh#t</z>
            </h1>
            <BtnAnimated text={"Get In Touch"} />
          </div>

          <div className="copy-email">
            <div className="email">
              <span>hello@codedbymohit.xyz</span>
            </div>

            <button className="copy-email-button" onClick={handleCopy}>
              {!showCheckmark ? (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M6.75 1.5H9.25C9.52614 1.5 9.75 1.72386 9.75 2C9.75 2.27614 9.52614 2.5 9.25 2.5H6.75C6.47386 2.5 6.25 2.27614 6.25 2C6.25 1.72386 6.47386 1.5 6.75 1.5ZM4.81301 1.5C5.03503 0.637386 5.81808 0 6.75 0H9.25C10.1819 0 10.965 0.637386 11.187 1.5H13.25H14V2.25V12.75C14 14.5449 12.5449 16 10.75 16H5.25C3.45507 16 2 14.5449 2 12.75V2.25V1.5H2.75H4.81301ZM5.01756 3H5H3.5V12.75C3.5 13.7165 4.2835 14.5 5.25 14.5H10.75C11.7165 14.5 12.5 13.7165 12.5 12.75V3H11H10.9824C10.6366 3.5978 9.99028 4 9.25 4H6.75C6.00972 4 5.36337 3.5978 5.01756 3Z"
                    fill="#7D0303"
                  />
                </svg>
              ) : (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 21 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M15.0957 5.06604L14.4977 5.84798L10.1137 11.5809L9.56967 11.0369L8.70928 10.1765L12.9338 4.65207L13.5317 3.87012L15.0957 5.06604ZM5.39332 15.2132L6.43427 16.2542C5.5461 16.9242 4.25868 16.8726 3.4285 16.0426L0.8783 13.4929L0.182167 12.797L1.57413 11.4047L2.27027 12.1007L4.82047 14.6503C4.83704 14.6668 4.85487 14.6813 4.87365 14.6935L5.39332 15.2132ZM20.076 5.84799L20.6738 5.06604L19.11 3.87013L18.512 4.65208L10.8913 14.6176C10.7708 14.7752 10.539 14.7906 10.3987 14.6504L7.84837 12.1007L7.15223 11.4047L5.76029 12.797L6.45642 13.4929L9.00674 16.0426C9.98904 17.0247 11.6115 16.917 12.4552 15.8136L20.076 5.84799Z"
                    fill="#7D0303"
                  />
                </svg>
              )}

              <span ref={textRef}>Copy Email</span>
            </button>
          </div>
          <div className="links-bottom">
            <span>©2025 – All Rights Reserved</span>
            <div className="link-main">
              <div className="divide-small"></div>
              <a href="https://instagram.com/codedbymohit">Instagram</a>
              <a href="https://awwwards.com/codedbymohit">Awwwards</a>
              <a href="https://linkedin.com/in/codedbymohit">Linkedin</a>
            </div>
          </div>
        </div>
        <div className="logo-right">
          <svg
            width="653"
            height="738"
            viewBox="0 0 653 738"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M136.09 0.726562C136.09 469.13 444.152 264.228 610.619 54.4891C612.712 51.8525 616.977 54.1599 615.954 57.3667L402.248 726.891"
              stroke="#DA4242"
              stroke-width="73"
            />
            <path
              d="M136.09 5.74707L36.0447 633.193"
              stroke="#DA4242"
              stroke-width="73"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
