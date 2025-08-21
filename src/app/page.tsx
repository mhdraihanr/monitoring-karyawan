"use client";

import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { LayoutManager } from "@/components/dashboard/LayoutManager";
import { useDataSimulation } from "@/hooks/useDataSimulation";

export default function Dashboard() {
  const { animatedStats } = useDataSimulation();

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Modern Minimalist Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-100">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute top-40 right-20 w-48 h-48 bg-violet-500/8 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-40 right-1/3 w-56 h-56 bg-cyan-500/8 rounded-full blur-3xl"></div>
        </div>
        {/* Subtle Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.15) 1px, transparent 0)",
            backgroundSize: "20px 20px",
          }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10 p-4">
        <DashboardHeader />
        <div className="mt-12">
          <LayoutManager stats={animatedStats} />
        </div>
        {/* Footer spacing */}
        <div className="h-8"></div>
      </div>
    </div>
  );
}
