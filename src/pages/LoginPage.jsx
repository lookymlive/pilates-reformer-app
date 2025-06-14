import React, { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { Eye, EyeOff, Activity } from 'lucide-react'

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { signIn, signUp } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (isLogin) {
        const result = await signIn(formData.email, formData.password)
        if (!result.success) {
          setError(result.error)
        }
      } else {
        const userData = {
          first_name: formData.firstName,
          last_name: formData.lastName,
          phone: formData.phone,
          role: 'student'
        }
        const result = await signUp(formData.email, formData.password, userData)
        if (!result.success) {
          setError(result.error)
        } else {
          setError('')
          alert('Registro exitoso. Por favor verifica tu email.')
        }
      }
    } catch (err) {
      setError('Error inesperado. Por favor intenta nuevamente.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-green/10 to-warm-beige flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto w-20 h-20 bg-sage-green rounded-full flex items-center justify-center mb-4">
            <Activity className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">SILVIA FERNANDEZ</h2>
          <p className="text-gray-600 mt-2">Pilates Reformer</p>
          <p className="text-lg font-medium text-gray-800 mt-4">
            {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="notification-error">
              {error}
            </div>
          )}

          <div className="space-y-4">
            {!isLogin && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="form-label">
                      Nombre
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required={!isLogin}
                      className="pilates-input"
                      placeholder="Tu nombre"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="form-label">
                      Apellido
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      required={!isLogin}
                      className="pilates-input"
                      placeholder="Tu apellido"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="phone" className="form-label">
                    Teléfono
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    className="pilates-input"
                    placeholder="Tu teléfono"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </>
            )}

            <div>
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="pilates-input"
                placeholder="tu@email.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="password" className="form-label">
                Contraseña
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete={isLogin ? 'current-password' : 'new-password'}
                  required
                  className="pilates-input pr-10"
                  placeholder="Tu contraseña"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full pilates-button-primary py-3 text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Procesando...' : (isLogin ? 'Iniciar Sesión' : 'Crear Cuenta')}
            </button>
          </div>

          <div className="text-center">
            <button
              type="button"
              className="text-sage-green hover:text-sage-green/80 font-medium"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
            </button>
          </div>

          {isLogin && (
            <div className="text-center">
              <button
                type="button"
                className="text-sm text-gray-600 hover:text-gray-800"
                onClick={() => alert('Funcionalidad de recuperación de contraseña próximamente')}
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>
          )}
        </form>

        <div className="text-center text-sm text-gray-500">
          <p>Demo: admin@pilates.com / password (Administrador)</p>
          <p>Demo: alumno@pilates.com / password (Alumno)</p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage

