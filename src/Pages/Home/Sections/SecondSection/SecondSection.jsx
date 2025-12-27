import React, { useEffect, useState } from "react";
import "./SecondSection.css";

import regrese from "../../../../assets/Images/regreseProjectPhoto.webp";
import quickcopies from "../../../../assets/Images/quickCopiesProjectPhoto.webp";
import coding4good from "../../../../assets/Images/coding4GoodProjectPhoto.webp";

import BtnAnimated from "../../../../Components/Buttons/Animated/BtnAnimated";
import BtnNormal from "../../../../Components/Buttons/Normal/BtnNormal";

/* ===== CONTROLLABLE LIST ===== */
const projects = [
  {
    id: 1,
    title: "Regrese®",
    type: "Development",
    image: regrese,
  },
  {
    id: 2,
    title: "Quick Copies",
    type: "Development",
    image: quickcopies,
  },
  {
    id: 3,
    title: "Coding 4 Good",
    type: "Development",
    image: coding4good,
  },
];

export default function SecondSection() {
  const [buttonStyle, setButtonStyle] = useState({
    fontSize: 20,
    widthMain: "620px",
    heightMain: "46px",
    widthSecondary: "96px",
    heightSecondary: "46px",
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 572) {
        setButtonStyle({
          fontSize: 15,
          widthMain: "445px",
          heightMain: "36px",
          widthSecondary: "70px",
          heightSecondary: "36px",
        });
      } else {
        setButtonStyle({
          fontSize: 20,
          widthMain: "620px",
          heightMain: "46px",
          widthSecondary: "87px",
          heightSecondary: "46px",
        });
      }
    };

    handleResize(); // initial setup
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="main-second-section">
      <div className="second-section">
        <div className="top-txt-second-section">
          <h1>
            Making cool <z>sh#t</z> since <z>‘23</z>
          </h1>
          <span>
            I’ve been into creating wonderful websites since 2023. Ever since
            then, I’ve collaborated with multiple designers and agencies to
            deliver the best outcome possible.
          </span>
        </div>

        <div className="projects-bottom">
          <div className="work-txt">
            <span>Recent</span>
            <span id="aloo-txt">
              Work <p>{projects.length}</p>
            </span>
          </div>

          <div className="projects-wrapper">
            {projects.map((project) => (
              <div className="project" key={project.id}>
                <div className="project-img">
                  <img src={project.image} alt="" />
                </div>

                <div className="wrap-project">
                  <div className="project-info">
                    <div className="txt-project">
                      <h1>{project.title}</h1>
                      <span>{project.type}</span>
                    </div>
                  </div>

                  <div className="btns-project">
                    <BtnAnimated
                      sx={{
                        width: buttonStyle.widthMain,
                        height: buttonStyle.heightMain,
                      }}
                      fontSize={buttonStyle.fontSize}
                      text="Open Website"
                    />
                    <BtnNormal
                      sx={{
                        width: buttonStyle.widthSecondary,
                        height: buttonStyle.heightSecondary,
                      }}
                      fontSize={buttonStyle.fontSize}
                      text="Credits"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
