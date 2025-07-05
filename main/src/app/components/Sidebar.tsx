import React from "react";

const sidebarStyle: React.CSSProperties = {
  width: 240,
  background: "#0a1a2f",
  color: "#fff",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  padding: "32px 0 24px 0",
  minHeight: "100vh",
  position: "relative",
  zIndex: 2,
};

const navItemStyle: React.CSSProperties = {
  padding: "12px 32px",
  width: "100%",
  fontWeight: 500,
  fontSize: 16,
  cursor: "pointer",
  border: "none",
  background: "none",
  color: "inherit",
  textAlign: "left",
  outline: "none",
};

const logoStyle: React.CSSProperties = {
  fontWeight: 700,
  fontSize: 24,
  letterSpacing: 1,
  marginBottom: 40,
  paddingLeft: 32,
};

const bottomStyle: React.CSSProperties = {
  marginTop: "auto",
  width: "100%",
  paddingLeft: 32,
  paddingBottom: 16,
};

export default function Sidebar() {
  return (
    <aside style={sidebarStyle}>
      <div style={logoStyle}>LeXi Ai</div>
      <nav style={{ width: "100%" }}>
        <button style={navItemStyle}>Workspaces</button>
        <button style={navItemStyle}>Team Management</button>
        <button style={navItemStyle}>Billings & Plans</button>
        <button style={navItemStyle}>Settings</button>
        <button style={navItemStyle}>Contact Admin</button>
      </nav>
      <div style={bottomStyle}>
        <button style={{ ...navItemStyle, color: "#b0b8c1" }}>Sign Out</button>
      </div>
    </aside>
  );
}
