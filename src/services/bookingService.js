import { db } from '@/config/firebase'
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  updateDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore'

const MOCK_STORAGE_KEY = 'rbc_mock_bookings'

const getLocalBookings = () => {
  try {
    const raw = localStorage.getItem(MOCK_STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch (e) {
    return []
  }
}

const saveLocalBookings = (bookings) => {
  try {
    localStorage.setItem(MOCK_STORAGE_KEY, JSON.stringify(bookings))
  } catch (e) {
    console.error('Failed to save to localStorage', e)
  }
}

// Initial mock bookings for rich demo experience
const INITIAL_MOCK_BOOKINGS = [
  {
    id: 'bk-1001',
    refCode: 'RBC-9482',
    businessId: 'demo-1',
    businessName: 'Virunga Inn Resort & Spa',
    serviceType: 'Room Reservation',
    bookingDate: '2026-08-10',
    bookingTime: '14:00',
    guests: 2,
    customerName: 'Manzi Eric',
    customerPhone: '+250 788 123 456',
    customerEmail: 'manzi@gmail.com',
    notes: 'Quiet room with mountain view requested.',
    status: 'confirmed',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'bk-1002',
    refCode: 'RBC-3829',
    businessId: 'demo-2',
    businessName: 'Heaven Restaurant Kigali',
    serviceType: 'Table Reservation',
    bookingDate: '2026-07-28',
    bookingTime: '19:30',
    guests: 4,
    customerName: 'Manzi Eric',
    customerPhone: '+250 788 123 456',
    customerEmail: 'manzi@gmail.com',
    notes: 'Outdoor terrace seating preferred.',
    status: 'pending',
    createdAt: new Date().toISOString(),
  },
]

if (!localStorage.getItem(MOCK_STORAGE_KEY)) {
  saveLocalBookings(INITIAL_MOCK_BOOKINGS)
}

/**
 * Create a new booking request
 */
export const createBooking = async (bookingData) => {
  const refCode = `RBC-${Math.floor(1000 + Math.random() * 9000)}`
  const fullData = {
    ...bookingData,
    refCode,
    status: 'pending',
    createdAt: new Date().toISOString(),
  }

  try {
    if (db) {
      const docRef = await addDoc(collection(db, 'bookings'), {
        ...fullData,
        createdAt: serverTimestamp(),
      })
      return { id: docRef.id, ...fullData }
    }
  } catch (error) {
    console.warn('Firestore write error, saving locally:', error)
  }

  // Local fallback
  const localList = getLocalBookings()
  const newBooking = { id: `bk-${Date.now()}`, ...fullData }
  localList.unshift(newBooking)
  saveLocalBookings(localList)
  return newBooking
}

/**
 * Fetch bookings for a specific user
 */
export const getUserBookings = async (userId, email = '') => {
  try {
    if (db && userId) {
      const q = query(
        collection(db, 'bookings'),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      )
      const snapshot = await getDocs(q)
      if (!snapshot.empty) {
        return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      }
    }
  } catch (error) {
    console.warn('Firestore query error, fetching local:', error)
  }

  // Fallback to local storage
  const localList = getLocalBookings()
  if (userId) {
    return localList.filter((b) => b.userId === userId || b.customerEmail === email || true)
  }
  return localList
}

/**
 * Fetch bookings for a business owner
 */
export const getBusinessBookings = async (businessId) => {
  try {
    if (db && businessId) {
      const q = query(
        collection(db, 'bookings'),
        where('businessId', '==', businessId),
        orderBy('createdAt', 'desc')
      )
      const snapshot = await getDocs(q)
      if (!snapshot.empty) {
        return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      }
    }
  } catch (error) {
    console.warn('Firestore query error, fetching local:', error)
  }

  const localList = getLocalBookings()
  return localList.filter((b) => b.businessId === businessId)
}

/**
 * Update booking status (pending | confirmed | cancelled)
 */
export const updateBookingStatus = async (bookingId, status) => {
  try {
    if (db && !bookingId.startsWith('bk-')) {
      const ref = doc(db, 'bookings', bookingId)
      await updateDoc(ref, { status })
      return true
    }
  } catch (error) {
    console.warn('Firestore update status failed, updating local:', error)
  }

  const localList = getLocalBookings()
  const updated = localList.map((b) => (b.id === bookingId ? { ...b, status } : b))
  saveLocalBookings(updated)
  return true
}
