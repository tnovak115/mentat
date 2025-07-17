import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://taxspafvrbnlbxjxnitp.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRheHNwYWZ2cmJubGJ4anhuaXRwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI3MjIyNDcsImV4cCI6MjA2ODI5ODI0N30.RrB_uO8fGaIg7NrIpPTZgvA_HWE-BlmmccZhEC84KhQ'
export const supabase = createClient(supabaseUrl, supabaseKey)