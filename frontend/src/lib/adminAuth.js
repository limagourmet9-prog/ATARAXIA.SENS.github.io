import { supabase } from "./supabase";

/**
 * Auth helpers for the single administrator account.
 * Passwords are handled only by Supabase Auth and are never stored in code.
 */
export async function signInAdmin(email, password) {
  return supabase.auth.signInWithPassword({ email, password });
}

export async function signOutAdmin() {
  return supabase.auth.signOut();
}

export async function getAdminSession() {
  const { data, error } = await supabase.auth.getSession();
  return { session: data?.session ?? null, error };
}

export function onAuthStateChange(callback) {
  return supabase.auth.onAuthStateChange(callback);
}
