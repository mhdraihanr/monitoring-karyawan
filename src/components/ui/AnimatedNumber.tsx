"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { AnimatedNumberProps } from "@/types";

export function AnimatedNumber({
  value,
  className = "",
  duration = 1000,
  style,
}: AnimatedNumberProps) {
  const safeValue = value ?? 0;
  const [displayValue, setDisplayValue] = useState(safeValue);
  const [isAnimating, setIsAnimating] = useState(false);
  const [changeDirection, setChangeDirection] = useState<"up" | "down" | null>(
    null
  );
  const previousValue = useRef(safeValue);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);

  // Optimized easing function with memoization
  const easeOutQuart = useCallback((t: number): number => {
    return 1 - Math.pow(1 - t, 4);
  }, []);

  // Optimized animation function with better performance
  const animate = useCallback(
    (startValue: number, endValue: number) => {
      const animateFrame = (currentTime: number) => {
        if (startTimeRef.current === 0) {
          startTimeRef.current = currentTime;
        }

        const elapsed = currentTime - startTimeRef.current;
        const progress = Math.min(elapsed / duration, 1);

        // Use optimized easing with better performance
        const easedProgress = easeOutQuart(progress);
        const currentValue = Math.round(
          startValue + (endValue - startValue) * easedProgress
        );

        setDisplayValue(currentValue);

        if (progress < 1) {
          rafIdRef.current = requestAnimationFrame(animateFrame);
        } else {
          // Animation complete
          setIsAnimating(false);
          setChangeDirection(null);
          previousValue.current = safeValue;
          startTimeRef.current = 0;
          rafIdRef.current = null;
        }
      };

      rafIdRef.current = requestAnimationFrame(animateFrame);
    },
    [duration, easeOutQuart, safeValue]
  );

  useEffect(() => {
    // Only animate if value actually changed and not during initial render
    if (previousValue.current !== safeValue && previousValue.current !== 0) {
      // Cancel any existing animation
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }

      const direction = safeValue > previousValue.current ? "up" : "down";
      setChangeDirection(direction);
      setIsAnimating(true);
      startTimeRef.current = 0;

      animate(previousValue.current, safeValue);
    } else if (previousValue.current === 0) {
      // Initial load - set value immediately without animation
      previousValue.current = safeValue;
      setDisplayValue(safeValue);
    }

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [safeValue, animate]);

  // Memoize formatted display value to prevent unnecessary re-renders
  const formattedValue = useMemo(() => {
    return displayValue.toLocaleString("id-ID");
  }, [displayValue]);

  // Remove color classes for text - only keep indicator colors
  const colorClasses = useMemo(() => {
    return ""; // No color change for the animated number text
  }, [changeDirection]);

  // Memoize indicator classes for better performance
  const indicatorClasses = useMemo(() => {
    if (!changeDirection) return "";
    const baseClasses =
      "absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold transition-all duration-300 shadow-lg";
    const colorClasses =
      changeDirection === "up"
        ? "bg-green-500 text-white shadow-green-200"
        : "bg-red-500 text-white shadow-red-200";
    return `${baseClasses} ${colorClasses}`;
  }, [changeDirection]);

  return (
    <div className="relative inline-block">
      <span
        className={`${className} transition-all duration-300 ease-out ${colorClasses} ${
          isAnimating ? "scale-105" : "scale-100"
        }`}
        style={style}
      >
        {formattedValue}
      </span>

      {/* Optimized Change Indicator */}
      {changeDirection && (
        <div
          className={indicatorClasses}
          style={{
            animation: "fadeInBounce 0.6s ease-out",
            willChange: "transform, opacity", // Optimize for animations
          }}
        >
          {changeDirection === "up" ? "↑" : "↓"}
        </div>
      )}
    </div>
  );
}
