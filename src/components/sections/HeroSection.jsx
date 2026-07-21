import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FiSearch, FiMapPin, FiLayers, FiArrowRight } from 'react-icons/fi'
import { useTranslation } from '@/hooks/useTranslation'
import { useAppStore } from '@/store/useAppStore'
import { CATEGORIES, CITIES } from '@/config/constants'
import { Button } from '@/components/ui/Button'

export const HeroSection = () => {
  const { t, language } = useTranslation()
  const navigate = useNavigate()
  
  const {
    searchQuery,
    searchCategory,
    searchCity,
    setSearchQuery,
    setSearchCategory,
    setSearchCity,
  } = useAppStore()

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    navigate('/businesses')
  }

  return (
    <section className="relative bg-gradient-hero py-24 md:py-36 overflow-hidden flex items-center justify-center">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-20 mix-blend-overlay bg-hero-pattern bg-cover bg-center" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/85" />

      {/* Floating animated decorative glow orbs */}
      <div className="absolute top-1/4 left-1/12 w-64 h-64 rounded-full hero-glow animate-float opacity-70" />
      <div className="absolute bottom-1/4 right-1/12 w-80 h-80 rounded-full hero-glow-blue animate-float opacity-50" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full hero-glow-gold opacity-30 animate-pulse-slow" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Micro-interaction badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary-500/30 bg-primary-950/20 backdrop-blur-md mb-8 animate-pulse-slow">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary-500"></span>
          </span>
          <span className="text-[10px] font-bold text-primary-400 uppercase tracking-widest leading-none">
            {language === 'rw' ? "Ibibitse by'ubucuruzi bya mbere" : "Rwanda's #1 Digital Marketplace"}
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight max-w-4xl tracking-tight mb-6 animate-fade-up">
          {t('hero.title')}
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mb-12 animate-fade-up font-medium leading-relaxed" style={{ animationDelay: '100ms' }}>
          {t('hero.subtitle')}
        </p>

        {/* Search Engine Form */}
        <form
          onSubmit={handleSearchSubmit}
          className="w-full max-w-4xl p-3 bg-white/10 dark:bg-dark-900/30 backdrop-blur-2xl border border-white/15 dark:border-white/5 rounded-2xl md:rounded-full shadow-2xl flex flex-col md:flex-row items-center gap-3 animate-fade-up"
          style={{ animationDelay: '200ms' }}
        >
          {/* Query Input */}
          <div className="w-full flex items-center gap-2.5 px-3 py-2 border-b md:border-b-0 md:border-r border-white/10">
            <FiSearch className="text-primary-405 shrink-0" size={18} />
            <input
              type="text"
              placeholder={t('hero.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-none text-white placeholder-gray-400 focus:outline-none text-xs font-semibold"
            />
          </div>

          {/* Category Dropdown */}
          <div className="w-full flex items-center gap-2.5 px-3 py-2 border-b md:border-b-0 md:border-r border-white/10">
            <FiLayers className="text-primary-405 shrink-0" size={18} />
            <select
              value={searchCategory}
              onChange={(e) => setSearchCategory(e.target.value)}
              className="w-full bg-transparent border-none text-white focus:outline-none text-xs font-semibold cursor-pointer [&>option]:text-gray-800"
            >
              <option value="">{language === 'rw' ? 'Hitamo Inzego' : 'All Categories'}</option>
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {language === 'rw' ? cat.labelRw : cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* City Dropdown */}
          <div className="w-full flex items-center gap-2.5 px-3 py-2">
            <FiMapPin className="text-primary-405 shrink-0" size={18} />
            <select
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
              className="w-full bg-transparent border-none text-white focus:outline-none text-xs font-semibold cursor-pointer [&>option]:text-gray-800"
            >
              <option value="">{language === 'rw' ? 'Muri Rurema' : 'All Cities'}</option>
              {CITIES.map((city) => (
                <option key={city.name} value={city.name}>
                  {city.name} ({city.province})
                </option>
              ))}
            </select>
          </div>

          {/* Search Button */}
          <Button
            type="submit"
            className="w-full md:w-auto md:px-8 py-3 rounded-xl md:rounded-full shrink-0 shadow-lg shadow-primary-600/30 flex items-center justify-center gap-1.5"
          >
            <span>{t('hero.searchButton')}</span>
            <FiArrowRight size={14} />
          </Button>
        </form>

        {/* Counter stats (quick glance overview) */}
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mt-12 text-gray-350 text-xs font-semibold animate-fade-up" style={{ animationDelay: '300ms' }}>
          <div>🏢 <span className="text-white font-bold">5,000+</span> Listings</div>
          <div className="h-3 w-px bg-white/20 hidden sm:block" />
          <div>📍 <span className="text-white font-bold">30</span> Districts</div>
          <div className="h-3 w-px bg-white/20 hidden sm:block" />
          <div>👥 <span className="text-white font-bold">50,000+</span> Monthly Hits</div>
        </div>
      </div>
    </section>
  )
}
