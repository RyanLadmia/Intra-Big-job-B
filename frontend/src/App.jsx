import React from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate, useNavigate } from 'react-router-dom'
import { lazy, Suspense, useEffect, useRef, useCallback, useState } from 'react'
import MainLayout from './components/MainLayout'
import { RoleDashboardRedirect, RoleGuard, ROLES, RoleProvider } from './features/roles'
import { AuthProvider } from './contexts/AuthContext'
import { QueryClientProvider, useQueryClient } from '@tanstack/react-query'
import './index.css'
import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/PublicRoute'
import ProfileLayout from '@/layouts/ProfileLayout'
import StudentRoute from './components/StudentRoute'
import { Toaster } from './components/ui/sonner'
import AdminTicketList from './components/admin/AdminTicketList'
import { queryClient } from './lib/services/queryClient'
import ReactQueryHydration from './components/shared/ReactQueryHydration'
import deduplicationService from './lib/services/deduplicationService'
import apiService from './lib/services/apiService'
import PublicProfileView from '@/pages/Global/Profile/views/PublicProfileView'
import { ThemeProvider } from '@/context/ThemeContext'
import PublicLayout from './layouts/PublicLayout'

// Composant de chargement personnalisé
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

// Composant d'erreur personnalisé basé sur une classe
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen p-4 bg-gray-50">
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
            <h2 className="mb-4 text-2xl font-bold text-red-600">Une erreur est survenue</h2>
            <p className="mb-4 text-red-700">{this.state.error?.message || "Une erreur inattendue s'est produite"}</p>
            <button 
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
              className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
            >
              Réessayer
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Wrapper for the loading components with better error handling
const withSuspense = (Component) => (props) => (
  <ErrorBoundary>
    <Suspense fallback={<LoadingFallback />}>
      <Component {...props} />
    </Suspense>
  </ErrorBoundary>
);

// Import the Home component properly
const Home = withSuspense(lazy(() => import('./pages/Home')));
const Login = withSuspense(lazy(() => import('./pages/Login')));
const Register = withSuspense(lazy(() => import('./pages/Register')));
const RegistrationSuccess = withSuspense(lazy(() => import('./pages/RegistrationSuccess')));
const VerificationSuccess = withSuspense(lazy(() => import('./pages/VerificationSuccess')));
const VerificationError = withSuspense(lazy(() => import('./pages/VerificationError')));

// Lazy loading pour la réinitialisation de mot de passe
const ResetPasswordRequest = withSuspense(lazy(() => import('./components/auth/ResetPasswordRequest')));
const ResetPasswordConfirmation = withSuspense(lazy(() => import('./components/auth/ResetPasswordConfirmation')));
const ResetPassword = withSuspense(lazy(() => import('./components/auth/ResetPassword')));

// Lazy loading pour le Profil et Dashboard
const SettingsProfile = withSuspense(lazy(() => import('./pages/Global/Profile/views/SettingsProfile')));
const SecuritySettings = withSuspense(lazy(() => import('./pages/Global/Profile/views/SecuritySettings')));
const NotificationSettings = withSuspense(lazy(() => import('./pages/Global/Profile/views/NotificationSettings')));
const CareerSettings = withSuspense(lazy(() => import('./pages/Global/Profile/views/CareerSettings')));
const ProfileView = withSuspense(lazy(() => import('./pages/Global/Profile/views/ProfileView')));
const Dashboard = withSuspense(lazy(() => import('./pages/Dashboard')));
const Trombinoscope = withSuspense(lazy(() => import('./pages/Global/Trombinoscope')));

// Dashboards spécifiques par rôle
const AdminDashboard = withSuspense(lazy(() => import('./pages/Admin/Dashboard')));
const StudentDashboard = withSuspense(lazy(() => import('./pages/Student/Dashboard')));
// Pages étudiantes
const StudentSchedule = withSuspense(lazy(() => import('./pages/Student/Schedule')));
const StudentGrades = withSuspense(lazy(() => import('./pages/Student/Grades')));
const StudentAbsences = withSuspense(lazy(() => import('./pages/Student/Absences')));
const StudentProjects = withSuspense(lazy(() => import('./pages/Student/Projects')));
const StudentAttendance = withSuspense(lazy(() => import('./pages/Student/Attendance')));
const TeacherDashboard = withSuspense(lazy(() => import('./pages/Teacher/Dashboard')));
const TeacherSignatureMonitoring = withSuspense(lazy(() => import('./pages/Teacher/SignatureMonitoring')));
const TeacherAttendance = withSuspense(lazy(() => import('./pages/Teacher/Attendance')));
const HRDashboard = withSuspense(lazy(() => import('./pages/HR/Dashboard')));
const SuperAdminDashboard = withSuspense(lazy(() => import('./pages/SuperAdmin/Dashboard')));
const GuestDashboard = withSuspense(lazy(() => import('./pages/Guest/Dashboard')));
const RecruiterDashboard = withSuspense(lazy(() => import('./pages/Recruiter/Dashboard')));

