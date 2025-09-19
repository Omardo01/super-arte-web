"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiryType: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para enviar el formulario
    console.log("Formulario enviado:", formData)
    alert("¡Gracias por tu mensaje! Te contactaremos pronto.")
    setFormData({ name: "", email: "", phone: "", inquiryType: "", message: "" })
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <section id="contacto" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">Contáctanos</h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground text-pretty">
            ¿Tienes preguntas sobre nuestros productos o cursos? ¡Estamos aquí para ayudarte! Contáctanos y te
            responderemos lo antes posible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Información de contacto */}
          <div className="space-y-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-foreground">Información de Contacto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Dirección</h4>
                    <p className="text-muted-foreground">
                      Av. Principal 123, Centro
                      <br />
                      Ciudad, Estado 12345
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <Phone className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Teléfono</h4>
                    <p className="text-muted-foreground">
                      +52 (555) 123-4567
                      <br />
                      +52 (555) 765-4321
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <Mail className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Email</h4>
                    <p className="text-muted-foreground">
                      info@superarte.com
                      <br />
                      cursos@superarte.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Horarios</h4>
                    <div className="text-muted-foreground space-y-1">
                      <p>Lunes - Viernes: 9:00 - 19:00</p>
                      <p>Sábados: 9:00 - 17:00</p>
                      <p>Domingos: 10:00 - 15:00</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Mapa placeholder */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-0">
                <div className="aspect-video bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-primary mx-auto mb-2" />
                    <p className="text-muted-foreground">Mapa de ubicación</p>
                    <p className="text-sm text-muted-foreground">Av. Principal 123, Centro</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Formulario de contacto */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-foreground">Envíanos un Mensaje</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Nombre *
                    </label>
                    <Input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="Tu nombre completo"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email *
                    </label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                      Teléfono
                    </label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="+52 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <label htmlFor="inquiry-type" className="block text-sm font-medium text-foreground mb-2">
                      Tipo de Consulta *
                    </label>
                    <Select
                      value={formData.inquiryType}
                      onValueChange={(value) => handleInputChange("inquiryType", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una opción" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="productos">Consulta sobre productos</SelectItem>
                        <SelectItem value="cursos">Información sobre cursos</SelectItem>
                        <SelectItem value="cotizacion">Solicitar cotización</SelectItem>
                        <SelectItem value="soporte">Soporte técnico</SelectItem>
                        <SelectItem value="otro">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Mensaje *
                  </label>
                  <Textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    placeholder="Cuéntanos cómo podemos ayudarte..."
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Enviar Mensaje
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
