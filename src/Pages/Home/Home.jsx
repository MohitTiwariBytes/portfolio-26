import React from "react";
import "./Home.css";
import Hero from "./Sections/Hero/Hero";
import Navbar from "../../Components/Navbar/Navbar";
import SecondSection from "./Sections/SecondSection/SecondSection";
import ThirdSection from "./Sections/ThirdSection/ThirdSection";
import FourthSection from "./Sections/FourthSection/FourthSection";
import FifthSection from "./Sections/FifthSection/FifthSection";
import FAQSection from "./Sections/FAQSection/FAQSection";
import CTA from "./Sections/CTA/CTA";
import Footer from "./Sections/Footer/Footer";
import FormContact from "../../Components/Forms/FormContact/FormContact";
import gsap from "gsap";

export default function Home() {
  return (
    <div className="main-home-page">
      <FormContact></FormContact>
      <Navbar></Navbar>
      <Hero></Hero>
      <SecondSection></SecondSection>
      <ThirdSection></ThirdSection>
      <FourthSection></FourthSection>
      <FifthSection></FifthSection>
      <FAQSection></FAQSection>
      <CTA></CTA>
      <Footer></Footer>
    </div>
  );
}
