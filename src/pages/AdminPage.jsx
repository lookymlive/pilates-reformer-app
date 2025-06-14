import React, { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { 
  Calendar, 
  Users, 
  Settings, 
  BarChart3, 
  Plus,
  Edit,
  Trash2,
  Mail,
  Phone,
  Clock
} from 'lucide-react'

const AdminPage = () => {
  const { userProfile } = useAuth()
  const [activeTab, setActiveTab] = useState('dashboard')

  // Datos de ejemplo
  const todayClasses = [
    { id: 1, time: '08:00-12:00', instructor: 'Silvia', booked: 1, capacity: 1 },
    { id: 2, time: '17:00-21:00', instructor: 'Nadia', booked: 0, capacity: 1 },
  ]

  const recentBookings = [
    { id: 1, student: 'María González', class: 'Lunes 09:00', instructor: 'Silvia', status: 'confirmed' },
    { id: 2, student: 'Ana Rodríguez', class: 'Martes 17:00', instructor: 'Nadia', status: 'confirmed' },
    { id: 3, student: 'Carlos López', class: 'Miércoles 08:00', instructor: 'Noelia', status: 'cancelled' },
  ]

  const instructors = [
    { id: 1, name: 'Silvia', email: 'silvia@pilates.com', phone: '+54 11 1234-5678', specialization: 'Pilates Reformer Avanzado' },
    { id: 2, name: 'Nadia', email: 'nadia@pilates.com', phone: '+54 11 2345-6789', specialization: 'Pilates Reformer Intermedio' },
    { id: 3, name: 'Noelia', email: 'noelia@pilates.com', phone: '+54 11 3456-7890', specialization: 'Pilates Reformer Principiantes' },
    { id: 4, name: 'Paula', email: 'paula@pilates.com', phone: '+54 11 4567-8901', specialization: 'Pilates Reformer Terapéutico' },
    { id: 5, name: 'Claudia', email: 'claudia@pilates.com', phone: '+54 11 5678-9012', specialization: 'Pilates Reformer Deportivo' },
  ]

  const students = [
    { id: 1, name: 'María González', email: 'maria@email.com', phone: '+54 11 1111-1111', classes: 12, lastClass: '2025-06-14' },
    { id: 2, name: 'Ana Rodríguez', email: 'ana@email.com', phone: '+54 11 2222-2222', classes: 8, lastClass: '2025-06-13' },
    { id: 3, name: 'Carlos López', email: 'carlos@email.com', phone: '+54 11 3333-3333', classes: 15, lastClass: '2025-06-12' },
  ]

  const renderDashboard = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="metric-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="metric-label">Clases Hoy</p>
              <p className="metric-value">12</p>
            </div>
            <Calendar className="w-8 h-8 text-sage-green" />
          </div>
        </div>

        <div className="metric-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="metric-label">Reservas del Mes</p>
              <p className="metric-value">142</p>
            </div>
            <Users className="w-8 h-8 text-sage-green" />
          </div>
        </div>

        <div className="metric-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="metric-label">Ocupación</p>
              <p className="metric-value">75%</p>
            </div>
            <BarChart3 className="w-8 h-8 text-sage-green" />
          </div>
        </div>

        <div className="metric-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="metric-label">Instructoras Activas</p>
              <p className="metric-value">5</p>
            </div>
            <Users className="w-8 h-8 text-sage-green" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="pilates-card">
          <h3 className="text-lg font-semibold mb-4">Clases de Hoy</h3>
          <div className="space-y-3">
            {todayClasses.map((clase) => (
              <div key={clase.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{clase.time}</p>
                  <p className="text-sm text-gray-600">Instructora: {clase.instructor}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{clase.booked}/{clase.capacity}</p>
                  <p className="text-xs text-gray-500">Reservadas</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pilates-card">
          <h3 className="text-lg font-semibold mb-4">Reservas Recientes</h3>
          <div className="space-y-3">
            {recentBookings.map((booking) => (
              <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{booking.student}</p>
                  <p className="text-sm text-gray-600">{booking.class} - {booking.instructor}</p>
                </div>
                <span className={`status-badge ${booking.status}`}>
                  {booking.status === 'confirmed' ? 'Confirmada' : 'Cancelada'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const renderInstructors = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Gestión de Instructoras</h2>
        <button className="pilates-button-primary flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Nueva Instructora</span>
        </button>
      </div>

      <div className="pilates-card">
        <div className="overflow-x-auto">
          <table className="pilates-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Especialización</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {instructors.map((instructor) => (
                <tr key={instructor.id}>
                  <td className="font-medium">{instructor.name}</td>
                  <td>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span>{instructor.email}</span>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span>{instructor.phone}</span>
                    </div>
                  </td>
                  <td>{instructor.specialization}</td>
                  <td>
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderStudents = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Gestión de Alumnos</h2>
        <button className="pilates-button-primary flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Nuevo Alumno</span>
        </button>
      </div>

      <div className="pilates-card">
        <div className="overflow-x-auto">
          <table className="pilates-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Clases Tomadas</th>
                <th>Última Clase</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td className="font-medium">{student.name}</td>
                  <td>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span>{student.email}</span>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span>{student.phone}</span>
                    </div>
                  </td>
                  <td>{student.classes}</td>
                  <td>{new Date(student.lastClass).toLocaleDateString('es-ES')}</td>
                  <td>
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderClasses = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Gestión de Clases</h2>
        <button className="pilates-button-primary flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Nueva Clase</span>
        </button>
      </div>

      <div className="pilates-card">
        <p className="text-gray-600">
          Aquí podrás crear, editar y gestionar las clases de Pilates Reformer.
          Funcionalidad en desarrollo.
        </p>
      </div>
    </div>
  )

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'classes', label: 'Clases', icon: Calendar },
    { id: 'instructors', label: 'Instructoras', icon: Users },
    { id: 'students', label: 'Alumnos', icon: Users },
    { id: 'settings', label: 'Configuración', icon: Settings },
  ]

  return (
    <div className="pilates-container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Panel de Administración</h1>
        <p className="text-gray-600">Gestiona tu estudio de Pilates Reformer</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="lg:w-64">
          <div className="admin-sidebar rounded-lg">
            <nav className="p-4">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`admin-sidebar-item w-full ${
                      activeTab === tab.id ? 'active' : ''
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {tab.label}
                  </button>
                )
              })}
            </nav>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="flex-1">
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'classes' && renderClasses()}
          {activeTab === 'instructors' && renderInstructors()}
          {activeTab === 'students' && renderStudents()}
          {activeTab === 'settings' && (
            <div className="pilates-card">
              <h2 className="text-2xl font-bold mb-4">Configuración</h2>
              <p className="text-gray-600">Configuración del sistema en desarrollo.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminPage

