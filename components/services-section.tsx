import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Paintbrush, Scissors, Palette, Package, Users, Wrench } from "lucide-react"

export function ServicesSection() {
  const services = [
    {
      icon: Paintbrush,
      title: "Pintura y Dibujo",
      description:
        "Óleos, acrílicos, acuarelas, lápices, carboncillos y todo tipo de materiales para pintura y dibujo.",
      color: "primary",
    },
    {
      icon: Scissors,
      title: "Manualidades",
      description: "Materiales para scrapbooking, decoración, bisutería y proyectos de manualidades creativas.",
      color: "secondary",
    },
    {
      icon: Palette,
      title: "Arte Digital",
      description: "Tabletas gráficas, stylus, software especializado y accesorios para arte digital.",
      color: "accent",
    },
    {
      icon: Package,
      title: "Kits Completos",
      description: "Sets organizados para principiantes y profesionales con todo lo necesario para empezar.",
      color: "primary",
    },
    {
      icon: Users,
      title: "Talleres Grupales",
      description: "Espacios y materiales para talleres, eventos corporativos y actividades grupales.",
      color: "secondary",
    },
    {
      icon: Wrench,
      title: "Asesoría Técnica",
      description: "Consultoría personalizada para elegir los mejores materiales según tu proyecto.",
      color: "accent",
    },
  ]

  return (
    <section id="servicios" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            A Qué Nos Dedicamos
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground text-pretty">
            Ofrecemos una amplia gama de productos y servicios para satisfacer todas tus necesidades artísticas, desde
            materiales básicos hasta herramientas profesionales especializadas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardHeader className="text-center pb-4">
                <div
                  className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full ${
                    service.color === "primary"
                      ? "bg-primary/10"
                      : service.color === "secondary"
                        ? "bg-secondary/10"
                        : "bg-accent/10"
                  } group-hover:scale-110 transition-transform duration-300`}
                >
                  <service.icon
                    className={`h-8 w-8 ${
                      service.color === "primary"
                        ? "text-primary"
                        : service.color === "secondary"
                          ? "text-secondary"
                          : "text-accent"
                    }`}
                  />
                </div>
                <CardTitle className="text-xl font-semibold text-foreground">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground leading-relaxed mb-6 text-pretty">{service.description}</p>
                <Button
                  variant="outline"
                  className={`${
                    service.color === "primary"
                      ? "border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                      : service.color === "secondary"
                        ? "border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground"
                        : "border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  Más Información
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">¿Necesitas algo específico?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto text-pretty">
              Si no encuentras lo que buscas, contáctanos. Trabajamos con proveedores especializados para conseguir
              materiales únicos y herramientas específicas para tu proyecto.
            </p>
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Solicitar Cotización
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
