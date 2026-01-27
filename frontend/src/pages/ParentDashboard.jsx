import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogOut, FileText, Calendar, TrendingUp, AlertCircle, DollarSign } from 'lucide-react'

function ParentDashboard() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('home')
  
  const parent = {
    name: 'Marie Dupont',
    email: 'marie.dupont@gmail.com'
  }

  const children = [
    {
      name: 'Jean Dupont',
      matricule: '24-001-0001',
      class: '2nde C',
      moyenne: 15.5
    },
    {
      name: 'Sophie Dupont',
      matricule: '24-002-0001',
      class: '4ème A',
      moyenne: 14.2
    }
  ]

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
            <p className="text-sm text-gray-600">Espace Parent</p>
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
              { id: 'home', label: 'Accueil', icon: FileText },
              { id: 'enfants', label: 'Mes Enfants', icon: TrendingUp },
              { id: 'bulletins', label: 'Bulletins', icon: FileText },
              { id: 'absences', label: 'Absences', icon: Calendar },
              { id: 'paiements', label: 'Paiements', icon: DollarSign }
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
            {/* Parent Info */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-6 mb-8 shadow-lg">
              <h2 className="text-3xl font-bold mb-2">Bienvenue, {parent.name}</h2>
              <p className="text-blue-100">{parent.email}</p>
            </div>

            {/* Content Based on Tab */}
            {activeTab === 'home' && <HomeTab children={children} />}
            {activeTab === 'enfants' && <ChildrenTab children={children} />}
            {activeTab === 'bulletins' && <BulletinsTab children={children} />}
            {activeTab === 'absences' && <AbsencesTab children={children} />}
            {activeTab === 'paiements' && <PaymentsTab children={children} />}
          </div>
        </main>
      </div>
    </div>
  )
}

function HomeTab({ children }) {
  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-blue-900">Surveillance assiduité</p>
          <p className="text-sm text-blue-700">Tous vos enfants respectent l'assiduité requise</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {children.map((child, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3">{child.name}</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>Classe: <span className="font-semibold text-gray-900">{child.class}</span></p>
              <p>Matricule: <span className="font-mono text-gray-900">{child.matricule}</span></p>
              <p>Moyenne générale: <span className="font-bold text-blue-600">{child.moyenne}/20</span></p>
              <button className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                Voir détails
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ChildrenTab({ children }) {
  return (
    <div className="space-y-6">
      {children.map((child, idx) => (
        <div key={idx} className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900">{child.name}</h3>
              <p className="text-sm text-gray-600">Matricule: {child.matricule}</p>
            </div>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
              {child.class}
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-gray-600 text-sm">Moyenne</p>
              <p className="text-2xl font-bold text-blue-600">{child.moyenne}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-gray-600 text-sm">Absences</p>
              <p className="text-2xl font-bold text-green-600">3h</p>
            </div>
            <div className="bg-orange-50 rounded-lg p-4">
              <p className="text-gray-600 text-sm">Retards</p>
              <p className="text-2xl font-bold text-orange-600">2</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <p className="text-gray-600 text-sm">Dettes</p>
              <p className="text-2xl font-bold text-purple-600">0</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function BulletinsTab({ children }) {
  return (
    <div className="space-y-6">
      {children.map((child, idx) => (
        <div key={idx} className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">{child.name} - Bulletins</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['T1', 'T2', 'T3'].map(term => (
              <div key={term} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-semibold text-gray-900">Bulletin {term}</h4>
                  <button className="px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 transition-colors">
                    Voir
                  </button>
                </div>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>Moyenne: <span className="font-bold text-gray-900">15.3/20</span></p>
                  <p>Rang: <span className="font-bold text-gray-900">5/45</span></p>
                  <button className="mt-2 w-full px-3 py-2 bg-gray-100 text-gray-700 rounded text-xs hover:bg-gray-200 transition-colors">
                    Télécharger PDF
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function AbsencesTab({ children }) {
  return (
    <div className="space-y-6">
      {children.map((child, idx) => (
        <div key={idx} className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">{child.name} - Absences</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Total absences</span>
              <span className="font-bold text-lg">3 heures</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Non justifiées</span>
              <span className="font-bold text-lg text-orange-600">0</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
              <span className="text-green-900">Statut assiduité</span>
              <span className="font-bold text-green-600">BON</span>
            </div>
          </div>
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
            <p className="font-semibold mb-1">À savoir</p>
            <p>Toute absence non justifiée dans les 48h sera comptabilisée. Une justification parentale est requise.</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function PaymentsTab({ children }) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Suivi des Paiements</h3>
        <div className="space-y-4">
          {[
            { date: '2026-01-15', montant: 250000, description: 'Scolarité Janvier', statut: 'Payé' },
            { date: '2026-02-15', montant: 250000, description: 'Scolarité Février', statut: 'En attente' },
            { date: '2026-01-20', montant: 50000, description: 'Frais inscription', statut: 'Payé' }
          ].map((payment, idx) => (
            <div key={idx} className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
              <div>
                <p className="font-semibold text-gray-900">{payment.description}</p>
                <p className="text-sm text-gray-600">{payment.date}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900">{payment.montant.toLocaleString()} Ar</p>
                <span className={`text-xs px-2 py-1 rounded ${
                  payment.statut === 'Payé'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-orange-100 text-orange-800'
                }`}>
                  {payment.statut}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Récapitulatif</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-gray-600 text-sm">Total payé</p>
            <p className="text-2xl font-bold text-blue-600">550.000</p>
            <p className="text-xs text-gray-600 mt-1">Ar</p>
          </div>
          <div className="bg-orange-50 rounded-lg p-4">
            <p className="text-gray-600 text-sm">En attente</p>
            <p className="text-2xl font-bold text-orange-600">250.000</p>
            <p className="text-xs text-gray-600 mt-1">Ar</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-gray-600 text-sm">Situation</p>
            <p className="text-2xl font-bold text-green-600">À jour</p>
            <p className="text-xs text-gray-600 mt-1">Aucune dette</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ParentDashboard
