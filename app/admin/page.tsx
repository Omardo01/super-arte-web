'use client'

import { AdminDashboard } from '@/components/admin/admin-dashboard'

export default function AdminPage() {
  // TEMPORALMENTE SIMPLIFICADO PARA TESTING
  // Acceso directo sin verificaciones complejas
  
  return (
    <div className="min-h-screen bg-background">
      <AdminDashboard />
    </div>
  )
  
  /* CÓDIGO ORIGINAL COMENTADO PARA DEBUGGING:
  
  import { useEffect, useState } from 'react'
  import { useRouter } from 'next/navigation'
  import { useAuth } from '@/hooks/useAuth'
  import { Card, CardContent } from '@/components/ui/card'
  import { Loader2 } from 'lucide-react'

  const { user, userProfile, loading } = useAuth()
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/auth/login')
      } else {
        setIsAuthorized(true)
      }
    }
  }, [user, userProfile, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="p-8 text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-muted-foreground">Verificando acceso...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-semibold text-destructive mb-4">Acceso Denegado</h2>
            <p className="text-muted-foreground">No tienes permisos para acceder a esta página.</p>
          </CardContent>
        </Card>
      </div>
    )
  }
  
  */
}
