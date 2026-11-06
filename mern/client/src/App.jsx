import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/admin/ProtectedRoute';
import Home from './pages/Home';

const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Login = lazy(() => import('./pages/admin/Login'));
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const ManageProfile = lazy(() => import('./pages/admin/ManageProfile'));
const ManageSkills = lazy(() => import('./pages/admin/ManageSkills'));
const ManageExpertise = lazy(() => import('./pages/admin/ManageExpertise'));
const ManageHighlights = lazy(() => import('./pages/admin/ManageHighlights'));
const ManageEducation = lazy(() => import('./pages/admin/ManageEducation'));
const ManageProjects = lazy(() => import('./pages/admin/ManageProjects'));
const Messages = lazy(() => import('./pages/admin/Messages'));

function Loading() { return <div className="wrap" style={{ paddingTop: 120 }}><p>Loading…</p></div>; }

export default function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <AuthProvider>
          <BrowserRouter>
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects/:slug" element={<ProjectDetail />} />
                <Route path="/admin/login" element={<Login />} />
                <Route path="/admin" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/admin/profile" element={<ProtectedRoute><ManageProfile /></ProtectedRoute>} />
                <Route path="/admin/skills" element={<ProtectedRoute><ManageSkills /></ProtectedRoute>} />
                <Route path="/admin/expertise" element={<ProtectedRoute><ManageExpertise /></ProtectedRoute>} />
                <Route path="/admin/highlights" element={<ProtectedRoute><ManageHighlights /></ProtectedRoute>} />
                <Route path="/admin/education" element={<ProtectedRoute><ManageEducation /></ProtectedRoute>} />
                <Route path="/admin/projects" element={<ProtectedRoute><ManageProjects /></ProtectedRoute>} />
                <Route path="/admin/messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}
