import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import apiService, { normalizeApiUrl } from '@/lib/services/apiService';

/**
 * Configuration de base pour les requêtes API
 */
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Special endpoints that need custom handling
const SPECIAL_ENDPOINTS = {
  profilePicture: '/api/profile/picture'
};

/**
 * Hook pour effectuer des requêtes GET avec mise en cache
 * @param {string} endpoint - Endpoint de l'API
 * @param {Array|string} queryKey - Clé pour identifier la requête dans le cache
 * @param {Object} options - Options supplémentaires pour useQuery
 * @returns {Object} - Résultat de useQuery
 */
export function useApiQuery(endpoint, queryKey, options = {}) {
  const finalQueryKey = Array.isArray(queryKey) ? queryKey : [queryKey];
  
  // Determine if this is a special endpoint that needs custom handling
  const isProfilePicture = endpoint === SPECIAL_ENDPOINTS.profilePicture;
  
  // Set appropriate options for profile picture queries
  if (isProfilePicture) {
    options.staleTime = 0; // Always consider stale
    options.refetchOnMount = true;
    options.refetchOnWindowFocus = true;
  }
  
  return useQuery({
    queryKey: finalQueryKey,
    queryFn: async () => {
      try {
        // Add timestamp for profile picture to prevent browser caching
        const queryParams = isProfilePicture ? { _t: Date.now() } : {};
        
        // Use the enhanced cache system from apiService
        return await apiService.get(endpoint, { params: queryParams }, true, options.staleTime || 5 * 60 * 1000);
      } catch (error) {
        throw error;
      }
    },
    ...options
  });
}

/**
 * Hook pour effectuer des requêtes POST/PUT/DELETE avec invalidation du cache
 * @param {string} endpoint - Endpoint de l'API
 * @param {string} method - Méthode HTTP (post, put, delete)
 * @param {Array|string} invalidateQueryKey - Clé à invalider après mutation
 * @param {Object} options - Options supplémentaires pour useMutation
 * @returns {Object} - Résultat de useMutation
 */
export function useApiMutation(endpoint, method = 'post', invalidateQueryKey, options = {}) {
  const queryClient = useQueryClient();
  const finalInvalidateKey = Array.isArray(invalidateQueryKey) ? invalidateQueryKey : invalidateQueryKey ? [invalidateQueryKey] : null;
  
  // Determine if this is a profile picture mutation
  const isProfilePicture = endpoint === SPECIAL_ENDPOINTS.profilePicture;
  
  return useMutation({
    mutationFn: async (data) => {
      try {
        // Determine the actual endpoint URL
        let finalEndpoint = endpoint;
        
        // If endpoint is a function, call it with the data to get the dynamic endpoint
        if (typeof endpoint === 'function') {
          finalEndpoint = endpoint(data);
        }
        
        // For DELETE requests with an ID, append the ID to the endpoint if it's a simple value
        if (method.toLowerCase() === 'delete' && typeof data !== 'object' && finalEndpoint === endpoint) {
          finalEndpoint = `${finalEndpoint}/${data}`;
        }
        
        // Add timestamp for profile picture operations to prevent caching issues
        if (isProfilePicture) {
          const timestamp = Date.now();
          if (method.toLowerCase() === 'delete') {
            finalEndpoint = `${finalEndpoint}?_t=${timestamp}`;
          }
        }
        
        // Handle different HTTP methods appropriately
        let response;
        
        if (method.toLowerCase() === 'delete') {
          // Pour les requêtes DELETE
          response = await apiService.delete(finalEndpoint, {
            data: typeof data === 'object' ? data : {}
          });
        } else if (method.toLowerCase() === 'get') {
          // Pour les requêtes GET
          response = await apiService.get(finalEndpoint, { params: data });
        } else if (method.toLowerCase() === 'put') {
          // Pour les requêtes PUT
          response = await apiService.put(finalEndpoint, data);
        } else {
          // Pour les requêtes POST
          response = await apiService.post(finalEndpoint, data);
        }
        
        return response;
      } catch (error) {
        console.error(`Erreur lors de la requête ${method.toUpperCase()} vers ${endpoint}:`, error);
        throw error;
      }
    },
    onSuccess: (data, variables, context) => {
      // Invalider les requêtes associées pour forcer un rafraîchissement
      if (finalInvalidateKey) {
        // For profile picture operations, use a more aggressive invalidation strategy
        if (isProfilePicture) {
          // Invalidate all profile-related queries
          apiService.invalidateProfileCache();
          
          // Invalidate specific keys with immediate refetch
          queryClient.invalidateQueries({ 
            queryKey: finalInvalidateKey,
            refetchType: 'all' // Force refetch even for inactive queries
          });
          
          // Also invalidate any profile-related queries
          queryClient.invalidateQueries({
            predicate: (query) => {
              const key = query.queryKey;
              return Array.isArray(key) && 
                (key.includes('profile') || 
                 key.includes('profilePicture') || 
                 key.includes('currentProfile'));
            },
            refetchType: 'all'
          });
        } else {
          // Standard invalidation for other endpoints
          queryClient.invalidateQueries({ 
            queryKey: finalInvalidateKey,
            refetchType: 'all'
          });
        }
      }
      
      // Appeler onSuccess des options si défini
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    ...options
  });
}

/**
 * Hook pour la pagination infinie
 * @param {string} endpoint - Endpoint de l'API
 * @param {Array|string} queryKey - Clé pour identifier la requête dans le cache
 * @param {Function} getNextPageParam - Fonction pour obtenir le paramètre de la page suivante
 * @param {Object} options - Options supplémentaires pour useInfiniteQuery
 * @returns {Object} - Résultat de useInfiniteQuery
 */
export function useApiInfiniteQuery(endpoint, queryKey, getNextPageParam, options = {}) {
  const finalQueryKey = Array.isArray(queryKey) ? queryKey : [queryKey];
  
  return useInfiniteQuery({
    queryKey: finalQueryKey,
    queryFn: async ({ pageParam }) => {
      try {
        const url = normalizeApiUrl(endpoint);
        const separator = url.includes('?') ? '&' : '?';
        const paginatedUrl = pageParam ? `${endpoint}${separator}${pageParam}` : endpoint;
        
        return await apiService.get(paginatedUrl);
      } catch (error) {
        throw error;
      }
    },
    getNextPageParam,
    ...options
  });
}

/**
 * Hook pour précharger des données dans le cache
 * @param {string} endpoint - Endpoint de l'API
 * @param {Array|string} queryKey - Clé pour identifier la requête dans le cache
 */
export function usePrefetchQuery(endpoint, queryKey) {
  const queryClient = useQueryClient();
  const finalQueryKey = Array.isArray(queryKey) ? queryKey : [queryKey];
  
  const prefetch = async () => {
    try {
      await queryClient.prefetchQuery({
        queryKey: finalQueryKey,
        queryFn: async () => {
          return await apiService.get(endpoint);
        }
      });
    } catch (error) {
      // Silently handle error
    }
  };
  
  return { prefetch };
} 