// Nouvelles pages à importer
const FormationList = withSuspense(lazy(() => import('./pages/FormationList')));
const GuestStudentRoleManager = withSuspense(lazy(() => import('./pages/Recruiter/GuestStudentRoleManager')));
const UserRoleManager = withSuspense(lazy(() => import('./pages/Admin/components/UserRoleManager')));
const SkillAssessment = withSuspense(lazy(() => import('./pages/Games')));
const VisualConcept = withSuspense(lazy(() => import('./pages/VisualConcept')));
const FormationFinder = withSuspense(lazy(() => import('./pages/FormationFinder')));

// Ticket system components
const TicketList = withSuspense(lazy(() => import('./components/TicketList')));
const TicketForm = withSuspense(lazy(() => import('./components/TicketForm')));
const TicketDetail = withSuspense(lazy(() => import('./components/TicketDetail')));
const TicketServiceList = withSuspense(lazy(() => import('./components/admin/TicketServiceList')));

// Formation pages
const WebDevelopment = withSuspense(lazy(() => import('./pages/formations/WebDevelopment')));
const Cybersecurity = withSuspense(lazy(() => import('./pages/formations/Cybersecurity')));
const ArtificialIntelligence = withSuspense(lazy(() => import('./pages/formations/ArtificialIntelligence')));
const DataScience = withSuspense(lazy(() => import('./pages/formations/DataScience')));
const MobileDevelopment = withSuspense(lazy(() => import('./pages/formations/MobileDevelopment')));
const GameDevelopment = withSuspense(lazy(() => import('./pages/formations/GameDevelopment')));
const AllFormations = withSuspense(lazy(() => import('./pages/AllFormations')));
const FormationThemeWrapper = withSuspense(lazy(() => import('./components/formations/FormationThemeWrapper')));

// Import the new SettingsLayout
const SettingsLayout = withSuspense(lazy(() => import('./layouts/SettingsLayout')));

function App() {
  return (
    <ThemeProvider>
      <Router>
        <QueryClientProvider client={queryClient}>
          <ReactQueryHydration>
            <AuthProvider>
              <RoleProvider>
                <ErrorBoundary>
                  <div className="relative font-poppins">
                    <AppInitializer />
                    <AppContent />
                    <Toaster />
                  </div>
                </ErrorBoundary>
              </RoleProvider>
            </AuthProvider>
          </ReactQueryHydration>
        </QueryClientProvider>
      </Router>
    </ThemeProvider>
  );
}

// Export par défaut du composant App
export default App;

// Export queryClient to be used elsewhere
export { queryClient };

// Optimisation du préchargement
function useIntelligentPreload() {
  const location = useLocation();
  const currentPath = location.pathname;
  const queryClient = useQueryClient();
  const preloadTimeoutRef = useRef(null);
  
  useEffect(() => {
    // Nettoyer le timeout précédent
    if (preloadTimeoutRef.current) {
      clearTimeout(preloadTimeoutRef.current);
    }

    const preloadComponent = async (importFn) => {
      try {
        await lazyWithRetry(importFn);
      } catch (error) {
        console.warn('Preload failed:', error);
      }
    };

    // Délai de 100ms avant de commencer le préchargement
    preloadTimeoutRef.current = setTimeout(() => {
      if (currentPath.includes('/login') || currentPath === '/') {
        preloadComponent(() => import('./pages/Register'));
      } 
      else if (currentPath.includes('/register')) {
        preloadComponent(() => import('./pages/RegistrationSuccess'));
      }
      else if (currentPath.includes('/reset-password')) {
        if (currentPath === '/reset-password') {
          preloadComponent(() => import('./components/auth/ResetPasswordConfirmation'));
        } else if (currentPath.includes('/reset-password/confirmation')) {
          preloadComponent(() => import('./components/auth/ResetPassword'));
        }
      }
      else if (currentPath.includes('/profile')) {
        const profilePath = currentPath.split('/').pop();
        
        if (profilePath === 'settings') {
          preloadComponent(() => import('./pages/Global/Profile/views/SecuritySettings'));
        } 
        else if (profilePath === 'security') {
          preloadComponent(() => import('./pages/Global/Profile/views/NotificationSettings'));
        }
        else {
          preloadComponent(() => import('./pages/Global/Profile/views/SettingsProfile'));
        }
      }
      else if (currentPath.includes('/admin')) {
        preloadComponent(() => import('./pages/Admin/Dashboard'));
      }
      else if (currentPath.includes('/student')) {
        preloadComponent(() => import('./pages/Student/Dashboard'));
        preloadComponent(() => import('./pages/Student/Schedule'));
        preloadComponent(() => import('./pages/Student/Attendance'));
      }
      else if (currentPath.includes('/teacher')) {
        preloadComponent(() => import('./pages/Teacher/Dashboard'));
        preloadComponent(() => import('./pages/Teacher/SignatureMonitoring'));
        preloadComponent(() => import('./pages/Teacher/Attendance'));
      }
    }, 100);

    return () => {
      if (preloadTimeoutRef.current) {
        clearTimeout(preloadTimeoutRef.current);
      }
    };
  }, [currentPath]);

  return null;
}

