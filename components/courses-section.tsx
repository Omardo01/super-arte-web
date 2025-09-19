import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Users, Star } from "lucide-react"

export function CoursesSection() {
  const courses = [
    {
      title: "Pintura al Óleo para Principiantes",
      description:
        "Aprende las técnicas básicas de la pintura al óleo, desde la preparación del lienzo hasta los acabados finales.",
      duration: "8 semanas",
      schedule: "Sábados 10:00 - 12:00",
      level: "Principiante",
      price: "$150",
      spots: "8 cupos disponibles",
      color: "primary",
    },
    {
      title: "Acuarela Avanzada",
      description: "Perfecciona tu técnica con acuarelas, explorando efectos avanzados y composiciones complejas.",
      duration: "6 semanas",
      schedule: "Miércoles 18:00 - 20:00",
      level: "Avanzado",
      price: "$180",
      spots: "5 cupos disponibles",
      color: "secondary",
    },
    {
      title: "Dibujo Artístico",
      description:
        "Desarrolla tus habilidades de dibujo con diferentes técnicas y materiales, desde lápiz hasta carboncillo.",
      duration: "10 semanas",
      schedule: "Martes 16:00 - 18:00",
      level: "Intermedio",
      price: "$120",
      spots: "12 cupos disponibles",
      color: "accent",
    },
    {
      title: "Arte Digital",
      description: "Introducción al arte digital usando tabletas gráficas y software especializado.",
      duration: "4 semanas",
      schedule: "Viernes 19:00 - 21:00",
      level: "Principiante",
      price: "$200",
      spots: "6 cupos disponibles",
      color: "primary",
    },
    {
      title: "Técnicas Mixtas",
      description: "Experimenta combinando diferentes materiales y técnicas para crear obras únicas y expresivas.",
      duration: "12 semanas",
      schedule: "Domingos 14:00 - 17:00",
      level: "Intermedio",
      price: "$250",
      spots: "10 cupos disponibles",
      color: "secondary",
    },
    {
      title: "Ilustración Infantil",
      description:
        "Curso especializado en ilustración para libros infantiles, desde conceptualización hasta finalización.",
      duration: "8 semanas",
      schedule: "Jueves 17:00 - 19:00",
      level: "Intermedio",
      price: "$190",
      spots: "7 cupos disponibles",
      color: "accent",
    },
  ]

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Principiante":
        return "bg-accent/20 text-accent"
      case "Intermedio":
        return "bg-secondary/20 text-secondary"
      case "Avanzado":
        return "bg-primary/20 text-primary"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <section id="cursos" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Nuestros Cursos
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground text-pretty">
            Desarrolla tu talento artístico con nuestros cursos especializados. Desde técnicas básicas hasta métodos
            avanzados, tenemos el programa perfecto para tu nivel y objetivos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <Badge className={getLevelColor(course.level)}>{course.level}</Badge>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">{course.price}</div>
                  </div>
                </div>
                <CardTitle className="text-xl font-semibold text-foreground text-balance">{course.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed mb-4 text-pretty">{course.description}</p>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-2 text-primary" />
                    {course.duration}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2 text-secondary" />
                    {course.schedule}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="h-4 w-4 mr-2 text-accent" />
                    {course.spots}
                  </div>
                </div>

                <Button
                  className={`w-full ${
                    course.color === "primary"
                      ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                      : course.color === "secondary"
                        ? "bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                        : "bg-accent hover:bg-accent/90 text-accent-foreground"
                  }`}
                >
                  Inscribirse Ahora
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

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
                    <Star className="h-5 w-5 text-accent mr-3" />
                    Materiales incluidos en el precio del curso
                  </li>
                  <li className="flex items-center">
                    <Star className="h-5 w-5 text-primary mr-3" />
                    Certificado de participación al finalizar
                  </li>
                </ul>
              </div>
              <div className="text-center">
                <div className="bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 rounded-2xl p-8">
                  <h4 className="text-xl font-semibold text-foreground mb-4">Próximo Inicio</h4>
                  <div className="text-3xl font-bold text-primary mb-2">15 Marzo</div>
                  <p className="text-muted-foreground mb-4">Nuevos grupos disponibles</p>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
                  >
                    Ver Calendario Completo
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
