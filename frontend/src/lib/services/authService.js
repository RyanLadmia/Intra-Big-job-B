import axiosInstance from '@/lib/axios';
import apiService from './apiService';
import { clearQueryCache, getQueryClient } from '../utils/queryClientUtils';
import { showGlobalLoader, hideGlobalLoader } from '../utils/loadingUtils';
import { toast } from 'sonner';
import userDataManager from './userDataManager';
import axios from 'axios'; // Import axios

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

// Générer un identifiant de session unique
export const generateSessionId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

// Stocker l'identifiant de session actuel
let currentSessionId = localStorage.getItem('session_id') || generateSessionId();

// Exposer l'identifiant de session pour l'utiliser dans les clés de requête
export const getSessionId = () => currentSessionId;

// Lazy loading des informations utilisateur
let userDataPromise = null;

/**
 * Décode un token JWT
 * @param {string} token - Le token JWT à décoder
 * @returns {Object|null} - Le contenu décodé du token ou null si invalide
 */
function decodeToken(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Erreur lors du décodage du token:', error);
    return null;
  }
}

/**
 * Service pour l'authentification et la gestion des utilisateurs
 */
export const authService = {
  /**
   * Inscription d'un nouvel utilisateur
   * @param {Object} userData - Données de l'utilisateur
   * @returns {Promise<Object>} - Réponse de l'API
   */
  async register(userData) {
    try {
      // Hide sensitive data in logs
      const logData = { ...userData };
      if (logData.plainPassword) {
        logData.plainPassword = '***';
      }
      if (logData.password) {
        logData.password = '***';
      }
      
      console.log('[authService] Début de l\'inscription:', logData);
      
      // Create registration data structure with all required fields for the backend
      const registrationData = {
        email: userData.email,
        password: userData.plainPassword, // Backend expects 'password'
        firstName: userData.firstName,
        lastName: userData.lastName,
        birthDate: userData.birthDate,
        phoneNumber: userData.phoneNumber,
        nationality: userData.nationality
      };
      
      // Add address if provided
      if (userData.address) {
        registrationData.address = userData.address;
      }
      
      // Hide sensitive data in logs
      const logRegistrationData = { ...registrationData, password: '***' };
      console.log('[authService] Données formatées pour l\'API:', logRegistrationData);
      
      // Use apiService to handle all API calls consistently
      const response = await apiService.post('/register', registrationData);
      
      console.log('[authService] Inscription réussie:', response);
      
      // Si la réponse contient un token (certaines API peuvent fournir un token immédiatement)
      if (response && response.token) {
        localStorage.setItem('token', response.token);
      }
      
      // Retourner la réponse de l'API
      return response;
    } catch (error) {
      console.error('[authService] Erreur lors de l\'inscription:', error);
      console.error('[authService] Détails:', error.response?.data || error.message);
      throw error;
    }
  },

  /**
   * Connexion d'un utilisateur
   * @param {string} email - Email de l'utilisateur
   * @param {string} password - Mot de passe
   * @returns {Promise<Object>} - Réponse de l'API avec token JWT
   */
  async login(email, password) {
    try {
      // Only invalidate instead of removing queries - faster operation
      const queryClient = getQueryClient();
      if (queryClient) {
        queryClient.invalidateQueries({ queryKey: ['user'] });
        queryClient.invalidateQueries({ queryKey: ['profile'] });
      }
      
      // Set login in progress flag to prevent non-critical API calls
      sessionStorage.setItem('login_in_progress', 'true');
      
      // Obtain device ID and info
      const deviceId = getOrCreateDeviceId();
      const { deviceName, deviceType } = getDeviceInfo();
      
      // Clean up previous user data
      localStorage.removeItem('token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
      
      // Generate a new session ID
      currentSessionId = generateSessionId();
      localStorage.setItem('session_id', currentSessionId);
      
      // Show loader with no delay
      showGlobalLoader();
      
      // Prepare data for the standard JWT route (/login_check)
      const loginData = {
        username: email, // Note the field 'username' instead of 'email' for JWT standard
        password,
        device_id: deviceId,
        device_name: deviceName,
        device_type: deviceType
      };
      
      console.log('[authService] Tentative de connexion:', { username: email, password: '***', device_id: deviceId });
      
      // Afficher l'URL complète pour le débogage
      const apiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';
      console.log('[authService] URL API:', apiUrl + '/login_check');
      
      // Use direct axios call to ensure proper error handling
      const response = await axios.post(apiUrl + '/login_check', loginData, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      
      console.log('[authService] Connexion réussie:', response.data);
      
      // Store JWT token in localStorage
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      
      // Store refresh token if present
      if (response.data && response.data.refresh_token) {
        localStorage.setItem('refresh_token', response.data.refresh_token);
      }
      
      // Extract detailed info from JWT token for immediate use
      if (response.data && response.data.token) {
        try {
          const tokenParts = response.data.token.split('.');
          if (tokenParts.length === 3) {
            const payload = JSON.parse(atob(tokenParts[1]));
            
            if (payload.roles) {
              // Create enhanced user object with token information
              const enhancedUser = {
                id: payload.id || null,
                email: payload.username || email,
                roles: payload.roles,
                firstName: payload.firstName || '',
                lastName: payload.lastName || '',
                // Add extra information we can extract from token
                token_exp: payload.exp,
                token_iat: payload.iat
              };
              
              // Store user data in localStorage for immediate access
              localStorage.setItem('user', JSON.stringify(enhancedUser));
              
              // Dispatch an event to notify app that user is logged in
              window.dispatchEvent(new Event('login-success'));
              
              // Trigger background loading of complete user data
              this.lazyLoadUserData(true);
            }
          }
        } catch (e) {
          console.error('Error parsing JWT token:', e);
        }
      }
      
      // Hide loader after successful login
      hideGlobalLoader();
      
      // Remove login in progress flag
      sessionStorage.removeItem('login_in_progress');
      
      return response.data;
    } catch (error) {
      // Hide loader after failed login
      hideGlobalLoader();
      
      // Remove login in progress flag
      sessionStorage.removeItem('login_in_progress');
      
      // Log detailed error information for debugging
      console.error('[authService] Login error:', error);
      if (error.response) {
        console.error('[authService] Error response:', error.response.data);
      }
      
      throw error;
    }
  },

  /**
   * Charge les données utilisateur en arrière-plan sans bloquer l'interface
   * @param {boolean} isInitialLoad - Indique s'il s'agit du chargement initial après connexion
   * @returns {Promise<Object>} - Données utilisateur complètes
   */
  async lazyLoadUserData(isInitialLoad = false) {
    const cachedUser = this.getUser();
    if (!cachedUser) return null;
    
    console.log('🔄 authService.lazyLoadUserData: starting with isInitialLoad=', isInitialLoad);
    
    try {
      // Démarrer le chargement des données en parallèle
      const loadPromises = [];
      
      // 1. Charger les données de profil de base - Priorité haute
      const profilePromise = this._loadProfileData();
      loadPromises.push(profilePromise);
      
      // 2. Charger d'autres données non critiques en parallèle si ce n'est pas le chargement initial
      if (!isInitialLoad) {
        // Ces chargements ne sont pas critiques pour l'affichage initial
        // Ils peuvent être ajoutés selon les besoins de l'application
      }
      
      // Attendre que les données critiques soient chargées
      const results = await Promise.allSettled(loadPromises);
      
      console.log('🔄 authService.lazyLoadUserData: profile data loaded, results:', results);
      
      // Récupérer le résultat du chargement du profil
      const profileResult = results[0];
      let enhancedUser = cachedUser;
      
      if (profileResult.status === 'fulfilled' && profileResult.value) {
        enhancedUser = profileResult.value;
        
        // Ensure data is properly saved to localStorage
        localStorage.setItem('user', JSON.stringify(enhancedUser));
        console.log('🔄 authService.lazyLoadUserData: saved enhanced user to localStorage');
        
        // Update React Query cache
        try {
          const queryClient = getQueryClient();
          if (queryClient) {
            queryClient.setQueryData(['user', 'current'], enhancedUser);
            queryClient.setQueryData(['unified-user-data', '/api/me', getSessionId()], enhancedUser);
            queryClient.setQueryData(['user-data', enhancedUser?.id || 'anonymous', getSessionId()], enhancedUser);
            console.log('🔄 authService.lazyLoadUserData: updated React Query cache');
          }
        } catch (cacheError) {
          console.warn('🔄 authService.lazyLoadUserData: Error updating cache:', cacheError);
        }
      }
      
      // Terminer le processus de connexion
      sessionStorage.removeItem('login_in_progress');
      
      // Signaler que les données complètes sont disponibles
      document.dispatchEvent(new CustomEvent('user:data-updated', { 
        detail: { user: enhancedUser } 
      }));
      
      // Also dispatch the specific event that AuthForm is waiting for
      window.dispatchEvent(new Event('user-data-loaded'));
      console.log('🔄 authService.lazyLoadUserData: dispatched user-data-loaded event');
      
      return enhancedUser;
    } catch (error) {
      console.warn('Erreur lors du chargement des données utilisateur:', error);
      sessionStorage.removeItem('login_in_progress');
      
      // Even in case of error, dispatch the event to unblock navigation
      window.dispatchEvent(new Event('user-data-loaded'));
      console.log('🔄 authService.lazyLoadUserData: dispatched user-data-loaded event (after error)');
      
      return cachedUser;
    }
  },
  
  /**
   * Charge les données de profil utilisateur depuis l'API
   * @private
   * @returns {Promise<Object>} - Données de profil
   */
  async _loadProfileData() {
    try {
      console.log('🔄 authService._loadProfileData: Starting profile data fetch');
      
      // Éviter de charger les données si l'utilisateur n'est pas connecté
      if (!this.isLoggedIn()) {
        console.log('🔄 authService._loadProfileData: Not logged in, aborting');
        return null;
      }
      
      // Get data directly from /api/me endpoint (the most reliable source)
      const response = await apiService.get('/api/me', { 
        noCache: true,
        timeout: 10000,
        retries: 1
      });
      
      console.log('🔄 authService._loadProfileData: /api/me response:', response);
      
      // Extract user data from response
      let userData = null;
      
      if (response.user) {
        userData = response.user;
      } else if (response.data && response.data.user) {
        userData = response.data.user;
      } else if (response.success && response.user) {
        userData = response.user;
      } else {
        // If there's no user property, assume the entire response is the user data
        userData = response;
      }
      
      if (!userData) {
        console.warn('🔄 authService._loadProfileData: No valid user data found in response');
        return null;
      }
      
      console.log('🔄 authService._loadProfileData: Extracted user data:', userData);
      
      // Store the comprehensive user data in localStorage
      localStorage.setItem('user', JSON.stringify(userData));
      
      return userData;
    } catch (error) {
      console.error('🔄 authService._loadProfileData: Error loading profile data:', error);
      return null;
    }
  },

  /**
   * Rafraîchir le token JWT
   * @returns {Promise<Object>} - Nouveau token JWT
   */
  async refreshToken() {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      const deviceId = localStorage.getItem('device_id');
      const { deviceName, deviceType } = getDeviceInfo();
      
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }
      
      const refreshData = {
        refresh_token: refreshToken,
        device_id: deviceId,
        device_name: deviceName,
        device_type: deviceType
      };
      
      const response = await apiService.post('/token/refresh', refreshData);
      
      if (response.token) {
        localStorage.setItem('token', response.token);
      }
      
      if (response.refresh_token) {
        localStorage.setItem('refresh_token', response.refresh_token);
      }
      
      return response;
    } catch (error) {
      console.error('Erreur lors du rafraîchissement du token:', error);
      console.error('Détails de l\'erreur de rafraîchissement:', error.response?.data || error.message);
      // Si le refresh token est invalide, déconnecter l'utilisateur
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        this.logout();
      }
      throw error;
    }
  },
  
  /**
   * Déconnexion
   * @param {string} [redirectTo='/login'] - Chemin de redirection après la déconnexion
   * @returns {Promise<boolean>} - True si la déconnexion est réussie
   */
  async logout(redirectTo = '/login') {
    try {
      // Set global navigation flags
      window.__isLoggingOut = true;
      window.__isNavigating = true;
      
      // Show global loading state immediately without animation
      showGlobalLoader();
      
      // Clear all localStorage data in one step - do this before API calls
      localStorage.clear();
      sessionStorage.clear();
      
      // Try to revoke refresh token on server side
      try {
        const refreshToken = localStorage.getItem('refresh_token');
        const deviceId = localStorage.getItem('device_id');
        
        if (refreshToken) {
          const revokeData = {
            refresh_token: refreshToken,
            device_id: deviceId
          };
          
          await apiService.post('/token/revoke', revokeData).catch(() => {
            // Ignore errors during token revocation
          });
        }
      } catch (error) {
        // Ignore errors during logout API calls
      }
      
      // Clear all API and query caches
      try {
        // Clear React Query cache
        const queryClient = getQueryClient();
        if (queryClient) {
          queryClient.cancelQueries();
          queryClient.removeQueries();
          clearQueryCache();
        }
        
        // Clear API cache
        apiService.clearCache();
      } catch (error) {
        // Ignore cache clearing errors
      }
      
      // Create a new session ID for next login
      currentSessionId = generateSessionId();
      
      // Trigger the logout success event
      window.dispatchEvent(new CustomEvent('logout-success', {
        detail: { redirectTo }
      }));
      
      // Use the window.location.replace method for a cleaner page transition
      // This replaces the current history entry instead of adding a new one
      setTimeout(() => {
        window.location.replace(redirectTo || '/login');
      }, 10);
      
      return true;
    } catch (error) {
      // Force localStorage cleanup even on error
      localStorage.clear();
      sessionStorage.clear();
      
      // Redirect even on error
      window.location.replace('/login');
      
      return false;
    }
  },
  
  /**
   * Déconnexion de tous les appareils
   */
  async logoutAllDevices() {
    try {
      await apiService.post('/token/revoke-all');
      
      // Nettoyer le localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
      
      // Réinitialiser la promesse de chargement des données utilisateur
      userDataPromise = null;
      
      // Vider le cache React Query
      clearQueryCache();
    } catch (error) {
      console.error('Erreur lors de la déconnexion de tous les appareils:', error);
      console.error('Détails:', error.response?.data || error.message);
      throw error;
    }
  },
  
  /**
   * Récupérer la liste des appareils connectés
   */
  async getDevices() {
    try {
      const devices = await apiService.get('/token/devices');
      return devices;
    } catch (error) {
      console.error('Erreur lors de la récupération des appareils:', error);
      console.error('Détails:', error.response?.data || error.message);
      throw error;
    }
  },

  /**
   * Récupère le token JWT stocké
   * @returns {string|null} - Token JWT ou null
   */
  getToken() {
    return localStorage.getItem('token');
  },

  /**
   * Récupère les informations de l'utilisateur connecté
   * @returns {Object|null} - Informations de l'utilisateur ou null
   */
  getUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  /**
   * Vérifie si l'utilisateur est connecté
   * @returns {boolean} - True si connecté
   */
  isLoggedIn() {
    const token = this.getToken();
    if (!token) return false;

    try {
      const decodedToken = decodeToken(token);
      if (!decodedToken) return false;
      
      const currentTime = Date.now() / 1000;
      return decodedToken.exp > currentTime;
    } catch (error) {
      return false;
    }
  },

  /**
   * Vérifie si l'utilisateur a un rôle spécifique
   * @param {string} role - Le rôle à vérifier
   * @returns {boolean} - True si l'utilisateur a le rôle
   */
  hasRole(role) {
    const user = this.getUser();
    if (!user) return false;
    
    // Extraire les rôles de l'utilisateur
    let userRoles = [];
    
    if (Array.isArray(user.roles)) {
      userRoles = user.roles;
    } else if (typeof user.roles === 'object' && user.roles !== null) {
      userRoles = Object.values(user.roles);
    } else if (user.role) {
      userRoles = Array.isArray(user.role) ? user.role : [user.role];
    }
    
    // Normaliser le rôle recherché
    const searchRole = role.toUpperCase().startsWith('ROLE_') ? role.toUpperCase() : `ROLE_${role.toUpperCase()}`;
    
    // Vérifier si l'utilisateur a le rôle spécifié
    return userRoles.some(userRole => {
      // Si le rôle est une chaîne de caractères
      if (typeof userRole === 'string') {
        const normalizedUserRole = userRole.toUpperCase().startsWith('ROLE_') ? 
          userRole.toUpperCase() : 
          `ROLE_${userRole.toUpperCase()}`;
        return normalizedUserRole === searchRole;
      }
      
      // Si le rôle est un objet
      if (typeof userRole === 'object' && userRole !== null) {
        const roleName = userRole.name || userRole.role || userRole.roleName || '';
        const normalizedRoleName = roleName.toUpperCase().startsWith('ROLE_') ? 
          roleName.toUpperCase() : 
          `ROLE_${roleName.toUpperCase()}`;
        return normalizedRoleName === searchRole;
      }
      
      return false;
    });
  },

  /**
   * Récupère les données de l'utilisateur courant
   * @param {boolean} forceRefresh - Force un rafraîchissement des données
   * @param {Object} options - Options supplémentaires
   * @param {string} options.requestSource - Identifie la source de la requête pour le débogage
   * @returns {Promise<Object>} - Données utilisateur
   */
  async getCurrentUser(forceRefresh = false, options = {}) {
    const { requestSource = 'unknown' } = options;
    const token = this.getToken();
    if (!token) {
      throw new Error('Aucun token d\'authentification trouvé');
    }

    // Ajouter du contexte de débogage pour tracer l'origine des appels
    console.log(`🔍 getCurrentUser appelé depuis: ${requestSource || 'non spécifié'} (force=${forceRefresh})`);

    // Utiliser le nouveau gestionnaire de données utilisateur
    try {
      const userData = await userDataManager.getUserData({
        forceRefresh,
        routeKey: '/api/me',
        requestId: `auth_service_${requestSource}_${Date.now()}`
      });
      
      // Stocker le rôle principal pour référence (maintenir la compatibilité)
      if (userData.roles && userData.roles.length > 0) {
        localStorage.setItem('last_role', userData.roles[0]);
        
        // Stocker également le tableau des rôles séparément
        localStorage.setItem('userRoles', JSON.stringify(userData.roles));
      }
      
      return userData;
    } catch (error) {
      console.error(`Error in getCurrentUser (source: ${requestSource}):`, error);
      
      // Essayer d'utiliser les données en cache si disponibles
      const cachedUser = userDataManager.getCachedUserData();
      if (cachedUser) {
        console.log(`Utilisation des données en cache pour getCurrentUser (source: ${requestSource})`);
        return cachedUser;
      }
      
      throw error;
    }
  },
  
  /**
   * Change le mot de passe de l'utilisateur connecté
   * @param {Object} passwordData - Données de changement de mot de passe
   * @param {string} passwordData.currentPassword - Mot de passe actuel
   * @param {string} passwordData.newPassword - Nouveau mot de passe
   * @returns {Promise<Object>} - Réponse de l'API
   */
  async changePassword(passwordData) {
    try {
      const response = await apiService.post('/api/change-password', passwordData, apiService.withAuth());
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Nettoie toutes les données d'authentification et redirige vers la page de connexion
   * @param {boolean} showNotification - Indique si une notification doit être affichée
   * @param {string} message - Message personnalisé à afficher dans la notification
   */
  clearAuthData(showNotification = true, message = 'Vous avez été déconnecté.') {
    // Supprimer toutes les données d'authentification du localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('refresh_token');
    
    // Afficher une notification si demandé
    if (showNotification) {
      toast.success(message, {
        duration: 3000,
        position: 'top-center',
      });
    }
    
    // Rediriger vers la page de connexion
    window.location.href = '/login';
  },

  // Méthode pour déclencher manuellement une mise à jour des rôles
  triggerRoleUpdate: () => {
    window.dispatchEvent(new Event('role-change'));
    triggerRoleUpdate();
  },

  /**
   * Ensures that all necessary user data is saved to localStorage
   * Call this when encountering issues with missing data
   */
  ensureUserDataInLocalStorage: async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.warn('Cannot ensure user data - no token found');
        return false;
      }
      
      // Check if the current page is the signature page
      const isSignaturePage = window.location.pathname.includes('/student/attendance');
      
      // Get user data from API
      let userData = null;
      try {
        // First try to get from the basic me endpoint
        userData = await authService.getCurrentUser(true);
      } catch (err) {
        console.warn('Failed to get user data from /me endpoint, trying backup methods');
      }
      
      // If we have user data, save it
      if (userData) {
        // Store the actual user data
        localStorage.setItem('user', JSON.stringify(userData));
        
        // Ensure roles are stored
        if (userData.roles && Array.isArray(userData.roles)) {
          // If this is the signature page, ensure STUDENT role is included
          let roles = userData.roles;
          if (isSignaturePage && !roles.includes('ROLE_STUDENT')) {
            roles.push('ROLE_STUDENT'); // Add student role for signature page
          }
          localStorage.setItem('userRoles', JSON.stringify(roles));
        } else {
          // If no roles in response, set default student role for testing
          localStorage.setItem('userRoles', JSON.stringify(['ROLE_STUDENT']));
        }
        
        console.log('Successfully ensured user data in localStorage', {
          userData, 
          roles: JSON.parse(localStorage.getItem('userRoles') || '[]')
        });
        return true;
      }
      
      // If we still don't have user data, create minimal data
      // Based on data from token
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const decodedToken = decodeToken(token);
          if (decodedToken) {
            const minimalUser = {
              id: decodedToken.id || '1',
              email: decodedToken.username || 'user@example.com',
              roles: decodedToken.roles || ['ROLE_USER'],
              _fixedAt: Date.now()
            };
            
            localStorage.setItem('user', JSON.stringify(minimalUser));
            
            console.log('Created minimal user data from token');
            return true;
          }
        }
      } catch (tokenError) {
        console.error('Error creating fallback user data:', tokenError);
      }
      
      // Ensure roles exist - default to student role
      // For signature page, make sure student role is always included
      if (!localStorage.getItem('userRoles') || isSignaturePage) {
        localStorage.setItem('userRoles', JSON.stringify(['ROLE_STUDENT']));
      }
      
      console.log('Created fallback user data in localStorage', {
        user: JSON.parse(localStorage.getItem('user') || '{}'),
        roles: JSON.parse(localStorage.getItem('userRoles') || '[]')
      });
      
      return true;
    } catch (error) {
      console.error('Error ensuring user data:', error);
      return false;
    }
  },

  /**
   * Récupère les données minimales de l'utilisateur à partir du localStorage
   * Utilisé comme fallback lorsque les appels API échouent
   * @returns {Object|null} - Données minimales utilisateur ou null
   */
  getMinimalUserData() {
    try {
      const userStr = localStorage.getItem('user');
      if (!userStr) return null;
      
      const userData = JSON.parse(userStr);
      
      // Vérifier que les données minimales requises sont présentes
      if (!userData || (!userData.firstName && !userData.lastName)) {
        return null;
      }
      
      return {
        ...userData,
        _source: 'localStorage',
        _retrievedAt: Date.now()
      };
    } catch (error) {
      console.error('Erreur lors de la récupération des données minimales:', error);
      return null;
    }
  },

  /**
   * Add a global helper to diagnose and fix profile data issues
   * This can be called if users encounter profile data errors
   */
  async fixProfileDataIssues() {
    try {
      console.log('Attempting to fix profile data issues...');
      
      // Check if user is logged in
      const token = localStorage.getItem('token');
      if (!token) {
        console.warn('No authentication token found. User is not logged in.');
        return { success: false, message: 'Not authenticated' };
      }
      
      // Clear any cached profile data
      const queryClient = getQueryClient();
      if (queryClient) {
        queryClient.invalidateQueries({ queryKey: ['user'] });
        queryClient.invalidateQueries({ queryKey: ['profile'] });
      }
      
      // Try to fetch fresh profile data
      try {
        const correctApiPath = '/api/profile';
        const userData = await apiService.get(correctApiPath, {
          noCache: true,
          retries: 2,
          timeout: 10000
        });
        
        if (userData) {
          // Update localStorage with fresh data
          localStorage.setItem('user', JSON.stringify(userData));
          console.log('Profile data fixed successfully');
          
          // Update React Query cache
          if (queryClient) {
            queryClient.setQueryData(['user', 'current'], userData);
          }
          
          return { success: true, message: 'Profile data fixed successfully' };
        }
      } catch (apiError) {
        console.error('Error fetching fresh profile data:', apiError);
      }
      
      // If we couldn't fetch fresh data, create minimal profile data
      // Based on data from token
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const decodedToken = decodeToken(token);
          if (decodedToken) {
            const minimalUser = {
              id: decodedToken.id || '1',
              email: decodedToken.username || 'user@example.com',
              roles: decodedToken.roles || ['ROLE_USER'],
              _fixedAt: Date.now()
            };
            
            localStorage.setItem('user', JSON.stringify(minimalUser));
            
            console.log('Created minimal profile data from token');
            return { success: true, message: 'Created minimal profile data' };
          }
        }
      } catch (tokenError) {
        console.error('Error creating fallback profile data:', tokenError);
      }
      
      return { success: false, message: 'Could not fix profile data' };
    } catch (error) {
      console.error('Error in fixProfileDataIssues:', error);
      return { success: false, message: error.message };
    }
  },
};

