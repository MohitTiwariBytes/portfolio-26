import React, { useEffect, useRef, useState } from "react";
import "./Navbar.css";
import gsap from "gsap";
import LinkText from "../LinkText/LinkText";
import CustomEase from "gsap/CustomEase";
import BtnNormal from "../Buttons/Normal/BtnNormal";
import { openFormModal } from "../Forms/FormContact/FormContact";

gsap.registerPlugin(CustomEase);

export default function Navbar() {
  const path1Ref = useRef(null);
  const path2Ref = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("Home");

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

  // Check if mobile
  const isMobile = () => window.innerWidth <= 835;

  // Desktop scroll with Lenis
  const handleDesktopScroll = (section) => {
    if (isMobile()) return;

    const lenis = window.lenis; // Assuming Lenis is initialized globally as window.lenis

    if (!lenis) {
      console.warn("Lenis not found, falling back to regular scroll");
      fallbackScroll(section);
      return;
    }

    switch (section) {
      case "Home":
        lenis.scrollTo(0, { duration: 1.5 });
        break;
      case "Pricing":
        lenis.scrollTo(".main-fifth-section", { duration: 1.5 });
        break;
      case "Work":
        lenis.scrollTo(".main-second-section", { duration: 1.5 });
        break;
      case "Contact":
        lenis.scrollTo(".main-cta", { duration: 1.5 });
        break;
      default:
        break;
    }
  };

  // Fallback scroll without Lenis
  const fallbackScroll = (section) => {
    let target = null;

    switch (section) {
      case "Home":
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      case "Pricing":
        target = document.querySelector(".main-fifth-section");
        break;
      case "Work":
        target = document.querySelector(".main-second-section");
        break;
      case "Contact":
        target = document.querySelector(".main-cta");
        break;
      default:
        break;
    }

    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Mobile scroll with active state
  const handleMobileScroll = (section) => {
    if (!isMobile()) return;

    // Don't set active state on click - let scroll listener handle it

    // Close mobile menu first with a small delay before scrolling
    if (!isMenuOpen) {
      handleMenuClick();

      // Wait for menu close animation before scrolling
      setTimeout(() => {
        switch (section) {
          case "Home":
            window.scrollTo({ top: 0, behavior: "smooth" });
            break;
          case "Pricing":
            document
              .querySelector(".main-fifth-section")
              ?.scrollIntoView({ behavior: "smooth" });
            break;
          case "Work":
            document
              .querySelector(".main-second-section")
              ?.scrollIntoView({ behavior: "smooth" });
            break;
          case "Contact":
            document
              .querySelector(".main-cta")
              ?.scrollIntoView({ behavior: "smooth" });
            break;
          default:
            break;
        }
      }, 400);
    } else {
      // If menu is already closed, scroll immediately
      switch (section) {
        case "Home":
          window.scrollTo({ top: 0, behavior: "smooth" });
          break;
        case "Pricing":
          document
            .querySelector(".main-fifth-section")
            ?.scrollIntoView({ behavior: "smooth" });
          break;
        case "Work":
          document
            .querySelector(".main-second-section")
            ?.scrollIntoView({ behavior: "smooth" });
          break;
        case "Contact":
          document
            .querySelector(".main-cta")
            ?.scrollIntoView({ behavior: "smooth" });
          break;
        default:
          break;
      }
    }
  };

  // Handle navigation click
  const handleNavClick = (section) => {
    if (isMobile()) {
      handleMobileScroll(section);
    } else {
      handleDesktopScroll(section);
    }
  };

  // Detect active section on scroll (mobile only)
  useEffect(() => {
    if (!isMobile()) return;

    const handleScroll = () => {
      const sections = [
        { name: "Home", selector: null, offset: 0 },
        { name: "Work", selector: ".main-second-section" },
        { name: "Pricing", selector: ".main-fifth-section" },
        { name: "Contact", selector: ".main-cta" },
      ];

      const scrollPosition = window.scrollY + window.innerHeight / 2;

      // Check if at top
      if (window.scrollY < 100) {
        setActiveSection("Home");
        return;
      }

      // Check other sections
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.selector) {
          const element = document.querySelector(section.selector);
          if (element && element.offsetTop <= scrollPosition) {
            setActiveSection(section.name);
            return;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        <div onClick={() => handleNavClick("Home")} className="logo-left">
          <svg
            width="78"
            height="98"
            viewBox="0 0 78 98"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="
      M19.052 0.391506
      C19.052 51.9731 44.3106 41.2731 63.859 20.2315
      C66.178 17.7354 71.2842 20.296 70.3566 23.5744
      L49.981 95.5915
      M19.052 1.04957
      L7.4262 83.3076
    "
              stroke="#DA4242"
              strokeWidth="15"
              fill="none"
            />
          </svg>
        </div>
        <div className="navigation-middle">
          <div onClick={() => handleNavClick("Home")}>
            <LinkText text={"Home"}></LinkText>
          </div>
          <div onClick={() => handleNavClick("Pricing")}>
            <LinkText text={"Pricing"}></LinkText>
          </div>
          <div onClick={() => handleNavClick("Work")}>
            <LinkText text={"Work"}></LinkText>
          </div>
          <div onClick={() => handleNavClick("Contact")}>
            <LinkText text={"Contact"}></LinkText>
          </div>
        </div>
        <div className="contact-button-right">
          <BtnNormal onClick={openFormModal} text={"Let's Talk?"}></BtnNormal>
        </div>
        <div className="btn-grp-mobile">
          <div className="contact-button-mobile">
            <BtnNormal
              sx={{ height: "54px", width: "157px", fontSize: "20px" }}
              text={"Let's Talk?"}
              onClick={openFormModal}
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
                  fillRule="evenodd"
                  clipRule="evenodd"
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
                  fillRule="evenodd"
                  clipRule="evenodd"
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
          <div
            className={`link-menu ${activeSection === "Home" ? "active" : ""}`}
            onClick={() => handleNavClick("Home")}
          >
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
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M14.7655 2.95313V1.6875H12.2342V2.95313V20.9913L5.53538 14.2926L4.64045 13.3976L2.85059 15.1875L3.74552 16.0824L12.3066 24.6436C12.9656 25.3025 14.0341 25.3025 14.6931 24.6436L23.2541 16.0824L24.1491 15.1875L22.3592 13.3976L21.4643 14.2926L14.7655 20.9913V2.95313Z"
                    fill="black"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div
            className={`link-menu ${
              activeSection === "Pricing" ? "active" : ""
            }`}
            onClick={() => handleNavClick("Pricing")}
          >
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
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M14.7655 2.95313V1.6875H12.2342V2.95313V20.9913L5.53538 14.2926L4.64045 13.3976L2.85059 15.1875L3.74552 16.0824L12.3066 24.6436C12.9656 25.3025 14.0341 25.3025 14.6931 24.6436L23.2541 16.0824L24.1491 15.1875L22.3592 13.3976L21.4643 14.2926L14.7655 20.9913V2.95313Z"
                    fill="black"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div
            className={`link-menu ${activeSection === "Work" ? "active" : ""}`}
            onClick={() => handleNavClick("Work")}
          >
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
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M14.7655 2.95313V1.6875H12.2342V2.95313V20.9913L5.53538 14.2926L4.64045 13.3976L2.85059 15.1875L3.74552 16.0824L12.3066 24.6436C12.9656 25.3025 14.0341 25.3025 14.6931 24.6436L23.2541 16.0824L24.1491 15.1875L22.3592 13.3976L21.4643 14.2926L14.7655 20.9913V2.95313Z"
                    fill="black"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div
            className={`link-menu ${
              activeSection === "Contact" ? "active" : ""
            }`}
            onClick={() => handleNavClick("Contact")}
          >
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
                    fillRule="evenodd"
                    clipRule="evenodd"
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
            onClick={openFormModal}
          ></BtnNormal>
        </div>
      </div>
    </div>
  );
}
