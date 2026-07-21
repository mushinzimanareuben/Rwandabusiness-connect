import React, { useState } from 'react'
import { useTranslation } from '@/hooks/useTranslation'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'
import { FiPhone, FiMail, FiMapPin, FiMessageSquare } from 'react-icons/fi'
import toast from 'react-hot-toast'

export const ContactSection = () => {
  const { language } = useTranslation()
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      toast.success(language === 'rw' ? 'Ubutumwa bwoherejwe!' : 'Message sent successfully!')
      e.target.reset()
    }, 1500)
  }

  return (
    <section className="py-20 bg-gray-50 dark:bg-dark-900/30 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          {/* Contact Details & Map */}
          <div className="flex flex-col justify-between gap-8">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 dark:text-gray-100 mb-4">
                {language === 'rw' ? 'Twandikire Uyu munsi' : 'Get in Touch'}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 font-medium max-w-md mb-8">
                {language === 'rw'
                  ? 'Ufite ibibazo ku bijyanye no kwishyura, kwamamaza, cyangwa kwemeza ubucuruzi bwawe? Twandikire ubutumwa cyangwa utuvugishe kuri aderesi zacu zikurikira.'
                  : 'Have questions about billing, promotions, or verification? Send us a message or reach out directly using our contact details below.'}
              </p>
              
              <div className="space-y-4 text-sm text-gray-600 dark:text-gray-300 font-semibold mb-8">
                <div className="flex items-start gap-3">
                  <FiMapPin size={20} className="text-primary-500 mt-0.5 shrink-0" />
                  <span>
                    {language === 'rw'
                      ? 'Umudugudu wa Butsure, Akagari ka Kigabiro, Umurenge wa Nyabitekeri, Akarere ka Nyamasheke, Uburengerazuba, Rwanda'
                      : 'Butsure Village, Kigabiro Cell, Nyabitekeri Sector, Nyamasheke District, Western Province, Rwanda'}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <FiPhone size={20} className="text-primary-500 shrink-0" />
                  <a href="tel:+250732415715" className="hover:text-primary-400 transition-colors">
                    +250 732 415 715 (Call)
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <FiMessageSquare size={20} className="text-primary-500 shrink-0" />
                  <a href="https://wa.me/250785037571" target="_blank" rel="noopener noreferrer" className="hover:text-primary-400 transition-colors">
                    +250 785 037 571 (WhatsApp)
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <FiMail size={20} className="text-primary-500 shrink-0" />
                  <a href="mailto:mushinzimanareuben@gmail.com" className="hover:text-primary-400 transition-colors">
                    mushinzimanareuben@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Google Map Embed */}
            <div className="w-full h-80 rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-dark-400">
              <iframe
                title="Kigali Heights Office Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m13!1m3!1d3987.5029310860577!2d30.088629315350352!3d-1.9517376985772392!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca6fa07ffffff%3A0xe54e3d368e21db7c!2sKigali%20Heights!5e0!3m2!1sen!2srw!4v1628771065518!5m2!1sen!2srw"
                className="w-full h-full border-0"
                allowFullScreen=""
                loading="lazy"
              />
            </div>
          </div>

          {/* Contact Form Card */}
          <Card className="p-8 border border-gray-150 dark:border-dark-400 bg-white dark:bg-dark-900/60 shadow-xl flex flex-col justify-center">
            <h3 className="text-2xl font-black text-gray-800 dark:text-gray-100 mb-6">
              {language === 'rw' ? 'Ohereza Ubutumwa' : 'Send us a Message'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label={language === 'rw' ? 'Amazina' : 'Full Name'}
                placeholder="John Doe"
                required
              />
              <Input
                label="Email"
                type="email"
                placeholder="john@example.com"
                required
              />
              <Textarea
                label={language === 'rw' ? 'Ubutumwa' : 'Message'}
                placeholder="How can we help you?"
                required
                rows={5}
              />
              <Button type="submit" className="w-full" isLoading={loading}>
                {language === 'rw' ? 'Ohereza' : 'Submit'}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  )
}
