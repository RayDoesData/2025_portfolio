import React from "react";
import HeroText from "../components/HeroText";
import ParallaxBackground from "../components/ParallaxBackground";

const Hero = ({name}) => {
  return (
    <section className="flex items-start justify-center md:items-start md:justify-start min-h-screen overflow-hidden c-space">
      <HeroText name={name}/>
      <ParallaxBackground />
    </section>
  );
};

export default Hero;
