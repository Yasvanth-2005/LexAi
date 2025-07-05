import React from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  width?: number | string;
}

const overlayStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "rgba(0,0,0,0.35)",
  backdropFilter: "blur(2px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
};

const modalStyle: React.CSSProperties = {
  background: "#fff",
  border: "2.5px solid #2563eb",
  borderRadius: 18,
  boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
  padding: "36px 32px",
  minWidth: 400,
  maxWidth: "95vw",
  maxHeight: "90vh",
  overflowY: "auto",
  position: "relative",
  display: "flex",
  flexDirection: "column",
  gap: 24,
  animation: "modalFadeIn 0.3s cubic-bezier(.4,0,.2,1)",
};

const headerStyle: React.CSSProperties = {
  fontWeight: 700,
  fontSize: 22,
  marginBottom: 18,
  color: "#222",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const closeIconStyle: React.CSSProperties = {
  fontSize: 28,
  color: "#888",
  background: "none",
  border: "none",
  cursor: "pointer",
  transition: "color 0.2s",
  marginLeft: 12,
};

const modalKeyframes = `
@keyframes modalFadeIn {
  from { opacity: 0; transform: translateY(40px) scale(0.98); }
  to { opacity: 1; transform: none; }
}`;

export default function Modal({
  open,
  onClose,
  title,
  children,
  width,
}: ModalProps) {
  if (!open) return null;
  return (
    <div style={overlayStyle}>
      <style>{modalKeyframes}</style>
      <div style={{ ...modalStyle, width: width || 500 }}>
        <div style={headerStyle}>
          {title && <span>{title}</span>}
          <button
            type="button"
            aria-label="Close"
            style={closeIconStyle}
            onClick={onClose}
            onMouseOver={(e) => (e.currentTarget.style.color = "#222")}
            onMouseOut={(e) => (e.currentTarget.style.color = "#888")}
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
