import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { Calendar, Clock, Users, Activity } from 'lucide-react'

const Header = () => {
  const { user, userProfile, signOut, isAdmin } = useAuth()

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <header className="pilates-header">
      <div className="pilates-container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="w-10 h-10 bg-sage-green rounded-full flex items-center justify-center mr-3">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <h1 className="pilates-logo">SILVIA FERNANDEZ</h1>
            <span className="text-sm text-gray-500 ml-2">Pilates Reformer</span>
          </div>

          {/* Navegación */}
          <nav className="hidden md:flex space-x-8">
            <a href="/dashboard" className="text-gray-700 hover:text-sage-green transition-colors">
              Dashboard
            </a>
            <a href="/calendar" className="text-gray-700 hover:text-sage-green transition-colors">
              Calendario
            </a>
            {isAdmin && (
              <a href="/admin" className="text-gray-700 hover:text-sage-green transition-colors">
                Administración
              </a>
            )}
          </nav>

          {/* Usuario */}
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">
                {userProfile?.first_name} {userProfile?.last_name}
              </p>
              <p className="text-xs text-gray-500 capitalize">{userProfile?.role}</p>
            </div>
            <div className="relative">
              <button
                onClick={handleSignOut}
                className="pilates-button-secondary text-sm"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

