import React from "react";
import "./Home.css";
import Hero from "./Sections/Hero/Hero";
import Navbar from "../../Components/Navbar/Navbar";
import SecondSection from "./Sections/SecondSection/SecondSection";

export default function Home() {
  return (
    <div className="main-home-page">
      <Navbar></Navbar>
      <Hero></Hero>
      <SecondSection></SecondSection>
    </div>
  );
}
