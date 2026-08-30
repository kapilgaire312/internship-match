"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

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

        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={isSidebarOpen}
          onClick={() => setIsSidebarOpen((prev) => !prev)}
          className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white p-2 text-slate-700 shadow-sm transition hover:opacity-80 md:hidden"
        >
          {isSidebarOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {isSidebarOpen && (
        <div className="md:hidden">
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px]"
          />

          <aside className="fixed inset-y-0 right-0 z-50 w-72 border-l border-slate-200 bg-white p-5 shadow-2xl">
            <div className="mb-6 flex items-center justify-end pr-3">
              <button
                type="button"
                aria-label="Close sidebar"
                onClick={() => setIsSidebarOpen(false)}
                className="rounded-lg p-2 text-slate-700 hover:bg-slate-200"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className="rounded-xl bg-[#ebf1f7] px-4 py-3 text-base font-medium text-slate-800 transition hover:opacity-80"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </aside>
        </div>
      )}
    </nav>
  );
}
