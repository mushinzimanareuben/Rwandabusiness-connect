import React from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { CategoriesSection } from '@/components/sections/CategoriesSection'

export const CategoriesPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-dark-900 transition-colors">
      <Navbar />
      <main className="flex-1">
        <div className="py-12 bg-gradient-to-br from-primary-900 via-dark-900 to-black text-white text-center px-4">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-3">Browse Categories</h1>
          <p className="text-gray-300 text-lg font-medium max-w-xl mx-auto">
            Discover businesses across 20 categories in Rwanda&apos;s thriving economy.
          </p>
        </div>
        <CategoriesSection />
      </main>
      <Footer />
    </div>
  )
}
