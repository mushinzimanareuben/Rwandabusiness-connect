import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getBusiness, incrementStat } from '@/services/businessService'
import { getReviews, addReview } from '@/services/reviewService'
import { useAuth } from '@/contexts/AuthContext'
import { useTranslation } from '@/hooks/useTranslation'
import { StarRating } from '@/components/ui/StarRating'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import {
  FiMapPin, FiPhone, FiMail, FiGlobe, FiCheckCircle, FiShare2, FiClock,
  FiMessageSquare, FiAlertCircle
} from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import toast from 'react-hot-toast'

// Mock fallback detail data
const mockDetail = {
  name: 'Virunga Inn Resort & Spa',
  category: 'hotels',
  description: 'Nestled in the foothills of the magnificent Volcanoes National Park, Virunga Inn offers high-end luxury accommodation, massage treatment rooms, gourmet dining, and guided trekking packages. Experience Rwanda in luxury, style, and peace.',
  city: 'Musanze',
  district: 'Musanze',
  sector: 'Kinigi',
  phone: '+250 788 987 654',
  whatsapp: '+250 788 987 654',
  email: 'info@virungainn.rw',
  website: 'https://virungainn.rw',
  address: 'Kinigi Road, Musanze',
  featured: true,
  verified: true,
  premium: true,
  rating: 4.9,
  reviewCount: 3,
  logoUrl: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=150&q=80',
  coverUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1000&q=80',
  gallery: [
    'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=600&q=80',
    'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80',
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80',
  ],
  openingHours: {
    monday: { open: '08:00', close: '22:00', closed: false },
    tuesday: { open: '08:00', close: '22:00', closed: false },
    wednesday: { open: '08:00', close: '22:00', closed: false },
    thursday: { open: '08:00', close: '22:00', closed: false },
    friday: { open: '08:00', close: '22:00', closed: false },
    saturday: { open: '09:00', close: '23:00', closed: false },
    sunday: { open: '09:00', close: '21:00', closed: false },
  },
}

const mockReviews = [
  { id: 'rev-1', displayName: 'Manzi Eric', rating: 5, comment: 'Exceptional service and beautiful views of the mountains. Highly recommend!', createdAt: { seconds: 1783382400 } },
  { id: 'rev-2', displayName: 'Mutoni Alice', rating: 5, comment: 'The food at the restaurant was absolute perfection. Beautiful spa rooms.', createdAt: { seconds: 1783296000 } },
  { id: 'rev-3', displayName: 'Karemera Bruce', rating: 4, comment: 'Great place but parking could be slightly larger. Staff is super friendly.', createdAt: { seconds: 1783123200 } },
]

