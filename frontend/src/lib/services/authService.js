import axiosInstance from '@/lib/axios';
import apiService from './apiService';
import { clearQueryCache, getQueryClient } from '../utils/queryClientUtils';
import { showGlobalLoader, hideGlobalLoader } from '../utils/loadingUtils';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

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
      const response = await apiService.post('/register', userData);
      
      // Si la réponse contient un token (certaines API peuvent fournir un token immédiatement)
      if (response && response.token) {
        localStorage.setItem('token', response.token);
      }
      
      // Retourner une réponse formatée avec un status 201 si l'API ne renvoie pas de statut
      return {
        status: response.status || 201,
        data: response
      };
    } catch (error) {
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
      // Vider le cache existant de manière sélective avant la connexion
      // Ne supprimer que les caches pertinents pour l'authentification
      const queryClient = getQueryClient();
      if (queryClient) {
        queryClient.removeQueries({ queryKey: ['user'] });
        queryClient.removeQueries({ queryKey: ['profile'] });
      }
      
      // Obtain device ID and info
      const deviceId = getOrCreateDeviceId();
      const { deviceName, deviceType } = getDeviceInfo();
      
      // Prepare data for the standard JWT route (/login_check)
      const loginData = {
        username: email, // Note the field 'username' instead of 'email' for JWT standard
        password,
        device_id: deviceId,
        device_name: deviceName,
        device_type: deviceType
      };
      
      // Clean up previous user data
      localStorage.removeItem('token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
      
      // Generate a new session ID
      currentSessionId = generateSessionId();
      localStorage.setItem('session_id', currentSessionId);
      
      // Show loader
      showGlobalLoader('Connexion en cours...');
      
      // Use JWT standard route directly
      const response = await apiService.post('/login_check', loginData);
      
      // Store JWT token in localStorage
      if (response.token) {
        localStorage.setItem('token', response.token);
      }
      
      // Store refresh token if present
      if (response.refresh_token) {
        localStorage.setItem('refresh_token', response.refresh_token);
      }
      
      // Extract detailed info from JWT token for immediate use
      if (response.token) {
        try {
          const tokenParts = response.token.split('.');
          if (tokenParts.length === 3) {
            const payload = JSON.parse(atob(tokenParts[1]));
            
            if (payload.roles) {
              // Create enhanced user object with token information
              const enhancedUser = {
                username: payload.username,
                roles: payload.roles,
                // Extract additional information if available
                id: payload.id,
                email: payload.username,
                firstName: payload.firstName,
                lastName: payload.lastName,
                // Add token extraction timestamp for tracking freshness
                _extractedAt: Date.now()
              };
              
              localStorage.setItem('user', JSON.stringify(enhancedUser));
              
              // IMPORTANT: Also store roles separately in localStorage
              localStorage.setItem('userRoles', JSON.stringify(payload.roles));
              
              // Pre-populate cache with this minimal data to speed up initial rendering
              if (queryClient) {
                queryClient.setQueryData(['user', 'current'], enhancedUser);
              }
              
              // Trigger role update event
              window.dispatchEvent(new Event('role-change'));
            }
          }
        } catch (tokenError) {
          // Silently handle token parsing errors
          console.error('Error parsing token:', tokenError);
        }
      }
      
      // Hide loader
      hideGlobalLoader();
      
      // Initialize background loading of user data
      // but don't wait for resolution
      this.lazyLoadUserData();
      
      return response;
    } catch (error) {
      hideGlobalLoader();
      console.error('Login error:', error);
      
      throw error;
    }
  },

  /**
   * Charge les données utilisateur en arrière-plan
   * @returns {Promise<Object>} - Données de l'utilisateur
   */
  lazyLoadUserData() {
    // Si une promesse existe déjà, la retourner
    if (userDataPromise) return userDataPromise;
    
    // Créer une promesse avec timeout
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error('User data fetch timeout'));
      }, 15000); // Increased from 1500ms to 15000ms for better reliability
    });
    
    // Sinon, créer une nouvelle promesse
    const fetchPromise = this.getCurrentUser()
      .then(userData => {
        if (!userData) {
          throw new Error('No user data received');
        }
        localStorage.setItem('user', JSON.stringify(userData));
        window.dispatchEvent(new Event('user-data-loaded'));
        return userData;
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
        // Try to use cached data if available
        const cachedUser = localStorage.getItem('user');
        if (cachedUser) {
          try {
            return JSON.parse(cachedUser);
          } catch (e) {
            // Invalid cached data
            localStorage.removeItem('user');
          }
        }
        throw error;
      });
    
    // Race between fetch and timeout
    userDataPromise = Promise.race([fetchPromise, timeoutPromise])
      .catch(error => {
        userDataPromise = null; // Réinitialiser en cas d'erreur
        
        // Even if we timeout, dispatch the event to unblock UI
        window.dispatchEvent(new Event('user-data-loaded'));
        
        // Try to extract more detailed user data from token as fallback
        try {
          const token = localStorage.getItem('token');
          if (token) {
            const tokenParts = token.split('.');
            if (tokenParts.length === 3) {
              const payload = JSON.parse(atob(tokenParts[1]));
              if (payload.username) {
                const minimalUser = {
                  username: payload.username,
                  roles: payload.roles || [],
                  id: payload.id,
                  email: payload.username,
                  firstName: payload.firstName,
                  lastName: payload.lastName,
                  _fromToken: true // Flag to indicate this is minimal data
                };
                return minimalUser;
              }
            }
          }
        } catch (tokenError) {
          console.error('Error parsing token:', tokenError);
        }
        
        throw error;
      });
    
    return userDataPromise;
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
      // Si le refresh token est invalide, déconnecter l'utilisateur
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        this.logout();
      }
      throw error;
    }
  },
  
  /**
   * Déconnexion
   * @param {string} [redirectTo='/'] - Chemin de redirection après la déconnexion
   * @returns {Promise<boolean>} - True si la déconnexion est réussie
   */
  async logout(redirectTo = '/') {
    try {
      // Show global loading state
      showGlobalLoader();
      
      // Récupérer l'ID de session avant de supprimer les données du localStorage
      const sessionId = currentSessionId;
      
      // Supprimer toutes les données d'authentification et de session du localStorage
      const itemsToRemove = [
        'token',
        'refresh_token',
        'user',
        'tokenExpiration',
        'device_id',
        'last_role',
        'session_id'
      ];
      
      itemsToRemove.forEach(item => localStorage.removeItem(item));
      
      // Tenter de faire un appel API pour invalider le token côté serveur
      if (this.isLoggedIn()) {
        try {
          await apiService.post('/api/auth/logout');
        } catch (logoutApiError) {
          // Ignorer les erreurs d'API lors de la déconnexion
        }
      }
      
      // Gestion optimisée du cache et des requêtes React Query
      try {
        const queryClient = getQueryClient();
        if (queryClient) {
          // Arrêter toutes les requêtes en cours
          queryClient.cancelQueries();
          
          // Marquer les données comme périmées sans les supprimer
          queryClient.invalidateQueries();
          
          // Supprimer sélectivement certaines requêtes sensibles
          const sensitivePaths = ['user', 'profile', 'dashboard', 'notifications'];
          sensitivePaths.forEach(path => {
            queryClient.removeQueries({ queryKey: [path] });
          });
          
          // Supprimer les requêtes de la session actuelle
          queryClient.removeQueries({
            predicate: (query) => {
              const key = query.queryKey;
              return Array.isArray(key) && key[0] === 'session' && key[1] === sessionId;
            }
          });
        }
      } catch (cacheError) {
        console.error('Error managing query cache:', cacheError);
      }
      
      // Gestion optimisée du cache API
      try {
        // Invalider sélectivement les caches critiques
        const criticalPaths = ['/me', '/profile', '/dashboard'];
        criticalPaths.forEach(path => {
          apiService.invalidateCache(path);
        });
        
        // Invalider les caches liés au profil et aux documents
        apiService.invalidateProfileCache();
        apiService.invalidateDocumentCache();
        
        // Vider complètement le cache pour s'assurer qu'aucune donnée sensible ne reste
        apiService.clearCache();
      } catch (apiCacheError) {
        console.error('Error managing API cache:', apiCacheError);
      }
      
      // Générer un nouvel identifiant de session pour la prochaine connexion
      currentSessionId = generateSessionId();
      
      // Déclencher les événements de déconnexion
      window.dispatchEvent(new CustomEvent('logout-success', {
        detail: { redirectTo }
      }));
      window.dispatchEvent(new Event('auth-logout-success'));
      
      // Remove loading state after a short delay
      hideGlobalLoader(300);
      
      return true;
    } catch (error) {
      console.error('Error during logout:', error);
      
      // Forcer la suppression de toutes les données même en cas d'erreur
      const itemsToRemove = [
        'token',
        'refresh_token',
        'user',
        'tokenExpiration',
        'device_id',
        'last_role',
        'session_id'
      ];
      
      itemsToRemove.forEach(item => localStorage.removeItem(item));
      
      // Générer un nouvel identifiant de session
      currentSessionId = generateSessionId();
      
      // Émettre les événements de déconnexion
      window.dispatchEvent(new CustomEvent('logout-success', {
        detail: { redirectTo }
      }));
      window.dispatchEvent(new Event('auth-logout-success'));
      
      // Remove loading state on error
      hideGlobalLoader();
      
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
    return !!this.getToken();
  },

  /**
   * Récupère les informations complètes de l'utilisateur connecté depuis l'API
   * @param {boolean} [forceRefresh=false] - Force le rafraîchissement des données depuis l'API
   * @returns {Promise<Object>} - Données complètes de l'utilisateur
   */
  async getCurrentUser(forceRefresh = false) {
    const token = this.getToken();
    if (!token) {
      throw new Error('Aucun token d\'authentification trouvé');
    }

    // Si une promesse est déjà en cours et qu'on ne force pas le rafraîchissement, on la retourne
    if (userDataPromise && !forceRefresh) {
      return userDataPromise;
    }

    // Créer une nouvelle promesse pour charger les données utilisateur
    userDataPromise = new Promise(async (resolve, reject) => {
      try {
        // Utiliser le cache sauf si on force le rafraîchissement
        const options = {
          ...(forceRefresh ? { cache: 'no-store' } : {}),
          timeout: 15000, // Ensure 15s timeout is set
          retries: 3 // Allow up to 3 retries
        };
        
        const response = await apiService.get('/me', { ...apiService.withAuth(), ...options });
        
        // Extraire l'objet utilisateur si la réponse contient un objet "user"
        const userData = response.user || response;
        
        // Stocker les données utilisateur dans le localStorage
        localStorage.setItem('user', JSON.stringify(userData));
        
        // Stocker le rôle principal pour référence
        if (userData.roles && userData.roles.length > 0) {
          localStorage.setItem('last_role', userData.roles[0]);
          
          // IMPORTANT: Also store roles array separately
          localStorage.setItem('userRoles', JSON.stringify(userData.roles));
        }
        
        resolve(userData);
      } catch (error) {
        console.error('Error in getCurrentUser:', error);
        userDataPromise = null; // Réinitialiser la promesse en cas d'erreur
        
        // Try to use cached data if available
        const cachedUser = localStorage.getItem('user');
        if (cachedUser) {
          try {
            const userData = JSON.parse(cachedUser);
            resolve(userData);
            return;
          } catch (e) {
            // Invalid cached data
            localStorage.removeItem('user');
          }
        }
        
        reject(error);
      }
    });

    return userDataPromise;
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
      const response = await apiService.post('/change-password', passwordData, apiService.withAuth());
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Méthode pour déclencher manuellement une mise à jour des rôles
  triggerRoleUpdate: () => {
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
      if (!localStorage.getItem('user')) {
        const minimalUser = {
          id: '1',
          email: 'student@example.com',
          firstName: 'Test',
          lastName: 'Student',
          roles: ['ROLE_STUDENT'] // Always include ROLE_STUDENT
        };
        localStorage.setItem('user', JSON.stringify(minimalUser));
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
  }
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
  const userAgent = navigator.userAgent;
  let deviceType = 'unknown';
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
    deviceName = 'Windows PC';
  } else if (/Macintosh/i.test(userAgent)) {
    deviceType = 'desktop';
    deviceName = 'Mac';
  } else if (/Linux/i.test(userAgent)) {
    deviceType = 'desktop';
    deviceName = 'Linux';
  }
  
  return {
    deviceType,
    deviceName
  };
}

// Fonction pour déclencher manuellement une mise à jour des rôles
export const triggerRoleUpdate = () => {
  window.dispatchEvent(new Event('role-change'));
};

export default authService; 