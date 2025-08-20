"use client";

import { useState, useEffect } from "react";
import { DashboardStats } from "@/types";

const initialStats: DashboardStats = {
  totalInside: 275,
  karyawanPKC: 156,
  phlKontraktor: 67,
  praktikan: 32,
  visitor: 20,
};

export const useDataSimulation = () => {
  const [animatedStats, setAnimatedStats] =
    useState<DashboardStats>(initialStats);

  useEffect(() => {
    // Simulate data changes for demonstration
    const dataSimulation = setInterval(() => {
      setAnimatedStats((prev) => {
        const variations = {
          karyawanPKC: Math.floor(Math.random() * 12) - 6, // ±6
          phlKontraktor: Math.floor(Math.random() * 8) - 4, // ±4
          praktikan: Math.floor(Math.random() * 6) - 3, // ±3
          visitor: Math.floor(Math.random() * 6) - 3, // ±3
        };

        const newStats = {
          karyawanPKC: Math.max(
            0,
            Math.min(200, prev.karyawanPKC + variations.karyawanPKC)
          ),
          phlKontraktor: Math.max(
            0,
            Math.min(50, prev.phlKontraktor + variations.phlKontraktor)
          ),
          praktikan: Math.max(
            0,
            Math.min(25, prev.praktikan + variations.praktikan)
          ),
          visitor: Math.max(0, Math.min(25, prev.visitor + variations.visitor)),
        };

        // Calculate total and ensure it doesn't exceed 275
        const calculatedTotal =
          newStats.karyawanPKC +
          newStats.phlKontraktor +
          newStats.praktikan +
          newStats.visitor;
        const totalInside = Math.min(275, calculatedTotal);

        // If total exceeds 275, proportionally reduce individual values
        if (calculatedTotal > 275) {
          const ratio = 275 / calculatedTotal;
          newStats.karyawanPKC = Math.floor(newStats.karyawanPKC * ratio);
          newStats.phlKontraktor = Math.floor(newStats.phlKontraktor * ratio);
          newStats.praktikan = Math.floor(newStats.praktikan * ratio);
          newStats.visitor = Math.floor(newStats.visitor * ratio);
        }

        return {
          totalInside,
          ...newStats,
        };
      });
    }, 7000); // Change every 9 seconds

    return () => {
      clearInterval(dataSimulation);
    };
  }, []);

  return { animatedStats };
};
