import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock, Mail, BookOpen, User, Loader2 } from 'lucide-react'

function Login() {
  const [role, setRole] = useState('student')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    
    if (!email || !password) {
      setError('Veuillez remplir tous les champs')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('http://127.0.0.1:8000/api/auth/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          password: password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.detail || 
          data.non_field_errors?.[0] || 
          'Identifiants incorrects ou compte inactif'
        )
      }

      // Sauvegarde des tokens (simple exemple – à sécuriser en production)
      localStorage.setItem('access_token', data.access)
      localStorage.setItem('refresh_token', data.refresh)
      
      // Tu peux aussi stocker le rôle ou décoder le token pour récupérer le rôle
      // Exemple : const decoded = jwtDecode(data.access)
      // localStorage.setItem('role', decoded.role)

      // Redirection selon le rôle choisi (à affiner avec le vrai rôle du token)
      if (role === 'student') {
        navigate('/student/dashboard')
      } else if (role === 'parent') {
        navigate('/parent/dashboard')
      } else if (role === 'teacher') {
        navigate('/teacher/dashboard')
      } else if (role === 'admin') {
        navigate('/admin/dashboard')
      }

    } catch (err) {
      setError(err.message || 'Une erreur est survenue. Veuillez réessayer.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-700 via-indigo-800 to-purple-900 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md md:max-w-lg">
        {/* Header / Logo */}
        <div className="text-center mb-8 md:mb-10">
          <div className="inline-flex items-center justify-center gap-3 mb-4">
            <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl shadow-lg">
              <BookOpen className="w-10 h-10 md:w-12 md:h-12 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              SIG-Lycée
            </h1>
          </div>
          <p className="text-indigo-200 text-base md:text-lg font-medium">
            Système de Gestion Scolaire
          </p>
        </div>

        {/* Card principale */}
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl shadow-black/30 p-6 md:p-8 border border-white/10">
          {/* Sélection rôle */}
          <div className="mb-7">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Je suis :
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: 'student', label: 'Élève', icon: User },
                { value: 'parent',  label: 'Parent',  icon: User },
                { value: 'teacher', label: 'Professeur', icon: BookOpen },
                { value: 'admin',   label: 'Admin',   icon: Lock },
              ].map(opt => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setRole(opt.value)}
                  className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all duration-200 border ${
                    role === opt.value
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                      : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                  }`}
                >
                  <opt.icon className="w-5 h-5" />
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Message d'erreur */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                !
              </div>
              {error}
            </div>
          )}

          {/* Formulaire */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Email / Identifiant
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setError('')
                  }}
                  placeholder="exemple@lycee.mg"
                  autoComplete="email"
                  required
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                />
              </div>
            </div>

            {/* Mot de passe */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    setError('')
                  }}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  required
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                />
              </div>
            </div>

            {/* Options */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-gray-600">Se souvenir de moi</span>
              </label>
              <a href="#" className="text-indigo-600 hover:text-indigo-800 hover:underline">
                Mot de passe oublié ?
              </a>
            </div>

            {/* Bouton connexion */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center gap-2 py-3.5 px-6 mt-4 rounded-xl text-white font-semibold transition-all ${
                loading
                  ? 'bg-indigo-400 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 shadow-lg shadow-indigo-500/30'
              }`}
            >
              {loading && <Loader2 className="w-5 h-5 animate-spin" />}
              {loading ? 'Connexion en cours...' : 'Se connecter'}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-indigo-200/80 text-sm mt-8">
          © {new Date().getFullYear()} SIG-Lycée • Tous droits réservés
        </p>
      </div>
    </div>
  )
}

export default Login