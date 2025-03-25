import axios from 'axios';

// Import the low performance mode detection from loadingUtils
import { setLowPerformanceMode } from '../utils/loadingUtils';

// Système de verrouillage pour éviter les requêtes en parallèle
const pendingRequests = new Map();

// Détection des performances de l'appareil
function detectDevicePerformance() {
  // Si déjà détecté, utiliser la valeur en cache
  if (window._devicePerformanceScore !== undefined) {
    return window._devicePerformanceScore;
  }
  
  try {
    const startTime = performance.now();
    
    // Test simple de performance - calcul intense
    let result = 0;
    for (let i = 0; i < 100000; i++) {
      result += Math.sqrt(i);
    }
    
    const endTime = performance.now();
    const executionTime = endTime - startTime;
    
    // Score basé sur le temps d'exécution (0-100)
    // Plus bas = meilleure performance
    const performanceScore = Math.min(100, Math.max(0, executionTime / 10));
    
    // Stocker le score pour la session
    window._devicePerformanceScore = performanceScore;
    
    // Définir également le mode performance basse si nécessaire
    if (performanceScore > 70) {
      setLowPerformanceMode(true);
    }
    
    return performanceScore;
  } catch (e) {
    return 50; // Score moyen par défaut
  }
}

// Calculer les timeouts adaptatifs en fonction de la performance du dispositif
function getAdaptiveTimeout(baseTimeout, isImportant = false) {
  const performanceScore = detectDevicePerformance();
  
  // Pour les requêtes importantes, limiter l'augmentation du timeout
  const multiplier = isImportant ? 
    Math.max(1, 1 + (performanceScore / 100)) : // Max 2x pour importantes
    Math.max(1, 1.5 + (performanceScore / 50));  // Max 3.5x pour non-importantes
  
  return Math.round(baseTimeout * multiplier);
}

// Determine if we're in low performance mode
const isLowPerformanceMode = () => {
  // Run the performance detection on first call
  if (window._devicePerformanceScore === undefined) {
    detectDevicePerformance();
  }
  return localStorage.getItem('preferLowPerformanceMode') === 'true' || window._devicePerformanceScore > 70;
};

// Configure default timeouts based on performance mode
const getDefaultTimeout = (isProfileRequest = false) => {
  const lowPerformance = isLowPerformanceMode();
  
  if (isProfileRequest) {
    return lowPerformance ? 3000 : 2000; // Increase timeout for profile requests on low-perf devices
  }
  
  return lowPerformance ? 15000 : 30000; // Shorter timeout for low-perf devices to avoid hanging
};

// Configure des intercepteurs pour logger les requêtes et réponses
axios.interceptors.request.use(request => {
  // Ne pas afficher les informations sensibles comme les mots de passe
  const requestData = { ...request.data };
  if (requestData.password) {
    requestData.password = '********';
  }
  
  // Identifier les requêtes d'authentification
  let isAuthRequest = false;
  if (request.url) {
    isAuthRequest = request.url.includes('/login_check') || 
                   request.url.includes('/token/refresh') ||
                   request.url.includes('/token/revoke');
  }
  
  // Set default timeout based on performance mode
  if (!request.timeout) {
    const isProfileRequest = request.url && (request.url.includes('/profile/') || request.url.includes('/me'));
    request.timeout = getDefaultTimeout(isProfileRequest);
  }
  
  // Ajouter les credentials et les headers CORS
  request.withCredentials = true;
  
  // Récupérer le token depuis le localStorage si disponible
  const token = localStorage.getItem('token');
  if (token) {
    request.headers['Authorization'] = `Bearer ${token}`;
  }
  
  return request;
}, error => {
  return Promise.reject(error);
});

axios.interceptors.response.use(response => {
  // Identifier les réponses d'authentification
  let isAuthResponse = false;
  if (response.config?.url) {
    isAuthResponse = response.config.url.includes('/login_check') || 
                    response.config.url.includes('/token/refresh') ||
                    response.config.url.includes('/token/revoke');
  }
  
  return response;
}, error => {
  return Promise.reject(error);
});

// Configuration de base pour axios
axios.defaults.withCredentials = true;
axios.defaults.timeout = 15000; // Augmenter le délai d'attente global à 15 secondes

// Create a simple in-memory request cache with expiration
const apiCache = new Map();
const DEFAULT_CACHE_TTL = isLowPerformanceMode() ? 120000 : 60000; // 2 minutes for low-perf, 1 minute otherwise

