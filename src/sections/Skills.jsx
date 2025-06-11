import { twMerge } from "tailwind-merge";
import { Marquee } from "../components/Marquee";
import { skills } from "../contstants";

const firstRow = skills.slice(0, skills.length / 2)?.filter(skill => skill.icon.length > 0);
const secondRow = skills.slice(skills.length / 2)?.filter(skill => skill.icon.length > 0);

const SkillsCard = ({ name, icon}) => {
  return (
    <figure
      className={twMerge(
        "relative h-30 w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "border-gray-50/[.1] bg-gradient-to-r bg-indigo to-storm hover:bg-royal hover-animation"
      )}
    >
      <div className="flex flex-col p-6 h-full justify-center items-center gap-2">
        <img
          className="p-1"
          width="40%"
          height="50%"
          alt=""
          src={icon}
        />
        <div className="m-auto bottom-2 flex">
          <figcaption className="text-md text-center font-medium text-white/70">
            {name}
          </figcaption>
        </div>
      </div>
    </figure>
  );
};

export default function Skills() {
  return (
    <div className="items-start mt-25 md:mt-35 c-space">
    <h2 className="text-heading">Skills & Tools</h2>

      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden mt-12">
        <Marquee pauseOnHover className="[--duration:20s]">
          {firstRow.map((skill, index) => (
            <SkillsCard key={index} {...skill} />
          ))}
        </Marquee>
        <Marquee pauseOnHover className="[--duration:20s]">
          {secondRow.map((skill, index) => (
            <SkillsCard key={index} {...skill} />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-primary"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-primary"></div>
      </div>
    </div>
  );
}
