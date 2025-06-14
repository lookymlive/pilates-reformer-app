import { supabase } from '../lib/config'

// Mock authentication service for demo purposes
// This simulates Supabase authentication without requiring a real database

const mockUsers = [
  {
    id: '1',
    email: 'admin@pilates.com',
    password: 'password',
    user_metadata: {
      first_name: 'Administrador',
      last_name: 'Sistema',
      phone: '+54 11 1234-5678',
      role: 'admin'
    }
  },
  {
    id: '2',
    email: 'alumno@pilates.com',
    password: 'password',
    user_metadata: {
      first_name: 'María',
      last_name: 'González',
      phone: '+54 11 9876-5432',
      role: 'student'
    }
  }
]

// Store current session in localStorage for demo
const getCurrentSession = () => {
  if (typeof window === 'undefined') return null
  const session = localStorage.getItem('pilates_demo_session')
  return session ? JSON.parse(session) : null
}

const setCurrentSession = (session) => {
  if (typeof window === 'undefined') return
  if (session) {
    localStorage.setItem('pilates_demo_session', JSON.stringify(session))
  } else {
    localStorage.removeItem('pilates_demo_session')
  }
}

export const authService = {
  // Sign in with email and password
  signIn: async (email, password) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const user = mockUsers.find(u => u.email === email && u.password === password)
      
      if (!user) {
        return {
          success: false,
          error: 'Credenciales inválidas'
        }
      }

      const session = {
        user: {
          id: user.id,
          email: user.email,
          user_metadata: user.user_metadata
        },
        access_token: 'demo_token_' + user.id,
        expires_at: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
      }

      setCurrentSession(session)

      return {
        success: true,
        data: { user: session.user, session }
      }
    } catch (error) {
      return {
        success: false,
        error: 'Error al iniciar sesión'
      }
    }
  },

  // Sign up new user
  signUp: async (email, password, userData) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Check if user already exists
      const existingUser = mockUsers.find(u => u.email === email)
      if (existingUser) {
        return {
          success: false,
          error: 'El usuario ya existe'
        }
      }

      // For demo purposes, we'll just return success without actually creating the user
      return {
        success: true,
        message: 'Usuario registrado exitosamente. En una implementación real, se enviaría un email de confirmación.'
      }
    } catch (error) {
      return {
        success: false,
        error: 'Error al registrar usuario'
      }
    }
  },

  // Sign out
  signOut: async () => {
    try {
      setCurrentSession(null)
      return {
        success: true
      }
    } catch (error) {
      return {
        success: false,
        error: 'Error al cerrar sesión'
      }
    }
  },

  // Get current session
  getSession: async () => {
    try {
      const session = getCurrentSession()
      
      if (!session) {
        return {
          success: true,
          data: { session: null, user: null }
        }
      }

      // Check if session is expired
      if (Date.now() > session.expires_at) {
        setCurrentSession(null)
        return {
          success: true,
          data: { session: null, user: null }
        }
      }

      return {
        success: true,
        data: { session, user: session.user }
      }
    } catch (error) {
      return {
        success: false,
        error: 'Error al obtener sesión'
      }
    }
  },

  // Update user profile
  updateProfile: async (updates) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const session = getCurrentSession()
      if (!session) {
        return {
          success: false,
          error: 'No hay sesión activa'
        }
      }

      // Update session with new data
      const updatedSession = {
        ...session,
        user: {
          ...session.user,
          user_metadata: {
            ...session.user.user_metadata,
            ...updates
          }
        }
      }

      setCurrentSession(updatedSession)

      return {
        success: true,
        data: updatedSession.user
      }
    } catch (error) {
      return {
        success: false,
        error: 'Error al actualizar perfil'
      }
    }
  },

  // Listen to auth changes (simplified for demo)
  onAuthStateChange: (callback) => {
    // For demo purposes, we'll just call the callback with current session
    const session = getCurrentSession()
    callback('SIGNED_IN', session)
    
    // Return unsubscribe function
    return () => {}
  }
}

