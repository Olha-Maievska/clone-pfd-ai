import React from "react";
import { Button } from "./ui/button";
import { usersPaths } from "@/const/users";
import Image from "next/image";
import { features } from "@/const/features";

const LandingPage = () => {
  return (
    <>
      <section className="bg-[#072426]">
        <div className="section-container flex flex-col md:flex-row text-white items-center">
          <div className="flex flex-col space-y-8 text-center md:w-1/2 md:text-left">
            <h1 className="max-w-md text-3xl md:text-4xl lg:text-5xl md:leading-tight">
              Chat with any PDF document
            </h1>
            <p className="max-w-md md:max-w-sm text-white/80 font-light leading-7">
              From legal agreements to financial reports, PDF.ai brings your
              documents to life. You can ask questions, get summaries, find
              information, and more.
            </p>

            <div className="flex justify-center md:justify-start">
              <Button variant={"orange"}>Get started for free</Button>
            </div>

            <div className="flex items-center mt-6 flex-col md:flex-row">
              <div className="flex justify-start">
                {usersPaths.map((user) => (
                  <Image
                    key={user.avatar}
                    className="w-6 h-6 my-auto object-cover rounded-full ring-2 ring-green-950"
                    width={24}
                    height={24}
                    src={user.avatar}
                    alt=""
                  />
                ))}
              </div>
              <p className="ml-0 md:ml-2 mt-4 md:mt-0 text-sm text-slate-400">
                Loved by millions of happy users!
              </p>
            </div>
          </div>

          <div className="md:w-1/2">
            <img src="/hero.svg" alt="" />
          </div>
        </div>
      </section>

      <section className="section-container">
        <h1 className="text-center text-3xl md:text-4xl font-semibold mb-5 sm:mb-10">
          How it works
        </h1>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 lg:gap-10 text-black">
          {features.map((feature) => (
            <div
              className="rounded-b-xl px-5 pb-5 pt-3 shadow-lg"
              key={feature.title}
            >
              <div className="flex-col">
                <div className="flex items-center justify-center">
                  <img src={`/${feature.imagePath}`} alt="" />
                </div>
                <p className="text-xl font-medium">{feature.title}</p>
                <span className="text-sm block text-gray-500 mt-3">
                  {feature.description}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default LandingPage;
