import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Image src="/logo-super-arte.png" alt="Super Arte Logo" width={60} height={20} className="h-8 w-auto" />
              <span className="text-2xl font-bold text-black">Super Arte</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Tu tienda especializada en artículos para todo tipo de arte. Inspirando creatividad desde 2015.
            </p>
            <div className="flex space-x-2">
              <Button size="icon" variant="ghost" className="hover:text-primary">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost" className="hover:text-secondary">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost" className="hover:text-accent">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost" className="hover:text-primary">
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#inicio" className="text-muted-foreground hover:text-primary transition-colors">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#quienes-somos" className="text-muted-foreground hover:text-primary transition-colors">
                  Quiénes Somos
                </a>
              </li>
              <li>
                <a href="#servicios" className="text-muted-foreground hover:text-primary transition-colors">
                  Servicios
                </a>
              </li>
              <li>
                <a href="#cursos" className="text-muted-foreground hover:text-primary transition-colors">
                  Cursos
                </a>
              </li>
              <li>
                <a href="#contacto" className="text-muted-foreground hover:text-primary transition-colors">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Productos */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Productos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-secondary transition-colors">
                  Pintura y Dibujo
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-secondary transition-colors">
                  Manualidades
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-secondary transition-colors">
                  Arte Digital
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-secondary transition-colors">
                  Kits Completos
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-secondary transition-colors">
                  Ofertas Especiales
                </a>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Contacto</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Av. Principal 123, Centro</li>
              <li>Ciudad, Estado 12345</li>
              <li>+52 (555) 123-4567</li>
              <li>info@superarte.com</li>
            </ul>
            <div className="mt-4">
              <h4 className="font-medium text-foreground mb-2">Horarios</h4>
              <p className="text-xs text-muted-foreground">
                Lun-Vie: 9:00-19:00
                <br />
                Sáb: 9:00-17:00
                <br />
                Dom: 10:00-15:00
              </p>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">© 2025 Super Arte. Todos los derechos reservados.</p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Política de Privacidad
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Términos de Servicio
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
