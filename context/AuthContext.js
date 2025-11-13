// context/AuthContext.js
import { createContext, useContext, useEffect, useState } from 'react'
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendEmailVerification,
  updateProfile
} from 'firebase/auth'
import { auth } from '../lib/firebase'

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  function signup(email, password, displayName) {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        // Update profile with display name
        return updateProfile(result.user, {
          displayName: displayName
        }).then(() => {
          // Send email verification
          return sendEmailVerification(result.user)
        })
      })
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  function logout() {
    localStorage.removeItem('user')
    return signOut(auth)
  }

  function resendVerification() {
    return sendEmailVerification(auth.currentUser)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          emailVerified: user.emailVerified
        })
        // Save to localStorage
        localStorage.setItem('user', JSON.stringify({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          emailVerified: user.emailVerified
        }))
      } else {
        setCurrentUser(null)
        localStorage.removeItem('user')
      }
      setLoading(false)
    })

    return unsubscribe
  }, [])

  // Check localStorage on initial load
  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resendVerification
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
          }
