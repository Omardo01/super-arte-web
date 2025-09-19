import { Card, CardContent } from "@/components/ui/card"
import { Heart, Users, Award, Lightbulb } from "lucide-react"

export function AboutSection() {
  const values = [
    {
      icon: Heart,
      title: "Pasión por el Arte",
      description: "Amamos el arte en todas sus formas y queremos compartir esa pasión contigo.",
    },
    {
      icon: Users,
      title: "Comunidad Creativa",
      description: "Creamos un espacio donde artistas de todos los niveles pueden crecer y aprender.",
    },
    {
      icon: Award,
      title: "Calidad Premium",
      description: "Seleccionamos cuidadosamente los mejores materiales y herramientas del mercado.",
    },
    {
      icon: Lightbulb,
      title: "Innovación Constante",
      description: "Siempre buscamos nuevas formas de inspirar y apoyar tu creatividad.",
    },
  ]

  return (
    <section id="quienes-somos" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">Quiénes Somos</h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground text-pretty">
            SUPER ARTE nació de la pasión por el arte y el deseo de hacer accesibles los mejores materiales artísticos
            para todos. Desde 2015, hemos sido el punto de encuentro para artistas, estudiantes y creativos de toda la
            región.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {values.map((value, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <value.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground text-pretty">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-card rounded-2xl p-8 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Nuestra Misión</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Inspirar y equipar a artistas de todos los niveles con los mejores materiales y conocimientos, creando
                una comunidad donde la creatividad no tenga límites.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Creemos que el arte tiene el poder de transformar vidas y comunidades, y estamos aquí para ser parte de
                tu viaje creativo, desde los primeros trazos hasta las obras maestras.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">9+</div>
                  <div className="text-sm text-muted-foreground mb-4">Años de experiencia</div>
                  <div className="text-4xl font-bold text-secondary mb-2">5000+</div>
                  <div className="text-sm text-muted-foreground mb-4">Clientes satisfechos</div>
                  <div className="text-4xl font-bold text-accent mb-2">500+</div>
                  <div className="text-sm text-muted-foreground">Productos disponibles</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
