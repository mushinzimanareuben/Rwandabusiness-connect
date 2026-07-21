import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { getBusinesses } from '@/services/businessService'
import { useTranslation } from '@/hooks/useTranslation'
import { useAppStore } from '@/store/useAppStore'
import { CATEGORIES, CITIES, DISTRICTS } from '@/config/constants'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { StarRating } from '@/components/ui/StarRating'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { FiMapPin, FiPhone, FiCheckCircle, FiSearch, FiFilter, FiX } from 'react-icons/fi'

// Realistic fallback demo listings
const defaultBusinesses = [
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
    description: 'Serving all your pharmaceutical and beauty needs at the heart of Kigali.',
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
    description: 'Luxury accommodation and mountain vistas at the gateway to volcanoes.',
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
    description: 'Fine dining experience featuring traditional Rwandan and international cuisines.',
  },
  {
    id: 'demo-4',
    name: 'Rwanda Green Tech Solutions',
    category: 'technology',
    city: 'Rubavu',
    district: 'Rubavu',
    rating: 4.5,
    reviewCount: 18,
    phone: '+250 788 555 666',
    featured: false,
    verified: true,
    coverUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&q=80',
    logoUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&q=80',
    description: 'Leading IT consulting, web development, and network installations in the Western Province.',
  },
  {
    id: 'demo-5',
    name: 'Kigali International School',
    category: 'schools',
    city: 'Kigali',
    district: 'Kicukiro',
    rating: 4.6,
    reviewCount: 27,
    phone: '+250 788 777 888',
    featured: false,
    verified: true,
    coverUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=500&q=80',
    logoUrl: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=100&q=80',
    description: 'Providing world-class curriculum education and state-of-the-art facilities.',
  },
  {
    id: 'demo-6',
    name: 'Huye Coffee Roasters',
    category: 'agriculture',
    city: 'Huye',
    district: 'Huye',
    rating: 4.8,
    reviewCount: 65,
    phone: '+250 788 111 222',
    featured: false,
    verified: false,
    coverUrl: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?w=500&q=80',
    logoUrl: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=100&q=80',
    description: 'Single-origin premium Arabica coffee grown in the Southern highlands.',
  },
]

