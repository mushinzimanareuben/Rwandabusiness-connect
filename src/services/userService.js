import {
  collection, doc, getDoc, getDocs, updateDoc, serverTimestamp, query, orderBy
} from 'firebase/firestore'
import { db } from '@/config/firebase'

const USERS_COL = 'users'

export const getUser = async (uid) => {
  const snap = await getDoc(doc(db, USERS_COL, uid))
  return snap.exists() ? { uid: snap.id, ...snap.data() } : null
}

export const getAllUsers = async () => {
  const q = query(collection(db, USERS_COL), orderBy('createdAt', 'desc'))
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({ uid: d.id, ...d.data() }))
}

export const updateUserRole = async (uid, role) => {
  await updateDoc(doc(db, USERS_COL, uid), { role, updatedAt: serverTimestamp() })
}

export const updateUserProfile = async (uid, data) => {
  await updateDoc(doc(db, USERS_COL, uid), { ...data, updatedAt: serverTimestamp() })
}
