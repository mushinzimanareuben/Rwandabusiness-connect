import React from 'react'
import { HeroSection } from '@/components/sections/HeroSection'
import { StatsSection } from '@/components/sections/StatsSection'
import { CategoriesSection } from '@/components/sections/CategoriesSection'
import { FeaturedBusinesses } from '@/components/sections/FeaturedBusinesses'
import { PopularCities } from '@/components/sections/PopularCities'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { PricingSection } from '@/components/sections/PricingSection'
import { FAQSection } from '@/components/sections/FAQSection'
import { ContactSection } from '@/components/sections/ContactSection'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

export const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-dark-900 transition-colors">
      <Navbar />
      
      <main className="flex-1">
        <HeroSection />
        <StatsSection />
        <CategoriesSection />
        <FeaturedBusinesses />
        <PopularCities />
        <TestimonialsSection />
        <PricingSection />
        <FAQSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  )
}
