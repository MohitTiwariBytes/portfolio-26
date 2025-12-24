import React from "react";
import "./Home.css";
import Hero from "./Sections/Hero/Hero";
import Navbar from "../../Components/Navbar/Navbar";

export default function Home() {
  return (
    <div className="main-home-page">
      <Navbar></Navbar>
      <Hero></Hero>
    </div>
  );
}
