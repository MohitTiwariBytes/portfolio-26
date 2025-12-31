import React from "react";
import "./Home.css";
import Hero from "./Sections/Hero/Hero";
import Navbar from "../../Components/Navbar/Navbar";
import SecondSection from "./Sections/SecondSection/SecondSection";
import ThirdSection from "./Sections/ThirdSection/ThirdSection";
import FourthSection from "./Sections/FourthSection/FourthSection";
import FifthSection from "./Sections/FifthSection/FifthSection";
import CTA from "./Sections/CTA/CTA";

export default function Home() {
  return (
    <div className="main-home-page">
      <Navbar></Navbar>
      <Hero></Hero>
      <SecondSection></SecondSection>
      <ThirdSection></ThirdSection>
      <FourthSection></FourthSection>
      <FifthSection></FifthSection>
      <CTA></CTA>
    </div>
  );
}
