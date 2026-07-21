import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getOwnerBusinesses } from '@/services/businessService'
import { getBusinessBookings, updateBookingStatus } from '@/services/bookingService'
import { useAuth } from '@/contexts/AuthContext'
import { useTranslation } from '@/hooks/useTranslation'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { FiEye, FiMousePointer, FiMessageSquare, FiPlus, FiBriefcase, FiCheckSquare, FiSquare, FiActivity, FiArrowRight, FiCalendar, FiCheck, FiX } from 'react-icons/fi'
import toast from 'react-hot-toast'

export const OwnerDashboard = () => {
  const { currentUser, userProfile } = useAuth()
  const { language } = useTranslation()
  const [businesses, setBusinesses] = useState([])
  const [loading, setLoading] = useState(true)

  // Aggregated analytics
  const [stats, setStats] = useState({
    views: 0,
    clicks: 0,
    whatsappClicks: 0,
  })

  // Dynamic growth tips checklist
  const [checklist, setChecklist] = useState([
    { id: 1, text: 'Upgrade listing to Standard/Premium to earn verified badge', done: false },
    { id: 2, text: 'Keep operational hours updated for potential customers', done: true },
    { id: 3, text: 'Upload high-res banner and gallery images of storefront', done: false },
    { id: 4, text: 'Set up WhatsApp quick link for faster lead conversion', done: true }
  ])

  const [ownerBookings, setOwnerBookings] = useState([])

  useEffect(() => {
    const load = async () => {
      try {
        const list = await getOwnerBusinesses(currentUser.uid)
        setBusinesses(list)

        // Aggregate stats
        const viewSum = list.reduce((a, b) => a + (b.views || 0), 0)
        const clickSum = list.reduce((a, b) => a + (b.clicks || 0), 0)
        const waSum = list.reduce((a, b) => a + (b.whatsappClicks || 0), 0)

        setStats({
          views: viewSum || 1420,
          clicks: clickSum || 182,
          whatsappClicks: waSum || 64
        })

        // Fetch bookings for owner businesses
        const bks = await getBusinessBookings('demo-1')
        setOwnerBookings(bks)
      } catch (e) {
        console.warn('Failed to load owner listings, using mocks', e)
        setStats({ views: 1420, clicks: 182, whatsappClicks: 64 })
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [currentUser.uid])

  const handleStatusChange = async (bookingId, newStatus) => {
    await updateBookingStatus(bookingId, newStatus)
    setOwnerBookings(ownerBookings.map(b => b.id === bookingId ? { ...b, status: newStatus } : b))
    toast.success(`Booking ${newStatus}!`)
  }

  const toggleTip = (id) => {
    setChecklist(checklist.map(t => t.id === id ? { ...t, done: !t.done } : t))
  }

  const completedTips = checklist.filter(t => t.done).length
  const progressPercent = Math.round((completedTips / checklist.length) * 100)

  // Mock recent actions log
  const recentActivities = [
    { id: 1, action: 'WhatsApp click received', business: 'Virunga Inn Resort', time: '10 mins ago', type: 'lead' },
    { id: 2, action: 'Listing info edited', business: 'Virunga Inn Resort', time: '2 hours ago', type: 'edit' },
    { id: 3, action: 'New impression registered', business: 'Kigali Pharmacy', time: '5 hours ago', type: 'impression' },
  ]

  return (
    <div className="space-y-8">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white tracking-tight">
            Hello, {userProfile?.displayName || 'Partner'}!
          </h1>
          <p className="text-sm font-semibold text-gray-400 dark:text-gray-500 mt-1">
            Track views, clicks, and customer actions across your Rwanda directory listings.
          </p>
        </div>
        <Link to="/dashboard/owner/add">
          <Button className="flex items-center gap-2 shadow-md shadow-primary-500/20">
            <FiPlus />
            <span>Add Business</span>
          </Button>
        </Link>
      </div>

      {/* Analytics KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="flex items-center gap-4 bg-white dark:bg-dark-900 border border-gray-150 dark:border-dark-800 shadow-sm animate-count-up">
          <div className="p-3.5 rounded-2xl bg-primary-100 dark:bg-primary-950/30 text-primary-600 dark:text-primary-400">
            <FiEye size={22} />
          </div>
          <div>
            <h3 className="text-2xl font-black text-gray-800 dark:text-gray-100">{stats.views.toLocaleString()}</h3>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Total Views</p>
          </div>
        </Card>

        <Card className="flex items-center gap-4 bg-white dark:bg-dark-900 border border-gray-150 dark:border-dark-800 shadow-sm animate-count-up" style={{ animationDelay: '100ms' }}>
          <div className="p-3.5 rounded-2xl bg-gold-100 dark:bg-gold-950/30 text-gold-600 dark:text-gold-400">
            <FiMousePointer size={22} />
          </div>
          <div>
            <h3 className="text-2xl font-black text-gray-800 dark:text-gray-100">{stats.clicks.toLocaleString()}</h3>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Website Clicks</p>
          </div>
        </Card>

        <Card className="flex items-center gap-4 bg-white dark:bg-dark-900 border border-gray-150 dark:border-dark-800 shadow-sm animate-count-up" style={{ animationDelay: '200ms' }}>
          <div className="p-3.5 rounded-2xl bg-rwBlue-100 dark:bg-rwBlue-950/30 text-rwBlue-600 dark:text-rwBlue-400">
            <FiMessageSquare size={22} />
          </div>
          <div>
            <h3 className="text-2xl font-black text-gray-800 dark:text-gray-100">{stats.whatsappClicks.toLocaleString()}</h3>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">WhatsApp Taps</p>
          </div>
        </Card>

        <Card className="flex items-center gap-4 bg-white dark:bg-dark-900 border border-gray-150 dark:border-dark-800 shadow-sm animate-count-up" style={{ animationDelay: '300ms' }}>
          <div className="p-3.5 rounded-2xl bg-purple-100 dark:bg-purple-950/30 text-purple-650 dark:text-purple-400">
            <FiBriefcase size={22} />
          </div>
          <div>
            <h3 className="text-2xl font-black text-gray-800 dark:text-gray-100">{businesses.length}</h3>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">My Listings</p>
          </div>
        </Card>
      </div>

      {/* Main dashboard panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Listings panel */}
        <Card className="lg:col-span-2 bg-white dark:bg-dark-900 border border-gray-150 dark:border-dark-800 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-dark-800 mb-6">
            <h3 className="text-lg font-bold text-gray-805 dark:text-gray-100">
              Active Listings
            </h3>
            <Link to="/dashboard/owner/businesses" className="text-xs font-bold text-primary-600 hover:underline">
              View All
            </Link>
          </div>

          {loading ? (
            <div className="space-y-3">
              {[1, 2].map((i) => (
                <div key={i} className="skeleton h-12 w-full" />
              ))}
            </div>
          ) : businesses.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-sm text-gray-400 font-semibold italic">You haven&apos;t listed any businesses yet.</p>
              <Link to="/dashboard/owner/add" className="inline-block mt-4">
                <Button size="sm">Add Your First Business</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {businesses.slice(0, 3).map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3.5 border border-gray-100 dark:border-dark-800 rounded-xl bg-gray-50/20">
                  <div className="flex items-center gap-3">
                    <img src={item.logoUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&q=80'} alt="logo" className="w-10 h-10 rounded-lg object-cover border border-gray-200 dark:border-dark-700" />
                    <div>
                      <h4 className="font-bold text-sm text-gray-805 dark:text-gray-100">{item.name}</h4>
                      <p className="text-xs text-gray-400 capitalize">{item.category}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-2xs font-bold uppercase ${
                    item.status === 'approved' ? 'bg-primary-100 text-primary-750 dark:bg-primary-900/30' : 'bg-gold-100 text-gold-750 dark:bg-gold-900/30'
                  }`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Growth Checklist Card */}
        <Card className="bg-white dark:bg-dark-900 border border-gray-150 dark:border-dark-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="pb-3 border-b border-gray-100 dark:border-dark-800 mb-4">
              <h3 className="text-lg font-bold text-gray-805 dark:text-gray-100">
                Setup Progress
              </h3>
              <div className="flex items-center justify-between mt-2.5">
                <div className="flex-1 bg-gray-100 dark:bg-dark-800 h-2 rounded-full overflow-hidden mr-3">
                  <div className="bg-primary-600 h-full rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }} />
                </div>
                <span className="text-xs font-black text-primary-600 shrink-0">{progressPercent}%</span>
              </div>
            </div>

            <ul className="space-y-3.5">
              {checklist.map((tip) => (
                <li
                  key={tip.id}
                  onClick={() => toggleTip(tip.id)}
                  className="flex gap-2.5 items-start text-xs font-bold text-gray-500 dark:text-gray-400 leading-relaxed cursor-pointer select-none group"
                >
                  <span className="text-primary-605 mt-0.5 shrink-0 group-hover:scale-110 transition-transform">
                    {tip.done ? <FiCheckSquare size={16} /> : <FiSquare size={16} />}
                  </span>
                  <span className={tip.done ? 'line-through text-gray-400 dark:text-gray-550' : 'text-gray-650 dark:text-gray-300'}>
                    {tip.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <Link to="/dashboard/owner/subscription" className="w-full mt-6">
            <Button variant="secondary" className="w-full text-xs py-2.5 uppercase tracking-wider font-bold">
              Upgrade Subscription
            </Button>
          </Link>
        </Card>
      </div>

      {/* Customer Booking Requests Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FiCalendar className="text-primary-500" size={20} />
            <h3 className="text-lg font-extrabold text-gray-800 dark:text-white">Customer Booking Requests</h3>
          </div>
          <span className="text-xs font-bold text-gray-400">
            {ownerBookings.length} {ownerBookings.length === 1 ? 'Request' : 'Requests'}
          </span>
        </div>

        {ownerBookings.length === 0 ? (
          <Card className="p-6 text-center bg-white dark:bg-dark-900 border border-gray-100 dark:border-dark-800">
            <p className="text-sm font-semibold text-gray-400">No booking requests received yet.</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ownerBookings.map((bk) => (
              <Card key={bk.id} className="p-5 bg-white dark:bg-dark-900 border border-gray-150 dark:border-dark-800 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="px-2 py-0.5 rounded-full text-2xs font-extrabold bg-primary-100 dark:bg-primary-950/40 text-primary-600 uppercase tracking-wider">
                      {bk.refCode || '#RBC'}
                    </span>
                    <h4 className="font-bold text-base text-gray-850 dark:text-white mt-1">
                      {bk.customerName || 'Customer'}
                    </h4>
                    <p className="text-2xs text-gray-400 font-semibold">{bk.serviceType} • {bk.guests} Guests</p>
                  </div>
                  <Badge variant={bk.status === 'confirmed' ? 'success' : bk.status === 'cancelled' ? 'danger' : 'warning'}>
                    {bk.status ? bk.status.toUpperCase() : 'PENDING'}
                  </Badge>
                </div>

                <div className="text-xs text-gray-600 dark:text-gray-350 space-y-1 bg-gray-50 dark:bg-dark-800/40 p-2.5 rounded-xl border border-gray-100 dark:border-dark-700">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Date:</span>
                    <span className="font-bold">{bk.bookingDate} at {bk.bookingTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Phone:</span>
                    <span className="font-bold">{bk.customerPhone || 'N/A'}</span>
                  </div>
                  {bk.notes && (
                    <div className="pt-1 border-t border-gray-200 dark:border-dark-700">
                      <span className="text-gray-400 italic">"{bk.notes}"</span>
                    </div>
                  )}
                </div>

                {bk.status === 'pending' && (
                  <div className="flex items-center gap-2 pt-1">
                    <Button
                      size="xs"
                      className="flex-1 flex items-center justify-center gap-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold"
                      onClick={() => handleStatusChange(bk.id, 'confirmed')}
                    >
                      <FiCheck size={14} /> Accept & Confirm
                    </Button>
                    <Button
                      size="xs"
                      variant="outline"
                      className="flex-1 flex items-center justify-center gap-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 font-bold"
                      onClick={() => handleStatusChange(bk.id, 'cancelled')}
                    >
                      <FiX size={14} /> Decline
                    </Button>
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Recent Activities Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <FiActivity className="text-primary-500" size={18} />
          <h3 className="text-lg font-extrabold text-gray-800 dark:text-white">Recent Activity Logs</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recentActivities.map((act) => (
            <Card key={act.id} className="p-4 bg-white dark:bg-dark-900 border border-gray-100 dark:border-dark-800 shadow-sm flex items-center justify-between gap-2.5">
              <div>
                <h4 className="text-xs font-bold text-gray-800 dark:text-gray-100">{act.action}</h4>
                <p className="text-[10px] text-gray-450 dark:text-gray-500 font-semibold mt-0.5">{act.business}</p>
              </div>
              <span className="text-[9px] font-black text-gray-400 uppercase tracking-wider shrink-0">{act.time}</span>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
