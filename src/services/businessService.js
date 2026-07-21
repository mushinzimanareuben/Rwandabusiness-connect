import {
  collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc,
  query, where, orderBy, limit, startAfter, serverTimestamp, increment,
  getCountFromServer,
} from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { db, storage } from '@/config/firebase'
import { BUSINESS_STATUS } from '@/config/constants'

const BUSINESSES_COL = 'businesses'

// ---- Create ----
export const createBusiness = async (data, userId, overrides = {}) => {
  const docRef = await addDoc(collection(db, BUSINESSES_COL), {
    ...data,
    ownerId: userId,
    status: overrides.status || BUSINESS_STATUS.PENDING,
    verified: overrides.verified || false,
    featured: overrides.featured || false,
    premium: false,
    views: 0,
    clicks: 0,
    whatsappClicks: 0,
    rating: 0,
    reviewCount: 0,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
  return docRef.id
}

// ---- Read One ----
export const getBusiness = async (id) => {
  const snap = await getDoc(doc(db, BUSINESSES_COL, id))
  return snap.exists() ? { id: snap.id, ...snap.data() } : null
}

// ---- Read Many with filters ----
export const getBusinesses = async ({
  category = '',
  city = '',
  district = '',
  searchQuery = '',
  featured = false,
  status = BUSINESS_STATUS.APPROVED,
  pageSize = 12,
  lastDoc = null,
} = {}) => {
  let q = query(collection(db, BUSINESSES_COL), where('status', '==', status))

  if (category) q = query(q, where('category', '==', category))
  if (city) q = query(q, where('city', '==', city))
  if (district) q = query(q, where('district', '==', district))
  if (featured) q = query(q, where('featured', '==', true))

  q = query(q, orderBy('featured', 'desc'), orderBy('createdAt', 'desc'), limit(pageSize))
  if (lastDoc) q = query(q, startAfter(lastDoc))

  const snap = await getDocs(q)
  const docs = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
  const lastVisible = snap.docs[snap.docs.length - 1] || null
  return { businesses: docs, lastDoc: lastVisible, hasMore: snap.docs.length === pageSize }
}

// ---- Owner's Businesses ----
export const getOwnerBusinesses = async (ownerId) => {
  const q = query(collection(db, BUSINESSES_COL), where('ownerId', '==', ownerId), orderBy('createdAt', 'desc'))
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}

// ---- Update ----
export const updateBusiness = async (id, data) => {
  await updateDoc(doc(db, BUSINESSES_COL, id), {
    ...data,
    updatedAt: serverTimestamp(),
  })
}

// ---- Delete ----
export const deleteBusiness = async (id) => {
  await deleteDoc(doc(db, BUSINESSES_COL, id))
}

// ---- Upload Image ----
export const uploadBusinessImage = async (file, businessId, type) => {
  const ext = file.name.split('.').pop()
  const path = `businesses/${businessId}/${type}_${Date.now()}.${ext}`
  const storageRef = ref(storage, path)
  const snap = await uploadBytes(storageRef, file)
  const url = await getDownloadURL(snap.ref)
  return { url, path }
}

// ---- Delete Image ----
export const deleteBusinessImage = async (path) => {
  const storageRef = ref(storage, path)
  await deleteObject(storageRef)
}

// ---- Increment Stats ----
export const incrementStat = async (id, field) => {
  await updateDoc(doc(db, BUSINESSES_COL, id), { [field]: increment(1) })
}

// ---- Admin: get all with any status ----
export const getAllBusinesses = async (status = null) => {
  let q = collection(db, BUSINESSES_COL)
  if (status) q = query(q, where('status', '==', status))
  else q = query(collection(db, BUSINESSES_COL), orderBy('createdAt', 'desc'))
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}

// ---- Get Count ----
export const getBusinessCount = async () => {
  const snap = await getCountFromServer(collection(db, BUSINESSES_COL))
  return snap.data().count
}
