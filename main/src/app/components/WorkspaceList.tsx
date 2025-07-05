"use client";

import React, { useState, useEffect, useRef } from "react";

const tabStyle = (active: boolean): React.CSSProperties => ({
  padding: "10px 20px",
  fontWeight: 600,
  fontSize: 15,
  borderBottom: active ? "2px solid #0a1a2f" : "2px solid transparent",
  background: "none",
  color: active ? "#0a1a2f" : "#6b7280",
  cursor: "pointer",
  outline: "none",
  transition: "color 0.2s, border-color 0.2s",
});

const searchStyle: React.CSSProperties = {
  background: "#f7fafd",
  border: "1px solid #e5e7eb",
  borderRadius: 6,
  padding: "6px 12px",
  fontSize: 15,
  width: 260,
  outline: "none",
  marginRight: 12,
  color: "#222",
};

const workspaceGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
  gap: 24,
  marginTop: 6,
};

const workspaceListStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 12,
  marginTop: 6,
};

const workspaceCardStyle: React.CSSProperties = {
  background: "#fff",
  borderRadius: 12,
  boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  gap: 10,
  minHeight: 200,
  position: "relative",
  border: "1px solid #e5e7eb",
};

const workspaceListItemStyle: React.CSSProperties = {
  background: "#fff",
  borderRadius: 8,
  boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
  padding: "16px 20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  border: "1px solid #e5e7eb",
  transition: "box-shadow 0.2s",
};

const listItemContentStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 4,
  flex: 1,
};

const listItemActionsStyle: React.CSSProperties = {
  display: "flex",
  gap: 8,
  alignItems: "center",
};

const upgradeCardStyle: React.CSSProperties = {
  background: "#f7fafd",
  border: "2px dashed #bfc3c9",
  borderRadius: 12,
  minHeight: 200,
  display: "flex",
  marginTop: "20px",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  color: "#222",
  fontWeight: 500,
  fontSize: 16,
  textAlign: "center",
};

const modalOverlayStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "rgba(0,0,0,0.5)",
  backdropFilter: "blur(2px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
  transition: "background 0.3s, backdrop-filter 0.3s",
};

const modalStyle: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #e5e7eb",
  borderRadius: 16,
  padding: "24px 32px",
  minWidth: 400,
  maxWidth: "80vw",
  maxHeight: "85vh",
  overflowY: "auto",
  boxShadow: "0 12px 32px rgba(0,0,0,0.2)",
  display: "flex",
  flexDirection: "column",
  gap: 20,
  position: "relative",
  scrollbarWidth: "none",
  animation: "modalFadeIn 0.3s cubic-bezier(.4,0,.2,1)",
};

const mobileModalStyle: React.CSSProperties = {
  ...modalStyle,
  minWidth: "90vw",
  maxWidth: "95vw",
  padding: "20px 24px",
  margin: "16px",
  maxHeight: "90vh",
};

const modalKeyframes = `
@keyframes modalFadeIn {
  from { opacity: 0; transform: translateY(20px) scale(0.99); }
  to { opacity: 1; transform: none; }
}`;

const closeIconStyle: React.CSSProperties = {
  position: "absolute",
  top: 12,
  right: 12,
  fontSize: 24,
  color: "#888",
  background: "none",
  border: "none",
  cursor: "pointer",
  zIndex: 2,
  transition: "color 0.2s",
};

const modalScrollbarStyle = `
  .modal-scroll::-webkit-scrollbar { display: none; }
`;

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 14px",
  borderRadius: 8,
  border: "1px solid #e5e7eb",
  background: "#fff",
  color: "#222",
  fontSize: 15,
  marginTop: 6,
  marginBottom: 0,
  outline: "none",
  transition: "all 0.2s ease",
  boxSizing: "border-box",
};

const inputFocusStyle: React.CSSProperties = {
  ...inputStyle,
  border: "1px solid #0a1a2f",
  boxShadow: "0 0 0 2px #e0e7ef",
};

const labelStyle: React.CSSProperties = {
  fontWeight: 600,
  color: "#222",
  fontSize: 14,
  marginBottom: 4,
  marginTop: 8,
  display: "block",
};

