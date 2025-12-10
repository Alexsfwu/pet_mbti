import { createClient } from '@supabase/supabase-js'
import { mockSupabase } from '../utils/supabaseMock'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// 如果没有配置Supabase凭据，使用模拟数据
const useMock = !supabaseUrl || !supabaseAnonKey || supabaseUrl === 'https://placeholder.supabase.co'

if (useMock) {
  console.warn('Supabase credentials not configured, using mock data for development')
}

export const supabase = useMock ? mockSupabase as any : createClient(supabaseUrl || '', supabaseAnonKey || '')