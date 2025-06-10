import React from "react";
import Divider from "../components/Divider";
import { mySocials } from "../contstants";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const siteName = import.meta.env.VITE_MY_NAME;
  return (
    <section className="flex flex-wrap items-center justify-between gap-5 pb-3 text sm text-neutral-400 c-space">
      <Divider />
      <div className="flex gap-2">
        <p>Terms & Conditions</p>
        <p>|</p>
        <p> Privacy Policy</p>
      </div>
      <div className="flex gap-3 items-center ">
       <a 
      href="https://github.com/RayDoesData/portfolio" 
      target="_blank" 
      rel="noopener noreferrer"
      className="flex gap-1 items-center"
    >
      <FaGithub className="w-6 h-6 text-white hover:scale-110 transition-all duration-500 ease-in-out" />
      GitHub
    </a>
        {mySocials?.map((social, index) => (
          <a href={social.href} key={index} target="_blank">
            <img src={social.icon} className="w-5 h-5 hover:scale-110 transition-all duration-500 ease-in-out" alt={social.name} />
          </a>
        ))}
      </div>
      <p className="">
        © {currentYear} {siteName} All Rights Reserved
      </p>
    </section>
  );
};

export default Footer;
