import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock, User, BookOpen } from 'lucide-react'

function Login() {
  const [role, setRole] = useState('student')
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    
    if (!identifier || !password) {
      setError('Veuillez remplir tous les champs')
      return
    }

    // Simulation simple de connexion
    if (role === 'student') {
      navigate('/student/dashboard')
    } else if (role === 'parent') {
      navigate('/parent/dashboard')
    } else if (role === 'teacher') {
      navigate('/teacher/dashboard')
    } else if (role === 'admin') {
      navigate('/admin/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="w-12 h-12 text-white" />
            <h1 className="text-4xl font-bold text-white">SIG-Lycée</h1>
          </div>
          <p className="text-blue-100 text-lg">Système de Gestion Scolaire</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-lg shadow-xl p-8 mb-6">
          {/* Role Selection */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Vous êtes:
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: 'student', label: 'Élève' },
                { value: 'parent', label: 'Parent' },
                { value: 'teacher', label: 'Professeur' },
                { value: 'admin', label: 'Administrateur' }
              ].map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setRole(opt.value)}
                  className={`py-2 px-4 rounded-lg font-medium transition-all ${
                    role === opt.value
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Username/Email Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Identifiant / Email
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => {
                    setIdentifier(e.target.value)
                    setError('')
                  }}
                  placeholder={
                    role === 'admin' ? 'Identifiant admin' :
                    role === 'teacher' ? 'Identifiant professeur' :
                    role === 'parent' ? 'Code parent' :
                    'Code élève'
                  }
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    setError('')
                  }}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 rounded border-gray-300 cursor-pointer"
              />
              <label htmlFor="remember" className="text-sm text-gray-600 cursor-pointer">
                Se souvenir de moi
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors mt-6"
            >
              Se connecter
            </button>
          </form>

          {/* Test Credentials */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center mb-2 font-semibold">IDENTIFIANTS DE TEST:</p>
            <div className="space-y-1 text-xs text-gray-600">
              <p>👨‍🎓 Élève: <span className="font-mono">EL001 / 1234</span></p>
              <p>👨‍👩‍👧 Parent: <span className="font-mono">PAR001 / 1234</span></p>
              <p>👨‍🏫 Prof: <span className="font-mono">PROF001 / 1234</span></p>
              <p>👔 Admin: <span className="font-mono">ADMIN / 1234</span></p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-blue-100 text-sm">
          © 2026 SIG-Lycée. Tous droits réservés.
        </p>
      </div>
    </div>
  )
}

export default Login
