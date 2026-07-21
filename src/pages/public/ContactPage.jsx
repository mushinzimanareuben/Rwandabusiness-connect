import React from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ContactSection } from '@/components/sections/ContactSection'

export const ContactPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-dark-900 transition-colors">
      <Navbar />
      <main className="flex-1">
        <div className="py-12 bg-gradient-to-br from-primary-900 via-dark-900 to-black text-white text-center px-4">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-3">Get in Touch</h1>
          <p className="text-gray-300 text-lg font-medium max-w-xl mx-auto">
            Have questions or need support? Our team is here to help businesses across Rwanda.
          </p>
        </div>
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
