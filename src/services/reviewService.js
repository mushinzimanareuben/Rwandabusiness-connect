import {
  collection, doc, addDoc, getDocs, query, where, orderBy, updateDoc, serverTimestamp
} from 'firebase/firestore'
import { db } from '@/config/firebase'

const REVIEWS_COL = 'reviews'

export const addReview = async (businessId, userId, data) => {
  const ref = await addDoc(collection(db, REVIEWS_COL), {
    businessId,
    userId,
    ...data,
    createdAt: serverTimestamp(),
  })
  // Update business rating
  const q = query(collection(db, REVIEWS_COL), where('businessId', '==', businessId))
  const snap = await getDocs(q)
  const ratings = snap.docs.map((d) => d.data().rating)
  const avg = ratings.reduce((a, b) => a + b, 0) / ratings.length
  await updateDoc(doc(db, 'businesses', businessId), {
    rating: Math.round(avg * 10) / 10,
    reviewCount: ratings.length,
  })
  return ref.id
}

export const getReviews = async (businessId) => {
  const q = query(
    collection(db, REVIEWS_COL),
    where('businessId', '==', businessId),
    orderBy('createdAt', 'desc')
  )
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}
