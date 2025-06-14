import React, { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { User, Mail, Phone, Calendar, Edit2, Save, X } from 'lucide-react'

const ProfilePage = () => {
  const { userProfile, updateProfile } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    first_name: userProfile?.first_name || '',
    last_name: userProfile?.last_name || '',
    phone: userProfile?.phone || '',
    email: userProfile?.email || ''
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSave = async () => {
    setLoading(true)
    setMessage('')
    
    try {
      const result = await updateProfile(formData)
      if (result.success) {
        setMessage('Perfil actualizado correctamente')
        setIsEditing(false)
      } else {
        setMessage(result.error)
      }
    } catch (error) {
      setMessage('Error al actualizar el perfil')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setFormData({
      first_name: userProfile?.first_name || '',
      last_name: userProfile?.last_name || '',
      phone: userProfile?.phone || '',
      email: userProfile?.email || ''
    })
    setIsEditing(false)
    setMessage('')
  }

  // Datos de ejemplo para el historial
  const classHistory = [
    { id: 1, date: '2025-06-14', time: '09:00', instructor: 'Silvia', status: 'completed' },
    { id: 2, date: '2025-06-12', time: '17:00', instructor: 'Nadia', status: 'completed' },
    { id: 3, date: '2025-06-10', time: '08:00', instructor: 'Noelia', status: 'completed' },
    { id: 4, date: '2025-06-08', time: '16:00', instructor: 'Paula', status: 'cancelled' },
    { id: 5, date: '2025-06-05', time: '09:00', instructor: 'Silvia', status: 'completed' },
  ]

  const upcomingClasses = [
    { id: 1, date: '2025-06-16', time: '09:00', instructor: 'Silvia', status: 'confirmed' },
    { id: 2, date: '2025-06-18', time: '17:00', instructor: 'Nadia', status: 'confirmed' },
  ]

  return (
    <div className="pilates-container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Mi Perfil</h1>
        <p className="text-gray-600">Gestiona tu información personal y revisa tu historial</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Información del perfil */}
        <div className="lg:col-span-1">
          <div className="pilates-card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Información Personal</h2>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="pilates-button-secondary flex items-center space-x-2"
                >
                  <Edit2 className="w-4 h-4" />
                  <span>Editar</span>
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={handleSave}
                    disabled={loading}
                    className="pilates-button-primary flex items-center space-x-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>{loading ? 'Guardando...' : 'Guardar'}</span>
                  </button>
                  <button
                    onClick={handleCancel}
                    className="pilates-button-secondary flex items-center space-x-2"
                  >
                    <X className="w-4 h-4" />
                    <span>Cancelar</span>
                  </button>
                </div>
              )}
            </div>

            {message && (
              <div className={`mb-4 p-3 rounded-lg ${
                message.includes('correctamente') 
                  ? 'notification-success' 
                  : 'notification-error'
              }`}>
                {message}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="form-label">Nombre</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    className="pilates-input"
                  />
                ) : (
                  <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                    <User className="w-4 h-4 text-gray-500" />
                    <span>{userProfile?.first_name}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="form-label">Apellido</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    className="pilates-input"
                  />
                ) : (
                  <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                    <User className="w-4 h-4 text-gray-500" />
                    <span>{userProfile?.last_name}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="form-label">Email</label>
                <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <span>{userProfile?.email}</span>
                </div>
                <p className="form-help">El email no se puede modificar</p>
              </div>

              <div>
                <label className="form-label">Teléfono</label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="pilates-input"
                  />
                ) : (
                  <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span>{userProfile?.phone || 'No especificado'}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="form-label">Rol</label>
                <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                  <User className="w-4 h-4 text-gray-500" />
                  <span className="capitalize">{userProfile?.role}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Estadísticas */}
          <div className="pilates-card mt-6">
            <h3 className="text-lg font-semibold mb-4">Mis Estadísticas</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Clases este mes:</span>
                <span className="font-medium">8</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total de clases:</span>
                <span className="font-medium">45</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Instructora favorita:</span>
                <span className="font-medium">Silvia</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Miembro desde:</span>
                <span className="font-medium">Enero 2025</span>
              </div>
            </div>
          </div>
        </div>

        {/* Historial y próximas clases */}
        <div className="lg:col-span-2 space-y-8">
          {/* Próximas clases */}
          <div className="pilates-card">
            <h2 className="text-xl font-semibold mb-6">Próximas Clases</h2>
            <div className="space-y-4">
              {upcomingClasses.map((clase) => (
                <div key={clase.id} className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-sage-green rounded-lg flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">
                        {new Date(clase.date).toLocaleDateString('es-ES', { 
                          weekday: 'long', 
                          day: 'numeric', 
                          month: 'long' 
                        })}
                      </p>
                      <p className="text-sm text-gray-600">
                        {clase.time} - Instructora: {clase.instructor}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="status-badge confirmed">Confirmada</span>
                    <button className="pilates-button-secondary text-sm">
                      Cancelar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Historial de clases */}
          <div className="pilates-card">
            <h2 className="text-xl font-semibold mb-6">Historial de Clases</h2>
            <div className="overflow-x-auto">
              <table className="pilates-table">
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Hora</th>
                    <th>Instructora</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {classHistory.map((clase) => (
                    <tr key={clase.id}>
                      <td>
                        {new Date(clase.date).toLocaleDateString('es-ES', { 
                          day: 'numeric', 
                          month: 'short', 
                          year: 'numeric' 
                        })}
                      </td>
                      <td>{clase.time}</td>
                      <td>{clase.instructor}</td>
                      <td>
                        <span className={`status-badge ${clase.status}`}>
                          {clase.status === 'completed' ? 'Completada' : 'Cancelada'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage

