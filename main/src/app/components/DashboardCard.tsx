import React from "react";

interface DashboardCardProps {
  title: string;
  value: number;
  trend: number;
  trendType: "up" | "down";
}

const cardStyle: React.CSSProperties = {
  background: "#fff",
  borderRadius: 16,
  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
  padding: "24px 32px",
  minWidth: 200,
  minHeight: 100,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
  gap: 8,
};

const titleStyle: React.CSSProperties = {
  fontSize: 16,
  fontWeight: 500,
  color: "#6b7280",
};

const valueStyle: React.CSSProperties = {
  fontSize: 32,
  fontWeight: 700,
  color: "#222",
};

const trendStyle = (trendType: "up" | "down"): React.CSSProperties => ({
  fontSize: 14,
  fontWeight: 500,
  color: trendType === "up" ? "#16a34a" : "#dc2626",
  display: "flex",
  alignItems: "center",
  gap: 4,
});

export default function DashboardCard({
  title,
  value,
  trend,
  trendType,
}: DashboardCardProps) {
  return (
    <div style={cardStyle}>
      <span style={titleStyle}>{title}</span>
      <span style={valueStyle}>{value}</span>
      <span style={trendStyle(trendType)}>
        {trendType === "up" ? "▲" : "▼"} {Math.abs(trend)}% from last month
      </span>
    </div>
  );
}