// Component for handling prefetching and setting up environment
function AppInitializer() {
  useEffect(() => {
    // Expose queryClient for debugging purposes
    window.queryClient = queryClient;
    
    // Expose userDataManager for debugging
    import('./lib/services/userDataManager')
      .then(({ default: userDataManager }) => {
        window.userDataManager = userDataManager;
      });
    
    // Set up QueryClient
    import('./lib/services/queryClient')
      .then(({ setQueryClient }) => {
        setQueryClient(queryClient);
      });
      
  }, []);
  
  return null;
}

// Composant pour gérer les préchargements
function PrefetchHandler() {
  useIntelligentPreload();
  const location = useLocation();
  
  // Effet pour initialiser userDataManager
  useEffect(() => {
    // Importer et initialiser userDataManager
    import('./lib/services/userDataManager')
      .then(({ default: userDataManager }) => {
        // Attacher userDataManager à window pour le débogage
        window.userDataManager = userDataManager;
        
        // Afficher des informations de débogage en mode développement
        if (import.meta.env.DEV) {
          console.log('[Dev] userDataManager disponible globalement via window.userDataManager');
        }
      });
  }, []);
  
  useEffect(() => {
    // Précharger les données utilisateur dès que l'utilisateur est authentifié
    if (localStorage.getItem('token')) {
      // Importer les modules nécessaires de manière dynamique
      import('./lib/services/userDataManager')
        .then(({ default: userDataManager }) => {
          // Précharger les données utilisateur en arrière-plan
          userDataManager.getUserData({
            forceRefresh: false,
            useCache: true,
            background: true
          }).catch(error => {
            console.warn('Erreur lors du préchargement des données utilisateur:', error);
          });
        });
    }
  }, [location.pathname]);
  
  // Ajouter un écouteur d'événement pour forcer l'actualisation des données utilisateur lors d'un changement d'utilisateur
  useEffect(() => {
    const handleUserChange = () => {
      // Importer dynamiquement le module userDataManager
      import('./lib/services/userDataManager')
        .then(({ default: userDataManager }) => {
          // Invalider le cache pour forcer un rechargement des données
          userDataManager.invalidateCache();
          
          // Ensuite précharger les nouvelles données
          userDataManager.getUserData({
            forceRefresh: true,
            useCache: false
          }).catch(error => {
            console.warn('Erreur lors du rechargement des données utilisateur:', error);
          });
          
          // Importer React Query pour invalider les requêtes spécifiques
          import('./lib/services/queryClient').then(({ getQueryClient }) => {
            const qc = getQueryClient();
            if (qc) {
              // Invalider également les requêtes de dashboard
              qc.invalidateQueries({ queryKey: ['teacher-dashboard'] });
              qc.invalidateQueries({ queryKey: ['admin-users'] });
              qc.invalidateQueries({ queryKey: ['admin-dashboard'] });
              qc.invalidateQueries({ queryKey: ['student-dashboard'] });
              qc.invalidateQueries({ queryKey: ['hr-dashboard'] });
            }
          });
        });
    };
    
    // Fonction pour gérer le nettoyage complet du cache
    const handleCacheCleared = () => {
      // Forcer un rafraîchissement complet des données
      // Cette approche est plus radicale mais garantit que les anciennes données ne persistent pas
      window.location.reload();
    };
    
    // Ajouter les écouteurs d'événements
    window.addEventListener('login-success', handleUserChange);
    window.addEventListener('role-change', handleUserChange);
    window.addEventListener('query-cache-cleared', handleCacheCleared);
    
    // Nettoyer les écouteurs d'événements
    return () => {
      window.removeEventListener('login-success', handleUserChange);
      window.removeEventListener('role-change', handleUserChange);
      window.removeEventListener('query-cache-cleared', handleCacheCleared);
    };
  }, []);
  
  return null;
}

