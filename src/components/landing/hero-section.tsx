"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowRight,
  BrainCircuit,
  CircleCheck,
  Factory,
  TriangleAlert,
} from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden min-h-screen bg-[#071A2F]">
      {/* Ambient background */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-[#1976D2]/15 blur-3xl" />

        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-24 pt-24 lg:px-8 lg:pb-32 lg:pt-32">
        <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-[#B8C7D9]">
              <span className="size-1.5 rounded-full bg-[#1976D2]" />
              AI-powered manufacturing intelligence
            </div>

            <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
              Smarter decisions.
              <span className="block text-[#5FA8FF]">
                Better manufacturing.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#B8C7D9]">
              FactoryPilot connects inventory, materials, suppliers and
              production data with AI to help teams detect risks, understand
              their impact, and act before production is disrupted.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/dashboard"
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#1976D2] px-6 text-sm font-semibold text-white shadow-lg shadow-[#1976D2]/20 transition-colors hover:bg-[#1557B0]"
              >
                Explore FactoryPilot
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <a
                href="#how-it-works"
                className="inline-flex h-12 items-center justify-center rounded-lg border border-white/15 bg-white/5 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                See how it works
              </a>
            </div>
          </motion.div>

          {/* Product visualization */}
          <HeroVisualization />
        </div>
      </div>
    </section>
  );
}

function HeroVisualization() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.15,
        ease: "easeOut",
      }}
      className="relative"
    >
      {/* Glow */}
      <div
        aria-hidden
        className="absolute inset-10 rounded-full bg-[#1976D2]/20 blur-3xl"
      />

      <div className="relative rounded-2xl border border-white/10 bg-[#0B2545]/80 p-3 shadow-2xl shadow-black/30 backdrop-blur-xl">
        <div className="overflow-hidden rounded-xl border border-white/10 bg-[#071A2F]">
          {/* Window header */}
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="size-2 rounded-full bg-white/20" />
                <span className="size-2 rounded-full bg-white/20" />
                <span className="size-2 rounded-full bg-white/20" />
              </div>

              <span className="text-xs font-medium text-[#B8C7D9]">
                FactoryPilot
              </span>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-[#7DD3A7]">
              <CircleCheck className="size-3.5" />
              Operational
            </div>
          </div>

          <div className="space-y-4 p-5">
            {/* Intelligence card */}
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-lg bg-[#1976D2]/15 text-[#5FA8FF]">
                  <BrainCircuit className="size-5" />
                </div>

                <div>
                  <p className="text-xs font-medium text-[#B8C7D9]">
                    Operational Intelligence
                  </p>
                  <p className="mt-0.5 text-sm font-semibold text-white">
                    Production readiness
                  </p>
                </div>
              </div>

              <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "82%" }}
                  transition={{ duration: 1.2, delay: 0.7 }}
                  className="h-full rounded-full bg-[#1976D2]"
                />
              </div>

              <div className="mt-2 flex justify-between text-[11px] text-[#71839A]">
                <span>Current readiness</span>
                <span>82%</span>
              </div>
            </div>

            {/* Status cards */}
            <div className="grid grid-cols-2 gap-3">
              <StatusCard
                icon={<Factory className="size-4" />}
                label="Inventory"
                value="Healthy"
                positive
              />

              <StatusCard
                icon={<TriangleAlert className="size-4" />}
                label="Production"
                value="Attention"
              />
            </div>

            {/* AI insight */}
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="rounded-xl border border-[#1976D2]/20 bg-[#1976D2]/[0.08] p-4"
            >
              <div className="flex items-center gap-2">
                <BrainCircuit className="size-4 text-[#5FA8FF]" />

                <span className="text-xs font-semibold text-[#5FA8FF]">
                  AI Copilot
                </span>
              </div>

              <p className="mt-3 text-sm leading-6 text-white/90">
                3 materials may impact production this week.
              </p>

              <p className="mt-1 text-xs leading-5 text-[#8FA5BF]">
                FactoryPilot identified affected products and recommended
                replenishment actions.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function StatusCard({
  icon,
  label,
  value,
  positive = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  positive?: boolean;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
      <div className="flex items-center gap-2 text-[#71839A]">
        {icon}
        <span className="text-[11px]">{label}</span>
      </div>

      <p
        className={`mt-3 text-sm font-semibold ${
          positive ? "text-[#7DD3A7]" : "text-[#FBBF72]"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
