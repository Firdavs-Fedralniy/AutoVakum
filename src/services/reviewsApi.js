import { supabase } from "../lib/supabase";

export async function getReviews() {
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Ошибка получения отзывов:", error);
    return [];
  }

  return data || [];
}

export async function createReview(name, text) {
  const { data, error } = await supabase
    .from("reviews")
    .insert({
      name,
      text,
    })
    .select()
    .single();

  if (error) {
    console.error("Ошибка добавления отзыва:", error);
    return null;
  }

  return data;
}