export const BusinessListPage = () => {
  const { language } = useTranslation()
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [searchParams] = useSearchParams()

  const storeQuery = useAppStore((s) => s.searchQuery)
  const storeCategory = useAppStore((s) => s.searchCategory)
  const storeCity = useAppStore((s) => s.searchCity)
  
  const setStoreQuery = useAppStore((s) => s.setSearchQuery)
  const setStoreCategory = useAppStore((s) => s.setSearchCategory)
  const setStoreCity = useAppStore((s) => s.setSearchCity)

  const [district, setDistrict] = useState('')
  const [businesses, setBusinesses] = useState([])
  const [loading, setLoading] = useState(true)

  // Sync route query params to store if present
  useEffect(() => {
    const qCat = searchParams.get('category')
    if (qCat) setStoreCategory(qCat)
  }, [searchParams, setStoreCategory])

  useEffect(() => {
    const fetch = async () => {
      setLoading(true)
      try {
        const { businesses: fetched } = await getBusinesses({
          category: storeCategory,
          city: storeCity,
          district: district,
        })

        let filtered = fetched.length > 0 ? fetched : defaultBusinesses

        // Apply local filter if mock or fallbacks are used, or for name searches
        if (storeQuery) {
          filtered = filtered.filter((b) =>
            b.name.toLowerCase().includes(storeQuery.toLowerCase()) ||
            b.description?.toLowerCase().includes(storeQuery.toLowerCase())
          )
        }
        if (storeCategory) {
          filtered = filtered.filter((b) => b.category === storeCategory)
        }
        if (storeCity) {
          filtered = filtered.filter((b) => b.city === storeCity)
        }
        if (district) {
          filtered = filtered.filter((b) => b.district === district)
        }

        setBusinesses(filtered)
      } catch (e) {
        console.error(e)
        // Fallback filtering
        let filtered = defaultBusinesses
        if (storeQuery) {
          filtered = filtered.filter((b) =>
            b.name.toLowerCase().includes(storeQuery.toLowerCase())
          )
        }
        if (storeCategory) {
          filtered = filtered.filter((b) => b.category === storeCategory)
        }
        if (storeCity) {
          filtered = filtered.filter((b) => b.city === storeCity)
        }
        setBusinesses(filtered)
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [storeQuery, storeCategory, storeCity, district])

  const clearAllFilters = () => {
    setStoreQuery('')
    setStoreCategory('')
    setStoreCity('')
    setDistrict('')
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-dark-900 transition-colors">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* Search header */}
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white">
              {language === 'rw' ? 'Shakisha Ubucuruzi' : 'Directory Listings'}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              {loading ? 'Loading...' : `${businesses.length} ${businesses.length === 1 ? 'business' : 'businesses'} found across Rwanda`}
            </p>
          </div>
          {/* Mobile filter toggle */}
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 dark:border-dark-400 bg-white dark:bg-dark-900 text-sm font-bold text-gray-600 dark:text-gray-300 hover:border-primary-400 transition-all"
          >
            <FiFilter size={14} />
            Filters {storeCategory || storeCity ? '•' : ''}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Sidebar Filters */}
          <div className={`lg:col-span-1 flex flex-col gap-6 ${filtersOpen ? 'block' : 'hidden lg:flex'}`}>
            <Card className="p-6 bg-white dark:bg-dark-900 border border-gray-150 dark:border-dark-400 sticky top-24">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-dark-400 mb-4">
                <h3 className="font-bold text-gray-800 dark:text-gray-200">
                  {language === 'rw' ? 'Zirikana' : 'Filters'}
                </h3>
                <div className="flex items-center gap-3">
                  <button
                    onClick={clearAllFilters}
                    className="text-xs font-bold text-red-500 hover:text-red-600 transition-colors"
                  >
                    Clear All
                  </button>
                  <button
                    onClick={() => setFiltersOpen(false)}
                    className="lg:hidden text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                    aria-label="Close filters"
                  >
                    <FiX size={18} />
                  </button>
                </div>
              </div>

              {/* Filters Form */}
              <div className="space-y-4">
                {/* Search Name */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-1.5">
                    Search Keyword
                  </label>
                  <input
                    type="text"
                    placeholder="Keywords..."
                    value={storeQuery}
                    onChange={(e) => setStoreQuery(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-dark-400 bg-white dark:bg-dark-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                {/* Categories */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-1.5">
                    Category
                  </label>
                  <select
                    value={storeCategory}
                    onChange={(e) => setStoreCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-dark-400 bg-white dark:bg-dark-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer"
                  >
                    <option value="">All Categories</option>
                    {CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {language === 'rw' ? cat.labelRw : cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Cities */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-1.5">
                    City
                  </label>
                  <select
                    value={storeCity}
                    onChange={(e) => setStoreCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-dark-400 bg-white dark:bg-dark-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer"
                  >
                    <option value="">All Cities</option>
                    {CITIES.map((city) => (
                      <option key={city.name} value={city.name}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Districts */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-1.5">
                    District
                  </label>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-dark-400 bg-white dark:bg-dark-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer"
                  >
                    <option value="">All Districts</option>
                    {DISTRICTS.map((dist) => (
                      <option key={dist} value={dist}>
                        {dist}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </Card>
          </div>

          {/* Directory Listings */}
          <div className={filtersOpen ? 'lg:col-span-3' : 'col-span-1 lg:col-span-3'}>
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 4].map((i) => (
                  <div key={i} className="skeleton h-80 rounded-2xl w-full" />
                ))}
              </div>
            ) : businesses.length === 0 ? (
              <Card className="flex flex-col items-center justify-center p-12 text-center border border-gray-150 dark:border-dark-400 bg-white dark:bg-dark-900">
                <span className="text-5xl mb-4">🔍</span>
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                  {language === 'rw' ? 'Nta bisubizo' : 'No Results Found'}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-sm">
                  Try clearing some filters or searching for different keywords.
                </p>
                <Button variant="secondary" className="mt-6" onClick={clearAllFilters}>
                  Clear All Filters
                </Button>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {businesses.map((item) => (
                  <Card
                    key={item.id}
                    hover
                    className="overflow-hidden p-0 flex flex-col h-full bg-white dark:bg-dark-900 border border-gray-150 dark:border-dark-400"
                  >
                    {/* Cover photo */}
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src={item.coverUrl}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4 flex gap-2">
                        {item.featured && <Badge variant="gold">FEATURED</Badge>}
                        {item.verified && (
                          <Badge variant="primary" className="flex items-center gap-0.5">
                            <FiCheckCircle /> VERIFIED
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-1 justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400">
                            {item.category}
                          </span>
                          <div className="flex items-center gap-1.5">
                            <StarRating rating={item.rating} size={14} />
                            <span className="text-xs font-bold text-gray-500 dark:text-gray-400">
                              {item.rating} ({item.reviewCount})
                            </span>
                          </div>
                        </div>

                        <Link to={`/businesses/${item.id}`} className="hover:text-primary-600 block">
                          <h3 className="text-xl font-bold text-gray-850 dark:text-gray-100 truncate mb-1">
                            {item.name}
                          </h3>
                        </Link>

                        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4 font-medium">
                          {item.description}
                        </p>

                        <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                          <FiMapPin size={16} className="text-primary-500 shrink-0" />
                          <span>
                            {item.district}, {item.city}
                          </span>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-gray-100 dark:border-dark-400 flex items-center justify-between mt-6">
                        <span className="text-xs font-semibold text-gray-400 flex items-center gap-1">
                          <FiPhone /> {item.phone}
                        </span>
                        <Link to={`/businesses/${item.id}`}>
                          <Button size="sm" variant="ghost">
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
