import { getSupabase } from "./supabase";

const cleanText = (value, maxLength) => String(value ?? "").trim().slice(0, maxLength);

export async function submitFeedback({ name, email, phone, message }) {
  const cleanMessage = cleanText(message, 5000);
  if (!cleanMessage) throw new Error("MESSAGE_REQUIRED");

  const { error } = await getSupabase().from("feedback").insert({
    name: cleanText(name, 120),
    email: cleanText(email, 254),
    message: `${cleanMessage}\n\nTeléfono: ${cleanText(phone, 30)}`.trim(),
  });

  if (error) throw error;
}

export async function listFeedback() {
  const { data, error } = await getSupabase()
    .from("feedback")
    .select("id,name,email,message,status,created_at")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}
