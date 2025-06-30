'use client';

import { ArrowRight, BookOpenCheck } from "lucide-react";
import { Button } from "./ui/button";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";

const Navbar = () => {
  const { isSignedIn } = useAuth();
  
  return (
    <header className="sticky top-0 left-0 z-50 w-full bg-[#f8f5ee] backdrop-blur border-slate-500/10">
      <div className="mx-auto h-[60px] max-w-7xl px-4 md:px-6">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center">
            <BookOpenCheck className="text-black w-7 h-7 mr-3" />
            <span className="text-md md:text-lg font-medium text-black">
              PDF Wisdom
            </span>
          </div>

          <Link href={isSignedIn ? "/documents" : "/sign-in"}>
            <Button className="px-0" variant="link">
              Get started <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
