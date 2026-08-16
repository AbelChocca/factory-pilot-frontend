"use client";

import { motion } from "motion/react";
import { Boxes, Clock3, TriangleAlert } from "lucide-react";

const problems = [
  {
    icon: Boxes,
    title: "Fragmented information",
    description:
      "Inventory, materials, suppliers and production data are often disconnected across different workflows.",
  },
  {
    icon: TriangleAlert,
    title: "Hidden production risks",
    description:
      "A material shortage or supplier issue can quickly become a production problem before teams see the full impact.",
  },
  {
    icon: Clock3,
    title: "Slow decision-making",
    description:
      "Teams spend valuable time connecting information before they can understand what is happening and decide what to do.",
  },
];

export function ProblemSection() {
  return (
    <section id="problem" className="py-24 bg-[#F4F8FD] lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#1976D2]">
            The problem
          </p>

          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-[#071A2F] sm:text-5xl">
            Manufacturing teams have the data.
            <span className="block text-[#475569]">
              They need the intelligence.
            </span>
          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#64748B]">
            Modern manufacturing operations generate enormous amounts of
            information. The challenge is turning that information into a clear
            understanding of what needs attention and what to do next.
          </p>
        </motion.div>

        {/* Problem cards */}
        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {problems.map((problem, index) => {
            const Icon = problem.icon;

            return (
              <motion.article
                key={problem.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.1,
                }}
                className="group rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#BFDBFE] hover:shadow-lg hover:shadow-[#071A2F]/5"
              >
                <div className="flex size-11 items-center justify-center rounded-xl bg-[#E8F1FC] text-[#1976D2] transition-colors group-hover:bg-[#1976D2] group-hover:text-white">
                  <Icon className="size-5" />
                </div>

                <h3 className="mt-6 text-lg font-semibold text-[#0F172A]">
                  {problem.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-[#64748B]">
                  {problem.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
