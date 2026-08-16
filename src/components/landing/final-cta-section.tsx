"use client";

import Link from "next/link";
import { ArrowRight, BrainCircuit } from "lucide-react";
import { motion } from "motion/react";

export function FinalCTA() {
  return (
    <section
      id="cta"
      className="relative overflow-hidden bg-[#F4F8FD] py-24 lg:py-32"
    >
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 -z-0 size-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1976D2]/10 blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-[#E8F1FC] text-[#1976D2]">
            <BrainCircuit className="size-6" />
          </div>

          <h2 className="mt-7 text-4xl font-semibold tracking-tight text-[#071A2F] sm:text-5xl">
            Your operation already has the data.
            <span className="block text-[#1976D2]">Give it intelligence.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#64748B]">
            See how FactoryPilot turns operational complexity into clear,
            actionable decisions.
          </p>

          <div className="mt-9">
            <Link
              href="/dashboard"
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#1976D2] px-7 text-sm font-semibold text-white shadow-lg shadow-[#1976D2]/20 transition-all hover:bg-[#1557B0] hover:shadow-xl hover:shadow-[#1976D2]/25"
            >
              Explore FactoryPilot
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
