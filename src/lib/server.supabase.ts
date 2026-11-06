import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl) {
  throw new Error("Missing url");
}

if (!supabaseKey) {
  throw new Error("Missing key");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
