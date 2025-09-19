'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ServicesSection } from "@/components/services-section"
import { CoursesSection } from "@/components/courses-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield } from 'lucide-react'

export default function HomePage() {
  const [showAccessDenied, setShowAccessDenied] = useState(false)
  const searchParams = useSearchParams()

  useEffect(() => {
    if (searchParams.get('access') === 'denied') {
      setShowAccessDenied(true)
      // Ocultar el mensaje después de 5 segundos
      setTimeout(() => {
        setShowAccessDenied(false)
      }, 5000)
    }
  }, [searchParams])

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Mensaje de acceso denegado */}
      {showAccessDenied && (
        <div className="fixed top-20 left-4 right-4 z-50 max-w-md mx-auto">
          <Alert variant="destructive" className="border-red-300 bg-red-50 shadow-lg">
            <Shield className="h-4 w-4" />
            <AlertDescription className="text-red-800 font-medium">
              <strong>Acceso Denegado:</strong> No tienes permisos de administrador para acceder a esa página.
            </AlertDescription>
          </Alert>
        </div>
      )}
      
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <CoursesSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
