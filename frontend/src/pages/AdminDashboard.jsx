import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogOut, Users, BookOpen, DollarSign, Settings, BarChart3 } from 'lucide-react'

function AdminDashboard() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('home')
  
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
            <p className="text-sm text-gray-600">Administration</p>
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
              { id: 'home', label: 'Tableau de bord', icon: BarChart3 },
              { id: 'etudiants', label: 'Étudiants', icon: Users },
              { id: 'professeurs', label: 'Professeurs', icon: BookOpen },
              { id: 'finances', label: 'Finances', icon: DollarSign },
              { id: 'classes', label: 'Gestion Classes', icon: BookOpen },
              { id: 'parametres', label: 'Paramètres', icon: Settings }
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
            {/* Content Based on Tab */}
            {activeTab === 'home' && <HomeTab />}
            {activeTab === 'etudiants' && <StudentsTab />}
            {activeTab === 'professeurs' && <TeachersTab />}
            {activeTab === 'finances' && <FinancesTab />}
            {activeTab === 'classes' && <ClassesTab />}
            {activeTab === 'parametres' && <SettingsTab />}
          </div>
        </main>
      </div>
    </div>
  )
}

function HomeTab() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          title="Élèves"
          value="1,234"
          icon={Users}
          color="blue"
          change="+5 cette année"
        />
        <StatCard
          title="Professeurs"
          value="85"
          icon={BookOpen}
          color="green"
          change="+2 cette année"
        />
        <StatCard
          title="Revenus"
          value="15.2M Ar"
          icon={DollarSign}
          color="purple"
          change="↑ 12% vs année passée"
        />
        <StatCard
          title="Taux présence"
          value="94.5%"
          icon={BarChart3}
          color="orange"
          change="↓ 2.5% vs année passée"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Classes</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p>6ème: <span className="font-bold text-gray-900">2 classes (89 élèves)</span></p>
            <p>5ème: <span className="font-bold text-gray-900">2 classes (92 élèves)</span></p>
            <p>4ème: <span className="font-bold text-gray-900">2 classes (91 élèves)</span></p>
            <p>3ème: <span className="font-bold text-gray-900">2 classes (85 élèves)</span></p>
            <p>2nde: <span className="font-bold text-gray-900">2 classes (83 élèves)</span></p>
            <p>1ère: <span className="font-bold text-gray-900">1 classe (42 élèves)</span></p>
            <p>Terminale: <span className="font-bold text-gray-900">2 classes (76 élèves)</span></p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Activités récentes</h3>
          <div className="space-y-3 text-sm">
            <div className="border-l-4 border-blue-600 pl-3 py-1">
              <p className="font-semibold text-gray-900">5 bulletins validés</p>
              <p className="text-gray-600">Il y a 2 heures</p>
            </div>
            <div className="border-l-4 border-green-600 pl-3 py-1">
              <p className="font-semibold text-gray-900">Paiement enregistré</p>
              <p className="text-gray-600">Il y a 4 heures</p>
            </div>
            <div className="border-l-4 border-orange-600 pl-3 py-1">
              <p className="font-semibold text-gray-900">3 élèves inscrits</p>
              <p className="text-gray-600">Il y a 1 jour</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({ title, value, icon: Icon, color, change }) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
    orange: 'bg-orange-50 text-orange-600'
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          <p className="text-xs text-gray-500 mt-1">{change}</p>
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  )
}

