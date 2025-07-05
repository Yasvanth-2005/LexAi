"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Redirect any route to the main route
    if (pathname !== "/") {
      router.replace("/");
    }
  }, [pathname, router]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setSidebarOpen(false);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const mobileOverlayStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0,0,0,0.5)",
    backdropFilter: "blur(2px)",
    zIndex: 1000,
    display: sidebarOpen ? "flex" : "none",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  };

  const mobileSidebarStyle: React.CSSProperties = {
    width: 280,
    height: "100vh",
    background: "#0a1a2f",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: "32px 0 24px 0",
    position: "relative",
    zIndex: 1001,
    animation: "slideIn 0.3s ease-out",
  };

  const mobileKeyframes = `
    @keyframes slideIn {
      from { transform: translateX(-100%); }
      to { transform: translateX(0); }
    }
  `;

  return (
    <html lang="en">
      <head>
        <title>Lex Ai</title>
        <meta name="description" content="Dashboard" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
        style={{ margin: 0, padding: 0 }}
      >
        <style>{mobileKeyframes}</style>
        <div style={{ display: "flex", minHeight: "100vh", width: "100vw" }}>
          {!isMobile && <Sidebar />}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
            }}
          >
            <Topbar
              isMobile={isMobile}
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
            />
            <main style={{ flex: 1, background: "#f7fafd", padding: 0 }}>
              {children}
            </main>
          </div>
        </div>

        {/* Mobile Sidebar Overlay */}
        {isMobile && (
          <div style={mobileOverlayStyle} onClick={() => setSidebarOpen(false)}>
            <div
              style={mobileSidebarStyle}
              onClick={(e) => e.stopPropagation()}
            >
              <Sidebar />
            </div>
          </div>
        )}
      </body>
    </html>
  );
}
