"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const supabase = createClient();
      const { error: signInError } =
        await supabase.auth.signInWithPassword({ email, password });

      if (signInError) {
        setError("Sign-in failed. Check your email and password.");
        return;
      }

      const { data } = await supabase.auth.getClaims();
      const claims = data?.claims as
        | { app_metadata?: { role?: string } }
        | undefined;

      if (claims?.app_metadata?.role !== "admin") {
        await supabase.auth.signOut();
        setError("This account is not authorized to access the admin dashboard.");
        return;
      }

      router.replace("/admin");
      router.refresh();
    } catch {
      setError("Unable to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: 24,
        background: "#f5f3fa",
        color: "#171321",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          maxWidth: 420,
          padding: 36,
          border: "1px solid #e8e3f0",
          borderRadius: 22,
          background: "#ffffff",
        }}
      >
        <img
          src="/images/bsanxs-logo.png"
          alt="BSANXS"
          style={{ display: "block", width: 190, maxWidth: "100%", height: "auto", objectFit: "contain", marginBottom: 28 }}
        />
        <p style={{ color: "#6d28d9", letterSpacing: 3, fontSize: 11, fontWeight: 700 }}>
          PRIVATE ADMINISTRATION
        </p>
        <h1 style={{ fontSize: 30, marginBottom: 8 }}>Admin sign in</h1>
        <p style={{ color: "#777386", lineHeight: 1.6 }}>
          Authorized personnel only.
        </p>

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          autoComplete="username"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          style={fieldStyle}
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          style={fieldStyle}
        />

        {error && (
          <p role="alert" style={{ color: "#fca5a5", lineHeight: 1.5 }}>
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            marginTop: 20,
            padding: 14,
            border: 0,
            borderRadius: 11,
            background: "#6d28d9",
            color: "#ffffff",
            fontWeight: 700,
            cursor: loading ? "wait" : "pointer",
          }}
        >
          {loading ? "Signing in..." : "Sign in securely"}
        </button>
      </form>
    </main>
  );
}

const fieldStyle = {
  display: "block",
  boxSizing: "border-box" as const,
  width: "100%",
  padding: 12,
  margin: "8px 0 20px",
  border: "1px solid #ddd7e8",
  borderRadius: 8,
  background: "#f5f3fa",
  color: "#ffffff",
};
