import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";

const Experience = dynamic(() =>
  import("@/components/sections/experience").then((mod) => mod.Experience)
);
const Skills = dynamic(() =>
  import("@/components/sections/skills").then((mod) => mod.Skills)
);
const Contact = dynamic(() =>
  import("@/components/sections/contact").then((mod) => mod.Contact)
);

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Contact />
    </>
  );
}