function StudentsTab() {
  const [newStudent, setNewStudent] = useState(false)

  const students = [
    { matricule: '24-001-0001', name: 'Jean Dupont', class: '2nde C', status: 'Actif' },
    { matricule: '24-001-0002', name: 'Marie Jean', class: '2nde C', status: 'Actif' },
    { matricule: '24-002-0001', name: 'Paul Rakoto', class: '1ère S', status: 'Actif' },
    { matricule: '24-002-0002', name: 'Sophie Martin', class: '1ère S', status: 'En attente' }
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Gestion des élèves</h2>
        <button
          onClick={() => setNewStudent(!newStudent)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          + Nouvel élève
        </button>
      </div>

      {newStudent && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Inscription nouvel élève</h3>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Prénom" className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <input type="text" placeholder="Nom" className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <input type="email" placeholder="Email" className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <input type="date" placeholder="Date de naissance" className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Sélectionner une classe</option>
                <option>6ème A</option>
                <option>2nde C</option>
                <option>Terminale C</option>
              </select>
              <input type="tel" placeholder="Téléphone parent" className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="flex gap-3">
              <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Inscrire l'élève
              </button>
              <button type="button" onClick={() => setNewStudent(false)} className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium">
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Matricule</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Nom</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Classe</th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">Statut</th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {students.map((student, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-mono text-gray-900">{student.matricule}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{student.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{student.class}</td>
                <td className="px-6 py-4 text-sm text-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    student.status === 'Actif' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {student.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-center space-x-2">
                  <button className="text-blue-600 hover:text-blue-800 font-medium">Éditer</button>
                  <button className="text-red-600 hover:text-red-800 font-medium">Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function TeachersTab() {
  const teachers = [
    { id: 1, name: 'Dr. Pierre Martin', subjects: 'Mathématiques, Physique-Chimie', classes: 4 },
    { id: 2, name: 'Mme. Claire Bernard', subjects: 'Français, Histoire-Géo', classes: 3 },
    { id: 3, name: 'Mr. Jean Rakoto', subjects: 'Sciences de la Vie', classes: 2 },
    { id: 4, name: 'Mme. Anne Dubois', subjects: 'Anglais', classes: 5 }
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Gestion des professeurs</h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
          + Nouveau professeur
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {teachers.map(teacher => (
          <div key={teacher.id} className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-bold text-gray-900">{teacher.name}</h3>
            <p className="text-sm text-gray-600 mt-2">Matières: {teacher.subjects}</p>
            <p className="text-sm text-gray-600">Classes assignées: <span className="font-bold">{teacher.classes}</span></p>
            <div className="flex gap-2 mt-4">
              <button className="flex-1 px-3 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium">
                Éditer
              </button>
              <button className="flex-1 px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium">
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function FinancesTab() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Gestion des finances</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">Revenus collectés</p>
          <p className="text-3xl font-bold text-green-600 mt-2">15.2M Ar</p>
          <p className="text-xs text-gray-500 mt-1">↑ 12% vs année passée</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">Dettes totales</p>
          <p className="text-3xl font-bold text-orange-600 mt-2">2.8M Ar</p>
          <p className="text-xs text-gray-500 mt-1">De 45 élèves</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">Taux recouvrement</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">84.5%</p>
          <p className="text-xs text-gray-500 mt-1">↑ 5% vs année passée</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Élèves avec dettes</h3>
        <div className="space-y-3 text-sm">
          {[
            { name: 'Jean Paul', montant: 250000, date: '2026-01-15' },
            { name: 'Marie Rakoto', montant: 500000, date: '2025-12-20' },
            { name: 'Paul Martin', montant: 150000, date: '2026-01-20' }
          ].map((debt, idx) => (
            <div key={idx} className="flex justify-between items-center p-3 border border-gray-200 rounded-lg">
              <div>
                <p className="font-semibold text-gray-900">{debt.name}</p>
                <p className="text-gray-600">Depuis: {debt.date}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-red-600">{debt.montant.toLocaleString()} Ar</p>
                <button className="text-xs text-blue-600 hover:text-blue-800 mt-1">Relancer</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ClassesTab() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Gestion des classes</h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
          + Nouvelle classe
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {['6ème A', '6ème B', '2nde C', '1ère S', 'Terminale C', 'Terminale D'].map((cls, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-bold text-gray-900">{cls}</h3>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                45 élèves
              </span>
            </div>
            <div className="space-y-2 text-sm text-gray-600 mb-4">
              <p>Professeur principal: <span className="font-semibold">À assigner</span></p>
              <p>Matières: 7</p>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 px-3 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium">
                Éditer
              </button>
              <button className="flex-1 px-3 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                Voir élèves
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function SettingsTab() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Paramètres système</h2>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Année scolaire</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Année actuelle:</label>
            <input type="text" defaultValue="2025-2026" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">T1 (Dates):</label>
              <input type="text" defaultValue="15 sept - 15 déc" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">T2 (Dates):</label>
              <input type="text" defaultValue="16 déc - 15 mars" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">T3 (Dates):</label>
              <input type="text" defaultValue="16 mars - 30 juin" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Règles de passage</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Moyenne minimale pour passage:</label>
            <input type="number" defaultValue="10" className="w-32 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Seuil absences (%):</label>
            <input type="number" defaultValue="20" className="w-32 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
          Enregistrer les modifications
        </button>
        <button className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium">
          Annuler
        </button>
      </div>
    </div>
  )
}

export default AdminDashboard
