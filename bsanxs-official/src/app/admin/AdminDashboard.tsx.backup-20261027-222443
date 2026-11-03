"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export type Enquiry = {
  id: string;
  name: string;
  email: string;
  company: string | null;
  service: string | null;
  budget: string | null;
  message: string;
  status: "new" | "in_progress" | "closed";
  created_at: string;
};

type Props = {
  initialEnquiries: Enquiry[];
  loadError: string | null;
};

const statusLabels = {
  new: "New",
  in_progress: "In progress",
  closed: "Closed",
};

export default function AdminDashboard({
  initialEnquiries,
  loadError,
}: Props) {
  const router = useRouter();
  const [enquiries, setEnquiries] = useState(initialEnquiries);
  const [filter, setFilter] = useState("all");
  const [busy, setBusy] = useState("");
  const [notice, setNotice] = useState(loadError ? "Unable to load enquiries. Check database permissions." : "");

  const visible = enquiries.filter(
    (item) => filter === "all" || item.status === filter
  );

  async function updateStatus(id: string, status: Enquiry["status"]) {
    setBusy(id);
    setNotice("");

    try {
      const response = await fetch("/api/admin/enquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      const result = await response.json();

      if (!response.ok) {
        setNotice(result.error || "Could not update enquiry.");
        return;
      }

      setEnquiries((current) =>
        current.map((item) => item.id === id ? { ...item, status } : item)
      );
      setNotice("Enquiry status updated.");
    } catch {
      setNotice("Network error. Please try again.");
    } finally {
      setBusy("");
    }
  }

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace("/admin/login");
    router.refresh();
  }

  const card: React.CSSProperties = {
    border: "1px solid #2b2b36",
    borderRadius: 14,
    padding: 20,
    background: "#121219",
  };

  return (
    <main style={{
      minHeight: "100vh",
      padding: "32px clamp(16px, 4vw, 56px)",
      background: "#09090d",
      color: "#f5f5f7",
      fontFamily: "Arial, sans-serif",
    }}>
      <header style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 16,
        marginBottom: 36,
      }}>
        <div>
          <p style={{ color: "#a78bfa", letterSpacing: 3, fontSize: 12 }}>BSANXS / CONTROL</p>
          <h1 style={{ fontSize: "clamp(28px, 4vw, 42px)", margin: "8px 0" }}>Enquiries</h1>
          <p style={{ color: "#a1a1aa" }}>Private project enquiry dashboard</p>
        </div>
        <button onClick={signOut} style={buttonStyle}>Sign out</button>
      </header>

      <section style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
        gap: 14,
        marginBottom: 28,
      }}>
        {[
          ["Total", enquiries.length],
          ["New", enquiries.filter((e) => e.status === "new").length],
          ["In progress", enquiries.filter((e) => e.status === "in_progress").length],
          ["Closed", enquiries.filter((e) => e.status === "closed").length],
        ].map(([label, count]) => (
          <div key={label} style={card}>
            <p style={{ color: "#a1a1aa", marginTop: 0 }}>{label}</p>
            <strong style={{ fontSize: 32 }}>{count}</strong>
          </div>
        ))}
      </section>

      <div style={{
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 12,
        marginBottom: 20,
      }}>
        <label htmlFor="filter">Filter:</label>
        <select id="filter" value={filter} onChange={(e) => setFilter(e.target.value)}
          style={{ ...buttonStyle, background: "#121219" }}>
          <option value="all">All enquiries</option>
          <option value="new">New</option>
          <option value="in_progress">In progress</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      {notice && <p role="status" style={{ color: "#c4b5fd", marginBottom: 20 }}>{notice}</p>}

      {visible.length === 0 ? (
        <div style={card}>
          <h2>No enquiries to display</h2>
          <p style={{ color: "#a1a1aa" }}>
            New submissions will appear here when clients use your website form.
          </p>
        </div>
      ) : (
        <section style={{ display: "grid", gap: 16 }}>
          {visible.map((item) => (
            <article key={item.id} style={card}>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 12,
              }}>
                <div>
                  <h2 style={{ margin: "0 0 8px", fontSize: 21 }}>{item.name}</h2>
                  <a href={`mailto:${encodeURIComponent(item.email)}`}
                    style={{ color: "#c4b5fd" }}>{item.email}</a>
                  <p style={{ color: "#a1a1aa", fontSize: 13 }}>
                    {new Date(item.created_at).toLocaleString()}
                  </p>
                </div>
                <label style={{ display: "grid", gap: 6, alignContent: "start" }}>
                  <span style={{ fontSize: 12, color: "#a1a1aa" }}>Status</span>
                  <select
                    value={item.status}
                    disabled={busy === item.id}
                    onChange={(e) => updateStatus(item.id, e.target.value as Enquiry["status"])}
                    style={{ ...buttonStyle, background: "#09090d" }}
                  >
                    {Object.entries(statusLabels).map(([value, label]) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </select>
                </label>
              </div>

              {(item.company || item.service || item.budget) && (
                <p style={{ color: "#d4d4d8", lineHeight: 1.7 }}>
                  {item.company && <>Company: {item.company} · </>}
                  {item.service && <>Service: {item.service} · </>}
                  {item.budget && <>Budget: {item.budget}</>}
                </p>
              )}

              <p style={{ whiteSpace: "pre-wrap", lineHeight: 1.7, color: "#e4e4e7" }}>
                {item.message}
              </p>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}

const buttonStyle: React.CSSProperties = {
  padding: "10px 14px",
  border: "1px solid #393944",
  borderRadius: 8,
  color: "#f5f5f7",
  cursor: "pointer",
};
