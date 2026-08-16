"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "motion/react";

const navigation = [
  {
    label: "Platform",
    href: "#solution",
  },
  {
    label: "How it works",
    href: "#how-it-works",
  },
  {
    label: "AI Copilot",
    href: "#ai-copilot",
  },
];

export function LandingHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-[#071A2F]/85 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="shrink-0"
          onClick={() => setMobileOpen(false)}
        >
          <Image
            src="/assets/factory_pilot_logo.png"
            alt="FactoryPilot"
            width={150}
            height={40}
            priority
            className="h-9 w-auto object-contain"
          />
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-[#B8C7D9] transition-colors hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Link
            href="/dashboard"
            className="inline-flex h-10 items-center justify-center rounded-lg border border-[#5FA8FF]/40 bg-white/5 px-5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-[#5FA8FF]/70 hover:bg-[#1976D2]/15"
          >
            Open Dashboard
          </Link>
        </div>

        {/* Mobile menu */}
        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
          className="inline-flex size-10 items-center justify-center rounded-lg text-white transition-colors hover:bg-white/10 md:hidden"
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile navigation */}
      {mobileOpen && (
        <div className="border-t border-white/10 bg-[#071A2F]/95 backdrop-blur-xl md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-6 py-4">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="border-b border-white/10 py-4 text-sm font-medium text-[#B8C7D9] transition-colors last:border-b-0 hover:text-white"
              >
                {item.label}
              </a>
            ))}

            <Link
              href="/dashboard"
              onClick={() => setMobileOpen(false)}
              className="mt-4 inline-flex h-11 items-center justify-center rounded-lg bg-[#1976D2] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#1557B0]"
            >
              Open Dashboard
            </Link>
          </nav>
        </div>
      )}
    </motion.header>
  );
}
