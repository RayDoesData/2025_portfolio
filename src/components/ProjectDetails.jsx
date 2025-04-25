import { img } from "motion/react-client";
import React from "react";

const ProjectDetails = ({
  title,
  description,
  subDescription,
  image,
  tags,
  href,
  closeModal,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-hidden backdrop-blur-sm">
      <div className="relative max-w-2xl border shadow-sm rounded-2xl bg-gradient-to-l from-midnight to-navy border-white/10">
        <button
          onClick={closeModal}
          className="absolute p-2 rounded-sm top-5 right-5 bg-midnight hover:bg-gray-500 cursor-pointer"
        >
            <img src="assets/close.svg" className="w-6 h-6" />
        </button>
        <img src={image} alt="" className="w-full rounded-t-2xl" />
        <div className="p-5">
          <h5 className="mb-2 text-2xl font-bold text-white">{title}</h5>
          <p className="mb-3 fount-normal text-neutral-400">{description}</p>
          {subDescription.map((subdesc, index) => (
            <p key={index} className="mb-3 fount-normal text-neutral-400">
              {subdesc}
            </p>
          ))}
          <div className="flex items-center justify-between mt-4">
            <div className="flex gap-3">
              {tags.map((tag) => (
                <img
                  key={tag.id}
                  src={tag.path}
                  alt={tag.name}
                  className="rounded-lg size-10 hover-animation"
                />
              ))}
            </div>
            <a
              className="inline-flex items-center gap-1 font-medium hover-animation cursor-pointer"
              href={href}
            >
              View Project <img src="assets/arrow-up.svg" className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
