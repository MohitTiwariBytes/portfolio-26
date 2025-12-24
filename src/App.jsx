import React from "react";
import ReactLenis from "lenis/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home";

function App() {
  return (
    <>
      <ReactLenis root>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/home" element={<Home />}></Route>
          </Routes>
        </BrowserRouter>
      </ReactLenis>
    </>
  );
}

export default App;
