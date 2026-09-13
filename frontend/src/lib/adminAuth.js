import { supabase } from "./supabase";

const isAdminUser = (user) => user?.app_metadata?.role === "admin";

/**
 * Admin access helpers.
 * Passwords are handled only by Supabase Auth and are never stored in code.
 */
export async function signInAdmin(email, password) {
  const result = await supabase.auth.signInWithPassword({ email, password });
  if (result.error) return result;

  if (!isAdminUser(result.data.user)) {
    await supabase.auth.signOut();
    return { data: { user: null, session: null }, error: new Error("ADMIN_ACCESS_REQUIRED") };
  }

  return result;
}

export async function signOutAdmin() {
  return supabase.auth.signOut();
}

export async function getAdminSession() {
  const { data, error } = await supabase.auth.getSession();
  const session = data?.session ?? null;
  if (session && !isAdminUser(session.user)) {
    await supabase.auth.signOut();
    return { session: null, error: new Error("ADMIN_ACCESS_REQUIRED") };
  }
  return { session, error };
}

export function onAuthStateChange(callback) {
  return supabase.auth.onAuthStateChange(callback);
}
