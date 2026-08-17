import { supabase } from "../lib/supabase";

export async function getBeforeAfter() {
  const { data, error } = await supabase
    .from("before-after")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Ошибка получения before/after:", error);
    return [];
  }

  return data;
}