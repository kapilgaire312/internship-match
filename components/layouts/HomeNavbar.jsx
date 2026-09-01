"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import SideNavbar from "./Sidebar";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/login", label: "Login" },
  { href: "/register/student", label: "Register as student" },
  { href: "/register/company", label: "Register as company" },
];

export default function HomeNavbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-10 bg-[#f5f6fc] transition-all-300">
      <div className="flex justify-between py-5 px-8 select-none sticky items-center">
        <Link href="/" className="contents">
          <div className="relative md:w-54 h-13 w-44 h-10 ">
            <Image
              src="/InternKaji.webp"
              alt="logo"
              loading="eager"
              fill
              sizes="(min-width: 6vw) 33vw"
            />
          </div>
        </Link>

        <div className="hidden items-center gap-9 md:flex">
          <div className="flex items-center">
            <Link className="contents" href="/login">
              <div className="bg-[#ebf1f7] rounded-xl flex items-center gap-2 px-3 py-2 hover:opacity-80 hover:underline active:opacity-60 ">
                Login
              </div>
            </Link>
          </div>

          <div className="flex items-center">
            <Link className="contents" href="/register/student">
              <div className="bg-[#ebf1f7] rounded-xl flex items-center gap-2 px-3 py-2 hover:opacity-80 hover:underline transition-all duration-300 ease-in-out active:opacity-60 ">
                Register as student
              </div>
            </Link>
          </div>

          <div className="flex items-center">
            <Link className="contents" href="/register/company">
              <div className="bg-[#ebf1f7] rounded-xl flex items-center gap-2 px-3 py-2 hover:opacity-80 hover:underline transition-all duration-300 ease-in-out active:opacity-60 ">
                Register as company
              </div>
            </Link>
          </div>
        </div>
        <SideNavbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} navLinks={navLinks} />
      </div>


    </nav>
  );
}
