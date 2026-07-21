import React from 'react'
import { STATS } from '@/config/constants'
import { useTranslation } from '@/hooks/useTranslation'

export const StatsSection = () => {
  const { language } = useTranslation()

  return (
    <section className="stats-strip py-12 text-white relative overflow-hidden transition-colors border-b border-gray-800">
      <div className="absolute inset-0 bg-black/20" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center text-center p-4 hover:scale-105 transition-all duration-300 animate-count-up"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-2xl mb-3 shadow-md">
                {stat.icon}
              </div>
              <span className="text-3xl sm:text-4xl font-black text-gradient-primary tracking-tight">
                {stat.value}
              </span>
              <span className="text-xs font-bold text-gray-300 mt-1 uppercase tracking-wider">
                {language === 'rw' ? stat.labelRw : stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
