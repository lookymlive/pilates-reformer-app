import { supabase } from '../lib/config'

// Servicio de clases y horarios
export const classService = {
  // Obtener todas las clases de un rango de fechas
  async getClasses(startDate, endDate) {
    try {
      const { data, error } = await supabase
        .from('classes')
        .select(`
          *,
          time_slots (*),
          instructors (
            id,
            user_id,
            users (first_name, last_name)
          ),
          bookings (
            id,
            user_id,
            booking_status,
            users (first_name, last_name)
          )
        `)
        .gte('class_date', startDate)
        .lte('class_date', endDate)
        .eq('status', 'scheduled')
        .order('class_date', { ascending: true })
      
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error: error.message }
    }
  },

  // Obtener una clase específica
  async getClass(classId) {
    try {
      const { data, error } = await supabase
        .from('classes')
        .select(`
          *,
          time_slots (*),
          instructors (
            id,
            user_id,
            specialization,
            users (first_name, last_name, phone)
          ),
          bookings (
            id,
            user_id,
            booking_status,
            users (first_name, last_name, email, phone)
          )
        `)
        .eq('id', classId)
        .single()
      
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error: error.message }
    }
  },

  // Crear una nueva clase
  async createClass(classData) {
    try {
      const { data, error } = await supabase
        .from('classes')
        .insert([classData])
        .select()
        .single()
      
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error: error.message }
    }
  },

  // Actualizar una clase
  async updateClass(classId, updates) {
    try {
      const { data, error } = await supabase
        .from('classes')
        .update(updates)
        .eq('id', classId)
        .select()
        .single()
      
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error: error.message }
    }
  },

  // Cancelar una clase
  async cancelClass(classId, reason) {
    try {
      const { data, error } = await supabase
        .from('classes')
        .update({ 
          status: 'cancelled',
          notes: reason 
        })
        .eq('id', classId)
        .select()
        .single()
      
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error: error.message }
    }
  }
}

// Servicio de reservas
export const bookingService = {
  // Crear una reserva
  async createBooking(userId, classId) {
    try {
      // Verificar disponibilidad primero
      const { data: classData, error: classError } = await supabase
        .from('classes')
        .select('*, time_slots(max_reformer_beds)')
        .eq('id', classId)
        .single()
      
      if (classError) throw classError
      
      if (classData.reformer_beds_used >= classData.time_slots.max_reformer_beds) {
        throw new Error('No hay camas reformer disponibles')
      }
      
      const { data, error } = await supabase
        .from('bookings')
        .insert([{
          user_id: userId,
          class_id: classId,
          booking_status: 'confirmed'
        }])
        .select()
        .single()
      
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error: error.message }
    }
  },

  // Cancelar una reserva
  async cancelBooking(bookingId, reason) {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .update({ 
          booking_status: 'cancelled',
          cancellation_date: new Date().toISOString(),
          cancellation_reason: reason 
        })
        .eq('id', bookingId)
        .select()
        .single()
      
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error: error.message }
    }
  },

  // Obtener reservas de un usuario
  async getUserBookings(userId, status = null) {
    try {
      let query = supabase
        .from('bookings')
        .select(`
          *,
          classes (
            *,
            time_slots (*),
            instructors (
              users (first_name, last_name)
            )
          )
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
      
      if (status) {
        query = query.eq('booking_status', status)
      }
      
      const { data, error } = await query
      
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error: error.message }
    }
  }
}

// Servicio de lista de espera
export const waitlistService = {
  // Unirse a lista de espera
  async joinWaitlist(userId, classId) {
    try {
      // Obtener la siguiente posición en la lista
      const { data: positionData, error: positionError } = await supabase
        .from('waitlist')
        .select('position')
        .eq('class_id', classId)
        .order('position', { ascending: false })
        .limit(1)
      
      if (positionError) throw positionError
      
      const nextPosition = positionData.length > 0 ? positionData[0].position + 1 : 1
      
      const { data, error } = await supabase
        .from('waitlist')
        .insert([{
          user_id: userId,
          class_id: classId,
          position: nextPosition
        }])
        .select()
        .single()
      
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error: error.message }
    }
  },

  // Salir de lista de espera
  async leaveWaitlist(userId, classId) {
    try {
      const { data, error } = await supabase
        .from('waitlist')
        .delete()
        .eq('user_id', userId)
        .eq('class_id', classId)
        .select()
        .single()
      
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error: error.message }
    }
  },

  // Obtener posición en lista de espera
  async getWaitlistPosition(userId, classId) {
    try {
      const { data, error } = await supabase
        .from('waitlist')
        .select('position')
        .eq('user_id', userId)
        .eq('class_id', classId)
        .single()
      
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error: error.message }
    }
  }
}

