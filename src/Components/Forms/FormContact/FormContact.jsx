import React, { useEffect, useRef, useState } from "react";
import "./FormContact.css";
import BtnNormal from "../../Buttons/Normal/BtnNormal";
import { Link } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, push } from "firebase/database";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import { useLenis } from "lenis/react";

gsap.registerPlugin(CustomEase);

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mohit-tiwari-folio-26.firebaseapp.com",
  projectId: "mohit-tiwari-folio-26",
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: "599805227534",
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: "G-572FZL18KV",
  databaseURL: "https://mohit-tiwari-folio-26-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);
const database = getDatabase(app);

// Modal Service
class FormModalService {
  constructor() {
    this.isOpen = false;
    this.listeners = [];
  }

  open() {
    this.isOpen = true;
    this.notifyListeners();
  }

  close() {
    this.isOpen = false;
    this.notifyListeners();
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  notifyListeners() {
    this.listeners.forEach((listener) => listener(this.isOpen));
  }
}

const formModalService = new FormModalService();
export const openFormModal = () => formModalService.open();
export const closeFormModal = () => formModalService.close();

export default function FormContact() {
  const formRef = useRef(null);
  const containerRef = useRef(null);
  const backdropRef = useRef(null);
  const lenis = useLenis();

  const [isFixed, setIsFixed] = useState(false);
  const [buttonText, setButtonText] = useState("Submit");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "Select Service",
    budget: "Select Budget",
    message: "",
  });

  // Subscribe to modal service
  useEffect(() => {
    const unsubscribe = formModalService.subscribe((isOpen) => {
      setIsModalOpen(isOpen);
    });
    return unsubscribe;
  }, []);

  // 🔹 Pause main scroll while allowing modal scroll
  useEffect(() => {
    if (!lenis) return;
    if (isModalOpen) {
      lenis.stop();
    } else {
      lenis.start();
    }
  }, [isModalOpen, lenis]);

  // Force Lenis to stop even if mouse is over a data-lenis-prevent div
  useEffect(() => {
    if (!lenis) return;
    if (!isModalOpen) return;

    const interval = setInterval(() => {
      lenis.stop();
    }, 10);

    return () => clearInterval(interval);
  }, [isModalOpen, lenis]);

  // GSAP modal animations
  useEffect(() => {
    CustomEase.create("smoothEase", "0.825, 0.08, 0.04, 1");
    if (!containerRef.current) return;

    if (isModalOpen) {
      gsap.set(containerRef.current, { pointerEvents: "auto" });

      gsap.fromTo(
        containerRef.current,
        { yPercent: 100 },
        { yPercent: 0, duration: 0.5, ease: "smoothEase" }
      );

      gsap.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 0, duration: 0.5 }
      );

      gsap.fromTo(
        formRef.current,
        { y: 60 },
        { y: 0, duration: 0.5, ease: "smoothEase" }
      );
    } else {
      gsap.to(formRef.current, {
        y: 40,
        duration: 0.5,
        ease: "smoothEase",
      });

      gsap.to(backdropRef.current, {
        opacity: 0,
        duration: 0.3,
      });

      gsap.to(containerRef.current, {
        yPercent: 100,
        duration: 0.5,
        ease: "smoothEase",
        onComplete: () => {
          gsap.set(containerRef.current, { pointerEvents: "none" });
        },
      });
    }
  }, [isModalOpen]);

  // Responsive modal positioning
  useEffect(() => {
    const handleResize = () => {
      if (formRef.current) {
        const formHeight = 862;
        const topGap = 100;
        const viewportHeight = window.innerHeight;

        if (viewportHeight < formHeight + topGap) {
          setIsFixed(true);
        } else {
          setIsFixed(false);
        }
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (
      !formData.name ||
      !formData.email ||
      formData.service === "Select Service" ||
      formData.budget === "Select Budget"
    ) {
      alert("Please fill in all required fields");
      return;
    }

    setButtonText("Loading...");

    try {
      const contactsRef = ref(database, "contacts");
      await push(contactsRef, {
        ...formData,
        timestamp: new Date().toISOString(),
      });

      setButtonText("Sent!");

      setTimeout(() => {
        setButtonText("Submit");
        setFormData({
          name: "",
          email: "",
          service: "Select Service",
          budget: "Select Budget",
          message: "",
        });
      }, 2000);
    } catch (error) {
      console.error("Error saving to database:", error);
      setButtonText("Submit");
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target.classList.contains("main-form-contact")) {
      closeFormModal();
    }
  };

  return (
    <div
      ref={containerRef}
      className={`main-form-contact ${isFixed ? "fixed-mode" : ""}`}
      style={{ overflowY: "auto" }} // allows modal content scroll
      onClick={handleBackdropClick}
    >
      <div className="bg-form" ref={backdropRef}></div>

      <div data-lenis-prevent className="form-contact" ref={formRef}>
        <div className="top-form-contact">
          <div className="txt-top-form">
            <h1>Let's Talk!</h1>
            <span>
              Fill out this short form and I'll get back to you very soon! -
              Let's create something awesome together!
            </span>
          </div>
          <div className="close-button" onClick={closeFormModal}>
            <svg
              width="44"
              height="44"
              viewBox="0 0 44 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M34.2918 37.2083L35.7501 38.6669L38.667 35.75L37.2084 34.2917L24.9169 22L37.2084 9.70838L38.667 8.24998L35.7501 5.33316L34.2918 6.79157L22.0001 19.0832L9.70847 6.79157L8.25007 5.33316L5.33325 8.24998L6.79166 9.70838L19.0833 22L6.79166 34.2917L5.33325 35.75L8.25007 38.6669L9.70847 37.2083L22.0001 24.9168L34.2918 37.2083Z"
                fill="black"
              />
            </svg>
          </div>
        </div>

        <div className="main-form">
          <div className="wrapper-inputs">
            <div className="input-wrapper">
              <span>Name</span>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                required
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>

            <div className="input-wrapper">
              <span>Email</span>
              <input
                type="email"
                name="email"
                placeholder="johndoe@example.com"
                required
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="input-wrapper">
              <span>Service</span>
              <select
                name="service"
                required
                value={formData.service}
                onChange={handleInputChange}
              >
                <option value="Select Service">Select Service</option>
                <option value="Web Development">Web Development</option>
                <option value="Web Design">Web Design</option>
                <option value="The Full Package">The Full Package</option>
              </select>
            </div>

            <div className="input-wrapper">
              <span>Budget</span>
              <select
                name="budget"
                required
                value={formData.budget}
                onChange={handleInputChange}
              >
                <option value="Select Budget">Select Budget</option>
                <option value="$1500">$1500</option>
                <option value="$1500 - $2000">$1,500 - $2,000</option>
                <option value="$2000 - $5000">$2,000 - $5,000</option>
                <option value="$5000+">$5,000+</option>
              </select>
            </div>

            <div className="input-wrapper message">
              <span>Message (Optional)</span>
              <textarea
                name="message"
                style={{ resize: "none" }}
                placeholder="A veryyyyyy long message goes here."
                value={formData.message}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <div className="btn-form">
          <BtnNormal
            text={buttonText}
            animated={false}
            sx={{ width: "100%", height: "50px" }}
            onClick={handleSubmit}
          />
          <span id="notice-form">
            By submitting this form, you consent to the collection of your name
            and email by Mohit Tiwari. Refer to the{" "}
            <Link to="#">Privacy Policy</Link> for more information.
          </span>
        </div>
      </div>
    </div>
  );
}
