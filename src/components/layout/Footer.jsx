import React from 'react'
import { Link } from 'react-router-dom'
import { FiFacebook, FiInstagram, FiTwitter, FiLinkedin, FiGlobe, FiPhone, FiMail, FiMapPin, FiMessageSquare } from 'react-icons/fi'
import { useTranslation } from '@/hooks/useTranslation'
import { useAppStore } from '@/store/useAppStore'
import { CATEGORIES } from '@/config/constants'

export const Footer = () => {
  const { t, language } = useTranslation()
  const { setLanguage } = useAppStore()

  const toggleLanguage = (lang) => {
    setLanguage(lang)
  }

  // Get a few popular categories
  const footerCategories = CATEGORIES.slice(0, 5)

  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Logo & Description */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-3xl font-black tracking-tight text-gradient-primary">
                RBC
              </span>
              <span className="text-xl font-bold text-white">
                Rwanda Business Connect
              </span>
            </Link>
            <p className="text-sm text-gray-400">
              The leading digital platform connecting local businesses, schools, pharmacies, restaurants, and hotels with customers across Rwanda&apos;s 30 districts.
            </p>
            {/* Language Switcher */}
            <div className="flex items-center gap-2 mt-2">
              <button
                onClick={() => toggleLanguage('en')}
                className={`px-3 py-1 rounded-lg text-xs font-bold border transition-all ${
                  language === 'en'
                    ? 'bg-primary-600 text-white border-primary-600'
                    : 'bg-transparent text-gray-400 border-gray-700 hover:text-white hover:border-gray-500'
                }`}
              >
                ENGLISH
              </button>
              <button
                onClick={() => toggleLanguage('rw')}
                className={`px-3 py-1 rounded-lg text-xs font-bold border transition-all ${
                  language === 'rw'
                    ? 'bg-primary-600 text-white border-primary-600'
                    : 'bg-transparent text-gray-400 border-gray-700 hover:text-white hover:border-gray-500'
                }`}
              >
                KINYARWANDA
              </button>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-base font-bold text-white mb-4 uppercase tracking-wider">
              {language === 'rw' ? 'Inzego zikunzwe' : 'Popular Categories'}
            </h4>
            <ul className="space-y-2.5 text-sm">
              {footerCategories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/businesses?category=${cat.id}`}
                    className="hover:text-primary-400 transition-colors flex items-center gap-1.5"
                  >
                    <span>{cat.icon}</span>
                    <span>{language === 'rw' ? cat.labelRw : cat.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base font-bold text-white mb-4 uppercase tracking-wider">
              {language === 'rw' ? 'Impuruza zihuse' : 'Quick Links'}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/businesses" className="hover:text-primary-400 transition-colors">
                  {language === 'rw' ? 'Reba Ubucuruzi Byose' : 'Browse Directory'}
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-primary-400 transition-colors">
                  {language === 'rw' ? 'Igiciro & Gahunda' : 'Pricing & Subscription'}
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-primary-400 transition-colors">
                  {language === 'rw' ? 'Kwiyandikisha' : 'Register Business'}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary-400 transition-colors">
                  {language === 'rw' ? 'Twandikire' : 'Contact Us'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="flex flex-col gap-4 text-sm text-gray-400">
            <h4 className="text-base font-bold text-white uppercase tracking-wider">
              {language === 'rw' ? 'Aho Tuba' : 'Contact RBC'}
            </h4>
            <div className="flex items-start gap-2.5">
              <FiMapPin size={18} className="text-primary-500 mt-0.5 shrink-0" />
              <span>
                {language === 'rw'
                  ? 'Umudugudu wa Butsure, Akagari ka Kigabiro, Umurenge wa Nyabitekeri, Akarere ka Nyamasheke, Uburengerazuba, Rwanda'
                  : 'Butsure Village, Kigabiro Cell, Nyabitekeri Sector, Nyamasheke District, Western Province, Rwanda'}
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <FiPhone size={18} className="text-primary-500 shrink-0" />
              <a href="tel:+250732415715" className="hover:text-primary-400 transition-colors">
                +250 732 415 715 (Call)
              </a>
            </div>
            <div className="flex items-center gap-2.5">
              <FiMessageSquare size={18} className="text-primary-500 shrink-0" />
              <a href="https://wa.me/250785037571" target="_blank" rel="noopener noreferrer" className="hover:text-primary-400 transition-colors">
                +250 785 037 571 (WhatsApp)
              </a>
            </div>
            <div className="flex items-center gap-2.5">
              <FiMail size={18} className="text-primary-500 shrink-0" />
              <a href="mailto:mushinzimanareuben@gmail.com" className="hover:text-primary-400 transition-colors">
                mushinzimanareuben@gmail.com
              </a>
            </div>
            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-2">
              <a
                href="https://facebook.com/mushinzimananorbert"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:text-white hover:bg-primary-600 transition-all"
                title="Facebook"
              >
                <FiFacebook size={18} />
              </a>
              <a
                href="https://instagram.com/mushinzimananorbert"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:text-white hover:bg-primary-600 transition-all"
                title="Instagram"
              >
                <FiInstagram size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Rwanda Business Connect. All rights reserved.</p>
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <a href="#" className="hover:text-gray-300">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
