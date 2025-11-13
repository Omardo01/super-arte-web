"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Users, Star, Filter } from "lucide-react"
import { useState } from "react"
import { motion } from "framer-motion"

// Datos estáticos de cursos
const cursosData = [
  {
    id: "1",
    titulo: "Pintura Acrílica para Principiantes",
    descripcion: "Aprende las técnicas básicas de pintura acrílica, desde mezcla de colores hasta pinceladas fundamentales. Ideal para quienes están comenzando su camino artístico.",
    categoria: "Pintura",
    nivel: "principiante",
    precio: 200,
    duracion: "4 semanas (2 horas por sesión)",
    fecha_inicio: "2025-12-01",
    fecha_fin: "2025-12-29",
    instructor: "Maestra Elena Rodríguez",
    max_participantes: 15,
    participantes_actuales: 8,
  },
  {
    id: "2",
    titulo: "Decoración con Flores Artificiales",
    descripcion: "Crea hermosos arreglos florales con técnicas profesionales. Aprende a combinar colores, texturas y formas para ocasiones especiales.",
    categoria: "Decoración",
    nivel: "intermedio",
    precio: 120,
    duracion: "3 semanas (2.5 horas por sesión)",
    fecha_inicio: "2025-12-08",
    fecha_fin: "2025-12-22",
    instructor: "Maestra Carmen López",
    max_participantes: 12,
    participantes_actuales: 5,
  },
  {
    id: "3",
    titulo: "Manualidades con Madera Avanzado",
    descripcion: "Técnicas avanzadas de trabajo en madera, incluyendo tallado, lijado y acabados profesionales. Crea piezas decorativas únicas.",
    categoria: "Manualidades",
    nivel: "avanzado",
    precio: 200,
    duracion: "6 semanas (3 horas por sesión)",
    fecha_inicio: "2025-12-15",
    fecha_fin: "2026-01-26",
    instructor: "Maestro Roberto Martínez",
    max_participantes: 10,
    participantes_actuales: 10,
  },
]

