import React from 'react'
import { Link } from 'react-router-dom'
import { PLANS } from '@/config/constants'
import { useTranslation } from '@/hooks/useTranslation'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { FiCheck, FiX, FiZap } from 'react-icons/fi'

export const PricingSection = () => {
  const { language } = useTranslation()

  return (
    <section id="pricing" className="py-20 bg-gray-50 dark:bg-dark-900/30 border-b border-gray-100 dark:border-dark-400 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 dark:text-gray-100 mb-4 tracking-tight">
            {language === 'rw' ? 'Gahunda z\'Igiciro zoroheje' : 'Simple, Transparent Pricing'}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 font-medium">
            Choose the best plan to grow your business visibility and attract more customers across Rwanda.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {PLANS.map((plan) => {
            const isStandard = plan.id === 'standard'
            const isPremium = plan.id === 'premium'

            const cardContent = (
              <Card
                className={`
                  flex flex-col justify-between p-8 rounded-[1.65rem] h-full transition-all duration-300 relative
                  ${isStandard 
                    ? 'bg-white dark:bg-dark-900 border-none'
                    : 'border border-gray-200 dark:border-dark-800 bg-white dark:bg-dark-900/40 shadow-sm'
                  }
                `}
              >
                {plan.popular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-[10px] font-black bg-primary-600 text-white tracking-widest uppercase shadow-md flex items-center gap-1">
                    <FiZap size={10} className="fill-white" />
                    <span>Most Popular</span>
                  </span>
                )}

                <div>
                  <h3 className="text-2xl font-black text-gray-800 dark:text-gray-100 mb-1">
                    {language === 'rw' ? plan.nameRw : plan.name}
                  </h3>
                  
                  {/* Price block */}
                  <div className="flex items-baseline gap-1.5 my-6">
                    {plan.price === 0 ? (
                      <span className="text-4xl font-black text-gray-800 dark:text-gray-100">Free</span>
                    ) : (
                      <>
                        <span className="text-4xl font-black text-gray-800 dark:text-gray-150 tracking-tight">
                          {plan.price.toLocaleString()}
                        </span>
                        <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wide">RWF / mo</span>
                      </>
                    )}
                  </div>

                  <div className="w-full border-t border-gray-100 dark:border-dark-800 my-6" />

                  {/* Features */}
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm font-semibold">
                        <FiCheck className="text-primary-600 dark:text-primary-400 mt-0.5 shrink-0" size={16} />
                        <span className="text-gray-600 dark:text-gray-300 leading-relaxed">{feat}</span>
                      </li>
                    ))}
                    {plan.limitations?.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm font-semibold opacity-45">
                        <FiX className="text-red-500 mt-0.5 shrink-0" size={16} />
                        <span className="text-gray-400 dark:text-gray-500 line-through leading-relaxed">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Button */}
                <Link to="/register" className="w-full mt-auto">
                  <Button
                    variant={plan.popular ? 'primary' : 'secondary'}
                    className="w-full py-3 rounded-2xl text-xs font-bold uppercase tracking-wider shadow-sm"
                  >
                    Get Started
                  </Button>
                </Link>
              </Card>
            )

            return (
              <div key={plan.id} className={isStandard ? 'shimmer-border-wrapper' : 'h-full'}>
                {cardContent}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
