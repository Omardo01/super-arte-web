"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Calendar, Clock, MapPin, Star, Filter, Sparkles, ZoomIn } from "lucide-react"
import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

function WhatsAppIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}

interface Curso {
  id: string
  titulo: string
  subtitulo: string
  descripcion: string
  categoria: string
  precio: number
  precioTexto: string
  duracion: string
  fechas: string
  horario: string
  instructor: string
  direccion: string
  imagen: string
  whatsapp: string
  whatsappMensaje: string
  destacado?: string
  materiales?: string
}

// Datos de cursos actualizados con los folletos proporcionados
const cursosData: Curso[] = [
  {
    id: "jabones-artesanales",
    titulo: "Jabones Artesanales",
    subtitulo: "Aprende a elaborar tus propios jabones naturales",
    descripcion:
      "Taller práctico donde aprenderás a elaborar jabones artesanales con ingredientes naturales, esencias relajantes, flores secas y texturas únicas. ¡Ideal para uso personal o para emprender!",
    categoria: "Jabones",
    precio: 80,
    precioTexto: "$80.00 MXN clase + material",
    duracion: "1 sesión (3 horas)",
    fechas: "31 de Octubre",
    horario: "De 10:00 a.m. a 1:00 p.m.",
    instructor: "Super Arte",
    direccion: "Carranza 204 Villahermosa, Tabasco",
    imagen: "/cursos/jabones-artesanales.jpg",
    whatsapp: "9933832575",
    whatsappMensaje:
      "¡Hola Super Arte! Me gustaría inscribirme o pedir informes para el taller de 'Jabones Artesanales' del 31 de octubre.",
    destacado: "Jabones Naturales",
    materiales: "Costo de clase más material disponible en tienda",
  },
  {
    id: "velas-molde-recipiente-octubre",
    titulo: "Velas en Molde y Recipiente",
    subtitulo: "Ven a aprender con Alex",
    descripcion:
      "Aprende a elaborar hermosas velas artesanales en molde y recipiente. Técnicas decorativas, combinación de aromas y flores secas para crear piezas únicas.",
    categoria: "Velas",
    precio: 150,
    precioTexto: "$150.00 MXN",
    duracion: "2 días (Viernes y Sábado)",
    fechas: "16 y 17 de Octubre",
    horario: "Viernes de 3:00 a 6:00 p.m. y Sábado de 10:00 a 1:00 p.m.",
    instructor: "Alex",
    direccion: "Carranza 204 Centro, Villahermosa, Tabasco",
    imagen: "/cursos/velas-alex.jpg",
    whatsapp: "9933832575",
    whatsappMensaje:
      "¡Hola Super Arte! Me interesa inscribirme al curso de 'Velas en molde y recipiente' con Alex (16 y 17 de Octubre).",
    destacado: "Nueva Fecha • Con Alex",
  },
  {
    id: "monos-diademas-catrina-7-14",
    titulo: "Moños, Flores de Satín y Diademas de Catrina",
    subtitulo: "¡La clase es gratis en la compra del material!",
    descripcion:
      "Aprende a confeccionar espectaculares diademas de Catrina con flores de satín y elegantes moños artesanales. Turno matutino de 11:00 a 1:00 p.m.",
    categoria: "Moños y Accesorios",
    precio: 0,
    precioTexto: "¡Clase Gratis con Material!",
    duracion: "2 sesiones (2 horas c/u)",
    fechas: "7 y 14 de Octubre",
    horario: "De 11:00 a.m. a 1:00 p.m.",
    instructor: "Super Arte",
    direccion: "Carranza 204 Centro, Villahermosa, Tab.",
    imagen: "/cursos/diademas-catrina-7-14.jpg",
    whatsapp: "9933832575",
    whatsappMensaje:
      "¡Hola Super Arte! Me interesa apartar mi lugar para la clase de 'Moños, flores de satín y diademas de Catrina' (7 y 14 de Octubre de 11:00 a 1:00).",
    destacado: "Horario Matutino • ¡Gratis!",
    materiales: "Clase gratis al adquirir el material en tienda",
  },
  {
    id: "velas-molde-recipiente",
    titulo: "Velas en Molde y Recipiente",
    subtitulo: "Ven a aprender con Maryana",
    descripcion:
      "Aprende a elaborar hermosas velas artesanales en molde y recipiente. Técnicas decorativas, combinación de aromas y flores secas para crear piezas únicas.",
    categoria: "Velas",
    precio: 150,
    precioTexto: "$150.00 MXN",
    duracion: "2 días (3 horas por sesión)",
    fechas: "21 y 22 de Septiembre",
    horario: "De 3:00 p.m. a 6:00 p.m.",
    instructor: "Maryana",
    direccion: "Carranza 204, Centro, Villahermosa, Tabasco",
    imagen: "/cursos/velas.jpg",
    whatsapp: "9933832575",
    whatsappMensaje:
      "¡Hola Super Arte! Me gustaría inscribirme o solicitar información sobre el curso de 'Velas en molde y recipiente' con Maryana.",
    destacado: "Velas Artesanales",
  },
  {
    id: "intensivo-manualidades",
    titulo: "Intensivo de Manualidades",
    subtitulo: "Aprende • Crea • Disfruta",
    descripcion:
      "Taller intensivo donde aprenderás 3 técnicas artesanales: Pasta Francesa, Resina y Pintura Textil de Go Pash. ¡Inscríbanse con tiempo!",
    categoria: "Manualidades",
    precio: 350,
    precioTexto: "$350.00 MXN (semana en un horario)",
    duracion: "Del 5 al 10 de Octubre (Lunes a Sábado)",
    fechas: "Del 5 al 10 de Octubre",
    horario: "Matutino: 10:00 a 13:30 h | Vespertino: 3:00 a 6:30 h",
    instructor: "Maestra Estelita Padilla",
    direccion: "Venustiano Carranza #204, Col. Centro, Villahermosa, Tabasco",
    imagen: "/cursos/intensivo-manualidades.jpg",
    whatsapp: "9933832575",
    whatsappMensaje:
      "¡Hola Super Arte! Me interesa apartar mi lugar para el 'Intensivo de Manualidades' con la Maestra Estelita Padilla (Del 5 al 10 de Octubre).",
    destacado: "Pasta Francesa • Resina • Pintura Textil",
  },
  {
    id: "clases-crochet-cempasuchiles",
    titulo: "Clases de Crochet: Cempasúchiles",
    subtitulo: "¡Aprende, crea y disfruta tejiendo con tus manos!",
    descripcion:
      "Aprende a tejer tradicionales flores de Cempasúchil a crochet por ramo o por piezas individuales, perfectas para decoración otoñal y altares.",
    categoria: "Crochet",
    precio: 80,
    precioTexto: "$80.00 MXN por clase",
    duracion: "Todos los lunes de Octubre y Noviembre",
    fechas: "Octubre y Noviembre (Todos los lunes)",
    horario: "Octubre: Lunes 10:00 a 1:00 p.m. | Noviembre: Lunes 3:00 a 6:00 p.m.",
    instructor: "Super Arte",
    direccion: "Carranza 204 Centro, Villahermosa, Tabasco",
    imagen: "/cursos/crochet.jpg",
    whatsapp: "9933832575",
    whatsappMensaje:
      "¡Hola Super Arte! Me gustaría inscribirme o pedir informes sobre las 'Clases de Crochet: Cempasúchiles'.",
    destacado: "Cempasúchiles por Ramo o Piezas",
  },
  {
    id: "monos-diademas-catrina",
    titulo: "Moños, Flores de Satín y Diademas de Catrina",
    subtitulo: "¡La clase es gratis en la compra del material!",
    descripcion:
      "Aprende a confeccionar espectaculares diademas de Catrina con flores de satín y elegantes moños. Ideal para celebraciones de Día de Muertos y proyectos artesanales.",
    categoria: "Moños y Accesorios",
    precio: 0,
    precioTexto: "¡Clase Gratis con Material!",
    duracion: "2 sesiones (2 horas c/u)",
    fechas: "21 y 28 de Octubre",
    horario: "De 4:00 p.m. a 6:00 p.m.",
    instructor: "Super Arte",
    direccion: "Carranza 204 Centro, Villahermosa, Tabasco",
    imagen: "/cursos/diademas-catrina.jpg",
    whatsapp: "9933832575",
    whatsappMensaje:
      "¡Hola Super Arte! Me interesa apartar mi lugar para la clase de 'Moños, flores de satín y diademas de Catrina' (Octubre 21 y 28).",
    destacado: "¡Clase Gratis!",
    materiales: "Clase gratis al adquirir el material en tienda",
  },
  {
    id: "clases-arreglos-florales",
    titulo: "Clases de Arreglos Florales",
    subtitulo: "Coronas y escapularios para la temporada de otoño",
    descripcion:
      "¡Lleva la belleza de la temporada a tu hogar! Aprende técnicas profesionales para crear coronas y escapularios decorativos de otoño. Materiales disponibles en tienda.",
    categoria: "Arreglos Florales",
    precio: 80,
    precioTexto: "$80.00 MXN la clase",
    duracion: "1 sesión (4 horas)",
    fechas: "26 de Septiembre",
    horario: "De 10:00 a.m. a 2:00 p.m.",
    instructor: "Super Arte",
    direccion: "Carranza #204, Col. Centro, Villahermosa, Tabasco",
    imagen: "/cursos/arreglos-florales.jpg",
    whatsapp: "9933832575",
    whatsappMensaje:
      "¡Hola Super Arte! Me gustaría inscribirme o pedir informes para la clase de 'Arreglos Florales: Coronas y Escapularios' del 26 de septiembre.",
    destacado: "Temporada de Otoño",
    materiales: "Materiales disponibles en tienda",
  },
]

