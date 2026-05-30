"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import adminStyles from "./styles/admin.module.css";
import formStyles from "./styles/forms.module.css";

type Props = {
  nextPath: string;
};

export function AdminLoginForm({ nextPath }: Props) {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage("Memeriksa token...");

    try {
      const response = await fetch("/api/admin/session", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const result = (await response.json()) as { ok?: boolean; error?: string };

      if (!result.ok) {
        setMessage(result.error ?? "Token admin salah.");
        return;
      }

      router.replace(nextPath.startsWith("/admin") ? nextPath : "/admin");
      router.refresh();
    } catch {
      setMessage("Gagal menghubungi API login admin.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className={adminStyles.adminLoginWrapper}>
      <div className={adminStyles.loginCard}>
        <h1>Dashboard Admin</h1>
        <p>Gunakan token otentikasi internal untuk masuk.</p>
        
        <form className={formStyles.form} onSubmit={submit}>
          <label className={formStyles.fullField} style={{ marginBottom: "16px" }}>
            Token Otentikasi Admin
            <input 
              value={token} 
              onChange={(event) => setToken(event.target.value)} 
              placeholder="Masukkan token admin Anda" 
              type="password" 
              required 
              aria-required="true"
            />
          </label>
          
          {message && (
            <p className={formStyles.formNotice} role="alert" aria-live="polite" style={{ marginBottom: "16px" }}>
              {message}
            </p>
          )}
          
          <button 
            className={formStyles.primary} 
            type="submit" 
            disabled={isSubmitting}
            style={{ width: "100%" }}
          >
            {isSubmitting ? "Memverifikasi..." : "Masuk ke Dashboard"}
          </button>
        </form>
      </div>
    </div>
  );
}
