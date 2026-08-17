import { supabase } from "../lib/supabase";

export async function getServices() {
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Ошибка получения услуг:", error);
    return [];
  }

  return data;
}