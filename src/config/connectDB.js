import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY
// const supabaseUrl = 'https://asplynrorebnsajukbnu.supabase.co'
// const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFzcGx5bnJvcmVibnNhanVrYm51Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg3MTM1NDMsImV4cCI6MjAzNDI4OTU0M30.MFbYnzw5WFsIZ6oKdSkD9ySF5R6j9rrCWJ_Mst5pfy4'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;