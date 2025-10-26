// src/lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_KEY;
const supabaseSecretKey = import.meta.env.SUPABASE_SECRET_KEY;

// export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export const supabase = createClient(supabaseUrl, supabaseSecretKey);