const modalBtnStyle: React.CSSProperties = {
  padding: "10px 24px",
  borderRadius: 8,
  background: "#000",
  color: "#fff",
  border: "none",
  fontWeight: 600,
  fontSize: 15,
  cursor: "pointer",
  transition: "all 0.2 preaching",
  marginTop: 8,
  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
};

const modalBtnHoverStyle: React.CSSProperties = {
  ...modalBtnStyle,
  background: "#111",
  transform: "translateY(-1px)",
  boxShadow: "0 3px 10px rgba(0,0,0,0.15)",
};

const createBtnStyle: React.CSSProperties = {
  padding: "10px 20px",
  borderRadius: 6,
  background: "#111827",
  color: "#fff",
  border: "none",
  fontWeight: 600,
  marginLeft: 10,
  fontSize: 15,
  transition: "background 0.2s, color 0.2s",
};

const addCompanyBtnStyle: React.CSSProperties = {
  padding: "8px 16px",
  borderRadius: 8,
  background: "#000",
  color: "#fff",
  border: "none",
  fontWeight: 600,
  fontSize: 14,
  cursor: "pointer",
  marginLeft: 6,
  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  transition: "background 0.2s, box-shadow 0.2s",
};

const addCompanyBtnHoverStyle: React.CSSProperties = {
  ...addCompanyBtnStyle,
  background: "#222",
  boxShadow: "0 3px 12px rgba(0,0,0,0.15)",
};

