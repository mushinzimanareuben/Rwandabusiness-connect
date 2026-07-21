import React, { useState, useRef } from 'react'
import { FAQS } from '@/config/constants'
import { useTranslation } from '@/hooks/useTranslation'
import { FiChevronDown, FiHelpCircle } from 'react-icons/fi'

export const FAQSection = () => {
  const { language } = useTranslation()
  const [openIdx, setOpenIdx] = useState(null)

  const toggleFAQ = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx)
  }

  return (
    <section className="py-20 bg-white dark:bg-dark-900 border-b border-gray-100 dark:border-dark-400 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary-50 dark:bg-primary-950/20 mb-4">
            <FiHelpCircle className="text-primary-600 dark:text-primary-400" size={22} />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 dark:text-gray-100 mb-4 tracking-tight">
            {language === 'rw' ? 'Ibibazo Bikunze Kubazwa' : 'Frequently Asked Questions'}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 font-medium max-w-xl mx-auto">
            Find answers to common questions about listing, verification, plans, and payments.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'border-primary-200 dark:border-primary-800/40 bg-white dark:bg-dark-900 shadow-md'
                    : 'border-gray-150 dark:border-dark-400 bg-gray-50/40 dark:bg-dark-900/40'
                }`}
              >
                {/* Header Toggle */}
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full flex items-center justify-between p-5 text-left focus:outline-none group"
                >
                  <span className={`font-bold pr-4 transition-colors duration-200 ${isOpen ? 'text-primary-600 dark:text-primary-400' : 'text-gray-800 dark:text-gray-200 group-hover:text-primary-600 dark:group-hover:text-primary-400'}`}>
                    {language === 'rw' ? faq.qRw : faq.q}
                  </span>
                  <div className={`shrink-0 flex items-center justify-center w-7 h-7 rounded-full transition-all duration-300 ${isOpen ? 'bg-primary-600 text-white rotate-180' : 'bg-gray-100 dark:bg-dark-800 text-gray-400'}`}>
                    <FiChevronDown size={14} />
                  </div>
                </button>

                {/* Body — smooth CSS max-height expand */}
                <div
                  style={{
                    maxHeight: isOpen ? '500px' : '0',
                    opacity: isOpen ? 1 : 0,
                    transition: 'max-height 0.35s ease, opacity 0.25s ease',
                    overflow: 'hidden',
                  }}
                >
                  <div className="px-5 pb-5 pt-1 border-t border-primary-100/60 dark:border-primary-900/30">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 leading-relaxed">
                      {language === 'rw' ? faq.aRw : faq.a}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <p className="text-center text-sm text-gray-400 dark:text-gray-500 mt-10 font-medium">
          Still have questions?{' '}
          <a href="#contact" className="text-primary-600 dark:text-primary-400 font-bold hover:underline">
            Contact our team →
          </a>
        </p>
      </div>
    </section>
  )
}
