import React from "react";
import BlurText from "../../components/blur";
import NineSvg from "../../components/9.svg";
import Image from "next/image";
const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r ">
      <BlurText
        text="Pikachu vs Charizad!"
        delay={150}
        animateBy="words"
        direction="top"
        className="text-7xl font-semibold  mb-8"
      />{" "}
      <Image src={NineSvg} alt="Nine" />
    </div>
  );
};

export default Home;
