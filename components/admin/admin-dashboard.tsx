'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { 
  BookOpen, 
  Users, 
  Settings, 
  Plus, 
  BarChart3,
  LogOut,
  Home,
  Palette
} from 'lucide-react'
import Image from 'next/image'
import { CoursesManager } from './courses-manager'
import { useAuth } from '@/hooks/useAuth'
import { useCursosAdmin } from '@/hooks/useCursosAdmin'
import { useRouter } from 'next/navigation'

export function AdminDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('cursos')
  
  // Usar hooks - auth normal y cursos específicos para admin
  const { user, userProfile, signOut, isAdmin, loading: authLoading } = useAuth()
  const { cursos, loading, error } = useCursosAdmin()
  
  // Verificación adicional del lado del cliente
  useEffect(() => {
    if (!authLoading && !isAdmin) {
      router.push('/?access=denied')
    }
  }, [authLoading, isAdmin, router])
  
  // Datos por defecto para evitar errores
  const displayName = userProfile?.nombre || user?.email || 'Usuario Admin'
  const safeCursos = cursos || []
  
  // Mostrar loading mientras verifica permisos
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center">
        <Card className="w-96 shadow-2xl border border-purple-100">
          <CardContent className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-200 border-t-purple-600 mx-auto mb-4"></div>
            <p className="text-purple-800 font-medium">Verificando permisos...</p>
            <p className="text-purple-600 text-sm mt-2">Por favor espera un momento</p>
          </CardContent>
        </Card>
      </div>
    )
  }
  
  // Si no es admin, no mostrar nada (el useEffect ya redirige)
  if (!isAdmin) {
    return null
  }

  const handleSignOut = async () => {
    try {
      if (signOut) await signOut()
      router.push('/')
    } catch (error) {
      console.log('Error signing out:', error)
      router.push('/')
    }
  }

  const goHome = () => {
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Header del Admin */}
      <header className="border-b bg-white shadow-lg rounded-b-2xl border-purple-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Image
                  src="/logo-super-arte.png"
                  alt="Super Arte"
                  width={50}
                  height={50}
                  className="rounded-full shadow-md"
                />
                <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-1">
                  <Palette className="h-3 w-3 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-mono">
                  Super Arte Admin
                </h1>
                <Badge variant="secondary" className="bg-purple-100 text-purple-700 border-purple-200">
                  Panel de Administración
                </Badge>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                Bienvenido, {displayName}
              </span>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={goHome}
                className="border-purple-200 text-purple-700 hover:bg-purple-50"
              >
                <Home className="h-4 w-4 mr-2" />
                Ir al Sitio
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleSignOut}
                className="border-pink-200 text-pink-700 hover:bg-pink-50"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Estadísticas rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-800">Total Cursos</CardTitle>
              <div className="bg-blue-500 p-2 rounded-full">
                <BookOpen className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900">{safeCursos.length}</div>
              <p className="text-xs text-blue-600">
                Cursos activos en el sistema
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-800">Participantes</CardTitle>
              <div className="bg-green-500 p-2 rounded-full">
                <Users className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-900">
                {safeCursos.reduce((total, curso) => total + (curso.participantes_actuales || 0), 0)}
              </div>
              <p className="text-xs text-green-600">
                Total de estudiantes inscritos
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-800">Ingresos</CardTitle>
              <div className="bg-purple-500 p-2 rounded-full">
                <BarChart3 className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-900">
                ${safeCursos.reduce((total, curso) => 
                  total + (curso.precio * (curso.participantes_actuales || 0)), 0
                ).toLocaleString()}
              </div>
              <p className="text-xs text-purple-600">
                Ingresos generados por cursos
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs de navegación */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white shadow-lg border border-purple-100 rounded-xl p-2">
            <TabsTrigger 
              value="cursos" 
              className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white rounded-lg"
            >
              <BookOpen className="h-4 w-4" />
              <span>Gestión de Cursos</span>
            </TabsTrigger>
            <TabsTrigger 
              value="usuarios" 
              className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white rounded-lg"
            >
              <Users className="h-4 w-4" />
              <span>Usuarios</span>
            </TabsTrigger>
            <TabsTrigger 
              value="configuracion" 
              className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white rounded-lg"
            >
              <Settings className="h-4 w-4" />
              <span>Configuración</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cursos" className="space-y-6">
            {loading ? (
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 shadow-lg">
                <CardContent className="p-8 text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600 mx-auto mb-4"></div>
                  <p className="text-blue-800 font-medium">Cargando cursos...</p>
                  <p className="text-blue-600 text-sm mt-2">Por favor espera un momento</p>
                </CardContent>
              </Card>
            ) : error ? (
              <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200 shadow-lg">
                <CardContent className="p-8 text-center">
                  <div className="bg-red-500 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white text-2xl">⚠️</span>
                  </div>
                  <p className="text-red-800 font-semibold">Error al cargar cursos</p>
                  <p className="text-red-700 mt-2">{error}</p>
                  <p className="text-sm text-red-600 mt-2">
                    Verifica la conexión a la base de datos
                  </p>
                </CardContent>
              </Card>
            ) : (
              <CoursesManager />
            )}
          </TabsContent>

          <TabsContent value="usuarios" className="space-y-6">
            <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-blue-800 flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Gestión de Usuarios
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <div className="bg-blue-500 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-10 w-10 text-white" />
                  </div>
                  <p className="text-blue-800 font-medium text-lg mb-2">
                    Próximamente
                  </p>
                  <p className="text-blue-600">
                    Funcionalidad de gestión de usuarios en desarrollo...
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="configuracion" className="space-y-6">
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-green-800 flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Configuración del Sistema
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <div className="bg-green-500 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                    <Settings className="h-10 w-10 text-white" />
                  </div>
                  <p className="text-green-800 font-medium text-lg mb-2">
                    Próximamente
                  </p>
                  <p className="text-green-600">
                    Configuraciones del sistema en desarrollo...
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