export const BusinessDetailPage = () => {
  const { id } = useParams()
  const { language } = useTranslation()
  const { currentUser } = useAuth()

  const [business, setBusiness] = useState(null)
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  // Review Form
  const [newRating, setNewRating] = useState(5)
  const [newComment, setNewComment] = useState('')
  const [submittingReview, setSubmittingReview] = useState(false)

  // Photo Selector
  const [selectedPhoto, setSelectedPhoto] = useState('')

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const data = await getBusiness(id)
        if (data) {
          setBusiness(data)
          setSelectedPhoto(data.coverUrl)
          // Increment views
          await incrementStat(id, 'views')
        } else {
          // Fallback mockup
          setBusiness(mockDetail)
          setSelectedPhoto(mockDetail.coverUrl)
        }

        const revs = await getReviews(id)
        setReviews(revs.length > 0 ? revs : mockReviews)
      } catch (e) {
        console.warn('Firestore failed, using fallbacks', e)
        setBusiness(mockDetail)
        setSelectedPhoto(mockDetail.coverUrl)
        setReviews(mockReviews)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  const handleCTA = async (field) => {
    try {
      if (business.id && !business.id.startsWith('demo-')) {
        await incrementStat(business.id, field)
      }
    } catch (e) {
      console.warn('Stat increment failed', e)
    }
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: business.name,
        text: business.description,
        url: window.location.href,
      }).catch(console.error)
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast.success('Link copied to clipboard!')
    }
    handleCTA('clicks')
  }

  const handleSubmitReview = async (e) => {
    e.preventDefault()
    if (!currentUser) {
      toast.error('You must be signed in to submit a review.')
      return
    }

    setSubmittingReview(true)
    try {
      const reviewData = {
        rating: newRating,
        comment: newComment,
        displayName: currentUser.displayName || currentUser.email,
        photoURL: currentUser.photoURL || '',
      }

      if (business.id && !business.id.startsWith('demo-')) {
        await addReview(business.id, currentUser.uid, reviewData)
      }

      setReviews([{ id: Date.now().toString(), ...reviewData, createdAt: { seconds: Date.now() / 1000 } }, ...reviews])
      setNewComment('')
      toast.success('Review submitted successfully!')
    } catch (err) {
      console.error(err)
      toast.error('Failed to submit review.')
    } finally {
      setSubmittingReview(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-900">
        <div className="skeleton w-full max-w-4xl h-[70vh] rounded-3xl" />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-dark-900 transition-colors">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* Main Cover Section */}
        <div className="relative rounded-3xl overflow-hidden h-[300px] md:h-[450px] shadow-lg mb-8">
          <img
            src={selectedPhoto}
            alt={business.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Heading overlays */}
          <div className="absolute bottom-8 left-8 right-8 text-white flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary-600/90 text-white uppercase tracking-wider">
                  {business.category}
                </span>
                {business.featured && <Badge variant="gold">FEATURED</Badge>}
                {business.verified && <Badge variant="primary" className="flex items-center gap-0.5"><FiCheckCircle /> VERIFIED</Badge>}
              </div>

              <h1 className="text-3xl md:text-5xl font-black tracking-tight">{business.name}</h1>
              
              <div className="flex items-center gap-2 mt-3 text-sm text-gray-300">
                <FiMapPin className="text-primary-500 shrink-0" />
                <span>{business.address}, {business.sector}, {business.district}, {business.city}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleShare}
                className="p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/25 active:scale-95 transition-all"
                title="Share listing"
              >
                <FiShare2 size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Description & Gallery & Reviews */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <Card className="bg-white dark:bg-dark-900 border border-gray-150 dark:border-dark-400">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                Description
              </h2>
              <p className="text-gray-600 dark:text-gray-350 leading-relaxed font-medium">
                {business.description}
              </p>
            </Card>

            {/* Gallery Lightbox */}
            {business.gallery && business.gallery.length > 0 && (
              <Card className="bg-white dark:bg-dark-900 border border-gray-150 dark:border-dark-400">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                  Photo Gallery
                </h2>
                <div className="grid grid-cols-3 gap-3">
                  <div
                    onClick={() => setSelectedPhoto(business.coverUrl)}
                    className={`h-24 rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${
                      selectedPhoto === business.coverUrl ? 'border-primary-500 scale-95' : 'border-transparent hover:scale-98'
                    }`}
                  >
                    <img src={business.coverUrl} alt="Cover" className="w-full h-full object-cover" />
                  </div>
                  {business.gallery.map((url, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedPhoto(url)}
                      className={`h-24 rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${
                        selectedPhoto === url ? 'border-primary-500 scale-95' : 'border-transparent hover:scale-98'
                    }`}
                    >
                      <img src={url} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Review Section */}
            <Card className="bg-white dark:bg-dark-900 border border-gray-150 dark:border-dark-400">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-dark-400 mb-6">
                <h2 className="text-2xl font-bold text-gray-850 dark:text-gray-100">
                  Reviews & Ratings ({reviews.length})
                </h2>
                <div className="flex items-center gap-1.5 bg-primary-50 dark:bg-primary-950/20 px-3 py-1.5 rounded-xl border border-primary-100 dark:border-primary-900/40">
                  <StarRating rating={business.rating} size={16} />
                  <span className="text-sm font-extrabold text-primary-600 dark:text-primary-400">{business.rating}</span>
                </div>
              </div>

              {/* Submit Review Form */}
              {currentUser ? (
                <form onSubmit={handleSubmitReview} className="mb-8 p-5 bg-gray-50 dark:bg-dark-800/25 border border-gray-150 dark:border-dark-400 rounded-2xl space-y-4">
                  <h3 className="font-bold text-gray-800 dark:text-gray-250">Write a Review</h3>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-1">
                      Your Rating
                    </label>
                    <StarRating rating={newRating} onRatingChange={setNewRating} interactive size={24} />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-1.5">
                      Review Content
                    </label>
                    <textarea
                      placeholder="Share your experience with this business..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      required
                      rows={3}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-dark-400 bg-white dark:bg-dark-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none text-gray-800 dark:text-gray-200"
                    />
                  </div>
                  <Button type="submit" size="sm" isLoading={submittingReview}>
                    Submit Review
                  </Button>
                </form>
              ) : (
                <div className="flex items-center gap-2.5 p-4 rounded-xl border border-gray-200 dark:border-dark-400 bg-gray-50 dark:bg-dark-800/30 text-gray-500 dark:text-gray-450 mb-8 text-sm">
                  <FiAlertCircle size={18} />
                  <span>
                    You must{' '}
                    <Link to="/login" className="text-primary-600 font-bold hover:underline">
                      login
                    </Link>{' '}
                    to leave a review.
                  </span>
                </div>
              )}

              {/* Reviews List */}
              <div className="space-y-4">
                {reviews.map((rev) => (
                  <div key={rev.id} className="pb-4 border-b border-gray-100 dark:border-dark-400 last:border-b-0 last:pb-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2.5">
                        <div className="h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-950/30 text-primary-600 dark:text-primary-400 flex items-center justify-center font-bold text-xs">
                          {rev.displayName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200">{rev.displayName}</h4>
                          <span className="text-2xs text-gray-400">
                            {new Date(rev.createdAt?.seconds * 1000).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <StarRating rating={rev.rating} size={12} />
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-350 font-medium pl-10">
                      {rev.comment}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column: Contact Details & Hours */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <Card className="bg-white dark:bg-dark-900 border border-gray-150 dark:border-dark-400 p-6 flex flex-col gap-3">
              <a
                href={`tel:${business.phone}`}
                onClick={() => handleCTA('clicks')}
                className="w-full"
              >
                <Button className="w-full flex items-center justify-center gap-2 py-3">
                  <FiPhone size={18} />
                  <span>Call Now</span>
                </Button>
              </a>

              {business.whatsapp && (
                <a
                  href={`https://wa.me/${business.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => handleCTA('whatsappClicks')}
                  className="w-full"
                >
                  <Button
                    variant="gold"
                    className="w-full flex items-center justify-center gap-2 py-3 bg-[#25d366] hover:bg-[#20ba56]"
                  >
                    <FaWhatsapp size={20} />
                    <span>WhatsApp Chat</span>
                  </Button>
                </a>
              )}
            </Card>

            {/* Contact Information */}
            <Card className="bg-white dark:bg-dark-900 border border-gray-150 dark:border-dark-400 p-6 space-y-4">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 pb-2 border-b border-gray-100 dark:border-dark-400">
                Contact Information
              </h3>
              
              <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-350">
                <FiPhone className="text-primary-500 shrink-0" size={18} />
                <span className="font-semibold">{business.phone}</span>
              </div>

              {business.email && (
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-350 truncate">
                  <FiMail className="text-primary-500 shrink-0" size={18} />
                  <a href={`mailto:${business.email}`} className="font-semibold hover:text-primary-600">{business.email}</a>
                </div>
              )}

              {business.website && (
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-350">
                  <FiGlobe className="text-primary-500 shrink-0" size={18} />
                  <a href={business.website} target="_blank" rel="noreferrer" className="font-semibold hover:text-primary-600 truncate">{business.website}</a>
                </div>
              )}
            </Card>

            {/* Business Hours */}
            {business.openingHours && (
              <Card className="bg-white dark:bg-dark-900 border border-gray-150 dark:border-dark-400 p-6 space-y-4">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 pb-2 border-b border-gray-100 dark:border-dark-400 flex items-center gap-2">
                  <FiClock className="text-primary-500" />
                  <span>Business Hours</span>
                </h3>

                <div className="space-y-2.5">
                  {Object.entries(business.openingHours).map(([day, hrs]) => (
                    <div key={day} className="flex justify-between items-center text-sm font-semibold text-gray-600 dark:text-gray-350 capitalize">
                      <span>{day}</span>
                      {hrs.closed ? (
                        <span className="text-red-500 font-bold uppercase text-xs">Closed</span>
                      ) : (
                        <span>{hrs.open} - {hrs.close}</span>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
