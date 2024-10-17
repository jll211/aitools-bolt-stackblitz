import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://raonwbxohlyqzqrcfrls.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhb253YnhvaGx5cXpxcmNmcmxzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkxMjAyNzgsImV4cCI6MjA0NDY5NjI3OH0.ewu_KLNBvLE5pcxXGLUnfUPKPwXN0U_CyCwcdOKE9Nw';

export const supabase = createClient(supabaseUrl, supabaseKey);

export async function fetchTools() {
  const { data, error } = await supabase.from('aitools').select('*');
  if (error) {
    throw error;
  }
  return data;
}