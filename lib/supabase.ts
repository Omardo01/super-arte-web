import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos para las tablas
export interface Usuario {
  id: string
  email: string
  nombre: string
  rol: 'admin' | 'usuario'
  created_at: string
  updated_at: string
}

export interface Curso {
  id: string
  titulo: string
  descripcion: string
  precio: number
  duracion: string
  nivel: 'principiante' | 'intermedio' | 'avanzado'
  instructor: string
  imagen_url?: string
  activo: boolean
  fecha_inicio: string
  fecha_fin: string
  max_participantes: number
  participantes_actuales: number
  categoria: string
  created_at: string
  updated_at: string
}
