import React from 'react'
import { TESTIMONIALS } from '@/config/constants'
import { useTranslation } from '@/hooks/useTranslation'
import { Card } from '@/components/ui/Card'
import { StarRating } from '@/components/ui/StarRating'

// List of vibrant gradients to assign to reviews dynamically
const avatarGradients = [
  'from-primary-500 to-primary-700 text-white',
  'from-gold-500 to-gold-700 text-white',
  'from-rwBlue-500 to-rwBlue-700 text-white',
  'from-purple-500 to-purple-700 text-white',
]

export const TestimonialsSection = () => {
  const { language } = useTranslation()

  return (
    <section className="py-20 bg-white dark:bg-dark-900 border-b border-gray-150 dark:border-dark-400 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 dark:text-gray-100 tracking-tight mb-4">
            {language === 'rw' ? 'Ibyo Abakiriya Bacu Bavuga' : 'What Our Users Say'}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 font-medium">
            Hear from local business owners and customers who use Rwanda Business Connect daily.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((testi, idx) => {
            const gradient = avatarGradients[idx % avatarGradients.length]
            return (
              <Card
                key={testi.id}
                className="flex flex-col justify-between p-6 bg-gray-50/40 dark:bg-dark-900/60 border border-gray-100 dark:border-dark-800 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 rounded-2xl relative"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <StarRating rating={testi.rating} size={12} />
                    <svg className="text-primary-500/15 w-6 h-6 shrink-0 fill-current" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                  <p className="text-xs sm:text-sm italic font-medium text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                    &quot;{language === 'rw' ? testi.textRw : testi.text}&quot;
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-gray-100/60 dark:border-dark-800/60">
                  <div className={`h-10 w-10 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center font-bold text-sm shrink-0 shadow-sm uppercase`}>
                    {testi.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-805 dark:text-gray-100">
                      {testi.name}
                    </h4>
                    <p className="text-[10px] text-gray-400 dark:text-gray-500 font-bold mt-0.5">
                      {testi.role} • {testi.city}
                    </p>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
