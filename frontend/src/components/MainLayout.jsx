import React, { useEffect, useState, useCallback, createContext, useMemo, useLayoutEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import ProfileProgress from '../pages/Global/Profile/components/profile-view/ProfileProgress';
import { RoleGuard, ROLES, useRoles } from '../features/roles';
import { authService } from '../lib/services/authService';
import { profileService } from '../pages/Global/Profile/services/profileService';
import Footer from './Footer';
import ChatButton from './chat/ChatButton';
import apiService, { normalizeUserData } from '@/lib/services/apiService';

// Create a context for profile data and refresh function
export const ProfileContext = createContext({
  profileData: null,
  refreshProfileData: () => {},
  isProfileLoading: false
});

// États de chargement
const LOADING_STATES = {
  INITIAL: 'initial',     // État initial avant tout chargement
  MINIMAL: 'minimal',     // Données minimales chargées (depuis le token)
  LOADING: 'loading',     // Chargement des données complètes en cours
  COMPLETE: 'complete',   // Données complètes chargées
  ERROR: 'error'          // Erreur de chargement
};

// Previous location tracking for profile refresh
const locationHistory = {
  previous: null,
  current: null,
  isDashboardNavigation: false,
  lastRefreshTime: 0
};

// Extract location path without query string
function getPathOnly(location) {
  return location ? location.pathname : '';
}

// Check if this is a navigation to a dashboard
function isDashboardNavigation(previousPath, currentPath) {
  return !previousPath && currentPath.includes('/dashboard') || 
         (previousPath && !previousPath.includes('/dashboard') && currentPath.includes('/dashboard'));
}

// Check if this is a navigation to the profile page
function isProfileNavigation(previousPath, currentPath) {
  return (!previousPath && currentPath.includes('/profile')) || 
         (previousPath && !previousPath.includes('/profile') && currentPath.includes('/profile'));
}

// Function to check if we should refresh based on navigation and timing
function shouldRefreshOnNavigation(previousPath, currentPath) {
  const now = Date.now();
  const timeSinceLastRefresh = now - locationHistory.lastRefreshTime;
  
  // Check for navigation to dashboard or profile
  const toDashboard = isDashboardNavigation(previousPath, currentPath);
  const toProfile = isProfileNavigation(previousPath, currentPath);
  
  // Always set this flag for component state
  locationHistory.isDashboardNavigation = toDashboard;
  
  // Refresh if:
  // 1. We're navigating to dashboard OR profile AND
  // 2. It's been at least 5 seconds since last refresh (reduced from 10s)
  if ((toDashboard || toProfile) && timeSinceLastRefresh > 5000) {
    locationHistory.lastRefreshTime = now;
    return true;
  }
  
  return false;
}

const MainLayout = () => {
  const [userData, setUserData] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [loadingState, setLoadingState] = useState(LOADING_STATES.INITIAL);
  const [showProgress, setShowProgress] = useState(false);
  const { hasRole, isLoading: rolesLoading } = useRoles();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(authService.isLoggedIn());
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [minContentHeight, setMinContentHeight] = useState('100vh');
  const [initialRender, setInitialRender] = useState(true);

  // Pages qui doivent être affichées en plein écran sans marges internes
  const fullScreenPages = []; // Removed '/register'
  const isFullScreenPage = fullScreenPages.includes(location.pathname);

  // Function to calculate and set the minimum content height
  const calculateMinHeight = useCallback(() => {
    // Get viewport height
    const viewportHeight = window.innerHeight;
    // Set minimum content height to be viewport height minus navbar height (64px)
    // Add a buffer of 100px to ensure the footer is well below the viewport
    setMinContentHeight(`${viewportHeight - 64 + 200}px`);
  }, []);

  // Effect to calculate the minimum content height
  useEffect(() => {
    // Calculate on mount and window resize
    calculateMinHeight();
    window.addEventListener('resize', calculateMinHeight);
    
    return () => {
      window.removeEventListener('resize', calculateMinHeight);
    };
  }, [calculateMinHeight]);

  // Recalculate height when route changes
  useEffect(() => {
    calculateMinHeight();
    
    // Scroll to top when route changes
    window.scrollTo(0, 0);
  }, [location.pathname, calculateMinHeight]);

  // Create a memoized refresh function that can be called from child components
  const refreshProfileData = useCallback(async (options = {}) => {
    if (authService.isLoggedIn()) {
      try {
        setLoadingState(LOADING_STATES.LOADING);
        
        // If direct data is provided, use it instead of making an API call
        if (options.directData) {
          console.log("Using direct data instead of API call:", options.directData);
          // Apply normalization to ensure consistent structure
          const normalizedData = normalizeUserData(options.directData);
          setProfileData(normalizedData);
          setLoadingState(LOADING_STATES.COMPLETE);
          return normalizedData;
        }
        
        // Force refresh profile data to get latest information
        const newProfileData = await profileService.getAllProfileData({ 
          forceRefresh: options.forceRefresh !== false,  // Force a refresh to bypass any cache
          bypassThrottle: options.bypassThrottle !== false // Bypass request throttling 
        });
        
        // Log the retrieved data for debugging
        console.log("Refreshed profile data:", newProfileData);
        
        // Apply normalization to ensure consistent structure
        const normalizedData = normalizeUserData(newProfileData);
        
        // Ensure data is updated before returning
        setProfileData(normalizedData);
        setLoadingState(LOADING_STATES.COMPLETE);
        return normalizedData; // Return the new data for components to use
      } catch (error) {
        console.error('Error refreshing profile data:', error);
        setLoadingState(LOADING_STATES.ERROR);
        return null;
      }
    }
    return null;
  }, []);

  // Add effect to refresh profile data when location changes to dashboard
  useEffect(() => {
    if (!location) return;
    
    const currentPath = getPathOnly(location);
    const previousPath = locationHistory.current;
    
    // Don't do anything if the path hasn't changed
    if (currentPath === previousPath) return;
    
    // Update location history
    locationHistory.previous = previousPath;
    locationHistory.current = currentPath;
    
    // Log route change for debugging
    console.log("[App] Route changed to:", currentPath);
    
    // Check if we should refresh profile based on navigation
    if (shouldRefreshOnNavigation(previousPath, currentPath)) {
      console.log("Navigated to dashboard or profile - refreshing profile data");
      
      // When navigating to dashboard or profile, force fresh profile data
      refreshProfileData({ 
        forceRefresh: true,
        bypassThrottle: true
      }).then(data => {
        console.log("Profile data refreshed after dashboard or profile navigation");
        
        // Check if LinkedIn URL was found and save to session if present
        if (data && data.linkedinUrl) {
          try {
            sessionStorage.setItem('linkedinUrl', JSON.stringify({
              url: data.linkedinUrl,
              timestamp: Date.now()
            }));
          } catch (e) {
            // Ignore sessionStorage errors
          }
        }
      });
    } else {
      // Calculate time since last refresh
      const now = Date.now();
      const timeSinceLastRefresh = now - locationHistory.lastRefreshTime;
      
      // For other navigations, refresh in background every 2 minutes
      if (timeSinceLastRefresh > 120000) { // 2 minutes
        console.log("Refreshing profile data in background (time-based)");
        refreshProfileData({ 
          background: true,
          silent: true
        });
      } else {
        console.log("Skipping refresh - too soon since last refresh");
      }
    }
  }, [location?.pathname, refreshProfileData]);

  // Écouter les événements d'authentification
  useEffect(() => {
    const handleLoginSuccess = () => {
      setIsAuthenticated(true);
      void fetchInitialUserData();
    };

    const handleLogoutSuccess = () => {
      setIsAuthenticated(false);
      setUserData(null);
      setProfileData(null);
      setLoadingState(LOADING_STATES.INITIAL);
    };

    const handleUserDataUpdated = async (event) => {
      if (event.detail && event.detail.user) {
        console.log("MainLayout: Handling user:data-updated event.");
        setUserData(event.detail.user); // Update state with basic user data
        setLoadingState(LOADING_STATES.COMPLETE);

        // REMOVED: Unnecessary immediate fetch of consolidated profile data here.
        // Let navigation effects or component needs handle loading full profile data.
        /*
        // Charger les données de profil quand même pour s'assurer d'avoir les dernières données
        try {
          const profileData = await profileService.getAllProfileData();
          setProfileData(profileData);
        } catch (profileError) {
          console.warn('Error loading profile data after update:', profileError);
        }
        */
      }
    };

    const handleLoginComplete = (event) => {
      const { user } = event.detail;
      if (user) {
        // Force an immediate update with complete user data
        setUserData(user);
        console.log("Login complete with full user data in MainLayout:", user);
      }
    };
    
    const handleForceProfileRefresh = (event) => {
      // Force refresh profile data
      console.log("Force profile refresh triggered in MainLayout:", event.detail);
      void (async () => {
        try {
          const profileData = await profileService.getAllProfileData({ forceRefresh: true });
          setProfileData(profileData);
          if (profileData?.user) {
            setUserData(profileData.user);
          } else if (profileData) {
            setUserData(profileData);
          }
        } catch (error) {
          console.error("Error refreshing profile data:", error);
        }
      })();
    };

    window.addEventListener('login-success', handleLoginSuccess);
    window.addEventListener('logout-success', handleLogoutSuccess);
    document.addEventListener('user:data-updated', handleUserDataUpdated);
    document.addEventListener('auth:login-complete', handleLoginComplete);
    window.addEventListener('force-profile-refresh', handleForceProfileRefresh);

    return () => {
      window.removeEventListener('login-success', handleLoginSuccess);
      window.removeEventListener('logout-success', handleLogoutSuccess);
      document.removeEventListener('user:data-updated', handleUserDataUpdated);
      document.removeEventListener('auth:login-complete', handleLoginComplete);
      window.removeEventListener('force-profile-refresh', handleForceProfileRefresh);
    };
  }, [userData]);

  // Fonction pour récupérer les données utilisateur initiales
  const fetchInitialUserData = async () => {
    if (authService.isLoggedIn()) {
      try {
        // Essayer de récupérer les données minimales de l'utilisateur depuis le localStorage
        const minimalUser = authService.getUser();
        
        if (minimalUser) {
          // Mettre à jour l'état avec les données minimales
          setUserData(minimalUser);
          setLoadingState(LOADING_STATES.MINIMAL);
          
          // If the data from localStorage/token is already complete, don't reload it eagerly
          // Let navigation or specific component needs trigger the consolidated load.
          if (!minimalUser._minimal) {
            setLoadingState(LOADING_STATES.COMPLETE);
            // REMOVED: Eager loading of consolidated profile data even when basic data exists.
            /*
            // Load profile data anyway to ensure we have the latest data
            try {
              const profileData = await profileService.getAllProfileData();
              setProfileData(profileData);
            } catch (profileError) {
              console.warn('Error loading profile data with complete user:', profileError);
            }
            */
          } else {
             // If minimal user data was found, initiate background fetch for consolidated data
             // but don't await it here to keep initial load fast.
             console.log("Minimal user data found, triggering background profile load.");
             profileService.getAllProfileData({ background: true, silent: true });
          }
        } else {
          // Aucune donnée utilisateur disponible, charger depuis l'API
          setLoadingState(LOADING_STATES.LOADING);
          const userData = await authService.getCurrentUser();
          setUserData(userData);
          setLoadingState(LOADING_STATES.COMPLETE);
        }
        
        // Attendre un court instant avant d'afficher le composant de progression
        setTimeout(() => {
          setShowProgress(true);
        }, 300);
      } catch (error) {
        console.error('Error fetching initial user data:', error);
        setLoadingState(LOADING_STATES.ERROR);
        
        // If error is related to authentication, clear local state
        if (error.response?.status === 401 || error.response?.status === 403) {
          console.warn('Authentication error, clearing local state');
          // Don't automatically logout to avoid redirect loops
          // Just clear userData to force re-authentication
          setUserData(null);
          setIsAuthenticated(false);
          setProfileData(null);
        }
      }
    } else {
      // Clear any existing data if not logged in
      setUserData(null);
      setProfileData(null);
      setLoadingState(LOADING_STATES.INITIAL);
    }
  };

  // Create a memoized context value to prevent unnecessary re-renders
  const profileContextValue = useMemo(() => {
    // Ensure the refresh function is properly memoized and wrapped for safety
    const safeRefreshProfileData = async (options = {}) => {
      try {
        return await refreshProfileData(options);
      } catch (error) {
        console.error("Error in safeRefreshProfileData:", error);
        return null;
      }
    };
    
    return {
      profileData,
      refreshProfileData: safeRefreshProfileData,
      isProfileLoading: loadingState === LOADING_STATES.LOADING
    };
  }, [profileData, refreshProfileData, loadingState]);

  // Déterminer si nous devons afficher un état de chargement
  const isLoading = loadingState === LOADING_STATES.INITIAL || loadingState === LOADING_STATES.LOADING;
  const hasMinimalData = loadingState === LOADING_STATES.MINIMAL || loadingState === LOADING_STATES.COMPLETE;

  return (
    <ProfileContext.Provider value={profileContextValue}>
      <div className="flex flex-col min-h-screen bg-gray-50">
        {/* Navbar conditionally rendered */}
        {!isFullScreenPage && (
          <Navbar 
            user={userData} 
            isLoading={loadingState !== LOADING_STATES.COMPLETE && isAuthenticated} 
          />
        )}
        
        {/* Main content with minimum height to ensure footer is below viewport */}
        <main 
          className={`flex-grow ${isFullScreenPage ? 'px-0 py-0' : 'container mx-auto px-4 py-8'}`}
          style={{ minHeight: minContentHeight }}
        >
          {/* Passer l'état de chargement au contexte Outlet */}
          <Outlet context={{ 
            userData, 
            profileData, 
            loadingState,
            isLoading,
            hasMinimalData
          }} />
        </main>

        {showProgress && profileData && hasRole(ROLES.GUEST) && (
          <ProfileProgress userData={profileData} refreshData={refreshProfileData} />
        )}
        
        {/* Add ChatButton for authenticated users */}
        {isAuthenticated && !isFullScreenPage && <ChatButton />}
        
        {/* Footer */}
        <Footer />
      </div>
    </ProfileContext.Provider>
  );
};

export default MainLayout;
