'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Curso } from '@/lib/supabase'

export function useCursos() {
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

      console.log('Intentando conectar a Supabase...')
      const { data, error } = await supabase
        .from('cursos')
        .select('*')
        .eq('activo', true)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error de Supabase:', error)
        throw new Error(`Error de base de datos: ${error.message}`)
      }

      console.log('Cursos obtenidos:', data?.length || 0)
      setCursos(data || [])
    } catch (err) {
      console.error('Error en fetchCursos:', err)
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Error desconocido al conectar con la base de datos')
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCursos()
  }, [])

  const addCurso = async (curso: Omit<Curso, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('cursos')
        .insert([curso])
        .select()
        .single()

      if (error) throw error

      setCursos(prev => [data, ...prev])
      return { data, error: null }
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Error al agregar curso'
      return { data: null, error }
    }
  }

  const updateCurso = async (id: string, updates: Partial<Curso>) => {
    try {
      const { data, error } = await supabase
        .from('cursos')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      setCursos(prev => prev.map(curso => curso.id === id ? data : curso))
      return { data, error: null }
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Error al actualizar curso'
      return { data: null, error }
    }
  }

  const deleteCurso = async (id: string) => {
    try {
      const { error } = await supabase
        .from('cursos')
        .delete()
        .eq('id', id)

      if (error) throw error

      setCursos(prev => prev.filter(curso => curso.id !== id))
      return { error: null }
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Error al eliminar curso'
      return { error }
    }
  }

  return {
    cursos,
    loading,
    error,
    fetchCursos,
    addCurso,
    updateCurso,
    deleteCurso,
  }
}
