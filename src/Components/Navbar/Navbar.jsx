import React, { useEffect, useRef, useState } from "react";
import "./Navbar.css";
import gsap from "gsap";
import LinkText from "../LinkText/LinkText";
import CustomEase from "gsap/CustomEase";
import BtnNormal from "../Buttons/Normal/BtnNormal";

gsap.registerPlugin(CustomEase);

export default function Navbar() {
  const path1Ref = useRef(null);
  const path2Ref = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isMenuOpen) {
      gsap.fromTo(
        ".menu-btn-inner",
        {
          marginTop: "100%",
        },
        {
          marginTop: "-100%",
          ease: "backEase",
        }
      );
      gsap.fromTo(
        ".menu-mobile",
        {
          clipPath: "inset(0% 0% 100% 0%)",
        },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          ease: "smoothEase",
        }
      );
    } else {
      gsap.fromTo(
        ".menu-btn-inner",
        {
          marginTop: "-100%",
        },
        {
          marginTop: "100%",
          ease: "backEase",
        }
      );
      gsap.fromTo(
        ".menu-mobile",
        {
          clipPath: "inset(0% 0% 0% 0%)",
        },
        {
          clipPath: "inset(0% 0% 100% 0%)",
          ease: "smoothEase",
        }
      );
    }
  };

  useEffect(() => {
    CustomEase.create("backEase", ".26,.2,0,1.31");
    CustomEase.create("smoothEase", "0.825, 0.08, 0.04, 1");

    gsap.fromTo(
      ".navbar div",
      {
        y: "-100%",
        opacity: 0.2,
        filter: "blur(2px)",
      },
      {
        y: "0%",
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.6,
        ease: "backEase",
      }
    );
  }, []);

  return (
    <div className="main-navbar">
      <div className="navbar">
        <div className="logo-left">
          <svg
            width="78"
            height="98"
            viewBox="0 0 78 98"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              ref={path1Ref}
              d="M19.052 0.391506C19.052 51.9731 44.3106 41.2731 63.859 20.2315C66.178 17.7354 71.2842 20.296 70.3566 23.5744L49.981 95.5915"
              stroke="#DA4242"
              strokeWidth="15"
            />
            <path
              ref={path2Ref}
              d="M19.052 1.04957L7.4262 83.3076"
              stroke="#DA4242"
              strokeWidth="15"
            />
          </svg>
        </div>
        <div className="navigation-middle">
          <LinkText text={"Home"}></LinkText>
          <LinkText text={"Pricing"}></LinkText>
          <LinkText text={"Work"}></LinkText>
          <LinkText text={"Contact"}></LinkText>
        </div>
        <div className="contact-button-right">
          <BtnNormal text={"Let’s Talk?"}></BtnNormal>
        </div>
        <div className="btn-grp-mobile">
          <div className="contact-button-mobile">
            <BtnNormal
              sx={{ height: "54px", width: "157px", fontSize: "20px" }}
              text={"Let’s Talk?"}
            ></BtnNormal>
          </div>
          <div onClick={handleMenuClick} className="menu-btn">
            <div className="menu-btn-inner">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M3.5 8H2V11H3.5H28.5H30V8H28.5H3.5ZM3.5 21H2V24H3.5H28.5H30V21H28.5H3.5Z"
                  fill="#FFFFD4"
                />
              </svg>
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M23.3807 25.3693L24.375 26.3638L26.3638 24.375L25.3693 23.3807L16.9887 15L25.3693 6.61935L26.3638 5.62498L24.375 3.63625L23.3807 4.63061L15 13.0112L6.61934 4.63061L5.62497 3.63625L3.63623 5.62498L4.6306 6.61935L13.0112 15L4.6306 23.3807L3.63623 24.375L5.62497 26.3638L6.61934 25.3693L15 16.9887L23.3807 25.3693Z"
                  fill="#FFFFD4"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="menu-mobile">
        <div className="links-menu">
          <div className="link-menu active">
            <span>Home</span>
            <div className="border-icon-menu"></div>
            <div className="wrapper-icon-menu">
              <div className="icon-menu-link">
                <svg
                  width="27"
                  height="27"
                  viewBox="0 0 27 27"
                  fill="black"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M14.7655 2.95313V1.6875H12.2342V2.95313V20.9913L5.53538 14.2926L4.64045 13.3976L2.85059 15.1875L3.74552 16.0824L12.3066 24.6436C12.9656 25.3025 14.0341 25.3025 14.6931 24.6436L23.2541 16.0824L24.1491 15.1875L22.3592 13.3976L21.4643 14.2926L14.7655 20.9913V2.95313Z"
                    fill="black"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="link-menu">
            <span>Pricing</span>
            <div className="border-icon-menu"></div>
            <div className="wrapper-icon-menu">
              <div className="icon-menu-link">
                <svg
                  width="27"
                  height="27"
                  viewBox="0 0 27 27"
                  fill="black"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M14.7655 2.95313V1.6875H12.2342V2.95313V20.9913L5.53538 14.2926L4.64045 13.3976L2.85059 15.1875L3.74552 16.0824L12.3066 24.6436C12.9656 25.3025 14.0341 25.3025 14.6931 24.6436L23.2541 16.0824L24.1491 15.1875L22.3592 13.3976L21.4643 14.2926L14.7655 20.9913V2.95313Z"
                    fill="black"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="link-menu">
            <span>Work</span>
            <div className="border-icon-menu"></div>
            <div className="wrapper-icon-menu">
              <div className="icon-menu-link">
                <svg
                  width="27"
                  height="27"
                  viewBox="0 0 27 27"
                  fill="black"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M14.7655 2.95313V1.6875H12.2342V2.95313V20.9913L5.53538 14.2926L4.64045 13.3976L2.85059 15.1875L3.74552 16.0824L12.3066 24.6436C12.9656 25.3025 14.0341 25.3025 14.6931 24.6436L23.2541 16.0824L24.1491 15.1875L22.3592 13.3976L21.4643 14.2926L14.7655 20.9913V2.95313Z"
                    fill="black"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="link-menu ">
            <span>Contact</span>
            <div className="border-icon-menu"></div>
            <div className="wrapper-icon-menu">
              <div className="icon-menu-link">
                <svg
                  width="27"
                  height="27"
                  viewBox="0 0 27 27"
                  fill="black"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M14.7655 2.95313V1.6875H12.2342V2.95313V20.9913L5.53538 14.2926L4.64045 13.3976L2.85059 15.1875L3.74552 16.0824L12.3066 24.6436C12.9656 25.3025 14.0341 25.3025 14.6931 24.6436L23.2541 16.0824L24.1491 15.1875L22.3592 13.3976L21.4643 14.2926L14.7655 20.9913V2.95313Z"
                    fill="black"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="btn-menu">
          <BtnNormal
            sx={{ width: "calc(100% - 40px)", height: "54px" }}
            text={"Start a project"}
          ></BtnNormal>
        </div>
      </div>
    </div>
  );
}
