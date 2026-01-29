import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import StudentDashboard from './pages/StudentDashboard'
import ParentDashboard from './pages/ParentDashboard'
import AdminDashboard from './pages/AdminDashboard'
import TeacherDashboard from './pages/TeacherDashboard'
import PedagogicalCoordinatorDashboard from './pages/PedagogicalCoordinatorDashboard'
import NotFound from './pages/NotFound'
import Register from './pages/Register'
import LandingPage from './pages/LandingPage'
import ServicePage from './pages/service/Service'
import ContactPage from './pages/contact/Contact'
import PresentationPage from './pages/presentation/presentation'
import ProgrammesPage from './pages/programmes/Programmes'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/student/*" element={<StudentDashboard />} />
        <Route path="/parent/*" element={<ParentDashboard />} />
        <Route path="/admin/*" element={<AdminDashboard />} />
        <Route path="/teacher/*" element={<TeacherDashboard />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/service" element={<ServicePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/presentation" element={<PresentationPage />} />
        <Route path="/programmes" element={<ProgrammesPage />} />
        <Route path="/responsable/*" element={<PedagogicalCoordinatorDashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App