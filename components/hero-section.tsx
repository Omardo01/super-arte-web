"use client"

import { Button } from "@/components/ui/button"
import { ShimmerButton } from "@/components/ui/shimmer-button"
import TypingAnimation from "@/components/ui/typing-animation"
import WordRotate from "@/components/ui/word-rotate"
import { Palette, Brush, Sparkles, Facebook, Instagram } from "lucide-react"
import { motion } from "framer-motion"

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
      className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/10 py-10 sm:py-12"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div 
            className="mb-8 flex justify-center space-x-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="rounded-full bg-primary/20 p-3"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Palette className="h-8 w-8 text-primary" />
            </motion.div>
            <motion.div 
              className="rounded-full bg-secondary/20 p-3"
              whileHover={{ scale: 1.1, rotate: -5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Brush className="h-8 w-8 text-secondary" />
            </motion.div>
            <motion.div 
              className="rounded-full bg-accent/20 p-3"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Sparkles className="h-8 w-8 text-accent" />
            </motion.div>
          </motion.div>

          <div className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl text-balance">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Bienvenidos a{" "}
            </motion.div>
            <WordRotate
              words={["SUPER ARTE", "TU CREATIVIDAD", "EL ARTE"]}
              className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
            />
          </div>

          <motion.p 
            className="mt-6 text-lg leading-8 text-muted-foreground sm:text-xl text-pretty max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Tu tienda especializada en artículos para manualidades y celebraciones. Desde materiales básicos hasta herramientas
            profesionales, tenemos todo lo que necesitas para dar vida a tu creatividad y acompañarte en tus momentos importantes.
          </motion.p>

          <motion.div 
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg relative overflow-hidden group"
                onClick={() => scrollToSection("servicios")}
              >
                <span className="relative z-10">Explorar Productos</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outline"
                size="lg"
                className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground px-8 py-3 text-lg bg-transparent"
                onClick={() => scrollToSection("cursos")}
              >
                Ver Cursos
              </Button>
            </motion.div>
          </motion.div>

          {/* Social Media Buttons */}
          <motion.div 
            className="mt-8 flex flex-col items-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <p className="text-sm text-muted-foreground font-medium">Síguenos en:</p>
            <div className="flex space-x-3">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button 
                  size="icon" 
                  variant="outline" 
                  className="hover:bg-primary hover:text-primary-foreground border-primary/50 hover:border-primary transition-all" 
                  onClick={() => window.open("https://www.facebook.com/superartevillahermosa", "_blank")}
                >
                  <Facebook className="h-5 w-5" />
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button 
                  size="icon" 
                  variant="outline" 
                  className="hover:bg-secondary hover:text-secondary-foreground border-secondary/50 hover:border-secondary transition-all" 
                  onClick={() => window.open("https://www.instagram.com/superarte_villahermosa", "_blank")}
                >
                  <Instagram className="h-5 w-5" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
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