// Add cache size limits for memory management
const MAX_CACHE_SIZE = isLowPerformanceMode() ? 50 : 100; // Fewer items for low-perf devices

// Add cache cleanup function
const cleanupCache = () => {
  if (apiCache.size <= MAX_CACHE_SIZE) return;
  
  // Convert to array for sorting
  const entries = Array.from(apiCache.entries());
  
  // Sort by expiry (oldest first)
  entries.sort((a, b) => a[1].expiry - b[1].expiry);
  
  // Remove oldest entries until we're under the limit
  const toRemove = entries.slice(0, entries.length - MAX_CACHE_SIZE);
  toRemove.forEach(([key]) => apiCache.delete(key));
};

/**
 * Normalise une URL d'API en gérant les doublons de "/api"
 * @param {string} path - Le chemin de l'API
 * @returns {string} - L'URL complète normalisée
 */
export const normalizeApiUrl = (path) => {
  // Handle null or undefined paths
  if (!path) return '/api';
  
  // Remove trailing slashes for consistency
  const trimmedPath = path.replace(/\/+$/, '');
  
  // If the path starts with http:// or https://, it's an absolute URL - return it as is
  if (trimmedPath.match(/^https?:\/\//)) {
    return trimmedPath;
  }
  
  // Check if the path already has the /api prefix
  if (trimmedPath.startsWith('/api/')) {
    return trimmedPath;
  }
  
  // Simplify handling of the /api prefix
  // Add /api prefix if it's not already there
  if (trimmedPath.startsWith('/')) {
    return `/api${trimmedPath}`;
  } else {
    return `/api/${trimmedPath}`;
  }
};

/**
 * Generates a cache key for a request
 * @param {string} method - HTTP method
 * @param {string} url - Request URL
 * @param {Object} params - Query parameters
 * @returns {string} - Cache key
 */
export const generateCacheKey = (method, url, params = {}) => {
  return `${method}:${url}:${JSON.stringify(params)}`;
};

/**
 * Service d'API pour gérer les appels centralisés
 */
const apiService = {
  /**
   * Effectue une requête GET
   * @param {string} path - Chemin de l'API
   * @param {Object} options - Options de la requête (headers, params, etc.)
   * @returns {Promise<Object>} - Réponse de l'API
   */
  async get(path, options = {}) {
    try {
      const url = normalizeApiUrl(path);
      
      // Générer une clé unique pour cette requête
      const requestKey = `${path}${JSON.stringify(options.params || {})}`;
      
      // Vérifier si une requête identique est déjà en cours
      if (pendingRequests.has(requestKey)) {
        return pendingRequests.get(requestKey);
      }
      
      // Check for in-memory cache if caching is not disabled
      if (!options.noCache) {
        const cacheKey = generateCacheKey('GET', url, options.params);
        const cached = apiCache.get(cacheKey);
        
        if (cached && cached.expiry > Date.now()) {
          return cached.data;
        }
      }
      
      // Identifier le type de requête pour optimiser les timeouts
      const isProfileRequest = path.includes('/profile') || path.includes('/me');
      const isMessagesRequest = path.includes('/messages');
      const isCriticalRequest = path.includes('/auth') || options.critical === true;
      
      // Définir les timeouts de base selon le type de requête
      const baseTimeout = isProfileRequest ? 3000 : 
                          isMessagesRequest ? 5000 : 
                          isCriticalRequest ? 8000 : 10000;
      
      // Appliquer le timeout adaptatif en fonction des performances de l'appareil
      const adaptiveTimeout = options.timeout || getAdaptiveTimeout(baseTimeout, isCriticalRequest);
      
      // Configure axios request with appropriate timeouts
      const requestConfig = {
        ...options,
        timeout: adaptiveTimeout
      };
      
      // Implement retries for profile and messages requests
      const maxRetries = options.retries !== undefined ? Math.min(options.retries, 2) : 
                         (isProfileRequest || isMessagesRequest) ? 1 : 0;
      
      // Créer une promesse pour cette requête
      const requestPromise = (async () => {
        let retries = 0;
        let lastError = null;
        
        // Utiliser une boucle while au lieu d'une récursion pour éviter des problèmes de pile
        while (retries <= maxRetries) {
          try {
            const response = await axios.get(url, requestConfig);
            
            // Si success, mettre en cache si le caching n'est pas désactivé
            if (!options.noCache) {
              const cacheKey = generateCacheKey('GET', url, options.params);
              const ttl = options.cacheDuration || DEFAULT_CACHE_TTL;
              apiCache.set(cacheKey, {
                data: response.data,
                expiry: Date.now() + ttl
              });
              cleanupCache();
            }
            
            return response.data;
          } catch (error) {
            lastError = error;
            
            // Ne pas retenter si c'est une erreur 4xx (sauf timeout)
            if (error.response && error.response.status >= 400 && error.response.status < 500) {
              break;
            }
            
            // Attendre avant de réessayer avec backoff exponentiel
            if (retries < maxRetries) {
              const backoffDelay = Math.min(1000 * Math.pow(2, retries), 8000);
              await new Promise(resolve => setTimeout(resolve, backoffDelay));
              retries++;
            } else {
              break;
            }
          }
        }
        
        // Toutes les tentatives ont échoué
        throw lastError;
      })();
      
      // Enregistrer cette promesse
      pendingRequests.set(requestKey, requestPromise);
      
      try {
        return await requestPromise;
      } finally {
        // Libérer le verrou quand la requête est terminée
        pendingRequests.delete(requestKey);
      }
    } catch (error) {
      throw error;
    }
  },
  
  /**
   * Effectue une requête POST
   * @param {string} path - Chemin de l'API
   * @param {Object} data - Données à envoyer
   * @param {Object} options - Options de la requête (headers, etc.)
   * @returns {Promise<Object>} - Réponse de l'API
   */
  async post(path, data = {}, options = {}) {
    try {
      const url = normalizeApiUrl(path);
      const response = await axios.post(url, data, options);
      return response.data;
    } catch (error) {
      // Pour login_check, on ne doit PAS transformer l'erreur, mais la rejeter
      // afin que le composant d'authentification puisse la traiter correctement
      if (path.includes('login_check')) {
        throw error;
      }
      
      // Gestion spécifique des erreurs CORS
      if (error.message && error.message.includes('Network Error')) {
        return { success: false, message: 'Erreur de communication avec le serveur' };
      }
      
      // Retourner une réponse formatée en cas d'erreur pour éviter les crashes
      if (error.response && error.response.data) {
        return { success: false, message: error.response.data.message || 'Une erreur est survenue' };
      }
      
      return { success: false, message: 'Une erreur est survenue' };
    }
  },
  
  /**
   * Effectue une requête PUT
   * @param {string} path - Chemin de l'API
   * @param {Object} data - Données à envoyer
   * @param {Object} options - Options de la requête (headers, etc.)
   * @returns {Promise<Object>} - Réponse de l'API
   */
  async put(path, data = {}, options = {}) {
    try {
      const url = normalizeApiUrl(path);
      const response = await axios.put(url, data, options);
      return response.data;
    } catch (error) {
      // Gestion spécifique des erreurs CORS
      if (error.message && error.message.includes('Network Error')) {
        return { success: false, message: 'Erreur de communication avec le serveur' };
      }
      
      // Retourner une réponse formatée en cas d'erreur pour éviter les crashes
      if (error.response && error.response.data) {
        return { success: false, message: error.response.data.message || 'Une erreur est survenue' };
      }
      
      return { success: false, message: 'Une erreur est survenue' };
    }
  },
  
  /**
   * Effectue une requête DELETE
   * @param {string} path - Chemin de l'API
   * @param {Object} options - Options de la requête (headers, etc.)
   * @returns {Promise<Object>} - Réponse de l'API
   */
  async delete(path, options = {}) {
    try {
      const response = await axios.delete(normalizeApiUrl(path), options);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  /**
   * Fonctions spécifiques pour la gestion des rôles utilisateurs
   */
  async getUsersByRole(roleName) {
    // S'assurer que le rôle est au format correct (avec le préfixe ROLE_)
    const formattedRoleName = roleName.startsWith('ROLE_') 
      ? roleName 
      : `ROLE_${roleName.replace('ROLE_', '')}`;
    
    console.log(`ApiService: Récupération des utilisateurs avec le rôle ${formattedRoleName}`);
    
    try {
      // Essayons d'abord avec la méthode /api/users-by-role endpoint
      return await this.get(`/users-by-role/${formattedRoleName}`);
    } catch (error) {
      console.warn(`L'API /users-by-role/${formattedRoleName} a échoué, tentative avec /users`);
      
      // Si ça échoue, récupérons tous les utilisateurs et filtrons côté client
      const response = await this.get('/users');
      
      if (response.success && response.data) {
        // Filtrer manuellement les utilisateurs par rôle
        const filteredUsers = response.data.filter(user => 
          user.roles && user.roles.some(role => 
            role.name === formattedRoleName || 
            role.name === formattedRoleName.replace('ROLE_', '') ||
            'ROLE_' + role.name === formattedRoleName
          )
        );
        
        // Retourner dans le même format que l'API
        return {
          success: true,
          data: filteredUsers
        };
      }
      
      return response;
    }
  },
  
  async getAllRoles() {
    try {
      // Tenter d'obtenir les rôles depuis l'API
      return await this.get('/user-roles/roles');
    } catch (error) {
      console.warn("Erreur lors de la récupération des rôles depuis l'API, utilisation des rôles prédéfinis", error);
      
      // Retourner des rôles par défaut en cas d'erreur
      return {
        success: true,
        data: [
          { id: 1, name: "ROLE_SUPERADMIN", description: "Super Administrateur" },
          { id: 2, name: "ROLE_ADMIN", description: "Administrateur" },
          { id: 3, name: "ROLE_TEACHER", description: "Formateur" },
          { id: 4, name: "ROLE_STUDENT", description: "Étudiant" },
          { id: 5, name: "ROLE_HR", description: "Ressources Humaines" },
          { id: 6, name: "ROLE_RECRUITER", description: "Recruteur" },
          { id: 7, name: "ROLE_GUEST", description: "Invité" }
        ]
      };
    }
  },
  
  /**
   * Change a user's role (for admins, superadmins, and recruiters)
   * @param {number} userId - The user's ID
   * @param {string} oldRoleName - The user's current role name
   * @param {string} newRoleName - The new role name to assign
   * @returns {Promise<Object>} - API response
   */
  async changeUserRole(userId, oldRoleName, newRoleName) {
    return this.post('/user-roles/change-role', {
      userId,
      oldRoleName,
      newRoleName
    });
  },
  
  /**
   * Update user information
   * @param {number} userId - The user's ID
   * @param {Object} userData - User data to update (firstName, lastName, email, phoneNumber, birthDate, roles, etc.)
   * @returns {Promise<Object>} - API response
   */
  async updateUser(userId, userData) {
    return this.put(`/users/${userId}`, userData);
  },
  
  /**
   * Ajoute le token d'authentification aux headers
   * @param {Object} options - Options de la requête
   * @returns {Object} - Options avec le header d'authentification ajouté
   */
  withAuth(options = {}) {
    const token = localStorage.getItem('token');
    if (!token) {
      return options;
    }
    
    return {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`
      }
    };
  },

  /**
   * Invalide le cache pour un chemin spécifique
   * @param {string} path - Chemin de l'API à invalider
   */
  invalidateCache(path) {
    // Logique d'invalidation du cache pour un chemin spécifique
    // Ici, on pourrait implémenter une logique avec localStorage ou IndexedDB si nécessaire
  },

  /**
   * Invalide le cache lié au profil utilisateur
   */
  invalidateProfileCache() {
    // Logique d'invalidation du cache spécifique au profil
    this.invalidateCache('/profile');
    this.invalidateCache('/api/me');
  },

  /**
   * Invalide le cache lié aux documents
   */
  invalidateDocumentCache() {
    // Logique d'invalidation du cache spécifique aux documents
    this.invalidateCache('/documents');
  },

  /**
   * Vide complètement le cache API
   */
  clearCache() {
    // Clear in-memory cache - much faster than localStorage operations
    apiCache.clear();
    
    // Only clear critical localStorage items, not everything
    const criticalKeys = [
      'token', 
      'refresh_token',
      'user',
      'userRoles'
    ];
    
    // Remove only the critical keys
    criticalKeys.forEach(key => {
      try {
        if (localStorage.getItem(key)) {
          localStorage.removeItem(key);
        }
      } catch (e) {
        // Silent error handling
      }
    });
    
    // Notify the application that the cache has been cleared
    window.dispatchEvent(new Event('api-cache-cleared'));
  },
  
  /**
   * Invalidate a specific cache entry
   * @param {string} method - The HTTP method
   * @param {string} path - The API path
   * @param {Object} params - Query parameters if any
   */
  invalidateCacheEntry(method, path, params = {}) {
    const url = normalizeApiUrl(path);
    const cacheKey = generateCacheKey(method, url, params);
    apiCache.delete(cacheKey);
  }
};

export default apiService; 