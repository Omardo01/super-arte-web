'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Curso } from '@/lib/supabase'

export function useCursosAdmin() {
  const [cursos, setCursos] = useState<Curso[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  const fetchCursos = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Verificar variables de entorno
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        throw new Error('Variables de entorno de Supabase no configuradas. Verifica NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY en tu archivo .env.local')
      }

      console.log('Admin: Intentando conectar a Supabase...')
      // Para admin: obtener TODOS los cursos (activos e inactivos)
      const { data, error } = await supabase
        .from('cursos')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Admin: Error de Supabase:', error)
        throw new Error(`Error de base de datos: ${error.message}`)
      }

      console.log('Admin: Cursos obtenidos:', data?.length || 0)
      setCursos(data || [])
    } catch (err) {
      console.error('Admin: Error en fetchCursos:', err)
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Error desconocido al cargar cursos')
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCursos()
  }, [])

  // Función para recargar cursos (útil después de crear/editar/eliminar)
  const refetchCursos = () => {
    fetchCursos()
  }

  return {
    cursos,
    loading,
    error,
    refetchCursos
  }
}
