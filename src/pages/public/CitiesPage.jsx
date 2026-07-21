import React from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { PopularCities } from '@/components/sections/PopularCities'
import { CITIES } from '@/config/constants'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '@/store/useAppStore'

export const CitiesPage = () => {
  const navigate = useNavigate()
  const setSearchCity = useAppStore((s) => s.setSearchCity)

  const handleCityClick = (cityName) => {
    setSearchCity(cityName)
    navigate('/businesses')
  }

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-dark-900 transition-colors">
      <Navbar />
      <main className="flex-1">
        <div className="py-12 bg-gradient-to-br from-rwBlue-900 via-dark-900 to-black text-white text-center px-4">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-3">Explore Cities</h1>
          <p className="text-gray-300 text-lg font-medium max-w-xl mx-auto">
            Find businesses in Rwanda&apos;s 30 districts across 5 provinces.
          </p>
        </div>
        <PopularCities />

        {/* All districts */}
        <section className="py-16 bg-white dark:bg-dark-900 border-t border-gray-100 dark:border-dark-400">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-extrabold text-gray-800 dark:text-gray-100 mb-8">All Cities & Districts</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {CITIES.map((city) => (
                <button
                  key={city.name}
                  onClick={() => handleCityClick(city.name)}
                  className="text-left p-4 rounded-2xl border border-gray-200 dark:border-dark-700 bg-gray-50 dark:bg-dark-800 hover:border-primary-400 hover:bg-primary-50 dark:hover:bg-primary-950/20 transition-all group"
                >
                  <p className="font-bold text-gray-800 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400">{city.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5 uppercase tracking-wide">{city.province}</p>
                </button>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