// Générer ou récupérer un identifiant unique pour l'appareil
function getOrCreateDeviceId() {
  // Vérifier si un deviceId existe déjà dans le localStorage
  let deviceId = localStorage.getItem('device_id');
  
  // Si non, en créer un nouveau
  if (!deviceId) {
    // Générer un identifiant unique (UUID v4)
    deviceId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
    localStorage.setItem('device_id', deviceId);
  }
  
  return deviceId;
}

// Obtenir des informations de base sur l'appareil
function getDeviceInfo() {
  const userAgent = window.navigator.userAgent;
  let deviceType = 'web';
  let deviceName = 'Browser';
  
  // Détection simple du type d'appareil
  if (/Android/i.test(userAgent)) {
    deviceType = 'mobile';
    deviceName = 'Android Device';
  } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
    deviceType = 'mobile';
    deviceName = 'iOS Device';
  } else if (/Windows/i.test(userAgent)) {
    deviceType = 'desktop';
    deviceName = 'Windows Device';
  } else if (/Macintosh/i.test(userAgent)) {
    deviceType = 'desktop';
    deviceName = 'Mac Device';
  } else if (/Linux/i.test(userAgent)) {
    deviceType = 'desktop';
    deviceName = 'Linux Device';
  }
  
  return {
    deviceType,
    deviceName
  };
}

export default authService;