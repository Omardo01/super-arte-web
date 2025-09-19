"use client"

import { Button } from "@/components/ui/button"
import { Palette, Brush, Sparkles } from "lucide-react"

export function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/10 py-20 sm:py-32"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-8 flex justify-center space-x-4">
            <div className="rounded-full bg-primary/20 p-3">
              <Palette className="h-8 w-8 text-primary" />
            </div>
            <div className="rounded-full bg-secondary/20 p-3">
              <Brush className="h-8 w-8 text-secondary" />
            </div>
            <div className="rounded-full bg-accent/20 p-3">
              <Sparkles className="h-8 w-8 text-accent" />
            </div>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl text-balance">
            Bienvenidos a{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              SUPER ARTE
            </span>
          </h1>

          <p className="mt-6 text-lg leading-8 text-muted-foreground sm:text-xl text-pretty max-w-2xl mx-auto">
            Tu tienda especializada en artículos para todo tipo de arte. Desde materiales básicos hasta herramientas
            profesionales, tenemos todo lo que necesitas para dar vida a tu creatividad.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg"
              onClick={() => scrollToSection("servicios")}
            >
              Explorar Productos
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground px-8 py-3 text-lg bg-transparent"
              onClick={() => scrollToSection("cursos")}
            >
              Ver Cursos
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/2 left-4 -translate-y-1/2 opacity-20">
        <div className="h-32 w-32 rounded-full bg-gradient-to-br from-primary to-secondary blur-xl"></div>
      </div>
      <div className="absolute top-1/4 right-8 opacity-20">
        <div className="h-24 w-24 rounded-full bg-gradient-to-br from-accent to-primary blur-xl"></div>
      </div>
    </section>
  )
}
