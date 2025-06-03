'use client';

import React from "react";
import { Button } from "./ui/button";
import { usersPaths } from "@/const/users";
import Image from "next/image";
import { features } from "@/const/features";
import { BookOpenCheckIcon, Facebook, Twitter, Youtube } from "lucide-react";
import Link from "next/link";
import { links, socials } from "@/const/footer";
import TypewriterComponent from "typewriter-effect";

const LandingPage = () => {
  return (
    <>
      <section className="bg-[#072426]">
        <div className="section-container flex flex-col md:flex-row text-white items-center">
          <div className="flex flex-col space-y-8 text-center md:w-1/2 md:text-left">
            <h1 className="max-w-md text-3xl md:text-4xl lg:text-5xl md:leading-tight">
              Chat with any PDF document
            </h1>
            <div className="text-2xl md:text-3xl  font-light text-orange-400">
              <TypewriterComponent
                options={{
                  strings: [
                    "Books",
                    "Scientific reports",
                    "User manuals",
                    "Financial reports",
                    "Legal documents",
                  ],
                  autoStart: true,
                  loop: true,
                }}
              />
            </div>
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

      <section className="section-container mb-10">
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

      <section className="section-container text-center">
        <h1 className="text-3xl md:text-4xl font-semibold mb-5 sm:mb-10">
          Get started
        </h1>
        <p className="text-gray-500 my-6 ">
          Upload a document and start chatting with it today.
          <br /> No credit card required.
        </p>
        <div className="w-full max-w-sm mx-auto px-4">
          <Button variant={"orange"}>Sign up for free</Button>
        </div>
      </section>

      <footer className="bg-[#F8F5EE] py-10">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="md:flex md:justify-between items-start">
            <div className="flex items-center mb-6 -mt-1">
              <BookOpenCheckIcon className="text-black w-8 h-8 mr-3" />
              <span className="text-md md:text-lg font-medium text-black">
                PDF Wisdom
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-20">
              {links.map(({ title, items }) => (
                <div className="text-sm sm:mb-0 mb-8" key={title}>
                  <h2 className="font-medium mb-4">{title}</h2>
                  <div className="flex flex-col text-gray-400 space-y-2">
                    {items.map((item) => (
                      <Link
                        className="hover:underline"
                        href={item.href}
                        key={item.label}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <hr className="my-6 border-gray-300 lg:my-8" />

          <div className="text-sm text-gray-500 flex items-center sm:justify-between flex-col sm:flex-row">
            <span>Copyright &copy; 2023, All Rights Reserved</span>

            <div className="flex text-2xl space-x-6 sm:justify-center mt-2 sm:mt-0">
              {socials.map(({ label, href, icon }) => (
                <Link href={href} key={label}>
                  {icon}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default LandingPage;
