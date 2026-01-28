'use client'

import { useState } from 'react'
import {
  LogOut, User, BookOpen, BarChart3, Clock, FileText,
  MessageSquare, Menu, X, Download, Eye, Bell, Home, Calendar, AlertCircle
} from 'lucide-react'

function StudentDashboard() {
  const [activeTab, setActiveTab] = useState('home')
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const menuItems = [
    { id: 'home', label: 'Tableau de bord', icon: Home },
    { id: 'profil', label: 'Mon Profil', icon: User },
    { id: 'academique', label: 'Gestion Académique', icon: BookOpen },
    { id: 'notes', label: 'Notes & Résultats', icon: BarChart3 },
    { id: 'presence', label: 'Présence', icon: Clock },
    { id: 'admin', label: 'Gestion Administrative', icon: FileText },
    { id: 'communication', label: 'Communications', icon: MessageSquare },
    { id: 'documents', label: 'Mes Documents', icon: FileText }
  ]

  const handleLogout = () => {
    alert('Déconnexion effectuée')
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
              <h1 className="text-2xl font-bold text-primary">SIG-Lycée Étudiant</h1>
              <p className="text-xs text-muted-foreground">Portail Étudiant Sécurisé</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-muted rounded-lg relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-destructive hover:bg-muted rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="hidden sm:inline">Déconnexion</span>
            </button>
          </div>
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
            {activeTab === 'home' && <StudentDashboardOverview />}
            {activeTab === 'profil' && <StudentProfile />}
            {activeTab === 'academique' && <AcademicManagement />}
            {activeTab === 'notes' && <GradesResults />}
            {activeTab === 'presence' && <AttendanceTracking />}
            {activeTab === 'admin' && <AdministrativeStatus />}
            {activeTab === 'communication' && <Communications />}
            {activeTab === 'documents' && <MyDocuments />}
          </div>
        </main>
      </div>
    </div>
  )
}

