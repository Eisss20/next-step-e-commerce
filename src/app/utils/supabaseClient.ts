import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

// สร้าง Supabase Client
export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);
