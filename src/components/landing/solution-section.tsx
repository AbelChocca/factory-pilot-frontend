"use client";

import { motion } from "motion/react";
import {
  BrainCircuit,
  Boxes,
  Factory,
  PackageCheck,
  ShieldCheck,
  Truck,
} from "lucide-react";

const dataSources = [
  {
    icon: Boxes,
    label: "Inventory",
  },
  {
    icon: Factory,
    label: "Production",
  },
  {
    icon: Truck,
    label: "Suppliers",
  },
];

const outcomes = [
  {
    icon: ShieldCheck,
    label: "Detect risks",
  },
  {
    icon: PackageCheck,
    label: "Recommend actions",
  },
];

export function SolutionSection() {
  return (
    <section
      id="solution"
      className="overflow-hidden bg-[#F4F8FD] py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#1976D2]">
            The solution
          </p>

          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-[#071A2F] sm:text-5xl">
            From operational data
            <span className="block text-[#1976D2]">
              to intelligent decisions.
            </span>
          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#475569]">
            FactoryPilot brings your operational context together and adds an AI
            layer that can understand relationships, identify risks and
            recommend what to do next.
          </p>
        </motion.div>

        {/* Intelligence flow */}
        <div className="relative mt-20">
          {/* Connecting line */}
          <div
            aria-hidden
            className="absolute left-[16.66%] right-[16.66%] top-1/2 hidden h-px bg-[#BFDBFE] lg:block"
          />

          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
            {/* Inputs */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-3 gap-3"
            >
              {dataSources.map((source) => {
                const Icon = source.icon;

                return (
                  <div
                    key={source.label}
                    className="rounded-xl border border-[#DCE7F5] bg-white p-4 text-center shadow-sm"
                  >
                    <div className="mx-auto flex size-10 items-center justify-center rounded-lg bg-[#E8F1FC] text-[#1976D2]">
                      <Icon className="size-4" />
                    </div>

                    <p className="mt-3 text-xs font-semibold text-[#334155]">
                      {source.label}
                    </p>
                  </div>
                );
              })}
            </motion.div>

            {/* AI Core */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: 0.15,
              }}
              className="relative mx-auto flex size-36 items-center justify-center rounded-full border border-[#5FA8FF]/30 bg-[#071A2F] shadow-2xl shadow-[#071A2F]/20"
            >
              <div
                aria-hidden
                className="absolute inset-[-12px] rounded-full border border-[#1976D2]/10"
              />

              <div className="text-center">
                <BrainCircuit className="mx-auto size-8 text-[#5FA8FF]" />

                <p className="mt-2 text-xs font-semibold text-white">
                  FactoryPilot
                </p>

                <p className="mt-0.5 text-[10px] text-[#8FA5BF]">
                  AI intelligence
                </p>
              </div>
            </motion.div>

            {/* Outcomes */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid gap-3"
            >
              {outcomes.map((outcome) => {
                const Icon = outcome.icon;

                return (
                  <div
                    key={outcome.label}
                    className="flex items-center gap-4 rounded-xl border border-[#DCE7F5] bg-white p-4 shadow-sm"
                  >
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#E8F1FC] text-[#1976D2]">
                      <Icon className="size-4" />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-[#0F172A]">
                        {outcome.label}
                      </p>

                      <p className="mt-0.5 text-xs text-[#64748B]">
                        Turn insight into action.
                      </p>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
