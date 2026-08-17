import { supabase } from "../lib/supabase";

export async function getHeroSlides() {
  const { data, error } = await supabase
    .from("hero_slides")
    .select("*")
    .order("position", { ascending: true });

  if (error) {
    console.error("Ошибка получения Hero slides:", error);
    return [];
  }

  return data;
}