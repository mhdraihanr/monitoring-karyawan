"use client";

import { StatisticsCards } from "./StatisticsCards";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { DashboardStats } from "@/types";
import { useState, useEffect, useCallback } from "react";

interface LayoutManagerProps {
  stats: DashboardStats;
}

export function LayoutManager({ stats }: LayoutManagerProps) {
  const [currentDay, setCurrentDay] = useState<number>(0);
  const [isAlternateLayout, setIsAlternateLayout] = useState<boolean>(false);
  const [isManualMode, setIsManualMode] = useState<boolean>(false);
  const [manualLayout, setManualLayout] = useState<"A" | "B">("A");
  const [scheduleSettings, setScheduleSettings] = useState<{
    [key: number]: "A" | "B";
  }>({
    0: "A", // Minggu
    1: "A", // Senin
    2: "B", // Selasa
    3: "A", // Rabu
    4: "B", // Kamis
    5: "A", // Jumat
    6: "B", // Sabtu
  });
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isBrowserFullscreen, setIsBrowserFullscreen] =
    useState<boolean>(false);

  // Day names for display
  const dayNames = ["MIN", "SEN", "SEL", "RAB", "KAM", "JUM", "SAB"];
  const fullDayNames = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
  ];

  // Browser fullscreen functions with vendor prefixes
  const enterBrowserFullscreen = () => {
    const elem = document.documentElement as Element & {
      webkitRequestFullscreen?: () => Promise<void>;
      msRequestFullscreen?: () => Promise<void>;
      mozRequestFullScreen?: () => Promise<void>;
    };

    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    }
  };

  const exitBrowserFullscreen = () => {
    const doc = document as Document & {
      webkitExitFullscreen?: () => Promise<void>;
      msExitFullscreen?: () => Promise<void>;
      mozCancelFullScreen?: () => Promise<void>;
    };

    if (doc.exitFullscreen) {
      doc.exitFullscreen();
    } else if (doc.webkitExitFullscreen) {
      doc.webkitExitFullscreen();
    } else if (doc.msExitFullscreen) {
      doc.msExitFullscreen();
    } else if (doc.mozCancelFullScreen) {
      doc.mozCancelFullScreen();
    }
  };

  const toggleBrowserFullscreen = useCallback(() => {
    if (isBrowserFullscreen) {
      exitBrowserFullscreen();
    } else {
      enterBrowserFullscreen();
    }
  }, [isBrowserFullscreen]);

  useEffect(() => {
    const updateLayout = () => {
      const today = new Date().getDay();
      setCurrentDay(today);

      if (isManualMode) {
        // Use manual layout selection
        setIsAlternateLayout(manualLayout === "B");
      } else {
        // Use automatic schedule-based layout
        setIsAlternateLayout(scheduleSettings[today] === "B");
      }
    };

    updateLayout();

    // Update every minute to catch day changes
    const interval = setInterval(updateLayout, 60000);

    return () => clearInterval(interval);
  }, [isManualMode, manualLayout, scheduleSettings]);

  // Keyboard event listener for F11 and ESC
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'F11') {
        event.preventDefault();
        toggleBrowserFullscreen();
      } else if (event.key === 'Escape' && isBrowserFullscreen) {
        exitBrowserFullscreen();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isBrowserFullscreen, toggleBrowserFullscreen]);

  // Monitor fullscreen state changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      const doc = document as Document & {
        webkitFullscreenElement?: Element;
        msFullscreenElement?: Element;
        mozFullScreenElement?: Element;
      };

      const isCurrentlyFullscreen = !!(
        doc.fullscreenElement ||
        doc.webkitFullscreenElement ||
        doc.msFullscreenElement ||
        doc.mozFullScreenElement
      );

      setIsBrowserFullscreen(isCurrentlyFullscreen);

      // Sync component fullscreen state with browser fullscreen
      if (isCurrentlyFullscreen) {
        setIsFullscreen(true);
      } else {
        setIsFullscreen(false);
      }
    };

    // Add event listeners for different browsers
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("msfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "msfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullscreenChange
      );
    };
  }, []);

  return (
    <div className="space-y-8">
      {/* Fullscreen Toggle Button - Hidden in fullscreen mode */}
      {!isFullscreen && (
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="flex justify-end mb-4">
            <button
              onClick={toggleBrowserFullscreen}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors duration-200 shadow-sm"
              title="Masuk ke layar penuh (F11)"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                />
              </svg>
              <span>Layar Penuh (F11)</span>
            </button>
          </div>
        </div>
      )}

      {/* Mode Control Panel - Hidden in fullscreen */}
      {!isFullscreen && (
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="bg-white/95 backdrop-blur-xl border border-gray-200/50 rounded-2xl p-6 shadow-lg">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              {/* Mode Toggle */}
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700">
                  Mode Layout:
                </span>
                <div className="flex items-center space-x-3">
                  <span
                    className={`text-sm ${
                      !isManualMode
                        ? "text-blue-600 font-semibold"
                        : "text-gray-500"
                    }`}
                  >
                    Otomatis
                  </span>
                  <button
                    onClick={() => setIsManualMode(!isManualMode)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      isManualMode ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                        isManualMode ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                  <span
                    className={`text-sm ${
                      isManualMode
                        ? "text-blue-600 font-semibold"
                        : "text-gray-500"
                    }`}
                  >
                    Manual
                  </span>
                </div>
              </div>

              {/* Manual Controls */}
              {isManualMode && (
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-700">
                    Pilih Layout:
                  </span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setManualLayout("A")}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        manualLayout === "A"
                          ? "bg-blue-600 text-white shadow-md"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      Layout A
                    </button>
                    <button
                      onClick={() => setManualLayout("B")}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        manualLayout === "B"
                          ? "bg-blue-600 text-white shadow-md"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      Layout B
                    </button>
                  </div>
                </div>
              )}

              {/* Schedule Settings Button */}
              {!isManualMode && (
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors duration-200"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>Pengaturan Jadwal</span>
                </button>
              )}
            </div>

            {/* Schedule Settings Panel */}
            {showSettings && !isManualMode && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Pengaturan Jadwal Layout
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                  {fullDayNames.map((dayName, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center space-y-2"
                    >
                      <span className="text-sm font-medium text-gray-700">
                        {dayName}
                      </span>
                      <div className="flex space-x-1">
                        <button
                          onClick={() =>
                            setScheduleSettings((prev) => ({
                              ...prev,
                              [index]: "A",
                            }))
                          }
                          className={`px-2 py-1 rounded text-xs font-medium transition-all duration-200 ${
                            scheduleSettings[index] === "A"
                              ? "bg-green-600 text-white shadow-sm"
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          }`}
                        >
                          A
                        </button>
                        <button
                          onClick={() =>
                            setScheduleSettings((prev) => ({
                              ...prev,
                              [index]: "B",
                            }))
                          }
                          className={`px-2 py-1 rounded text-xs font-medium transition-all duration-200 ${
                            scheduleSettings[index] === "B"
                              ? "bg-orange-600 text-white shadow-sm"
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          }`}
                        >
                          B
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Statistics Cards with Layout Switching */}
      <div
        className={isFullscreen ? "cursor-pointer" : ""}
        onClick={isFullscreen ? exitBrowserFullscreen : undefined}
        title={isFullscreen ? "Klik untuk keluar dari layar penuh (ESC)" : ""}
      >
        {isAlternateLayout ? (
          <AlternateStatisticsLayout stats={stats} />
        ) : (
          <StatisticsCards stats={stats} />
        )}
      </div>

      {/* Enhanced Day Indicator - Hidden in fullscreen */}
      {!isFullscreen && (
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 py-4">
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500 font-medium">
                Hari Saat Ini:
              </div>
              <div className="flex space-x-2">
                {dayNames.map((day, index) => (
                  <div
                    key={index}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-300 ${
                      index === currentDay
                        ? "bg-blue-500 text-white shadow-lg scale-110"
                        : "bg-gray-100 text-gray-500"
                    }`}
                    title={fullDayNames[index]}
                  >
                    {day}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500 font-medium">
                Layout Aktif:
              </div>
              <div
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  isAlternateLayout
                    ? "bg-orange-500 text-white"
                    : "bg-green-500 text-white"
                }`}
              >
                Layout {isAlternateLayout ? "B" : "A"}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500 font-medium">Mode:</div>
              <div
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  isManualMode
                    ? "bg-blue-500 text-white"
                    : "bg-purple-500 text-white"
                }`}
              >
                {isManualMode ? "Manual" : "Otomatis"}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Alternative Layout Component
function AlternateStatisticsLayout({ stats }: { stats: DashboardStats }) {
  return (
    <main className="max-w-7xl mx-auto px-8 lg:px-12">
      {/* Alternative Layout: 3x2 Grid with Total at bottom */}
      <div className="space-y-8">
        {/* Top Row - Individual Statistics in 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Karyawan PKC */}
          <div className="bg-emerald-200/90 border-emerald-300/50 backdrop-blur-xl rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.03] hover:-translate-y-2 border relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-green-500/25 rounded-3xl opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 opacity-80">
                    Staff Tetap
                  </div>
                  <div className="text-lg font-semibold leading-tight text-emerald-600">
                    Karyawan PKC
                  </div>
                </div>
                <div className="w-12 h-12 flex items-center justify-center bg-emerald-500/15 rounded-2xl shadow-sm flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-emerald-700"
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
                </div>
              </div>
              <div className="flex-1 flex flex-col justify-center text-center">
                <div
                  className="font-bold text-emerald-800"
                  style={{ fontSize: "48px" }}
                >
                  <AnimatedNumber
                    value={stats.karyawanPKC}
                    className="font-bold text-emerald-800"
                    style={{ fontSize: "78px" }}
                    duration={1200}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* PHL & Kontraktor */}
          <div className="bg-violet-200/90 border-violet-300/50 backdrop-blur-xl rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.03] hover:-translate-y-2 border relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-purple-500/25 rounded-3xl opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 opacity-80">
                    Tenaga Kontrak
                  </div>
                  <div className="text-lg font-semibold leading-tight text-[#AA00FF]">
                    PHL & Kontraktor
                  </div>
                </div>
                <div className="w-12 h-12 flex items-center justify-center bg-violet-500/15 rounded-2xl shadow-sm flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-violet-700"
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
                </div>
              </div>
              <div className="flex-1 flex flex-col justify-center text-center">
                <div
                  className="font-bold text-violet-600"
                  style={{ fontSize: "48px" }}
                >
                  <AnimatedNumber
                    value={stats.phlKontraktor}
                    className="font-bold text-violet-600"
                    style={{ fontSize: "78px" }}
                    duration={1200}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Praktikan */}
          <div className="bg-amber-200/90 border-amber-300/50 backdrop-blur-xl rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.03] hover:-translate-y-2 border relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-orange-500/25 rounded-3xl opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 opacity-80">
                    Program Magang
                  </div>
                  <div className="text-lg font-semibold leading-tight text-orange-400">
                    Praktikan
                  </div>
                </div>
                <div className="w-12 h-12 flex items-center justify-center bg-amber-500/15 rounded-2xl shadow-sm flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-amber-700"
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
                </div>
              </div>
              <div className="flex-1 flex flex-col justify-center text-center">
                <div
                  className="font-bold text-amber-600"
                  style={{ fontSize: "48px" }}
                >
                  <AnimatedNumber
                    value={stats.praktikan}
                    className="font-bold text-amber-600"
                    style={{ fontSize: "78px" }}
                    duration={1200}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Visitor */}
          <div className="bg-rose-200/90 border-rose-300/50 backdrop-blur-xl rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.03] hover:-translate-y-2 border relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-rose-500/20 to-pink-500/25 rounded-3xl opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 opacity-80">
                    Tamu Perusahaan
                  </div>
                  <div className="text-lg font-semibold leading-tight text-[#FF0000]">
                    Visitor
                  </div>
                </div>
                <div className="w-12 h-12 flex items-center justify-center bg-rose-500/15 rounded-2xl shadow-sm flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-rose-700"
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
                </div>
              </div>
              <div className="flex-1 flex flex-col justify-center text-center">
                <div
                  className="font-bold text-rose-600"
                  style={{ fontSize: "48px" }}
                >
                  <AnimatedNumber
                    value={stats.visitor}
                    className="font-bold text-rose-600"
                    style={{ fontSize: "78px" }}
                    duration={1200}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row - Total Inside Card (Full Width) */}
        <div className="w-full">
          <div className="bg-white/95 backdrop-blur-xl border border-gray-200/50 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.01] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/10 rounded-3xl"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center space-x-6">
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
                <div>
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 opacity-80">
                    TOTAL KESELURUHAN
                  </div>
                  <div className="text-2xl font-semibold text-gray-700 leading-tight">
                    Total Inside NPK2
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div
                  className="font-bold text-gray-900"
                  style={{ fontSize: "80px" }}
                >
                  <AnimatedNumber
                    value={stats.totalInside}
                    className="font-bold text-gray-900"
                    style={{ fontSize: "80px" }}
                    duration={1500}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
