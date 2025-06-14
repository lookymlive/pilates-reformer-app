import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { Calendar, Clock, Users, Activity, BookOpen, Star } from 'lucide-react'

const DashboardPage = () => {
  const { userProfile, isAdmin, isStudent } = useAuth()

  // Datos de ejemplo para el dashboard
  const upcomingClasses = [
    {
      id: 1,
      date: '2025-06-15',
      time: '09:00',
      instructor: 'Silvia',
      status: 'confirmed'
    },
    {
      id: 2,
      date: '2025-06-17',
      time: '17:00',
      instructor: 'Nadia',
      status: 'confirmed'
    }
  ]

  const stats = {
    classesThisMonth: 8,
    nextClass: 'Hoy 17:00',
    favoriteInstructor: 'Silvia',
    totalClasses: 45
  }

  const adminStats = {
    todayClasses: 12,
    monthlyBookings: 142,
    occupancyRate: 75,
    activeInstructors: 5
  }

  return (
    <div className="pilates-container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          ¡Hola, {userProfile?.first_name}!
        </h1>
        <p className="text-gray-600">
          Bienvenido a tu espacio de Pilates Reformer
        </p>
      </div>

      {isAdmin ? (
        // Dashboard de Administrador
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="metric-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="metric-label">Clases Hoy</p>
                  <p className="metric-value">{adminStats.todayClasses}</p>
                </div>
                <Calendar className="w-8 h-8 text-sage-green" />
              </div>
            </div>

            <div className="metric-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="metric-label">Reservas del Mes</p>
                  <p className="metric-value">{adminStats.monthlyBookings}</p>
                </div>
                <BookOpen className="w-8 h-8 text-sage-green" />
              </div>
            </div>

            <div className="metric-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="metric-label">Ocupación</p>
                  <p className="metric-value">{adminStats.occupancyRate}%</p>
                </div>
                <Activity className="w-8 h-8 text-sage-green" />
              </div>
            </div>

            <div className="metric-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="metric-label">Instructoras Activas</p>
                  <p className="metric-value">{adminStats.activeInstructors}</p>
                </div>
                <Users className="w-8 h-8 text-sage-green" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="pilates-card">
              <h3 className="text-lg font-semibold mb-4">Actividad Reciente</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Nueva reserva - María González</span>
                  <span className="text-xs text-gray-400">Hace 5 min</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Clase cancelada - Viernes 16:00</span>
                  <span className="text-xs text-gray-400">Hace 1 hora</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-gray-600">Nuevo alumno registrado</span>
                  <span className="text-xs text-gray-400">Hace 2 horas</span>
                </div>
              </div>
            </div>

            <div className="pilates-card">
              <h3 className="text-lg font-semibold mb-4">Acciones Rápidas</h3>
              <div className="grid grid-cols-2 gap-4">
                <button className="pilates-button-primary text-center py-3">
                  Crear Clase
                </button>
                <button className="pilates-button-secondary text-center py-3">
                  Ver Reportes
                </button>
                <button className="pilates-button-secondary text-center py-3">
                  Gestionar Usuarios
                </button>
                <button className="pilates-button-secondary text-center py-3">
                  Configuración
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Dashboard de Alumno
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="metric-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="metric-label">Clases este Mes</p>
                  <p className="metric-value">{stats.classesThisMonth}</p>
                </div>
                <Calendar className="w-8 h-8 text-sage-green" />
              </div>
            </div>

            <div className="metric-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="metric-label">Próxima Clase</p>
                  <p className="text-lg font-semibold text-sage-green">{stats.nextClass}</p>
                </div>
                <Clock className="w-8 h-8 text-sage-green" />
              </div>
            </div>

            <div className="metric-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="metric-label">Instructora Favorita</p>
                  <p className="text-lg font-semibold text-sage-green">{stats.favoriteInstructor}</p>
                </div>
                <Star className="w-8 h-8 text-sage-green" />
              </div>
            </div>

            <div className="metric-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="metric-label">Total de Clases</p>
                  <p className="metric-value">{stats.totalClasses}</p>
                </div>
                <Activity className="w-8 h-8 text-sage-green" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="pilates-card">
              <h3 className="text-lg font-semibold mb-4">Próximas Clases</h3>
              <div className="space-y-4">
                {upcomingClasses.map((clase) => (
                  <div key={clase.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">
                        {new Date(clase.date).toLocaleDateString('es-ES', { 
                          weekday: 'long', 
                          day: 'numeric', 
                          month: 'long' 
                        })}
                      </p>
                      <p className="text-sm text-gray-600">{clase.time} - Instructora: {clase.instructor}</p>
                    </div>
                    <span className="status-badge confirmed">Confirmada</span>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 pilates-button-secondary">
                Ver Todas las Clases
              </button>
            </div>

            <div className="pilates-card">
              <h3 className="text-lg font-semibold mb-4">Acciones Rápidas</h3>
              <div className="space-y-3">
                <button className="w-full pilates-button-primary py-3">
                  Reservar Nueva Clase
                </button>
                <button className="w-full pilates-button-secondary py-3">
                  Ver Calendario
                </button>
                <button className="w-full pilates-button-secondary py-3">
                  Mi Historial
                </button>
                <button className="w-full pilates-button-secondary py-3">
                  Videos de Entrenamiento
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DashboardPage

