import { createClient } from "@supabase/supabase-js";

const url = "https://qgdqihoowrckmomhnudx.supabase.co";
const anon =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFnZHFpaG9vd3Jja21vbWhudWR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODA5NzIxMzEsImV4cCI6MTk5NjU0ODEzMX0.1v_kCYSeQEXpcvzDP18MmBykdHDVUDVW14VwyczchB0";

// Create a single supabase client for interacting with your database
export const supabase = createClient(url, anon);
