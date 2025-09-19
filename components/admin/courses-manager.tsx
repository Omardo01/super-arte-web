'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Users, 
  Calendar, 
  DollarSign, 
  Clock,
  Save,
  X,
  BookOpen
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { Curso } from '@/lib/supabase'
import { useToast } from '@/hooks/use-toast'
import { useCursosAdmin } from '@/hooks/useCursosAdmin'

interface CourseFormData {
  titulo: string
  descripcion: string
  precio: number
  duracion: string
  nivel: 'principiante' | 'intermedio' | 'avanzado'
  instructor: string
  imagen_url: string
  activo: boolean
  fecha_inicio: string
  fecha_fin: string
  max_participantes: number
  categoria: string
}

const initialFormData: CourseFormData = {
  titulo: '',
  descripcion: '',
  precio: 0,
  duracion: '',
  nivel: 'principiante',
  instructor: '',
  imagen_url: '',
  activo: true,
  fecha_inicio: '',
  fecha_fin: '',
  max_participantes: 20,
  categoria: ''
}

export function CoursesManager() {
  const { cursos, loading, error, refetchCursos } = useCursosAdmin()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingCourse, setEditingCourse] = useState<Curso | null>(null)
  const [formData, setFormData] = useState<CourseFormData>(initialFormData)
  const [saving, setSaving] = useState(false)
  const supabase = createClient()
  const { toast } = useToast()

  // Función para recargar después de cambios
  const fetchCursos = refetchCursos

  const handleOpenDialog = (curso?: Curso) => {
    if (curso) {
      setEditingCourse(curso)
      setFormData({
        titulo: curso.titulo,
        descripcion: curso.descripcion,
        precio: curso.precio,
        duracion: curso.duracion,
        nivel: curso.nivel,
        instructor: curso.instructor,
        imagen_url: curso.imagen_url || '',
        activo: curso.activo,
        fecha_inicio: curso.fecha_inicio,
        fecha_fin: curso.fecha_fin,
        max_participantes: curso.max_participantes,
        categoria: curso.categoria
      })
    } else {
      setEditingCourse(null)
      setFormData(initialFormData)
    }
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setEditingCourse(null)
    setFormData(initialFormData)
  }

  const handleInputChange = (field: keyof CourseFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      if (editingCourse) {
        // Actualizar curso existente
        const { error } = await supabase
          .from('cursos')
          .update({
            ...formData,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingCourse.id)

        if (error) throw error

        toast({
          title: "Éxito",
          description: "Curso actualizado correctamente",
        })
      } else {
        // Crear nuevo curso
        const { error } = await supabase
          .from('cursos')
          .insert([{
            ...formData,
            participantes_actuales: 0
          }])

        if (error) throw error

        toast({
          title: "Éxito",
          description: "Curso creado correctamente",
        })
      }

      handleCloseDialog()
      fetchCursos()
    } catch (error) {
      console.error('Error saving curso:', error)
      toast({
        title: "Error",
        description: "No se pudo guardar el curso",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('cursos')
        .delete()
        .eq('id', id)

      if (error) throw error

      toast({
        title: "Éxito",
        description: "Curso eliminado correctamente",
      })
      fetchCursos()
    } catch (error) {
      console.error('Error deleting curso:', error)
      toast({
        title: "Error",
        description: "No se pudo eliminar el curso",
        variant: "destructive",
      })
    }
  }

  const toggleActive = async (curso: Curso) => {
    try {
      const { error } = await supabase
        .from('cursos')
        .update({ 
          activo: !curso.activo,
          updated_at: new Date().toISOString()
        })
        .eq('id', curso.id)

      if (error) throw error

      toast({
        title: "Éxito",
        description: `Curso ${!curso.activo ? 'activado' : 'desactivado'} correctamente`,
      })
      fetchCursos()
    } catch (error) {
      console.error('Error toggling curso status:', error)
      toast({
        title: "Error",
        description: "No se pudo cambiar el estado del curso",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-muted-foreground">Cargando cursos...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header con botón de agregar */}
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-lg border border-purple-100 mb-6">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Gestión de Cursos
          </h2>
          <p className="text-gray-600">
            Administra todos los cursos de Super Arte
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              onClick={() => handleOpenDialog()}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg"
            >
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Curso
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingCourse ? 'Editar Curso' : 'Nuevo Curso'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="titulo">Título *</Label>
                  <Input
                    id="titulo"
                    value={formData.titulo}
                    onChange={(e) => handleInputChange('titulo', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="categoria">Categoría *</Label>
                  <Input
                    id="categoria"
                    value={formData.categoria}
                    onChange={(e) => handleInputChange('categoria', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="descripcion">Descripción *</Label>
                <Textarea
                  id="descripcion"
                  value={formData.descripcion}
                  onChange={(e) => handleInputChange('descripcion', e.target.value)}
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="precio">Precio ($) *</Label>
                  <Input
                    id="precio"
                    type="number"
                    value={formData.precio}
                    onChange={(e) => handleInputChange('precio', parseFloat(e.target.value) || 0)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duracion">Duración *</Label>
                  <Input
                    id="duracion"
                    value={formData.duracion}
                    onChange={(e) => handleInputChange('duracion', e.target.value)}
                    placeholder="ej: 8 semanas"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nivel">Nivel *</Label>
                  <Select
                    value={formData.nivel}
                    onValueChange={(value) => handleInputChange('nivel', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="principiante">Principiante</SelectItem>
                      <SelectItem value="intermedio">Intermedio</SelectItem>
                      <SelectItem value="avanzado">Avanzado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="instructor">Instructor *</Label>
                  <Input
                    id="instructor"
                    value={formData.instructor}
                    onChange={(e) => handleInputChange('instructor', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max_participantes">Máx. Participantes *</Label>
                  <Input
                    id="max_participantes"
                    type="number"
                    value={formData.max_participantes}
                    onChange={(e) => handleInputChange('max_participantes', parseInt(e.target.value) || 0)}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fecha_inicio">Fecha Inicio *</Label>
                  <Input
                    id="fecha_inicio"
                    type="date"
                    value={formData.fecha_inicio}
                    onChange={(e) => handleInputChange('fecha_inicio', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fecha_fin">Fecha Fin *</Label>
                  <Input
                    id="fecha_fin"
                    type="date"
                    value={formData.fecha_fin}
                    onChange={(e) => handleInputChange('fecha_fin', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="imagen_url">URL de Imagen</Label>
                <Input
                  id="imagen_url"
                  value={formData.imagen_url}
                  onChange={(e) => handleInputChange('imagen_url', e.target.value)}
                  placeholder="https://ejemplo.com/imagen.jpg"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={handleCloseDialog}>
                  <X className="h-4 w-4 mr-2" />
                  Cancelar
                </Button>
                <Button type="submit" disabled={saving}>
                  <Save className="h-4 w-4 mr-2" />
                  {saving ? 'Guardando...' : 'Guardar'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Lista de cursos */}
      <div className="grid gap-6">
        {cursos.length === 0 ? (
          <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200 shadow-lg">
            <CardContent className="p-12 text-center">
              <div className="bg-gray-400 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <BookOpen className="h-10 w-10 text-white" />
              </div>
              <p className="text-gray-700 font-medium">No hay cursos creados aún.</p>
              <p className="text-gray-500 text-sm mt-2">Haz clic en "Nuevo Curso" para comenzar</p>
            </CardContent>
          </Card>
        ) : (
          cursos.map((curso) => (
            <Card 
              key={curso.id} 
              className={`${!curso.activo ? 'opacity-60' : ''} bg-white shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300`}
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <span className="text-gray-900">{curso.titulo}</span>
                      <Badge 
                        variant={curso.activo ? "default" : "secondary"}
                        className={curso.activo 
                          ? "bg-green-500 hover:bg-green-600" 
                          : "bg-gray-400 hover:bg-gray-500"
                        }
                      >
                        {curso.activo ? "Activo" : "Inactivo"}
                      </Badge>
                      <Badge 
                        variant="outline"
                        className="border-purple-300 text-purple-700 bg-purple-50"
                      >
                        {curso.nivel}
                      </Badge>
                    </CardTitle>
                    <p className="text-muted-foreground mt-2">{curso.descripcion}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleActive(curso)}
                      className={curso.activo 
                        ? "border-orange-300 text-orange-700 hover:bg-orange-50" 
                        : "border-green-300 text-green-700 hover:bg-green-50"
                      }
                    >
                      {curso.activo ? 'Desactivar' : 'Activar'}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleOpenDialog(curso)}
                      className="border-blue-300 text-blue-700 hover:bg-blue-50"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="border-red-300 text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>¿Eliminar curso?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Esta acción no se puede deshacer. El curso será eliminado permanentemente.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(curso.id)}>
                            Eliminar
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span>${curso.precio.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{curso.duracion}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{curso.participantes_actuales}/{curso.max_participantes}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{new Date(curso.fecha_inicio).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Instructor: <span className="font-medium">{curso.instructor}</span>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Categoría: <span className="font-medium">{curso.categoria}</span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
