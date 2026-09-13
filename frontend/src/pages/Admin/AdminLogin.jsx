import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAdminSession, signInAdmin } from "../../lib/adminAuth";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    getAdminSession().then(({ session }) => {
      if (mounted && session) navigate("/admin", { replace: true });
      if (mounted) setLoading(false);
    });
    return () => { mounted = false; };
  }, [navigate]);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    const { error: authError } = await signInAdmin(email.trim(), password);
    if (authError) {
      setError("No fue posible validar el acceso. Verifica tus credenciales.");
      setSubmitting(false);
      return;
    }

    navigate("/admin", { replace: true });
  }

  if (loading) return <main><p>Comprobando sesión…</p></main>;

  return (
    <main>
      <section aria-labelledby="admin-login-title">
        <h1 id="admin-login-title">Acceso administrativo</h1>
        <p>Área privada de ATARAXIA Vero.</p>
        <form onSubmit={handleSubmit} noValidate>
          <label htmlFor="admin-email">Correo</label>
          <input
            id="admin-email"
            type="email"
            autoComplete="username"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <label htmlFor="admin-password">Contraseña</label>
          <input
            id="admin-password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          {error && <p role="alert">{error}</p>}

          <button type="submit" disabled={submitting}>
            {submitting ? "Validando…" : "Entrar"}
          </button>
        </form>
      </section>
    </main>
  );
}
