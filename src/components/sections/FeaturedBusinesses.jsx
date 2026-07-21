import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getBusinesses } from '@/services/businessService'
import { useTranslation } from '@/hooks/useTranslation'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { StarRating } from '@/components/ui/StarRating'
import { Button } from '@/components/ui/Button'
import { FiMapPin, FiPhone, FiCheckCircle, FiChevronRight } from 'react-icons/fi'

// Realistic fallback demo listings
const fallbacks = [
  {
    id: 'demo-1',
    name: 'Kigali Heights Pharmacy',
    category: 'pharmacies',
    city: 'Kigali',
    district: 'Gasabo',
    rating: 4.8,
    reviewCount: 34,
    phone: '+250 788 123 456',
    featured: true,
    verified: true,
    coverUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&q=80',
    logoUrl: 'https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=100&q=80',
  },
  {
    id: 'demo-2',
    name: 'Virunga Inn Resort & Spa',
    category: 'hotels',
    city: 'Musanze',
    district: 'Musanze',
    rating: 4.9,
    reviewCount: 89,
    phone: '+250 788 987 654',
    featured: true,
    verified: true,
    coverUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&q=80',
    logoUrl: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=100&q=80',
  },
  {
    id: 'demo-3',
    name: 'Heaven Restaurant Kigali',
    category: 'restaurants',
    city: 'Kigali',
    district: 'Nyarugenge',
    rating: 4.7,
    reviewCount: 142,
    phone: '+250 788 444 333',
    featured: true,
    verified: true,
    coverUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&q=80',
    logoUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=100&q=80',
  },
]

export const FeaturedBusinesses = () => {
  const { language } = useTranslation()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const { businesses } = await getBusinesses({ featured: true, pageSize: 3 })
        if (businesses.length > 0) {
          setItems(businesses)
        } else {
          setItems(fallbacks)
        }
      } catch (e) {
        console.warn('Firebase query failed, using fallbacks', e)
        setItems(fallbacks)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <section className="py-20 bg-white dark:bg-dark-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 dark:text-gray-100 mb-4 tracking-tight">
              {language === 'rw' ? 'Ibigo Batoranyijwe' : 'Featured Listings'}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 font-medium">
              Top rated verified services and businesses around Rwanda.
            </p>
          </div>
          <Link to="/businesses" className="shrink-0">
            <Button variant="secondary" className="flex items-center gap-1">
              <span>{language === 'rw' ? 'Reba Ubucuruzi Bwose' : 'Browse All Listings'}</span>
              <FiChevronRight />
            </Button>
          </Link>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item) => (
            <Card key={item.id} hover className="overflow-hidden p-0 flex flex-col h-full bg-white dark:bg-dark-900 border border-gray-100 dark:border-dark-800 hover:shadow-card-hover group">
              {/* Cover Photo */}
              <div className="relative h-52 overflow-hidden bg-gray-55">
                <img
                  src={item.coverUrl}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Gradient image overlay */}
                <div className="absolute inset-0 featured-card-img-overlay" />
                
                <div className="absolute top-4 left-4 flex gap-2">
                  {item.featured && <Badge variant="gold" className="shadow-md">SPONSORED</Badge>}
                  {item.verified && (
                    <Badge variant="primary" className="flex items-center gap-0.5 shadow-md">
                      <FiCheckCircle size={10} /> VERIFIED
                    </Badge>
                  )}
                </div>

                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                  <img
                    src={item.logoUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&q=80'}
                    alt="logo"
                    className="w-10 h-10 rounded-xl object-cover border-2 border-white/90 bg-white shadow-md"
                  />
                  <span className="text-white text-xs font-black drop-shadow-md">
                    {item.city}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-primary-650 dark:text-primary-400">
                      {item.category}
                    </span>
                    {/* Rating */}
                    <div className="flex items-center gap-1">
                      <StarRating rating={item.rating} size={11} />
                      <span className="text-[10px] font-bold text-gray-500 dark:text-gray-300">
                        {item.rating} ({item.reviewCount})
                      </span>
                    </div>
                  </div>

                  <Link to={`/businesses/${item.id}`} className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                    <h3 className="text-lg font-bold text-gray-805 dark:text-gray-100 mb-2 truncate leading-tight">
                      {item.name}
                    </h3>
                  </Link>

                  {/* Location Info */}
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-450 dark:text-gray-400 mb-6">
                    <FiMapPin size={13} className="text-primary-500" />
                    <span>{item.district}, {item.city}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 dark:border-dark-800 flex items-center justify-between mt-auto">
                  <span className="text-[11px] font-bold text-gray-400 dark:text-gray-500 flex items-center gap-1">
                    <FiPhone /> {item.phone}
                  </span>
                  <Link to={`/businesses/${item.id}`}>
                    <Button size="xs" variant="ghost" className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider">
                      View details
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