export function CoursesSection() {
  const [filtroNivel, setFiltroNivel] = useState<string>("todos")
  const [filtroCategoria, setFiltroCategoria] = useState<string>("todos")

  // Filtrar cursos
  const cursosFiltrados = cursosData.filter(curso => {
    const matchNivel = filtroNivel === "todos" || curso.nivel === filtroNivel
    const matchCategoria = filtroCategoria === "todos" || curso.categoria === filtroCategoria
    return matchNivel && matchCategoria
  })

  // Obtener categorías únicas
  const categorias = [...new Set(cursosData.map(curso => curso.categoria))]
  const niveles = ["principiante", "intermedio", "avanzado"]

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "principiante":
        return "bg-accent/20 text-accent"
      case "intermedio":
        return "bg-secondary/20 text-secondary"
      case "avanzado":
        return "bg-primary/20 text-primary"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(price)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-MX', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  const getCuposDisponibles = (max: number, actuales: number) => {
    const disponibles = max - actuales
    return disponibles > 0 ? `${disponibles} cupos disponibles` : 'Curso lleno'
  }

  const getColorByCurso = (index: number) => {
    const colors = ["primary", "secondary", "accent"]
    return colors[index % colors.length]
  }

  return (
    <section id="cursos" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center mb-16">
          <motion.h2 
            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Nuestros Cursos
          </motion.h2>
          <motion.p 
            className="mt-6 text-lg leading-8 text-muted-foreground text-pretty"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Desarrolla tu talento artístico con nuestros cursos especializados. Desde técnicas básicas hasta métodos
            avanzados, tenemos diferentes cursos para ti.
          </motion.p>
        </div>

        {/* Filtros */}
        <motion.div 
          className="mb-8 flex flex-wrap gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Filtrar por:</span>
          </div>
          
          <select
            value={filtroNivel}
            onChange={(e) => setFiltroNivel(e.target.value)}
            className="px-3 py-1 border border-border rounded-md bg-background text-foreground text-sm"
          >
            <option value="todos">Todos los niveles</option>
            {niveles.map(nivel => (
              <option key={nivel} value={nivel} className="capitalize">
                {nivel.charAt(0).toUpperCase() + nivel.slice(1)}
              </option>
            ))}
          </select>

          <select
            value={filtroCategoria}
            onChange={(e) => setFiltroCategoria(e.target.value)}
            className="px-3 py-1 border border-border rounded-md bg-background text-foreground text-sm"
          >
            <option value="todos">Todas las categorías</option>
            {categorias.map(categoria => (
              <option key={categoria} value={categoria}>
                {categoria}
              </option>
            ))}
          </select>
        </motion.div>

        {/* Cursos */}
        {cursosFiltrados.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No hay cursos disponibles con los filtros seleccionados.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {cursosFiltrados.map((curso, index) => {
                  const colorCurso = getColorByCurso(index)
                  const cuposDisponibles = getCuposDisponibles(curso.max_participantes, curso.participantes_actuales)
                  const cursoLleno = curso.participantes_actuales >= curso.max_participantes
                  
                  return (
                    <motion.div
                      key={curso.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg h-full">
                        <CardHeader>
                          <div className="flex items-start justify-between mb-2">
                            <Badge className={getLevelColor(curso.nivel)}>
                              {curso.nivel.charAt(0).toUpperCase() + curso.nivel.slice(1)}
                            </Badge>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-primary">
                                {formatPrice(curso.precio)}
                              </div>
                            </div>
                          </div>
                          <CardTitle className="text-xl font-semibold text-foreground text-balance">
                            {curso.titulo}
                          </CardTitle>
                          <Badge variant="outline" className="w-fit">
                            {curso.categoria}
                          </Badge>
                        </CardHeader>
                        <CardContent className="flex flex-col h-full">
                          <p className="text-muted-foreground leading-relaxed mb-4 text-pretty flex-grow">
                            {curso.descripcion}
                          </p>

                          <div className="space-y-2 mb-6">
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Clock className="h-4 w-4 mr-2 text-primary" />
                              {curso.duracion}
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Calendar className="h-4 w-4 mr-2 text-secondary" />
                              {formatDate(curso.fecha_inicio)} - {formatDate(curso.fecha_fin)}
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Users className="h-4 w-4 mr-2 text-accent" />
                              {cuposDisponibles}
                            </div>
                            {curso.instructor && (
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Star className="h-4 w-4 mr-2 text-primary" />
                                Instructor: {curso.instructor}
                              </div>
                            )}
                          </div>

                          <Button
                            className={`w-full ${
                              colorCurso === "primary"
                                ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                                : colorCurso === "secondary"
                                  ? "bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                                  : "bg-accent hover:bg-accent/90 text-accent-foreground"
                            }`}
                            disabled={cursoLleno}
                          >
                            {cursoLleno ? "Curso Lleno" : "Inscribirse Ahora"}
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )
                })}
              </div>
        )}

        <div className="mt-16">
          <div className="bg-card rounded-2xl p-8 shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-4">¿Por qué elegir nuestros cursos?</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-center">
                    <Star className="h-5 w-5 text-primary mr-3" />
                    Instructores profesionales con años de experiencia
                  </li>
                  <li className="flex items-center">
                    <Star className="h-5 w-5 text-secondary mr-3" />
                    Grupos pequeños para atención personalizada
                  </li>
                  <li className="flex items-center">
                    <Star className="h-5 w-5 text-primary mr-3" />
                    Certificado de participación al finalizar
                  </li>
                </ul>
              </div>
              <div className="text-center">
                <div className="bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 rounded-2xl p-8">
                  <h4 className="text-xl font-semibold text-foreground mb-4">Estadísticas</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="text-3xl font-bold text-primary mb-1">{cursosData.length}</div>
                      <p className="text-sm text-muted-foreground">Cursos disponibles</p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-secondary mb-1">
                        {cursosData.reduce((total, curso) => total + (curso.max_participantes - curso.participantes_actuales), 0)}
                      </div>
                      <p className="text-sm text-muted-foreground">Cupos totales disponibles</p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-accent mb-1">
                        {categorias.length}
                      </div>
                      <p className="text-sm text-muted-foreground">Categorías diferentes</p>
                    </div>
                  </div>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent mt-4"
                  >
                    Ver Todos los Cursos
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
