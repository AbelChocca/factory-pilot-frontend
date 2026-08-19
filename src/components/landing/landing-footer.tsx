import Link from "next/link";

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

export function LandingFooter() {
  return (
    <footer className="bg-[#071A2F]">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="flex flex-col gap-10 border-b border-white/10 pb-10 md:flex-row md:items-start md:justify-between">
          {/* Brand */}
          <div className="max-w-sm">
            <Link href="/" className="shrink-0">
              <div className="text-2xl font-bold tracking-tight">
                <span className="text-white">Factory</span>
                <span className="text-[#5FA8FF]">Pilot</span>
              </div>
            </Link>

            <p className="mt-5 text-sm leading-6 text-[#8FA5BF]">
              AI-powered intelligence for smarter manufacturing operations.
            </p>

            <div className="mt-6 flex items-center gap-2 text-xs text-[#71839A]">
              <span>Built for</span>

              <span className="font-semibold text-[#B8C7D9]">
                NorthWood Manufacturing
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#71839A]">
              Explore
            </p>

            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-[#B8C7D9] transition-colors hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Dashboard */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#71839A]">
              Platform
            </p>

            <Link
              href="/dashboard"
              className="mt-3 inline-flex text-sm font-medium text-[#5FA8FF] transition-colors hover:text-white"
            >
              Open Dashboard →
            </Link>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col gap-3 pt-6 text-xs text-[#64748B] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} FactoryPilot. All rights reserved.</p>

          <p>Manufacturing intelligence, powered by AI.</p>
        </div>
      </div>
    </footer>
  );
}
