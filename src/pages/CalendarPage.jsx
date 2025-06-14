import React, { useState } from 'react'
import { ChevronLeft, ChevronRight, Clock, User, Users } from 'lucide-react'

const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(null)

  // Datos de ejemplo para las clases
  const classesData = {
    '2025-06-16': [
      { id: 1, time: '08:00-12:00', instructor: 'Silvia', available: 0, total: 1, status: 'full' },
      { id: 2, time: '17:00-21:00', instructor: 'Nadia', available: 1, total: 1, status: 'available' }
    ],
    '2025-06-17': [
      { id: 3, time: '08:00-12:00', instructor: 'Noelia', available: 1, total: 1, status: 'available' },
      { id: 4, time: '14:00-15:00', instructor: 'Silvia', available: 0, total: 1, status: 'full' },
      { id: 5, time: '16:00-21:00', instructor: 'Silvia', available: 1, total: 1, status: 'available' }
    ],
    '2025-06-18': [
      { id: 6, time: '08:00-12:00', instructor: 'Silvia', available: 1, total: 1, status: 'available' },
      { id: 7, time: '14:00-15:00', instructor: 'Silvia', available: 0, total: 1, status: 'full' },
      { id: 8, time: '16:00-21:00', instructor: 'Silvia', available: 1, total: 1, status: 'available' }
    ],
    '2025-06-19': [
      { id: 9, time: '08:00-12:00', instructor: 'Noelia', available: 1, total: 1, status: 'available' },
      { id: 10, time: '14:00-15:00', instructor: 'Silvia', available: 1, total: 1, status: 'available' },
      { id: 11, time: '16:00-21:00', instructor: 'Paula', available: 0, total: 1, status: 'full' }
    ],
    '2025-06-20': [
      { id: 12, time: '08:00-12:00', instructor: 'Claudia', available: 1, total: 1, status: 'available' },
      { id: 13, time: '16:00-20:00', instructor: 'Paula', available: 1, total: 1, status: 'available' },
      { id: 14, time: '20:00-21:00', instructor: 'Silvia', available: 0, total: 1, status: 'full' }
    ]
  }

  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []
    
    // Días del mes anterior para completar la primera semana
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i)
      days.push({ date: prevDate, isCurrentMonth: false })
    }
    
    // Días del mes actual
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(year, month, day)
      days.push({ date: currentDate, isCurrentMonth: true })
    }
    
    // Días del mes siguiente para completar la última semana
    const remainingDays = 42 - days.length
    for (let day = 1; day <= remainingDays; day++) {
      const nextDate = new Date(year, month + 1, day)
      days.push({ date: nextDate, isCurrentMonth: false })
    }
    
    return days
  }

  const formatDateKey = (date) => {
    return date.toISOString().split('T')[0]
  }

  const getClassesForDate = (date) => {
    const dateKey = formatDateKey(date)
    return classesData[dateKey] || []
  }

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate)
    newDate.setMonth(currentDate.getMonth() + direction)
    setCurrentDate(newDate)
  }

  const handleDateClick = (date) => {
    if (date.isCurrentMonth) {
      setSelectedDate(date.date)
    }
  }

  const handleBookClass = (classItem) => {
    if (classItem.status === 'available') {
      alert(`Reservando clase de ${classItem.time} con ${classItem.instructor}`)
    } else {
      alert('Esta clase está llena. ¿Deseas unirte a la lista de espera?')
    }
  }

  const days = getDaysInMonth(currentDate)
  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ]
  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']

  return (
    <div className="pilates-container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Calendario de Clases</h1>
        <p className="text-gray-600">Reserva tu clase de Pilates Reformer</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calendario */}
        <div className="lg:col-span-2">
          <div className="pilates-card">
            {/* Header del calendario */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => navigateMonth(-1)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-semibold">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              <button
                onClick={() => navigateMonth(1)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Días de la semana */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {dayNames.map((day) => (
                <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                  {day}
                </div>
              ))}
            </div>

            {/* Días del mes */}
            <div className="grid grid-cols-7 gap-1">
              {days.map((day, index) => {
                const classes = getClassesForDate(day.date)
                const hasClasses = classes.length > 0
                const isSelected = selectedDate && formatDateKey(selectedDate) === formatDateKey(day.date)
                
                return (
                  <div
                    key={index}
                    onClick={() => handleDateClick(day)}
                    className={`
                      calendar-day min-h-[80px] p-1 border border-gray-200 cursor-pointer
                      ${!day.isCurrentMonth ? 'text-gray-400 bg-gray-50' : ''}
                      ${isSelected ? 'bg-sage-green text-white' : ''}
                      ${hasClasses && day.isCurrentMonth ? 'bg-blue-50' : ''}
                    `}
                  >
                    <div className="text-sm font-medium mb-1">
                      {day.date.getDate()}
                    </div>
                    {hasClasses && day.isCurrentMonth && (
                      <div className="space-y-1">
                        {classes.slice(0, 2).map((clase) => (
                          <div
                            key={clase.id}
                            className={`text-xs p-1 rounded ${
                              clase.status === 'available' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {clase.time.split('-')[0]}
                          </div>
                        ))}
                        {classes.length > 2 && (
                          <div className="text-xs text-gray-500">
                            +{classes.length - 2} más
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Panel lateral */}
        <div className="space-y-6">
          {/* Información del día seleccionado */}
          {selectedDate && (
            <div className="pilates-card">
              <h3 className="text-lg font-semibold mb-4">
                {selectedDate.toLocaleDateString('es-ES', { 
                  weekday: 'long', 
                  day: 'numeric', 
                  month: 'long' 
                })}
              </h3>
              
              <div className="space-y-3">
                {getClassesForDate(selectedDate).map((clase) => (
                  <div key={clase.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="font-medium">{clase.time}</span>
                      </div>
                      <span className={`status-badge ${clase.status === 'available' ? 'confirmed' : 'cancelled'}`}>
                        {clase.status === 'available' ? 'Disponible' : 'Lleno'}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2 mb-3">
                      <User className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Instructora: {clase.instructor}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 mb-3">
                      <Users className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        {clase.available} de {clase.total} camas disponibles
                      </span>
                    </div>
                    
                    <button
                      onClick={() => handleBookClass(clase)}
                      className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                        clase.status === 'available'
                          ? 'pilates-button-primary'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                      disabled={clase.status !== 'available'}
                    >
                      {clase.status === 'available' ? 'Reservar' : 'Lista de Espera'}
                    </button>
                  </div>
                ))}
                
                {getClassesForDate(selectedDate).length === 0 && (
                  <p className="text-gray-500 text-center py-4">
                    No hay clases programadas para este día
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Leyenda */}
          <div className="pilates-card">
            <h3 className="text-lg font-semibold mb-4">Leyenda</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-100 border border-green-200 rounded"></div>
                <span className="text-sm">Disponible</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-100 border border-red-200 rounded"></div>
                <span className="text-sm">Lleno</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-blue-100 border border-blue-200 rounded"></div>
                <span className="text-sm">Día con clases</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CalendarPage

