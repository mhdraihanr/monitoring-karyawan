// TypeScript type definitions for the dashboard application

export interface AnimatedNumberProps {
  value: number;
  className?: string;
  duration?: number;
  style?: React.CSSProperties;
}

export interface StatItem {
  title?: string;
  label: string;
  value: number;
  icon: React.ReactNode;
}

export interface DashboardStats {
  totalInside: number;
  karyawanPKC: number;
  phlKontraktor: number;
  praktikan: number;
  visitor: number;
}

export interface CardStyle {
  bg: string;
  accent: string;
  iconBg: string;
  iconColor: string;
  border: string;
}