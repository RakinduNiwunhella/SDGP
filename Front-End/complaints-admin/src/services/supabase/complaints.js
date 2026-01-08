import { supabase } from "./client";

export const fetchComplaints = async () => {
  return supabase
    .from("complains")
    .select("*")
    .order("created_at", { ascending: false });
};
