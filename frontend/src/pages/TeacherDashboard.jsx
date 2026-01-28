'use client'

import { useState } from 'react'
import {
  LogOut, Users, BookOpen, BarChart3, Clock, FileText,
  MessageSquare, Menu, X, Download, Edit2, Plus, TrendingUp,
  Calendar, CheckCircle, AlertCircle, Home, Settings, Send, Bell, Eye
} from 'lucide-react'

function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState('home')
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const menuItems = [
    { id: 'home', label: 'Tableau de bord', icon: Home },
    { id: 'academique', label: 'Gestion Académique', icon: BookOpen },
    { id: 'notes', label: 'Notes & Évaluations', icon: BarChart3 },
    { id: 'presence', label: 'Présence & Absences', icon: Clock },
    { id: 'communication', label: 'Communication', icon: MessageSquare },
    { id: 'historique', label: 'Historique Étudiants', icon: FileText },
    { id: 'rapports', label: 'Rapports', icon: BarChart3 },
    { id: 'parametres', label: 'Paramètres', icon: Settings }
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
              <h1 className="text-2xl font-bold text-primary">SIG-Lycée Enseignant</h1>
              <p className="text-xs text-muted-foreground">Prof. Jean Dupont - Mathématiques</p>
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
            {activeTab === 'home' && <TeacherDashboardOverview />}
            {activeTab === 'academique' && <AcademicManagement />}
            {activeTab === 'notes' && <GradesEvaluation />}
            {activeTab === 'presence' && <AttendanceAbsence />}
            {activeTab === 'communication' && <Communication />}
            {activeTab === 'historique' && <StudentHistory />}
            {activeTab === 'rapports' && <TeacherReports />}
            {activeTab === 'parametres' && <TeacherSettings />}
          </div>
        </main>
      </div>
    </div>
  )
}

// ============ TEACHER DASHBOARD OVERVIEW ============
function TeacherDashboardOverview() {
  const myClasses = [
    { id: 1, name: '2nde C', students: 32, avgGrade: 12.8 },
    { id: 2, name: '1ère S', students: 28, avgGrade: 14.2 },
    { id: 3, name: 'Terminale C', students: 25, avgGrade: 13.5 }
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Tableau de bord</h1>
        <p className="text-muted-foreground mt-1">Vue d'ensemble de vos classes et tâches</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Classes" value="3" icon={BookOpen} />
        <StatCard title="Élèves total" value="85" icon={Users} />
        <StatCard title="Taux présence" value="94.2%" icon={Clock} />
        <StatCard title="Moyenne générale" value="13.5" icon={BarChart3} />
      </div>

      {/* Classes Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {myClasses.map(cls => (
          <div key={cls.id} className="bg-card rounded-lg border border-border p-6">
            <h3 className="text-lg font-bold mb-4">{cls.name}</h3>
            <div className="space-y-3 mb-4">
              <div>
                <p className="text-sm text-muted-foreground">Nombre d'élèves</p>
                <p className="text-2xl font-bold">{cls.students}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Moyenne de classe</p>
                <p className="text-2xl font-bold text-primary">{cls.avgGrade}/20</p>
              </div>
            </div>
            <button className="w-full px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 text-sm font-medium">
              Voir les détails
            </button>
          </div>
        ))}
      </div>

      {/* Tasks & Reminders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-lg border border-border p-6">
          <h2 className="text-xl font-bold mb-4">Tâches à accomplir</h2>
          <div className="space-y-3">
            {[
              { task: 'Valider 15 bulletins', dueDate: 'Demain', priority: 'high' },
              { task: 'Saisir les notes du contrôle 3', dueDate: 'Aujourd\'hui', priority: 'high' },
              { task: 'Mettre à jour emploi du temps', dueDate: 'Cette semaine', priority: 'medium' }
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                <CheckCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                  item.priority === 'high' ? 'text-destructive' : 'text-orange-500'
                }`} />
                <div className="flex-1">
                  <p className="font-medium text-sm">{item.task}</p>
                  <p className="text-xs text-muted-foreground">{item.dueDate}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-lg border border-border p-6">
          <h2 className="text-xl font-bold mb-4">Activités récentes</h2>
          <div className="space-y-3">
            {[
              { action: 'Bulletins validés pour 2nde C', time: 'Il y a 2h' },
              { action: 'Notes saisies pour 1ère S', time: 'Il y a 4h' },
              { action: 'Absence justifiée de Jean Paul', time: 'Il y a 1j' }
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                <AlertCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">{item.action}</p>
                  <p className="text-xs text-muted-foreground">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({ title, value, icon: Icon }) {
  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
        </div>
        <div className="bg-primary/10 rounded-lg p-3">
          <Icon className="w-6 h-6 text-primary" />
        </div>
      </div>
    </div>
  )
}

// ============ ACADEMIC MANAGEMENT ============
function AcademicManagement() {
  const [selectedClass, setSelectedClass] = useState(null)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Gestion Académique</h1>
        <p className="text-muted-foreground mt-1">Emplois du temps, matières et programmes</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Classes List */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h2 className="text-lg font-bold mb-4">Mes classes</h2>
          <div className="space-y-2">
            {['2nde C', '1ère S', 'Terminale C'].map(cls => (
              <button
                key={cls}
                onClick={() => setSelectedClass(cls)}
                className={`w-full px-4 py-3 rounded-lg text-left transition-colors ${
                  selectedClass === cls
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted hover:bg-muted/80'
                }`}
              >
                <p className="font-semibold">{cls}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Schedule & Details */}
        <div className="lg:col-span-2 bg-card rounded-lg border border-border p-6">
          <h2 className="text-lg font-bold mb-4">Emploi du temps</h2>
          <div className="space-y-3">
            {[
              { day: 'Lundi', time: '08h-10h', subject: 'Mathématiques', room: 'S103' },
              { day: 'Mardi', time: '09h-11h', subject: 'Mathématiques', room: 'S103' },
              { day: 'Jeudi', time: '10h-12h', subject: 'Mathématiques', room: 'S103' },
              { day: 'Vendredi', time: '13h-15h', subject: 'Mathématiques', room: 'S103' }
            ].map((slot, i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                <Calendar className="w-5 h-5 text-primary flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-semibold">{slot.day}</p>
                  <p className="text-sm text-muted-foreground">{slot.time} - {slot.subject}</p>
                </div>
                <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">{slot.room}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Subjects & Programs */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h2 className="text-lg font-bold mb-4">Matières et programmes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {['2nde C', '1ère S'].map((cls, i) => (
            <div key={i} className="border border-border rounded-lg p-4">
              <p className="font-semibold mb-3">{cls}</p>
              <div className="space-y-2">
                <p className="text-sm"><span className="font-medium">Matière:</span> Mathématiques</p>
                <p className="text-sm"><span className="font-medium">Heures/semaine:</span> 3h</p>
                <p className="text-sm"><span className="font-medium">Programme:</span> Algèbre, Géométrie, Probabilités</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ============ GRADES & EVALUATION ============
function GradesEvaluation() {
  const [selectedClass, setSelectedClass] = useState('2nde C')
  const [gradeForm, setGradeForm] = useState(false)

  const students = [
    { id: 1, name: 'Jean Dupont', matricule: '24-001', control1: 14, control2: 15, control3: null, avg: 14.5 },
    { id: 2, name: 'Marie Jean', matricule: '24-002', control1: 16, control2: 17, control3: null, avg: 16.5 },
    { id: 3, name: 'Paul Rakoto', matricule: '24-003', control1: 12, control2: 13, control3: null, avg: 12.5 }
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Notes & Évaluations</h1>
          <p className="text-muted-foreground mt-1">Saisie et validation des notes</p>
        </div>
        <button
          onClick={() => setGradeForm(!gradeForm)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 font-medium"
        >
          <Plus className="w-4 h-4" /> Saisir des notes
        </button>
      </div>

      {/* Class Selection */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {['2nde C', '1ère S', 'Terminale C'].map(cls => (
          <button
            key={cls}
            onClick={() => setSelectedClass(cls)}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
              selectedClass === cls
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted hover:bg-muted/80'
            }`}
          >
            {cls}
          </button>
        ))}
      </div>

      {/* Grade Form */}
      {gradeForm && (
        <div className="bg-card rounded-lg border border-border p-6">
          <h2 className="text-lg font-bold mb-4">Saisir les notes</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Élève</label>
                <select className="w-full px-4 py-2 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>Sélectionner un élève</option>
                  {students.map(s => <option key={s.id}>{s.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Type d'évaluation</label>
                <select className="w-full px-4 py-2 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>Contrôle continu</option>
                  <option>Examen trimestre</option>
                  <option>Devoir maison</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Note (sur 20)</label>
                <input type="number" min="0" max="20" step="0.5" placeholder="14.5" className="w-full px-4 py-2 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Commentaire</label>
                <input type="text" placeholder="Remarques..." className="w-full px-4 py-2 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
            </div>
            <div className="flex gap-3">
              <button type="submit" className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 font-medium">Enregistrer</button>
              <button type="button" onClick={() => setGradeForm(false)} className="flex-1 px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 font-medium">Annuler</button>
            </div>
          </form>
        </div>
      )}

      {/* Grades Table */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">Élève</th>
              <th className="px-6 py-3 text-center text-sm font-semibold">Contrôle 1</th>
              <th className="px-6 py-3 text-center text-sm font-semibold">Contrôle 2</th>
              <th className="px-6 py-3 text-center text-sm font-semibold">Contrôle 3</th>
              <th className="px-6 py-3 text-center text-sm font-semibold">Moyenne</th>
              <th className="px-6 py-3 text-center text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {students.map(s => (
              <tr key={s.id} className="hover:bg-muted/50">
                <td className="px-6 py-4 text-sm font-medium">{s.name}</td>
                <td className="px-6 py-4 text-center text-sm font-semibold">{s.control1}</td>
                <td className="px-6 py-4 text-center text-sm font-semibold">{s.control2}</td>
                <td className="px-6 py-4 text-center text-sm">{s.control3 ? <span className="font-semibold">{s.control3}</span> : <span className="text-muted-foreground">—</span>}</td>
                <td className="px-6 py-4 text-center text-sm font-bold text-primary">{s.avg}</td>
                <td className="px-6 py-4 text-center">
                  <button className="text-primary text-sm hover:underline"><Edit2 className="w-4 h-4 inline" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bulletin Generation */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h2 className="text-lg font-bold mb-4">Génération de bulletins</h2>
        <p className="text-muted-foreground mb-4">Générez et validez les bulletins pour vos élèves</p>
        <div className="flex gap-3">
          <select className="flex-1 px-4 py-2 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary">
            <option>Sélectionner la classe</option>
            <option>2nde C</option>
            <option>1ère S</option>
          </select>
          <select className="flex-1 px-4 py-2 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary">
            <option>Période</option>
            <option>Trimestre 1</option>
            <option>Trimestre 2</option>
          </select>
          <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 font-medium flex items-center gap-2">
            <Download className="w-4 h-4" /> Générer
          </button>
        </div>
      </div>
    </div>
  )
}

// ============ ATTENDANCE & ABSENCE ============
function AttendanceAbsence() {
  const [selectedClass, setSelectedClass] = useState('2nde C')
  const [attendanceForm, setAttendanceForm] = useState(false)

  const students = [
    { id: 1, name: 'Jean Dupont', status: 'Présent', time: '08h05' },
    { id: 2, name: 'Marie Jean', status: 'Retard', time: '08h35' },
    { id: 3, name: 'Paul Rakoto', status: 'Absent', time: '—' }
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Présence & Absences</h1>
          <p className="text-muted-foreground mt-1">Enregistrement et suivi des présences</p>
        </div>
        <button
          onClick={() => setAttendanceForm(!attendanceForm)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 font-medium"
        >
          <Plus className="w-4 h-4" /> Appel du jour
        </button>
      </div>

      {/* Class Selection */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {['2nde C', '1ère S', 'Terminale C'].map(cls => (
          <button
            key={cls}
            onClick={() => setSelectedClass(cls)}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
              selectedClass === cls
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted hover:bg-muted/80'
            }`}
          >
            {cls}
          </button>
        ))}
      </div>

      {/* Attendance Form */}
      {attendanceForm && (
        <div className="bg-card rounded-lg border border-border p-6">
          <h2 className="text-lg font-bold mb-4">Appel du jour - {new Date().toLocaleDateString('fr-FR')}</h2>
          <div className="space-y-3 max-h-96 overflow-y-auto mb-4">
            {students.map(s => (
              <div key={s.id} className="flex items-center gap-4 p-3 bg-muted rounded-lg">
                <input type="checkbox" defaultChecked={s.status !== 'Absent'} className="w-4 h-4 rounded" />
                <span className="flex-1 font-medium">{s.name}</span>
                <select className="px-3 py-1 rounded bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>Présent</option>
                  <option>Absent</option>
                  <option>Retard</option>
                </select>
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <button type="button" className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 font-medium">Valider l'appel</button>
            <button type="button" onClick={() => setAttendanceForm(false)} className="flex-1 px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 font-medium">Annuler</button>
          </div>
        </div>
      )}

      {/* Attendance Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card rounded-lg border border-border p-6">
          <p className="text-sm text-muted-foreground">Présences</p>
          <p className="text-3xl font-bold mt-2 text-green-600">32</p>
          <p className="text-xs text-muted-foreground mt-1">94.1%</p>
        </div>
        <div className="bg-card rounded-lg border border-border p-6">
          <p className="text-sm text-muted-foreground">Absences</p>
          <p className="text-3xl font-bold mt-2 text-destructive">2</p>
          <p className="text-xs text-muted-foreground mt-1">5.9%</p>
        </div>
        <div className="bg-card rounded-lg border border-border p-6">
          <p className="text-sm text-muted-foreground">Retards</p>
          <p className="text-3xl font-bold mt-2 text-orange-600">1</p>
          <p className="text-xs text-muted-foreground mt-1">À justifier</p>
        </div>
      </div>

      {/* Absence Justifications */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h2 className="text-lg font-bold mb-4">Absences à justifier</h2>
        <div className="space-y-3">
          {[
            { student: 'Paul Rakoto', date: '2026-01-24', justification: 'En attente' }
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div>
                <p className="font-semibold">{item.student}</p>
                <p className="text-sm text-muted-foreground">{item.date}</p>
              </div>
              <span className="px-3 py-1 bg-orange-500/20 text-orange-600 text-xs rounded-full font-medium">{item.justification}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ============ COMMUNICATION ============
function Communication() {
  const [activeSubTab, setActiveSubTab] = useState('notifications')
  const [messageForm, setMessageForm] = useState(false)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Communication</h1>
        <p className="text-muted-foreground mt-1">Notifications, messagerie et communications ciblées</p>
      </div>

      <div className="flex gap-2 border-b border-border">
        {['notifications', 'messagerie'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveSubTab(tab)}
            className={`px-4 py-2 font-medium border-b-2 ${
              activeSubTab === tab ? 'border-primary text-primary' : 'border-transparent text-muted-foreground'
            }`}
          >
            {tab === 'notifications' && 'Notifications & Annonces'}
            {tab === 'messagerie' && 'Messagerie interne'}
          </button>
        ))}
      </div>

      {activeSubTab === 'notifications' && (
        <div className="space-y-4">
          <button
            onClick={() => setMessageForm(!messageForm)}
            className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 font-medium flex items-center gap-2 justify-center"
          >
            <Plus className="w-4 h-4" /> Nouvelle notification
          </button>

          {messageForm && (
            <div className="bg-card rounded-lg border border-border p-6">
              <h2 className="text-lg font-bold mb-4">Envoyer une notification</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Destinataires</label>
                  <select className="w-full px-4 py-2 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary">
                    <option>Sélectionner une classe</option>
                    <option>2nde C</option>
                    <option>1ère S</option>
                    <option>Terminale C</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Type</label>
                  <select className="w-full px-4 py-2 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary">
                    <option>Annonce</option>
                    <option>Devoir à faire</option>
                    <option>Résultats</option>
                    <option>Rappel</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Message</label>
                  <textarea placeholder="Écrivez votre message..." rows="4" className="w-full px-4 py-2 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary"></textarea>
                </div>
                <div className="flex gap-3">
                  <button type="submit" className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 font-medium flex items-center gap-2 justify-center">
                    <Send className="w-4 h-4" /> Envoyer
                  </button>
                  <button type="button" onClick={() => setMessageForm(false)} className="flex-1 px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 font-medium">Annuler</button>
                </div>
              </form>
            </div>
          )}

          <div className="space-y-3">
            {[
              { message: 'Annonce: Réunion parents-profs mercredi', date: 'Aujourd\'hui', recipients: '2nde C' },
              { message: 'Devoir: Ex. 1-10 page 45 pour lundi', date: 'Hier', recipients: '1ère S' },
              { message: 'Résultats: Contrôle 2 validés', date: 'Il y a 3j', recipients: '2nde C' }
            ].map((notif, i) => (
              <div key={i} className="bg-card rounded-lg border border-border p-4">
                <div className="flex justify-between items-start mb-2">
                  <p className="font-semibold">{notif.message}</p>
                  <button className="text-muted-foreground hover:text-destructive"><X className="w-4 h-4" /></button>
                </div>
                <div className="flex gap-2 text-xs">
                  <span className="text-muted-foreground">{notif.date}</span>
                  <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-full">{notif.recipients}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSubTab === 'messagerie' && (
        <div className="bg-card rounded-lg border border-border p-6">
          <h2 className="text-lg font-bold mb-4">Messagerie interne</h2>
          <div className="space-y-3">
            {[
              { from: 'Parent - Mme Dupont', subject: 'Question absences Jean', date: 'Hier' },
              { from: 'Admin', subject: 'Mise à jour des bulletins', date: 'Il y a 2j' },
              { from: 'Collègue - M. Martin', subject: 'Coordination géométrie', date: 'Il y a 3j' }
            ].map((msg, i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-muted rounded-lg hover:bg-muted/80 cursor-pointer">
                <Users className="w-5 h-5 text-primary flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-semibold text-sm">{msg.from}</p>
                  <p className="text-sm text-muted-foreground">{msg.subject}</p>
                </div>
                <p className="text-xs text-muted-foreground whitespace-nowrap">{msg.date}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ============ STUDENT HISTORY ============
function StudentHistory() {
  const [selectedStudent, setSelectedStudent] = useState(null)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Historique Académique</h1>
        <p className="text-muted-foreground mt-1">Consultation de l'historique de vos étudiants</p>
      </div>

      <div className="bg-card rounded-lg border border-border p-6">
        <h2 className="text-lg font-bold mb-4">Sélectionner un élève</h2>
        <select
          onChange={(e) => setSelectedStudent(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">-- Sélectionner un élève --</option>
          <option value="1">Jean Dupont (2nde C)</option>
          <option value="2">Marie Jean (2nde C)</option>
          <option value="3">Paul Rakoto (1ère S)</option>
        </select>
      </div>

      {selectedStudent && (
        <div className="space-y-6">
          <div className="bg-card rounded-lg border border-border p-6">
            <h2 className="text-lg font-bold mb-4">Profil d'élève</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-sm text-muted-foreground">Nom</p>
                <p className="font-semibold">Jean Dupont</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Classe actuelle</p>
                <p className="font-semibold">2nde C</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Date d'inscription</p>
                <p className="font-semibold">01/09/2024</p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg border border-border p-6">
            <h2 className="text-lg font-bold mb-4">Historique académique</h2>
            <div className="space-y-3">
              {[
                { year: '2023-2024', class: '3ème', avg: 11.5, status: 'Admis' },
                { year: '2024-2025', class: '2nde C', avg: 12.8, status: 'En cours' }
              ].map((record, i) => (
                <div key={i} className="border border-border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold">{record.year} - Classe: {record.class}</p>
                      <p className="text-sm text-muted-foreground">Moyenne générale: {record.avg}/20</p>
                    </div>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      record.status === 'Admis' ? 'bg-green-500/20 text-green-600' : 'bg-blue-500/20 text-blue-600'
                    }`}>
                      {record.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ============ TEACHER REPORTS ============
function TeacherReports() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Rapports & Statistiques</h1>
        <p className="text-muted-foreground mt-1">Analyses par classe et par matière</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { title: 'Moyennes par classe', description: 'Comparaison des performances académiques' },
          { title: 'Taux d\'assiduité', description: 'Suivi des présences et absences' },
          { title: 'Progression académique', description: 'Évolution des notes sur l\'année' },
          { title: 'Rapport mensuel', description: 'Récapitulatif des activités du mois' }
        ].map((report, i) => (
          <div key={i} className="bg-card rounded-lg border border-border p-6">
            <h3 className="font-semibold mb-2">{report.title}</h3>
            <p className="text-sm text-muted-foreground mb-4">{report.description}</p>
            <div className="flex gap-2">
              <button className="flex-1 px-3 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 text-sm font-medium">Voir</button>
              <button className="flex-1 px-3 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 text-sm font-medium flex items-center justify-center gap-1">
                <Download className="w-4 h-4" /> PDF
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-card rounded-lg border border-border p-6">
        <h2 className="text-lg font-bold mb-4">Rapport personnalisé</h2>
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select className="px-4 py-2 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary">
              <option>Classe</option>
              <option>2nde C</option>
              <option>1ère S</option>
              <option>Terminale C</option>
            </select>
            <select className="px-4 py-2 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary">
              <option>Période</option>
              <option>Mois</option>
              <option>Trimestre</option>
              <option>Année</option>
            </select>
            <button type="button" className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 font-medium">Générer</button>
          </div>
        </form>
      </div>
    </div>
  )
}

// ============ TEACHER SETTINGS ============
function TeacherSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Paramètres</h1>
        <p className="text-muted-foreground mt-1">Gestion de votre profil et préférences</p>
      </div>

      <div className="bg-card rounded-lg border border-border p-6">
        <h2 className="text-lg font-bold mb-6">Informations personnelles</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Prénom</label>
              <input type="text" defaultValue="Jean" className="w-full px-4 py-2 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Nom</label>
              <input type="text" defaultValue="Dupont" className="w-full px-4 py-2 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Email</label>
              <input type="email" defaultValue="jean.dupont@lycee.ma" className="w-full px-4 py-2 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Téléphone</label>
              <input type="tel" defaultValue="+261 XX XX XX XX" className="w-full px-4 py-2 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg border border-border p-6">
        <h2 className="text-lg font-bold mb-6">Préférences de notification</h2>
        <div className="space-y-4">
          {[
            { label: 'Notifications par email', enabled: true },
            { label: 'Rappel des absences à justifier', enabled: true },
            { label: 'Rappel des bulletins à valider', enabled: true },
            { label: 'Communications des parents', enabled: false }
          ].map((pref, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <label className="font-medium cursor-pointer">{pref.label}</label>
              <input type="checkbox" defaultChecked={pref.enabled} className="w-4 h-4 rounded" />
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 font-medium">Enregistrer les modifications</button>
        <button className="px-6 py-3 bg-muted text-foreground rounded-lg hover:bg-muted/80 font-medium">Annuler</button>
      </div>
    </div>
  )
}

export default TeacherDashboard