// ============ DASHBOARD OVERVIEW ============
function StudentDashboardOverview() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Tableau de bord</h1>
        <p className="text-muted-foreground mt-1">Bienvenue sur votre portail étudiant sécurisé</p>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <InfoCard title="Classe" value="2nde C" icon={BookOpen} />
        <InfoCard title="Moyenne générale" value="12.8/20" icon={BarChart3} />
        <InfoCard title="Taux présence" value="94.5%" icon={Clock} />
        <InfoCard title="Paiements" value="À jour" icon={FileText} status="good" />
      </div>

      {/* Quick Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-lg border border-border p-6">
          <h2 className="text-xl font-bold mb-4">Mes matières</h2>
          <div className="space-y-3">
            {[
              { name: 'Mathématiques', prof: 'M. Dupont', avg: 14.5 },
              { name: 'Français', prof: 'Mme Martin', avg: 12.0 },
              { name: 'Anglais', prof: 'M. Johnson', avg: 13.5 }
            ].map((subject, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <p className="font-semibold text-sm">{subject.name}</p>
                  <p className="text-xs text-muted-foreground">{subject.prof}</p>
                </div>
                <p className="font-bold text-primary">{subject.avg}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-lg border border-border p-6">
          <h2 className="text-xl font-bold mb-4">Annonces récentes</h2>
          <div className="space-y-3">
            {[
              { message: 'Réunion parents-profs mercredi', date: "Aujourd'hui" },
              { message: 'Bulletins validés pour T2', date: 'Il y a 2j' },
              { message: 'Fermeture établissement 25 jan', date: 'Il y a 3j' }
            ].map((annonce, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                <Bell className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">{annonce.message}</p>
                  <p className="text-xs text-muted-foreground">{annonce.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function InfoCard({ title, value, icon: Icon, status }) {
  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold mt-2">{value}</p>
        </div>
        <div className={`rounded-lg p-3 ${status === 'good' ? 'bg-green-500/10' : 'bg-primary/10'}`}>
          <Icon className={`w-6 h-6 ${status === 'good' ? 'text-green-600' : 'text-primary'}`} />
        </div>
      </div>
    </div>
  )
}

// ============ STUDENT PROFILE ============
function StudentProfile() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Mon Profil</h1>
        <p className="text-muted-foreground mt-1">Consultation de vos informations personnelles et académiques</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1 bg-card rounded-lg border border-border p-6">
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <User className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-xl font-bold">Jean Dupont</h2>
            <p className="text-sm text-muted-foreground">Étudiant</p>
            <div className="mt-6 space-y-2 w-full text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Matricule:</span>
                <span className="font-semibold">24-001</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Classe:</span>
                <span className="font-semibold">2nde C</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Filière:</span>
                <span className="font-semibold">Générale</span>
              </div>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="lg:col-span-2 bg-card rounded-lg border border-border p-6">
          <h2 className="text-lg font-bold mb-6">Informations personnelles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Prénom</p>
              <p className="font-semibold">Jean</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Nom</p>
              <p className="font-semibold">Dupont</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Email</p>
              <p className="font-semibold">jean.dupont@lycee.ma</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Téléphone</p>
              <p className="font-semibold">+261 32 XX XX XX</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Date d'inscription</p>
              <p className="font-semibold">01/09/2024</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Statut</p>
              <span className="px-3 py-1 bg-green-500/20 text-green-600 text-xs rounded-full font-medium">Actif</span>
            </div>
          </div>
        </div>
      </div>

      {/* Academic History */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h2 className="text-lg font-bold mb-4">Historique académique</h2>
        <div className="space-y-3">
          {[
            { year: '2023-2024', class: '3ème', avg: 11.5, status: 'Admis' },
            { year: '2024-2025', class: '2nde C', avg: 12.8, status: 'En cours' }
          ].map((record, i) => (
            <div key={i} className="flex justify-between items-center p-4 bg-muted rounded-lg">
              <div>
                <p className="font-semibold">{record.year} - {record.class}</p>
                <p className="text-sm text-muted-foreground">Moyenne: {record.avg}/20</p>
              </div>
              <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                record.status === 'Admis' ? 'bg-green-500/20 text-green-600' : 'bg-blue-500/20 text-blue-600'
              }`}>
                {record.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ============ ACADEMIC MANAGEMENT ============
function AcademicManagement() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Gestion Académique</h1>
        <p className="text-muted-foreground mt-1">Consultation de votre emploi du temps et programme</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Schedule */}
        <div className="lg:col-span-2 bg-card rounded-lg border border-border p-6">
          <h2 className="text-lg font-bold mb-4">Mon emploi du temps</h2>
          <div className="space-y-3">
            {[
              { day: 'Lundi', time: '08h-10h', subject: 'Mathématiques', prof: 'M. Dupont', room: 'S103' },
              { day: 'Lundi', time: '10h-12h', subject: 'Français', prof: 'Mme Martin', room: 'L204' },
              { day: 'Mardi', time: '09h-11h', subject: 'Anglais', prof: 'M. Johnson', room: 'L105' },
              { day: 'Mardi', time: '14h-16h', subject: 'Mathématiques', prof: 'M. Dupont', room: 'S103' },
              { day: 'Jeudi', time: '10h-12h', subject: 'Sciences', prof: 'Mme Rousseau', room: 'LAB1' }
            ].map((slot, i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                <Calendar className="w-5 h-5 text-primary flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-semibold">{slot.day} {slot.time}</p>
                  <p className="text-sm text-muted-foreground">{slot.subject} - {slot.prof}</p>
                </div>
                <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">{slot.room}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h2 className="text-lg font-bold mb-4">Mes matières</h2>
          <div className="space-y-3">
            {[
              { name: 'Mathématiques', hours: '4h/sem' },
              { name: 'Français', hours: '4h/sem' },
              { name: 'Anglais', hours: '3h/sem' },
              { name: 'Sciences', hours: '3h/sem' }
            ].map((subject, i) => (
              <div key={i} className="flex justify-between items-center p-3 bg-muted rounded-lg text-sm">
                <span className="font-medium">{subject.name}</span>
                <span className="text-muted-foreground">{subject.hours}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Program */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h2 className="text-lg font-bold mb-4">Programme par matière</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { subject: 'Mathématiques', program: 'Algèbre, Géométrie, Probabilités, Statistiques' },
            { subject: 'Français', program: 'Littérature, Grammaire, Écriture, Compréhension' }
          ].map((item, i) => (
            <div key={i} className="border border-border rounded-lg p-4">
              <p className="font-semibold mb-2">{item.subject}</p>
              <p className="text-sm text-muted-foreground">{item.program}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ============ GRADES & RESULTS ============
function GradesResults() {
  const [selectedPeriod, setSelectedPeriod] = useState('T2')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Notes & Résultats</h1>
        <p className="text-muted-foreground mt-1">Consultation de vos notes et résultats académiques</p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {['T1', 'T2', 'T3'].map(period => (
          <button
            key={period}
            onClick={() => setSelectedPeriod(period)}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
              selectedPeriod === period
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted hover:bg-muted/80'
            }`}
          >
            {period}
          </button>
        ))}
      </div>

      {/* Grades Table */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">Matière</th>
              <th className="px-6 py-3 text-center text-sm font-semibold">Contrôle 1</th>
              <th className="px-6 py-3 text-center text-sm font-semibold">Contrôle 2</th>
              <th className="px-6 py-3 text-center text-sm font-semibold">Contrôle 3</th>
              <th className="px-6 py-3 text-center text-sm font-semibold">Moyenne</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {[
              { subject: 'Mathématiques', c1: 14, c2: 15, c3: 14.5, avg: 14.5 },
              { subject: 'Français', c1: 12, c2: 11.5, c3: 12.5, avg: 12.0 },
              { subject: 'Anglais', c1: 13, c2: 14, c3: 13.5, avg: 13.5 },
              { subject: 'Sciences', c1: 15, c2: 15.5, c3: 15, avg: 15.2 }
            ].map((row, i) => (
              <tr key={i} className="hover:bg-muted/50">
                <td className="px-6 py-4 text-sm font-medium">{row.subject}</td>
                <td className="px-6 py-4 text-center text-sm font-semibold">{row.c1}</td>
                <td className="px-6 py-4 text-center text-sm font-semibold">{row.c2}</td>
                <td className="px-6 py-4 text-center text-sm font-semibold">{row.c3}</td>
                <td className="px-6 py-4 text-center text-sm font-bold text-primary">{row.avg}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card rounded-lg border border-border p-6">
          <p className="text-sm text-muted-foreground">Moyenne générale</p>
          <p className="text-3xl font-bold mt-2">13.8/20</p>
        </div>
        <div className="bg-card rounded-lg border border-border p-6">
          <p className="text-sm text-muted-foreground">Rang</p>
          <p className="text-3xl font-bold mt-2">5e/32</p>
        </div>
        <div className="bg-card rounded-lg border border-border p-6">
          <p className="text-sm text-muted-foreground">Meilleure matière</p>
          <p className="text-3xl font-bold mt-2">Sciences</p>
        </div>
      </div>

      {/* Bulletin */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold">Bulletin {selectedPeriod}</h2>
            <p className="text-sm text-muted-foreground mt-1">Téléchargez votre bulletin officiel</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 font-medium">
            <Download className="w-4 h-4" /> Télécharger
          </button>
        </div>
      </div>
    </div>
  )
}

// ============ ATTENDANCE TRACKING ============
function AttendanceTracking() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Suivi de Présence</h1>
        <p className="text-muted-foreground mt-1">Consultation de votre présence et absences</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card rounded-lg border border-border p-6">
          <p className="text-sm text-muted-foreground">Présences</p>
          <p className="text-3xl font-bold mt-2 text-green-600">128</p>
          <p className="text-xs text-muted-foreground mt-1">Jours présents</p>
        </div>
        <div className="bg-card rounded-lg border border-border p-6">
          <p className="text-sm text-muted-foreground">Absences</p>
          <p className="text-3xl font-bold mt-2 text-destructive">3</p>
          <p className="text-xs text-muted-foreground mt-1">À justifier</p>
        </div>
        <div className="bg-card rounded-lg border border-border p-6">
          <p className="text-sm text-muted-foreground">Retards</p>
          <p className="text-3xl font-bold mt-2 text-orange-600">2</p>
          <p className="text-xs text-muted-foreground mt-1">Enregistrés</p>
        </div>
      </div>

      {/* Detailed List */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h2 className="text-lg font-bold mb-4">Historique des absences</h2>
        <div className="space-y-3">
          {[
            { date: '2026-01-20', status: 'Absent', justification: 'Maladie - justifié' },
            { date: '2026-01-15', status: 'Retard', justification: 'Raison personnelle - justifié' },
            { date: '2026-01-10', status: 'Absent', justification: 'En attente de justification' }
          ].map((record, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div>
                <p className="font-semibold text-sm">{record.date}</p>
                <p className="text-xs text-muted-foreground">{record.justification}</p>
              </div>
              <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                record.status === 'Absent' && record.justification.includes('En attente')
                  ? 'bg-orange-500/20 text-orange-600'
                  : 'bg-green-500/20 text-green-600'
              }`}>
                {record.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ============ ADMINISTRATIVE STATUS ============
function AdministrativeStatus() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Gestion Administrative</h1>
        <p className="text-muted-foreground mt-1">Consultation de vos paiements et statut</p>
      </div>

      {/* Payment Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-card rounded-lg border border-border p-6">
          <p className="text-sm text-muted-foreground">Frais de scolarité</p>
          <p className="text-2xl font-bold mt-2">À jour</p>
          <div className="mt-4 w-full bg-muted rounded-full h-2">
            <div className="bg-green-600 h-2 rounded-full" style={{width: '100%'}}></div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Solde: 0 Ar</p>
        </div>
        <div className="bg-card rounded-lg border border-border p-6">
          <p className="text-sm text-muted-foreground">Frais de documentation</p>
          <p className="text-2xl font-bold mt-2">À jour</p>
          <div className="mt-4 w-full bg-muted rounded-full h-2">
            <div className="bg-green-600 h-2 rounded-full" style={{width: '100%'}}></div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Solde: 0 Ar</p>
        </div>
        <div className="bg-card rounded-lg border border-border p-6">
          <p className="text-sm text-muted-foreground">Autres frais</p>
          <p className="text-2xl font-bold mt-2">À jour</p>
          <div className="mt-4 w-full bg-muted rounded-full h-2">
            <div className="bg-green-600 h-2 rounded-full" style={{width: '100%'}}></div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Solde: 0 Ar</p>
        </div>
      </div>

      {/* Payment History */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h2 className="text-lg font-bold mb-4">Historique des paiements</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Description</th>
                <th className="px-4 py-2 text-center">Montant</th>
                <th className="px-4 py-2 text-center">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                { date: '2026-01-15', desc: 'Frais de scolarité T2', amount: '500,000 Ar', status: 'Payé' },
                { date: '2026-01-01', desc: 'Frais de documentation', amount: '50,000 Ar', status: 'Payé' },
                { date: '2025-12-20', desc: 'Frais de scolarité T1', amount: '500,000 Ar', status: 'Payé' }
              ].map((payment, i) => (
                <tr key={i} className="hover:bg-muted/50">
                  <td className="px-4 py-3">{payment.date}</td>
                  <td className="px-4 py-3">{payment.desc}</td>
                  <td className="px-4 py-3 text-center font-semibold">{payment.amount}</td>
                  <td className="px-4 py-3 text-center"><span className="px-3 py-1 bg-green-500/20 text-green-600 text-xs rounded-full font-medium">{payment.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// ============ COMMUNICATIONS ============
function Communications() {
  const [activeTab, setActiveTab] = useState('notifications')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Communications</h1>
        <p className="text-muted-foreground mt-1">Notifications, messagerie et communications</p>
      </div>

      <div className="flex gap-2 border-b border-border">
        {['notifications', 'messagerie'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-medium border-b-2 ${
              activeTab === tab ? 'border-primary text-primary' : 'border-transparent text-muted-foreground'
            }`}
          >
            {tab === 'notifications' && 'Notifications'}
            {tab === 'messagerie' && 'Messagerie interne'}
          </button>
        ))}
      </div>

      {activeTab === 'notifications' && (
        <div className="space-y-3">
          {[
            { message: 'Annonce: Fermeture le 25 janvier', date: "Aujourd'hui", type: 'Annonce' },
            { message: 'Résultats: Contrôle 3 validés', date: 'Il y a 2j', type: 'Résultats' },
            { message: 'Devoir: Exercices 1-10 page 45 pour lundi', date: 'Il y a 3j', type: 'Devoir' },
            { message: 'Rappel: Réunion parents-profs demain', date: 'Il y a 4j', type: 'Rappel' }
          ].map((notif, i) => (
            <div key={i} className="bg-card rounded-lg border border-border p-4 flex items-start gap-4">
              <Bell className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-semibold">{notif.message}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-muted-foreground">{notif.date}</span>
                  <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full font-medium">{notif.type}</span>
                </div>
              </div>
              <Eye className="w-4 h-4 text-muted-foreground cursor-pointer hover:text-foreground" />
            </div>
          ))}
        </div>
      )}

      {activeTab === 'messagerie' && (
        <div className="space-y-3">
          {[
            { from: 'M. Dupont (Professeur)', subject: 'Correction du contrôle 3', date: 'Hier' },
            { from: 'Administration', subject: 'Renouvellement de la carte étudiant', date: 'Il y a 2j' },
            { from: 'Mme Martin (Professeur)', subject: 'Absence à justifier', date: 'Il y a 3j' }
          ].map((msg, i) => (
            <div key={i} className="bg-card rounded-lg border border-border p-4 cursor-pointer hover:bg-muted transition-colors">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold">{msg.from}</p>
                  <p className="text-sm text-muted-foreground mt-1">{msg.subject}</p>
                </div>
                <p className="text-xs text-muted-foreground whitespace-nowrap">{msg.date}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ============ MY DOCUMENTS ============
function MyDocuments() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Mes Documents</h1>
        <p className="text-muted-foreground mt-1">Téléchargement de vos documents personnels</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { name: 'Attestation de scolarité', icon: FileText, available: true },
          { name: 'Certificat de réussite', icon: FileText, available: true },
          { name: 'Relevé de notes', icon: FileText, available: true },
          { name: 'Carte étudiant', icon: FileText, available: false }
        ].map((doc, i) => (
          <div key={i} className="bg-card rounded-lg border border-border p-6">
            <div className="flex items-start justify-between mb-4">
              <FileText className="w-8 h-8 text-primary" />
              {doc.available && <Download className="w-4 h-4 text-primary cursor-pointer hover:text-primary/80" />}
            </div>
            <h3 className="font-semibold mb-2">{doc.name}</h3>
            {doc.available ? (
              <button className="w-full px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 text-sm font-medium flex items-center justify-center gap-2">
                <Download className="w-4 h-4" /> Télécharger
              </button>
            ) : (
              <p className="text-xs text-muted-foreground">Non disponible pour le moment</p>
            )}
          </div>
        ))}
      </div>

      {/* Recent Downloads */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h2 className="text-lg font-bold mb-4">Téléchargements récents</h2>
        <div className="space-y-2">
          {[
            'Bulletin_T2_2025-2026.pdf',
            'Attestation_Scolarite_2025.pdf',
            'Releve_Notes_T1_2025-2026.pdf'
          ].map((file, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-muted rounded-lg text-sm">
              <FileText className="w-4 h-4 text-primary flex-shrink-0" />
              <span>{file}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default StudentDashboard;
