import { createClient } from '@supabase/supabase-js'

// Para un despliegue real, estas variables deben venir de un archivo .env
// o del entorno de despliegue. Aquí se usan valores de ejemplo para la demostración.
// Por favor, reemplaza estos valores con tus credenciales reales de Supabase.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://abcdefg.supabase.co' // URL de ejemplo
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmciLCJyb2xlIjoiYW5vbiIsImlhdCI6MTY3ODkwMTIzNCwiZXhwIjoxNjc4OTA0ODc2fQ.example_anon_key' // Clave de ejemplo

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Cloudinary configuration (example)
export const cloudinaryConfig = {
  cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'your_cloudinary_cloud_name',
  apiKey: import.meta.env.VITE_CLOUDINARY_API_KEY || 'your_cloudinary_api_key',
  apiSecret: import.meta.env.VITE_CLOUDINARY_API_SECRET || 'your_cloudinary_api_secret',
}

