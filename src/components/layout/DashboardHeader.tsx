/* eslint-disable @next/next/no-img-element */
"use client";

import { useCurrentTime } from "@/hooks/useCurrentTime";

export function DashboardHeader() {
  const { currentTime, isClient, formatDateTime } = useCurrentTime();

  return (
    <header className="mb-8">
      {/* Integrated Header Container */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-blue-50 via-white to-blue-50 rounded-3xl shadow-xl border border-blue-100/60 backdrop-blur-sm">
          <div className="px-6 py-4 sm:px-8 sm:py-2">
            {/* Main Header Content */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-6">
              {/* Left Section: Logo + Title */}
              <div className="flex items-center gap-4 lg:gap-6">
                {/* Company Logo */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 flex items-center justify-center">
                    <img
                      src="/logo.png"
                      alt="Pupuk Kujang Logo"
                      className="w-12 h-12 sm:w-14 sm:h-14 lg:w-17 lg:h-17 object-contain ml-6"
                    />
                  </div>
                </div>

                {/* Company Title */}
                <div className="text-center lg:text-left">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 tracking-wide leading-tight">
                    <span className="bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                      PUPUK KUJANG
                    </span>
                    <span className="ml-4 text-gray-800">- GATE NPK2</span>
                  </h1>
                </div>
              </div>

              {/* Right Section: Time Display */}
              <div className="flex-shrink-0">
                <div className="bg-white/95 backdrop-blur-md px-4 py-3 sm:px-6 sm:py-4 rounded-2xl shadow-lg border border-blue-200/50 min-w-[200px] sm:min-w-[240px]">
                  <div className="text-center">
                    <p className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">
                      Waktu Real-time
                    </p>
                    <p className="text-sm sm:text-base lg:text-lg font-bold text-gray-800">
                      {isClient ? formatDateTime(currentTime) : "Loading..."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
