import React, { useRef } from "react";
import Card from "../components/Card";
import { Globe } from "../components/Globe";
import CopyEmailButton from "../components/CopyEmailButton";
import { Frameworks } from "../components/Frameworks";

const About = () => {
  const myName = import.meta.env.VITE_MY_NAME;
  const myEmail = import.meta.env.VITE_MY_EMAIL;
  const bio =
    "I've spent the past 2 years developing my skills in data analysis and data visualization to provide practical and accurate insights.";
  const locationName = "South Carolina, USA";

  const grid2Container = useRef();

  return (
    <section id="about" className="c-space section-spacing">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[18rem] mt-12">
        {/* Grid 1 - Personal Intro */}
        <div className="flex items-end grid-default-color grid-1">
          <img
            src="assets/coding-pov.png"
            className="absolute scale-[1.75] -right-[5rem] -top-[1rem] md:scale-[3] md:left-50 md:inset-y-10 lg:scale-[2.5]"
          />
          <div className="z-10">
            <p className="headtext">Hi, I'm {myName}</p>
            <p className="subtext">{bio}</p>
          </div>
          <div className="absolute inset-x-0 pointer-events-none -bottom-4 h-1/2 sm:h-1/3 bg-gradient-to-t from-indigo" />
        </div>

        {/* Grid 2 - Skills & Principles */}
        <div className="grid-default-color grid-2">
          <div
            ref={grid2Container}
            className="flex items-center justify-center w-full h-full"
          >
            <p className="flex items-end text-5xl text-gray-500">
              GET THE MESS
            </p>
            <Card
              containerRef={grid2Container}
              style={{ rotate: "75deg", top: "30%", left: "20%" }}
              text="SQL"
            />
            <Card
              containerRef={grid2Container}
              style={{ rotate: "-30deg", top: "60%", left: "45%" }}
              text="ETL"
            />
            <Card
              containerRef={grid2Container}
              style={{ rotate: "90deg", bottom: "30%", left: "70%" }}
              text="Python"
            />
            <Card
              containerRef={grid2Container}
              style={{ rotate: "-45deg", top: "55%", left: "0%" }}
              text="PowerBI"
            />
            <Card
              containerRef={grid2Container}
              style={{ rotate: "20deg", top: "10%", left: "38%" }}
              text="Tableau"
            />
            <Card
              containerRef={grid2Container}
              style={{ rotate: "30deg", top: "70%", left: "70%" }}
              image="assets/logos/excel-pink.svg"
            />
            <Card
              containerRef={grid2Container}
              style={{ rotate: "-45deg", top: "70%", left: "25%" }}
              image="assets/logos/google-pink.svg"
            />
            <Card
              containerRef={grid2Container}
              style={{ rotate: "-45deg", top: "5%", left: "10%" }}
              image="assets/logos/vscode-pink.svg"
            />
          </div>
        </div>

        {/* Grid 3 - Location */}
        <div className="grid-black-color grid-3">
          <div className="z-10 w-[50%]">
            <p className="headtext">Time Zone</p>
            <p className="">
              I am based in
              <span className="text-indigo-300 font-bold"> {locationName}</span>
              , and open to international remote work.
            </p>
          </div>
          <figure className="absolute left-[30%] top-[10%]">
            <Globe />
          </figure>
        </div>

        {/* Grid 4 - CTA */}
        <div className="grid-special-color grid-4">
          <div className="flex flex-col items-center justify-center gap-4 size-full">
            <p className="text-center headtext">
              Let's get started on your next project!
            </p>
            <CopyEmailButton myEmail={myEmail} />
          </div>
        </div>

        {/* Grid 5 - Tech Stack */}
        <div className="grid-default-color grid-5">
          <div className="z-10 w-[50%]">
            <p className="headtext">How I Do It</p>
            <p className="subtext">
              I specialize in a variety of languages and tools that
              allow me to supply relevant and useable results.
            </p>
          </div>
          <div className="absolute inset-y-0 md:inset-y-9 w-full h-full start-[50%] md:scale-125">
            <Frameworks />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
