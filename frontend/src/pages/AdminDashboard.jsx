'use client'

import { useState } from 'react'
import {
  LogOut, Users, BookOpen, DollarSign, Settings, BarChart3, Clock, FileText,
  MessageSquare, Menu, X, Download, Edit2, Trash2, Plus, TrendingUp, TrendingDown,
  Calendar, CheckCircle, AlertCircle, Home, Layers, Gauge, Database
} from 'lucide-react'

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('home')
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const menuItems = [
    { id: 'home', label: 'Tableau de bord', icon: Home },
    { id: 'etudiants', label: 'Gestion Étudiants', icon: Users },
    { id: 'academique', label: 'Gestion Académique', icon: BookOpen },
    { id: 'notes', label: 'Notes & Évaluations', icon: Gauge },
    { id: 'presence', label: 'Présence & Absences', icon: Clock },
    { id: 'admin', label: 'Gestion Administrative', icon: Database },
    { id: 'communication', label: 'Communication', icon: MessageSquare },
    { id: 'rapports', label: 'Rapports & Stats', icon: BarChart3 },
    { id: 'parametres', label: 'Paramètres', icon: Settings }
  ]

  const handleLogout = () => {
    alert('Déconnexion effectuée')
  }

  const DashboardOverview = () => (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Tableau de bord</h1>
        <p className="text-muted-foreground mt-1">Bienvenue sur la plateforme SIG-Lycée</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Élèves inscrits" value="1,234" change="+5%" icon={Users} trend="up" />
        <StatCard title="Professeurs" value="85" change="+2%" icon={BookOpen} trend="up" />
        <StatCard title="Revenus collectés" value="15.2M Ar" change="+12%" icon={DollarSign} trend="up" />
        <StatCard title="Taux présence" value="94.5%" change="-2.5%" icon={Clock} trend="down" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Classes Overview */}
        <div className="lg:col-span-2 bg-card rounded-lg border border-border p-6">
          <h2 className="text-xl font-bold mb-4">Distribution par classe</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {['6ème A', '6ème B', '2nde C', '1ère S', 'Term C', 'Term D'].map((cls, i) => (
              <div key={i} className="bg-muted rounded-lg p-4 text-center">
                <p className="font-semibold text-primary">{cls}</p>
                <p className="text-2xl font-bold mt-2">{45 + i * 2}</p>
                <p className="text-xs text-muted-foreground mt-1">élèves</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h2 className="text-xl font-bold mb-4">Actions rapides</h2>
          <div className="space-y-2">
            <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 flex items-center gap-2 text-sm font-medium">
              <Plus className="w-4 h-4" /> Nouvel étudiant
            </button>
            <button className="w-full px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 flex items-center gap-2 text-sm font-medium">
              <FileText className="w-4 h-4" /> Générer bulletins
            </button>
            <button className="w-full px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 flex items-center gap-2 text-sm font-medium">
              <Download className="w-4 h-4" /> Exporter rapports
            </button>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h2 className="text-xl font-bold mb-4">Activités récentes</h2>
        <div className="space-y-3">
          {[
            { action: '5 bulletins validés', time: 'Il y a 2h', icon: CheckCircle },
            { action: 'Paiement de 500k Ar enregistré', time: 'Il y a 4h', icon: DollarSign },
            { action: '3 nouveaux élèves inscrits', time: 'Il y a 1j', icon: Users },
            { action: 'Rapport mensuel généré', time: 'Il y a 2j', icon: FileText }
          ].map((item, i) => {
            const Icon = item.icon
            return (
              <div key={i} className="flex items-center gap-3 p-3 border border-border rounded-lg">
                <Icon className="w-4 h-4 text-primary flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-medium text-sm">{item.action}</p>
                  <p className="text-xs text-muted-foreground">{item.time}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )

  const StudentsManagement = () => {
    const [showForm, setShowForm] = useState(false)
    const students = [
      { id: 1, matricule: '24-001', name: 'Jean Dupont', class: '2nde C', status: 'Actif' },
      { id: 2, matricule: '24-002', name: 'Marie Jean', class: '2nde C', status: 'Actif' },
      { id: 3, matricule: '24-003', name: 'Paul Rakoto', class: '1ère S', status: 'Actif' }
    ]

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Gestion des étudiants</h1>
            <p className="text-muted-foreground mt-1">Inscription, modification et suivi des profils</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 font-medium"
          >
            <Plus className="w-4 h-4" /> Nouvel étudiant
          </button>
        </div>

        {showForm && (
          <div className="bg-card rounded-lg border border-border p-6">
            <h2 className="text-xl font-bold mb-4">Inscription nouvel étudiant</h2>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="Prénom" className="px-4 py-2 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary" />
                <input type="text" placeholder="Nom" className="px-4 py-2 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary" />
                <input type="email" placeholder="Email" className="px-4 py-2 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary" />
                <input type="tel" placeholder="Téléphone" className="px-4 py-2 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary" />
                <select className="px-4 py-2 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>Filière</option>
                  <option>Scientifique</option>
                  <option>Littéraire</option>
                </select>
                <select className="px-4 py-2 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>Classe</option>
                  <option>2nde</option>
                  <option>1ère</option>
                  <option>Terminale</option>
                </select>
              </div>
              <div className="flex gap-3">
                <button type="submit" className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 font-medium">Inscrire</button>
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 font-medium">Annuler</button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">Matricule</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Nom</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Classe</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Statut</th>
                <th className="px-6 py-3 text-center text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {students.map(s => (
                <tr key={s.id} className="hover:bg-muted/50">
                  <td className="px-6 py-4 text-sm font-mono">{s.matricule}</td>
                  <td className="px-6 py-4 text-sm font-medium">{s.name}</td>
                  <td className="px-6 py-4 text-sm">{s.class}</td>
                  <td className="px-6 py-4 text-sm"><span className="px-2 py-1 bg-green-500/20 text-green-600 rounded text-xs font-medium">{s.status}</span></td>
                  <td className="px-6 py-4 text-sm text-center space-x-2">
                    <button className="text-primary hover:underline"><Edit2 className="w-4 h-4 inline" /></button>
                    <button className="text-destructive hover:underline"><Trash2 className="w-4 h-4 inline" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  const AcademicManagement = () => {
    const [activeSubTab, setActiveSubTab] = useState('classes')

    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Gestion Académique</h1>
          <p className="text-muted-foreground mt-1">Classes, filières, matières et emplois du temps</p>
        </div>

        <div className="flex gap-2 border-b border-border">
          {['classes', 'matieres', 'emplois', 'programmes'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveSubTab(tab)}
              className={`px-4 py-2 font-medium border-b-2 ${
                activeSubTab === tab ? 'border-primary text-primary' : 'border-transparent text-muted-foreground'
              }`}
            >
              {tab === 'classes' && 'Classes'}
              {tab === 'matieres' && 'Matières'}
              {tab === 'emplois' && 'Emplois du temps'}
              {tab === 'programmes' && 'Programmes'}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {['6ème A', '2nde C', '1ère S', 'Terminale C'].map((cls, i) => (
            <div key={i} className="bg-card rounded-lg border border-border p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-bold">{cls}</h3>
                <span className="text-sm font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">45 élèves</span>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground mb-4">
                <p>Prof principal: <span className="font-semibold text-foreground">À assigner</span></p>
                <p>Matières: 7</p>
                <p>Emploi du temps: Configuré</p>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 px-3 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 text-sm font-medium">Éditer</button>
                <button className="flex-1 px-3 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 text-sm font-medium">Voir</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const GradesEvaluation = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Notes & Évaluations</h1>
        <p className="text-muted-foreground mt-1">Consultation et validation des notes, bulletins et relevés</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-card rounded-lg border border-border p-6">
          <p className="text-sm text-muted-foreground">Bulletins validés</p>
          <p className="text-3xl font-bold mt-2">285</p>
          <p className="text-xs text-green-600 mt-2">↑ 12% vs année passée</p>
        </div>
        <div className="bg-card rounded-lg border border-border p-6">
          <p className="text-sm text-muted-foreground">En attente de validation</p>
          <p className="text-3xl font-bold mt-2">45</p>
          <p className="text-xs text-orange-600 mt-2">À traiter</p>
        </div>
        <div className="bg-card rounded-lg border border-border p-6">
          <p className="text-sm text-muted-foreground">Moyenne générale</p>
          <p className="text-3xl font-bold mt-2">12.8</p>
          <p className="text-xs text-blue-600 mt-2">Sur 20</p>
        </div>
      </div>

      <div className="bg-card rounded-lg border border-border p-6">
        <h2 className="text-xl font-bold mb-4">Bulletins à valider</h2>
        <div className="space-y-2">
          {['Jean Dupont', 'Marie Jean', 'Paul Rakoto'].map((name, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <p className="font-medium">{name}</p>
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-green-500/20 text-green-600 rounded text-sm font-medium hover:bg-green-500/30">Valider</button>
                <button className="px-3 py-1 bg-red-500/20 text-red-600 rounded text-sm font-medium hover:bg-red-500/30">Rejeter</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const AttendanceAbsence = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Présence & Absences</h1>
        <p className="text-muted-foreground mt-1">Suivi et justification des absences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-card rounded-lg border border-border p-6">
          <p className="text-sm text-muted-foreground">Taux présence général</p>
          <p className="text-3xl font-bold mt-2">94.5%</p>
          <p className="text-xs text-green-600 mt-2">Excellent</p>
        </div>
        <div className="bg-card rounded-lg border border-border p-6">
          <p className="text-sm text-muted-foreground">Absences cette semaine</p>
          <p className="text-3xl font-bold mt-2">23</p>
          <p className="text-xs text-muted-foreground mt-2">À justifier</p>
        </div>
        <div className="bg-card rounded-lg border border-border p-6">
          <p className="text-sm text-muted-foreground">Justifications en attente</p>
          <p className="text-3xl font-bold mt-2">8</p>
          <p className="text-xs text-orange-600 mt-2">À valider</p>
        </div>
      </div>

      <div className="bg-card rounded-lg border border-border p-6">
        <h2 className="text-xl font-bold mb-4">Justifications en attente</h2>
        <div className="space-y-3">
          {[
            { student: 'Jean Dupont', date: '2026-01-20', raison: 'Maladie' },
            { student: 'Marie Jean', date: '2026-01-19', raison: 'RDV médical' }
          ].map((item, i) => (
            <div key={i} className="border border-border rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="font-semibold">{item.student}</p>
                  <p className="text-sm text-muted-foreground">{item.date} - {item.raison}</p>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-green-500/20 text-green-600 rounded text-sm font-medium hover:bg-green-500/30">Valider</button>
                  <button className="px-3 py-1 bg-red-500/20 text-red-600 rounded text-sm font-medium hover:bg-red-500/30">Rejeter</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const AdministrativeManagement = () => {
    const [activeSubTab, setActiveSubTab] = useState('paiements')

    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Gestion Administrative</h1>
          <p className="text-muted-foreground mt-1">Paiements, documents et utilisateurs</p>
        </div>

        <div className="flex gap-2 border-b border-border">
          {['paiements', 'documents', 'utilisateurs'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveSubTab(tab)}
              className={`px-4 py-2 font-medium border-b-2 ${
                activeSubTab === tab ? 'border-primary text-primary' : 'border-transparent text-muted-foreground'
              }`}
            >
              {tab === 'paiements' && 'Paiements'}
              {tab === 'documents' && 'Documents'}
              {tab === 'utilisateurs' && 'Utilisateurs'}
            </button>
          ))}
        </div>

        {activeSubTab === 'paiements' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-card rounded-lg border border-border p-6">
                <p className="text-sm text-muted-foreground">Revenus collectés</p>
                <p className="text-3xl font-bold mt-2">15.2M Ar</p>
              </div>
              <div className="bg-card rounded-lg border border-border p-6">
                <p className="text-sm text-muted-foreground">Dettes totales</p>
                <p className="text-3xl font-bold mt-2 text-destructive">2.8M Ar</p>
              </div>
              <div className="bg-card rounded-lg border border-border p-6">
                <p className="text-sm text-muted-foreground">Taux recouvrement</p>
                <p className="text-3xl font-bold mt-2">84.5%</p>
              </div>
            </div>
            <div className="bg-card rounded-lg border border-border p-6">
              <h2 className="text-xl font-bold mb-4">Élèves avec dettes</h2>
              <div className="space-y-2">
                {[
                  { name: 'Jean Paul', montant: 250000 },
                  { name: 'Marie Rakoto', montant: 500000 }
                ].map((debt, i) => (
                  <div key={i} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <p className="font-medium">{debt.name}</p>
                    <p className="font-bold text-destructive">{debt.montant.toLocaleString()} Ar</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeSubTab === 'documents' && (
          <div className="bg-card rounded-lg border border-border p-6">
            <h2 className="text-xl font-bold mb-4">Documents disponibles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['Attestations', 'Certificats', 'Cartes étudiantes', 'Bulletins'].map((doc, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <p className="font-medium">{doc}</p>
                  <button className="text-primary font-medium hover:underline flex items-center gap-2">
                    <Download className="w-4 h-4" /> Générer
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSubTab === 'utilisateurs' && (
          <div className="bg-card rounded-lg border border-border p-6">
            <h2 className="text-xl font-bold mb-4">Gestion des utilisateurs</h2>
            <table className="w-full text-sm">
              <thead className="bg-muted border-b border-border">
                <tr>
                  <th className="px-4 py-2 text-left">Nom</th>
                  <th className="px-4 py-2 text-left">Rôle</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  { name: 'Admin', role: 'Administrateur', email: 'admin@lycee.ma' },
                  { name: 'Prof. Martin', role: 'Enseignant', email: 'martin@lycee.ma' }
                ].map((user, i) => (
                  <tr key={i} className="hover:bg-muted/50">
                    <td className="px-4 py-3">{user.name}</td>
                    <td className="px-4 py-3"><span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">{user.role}</span></td>
                    <td className="px-4 py-3">{user.email}</td>
                    <td className="px-4 py-3 text-center space-x-2">
                      <button className="text-primary hover:underline"><Edit2 className="w-4 h-4 inline" /></button>
                      <button className="text-destructive hover:underline"><Trash2 className="w-4 h-4 inline" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    )
  }

  const Communication = () => {
    const [activeSubTab, setActiveSubTab] = useState('notifications')

    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Communication</h1>
          <p className="text-muted-foreground mt-1">Notifications, messagerie et emails</p>
        </div>

        <div className="flex gap-2 border-b border-border">
          {['notifications', 'messagerie', 'emails'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveSubTab(tab)}
              className={`px-4 py-2 font-medium border-b-2 ${
                activeSubTab === tab ? 'border-primary text-primary' : 'border-transparent text-muted-foreground'
              }`}
            >
              {tab === 'notifications' && 'Notifications'}
              {tab === 'messagerie' && 'Messagerie'}
              {tab === 'emails' && 'Templates Emails'}
            </button>
          ))}
        </div>

        {activeSubTab === 'notifications' && (
          <div className="space-y-4">
            <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 font-medium flex items-center gap-2 justify-center">
              <Plus className="w-4 h-4" /> Nouvelle notification
            </button>
            <div className="space-y-3">
              {['Annonce: Fermeture le 25 jan', 'Rappel: Paiement des frais', 'Conseil de classe demain'].map((notif, i) => (
                <div key={i} className="bg-card rounded-lg border border-border p-4 flex justify-between items-center">
                  <p className="font-medium">{notif}</p>
                  <button className="text-destructive text-sm hover:underline">Supprimer</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSubTab === 'messagerie' && (
          <div className="bg-card rounded-lg border border-border p-6">
            <h2 className="text-lg font-bold mb-4">Messagerie interne</h2>
            <p className="text-muted-foreground mb-4">Accès complet à tous les messages du système</p>
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 font-medium">Accéder à la messagerie</button>
          </div>
        )}

        {activeSubTab === 'emails' && (
          <div className="space-y-4">
            {['Confirmation inscription', 'Rappel paiement', 'Résultats d\'examen'].map((template, i) => (
              <div key={i} className="bg-card rounded-lg border border-border p-4">
                <p className="font-semibold mb-2">{template}</p>
                <div className="flex gap-2">
                  <button className="text-sm text-primary hover:underline">Éditer</button>
                  <button className="text-sm text-muted-foreground hover:underline">Aperçu</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  const Reports = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Rapports & Statistiques</h1>
        <p className="text-muted-foreground mt-1">Analyses et exports de données</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { title: 'Effectifs par classe', icon: Layers },
          { title: 'Performances académiques', icon: BarChart3 },
          { title: 'Taux d\'absences', icon: Clock },
          { title: 'Rapports financiers', icon: DollarSign }
        ].map((report, i) => {
          const Icon = report.icon
          return (
            <div key={i} className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center gap-3 mb-4">
                <Icon className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">{report.title}</h3>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 px-3 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 text-sm font-medium">Voir</button>
                <button className="flex-1 px-3 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 text-sm font-medium flex items-center justify-center gap-1">
                  <Download className="w-4 h-4" /> Exporter
                </button>
              </div>
            </div>
          )
        })}
      </div>

      <div className="bg-card rounded-lg border border-border p-6">
        <h2 className="text-lg font-bold mb-4">Rapports personnalisés</h2>
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select className="px-4 py-2 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary">
              <option>Type de rapport</option>
              <option>Académique</option>
              <option>Financier</option>
            </select>
            <select className="px-4 py-2 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary">
              <option>Période</option>
              <option>Trimestre 1</option>
              <option>Année complète</option>
            </select>
            <button type="button" className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 font-medium">Générer</button>
          </div>
        </form>
      </div>
    </div>
  )

  const SystemSettings = () => {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Paramètres système</h1>
          <p className="text-muted-foreground mt-1">Configuration et gestion du système</p>
        </div>

        <div className="bg-card rounded-lg border border-border p-6">
          <h2 className="text-xl font-bold mb-6">Année scolaire</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Année actuelle</label>
              <input type="text" defaultValue="2025-2026" className="w-full px-4 py-2 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['T1 (15 sept - 15 déc)', 'T2 (16 déc - 15 mars)', 'T3 (16 mars - 30 juin)'].map((term, i) => (
                <div key={i}>
                  <label className="block text-sm font-semibold mb-2">{term.split('(')[0].trim()}</label>
                  <input type="text" defaultValue={term.split('(')[1].split(')')[0]} className="w-full px-4 py-2 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg border border-border p-6">
          <h2 className="text-xl font-bold mb-6">Règles académiques</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Moyenne minimale</label>
                <input type="number" defaultValue="10" className="w-full px-4 py-2 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Seuil absences (%)</label>
                <input type="number" defaultValue="20" className="w-full px-4 py-2 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg border border-border p-6">
          <h2 className="text-xl font-bold mb-6">Filières et niveaux</h2>
          <div className="space-y-3">
            {['Scientifique', 'Littéraire', 'Technique'].map((filiere, i) => (
              <div key={i} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <p className="font-medium">{filiere}</p>
                <div className="flex gap-2">
                  <button className="text-primary text-sm hover:underline"><Edit2 className="w-4 h-4 inline" /></button>
                  <button className="text-destructive text-sm hover:underline"><Trash2 className="w-4 h-4 inline" /></button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 font-medium">Enregistrer</button>
          <button className="px-6 py-3 bg-muted text-foreground rounded-lg hover:bg-muted/80 font-medium">Annuler</button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-20">
        <div className="flex justify-between items-center px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 hover:bg-muted rounded-lg"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div>
              <h1 className="text-2xl font-bold text-primary">SIG-Lycée</h1>
              <p className="text-xs text-muted-foreground">Système Informatisé de Gestion</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-destructive hover:bg-muted rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="hidden sm:inline">Déconnexion</span>
          </button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${
          sidebarOpen ? 'w-64' : 'w-0'
        } bg-sidebar border-r border-sidebar-border overflow-y-auto transition-all duration-300 hidden md:block fixed md:relative h-[calc(100vh-73px)]`}>
          <nav className="p-4 space-y-2">
            {menuItems.map(item => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium ${
                    activeTab === item.id
                      ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent'
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{item.label}</span>
                </button>
              )
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto md:ml-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {activeTab === 'home' && <DashboardOverview />}
            {activeTab === 'etudiants' && <StudentsManagement />}
            {activeTab === 'academique' && <AcademicManagement />}
            {activeTab === 'notes' && <GradesEvaluation />}
            {activeTab === 'presence' && <AttendanceAbsence />}
            {activeTab === 'admin' && <AdministrativeManagement />}
            {activeTab === 'communication' && <Communication />}
            {activeTab === 'rapports' && <Reports />}
            {activeTab === 'parametres' && <SystemSettings />}
          </div>
        </main>
      </div>
    </div>
  )
}

function StatCard({ title, value, change, icon: Icon, trend }) {
  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
          <div className="flex items-center gap-1 mt-2">
            {trend === 'up' ? <TrendingUp className="w-4 h-4 text-green-500" /> : <TrendingDown className="w-4 h-4 text-red-500" />}
            <p className={`text-xs font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>{change}</p>
          </div>
        </div>
        <div className="bg-primary/10 rounded-lg p-3">
          <Icon className="w-6 h-6 text-primary" />
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