// Composant de contenu principal
function AppContent() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route element={<PublicRoute />}>
          <Route index path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/registration-success" element={<RegistrationSuccess />} />
          <Route path="/verification-success" element={<VerificationSuccess />} />
          <Route path="/verification-error" element={<VerificationError />} />
          <Route path="/reset-password" element={<ResetPasswordRequest />} />
          <Route path="/reset-password/confirmation" element={<ResetPasswordConfirmation />} />
          <Route path="/reset-password/reset" element={<ResetPassword />} />
          <Route path="/formations" element={<FormationList />} />
          <Route path="/formation-finder" element={<FormationFinder />} />
          <Route path="/all-formations" element={<AllFormations />} />
          <Route path="/formations/web" element={<WebDevelopment />} />
          <Route path="/formations/ai" element={<ArtificialIntelligence />} />
          <Route path="/formations/cybersecurity" element={<Cybersecurity />} />
          <Route path="/formations/mobile" element={<MobileDevelopment />} />
          <Route path="/formations/data-science" element={<DataScience />} />
          <Route path="/formations/game" element={<GameDevelopment />} />
          <Route path="/skill-assessment" element={<SkillAssessment />} />
        </Route>
      </Route>

      {/* Protected Routes */}
      <Route element={<MainLayout />}>
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<RoleDashboardRedirect />} />
          
          {/* Profile Routes - Protected and accessible by all authenticated users */}
          <Route path="/profile" element={<ProfileLayout />}>
            <Route index element={<ProfileView />} />
          </Route>
          <Route path="/profile/:userId" element={<PublicProfileView />} />
          
          {/* Settings Routes - Protected and accessible by all authenticated users */}
          <Route path="/settings" element={<SettingsLayout />}>
            <Route index element={<Navigate to="/settings/profile" replace />} />
            <Route path="profile" element={<SettingsProfile />} />
            <Route path="security" element={<SecuritySettings />} />
            <Route path="notifications" element={<NotificationSettings />} />
            <Route path="career" element={<CareerSettings />} />
          </Route>

          {/* Global Routes */}
          <Route path="/trombinoscope" element={<Trombinoscope />} />
          <Route path="/visual-concept" element={<VisualConcept />} />

          {/* Ticket System Routes */}
          <Route path="/tickets" element={<TicketList />} />
          <Route path="/tickets/new" element={<TicketForm />} />
          <Route path="/tickets/:id" element={<TicketDetail />} />

          {/* Role-Specific Routes */}
          <Route path="/admin/*" element={
            <RoleGuard roles={[ROLES.ADMIN]}>
              <Routes>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="tickets" element={<AdminTicketList />} />
                <Route path="services" element={<TicketServiceList />} />
                <Route path="users" element={<UserRoleManager />} />
                <Route path="user-role-manager" element={<Navigate to="/admin/users" replace />} />
              </Routes>
            </RoleGuard>
          } />

          <Route path="/student/*" element={
            <RoleGuard roles={[ROLES.STUDENT]}>
              <Routes>
                <Route path="dashboard" element={<StudentDashboard />} />
                <Route path="schedule" element={<StudentSchedule />} />
                <Route path="grades" element={<StudentGrades />} />
                <Route path="absences" element={<StudentAbsences />} />
                <Route path="projects" element={<StudentProjects />} />
                <Route path="attendance" element={<StudentAttendance />} />
              </Routes>
            </RoleGuard>
          } />

          <Route path="/teacher/*" element={
            <RoleGuard roles={[ROLES.TEACHER]}>
              <Routes>
                <Route path="dashboard" element={<TeacherDashboard />} />
                <Route path="signature-monitoring" element={<TeacherSignatureMonitoring />} />
                <Route path="attendance" element={<TeacherAttendance />} />
              </Routes>
            </RoleGuard>
          } />

          <Route path="/hr/*" element={
            <RoleGuard roles={[ROLES.HR]}>
              <Routes>
                <Route path="dashboard" element={<HRDashboard />} />
              </Routes>
            </RoleGuard>
          } />

          <Route path="/superadmin/*" element={
            <RoleGuard roles={[ROLES.SUPERADMIN]}>
              <Routes>
                <Route path="dashboard" element={<SuperAdminDashboard />} />
              </Routes>
            </RoleGuard>
          } />

          <Route path="/guest/*" element={
            <RoleGuard roles={[ROLES.GUEST]}>
              <Routes>
                <Route path="dashboard" element={<GuestDashboard />} />
              </Routes>
            </RoleGuard>
          } />

          <Route path="/recruiter/*" element={
            <RoleGuard roles={[ROLES.RECRUITER]}>
              <Routes>
                <Route path="dashboard" element={<RecruiterDashboard />} />
                <Route path="guest-student-roles" element={<GuestStudentRoleManager />} />
                <Route path="guest-student-manager" element={<Navigate to="/recruiter/guest-student-roles" replace />} />
              </Routes>
            </RoleGuard>
          } />
        </Route>
      </Route>

      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
