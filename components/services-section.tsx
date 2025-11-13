"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function ServicesSection() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const services = [
    {
      emoji: "🎨",
      title: "Pinturas",
      description: "Amplia variedad de pinturas acrílicas, óleos, acuarelas y spray para todos tus proyectos artísticos.",
      color: "primary",
    },
    {
      emoji: "🎀",
      title: "Cintas",
      description: "Cintas decorativas, satinadas, de organza y más para empaques y manualidades especiales.",
      color: "secondary",
    },
    {
      emoji: "🏺",
      title: "Cerámica",
      description: "Piezas de cerámica, arcilla y materiales para crear y decorar tus propias obras.",
      color: "accent",
    },
    {
      emoji: "🔧",
      title: "Herrería",
      description: "Herramientas y materiales para trabajos de metal, soldadura y proyectos de herrería.",
      color: "primary",
    },
    {
      emoji: "🧺",
      title: "Mimbre",
      description: "Canastas, bases y materiales de mimbre para decoración y artesanías naturales.",
      color: "secondary",
    },
    {
      emoji: "🌸",
      title: "Flores",
      description: "Flores artificiales, secas y de tela en diversos estilos y colores para decoración.",
      color: "accent",
    },
    {
      emoji: "🕯️",
      title: "Velas",
      description: "Velas decorativas, aromas, ceras y moldes para crear tus propias velas personalizadas.",
      color: "primary",
    },
    {
      emoji: "🔮",
      title: "Plástico",
      description: "Artículos de plástico decorativo, acrílicos y materiales para manualidades versátiles.",
      color: "secondary",
    },
    {
      emoji: "💐",
      title: "Arreglos Terminados",
      description: "Arreglos florales y decorativos listos para regalar o decorar cualquier ocasión especial.",
      color: "accent",
    },
    {
      emoji: "🪵",
      title: "Madera",
      description: "Bases de madera, MDF, listones y materiales para proyectos de carpintería y decoración.",
      color: "primary",
    },
    {
      emoji: "🧵",
      title: "Cintas y Cordones",
      description: "Cordones decorativos, hilos, yute y listones para costuras y decoraciones elaboradas.",
      color: "secondary",
    },
    {
      emoji: "💎",
      title: "Cristales",
      description: "Cristales decorativos, pedrería, diamantina y materiales brillantes para tus creaciones.",
      color: "accent",
    },
    {
      emoji: "🧶",
      title: "Mercería",
      description: "Hilos, agujas, botones, cierres y todos los accesorios para costura y confección.",
      color: "primary",
    },
    {
      emoji: "☁️",
      title: "Unicel",
      description: "Figuras y bases de unicel en diversos tamaños para manualidades y decoración ligera.",
      color: "secondary",
    },
    {
      emoji: "🎄",
      title: "Navidad",
      description: "Decoración navideña, esferas, luces y todo para celebrar la temporada más festiva del año.",
      color: "accent",
    },
    {
      emoji: "✨",
      title: "Novedades",
      description: "Últimas tendencias en decoración y manualidades, productos innovadores y únicos.",
      color: "primary",
    },
    {
      emoji: "🎪",
      title: "Juguetería",
      description: "Juguetes, piñatas y artículos para fiestas infantiles y entretenimiento familiar.",
      color: "secondary",
    },
  ]

  return (
    <section id="servicios" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Nuestros departamentos:
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                  <span className="text-4xl">{service.emoji}</span>
                </div>
                <CardTitle className="text-lg font-semibold text-foreground">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground text-sm leading-relaxed text-pretty">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">¿Necesitas algo específico?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto text-pretty">
              Si no encuentras lo que buscas, contáctanos. Hacemos envíos a municipios de tabasco y a toda la republica mexicana.
            </p>
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground" onClick={() => scrollToSection("contacto")}>
              Contactar
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
