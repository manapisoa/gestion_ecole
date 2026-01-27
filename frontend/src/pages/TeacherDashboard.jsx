import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogOut, BookOpen, BarChart3, Users, PlusCircle } from 'lucide-react'

function TeacherDashboard() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('home')
  
  const teacher = {
    name: 'Dr. Pierre Martin',
    email: 'pierre.martin@lycee.mg',
    subjects: ['Mathématiques', 'Physique-Chimie']
  }

  const handleLogout = () => {
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-blue-600">SIG-Lycée</h1>
            <p className="text-sm text-gray-600">Espace Enseignant</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Déconnexion
          </button>
        </div>
      </header>

      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md overflow-y-auto hidden md:block">
          <nav className="p-6 space-y-2">
            {[
              { id: 'home', label: 'Accueil', icon: BookOpen },
              { id: 'classes', label: 'Mes Classes', icon: Users },
              { id: 'notes', label: 'Saisie Notes', icon: BarChart3 },
              { id: 'absences', label: 'Appel', icon: Users }
            ].map(item => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === item.id
                      ? 'bg-blue-100 text-blue-600 font-semibold'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </button>
              )
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Teacher Info */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-6 mb-8 shadow-lg">
              <h2 className="text-3xl font-bold mb-2">{teacher.name}</h2>
              <p className="text-blue-100 mb-3">{teacher.email}</p>
              <p className="text-blue-100">
                Enseigne: {teacher.subjects.join(', ')}
              </p>
            </div>

            {/* Content Based on Tab */}
            {activeTab === 'home' && <HomeTab />}
            {activeTab === 'classes' && <ClassesTab />}
            {activeTab === 'notes' && <NotesTab />}
            {activeTab === 'absences' && <AbsencesTab />}
          </div>
        </main>
      </div>
    </div>
  )
}

function HomeTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Classes assignées</p>
              <p className="text-3xl font-bold text-blue-600">4</p>
            </div>
            <Users className="w-10 h-10 text-blue-600 opacity-20" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Étudiants</p>
              <p className="text-3xl font-bold text-green-600">156</p>
            </div>
            <Users className="w-10 h-10 text-green-600 opacity-20" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Notes à saisir</p>
              <p className="text-3xl font-bold text-orange-600">24</p>
            </div>
            <BarChart3 className="w-10 h-10 text-orange-600 opacity-20" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Actions rapides</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-colors">
            <PlusCircle className="w-6 h-6 text-blue-600" />
            <div className="text-left">
              <p className="font-semibold text-gray-900">Faire l'appel</p>
              <p className="text-sm text-gray-600">Enregistrer les présences</p>
            </div>
          </button>
          <button className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-colors">
            <PlusCircle className="w-6 h-6 text-blue-600" />
            <div className="text-left">
              <p className="font-semibold text-gray-900">Saisir des notes</p>
              <p className="text-sm text-gray-600">Ajouter/modifier les notes</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default TeacherDashboard
function ClassesTab() {
  const classes = [
    { name: '2nde C', niveaux: 'Seconde générale', effectif: 42, matieres: ['Math', 'PC'] },
    { name: '1ère S', niveaux: 'Première scientifique', effectif: 38, matieres: ['Math', 'PC'] },
    { name: 'Terminale C', niveaux: 'Terminale scientifique', effectif: 35, matieres: ['Math'] },
    { name: 'Terminale D', niveaux: 'Terminale technique', effectif: 41, matieres: ['PC'] }
  ]

  return (
    <div className="space-y-6">
      {classes.map((cls, idx) => (
        <div key={idx} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900">{cls.name}</h3>
              <p className="text-sm text-gray-600">{cls.niveaux}</p>
            </div>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
              {cls.effectif} élèves
            </span>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Matières:</p>
            <div className="flex gap-2">
              {cls.matieres.map((mat, i) => (
                <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                  {mat}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
              Voir détails
            </button>
            <button className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
              Appel
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

function NotesTab() {
  const [selectedClass, setSelectedClass] = useState('2nde C')
  const [editingNotes, setEditingNotes] = useState({})

  const students = [
    { id: 1, name: 'Jean Dupont', matricule: '24-001-0001', notes: [16, 14.5, 15.2] },
    { id: 2, name: 'Marie Jean', matricule: '24-001-0002', notes: [14, 15, 13.8] },
    { id: 3, name: 'Paul Rakoto', matricule: '24-001-0003', notes: [17, 16, 16.5] },
    { id: 4, name: 'Sophie Martin', matricule: '24-001-0004', notes: [15, 16.5, 14.2] }
  ]

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">Sélectionner une classe:</label>
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option>2nde C</option>
          <option>1ère S</option>
          <option>Terminale C</option>
          <option>Terminale D</option>
        </select>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Nom</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Matricule</th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">Contrôle 1</th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">Contrôle 2</th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">Contrôle 3</th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {students.map(student => (
              <tr key={student.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{student.name}</td>
                <td className="px-6 py-4 text-sm font-mono text-gray-600">{student.matricule}</td>
                {student.notes.map((note, idx) => (
                  <td key={idx} className="px-6 py-4 text-sm text-center">
                    <input
                      type="number"
                      min="0"
                      max="20"
                      defaultValue={note}
                      className="w-16 px-2 py-1 border border-gray-300 rounded text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </td>
                ))}
                <td className="px-6 py-4 text-sm text-center">
                  <button className="px-3 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700 transition-colors">
                    Valider
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex gap-3">
        <button className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
          Enregistrer toutes les notes
        </button>
        <button className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium">
          Annuler
        </button>
      </div>
    </div>
  )
}

function AbsencesTab() {
  const [selectedClass, setSelectedClass] = useState('2nde C')
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])

  const students = [
    { id: 1, name: 'Jean Dupont', present: true },
    { id: 2, name: 'Marie Jean', present: true },
    { id: 3, name: 'Paul Rakoto', present: false },
    { id: 4, name: 'Sophie Martin', present: true }
  ]

  const [presence, setPresence] = useState(students.reduce((acc, s) => ({ ...acc, [s.id]: s.present }), {}))

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Classe:</label>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>2nde C</option>
            <option>1ère S</option>
            <option>Terminale C</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Date:</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4">Marquer les présences</h3>
          <div className="space-y-3">
            {students.map(student => (
              <label key={student.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={presence[student.id]}
                  onChange={(e) => setPresence({ ...presence, [student.id]: e.target.checked })}
                  className="w-4 h-4 rounded border-gray-300 cursor-pointer"
                />
                <span className="flex-1 font-medium text-gray-900">{student.name}</span>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  presence[student.id]
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {presence[student.id] ? 'Présent' : 'Absent'}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 p-6 flex gap-3">
          <button className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
            Enregistrer l'appel
          </button>
          <button className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium">
            Annuler
          </button>
        </div>
      </div>
    </div>
  )
}
