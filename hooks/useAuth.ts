'use client'

import { useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client'
import { Usuario } from '@/lib/supabase'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [userProfile, setUserProfile] = useState<Usuario | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    // Solo ejecutar en el cliente
    if (typeof window === 'undefined') {
      setLoading(false)
      return
    }

    // Obtener usuario inicial
    const getUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        setUser(user)
        
        if (user) {
          // Obtener perfil del usuario
          const { data: profile } = await supabase
            .from('usuarios')
            .select('*')
            .eq('id', user.id)
            .single()
          
          setUserProfile(profile)
        }
      } catch (error) {
        console.error('Error al obtener usuario:', error)
      } finally {
        setLoading(false)
      }
    }

    getUser()

    // Escuchar cambios de autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        
        if (session?.user) {
          try {
            // Obtener perfil actualizado
            const { data: profile } = await supabase
              .from('usuarios')
              .select('*')
              .eq('id', session.user.id)
              .single()
            
            setUserProfile(profile)
          } catch (error) {
            console.error('Error al obtener perfil:', error)
          }
        } else {
          setUserProfile(null)
        }
        
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [supabase])

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { data, error }
  }

  const signUp = async (email: string, password: string, nombre: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: nombre,
        },
      },
    })
    return { data, error }
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  }


  const isAdmin = userProfile?.rol === 'admin'

  return {
    user,
    userProfile,
    loading,
    signIn,
    signUp,
    signOut,
    isAdmin,
  }
}
