import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { StarRating } from '@/components/ui/StarRating'
import { CATEGORIES } from '@/config/constants'
import { FiSearch, FiMapPin, FiHeart, FiLayers, FiCompass, FiCalendar, FiClock, FiCheckCircle, FiAlertCircle } from 'react-icons/fi'
import { useTranslation } from '@/hooks/useTranslation'
import { useAppStore } from '@/store/useAppStore'
import { useAuth } from '@/contexts/AuthContext'
import { getUserBookings } from '@/services/bookingService'

const recommended = [
  { id: 'r-1', name: 'Kigali Serena Hotel', category: 'hotels', city: 'Kigali', rating: 4.9, reviewCount: 142, coverUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80' },
  { id: 'r-2', name: 'Heaven Restaurant', category: 'restaurants', city: 'Kigali', rating: 4.8, reviewCount: 96, coverUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=80' },
  { id: 'r-3', name: 'Rwanda Coding Academy', category: 'schools', city: 'Kigali', rating: 4.7, reviewCount: 45, coverUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&q=80' },
  { id: 'r-4', name: 'Ubumwe Grande Hotel', category: 'hotels', city: 'Kigali', rating: 4.6, reviewCount: 88, coverUrl: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=400&q=80' },
  { id: 'r-5', name: 'Pharmacy Plus Remera', category: 'pharmacies', city: 'Kigali', rating: 4.5, reviewCount: 23, coverUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&q=80' },
  { id: 'r-6', name: 'Gorilla Highlands Trek', category: 'tourism', city: 'Musanze', rating: 5.0, reviewCount: 19, coverUrl: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=400&q=80' },
]

export const VisitorDashboard = () => {
  const { language } = useTranslation()
  const { currentUser } = useAuth()
  const navigate = useNavigate()
  const { searchQuery, setSearchQuery, setSearchCategory } = useAppStore()
  const [q, setQ] = useState('')
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    const fetchBks = async () => {
      const bks = await getUserBookings(currentUser?.uid, currentUser?.email)
      setBookings(bks)
    }
    fetchBks()
  }, [currentUser])

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    setSearchQuery(q)
    navigate('/businesses')
  }

  const handleCatClick = (catId) => {
    setSearchCategory(catId)
    navigate('/businesses')
  }

  return (
    <div className="space-y-10">
      {/* Welcome Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-hero p-8 sm:p-12 text-white">
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full hero-glow opacity-30 animate-float" />
        <div className="relative z-10 max-w-xl space-y-4">
          <Badge variant="primary" className="bg-primary-600/30 text-primary-200 border-none font-bold py-1 px-3">
            Rwanda&apos;s Premier Directory
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Discover Businesses Across Rwanda
          </h1>
          <p className="text-gray-300 font-medium">
            Search top rated services, verified listings, hotels, schools and professional freelancers in your local district.
          </p>

          <form onSubmit={handleSearchSubmit} className="pt-2 flex items-center gap-2 max-w-md">
            <div className="relative flex-1">
              <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="What are you looking for?"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="w-full bg-white dark:bg-dark-800 text-gray-800 dark:text-white pl-10 pr-4 py-2.5 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-primary-500 font-semibold text-xs shadow-md"
              />
            </div>
            <Button type="submit" size="sm" className="py-2.5 shadow-md">
              Search
            </Button>
          </form>
        </div>
      </div>

      {/* Popular Categories */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <FiLayers className="text-primary-500" size={20} />
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Popular Categories</h2>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-thin">
          {CATEGORIES.slice(0, 8).map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCatClick(cat.id)}
              className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white dark:bg-dark-900 border border-gray-100 dark:border-dark-800 hover:border-primary-500 dark:hover:border-primary-500 hover:shadow-sm shrink-0 transition-all active:scale-95 text-xs font-bold"
            >
              <span className="text-lg">{cat.icon}</span>
              <span className="text-gray-700 dark:text-gray-250">{language === 'rw' ? cat.labelRw : cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* My Bookings & Reservations Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FiCalendar className="text-primary-500" size={20} />
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">My Bookings & Reservations</h2>
          </div>
          <span className="text-xs font-bold text-gray-400">
            {bookings.length} {bookings.length === 1 ? 'Booking' : 'Bookings'}
          </span>
        </div>

        {bookings.length === 0 ? (
          <Card className="p-6 text-center bg-white dark:bg-dark-900 border border-gray-100 dark:border-dark-400">
            <FiCalendar className="mx-auto text-gray-300 dark:text-gray-600 mb-2" size={32} />
            <p className="text-sm font-semibold text-gray-500">You have no active bookings yet.</p>
            <p className="text-xs text-gray-400 mt-1">Browse hotels, restaurants, or services to place your first reservation!</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bookings.map((bk) => (
              <Card key={bk.id} className="p-5 bg-white dark:bg-dark-900 border border-gray-150 dark:border-dark-400 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="px-2 py-0.5 rounded-full text-2xs font-extrabold bg-primary-100 dark:bg-primary-950/40 text-primary-600 uppercase tracking-wider">
                      {bk.refCode || '#RBC'}
                    </span>
                    <h3 className="font-bold text-base text-gray-850 dark:text-white mt-1">
                      {bk.businessName}
                    </h3>
                    <p className="text-2xs text-gray-400 font-semibold">{bk.serviceType}</p>
                  </div>
                  <Badge variant={bk.status === 'confirmed' ? 'success' : bk.status === 'cancelled' ? 'danger' : 'warning'}>
                    {bk.status ? bk.status.toUpperCase() : 'PENDING'}
                  </Badge>
                </div>

                <div className="pt-2 border-t border-gray-100 dark:border-dark-800 flex items-center justify-between text-xs font-semibold text-gray-600 dark:text-gray-300">
                  <div className="flex items-center gap-1.5">
                    <FiCalendar className="text-primary-500" />
                    <span>{bk.bookingDate} at {bk.bookingTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>{bk.guests} {bk.guests === 1 ? 'Guest' : 'Guests'}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Recommended Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FiCompass className="text-primary-500" size={20} />
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Recommended for You</h2>
          </div>
          <Link to="/businesses" className="text-xs font-bold text-primary-600 hover:underline">
            Explore All
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommended.map((item) => (
            <Card key={item.id} hover className="overflow-hidden p-0 bg-white dark:bg-dark-900 border border-gray-100 dark:border-dark-400 flex flex-col h-full shadow-sm">
              <div className="relative h-40 w-full overflow-hidden bg-gray-100">
                <img src={item.coverUrl} alt={item.name} className="w-full h-full object-cover transition-transform duration-350 hover:scale-105" />
                <button className="absolute top-3 right-3 p-1.5 rounded-full bg-black/40 text-white backdrop-blur-md hover:bg-red-500 hover:text-white transition-all">
                  <FiHeart size={14} />
                </button>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-primary-600 dark:text-primary-400 uppercase tracking-wider block mb-1">
                    {item.category}
                  </span>
                  <Link to={`/businesses/${item.id}`} className="hover:text-primary-600 transition-colors">
                    <h3 className="font-bold text-sm text-gray-805 dark:text-gray-100 line-clamp-1">{item.name}</h3>
                  </Link>
                  <p className="text-2xs text-gray-400 font-semibold flex items-center gap-1 mt-1">
                    <FiMapPin /> {item.city}, Rwanda
                  </p>
                </div>
                <div className="pt-3 border-t border-gray-100 dark:border-dark-800 flex items-center justify-between mt-4">
                  <div className="flex items-center gap-1">
                    <StarRating rating={item.rating} size={11} />
                    <span className="text-2xs font-bold text-gray-500 dark:text-gray-300">({item.reviewCount || 10})</span>
                  </div>
                  <Link to={`/businesses/${item.id}`}>
                    <Button size="xs" variant="ghost" className="text-2xs px-2 py-1">
                      Details
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
