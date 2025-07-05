import React from "react";

interface TopbarProps {
  isMobile?: boolean;
  sidebarOpen?: boolean;
  setSidebarOpen?: (open: boolean) => void;
}

const topbarStyle: React.CSSProperties = {
  width: "100%",
  height: 64,
  background: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 32px",
  borderBottom: "1px solid #e5e7eb",
  boxSizing: "border-box",
  zIndex: 1,
};

const mobileTopbarStyle: React.CSSProperties = {
  ...topbarStyle,
  padding: "0 16px",
};

const searchStyle: React.CSSProperties = {
  background: "#f3f4f6",
  border: "none",
  borderRadius: 8,
  padding: "8px 16px",
  fontSize: 16,
  width: 240,
  outline: "none",
  marginRight: 24,
};

const rightStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 28,
  marginLeft: "auto",
};

const mobileRightStyle: React.CSSProperties = {
  ...rightStyle,
  gap: 16,
};

const hamburgerStyle: React.CSSProperties = {
  width: 32,
  height: 32,
  background: "transparent",
  border: "none",
  cursor: "pointer",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: 3,
  padding: 4,
};

const hamburgerLineStyle: React.CSSProperties = {
  width: 20,
  height: 2,
  background: "#222",
  borderRadius: 1,
  transition: "all 0.3s ease",
};

const bellStyle: React.CSSProperties = {
  width: 28,
  height: 28,
  color: "#222",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "transparent",
  outline: "none",
};

const userStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 12,
};

const avatarStyle: React.CSSProperties = {
  width: 36,
  height: 36,
  borderRadius: "50%",
  background: "#e5e7eb",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: 600,
  fontSize: 18,
  color: "#222",
};

export default function Topbar({
  isMobile = false,
  sidebarOpen = false,
  setSidebarOpen,
}: TopbarProps) {
  const handleHamburgerClick = () => {
    if (setSidebarOpen) {
      setSidebarOpen(!sidebarOpen);
    }
  };

  return (
    <header style={isMobile ? mobileTopbarStyle : topbarStyle}>
      {!isMobile && <input style={searchStyle} placeholder="Search..." />}
      <div style={isMobile ? mobileRightStyle : rightStyle}>
        {isMobile && (
          <button style={hamburgerStyle} onClick={handleHamburgerClick}>
            <div
              style={{
                ...hamburgerLineStyle,
                transform: sidebarOpen
                  ? "rotate(45deg) translate(5px, 5px)"
                  : "none",
              }}
            />
            <div
              style={{
                ...hamburgerLineStyle,
                opacity: sidebarOpen ? 0 : 1,
              }}
            />
            <div
              style={{
                ...hamburgerLineStyle,
                transform: sidebarOpen
                  ? "rotate(-45deg) translate(7px, -6px)"
                  : "none",
              }}
            />
          </button>
        )}
        <div aria-label="Notifications" style={bellStyle}>
          <svg
            width="22"
            height="22"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
        </div>
        <div style={userStyle}>
          <div style={avatarStyle}>JD</div>
          {!isMobile && (
            <span style={{ fontWeight: 500, color: "#222" }}>John Doe</span>
          )}
        </div>
      </div>
    </header>
  );
}