export function CoursesSection() {
  const [filtroCategoria, setFiltroCategoria] = useState<string>("todos")
  const [cursoSeleccionado, setCursoSeleccionado] = useState<Curso | null>(null)

  // Filtrar cursos
  const cursosFiltrados = cursosData.filter((curso) => {
    return filtroCategoria === "todos" || curso.categoria === filtroCategoria
  })

  // Obtener categorías únicas
  const categorias = [...new Set(cursosData.map((curso) => curso.categoria))]

  const formatPrice = (price: number) => {
    if (price === 0) return "GRATIS*"
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
      maximumFractionDigits: 0,
    }).format(price)
  }

  const getWhatsAppLink = (mensaje: string) => {
    return `https://wa.me/529933832575?text=${encodeURIComponent(mensaje)}`
  }

  return (
    <section id="cursos" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado de la sección */}
        <div className="mx-auto max-w-4xl text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4"
          >
            <Sparkles className="h-4 w-4" />
            Talleres y Clases Presenciales
          </motion.div>
          <motion.h2
            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Nuestros Cursos y Talleres
          </motion.h2>
          <motion.p
            className="mt-4 text-lg leading-8 text-muted-foreground text-pretty max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Desarrolla tu creatividad, aprende técnicas profesionales y crea proyectos únicos con nuestros talleres en tienda.
          </motion.p>
        </div>

        {/* Banner destacado de Dirección y WhatsApp */}
        <motion.div
          className="max-w-4xl mx-auto mb-12 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-pink-50 via-white to-purple-50 border border-pink-200/70 shadow-md flex flex-col md:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex items-start sm:items-center gap-3 text-left">
            <div className="p-2.5 rounded-xl bg-pink-100 text-pink-600 shrink-0">
              <MapPin className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs uppercase font-bold tracking-wider text-pink-600">Sede de los Cursos</p>
              <p className="text-sm sm:text-base font-semibold text-foreground">
                Super Arte: Venustiano Carranza #204, Col. Centro, Villahermosa, Tabasco
              </p>
            </div>
          </div>

          <a
            href="https://wa.me/529933832575?text=Hola%20Super%20Arte,%20quisiera%20pedir%20informaci%C3%B3n%20sobre%20los%20cursos%20disponibles"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all shrink-0"
          >
            <WhatsAppIcon className="h-5 w-5" />
            <span>WhatsApp: 99 33 83 25 75</span>
          </a>
        </motion.div>

        {/* Filtros por Categoría */}
        <motion.div
          className="mb-10 flex flex-wrap gap-2 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center gap-2 mr-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Categoría:</span>
          </div>

          <Button
            size="sm"
            variant={filtroCategoria === "todos" ? "default" : "outline"}
            onClick={() => setFiltroCategoria("todos")}
            className="rounded-full text-xs"
          >
            Todas ({cursosData.length})
          </Button>
          {categorias.map((categoria) => (
            <Button
              key={categoria}
              size="sm"
              variant={filtroCategoria === categoria ? "default" : "outline"}
              onClick={() => setFiltroCategoria(categoria)}
              className="rounded-full text-xs capitalize"
            >
              {categoria}
            </Button>
          ))}
        </motion.div>

        {/* Grid de Cursos */}
        {cursosFiltrados.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No hay cursos disponibles en esta categoría.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {cursosFiltrados.map((curso, index) => {
              return (
                <motion.div
                  key={curso.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="h-full"
                >
                  <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg overflow-hidden flex flex-col h-full bg-card">
                    {/* Imagen / Folleto del curso */}
                    <div className="relative w-full h-72 sm:h-80 overflow-hidden bg-slate-100 cursor-pointer">
                      <Image
                        src={curso.imagen}
                        alt={`Folleto ${curso.titulo}`}
                        fill
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        onClick={() => setCursoSeleccionado(curso)}
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority={index < 2}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                      {/* Botón flotante para ver folleto ampliado */}
                      <button
                        onClick={() => setCursoSeleccionado(curso)}
                        className="absolute top-3 right-3 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full backdrop-blur-sm transition-all"
                        title="Ver folleto completo"
                        aria-label="Ver folleto completo"
                      >
                        <ZoomIn className="h-4 w-4" />
                      </button>

                      {/* Badge de categoría */}
                      <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                        <Badge className="bg-primary/90 text-primary-foreground backdrop-blur-sm shadow">
                          {curso.categoria}
                        </Badge>
                        {curso.destacado && (
                          <Badge variant="secondary" className="bg-white/90 text-gray-800 backdrop-blur-sm shadow text-xs">
                            {curso.destacado}
                          </Badge>
                        )}
                      </div>

                      {/* Precio superpuesto en la parte inferior de la imagen */}
                      <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between text-white">
                        <div>
                          <p className="text-xs text-white/80 uppercase font-semibold tracking-wider">Inversión</p>
                          <p className="text-2xl font-black text-white drop-shadow-md">
                            {formatPrice(curso.precio)}
                          </p>
                          <p className="text-[11px] text-white/90">{curso.precioTexto}</p>
                        </div>
                        <button
                          onClick={() => setCursoSeleccionado(curso)}
                          className="text-xs bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-lg backdrop-blur-sm transition-all flex items-center gap-1 font-medium"
                        >
                          <ZoomIn className="h-3.5 w-3.5" />
                          Ver folleto
                        </button>
                      </div>
                    </div>

                    <CardHeader className="pb-3 pt-5 px-6">
                      <div className="flex items-center gap-2 text-xs font-semibold text-pink-600 mb-1">
                        <Sparkles className="h-3.5 w-3.5" />
                        <span>{curso.subtitulo}</span>
                      </div>
                      <CardTitle className="text-2xl font-bold text-foreground leading-tight">
                        {curso.titulo}
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="flex flex-col flex-grow px-6 pb-6 pt-0">
                      <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                        {curso.descripcion}
                      </p>

                      {/* Lista de detalles clave */}
                      <div className="space-y-2.5 mb-6 text-sm bg-muted/50 p-4 rounded-xl border border-border/50">
                        <div className="flex items-start text-foreground">
                          <Calendar className="h-4 w-4 mr-2.5 text-primary shrink-0 mt-0.5" />
                          <div>
                            <span className="font-semibold">Fechas: </span>
                            <span className="text-muted-foreground">{curso.fechas}</span>
                          </div>
                        </div>

                        <div className="flex items-start text-foreground">
                          <Clock className="h-4 w-4 mr-2.5 text-secondary shrink-0 mt-0.5" />
                          <div>
                            <span className="font-semibold">Horario: </span>
                            <span className="text-muted-foreground">{curso.horario}</span>
                          </div>
                        </div>

                        <div className="flex items-start text-foreground">
                          <Star className="h-4 w-4 mr-2.5 text-amber-500 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-semibold">Imparte: </span>
                            <span className="text-muted-foreground">{curso.instructor}</span>
                          </div>
                        </div>

                        <div className="flex items-start text-foreground">
                          <MapPin className="h-4 w-4 mr-2.5 text-red-500 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-semibold">Lugar: </span>
                            <span className="text-muted-foreground">{curso.direccion}</span>
                          </div>
                        </div>

                        {curso.materiales && (
                          <div className="pt-1 border-t border-border/40 text-xs text-pink-600 font-medium flex items-center gap-1.5">
                            <Sparkles className="h-3.5 w-3.5" />
                            {curso.materiales}
                          </div>
                        )}
                      </div>

                      {/* Botón WhatsApp de Acción */}
                      <div className="mt-auto pt-2 space-y-2">
                        <a
                          href={getWhatsAppLink(curso.whatsappMensaje)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-300 transform active:scale-[0.99]"
                        >
                          <WhatsAppIcon className="h-5 w-5" />
                          <span>Inscribirse por WhatsApp</span>
                        </a>

                        <p className="text-center text-[11px] text-muted-foreground">
                          Atención inmediata vía WhatsApp al <span className="font-semibold text-foreground">99 33 83 25 75</span>
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        )}

        {/* Modal de visualización de folleto completo */}
        <Dialog open={!!cursoSeleccionado} onOpenChange={(open) => !open && setCursoSeleccionado(null)}>
          <DialogContent className="max-w-2xl p-4 sm:p-6 bg-card text-card-foreground">
            {cursoSeleccionado && (
              <>
                <DialogHeader className="mb-2">
                  <DialogTitle className="text-xl font-bold flex items-center justify-between pr-6">
                    <span>{cursoSeleccionado.titulo}</span>
                    <span className="text-base text-pink-600 font-semibold">{cursoSeleccionado.precioTexto}</span>
                  </DialogTitle>
                </DialogHeader>

                <div className="relative w-full h-[65vh] rounded-lg overflow-hidden bg-black/5 flex items-center justify-center">
                  <Image
                    src={cursoSeleccionado.imagen}
                    alt={cursoSeleccionado.titulo}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 700px"
                  />
                </div>

                <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-border">
                  <div className="text-xs text-muted-foreground text-center sm:text-left">
                    <p className="font-semibold text-foreground">Super Arte • Carranza 204 Centro, Villahermosa</p>
                    <p>WhatsApp: 99 33 83 25 75</p>
                  </div>
                  <a
                    href={getWhatsAppLink(cursoSeleccionado.whatsappMensaje)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-sm shadow transition-all"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                    Inscribirse vía WhatsApp
                  </a>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Sección Informativa Adicional */}
        <div className="mt-16">
          <div className="bg-card rounded-2xl p-6 sm:p-8 shadow-lg border border-border/60">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-4">¿Por qué aprender en Super Arte?</h3>
                <ul className="space-y-3 text-muted-foreground text-sm sm:text-base">
                  <li className="flex items-start">
                    <Star className="h-5 w-5 text-pink-500 mr-3 shrink-0 mt-0.5" />
                    <span><strong>Instructores capacitados:</strong> Maestras con años de experiencia artística y pedagógica.</span>
                  </li>
                  <li className="flex items-start">
                    <Star className="h-5 w-5 text-purple-500 mr-3 shrink-0 mt-0.5" />
                    <span><strong>Materiales en tienda:</strong> Encuentra todos los insumos necesarios para tu curso directamente en Super Arte.</span>
                  </li>
                  <li className="flex items-start">
                    <Star className="h-5 w-5 text-pink-500 mr-3 shrink-0 mt-0.5" />
                    <span><strong>Atención personalizada:</strong> Grupos con cupo limitado para garantizar tu aprendizaje paso a paso.</span>
                  </li>
                  <li className="flex items-start">
                    <MapPin className="h-5 w-5 text-red-500 mr-3 shrink-0 mt-0.5" />
                    <span><strong>Ubicación céntrica:</strong> Venustiano Carranza #204, Col. Centro, Villahermosa, Tabasco.</span>
                  </li>
                </ul>
              </div>

              <div className="text-center">
                <div className="bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-pink-500/5 rounded-2xl p-6 sm:p-8 border border-pink-200/50">
                  <h4 className="text-xl font-semibold text-foreground mb-2">¿Tienes dudas o quieres un taller personalizado?</h4>
                  <p className="text-sm text-muted-foreground mb-6">
                    Escríbenos directamente por WhatsApp y con gusto te brindamos fechas, disponibilidad y opciones para ti o tu grupo.
                  </p>

                  <a
                    href="https://wa.me/529933832575?text=Hola%20Super%20Arte,%20me%20gustar%C3%ADa%20recibir%20informaci%C3%B3n%20sobre%20sus%20talleres%20y%20cursos"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-base shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <WhatsAppIcon className="h-5 w-5" />
                    <span>Enviar WhatsApp al 99 33 83 25 75</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
