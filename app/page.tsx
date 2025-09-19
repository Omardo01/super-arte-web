import { Suspense } from 'react'
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ServicesSection } from "@/components/services-section"
import { CoursesSection } from "@/components/courses-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { AccessDeniedAlert } from "@/components/access-denied-alert"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <Suspense fallback={null}>
        <AccessDeniedAlert />
      </Suspense>
      
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
