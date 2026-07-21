import React from 'react'
import { useNavigate } from 'react-router-dom'
import { CITIES } from '@/config/constants'
import { useTranslation } from '@/hooks/useTranslation'
import { useAppStore } from '@/store/useAppStore'
import { Card } from '@/components/ui/Card'

// Unsplash images representing cities
const cityImages = {
  Kigali: 'https://images.unsplash.com/photo-1588615419957-e9a038f7122a?w=600&q=80',
  Musanze: 'https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?w=600&q=80',
  Rubavu: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&q=80',
  Huye: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80',
}

export const PopularCities = () => {
  const { language } = useTranslation()
  const navigate = useNavigate()
  const setSearchCity = useAppStore((s) => s.setSearchCity)

  const handleCityClick = (cityName) => {
    setSearchCity(cityName)
    navigate('/businesses')
  }

  // Use first 4 cities for layout
  const displayedCities = CITIES.slice(0, 4)

  return (
    <section className="py-20 bg-gray-50 dark:bg-dark-900/30 border-b border-gray-100 dark:border-dark-400 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 dark:text-gray-100 mb-4">
            {language === 'rw' ? 'Imijyi Ikunzwe cyane' : 'Explore Popular Cities'}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 font-medium">
            Find services, shops, and places of interest in Rwanda&apos;s major hubs.
          </p>
        </div>

        {/* Cities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedCities.map((city) => {
            const img = cityImages[city.name] || 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=80'
            return (
              <div
                key={city.name}
                onClick={() => handleCityClick(city.name)}
                className="relative h-72 rounded-2xl overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Background Image */}
                <img
                  src={img}
                  alt={city.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                {/* Content */}
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h3 className="text-2xl font-black tracking-tight">{city.name}</h3>
                  <p className="text-xs font-semibold text-gray-300 mt-1 uppercase tracking-wider">
                    {city.province}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
