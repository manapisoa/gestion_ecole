import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogOut, Home, FileText, Calendar, BookOpen, Award } from 'lucide-react'

function StudentDashboard() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('home')

  const student = {
    name: 'Jean Dupont',
    matricule: '24-001-0001',
    class: '2nde C',
    email: 'jean.dupont@lycee.mg'
  }

  const handleLogout = () => {
    navigate('/')
  }

  const grades = [
    { subject: 'Mathématiques', coeff: 4, grade: 16, average: 14 },
    { subject: 'Français', coeff: 3, grade: 14, average: 13 },
    { subject: 'Anglais', coeff: 2, grade: 15, average: 12 }
  ]

  const absences = [
    { date: '2024-01-15', subject: 'Mathématiques', duration: 2 },
    { date: '2024-01-20', subject: 'Français', duration: 1 }
  ]

  const results = [
    { trimester: '1er Trimestre', average: 13.5, ranking: 12 },
    { trimester: '2ème Trimestre', average: 14.2, ranking: 8 }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">SIG-Lycée - Espace Élève</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Déconnexion
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Student Info */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Informations Personnelles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <p className="text-sm opacity-80">Nom</p>
              <p className="font-semibold">{student.name}</p>
            </div>
            <div>
              <p className="text-sm opacity-80">Matricule</p>
              <p className="font-semibold">{student.matricule}</p>
            </div>
            <div>
              <p className="text-sm opacity-80">Classe</p>
              <p className="font-semibold">{student.class}</p>
            </div>
            <div>
              <p className="text-sm opacity-80">Email</p>
              <p className="font-semibold">{student.email}</p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-200">
          {[
            { id: 'home', label: 'Accueil', icon: Home },
            { id: 'notes', label: 'Mes Notes', icon: FileText },
            { id: 'absences', label: 'Absences', icon: Calendar },
            { id: 'bulletins', label: 'Bulletins', icon: BookOpen },
            { id: 'resultats', label: 'Résultats', icon: Award }
          ].map(tab => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {activeTab === 'home' && (
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Bienvenue, {student.name}!</h3>
              <p className="text-gray-600 mb-4">
                Consultez vos notes, absences et résultats académiques.
              </p>
            </div>
          )}

          {activeTab === 'notes' && (
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Mes Notes</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2 text-left">Matière</th>
                      <th className="border border-gray-300 px-4 py-2">Coefficient</th>
                      <th className="border border-gray-300 px-4 py-2">Ma Note</th>
                      <th className="border border-gray-300 px-4 py-2">Moyenne Classe</th>
                    </tr>
                  </thead>
                  <tbody>
                    {grades.map((g, idx) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-4 py-2">{g.subject}</td>
                        <td className="border border-gray-300 px-4 py-2 text-center">{g.coeff}</td>
                        <td className="border border-gray-300 px-4 py-2 text-center font-bold text-blue-600">
                          {g.grade}/20
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-center">{g.average}/20</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'absences' && (
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Mes Absences</h3>
              {absences.length > 0 ? (
                <div className="space-y-3">
                  {absences.map((a, idx) => (
                    <div key={idx} className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="font-semibold text-gray-900">{a.subject}</p>
                      <p className="text-sm text-gray-600">{a.date} - {a.duration}h</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">Aucune absence enregistrée</p>
              )}
            </div>
          )}

          {activeTab === 'bulletins' && (
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Bulletins</h3>
              <p className="text-gray-600">Vos bulletins trimestrels sont disponibles ici.</p>
            </div>
          )}

          {activeTab === 'resultats' && (
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Résultats Trimestriels</h3>
              <div className="space-y-3">
                {results.map((r, idx) => (
                  <div key={idx} className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="font-semibold text-gray-900">{r.trimester}</p>
                    <p className="text-sm text-gray-600">
                      Moyenne: {r.average}/20 - Classement: {r.ranking}ème
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default StudentDashboard
