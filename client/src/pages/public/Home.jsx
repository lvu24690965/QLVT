import React from "react";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { Search } from "~/components";

{
  /*
function Section({ children }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref}>
      <span
        style={{
          transform: isInView ? "none" : "translateX(-200px)",
          opacity: isInView ? 1 : 0,
          transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
        }}>
        {children}
      </span>
    </section>
  );
}
*/
}
const Home = () => {
  return (
    <div className="bg-white w-full">
      <div className="w-full h-fit relative rounded-bl-[200px]">
        <img
          src="./bg-hero.png"
          alt="banner"
          className="h-[700px] w-full object-cover rounded-bl-[200px]"
        />

        <div className="absolute inset-0 gap-4 flex flex-col justify-center">
          <h1 className="text-3xl px-[139px] pt-16 text-main-600">
            INFOMATION TECHNOLOGY
          </h1>
          <div className="text-white px-[139px] py-5 text-7xl tracking-tight flex flex-col col-span-2 ">
            <div>CHAT TYPE, SOMETHING</div>
            <div> YOU THINKING.</div>
          </div>
        </div>
      </div>

      <Search />

      <div className="w-full bg-gray-700 -my-[64px] absolute">
        <div className="w-main my-[64px] mx-auto bg-black h-[550px] flex flex-col items-center justify-center text-white"></div>
      </div>
    </div>
  );
};

export default Home;
