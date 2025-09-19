"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Settings } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useAuth } from "@/hooks/useAuth"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { userProfile, signOut, isAdmin } = useAuth()

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  const handleLogout = async () => {
    try {
      await signOut()
      console.log('Usuario desconectado exitosamente')
      // La redirección se maneja automáticamente por el hook useAuth
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center space-x-3">
            <Image src="/logo-super-arte.png" alt="Super Arte Logo" width={180} height={60} className="h-16 w-auto rounded-lg" />
            <span className="text-3xl font-bold text-black font-mono">Super Arte</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("inicio")}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Inicio
            </button>
            <button
              onClick={() => scrollToSection("quienes-somos")}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Quiénes Somos
            </button>
            <button
              onClick={() => scrollToSection("servicios")}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Servicios
            </button>
            <button
              onClick={() => scrollToSection("cursos")}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Cursos
            </button>
            <button
              onClick={() => scrollToSection("contacto")}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Contacto
            </button>
            {/* Botón de Admin - Solo visible para administradores */}
            {isAdmin && (
              <Link href="/admin">
                <Button variant="outline" size="sm" className="ml-4 border-green-300 text-green-700 hover:bg-green-50">
                  <Settings className="h-4 w-4 mr-2" />
                  Panel Admin
                </Button>
              </Link>
            )}
            
            {/* Botones de login/logout */}
            {userProfile ? (
              <Button 
                variant="outline" 
                size="sm" 
                className="ml-2 border-red-300 text-red-700 hover:bg-red-50"
                onClick={handleLogout}
              >
                Cerrar Sesión ({userProfile.nombre || userProfile.email})
              </Button>
            ) : (
              <Link href="/auth/login">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="ml-2 border-blue-300 text-blue-700 hover:bg-blue-50"
                >
                  Iniciar Sesión
                </Button>
              </Link>
            )}
          </nav>

          {/* Mobile menu button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-background border-t">
              <button
                onClick={() => scrollToSection("inicio")}
                className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary transition-colors w-full text-left"
              >
                Inicio
              </button>
              <button
                onClick={() => scrollToSection("quienes-somos")}
                className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary transition-colors w-full text-left"
              >
                Quiénes Somos
              </button>
              <button
                onClick={() => scrollToSection("servicios")}
                className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary transition-colors w-full text-left"
              >
                Servicios
              </button>
              <button
                onClick={() => scrollToSection("cursos")}
                className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary transition-colors w-full text-left"
              >
                Cursos
              </button>
              <button
                onClick={() => scrollToSection("contacto")}
                className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary transition-colors w-full text-left"
              >
                Contacto
              </button>
              {/* Botón de Admin móvil - Solo visible para administradores */}
              {isAdmin && (
                <Link href="/admin" className="block px-3 py-2">
                  <Button variant="outline" size="sm" className="w-full border-green-300 text-green-700 hover:bg-green-50">
                    <Settings className="h-4 w-4 mr-2" />
                    Panel Admin
                  </Button>
                </Link>
              )}
              
              {/* Botones de login/logout móvil */}
              {userProfile ? (
                <div className="block px-3 py-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full border-red-300 text-red-700 hover:bg-red-50"
                    onClick={handleLogout}
                  >
                    Cerrar Sesión ({userProfile.nombre || userProfile.email})
                  </Button>
                </div>
              ) : (
                <Link href="/auth/login" className="block px-3 py-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full border-blue-300 text-blue-700 hover:bg-blue-50"
                  >
                    Iniciar Sesión
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
