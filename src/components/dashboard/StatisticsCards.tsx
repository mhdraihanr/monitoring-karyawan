"use client";

import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { StatItem, DashboardStats, CardStyle } from "@/types";

interface StatisticsCardsProps {
  stats: DashboardStats;
}

export function StatisticsCards({ stats }: StatisticsCardsProps) {
  // Dynamic data for statistics with animation
  const statItems: StatItem[] = [
    {
      label: "Total Inside NPK2",
      value: stats.totalInside,
      icon: (
        <svg
          className="w-8 h-8 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
    },
    {
      title: "Staff Tetap",
      label: "Karyawan PKC",
      value: stats.karyawanPKC,
      icon: (
        <svg
          className="w-8 h-8 text-emerald-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
    },
    {
      title: "Tenaga Kontrak",
      label: "PHL & Kontraktor",
      value: stats.phlKontraktor,
      icon: (
        <svg
          className="w-8 h-8 text-amber-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
    },
    {
      title: "Program Magang",
      label: "Praktikan",
      value: stats.praktikan,
      icon: (
        <svg
          className="w-8 h-8 text-violet-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
    },
    {
      title: "Tamu Perusahaan",
      label: "Visitor",
      value: stats.visitor,
      icon: (
        <svg
          className="w-8 h-8 text-rose-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 17.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
          />
        </svg>
      ),
    },
  ];

  const cardStyles: CardStyle[] = [
    {
      bg: "bg-white/95",
      accent: "from-emerald-500/10 to-green-500/15",
      iconBg: "bg-emerald-500/10",
      iconColor: "text-emerald-600",
      border: "border-emerald-200/30",
    }, // Karyawan PKC
    {
      bg: "bg-white/95",
      accent: "from-amber-500/10 to-orange-500/15",
      iconBg: "bg-amber-500/10",
      iconColor: "text-amber-600",
      border: "border-amber-200/30",
    }, // PHL & Kontraktor
    {
      bg: "bg-white/95",
      accent: "from-violet-500/10 to-purple-500/15",
      iconBg: "bg-violet-500/10",
      iconColor: "text-violet-600",
      border: "border-violet-200/30",
    }, // Praktikan
    {
      bg: "bg-white/95",
      accent: "from-rose-500/10 to-pink-500/15",
      iconBg: "bg-rose-500/10",
      iconColor: "text-rose-600",
      border: "border-rose-200/30",
    }, // Visitor
  ];

  return (
    <main className="max-w-7xl mx-auto px-8 lg:px-12">
      {/* Two Column Layout: Total on Left, Others on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
        {/* Left Column - Total Inside Card (Spans 2 columns) */}
        <div className="lg:col-span-2">
          <div className="bg-white/95 backdrop-blur-xl border border-gray-200/50 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] relative overflow-hidden h-full min-h-[480px]">
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/10 rounded-3xl"></div>
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 opacity-80">
                    TOTAL KESELURUHAN
                  </div>
                  <div className="text-lg font-semibold text-gray-700 leading-tight">
                    {statItems[0].label}
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 flex items-center justify-center bg-blue-500/10 rounded-2xl">
                    <svg
                      className="w-8 h-8 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="text-center flex-1 flex items-center justify-center mt-12">
                <div
                  className="font-bold text-gray-900"
                  style={{ fontSize: "100px" }}
                >
                  <AnimatedNumber
                    value={statItems[0].value}
                    className="font-bold text-gray-900"
                    style={{ fontSize: "100px" }}
                    duration={1500}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Other Statistics (Spans 3 columns) */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {statItems.slice(1).map((stat, index) => {
              const style = cardStyles[index];
              return (
                <div
                  key={index + 1}
                  className={`${style.bg} ${style.border} backdrop-blur-xl rounded-3xl p-7 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.03] hover:-translate-y-2 h-58 border relative overflow-hidden group`}
                >
                  {/* Gradient overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${style.accent} rounded-3xl opacity-50 group-hover:opacity-70 transition-opacity duration-300`}
                  ></div>

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        {stat.title && (
                          <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 opacity-80">
                            {stat.title}
                          </div>
                        )}
                        <div className="text-lg font-semibold text-gray-700 leading-tight">
                          {stat.label}
                        </div>
                      </div>
                      <div
                        className={`w-12 h-12 flex items-center justify-center ${style.iconBg} rounded-2xl shadow-sm flex-shrink-0`}
                      >
                        <div className={`w-6 h-6 ${style.iconColor}`}>
                          {stat.icon}
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col justify-center text-center">
                      <div className="font-bold text-gray-900 mb-2">
                        <AnimatedNumber
                          value={stat.value}
                          className="font-bold text-gray-900"
                          style={{ fontSize: "80px" }}
                          duration={1200}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
