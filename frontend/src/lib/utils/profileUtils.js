/**
 * Utility functions for profile-related operations
 */

/**
 * Generates a complete URL for a profile picture path
 * @param {string|null} picturePath - The profile picture path from the API
 * @param {number|null} userId - The ID of the user whose profile picture we're getting
 * @returns {string|null} - The complete URL or null if no path is provided
 */
export const getProfilePictureUrl = (picturePath, userId = null) => {
  if (!picturePath) {
    return null;
  }
  
  // If the path already starts with http, it's already a complete URL
  if (picturePath.startsWith('http')) {
    return picturePath;
  }
  
  // Get the API base URL from environment variables
  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
  const apiBaseUrl = baseUrl.replace(/\/api$/, ''); // Remove /api if it exists at the end
  
  // If we have a userId and the path doesn't include it, add it to the path
  if (userId && !picturePath.includes(`profile_${userId}_`)) {
    const pathParts = picturePath.split('/');
    const fileName = pathParts[pathParts.length - 1];
    picturePath = `profile_pictures/profile_${userId}_${fileName}`;
  }
  
  // If the path is just a filename (no slashes or backslashes)
  if (!picturePath.includes('/') && !picturePath.includes('\\')) {
    // Try different possible locations
    const possibleUrls = [
      `${apiBaseUrl}/uploads/documents/${picturePath}`,
      `${apiBaseUrl}/uploads/profile-pictures/${picturePath}`,
      `${apiBaseUrl}/uploads/${picturePath}`
    ];
    
    return possibleUrls[0];
  }
  
  // Handle local file paths (which might be absolute paths)
  if (picturePath.includes('/var/www/') || picturePath.includes('C:\\') || picturePath.includes('/public/uploads/')) {
    let relativePath;
    
    if (picturePath.includes('/public/uploads/')) {
      relativePath = picturePath.split('/public/')[1];
    } else if (picturePath.includes('/var/www/')) {
      const parts = picturePath.split('/var/www/');
      const afterVarWww = parts[1];
      const pathParts = afterVarWww.split('/');
      relativePath = pathParts.slice(1).join('/');
    } else {
      const parts = picturePath.split('\\');
      const uploadsIndex = parts.findIndex(part => part === 'uploads');
      if (uploadsIndex !== -1) {
        relativePath = 'uploads/' + parts.slice(uploadsIndex + 1).join('/');
      } else {
        relativePath = 'uploads/' + parts[parts.length - 1];
      }
    }
    
    return `${apiBaseUrl}/${relativePath}`;
  }
  
  // Ensure the path starts with a slash
  const normalizedPath = picturePath.startsWith('/') ? picturePath : `/${picturePath}`;
  
  // If the path includes 'uploads', it's likely a file path
  if (normalizedPath.includes('uploads')) {
    return `${apiBaseUrl}${normalizedPath}`;
  }
  
  // If the path doesn't include 'uploads', it might be a relative path to the API
  return `${apiBaseUrl}/uploads/${normalizedPath}`;
};

/**
 * Gets the initials from a user's first and last name
 * @param {Object} user - The user object with firstName and lastName properties
 * @returns {string} - The user's initials
 */
export const getUserInitials = (user) => {
  if (!user) return '';
  
  const firstName = user.firstName || '';
  const lastName = user.lastName || '';
  
  return `${firstName.charAt(0)}${lastName.charAt(0)}`;
};

import { studentProfileService } from "../services/studentProfileService";

// Fonction pour synchroniser la mise à jour du portfolio dans l'application
export const synchronizePortfolioUpdate = (portfolioUrl) => {
  console.log("profileUtils: Synchronizing portfolio update:", portfolioUrl);
  
  // Dispatcher un événement personnalisé pour notifier tous les composants
  const event = new CustomEvent('portfolio-updated', {
    detail: { portfolioUrl }
  });
  
  window.dispatchEvent(event);
  
  // Également dispatcher un événement plus général de mise à jour de profil
  // pour compatibilité avec d'autres écouteurs
  const profileEvent = new CustomEvent('profile-updated', {
    detail: { 
      type: 'portfolio',
      portfolioUrl
    }
  });
  
  window.dispatchEvent(profileEvent);
  
  // Mettre à jour le stockage local
  try {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      if (userData && typeof userData === 'object') {
        // Si le profil étudiant existe
        if (userData.studentProfile) {
          userData.studentProfile.portfolioUrl = portfolioUrl;
        } else if (!userData.studentProfile && userData.roles) {
          // Créer un profil étudiant si l'utilisateur est un étudiant
          const isStudent = Array.isArray(userData.roles) && userData.roles.some(role => 
            (typeof role === 'string' && role.includes('STUDENT')) || 
            (typeof role === 'object' && role.name && role.name.includes('STUDENT'))
          );
          
          if (isStudent) {
            userData.studentProfile = {
              portfolioUrl: portfolioUrl
            };
          }
        }
        
        // Mettre à jour le stockage local
        localStorage.setItem('user', JSON.stringify(userData));
      }
    }
    
    // Faire la même chose pour le sessionStorage
    const sessionUser = sessionStorage.getItem('user');
    if (sessionUser) {
      const userData = JSON.parse(sessionUser);
      if (userData && typeof userData === 'object') {
        if (userData.studentProfile) {
          userData.studentProfile.portfolioUrl = portfolioUrl;
        } else if (!userData.studentProfile && userData.roles) {
          const isStudent = Array.isArray(userData.roles) && userData.roles.some(role => 
            (typeof role === 'string' && role.includes('STUDENT')) || 
            (typeof role === 'object' && role.name && role.name.includes('STUDENT'))
          );
          
          if (isStudent) {
            userData.studentProfile = {
              portfolioUrl: portfolioUrl
            };
          }
        }
        
        sessionStorage.setItem('user', JSON.stringify(userData));
      }
    }
  } catch (error) {
    console.warn("profileUtils: Error updating local storage:", error);
  }
  
  // Forcer l'invalidation du cache du service
  studentProfileService.clearCache();
};

// Ajouter un gestionnaire d'écouteur pour les mises à jour de portfolio
export const addPortfolioUpdateListener = (callback) => {
  const handler = (event) => {
    if (event.detail && event.detail.portfolioUrl !== undefined) {
      callback(event.detail.portfolioUrl);
    }
  };
  
  window.addEventListener('portfolio-updated', handler);
  
  // Renvoyer une fonction de nettoyage pour React useEffect
  return () => {
    window.removeEventListener('portfolio-updated', handler);
  };
}; 