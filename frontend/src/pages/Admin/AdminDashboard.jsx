import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAdminSession, signOutAdmin } from "../../lib/adminAuth";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getAdminSession().then(({ session: currentSession }) => {
      if (!mounted) return;
      if (!currentSession) {
        navigate("/admin/login", { replace: true });
        return;
      }
      setSession(currentSession);
      setLoading(false);
    });
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
        <p>El panel está preparado para integrar la retroalimentación privada.</p>
        <button type="button" onClick={handleSignOut}>Cerrar sesión</button>
      </section>
    </main>
  );
}
