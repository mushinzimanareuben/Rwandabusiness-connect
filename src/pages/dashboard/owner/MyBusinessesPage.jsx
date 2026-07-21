import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getOwnerBusinesses, deleteBusiness } from '@/services/businessService'
import { useAuth } from '@/contexts/AuthContext'
import { useTranslation } from '@/hooks/useTranslation'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { FiEdit, FiTrash, FiEye, FiCheckCircle } from 'react-icons/fi'
import toast from 'react-hot-toast'

export const MyBusinessesPage = () => {
  const { currentUser } = useAuth()
  const { language } = useTranslation()
  const [businesses, setBusinesses] = useState([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    try {
      const list = await getOwnerBusinesses(currentUser.uid)
      setBusinesses(list)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [currentUser.uid])

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this listing? This action cannot be undone.')) return
    try {
      await deleteBusiness(id)
      toast.success('Listing deleted successfully!')
      load()
    } catch (e) {
      console.error(e)
      toast.error('Failed to delete listing.')
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-805 dark:text-white">
            My Businesses
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage your listings and track their approval and verification status.
          </p>
        </div>
        <Link to="/dashboard/owner/add">
          <Button className="flex items-center gap-2">
            <span>Add Business</span>
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="skeleton h-28 w-full" />
          ))}
        </div>
      ) : businesses.length === 0 ? (
        <Card className="text-center py-16 bg-white dark:bg-dark-900 border border-gray-150 dark:border-dark-400">
          <span className="text-4xl mb-4 block">🏢</span>
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">No Listings Found</h3>
          <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-xs mx-auto">
            Get started by adding your business to our directory.
          </p>
          <Link to="/dashboard/owner/add" className="inline-block mt-6">
            <Button>Add Your Business</Button>
          </Link>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {businesses.map((item) => (
            <Card
              key={item.id}
              className="bg-white dark:bg-dark-900 border border-gray-150 dark:border-dark-400 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start md:items-center gap-4">
                <img
                  src={item.logoUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&q=80'}
                  alt="logo"
                  className="w-16 h-16 rounded-2xl object-cover shrink-0 border border-gray-100 dark:border-dark-400"
                />
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <h3 className="text-lg font-bold text-gray-805 dark:text-gray-100">{item.name}</h3>
                    <Badge variant={item.status === 'approved' ? 'success' : 'gold'}>
                      {item.status.toUpperCase()}
                    </Badge>
                    {item.verified && (
                      <Badge variant="primary" className="flex items-center gap-0.5">
                        <FiCheckCircle size={10} /> Verified
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    {item.category}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    📍 {item.district}, {item.city}
                  </p>
                </div>
              </div>

              {/* Actions panel */}
              <div className="flex items-center gap-3 w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0 justify-end">
                <Link to={`/businesses/${item.id}`}>
                  <Button variant="ghost" size="sm" className="flex items-center gap-1">
                    <FiEye /> View
                  </Button>
                </Link>
                <Link to={`/dashboard/owner/edit/${item.id}`}>
                  <Button variant="secondary" size="sm" className="flex items-center gap-1">
                    <FiEdit /> Edit
                  </Button>
                </Link>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(item.id)}
                  className="flex items-center gap-1"
                >
                  <FiTrash /> Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
