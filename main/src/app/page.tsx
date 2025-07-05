import DashboardCard from "@/app/components/DashboardCard";
import WorkspaceList from "@/app/components/WorkspaceList";

export default function Home() {
  return (
    <div
      style={{ padding: 32, width: "100%", maxWidth: 1400, margin: "0 auto" }}
    >
      <h2
        style={{
          fontWeight: 700,
          fontSize: 28,
          marginBottom: 24,
          color: "black",
        }}
      >
        Dashboard Overview
      </h2>
      <div style={{ display: "flex", gap: 24, marginBottom: 40 }}>
        <DashboardCard
          title="Total Workspaces"
          value={4}
          trend={12}
          trendType="up"
        />
        <DashboardCard
          title="Total Signed Contracts"
          value={51}
          trend={12}
          trendType="up"
        />
        <DashboardCard
          title="Contracts Drafted"
          value={4}
          trend={-4}
          trendType="down"
        />
        <DashboardCard
          title="Contracts Reviewed"
          value={18}
          trend={12}
          trendType="up"
        />
        <DashboardCard
          title="Contracts Translated"
          value={9}
          trend={10}
          trendType="up"
        />
      </div>
      <WorkspaceList />
    </div>
  );
}
