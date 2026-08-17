import { supabase } from "../lib/supabase";

export async function getGallery() {
  const { data, error } = await supabase
    .from("gallery")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Ошибка получения галереи:", error);
    return [];
  }

  return data || [];
}