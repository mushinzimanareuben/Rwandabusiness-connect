import React from 'react'
import { useNavigate } from 'react-router-dom'
import { CATEGORIES } from '@/config/constants'
import { useTranslation } from '@/hooks/useTranslation'
import { useAppStore } from '@/store/useAppStore'
import { Card } from '@/components/ui/Card'
import { FiArrowRight } from 'react-icons/fi'

export const CategoriesSection = () => {
  const { language } = useTranslation()
  const navigate = useNavigate()
  const setSearchCategory = useAppStore((s) => s.setSearchCategory)

  const handleCategoryClick = (catId) => {
    setSearchCategory(catId)
    navigate('/businesses')
  }

  return (
    <section className="py-20 bg-gray-50 dark:bg-dark-900/30 border-b border-gray-100 dark:border-dark-400 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div className="max-w-xl">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 dark:text-gray-100 tracking-tight mb-3">
              {language === 'rw' ? 'Shakisha ukurikije inzego' : 'Browse by Category'}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 font-medium text-sm sm:text-base leading-relaxed">
              Select a category to discover local shops, clinics, restaurants, schools, and professional freelancers.
            </p>
          </div>
          <button
            onClick={() => handleCategoryClick('')}
            className="flex items-center gap-1.5 text-sm font-bold text-primary-600 hover:text-primary-700 dark:text-primary-400 shrink-0 group hover:underline"
          >
            <span>View All Categories</span>
            <FiArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {CATEGORIES.map((cat) => (
            <Card
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className="category-card flex flex-col items-center justify-center p-6 text-center cursor-pointer bg-white dark:bg-dark-900 border border-gray-100 dark:border-dark-800 transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 hover:border-primary-500/50 dark:hover:border-primary-500/50 group"
              style={{ '--cat-glow': `${cat.color}35` }}
            >
              <div
                className="cat-icon-bg w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-4 transition-all duration-300"
                style={{ backgroundColor: `${cat.color}12`, color: cat.color }}
              >
                {cat.icon}
              </div>
              <h3 className="font-bold text-xs sm:text-sm text-gray-800 dark:text-gray-250 truncate max-w-full">
                {language === 'rw' ? cat.labelRw : cat.label}
              </h3>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
