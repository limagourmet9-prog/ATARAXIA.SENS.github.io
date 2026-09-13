import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAdminSession, signOutAdmin } from "../../lib/adminAuth";
import { listFeedback } from "../../lib/feedback";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function load() {
      const { session: currentSession, error: sessionError } = await getAdminSession();
      if (!mounted) return;
      if (sessionError || !currentSession) {
        navigate("/admin/login", { replace: true });
        return;
      }

      setSession(currentSession);
      try {
        const records = await listFeedback();
        if (mounted) setFeedback(records);
      } catch (loadError) {
        if (mounted) setError("No fue posible cargar la retroalimentación privada.");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => { mounted = false; };
  }, [navigate]);

  async function handleSignOut() {
    await signOutAdmin();
    navigate("/admin/login", { replace: true });
  }

  if (loading) return <main><p>Cargando área administrativa…</p></main>;

  return (
    <main>
      <section aria-labelledby="admin-dashboard-title">
        <h1 id="admin-dashboard-title">Panel administrativo</h1>
        <p>Sesión activa: {session?.user?.email}</p>
        <button type="button" onClick={handleSignOut}>Cerrar sesión</button>

        <h2>Retroalimentación privada</h2>
        {error && <p role="alert">{error}</p>}
        {!error && feedback.length === 0 && <p>No hay mensajes todavía.</p>}
        <ul>
          {feedback.map((item) => (
            <li key={item.id}>
              <strong>{item.name || "Sin nombre"}</strong>
              {item.email && <span> — {item.email}</span>}
              <p>{item.message}</p>
              <small>{new Date(item.created_at).toLocaleString("es-MX")}</small>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
