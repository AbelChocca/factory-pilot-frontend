"use client";

import { motion } from "motion/react";
import {
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  Database,
  Package,
  Sparkles,
  TriangleAlert,
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Database,
    title: "Connect",
    description: "Inventory, materials, suppliers and production data.",
  },
  {
    number: "02",
    icon: BrainCircuit,
    title: "Understand",
    description: "AI connects the context and identifies what matters.",
  },
  {
    number: "03",
    icon: CheckCircle2,
    title: "Act",
    description: "Clear recommendations turn insight into action.",
  },
];

export function AICopilotSection() {
  return (
    <section
      id="ai-copilot"
      className="overflow-hidden bg-[#071A2F] py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* ─────────────────────────────
            INTRO
        ───────────────────────────── */}

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[#5FA8FF]/20 bg-[#1976D2]/10 px-3 py-1.5 text-xs font-medium text-[#8FC3FF]">
            <Sparkles className="size-3.5" />
            AI Copilot
          </div>

          <h2 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            From operational data
            <span className="block text-[#5FA8FF]">to intelligent action.</span>
          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#B8C7D9]">
            FactoryPilot connects your manufacturing data, understands the
            context behind it, and helps your team decide what to do next.
          </p>
        </motion.div>

        {/* ─────────────────────────────
            PROCESS
        ───────────────────────────── */}

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.12,
                }}
                className="relative"
              >
                <div className="flex items-start gap-4">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-[#5FA8FF]/20 bg-[#1976D2]/10 text-[#5FA8FF]">
                    <Icon className="size-5" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold tracking-[0.18em] text-[#5D7693]">
                        {step.number}
                      </span>

                      <h3 className="text-sm font-semibold text-white">
                        {step.title}
                      </h3>
                    </div>

                    <p className="mt-2 text-sm leading-6 text-[#8195AD]">
                      {step.description}
                    </p>
                  </div>
                </div>

                {index < steps.length - 1 && (
                  <ArrowRight
                    aria-hidden
                    className="absolute -right-3 top-4 hidden size-4 text-[#35516E] md:block"
                  />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* ─────────────────────────────
            COPILOT DEMO
        ───────────────────────────── */}

        <CopilotDemo />
      </div>
    </section>
  );
}

function CopilotDemo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, delay: 0.15 }}
      className="relative mt-20"
    >
      {/* Glow */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 -z-0 size-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1976D2]/15 blur-3xl"
      />

      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0B2545] shadow-2xl shadow-black/30">
        {/* Window header */}

        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-[#1976D2]/15">
              <BrainCircuit className="size-4 text-[#5FA8FF]" />
            </div>

            <div>
              <p className="text-xs font-semibold text-white">
                FactoryPilot AI
              </p>

              <p className="text-[10px] text-[#71839A]">Operational copilot</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-[10px] font-medium text-[#7DD3A7]">
            <span className="size-1.5 rounded-full bg-[#7DD3A7]" />
            Online
          </div>
        </div>

        {/* Conversation */}

        <div className="grid gap-8 p-5 sm:p-8 lg:grid-cols-[0.8fr_1.2fr]">
          {/* Left side */}

          <div className="flex flex-col justify-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#5D7693]">
              Ask anything about your operation
            </p>

            <motion.div
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="mt-5 rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.04] p-5"
            >
              <p className="text-sm leading-6 text-white">
                Which materials could impact production this week?
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="mt-4 flex items-center gap-2 text-xs text-[#71839A]"
            >
              <span className="flex gap-1">
                <span className="size-1 rounded-full bg-[#5FA8FF] animate-pulse" />
                <span className="size-1 rounded-full bg-[#5FA8FF] animate-pulse [animation-delay:150ms]" />
                <span className="size-1 rounded-full bg-[#5FA8FF] animate-pulse [animation-delay:300ms]" />
              </span>
              Analyzing operational context
            </motion.div>
          </div>

          {/* Right side */}

          <div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.15, duration: 0.6 }}
              className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 sm:p-6"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="size-4 text-[#5FA8FF]" />

                <span className="text-xs font-semibold text-[#8FC3FF]">
                  FactoryPilot
                </span>
              </div>

              <p className="mt-4 text-sm leading-6 text-white/90">
                I found{" "}
                <span className="font-semibold text-white">3 materials</span>{" "}
                that may impact production this week.
              </p>

              {/* Metrics */}

              <div className="mt-5 grid grid-cols-2 gap-3">
                <Metric
                  icon={<Package className="size-3.5" />}
                  value="3"
                  label="Materials at risk"
                />

                <Metric
                  icon={<TriangleAlert className="size-3.5" />}
                  value="2"
                  label="Products affected"
                />
              </div>

              {/* Materials */}

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1.55, duration: 0.5 }}
                className="mt-4 space-y-2"
              >
                <Material name="Walnut Plywood" status="Low stock" />

                <Material name="Oak Veneer" status="At risk" />

                <Material name="Steel Brackets" status="Low stock" />
              </motion.div>

              {/* Recommendation */}

              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.95, duration: 0.6 }}
                className="mt-5 rounded-xl border border-[#5FA8FF]/15 bg-[#1976D2]/10 p-4"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-[#7DD3A7]" />

                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#719CCB]">
                    Recommended action
                  </p>
                </div>

                <p className="mt-3 text-sm font-semibold text-white">
                  Replenish Walnut Plywood
                </p>

                <p className="mt-1 text-xs leading-5 text-[#8FA5BF]">
                  Current stock and production dependencies indicate an
                  immediate replenishment opportunity.
                </p>

                <button className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#5FA8FF] transition-colors hover:text-white">
                  View recommendation
                  <ArrowRight className="size-3.5" />
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Metric({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.025] p-3.5">
      <div className="flex items-center gap-2 text-[#71839A]">
        {icon}

        <span className="text-[10px]">{label}</span>
      </div>

      <p className="mt-2 text-xl font-semibold text-white">{value}</p>
    </div>
  );
}

function Material({ name, status }: { name: string; status: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.025] px-3 py-2.5">
      <div className="flex items-center gap-2.5">
        <div className="flex size-7 items-center justify-center rounded-md bg-[#1976D2]/10">
          <Package className="size-3.5 text-[#5FA8FF]" />
        </div>

        <span className="text-xs font-medium text-[#D4DFEC]">{name}</span>
      </div>

      <span className="text-[10px] font-medium text-[#FBBF77]">{status}</span>
    </div>
  );
}
