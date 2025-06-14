import React, { createContext, useContext, useEffect, useState } from 'react'
import { authService } from '../services/authService'

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [userProfile, setUserProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState(null)

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const result = await authService.getSession()
        if (result.success && result.data.session) {
          setSession(result.data.session)
          setUser(result.data.user)
          setUserProfile(result.data.user.user_metadata)
        }
      } catch (error) {
        console.error('Error getting initial session:', error)
      } finally {
        setLoading(false)
      }
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = authService.onAuthStateChange((event, session) => {
      if (session) {
        setSession(session)
        setUser(session.user)
        setUserProfile(session.user.user_metadata)
      } else {
        setSession(null)
        setUser(null)
        setUserProfile(null)
      }
      setLoading(false)
    })

    return () => {
      if (subscription && subscription.unsubscribe) {
        subscription.unsubscribe()
      }
    }
  }, [])

  const signIn = async (email, password) => {
    setLoading(true)
    try {
      const result = await authService.signIn(email, password)
      if (result.success) {
        setSession(result.data.session)
        setUser(result.data.user)
        setUserProfile(result.data.user.user_metadata)
      }
      return result
    } catch (error) {
      return {
        success: false,
        error: 'Error inesperado al iniciar sesión'
      }
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (email, password, userData) => {
    setLoading(true)
    try {
      const result = await authService.signUp(email, password, userData)
      return result
    } catch (error) {
      return {
        success: false,
        error: 'Error inesperado al registrar usuario'
      }
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    setLoading(true)
    try {
      const result = await authService.signOut()
      if (result.success) {
        setSession(null)
        setUser(null)
        setUserProfile(null)
      }
      return result
    } catch (error) {
      return {
        success: false,
        error: 'Error al cerrar sesión'
      }
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (updates) => {
    try {
      const result = await authService.updateProfile(updates)
      if (result.success) {
        setUserProfile(result.data.user_metadata)
      }
      return result
    } catch (error) {
      return {
        success: false,
        error: 'Error al actualizar perfil'
      }
    }
  }

  // Helper functions
  const isAuthenticated = !!user
  const isAdmin = userProfile?.role === 'admin'
  const isStudent = userProfile?.role === 'student'

  const value = {
    user,
    userProfile,
    session,
    loading,
    isAuthenticated,
    isAdmin,
    isStudent,
    signIn,
    signUp,
    signOut,
    updateProfile
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

