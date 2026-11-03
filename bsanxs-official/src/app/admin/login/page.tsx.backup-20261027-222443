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
        background: "#09090d",
        color: "#f7f7fb",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          maxWidth: 420,
          padding: 32,
          border: "1px solid #292932",
          borderRadius: 18,
          background: "#111116",
        }}
      >
        <p style={{ color: "#a78bfa", letterSpacing: 3, fontSize: 12 }}>
          BSANXS
        </p>
        <h1 style={{ fontSize: 30, marginBottom: 8 }}>Admin sign in</h1>
        <p style={{ color: "#a1a1aa", lineHeight: 1.6 }}>
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
            borderRadius: 9,
            background: "#a78bfa",
            color: "#09090d",
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
  border: "1px solid #393944",
  borderRadius: 8,
  background: "#09090d",
  color: "#ffffff",
};
