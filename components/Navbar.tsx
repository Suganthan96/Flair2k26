"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks, siteConfig } from "@/data/mockData";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-colors duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-md border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="#home" className="flex items-center gap-3 shrink-0">
          <Image
            src="/assets/licet-logo.webp"
            alt="LICET logo"
            width={36}
            height={36}
            className="h-9 w-9 object-contain"
          />
          <span className="font-avenger text-lg tracking-wide text-white uppercase">
            {siteConfig.name}
          </span>
          <Image
            src="/assets/grait-logo.webp"
            alt="GRAIT logo"
            width={36}
            height={36}
            className="h-9 w-9 object-contain"
          />
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/80 hover:text-avenger-red transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:block">
          <a
            href={siteConfig.registerUrl}
            className="rounded-full bg-gradient-to-r from-avenger-red to-avenger-purple px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-avenger-red/20 transition-transform hover:scale-105"
          >
            Register Now
          </a>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          className="lg:hidden text-white"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {open && (
        <div className="lg:hidden border-t border-white/10 bg-background/95 backdrop-blur-md px-6 py-6">
          <div className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-base font-medium text-white/85 hover:text-avenger-red transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href={siteConfig.registerUrl}
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-gradient-to-r from-avenger-red to-avenger-purple px-5 py-3 text-center text-sm font-semibold text-white"
            >
              Register Now
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
