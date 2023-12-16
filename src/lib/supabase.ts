import { createClient } from '@supabase/supabase-js'

// console.log(import.meta.env)
export const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY);

// console.log(supabase)