export default function WorkspaceList() {
  const [tab, setTab] = useState("Litigation");
  const [workspaces, setWorkspaces] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    company_id: "",
    title: "",
    description: "",
    salary: "",
    location: "",
  });
  const [creating, setCreating] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [companies, setCompanies] = useState<any[]>([]);
  const [showCompanyModal, setShowCompanyModal] = useState(false);
  const [companyForm, setCompanyForm] = useState({
    name: "",
    location: "",
    description: "",
  });
  const [companyCreating, setCompanyCreating] = useState(false);
  const [companyError, setCompanyError] = useState<string | null>(null);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [applyJobId, setApplyJobId] = useState<number | null>(null);
  const [applyForm, setApplyForm] = useState({
    name: "",
    email: "",
    resume_link: "",
  });
  const [applyLoading, setApplyLoading] = useState(false);
  const [applyError, setApplyError] = useState<string | null>(null);
  const [applySuccess, setApplySuccess] = useState<string | null>(null);
  const [showApplicantsModal, setShowApplicantsModal] = useState(false);
  const [applicants, setApplicants] = useState<any[]>([]);
  const [applicantsLoading, setApplicantsLoading] = useState(false);
  const [applicantsError, setApplicantsError] = useState<string | null>(null);
  const [applicantsJobTitle, setApplicantsJobTitle] = useState<string>("");
  const [isGrid, setIsGrid] = useState(true);
  const [createBtnHover, setCreateBtnHover] = useState(false);
  const [inputFocus, setInputFocus] = useState<string | null>(null);
  const [modalBtnHover, setModalBtnHover] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filter] = useState("");

  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setShowModal(false);
        setShowCompanyModal(false);
        setShowApplyModal(false);
        setShowApplicantsModal(false);
      }
    }
    if (
      showModal ||
      showCompanyModal ||
      showApplyModal ||
      showApplicantsModal
    ) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showModal, showCompanyModal, showApplyModal, showApplicantsModal]);

  const fetchCompanies = () => {
    fetch(`${process.env.VITE_BACKEND_URL}/api/create-company/`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setCompanies(data);
      })
      .catch(() => {});
  };
  useEffect(() => {
    fetchCompanies();
  }, [showModal, showCompanyModal]);

  const fetchJobs = () => {
    setLoading(true);
    setError(null);
    fetch(`${process.env.VITE_BACKEND_URL}/api/jobs/`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch workspaces");
        return res.json();
      })
      .then((data) => {
        setWorkspaces(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    setFormError(null);
    try {
      const res = await fetch(`${process.env.VITE_BACKEND_URL}/api/post-job/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company_id: Number(form.company_id),
          title: form.title,
          description: form.description,
          salary: Number(form.salary),
          location: form.location,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create workspace");
      }
      setShowModal(false);
      setForm({
        company_id: "",
        title: "",
        description: "",
        salary: "",
        location: "",
      });
      fetchJobs();
    } catch (err: any) {
      setFormError(err.message);
    } finally {
      setCreating(false);
    }
  };

  const handleCompanyFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCompanyForm({ ...companyForm, [e.target.name]: e.target.value });
  };

  const handleCreateCompany = async (e: React.FormEvent) => {
    e.preventDefault();
    setCompanyCreating(true);
    setCompanyError(null);
    try {
      const res = await fetch(
        `${process.env.VITE_BACKEND_URL}/api/create-company/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(companyForm),
        }
      );
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create company");
      }
      setShowCompanyModal(false);
      setCompanyForm({ name: "", location: "", description: "" });
      fetchCompanies();
    } catch (err: any) {
      setCompanyError(err.message);
    } finally {
      setCompanyCreating(false);
    }
  };

  const openApplyModal = (jobId: number) => {
    setApplyJobId(jobId);
    setShowApplyModal(true);
    setApplyForm({ name: "", email: "", resume_link: "" });
    setApplyError(null);
    setApplySuccess(null);
  };

  const handleApplyFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApplyForm({ ...applyForm, [e.target.name]: e.target.value });
  };

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    setApplyLoading(true);
    setApplyError(null);
    setApplySuccess(null);
    try {
      const res = await fetch(`${process.env.VITE_BACKEND_URL}/api/apply/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...applyForm, job_id: applyJobId }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to apply");
      }
      setApplySuccess("Application submitted!");
      setApplyForm({ name: "", email: "", resume_link: "" });
    } catch (err: any) {
      setApplyError(err.message);
    } finally {
      setApplyLoading(false);
    }
  };

  const openApplicantsModal = (jobId: number, jobTitle: string) => {
    setApplicantsJobTitle(jobTitle);
    setShowApplicantsModal(true);
    setApplicants([]);
    setApplicantsLoading(true);
    setApplicantsError(null);
    fetch(`${process.env.VITE_BACKEND_URL}/api/applicants/${jobId}/`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch applicants");
        return res.json();
      })
      .then((data) => {
        setApplicants(data);
        setApplicantsLoading(false);
      })
      .catch((err) => {
        setApplicantsError(err.message);
        setApplicantsLoading(false);
      });
  };

  const filteredWorkspaces = workspaces.filter((ws) => {
    const matchesSearch =
      ws.title?.toLowerCase().includes(search.toLowerCase()) ||
      ws.company?.toLowerCase().includes(search.toLowerCase()) ||
      ws.location?.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter ? ws.caseType === filter : true;
    return matchesSearch && matchesFilter;
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const mobileTabStyle = (active: boolean): React.CSSProperties => ({
    ...tabStyle(active),
    fontSize: 14,
    padding: "8px 12px",
  });

  const mobileGridStyle: React.CSSProperties = {
    ...workspaceGridStyle,
    gridTemplateColumns: "1fr",
    gap: 16,
  };

  const mobileListStyle: React.CSSProperties = {
    ...workspaceListStyle,
    gap: 8,
  };

  const mobileWorkspaceCardStyle: React.CSSProperties = {
    ...workspaceCardStyle,
    padding: "16px",
    minHeight: 160,
  };

  const mobileWorkspaceListItemStyle: React.CSSProperties = {
    ...workspaceListItemStyle,
    padding: "12px 16px",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 12,
  };

  const mobileListItemActionsStyle: React.CSSProperties = {
    ...listItemActionsStyle,
    width: "100%",
    justifyContent: "space-between",
  };

  return (
    <section
      style={{
        width: "100%",
        maxWidth: 1100,
        margin: "0 auto",
        padding: isMobile ? "16px" : "0",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: isMobile ? 12 : 20,
          borderBottom: "1px solid #e5e7eb",
          marginBottom: 20,
          alignItems: "center",
          flexWrap: isMobile ? "wrap" : "nowrap",
        }}
      >
        <div
          style={
            isMobile
              ? mobileTabStyle(tab === "Contracts")
              : tabStyle(tab === "Contracts")
          }
          onClick={() => setTab("Contracts")}
        >
          Contracts
        </div>
        <div
          style={
            isMobile
              ? mobileTabStyle(tab === "Litigation")
              : tabStyle(tab === "Litigation")
          }
          onClick={() => setTab("Litigation")}
        >
          Litigation
        </div>
        <div
          style={{
            marginLeft: isMobile ? "0" : "auto",
            display: "flex",
            gap: 6,
            marginTop: isMobile ? "12px" : "0",
            width: isMobile ? "100%" : "auto",
          }}
        >
          <button
            onClick={() => setIsGrid(true)}
            style={{
              background: isGrid ? "#e5e7eb" : "transparent",
              border: "none",
              borderRadius: 6,
              padding: "6px 10px",
              fontWeight: 500,
              color: isGrid ? "#222" : "#6b7280",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
              flex: isMobile ? 1 : "auto",
              justifyContent: "center",
            }}
          >
            <span style={{ fontSize: 16 }}>⊞</span>
            {!isMobile && "Grid"}
          </button>
          <button
            onClick={() => setIsGrid(false)}
            style={{
              background: !isGrid ? "#e5e7eb" : "transparent",
              border: "none",
              borderRadius: 6,
              padding: "6px 10px",
              fontWeight: 500,
              color: !isGrid ? "#222" : "#6b7280",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
              flex: isMobile ? 1 : "auto",
              justifyContent: "center",
            }}
          >
            <span style={{ fontSize: 16 }}>☰</span>
            {!isMobile && "List"}
          </button>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 24,
          flexDirection: isMobile ? "column" : "row",
          gap: isMobile ? 16 : 0,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            width: isMobile ? "100%" : "auto",
          }}
        >
          <input
            style={{
              ...searchStyle,
              width: isMobile ? "100%" : searchStyle.width,
            }}
            placeholder="Search workspaces..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: isMobile ? "100%" : "auto",
          }}
        >
          <button
            style={{
              ...createBtnStyle,
              width: isMobile ? "100%" : "auto",
              fontSize: isMobile ? 14 : 15,
              padding: isMobile ? "12px 16px" : "10px 20px",
            }}
            onClick={() => setShowModal(true)}
          >
            + Create New Workspace
          </button>
        </div>
      </div>
      {loading && <div>Loading workspaces...</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
      {!loading && !error && filteredWorkspaces.length === 0 && (
        <div>No workspaces found.</div>
      )}
      {!loading &&
        !error &&
        (isGrid ? (
          <div style={isMobile ? mobileGridStyle : workspaceGridStyle}>
            {filteredWorkspaces.map((ws, idx) => (
              <div
                key={ws.id || idx}
                style={isMobile ? mobileWorkspaceCardStyle : workspaceCardStyle}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    marginBottom: 6,
                  }}
                >
                  <span style={{ color: "#6b7280", fontSize: 13 }}>
                    {ws.company}
                  </span>
                </div>
                <div
                  style={{
                    fontWeight: 700,
                    color: "black",
                    fontSize: 17,
                    marginBottom: 2,
                  }}
                >
                  {ws.title}
                </div>
                <div
                  style={{ color: "#6b7280", fontSize: 14, marginBottom: 6 }}
                >
                  {ws.description}
                </div>
                <div style={{ fontSize: 13, color: "#222", marginBottom: 6 }}>
                  Location: {ws.location} | Salary: {ws.salary}
                </div>
                <div
                  style={{ fontSize: 12, color: "#6b7280", marginBottom: 6 }}
                >
                  Posted: {new Date(ws.created_at).toLocaleDateString()}
                </div>
                <div style={{ display: "flex", gap: 6, marginTop: "auto" }}>
                  <button
                    style={{
                      padding: "6px 12px",
                      borderRadius: 6,
                      background: "#0a1a2f",
                      color: "#fff",
                      border: "none",
                      fontWeight: 500,
                      cursor: "pointer",
                    }}
                    onClick={() => openApplyModal(ws.id)}
                  >
                    Apply
                  </button>
                  <button
                    style={{
                      padding: "6px 12px",
                      borderRadius: 6,
                      background: "#e5e7eb",
                      color: "#0a1a2f",
                      border: "none",
                      fontWeight: 500,
                      cursor: "pointer",
                    }}
                    onClick={() => openApplicantsModal(ws.id, ws.title)}
                  >
                    View Applicants
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={isMobile ? mobileListStyle : workspaceListStyle}>
            {filteredWorkspaces.map((ws, idx) => (
              <div
                key={ws.id || idx}
                style={
                  isMobile
                    ? mobileWorkspaceListItemStyle
                    : workspaceListItemStyle
                }
              >
                <div style={listItemContentStyle}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      marginBottom: 4,
                    }}
                  >
                    <span style={{ color: "#6b7280", fontSize: 13 }}>
                      {ws.company}
                    </span>
                    <span style={{ color: "#e5e7eb" }}>•</span>
                    <span style={{ fontSize: 12, color: "#6b7280" }}>
                      {new Date(ws.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div
                    style={{
                      fontWeight: 700,
                      color: "black",
                      fontSize: 16,
                      marginBottom: 2,
                    }}
                  >
                    {ws.title}
                  </div>
                  <div
                    style={{ color: "#6b7280", fontSize: 14, marginBottom: 4 }}
                  >
                    {ws.description}
                  </div>
                  <div style={{ fontSize: 13, color: "#222" }}>
                    📍 {ws.location} | 💰 {ws.salary}
                  </div>
                </div>
                <div
                  style={
                    isMobile ? mobileListItemActionsStyle : listItemActionsStyle
                  }
                >
                  <button
                    style={{
                      padding: "6px 12px",
                      borderRadius: 6,
                      background: "#0a1a2f",
                      color: "#fff",
                      border: "none",
                      fontWeight: 500,
                      cursor: "pointer",
                      fontSize: 13,
                      flex: isMobile ? 1 : "auto",
                    }}
                    onClick={() => openApplyModal(ws.id)}
                  >
                    Apply
                  </button>
                  <button
                    style={{
                      padding: "6px 12px",
                      borderRadius: 6,
                      background: "#e5e7eb",
                      color: "#0a1a2f",
                      border: "none",
                      fontWeight: 500,
                      cursor: "pointer",
                      fontSize: 13,
                      flex: isMobile ? 1 : "auto",
                    }}
                    onClick={() => openApplicantsModal(ws.id, ws.title)}
                  >
                    View Applicants
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))}

      <div style={upgradeCardStyle}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>📄</div>
        Upgrade to add more litigation cases to the workspace
      </div>
      {(showModal ||
        showCompanyModal ||
        showApplyModal ||
        showApplicantsModal) && (
        <div style={modalOverlayStyle}>
          <style>{modalScrollbarStyle + modalKeyframes}</style>
          <div ref={modalRef} style={isMobile ? mobileModalStyle : modalStyle}>
            <button
              type="button"
              aria-label="Close"
              style={closeIconStyle}
              onClick={() => {
                setShowModal(false);
                setShowCompanyModal(false);
                setShowApplyModal(false);
                setShowApplicantsModal(false);
              }}
              onMouseOver={(e) => (e.currentTarget.style.color = "#222")}
              onMouseOut={(e) => (e.currentTarget.style.color = "#888")}
            >
              ×
            </button>
            {showModal && (
              <form onSubmit={handleCreate}>
                <h3
                  style={{
                    fontWeight: 700,
                    fontSize: 20,
                    marginBottom: 8,
                    color: "#222",
                  }}
                >
                  Create New Workspace
                </h3>
                <label style={labelStyle}>
                  Company:
                  <div
                    style={{ display: "flex", gap: 6, alignItems: "center" }}
                  >
                    <select
                      name="company_id"
                      value={form.company_id}
                      onChange={handleFormChange}
                      required
                      style={
                        inputFocus === "company_id"
                          ? inputFocusStyle
                          : inputStyle
                      }
                      onFocus={() => setInputFocus("company_id")}
                      onBlur={() => setInputFocus(null)}
                    >
                      <option value="">Select Company</option>
                      {companies.map((c: any) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      style={
                        createBtnHover
                          ? addCompanyBtnHoverStyle
                          : addCompanyBtnStyle
                      }
                      onClick={() => setShowCompanyModal(true)}
                      onMouseEnter={() => setCreateBtnHover(true)}
                      onMouseLeave={() => setCreateBtnHover(false)}
                    >
                      Add Company
                    </button>
                  </div>
                </label>
                <label style={labelStyle}>
                  Title:
                  <input
                    name="title"
                    value={form.title}
                    onChange={handleFormChange}
                    required
                    style={
                      inputFocus === "title" ? inputFocusStyle : inputStyle
                    }
                    onFocus={() => setInputFocus("title")}
                    onBlur={() => setInputFocus(null)}
                  />
                </label>
                <label style={labelStyle}>
                  Description:
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleFormChange}
                    required
                    style={
                      inputFocus === "description"
                        ? { ...inputFocusStyle, minHeight: 50 }
                        : { ...inputStyle, minHeight: 50 }
                    }
                    onFocus={() => setInputFocus("description")}
                    onBlur={() => setInputFocus(null)}
                  />
                </label>
                <label style={labelStyle}>
                  Salary:
                  <input
                    name="salary"
                    type="number"
                    value={form.salary}
                    onChange={handleFormChange}
                    required
                    style={
                      inputFocus === "salary" ? inputFocusStyle : inputStyle
                    }
                    onFocus={() => setInputFocus("salary")}
                    onBlur={() => setInputFocus(null)}
                  />
                </label>
                <label style={labelStyle}>
                  Location:
                  <input
                    name="location"
                    value={form.location}
                    onChange={handleFormChange}
                    required
                    style={
                      inputFocus === "location" ? inputFocusStyle : inputStyle
                    }
                    onFocus={() => setInputFocus("location")}
                    onBlur={() => setInputFocus(null)}
                  />
                </label>
                {formError && (
                  <div style={{ color: "red", fontSize: 13 }}>{formError}</div>
                )}
                <div
                  style={{
                    display: "flex",
                    gap: 12,
                    marginTop: 12,
                    justifyContent: "flex-end",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    style={modalBtnStyle}
                    onMouseEnter={() => setModalBtnHover("cancel")}
                    onMouseLeave={() => setModalBtnHover(null)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={creating}
                    style={
                      modalBtnHover === "create"
                        ? modalBtnHoverStyle
                        : modalBtnStyle
                    }
                    onMouseEnter={() => setModalBtnHover("create")}
                    onMouseLeave={() => setModalBtnHover(null)}
                  >
                    {creating ? "Creating..." : "Create"}
                  </button>
                </div>
              </form>
            )}
            {showCompanyModal && (
              <form onSubmit={handleCreateCompany}>
                <h3
                  style={{
                    fontWeight: 700,
                    fontSize: 20,
                    marginBottom: 8,
                    color: "#222",
                  }}
                >
                  Add Company
                </h3>
                <label style={labelStyle}>
                  Name:
                  <input
                    name="name"
                    value={companyForm.name}
                    onChange={handleCompanyFormChange}
                    required
                    style={
                      inputFocus === "company_name"
                        ? inputFocusStyle
                        : inputStyle
                    }
                    onFocus={() => setInputFocus("company_name")}
                    onBlur={() => setInputFocus(null)}
                  />
                </label>
                <label style={labelStyle}>
                  Location:
                  <input
                    name="location"
                    value={companyForm.location}
                    onChange={handleCompanyFormChange}
                    required
                    style={
                      inputFocus === "company_location"
                        ? inputFocusStyle
                        : inputStyle
                    }
                    onFocus={() => setInputFocus("company_location")}
                    onBlur={() => setInputFocus(null)}
                  />
                </label>
                <label style={labelStyle}>
                  Description:
                  <textarea
                    name="description"
                    value={companyForm.description}
                    onChange={handleCompanyFormChange}
                    required
                    style={
                      inputFocus === "company_description"
                        ? { ...inputFocusStyle, minHeight: 50 }
                        : { ...inputStyle, minHeight: 50 }
                    }
                    onFocus={() => setInputFocus("company_description")}
                    onBlur={() => setInputFocus(null)}
                  />
                </label>
                {companyError && (
                  <div style={{ color: "red", fontSize: 13 }}>
                    {companyError}
                  </div>
                )}
                <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
                  <button
                    type="button"
                    onClick={() => setShowCompanyModal(false)}
                    style={modalBtnStyle}
                    onMouseEnter={() => setModalBtnHover("cancel")}
                    onMouseLeave={() => setModalBtnHover(null)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={companyCreating}
                    style={
                      modalBtnHover === "create"
                        ? modalBtnHoverStyle
                        : modalBtnStyle
                    }
                    onMouseEnter={() => setModalBtnHover("create")}
                    onMouseLeave={() => setModalBtnHover(null)}
                  >
                    {companyCreating ? "Adding..." : "Add Company"}
                  </button>
                </div>
              </form>
            )}
            {showApplyModal && (
              <form onSubmit={handleApply}>
                <h3
                  style={{
                    fontWeight: 700,
                    fontSize: 20,
                    marginBottom: 8,
                    color: "#222",
                  }}
                >
                  Apply for Job
                </h3>
                <label style={labelStyle}>
                  Name:
                  <input
                    name="name"
                    value={applyForm.name}
                    onChange={handleApplyFormChange}
                    required
                    style={
                      inputFocus === "apply_name" ? inputFocusStyle : inputStyle
                    }
                    onFocus={() => setInputFocus("apply_name")}
                    onBlur={() => setInputFocus(null)}
                  />
                </label>
                <label style={labelStyle}>
                  Email:
                  <input
                    name="email"
                    type="email"
                    value={applyForm.email}
                    onChange={handleApplyFormChange}
                    required
                    style={
                      inputFocus === "apply_email"
                        ? inputFocusStyle
                        : inputStyle
                    }
                    onFocus={() => setInputFocus("apply_email")}
                    onBlur={() => setInputFocus(null)}
                  />
                </label>
                <label style={labelStyle}>
                  Resume Link:
                  <input
                    name="resume_link"
                    value={applyForm.resume_link}
                    onChange={handleApplyFormChange}
                    required
                    style={
                      inputFocus === "apply_resume"
                        ? inputFocusStyle
                        : inputStyle
                    }
                    onFocus={() => setInputFocus("apply_resume")}
                    onBlur={() => setInputFocus(null)}
                  />
                </label>
                {applyError && (
                  <div style={{ color: "red", fontSize: 13 }}>{applyError}</div>
                )}
                {applySuccess && (
                  <div style={{ color: "green", fontSize: 13 }}>
                    {applySuccess}
                  </div>
                )}
                <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
                  <button
                    type="button"
                    onClick={() => setShowApplyModal(false)}
                    style={modalBtnStyle}
                    onMouseEnter={() => setModalBtnHover("cancel")}
                    onMouseLeave={() => setModalBtnHover(null)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={applyLoading}
                    style={
                      modalBtnHover === "create"
                        ? modalBtnHoverStyle
                        : modalBtnStyle
                    }
                    onMouseEnter={() => setModalBtnHover("create")}
                    onMouseLeave={() => setModalBtnHover(null)}
                  >
                    {applyLoading ? "Applying..." : "Apply"}
                  </button>
                </div>
              </form>
            )}
            {showApplicantsModal && (
              <div>
                <h3
                  style={{
                    fontWeight: 700,
                    fontSize: 22,
                    marginBottom: 16,
                    color: "#0a1a2f",
                    textAlign: "center",
                  }}
                >
                  📋 Applicants for {applicantsJobTitle}
                </h3>
                {applicantsLoading && (
                  <div
                    style={{
                      textAlign: "center",
                      padding: "20px",
                      color: "#6b7280",
                      fontSize: 15,
                    }}
                  >
                    <div style={{ fontSize: 24, marginBottom: 8 }}>⏳</div>
                    Loading applicants...
                  </div>
                )}
                {applicantsError && (
                  <div
                    style={{
                      color: "#dc2626",
                      fontSize: 14,
                      background: "#fef2f2",
                      border: "1px solid #fecaca",
                      borderRadius: 8,
                      padding: "12px 16px",
                      marginBottom: 16,
                    }}
                  >
                    ❌ {applicantsError}
                  </div>
                )}
                {!applicantsLoading &&
                  !applicantsError &&
                  applicants.length === 0 && (
                    <div
                      style={{
                        textAlign: "center",
                        padding: "30px 20px",
                        color: "#6b7280",
                        fontSize: 15,
                        background: "#f9fafb",
                        borderRadius: 8,
                        border: "1px dashed #d1d5db",
                      }}
                    >
                      <div style={{ fontSize: 32, marginBottom: 12 }}>📭</div>
                      No applicants found for this position yet.
                    </div>
                  )}
                {!applicantsLoading &&
                  !applicantsError &&
                  applicants.length > 0 && (
                    <div style={{ maxHeight: "400px", overflowY: "auto" }}>
                      <div
                        style={{
                          background: "#f8fafc",
                          padding: "12px 16px",
                          borderRadius: "8px 8px 0 0",
                          border: "1px solid #e2e8f0",
                          borderBottom: "none",
                          fontWeight: 600,
                          color: "#0a1a2f",
                          fontSize: 14,
                        }}
                      >
                        📊 {applicants.length} applicant
                        {applicants.length !== 1 ? "s" : ""} found
                      </div>
                      <div
                        style={{
                          border: "1px solid #e2e8f0",
                          borderRadius: "0 0 8px 8px",
                          overflow: "hidden",
                        }}
                      >
                        {applicants.map((a: any, index: number) => (
                          <div
                            key={a.id}
                            style={{
                              padding: "16px 20px",
                              borderBottom:
                                index < applicants.length - 1
                                  ? "1px solid #f1f5f9"
                                  : "none",
                              background: index % 2 === 0 ? "#fff" : "#fafbfc",
                              transition: "background 0.2s",
                            }}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.background = "#f0f9ff")
                            }
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.background =
                                index % 2 === 0 ? "#fff" : "#fafbfc")
                            }
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                                marginBottom: 8,
                              }}
                            >
                              <div
                                style={{
                                  width: 32,
                                  height: 32,
                                  borderRadius: "50%",
                                  background: "#0a1a2f",
                                  color: "#fff",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  fontSize: 14,
                                  fontWeight: 600,
                                }}
                              >
                                {a.name.charAt(0).toUpperCase()}
                              </div>
                              <div style={{ flex: 1 }}>
                                <div
                                  style={{
                                    fontWeight: 600,
                                    fontSize: 15,
                                    color: "#0a1a2f",
                                    marginBottom: 2,
                                  }}
                                >
                                  {a.name}
                                </div>
                                <div
                                  style={{
                                    color: "#6b7280",
                                    fontSize: 13,
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 6,
                                  }}
                                >
                                  <span>📧</span>
                                  {a.email}
                                </div>
                              </div>
                              <div
                                style={{
                                  fontSize: 11,
                                  color: "#6b7280",
                                  background: "#f3f4f6",
                                  padding: "4px 8px",
                                  borderRadius: 4,
                                  fontWeight: 500,
                                }}
                              >
                                #{index + 1}
                              </div>
                            </div>
                            <div
                              style={{
                                fontSize: 13,
                                marginBottom: 8,
                                display: "flex",
                                alignItems: "center",
                                color: "#666",
                                gap: 6,
                              }}
                            >
                              <span>📄</span>
                              Resume:{" "}
                              <a
                                href={a.resume_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  color: "#2563eb",
                                  textDecoration: "none",
                                  fontWeight: 500,
                                }}
                                onMouseEnter={(e) =>
                                  (e.currentTarget.style.textDecoration =
                                    "underline")
                                }
                                onMouseLeave={(e) =>
                                  (e.currentTarget.style.textDecoration =
                                    "none")
                                }
                              >
                                View Resume
                              </a>
                            </div>
                            <div
                              style={{
                                fontSize: 12,
                                color: "#6b7280",
                                display: "flex",
                                alignItems: "center",
                                gap: 6,
                              }}
                            >
                              <span>🕒</span>
                              Applied: {new Date(a.applied_at).toLocaleString()}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
                  <button
                    type="button"
                    onClick={() => setShowApplicantsModal(false)}
                    style={{
                      ...modalBtnStyle,
                      background: "#6b7280",
                      flex: 1,
                    }}
                    onMouseEnter={() => setModalBtnHover("cancel")}
                    onMouseLeave={() => setModalBtnHover(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
