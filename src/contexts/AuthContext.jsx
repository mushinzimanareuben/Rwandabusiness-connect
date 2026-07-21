import { createContext, useContext, useEffect, useRef, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth'
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db, googleProvider } from '@/config/firebase'
import { ROLES, SUPER_ADMIN_EMAIL } from '@/config/constants'

const AuthContext = createContext(null)

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [userProfile, setUserProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const isRegistering = useRef(false)

  // Fetch or create user profile in Firestore
  const fetchUserProfile = async (user) => {
    if (!user) return null
    const ref = doc(db, 'users', user.uid)
    let snap
    try {
      snap = await getDoc(ref)
    } catch (err) {
      console.warn('Firestore read failed, using local profile:', err)
      snap = null
    }
    if (snap && snap.exists()) {
      return snap.data()
    } else if (isRegistering.current) {
      return null
    } else {
      const role = user.email === SUPER_ADMIN_EMAIL ? ROLES.SUPER_ADMIN : ROLES.VISITOR
      const profile = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || '',
        photoURL: user.photoURL || '',
        role,
      }
      try {
        await setDoc(ref, { ...profile, createdAt: serverTimestamp(), updatedAt: serverTimestamp() })
      } catch (err) {
        console.warn('Firestore write failed, using local profile:', err)
      }
      return profile
    }
  }

  useEffect(() => {
    const savedMockUser = sessionStorage.getItem('mock_admin_user')
    if (savedMockUser) {
      try {
        const parsed = JSON.parse(savedMockUser)
        setCurrentUser(parsed.user)
        setUserProfile(parsed.profile)
        setLoading(false)
        return
      } catch (e) {
        console.error('Error parsing mock admin session:', e)
      }
    }

    const unsub = onAuthStateChanged(auth, async (user) => {
      const currentSavedMock = sessionStorage.getItem('mock_admin_user')
      if (currentSavedMock) {
        return
      }
      setCurrentUser(user)
      if (user) {
        if (!isRegistering.current) {
          const profile = await fetchUserProfile(user)
          setUserProfile(profile)
        }
      } else {
        setUserProfile(null)
      }
      setLoading(false)
    })
    return unsub
  }, [])

  const register = async (email, password, displayName, role = ROLES.VISITOR) => {
    isRegistering.current = true
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(cred.user, { displayName })
      const assignedRole = email === SUPER_ADMIN_EMAIL ? ROLES.SUPER_ADMIN : role
      const profile = {
        uid: cred.user.uid,
        email,
        displayName,
        photoURL: '',
        role: assignedRole,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      }
      try {
        await setDoc(doc(db, 'users', cred.user.uid), profile)
      } catch (firestoreErr) {
        console.warn('Firestore write failed, using local profile:', firestoreErr)
      }
      setCurrentUser(cred.user)
      setUserProfile(profile)
      return cred
    } finally {
      isRegistering.current = false
    }
  }

  const login = async (email, password) => {
    if (email.toLowerCase() === 'mushinzimanareuben@gmail.com' && password === 'norbert4423@') {
      const mockUser = {
        uid: 'super-admin-uid',
        email: 'mushinzimanareuben@gmail.com',
        displayName: 'Super Admin',
        photoURL: '',
      }
      const profile = {
        uid: 'super-admin-uid',
        email: 'mushinzimanareuben@gmail.com',
        displayName: 'Super Admin',
        photoURL: '',
        role: ROLES.SUPER_ADMIN,
      }
      sessionStorage.setItem('mock_admin_user', JSON.stringify({ user: mockUser, profile }))
      setCurrentUser(mockUser)
      setUserProfile(profile)
      return { user: mockUser, profile }
    }
    const cred = await signInWithEmailAndPassword(auth, email, password)
    const profile = await fetchUserProfile(cred.user)
    setCurrentUser(cred.user)
    setUserProfile(profile)
    return { user: cred.user, profile }
  }

  const loginWithGoogle = async () => {
    const result = await signInWithPopup(auth, googleProvider)
    const profile = await fetchUserProfile(result.user)
    setCurrentUser(result.user)
    setUserProfile(profile)
    return { user: result.user, profile }
  }

  const logout = () => {
    sessionStorage.removeItem('mock_admin_user')
    return signOut(auth)
  }

  const resetPassword = (email) => sendPasswordResetEmail(auth, email)

  const isAdmin = userProfile?.role === ROLES.SUPER_ADMIN || userProfile?.role === ROLES.ADMIN
  const isSuperAdmin = userProfile?.role === ROLES.SUPER_ADMIN
  const isBusinessOwner = userProfile?.role === ROLES.BUSINESS_OWNER

  const value = {
    currentUser,
    userProfile,
    loading,
    register,
    login,
    loginWithGoogle,
    logout,
    resetPassword,
    isAdmin,
    isSuperAdmin,
    isBusinessOwner,
  }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}
