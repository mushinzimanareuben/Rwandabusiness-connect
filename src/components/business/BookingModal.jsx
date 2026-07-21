import React, { useState } from 'react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'
import { createBooking } from '@/services/bookingService'
import { useAuth } from '@/contexts/AuthContext'
import { FiCalendar, FiClock, FiUsers, FiUser, FiPhone, FiMail, FiCheckCircle } from 'react-icons/fi'
import toast from 'react-hot-toast'

export const BookingModal = ({ isOpen, onClose, business }) => {
  const { currentUser } = useAuth()

  const todayStr = new Date().toISOString().split('T')[0]

  const [serviceType, setServiceType] = useState('Table / Room Reservation')
  const [bookingDate, setBookingDate] = useState(todayStr)
  const [bookingTime, setBookingTime] = useState('14:00')
  const [guests, setGuests] = useState(2)
  const [customerName, setCustomerName] = useState(currentUser?.displayName || '')
  const [customerPhone, setCustomerPhone] = useState(currentUser?.phoneNumber || '')
  const [customerEmail, setCustomerEmail] = useState(currentUser?.email || '')
  const [notes, setNotes] = useState('')

  const [loading, setLoading] = useState(false)
  const [confirmedBooking, setConfirmedBooking] = useState(null)

  if (!business) return null

  const serviceOptions = [
    { value: 'Table / Room Reservation', label: 'Table / Room Reservation' },
    { value: 'Appointment / Consultation', label: 'Appointment / Consultation' },
    { value: 'Service Booking', label: 'Service Booking' },
    { value: 'General Inquiry / Custom Request', label: 'General Inquiry / Custom Request' },
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const payload = {
        userId: currentUser?.uid || 'guest',
        businessId: business.id || 'demo-1',
        businessName: business.name,
        businessCategory: business.category || 'General',
        serviceType,
        bookingDate,
        bookingTime,
        guests: parseInt(guests, 10),
        customerName,
        customerPhone,
        customerEmail,
        notes,
      }

      const result = await createBooking(payload)
      setConfirmedBooking(result)
      toast.success(`Booking requested! Ref: ${result.refCode}`)
    } catch (err) {
      console.error(err)
      toast.error('Failed to process booking request. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setConfirmedBooking(null)
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={confirmedBooking ? 'Booking Confirmed 🎉' : `Book with ${business.name}`}
      size="lg"
    >
      {confirmedBooking ? (
        <div className="py-6 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
            <FiCheckCircle size={36} />
          </div>

          <div>
            <span className="inline-block px-3 py-1 bg-primary-100 dark:bg-primary-950/40 text-primary-700 dark:text-primary-300 font-extrabold text-xs rounded-full uppercase tracking-wider mb-2">
              Reference: {confirmedBooking.refCode}
            </span>
            <h3 className="text-2xl font-black text-gray-850 dark:text-white">
              Booking Request Received!
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-350 max-w-md mx-auto mt-2">
              Your reservation request for <strong className="text-gray-800 dark:text-gray-100">{business.name}</strong> has been logged. The business manager will review and contact you shortly.
            </p>
          </div>

          {/* Details Card */}
          <div className="p-4 rounded-2xl bg-gray-50 dark:bg-dark-800 border border-gray-150 dark:border-dark-700 max-w-md mx-auto text-left text-xs space-y-2 font-semibold">
            <div className="flex justify-between">
              <span className="text-gray-400">Service:</span>
              <span className="text-gray-800 dark:text-gray-200">{confirmedBooking.serviceType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Date & Time:</span>
              <span className="text-gray-800 dark:text-gray-200">{confirmedBooking.bookingDate} at {confirmedBooking.bookingTime}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Guests / People:</span>
              <span className="text-gray-800 dark:text-gray-200">{confirmedBooking.guests}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Contact:</span>
              <span className="text-gray-800 dark:text-gray-200">{confirmedBooking.customerPhone || confirmedBooking.customerEmail}</span>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-center gap-3">
            <Button variant="primary" onClick={handleClose}>
              Done
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="p-3.5 rounded-xl bg-primary-50 dark:bg-primary-950/20 border border-primary-150 dark:border-primary-900/40 flex items-center justify-between">
            <div>
              <span className="text-2xs font-bold text-primary-600 uppercase tracking-wider">Business</span>
              <h4 className="font-bold text-sm text-gray-900 dark:text-white">{business.name}</h4>
              <p className="text-2xs text-gray-500">{business.address || `${business.city}, Rwanda`}</p>
            </div>
            <span className="px-2.5 py-1 bg-white dark:bg-dark-800 text-primary-600 font-extrabold text-2xs rounded-lg shadow-xs uppercase">
              {business.category || 'Directory'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Service / Booking Type"
              options={serviceOptions}
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              required
            />

            <Input
              label="Number of Guests / People"
              type="number"
              min="1"
              max="50"
              icon={FiUsers}
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Preferred Date"
              type="date"
              min={todayStr}
              icon={FiCalendar}
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
              required
            />

            <Input
              label="Preferred Time"
              type="time"
              icon={FiClock}
              value={bookingTime}
              onChange={(e) => setBookingTime(e.target.value)}
              required
            />
          </div>

          <div className="space-y-4 pt-2 border-t border-gray-100 dark:border-dark-700">
            <h4 className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
              Your Contact Info
            </h4>

            <Input
              label="Full Name"
              placeholder="e.g. Jean Pierre Manzi"
              icon={FiUser}
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Phone Number"
                placeholder="+250 78X XXX XXX"
                icon={FiPhone}
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                required
              />

              <Input
                label="Email Address"
                type="email"
                placeholder="name@gmail.com"
                icon={FiMail}
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
              />
            </div>
          </div>

          <Textarea
            label="Special Requests / Notes (Optional)"
            placeholder="Add any specific requirements, dietary restrictions, or extra details..."
            rows={2}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

          <div className="pt-3 flex items-center justify-end gap-3 border-t border-gray-100 dark:border-dark-700">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" isLoading={loading} className="px-6">
              Confirm & Request Booking
            </Button>
          </div>
        </form>
      )}
    </Modal>
  )
}
