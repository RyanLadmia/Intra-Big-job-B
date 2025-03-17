import { useState, useRef, useEffect, forwardRef } from 'react';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Loader2, MapPin } from 'lucide-react';

// Custom fallback implementation for SignatureCanvas
const FallbackSignatureCanvas = forwardRef((props, ref) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Initialize canvas
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#000000';
    
    // Clear canvas
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Make sure canvas is responsive
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      canvas.width = parent.clientWidth;
      canvas.height = 200; // Fixed height
      
      // Redraw after resize
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.strokeStyle = '#000000';
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
  
  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    
    // Get coordinates
    let x, y;
    if (e.type === 'mousedown') {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    } else if (e.type === 'touchstart') {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
      e.preventDefault(); // Prevent scrolling
    }
    
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
    setIsEmpty(false);
  };
  
  const draw = (e) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    
    // Get coordinates
    let x, y;
    if (e.type === 'mousemove') {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    } else if (e.type === 'touchmove') {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
      e.preventDefault(); // Prevent scrolling
    }
    
    ctx.lineTo(x, y);
    ctx.stroke();
  };
  
  const endDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      if (props.onEnd) props.onEnd();
    }
  };
  
  // API to match react-signature-canvas
  const clear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setIsEmpty(true);
  };
  
  const toDataURL = () => {
    return canvasRef.current.toDataURL();
  };
  
  // Expose API methods via ref
  useEffect(() => {
    if (ref) {
      ref.current = {
        clear,
        isEmpty: () => isEmpty,
        toDataURL
      };
    }
  }, [isEmpty, ref]);
  
  return (
    <canvas
      ref={canvasRef}
      className="border border-gray-300 rounded-md w-full"
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={endDrawing}
      onMouseLeave={endDrawing}
      onTouchStart={startDrawing}
      onTouchMove={draw}
      onTouchEnd={endDrawing}
      style={{ touchAction: 'none' }} // Prevent touch scrolling
    />
  );
});

// Main component
const DocumentSignature = () => {
  const [location, setLocation] = useState(null);
  const [isLocating, setIsLocating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [currentPeriod, setCurrentPeriod] = useState(null);
  const [signedPeriods, setSignedPeriods] = useState([]);
  const [availablePeriods, setAvailablePeriods] = useState({});
  const signatureRef = useRef(null);
  
  // Check today's signatures when component mounts
  useEffect(() => {
    const checkTodaySignatures = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const response = await fetch('http://localhost:8000/api/signatures/today', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Error response:', errorData);
          toast.error("Erreur", {
            description: errorData.message || "Une erreur est survenue lors de la vérification des signatures."
          });
          return;
        }

        const data = await response.json();
        console.log('Signature data:', data); // Debug log
        setCurrentPeriod(data.currentPeriod);
        setSignedPeriods(data.signedPeriods);
        setAvailablePeriods(data.availablePeriods);
      } catch (error) {
        console.error('Error checking today\'s signatures:', error);
        toast.error("Erreur", {
          description: "Impossible de vérifier les signatures. Veuillez réessayer."
        });
      }
    };

    checkTodaySignatures();
    getLocation();
  }, []);
  
  // Get user's location
  const getLocation = () => {
    setIsLocating(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const locationString = `${position.coords.latitude},${position.coords.longitude}`;
          console.log("Location detected:", locationString);
          setLocation(locationString);
          setIsLocating(false);
          
          toast.success("Localisation détectée", {
            description: "Votre position a été détectée avec succès."
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          setIsLocating(false);
          
          let errorMessage = "Impossible d'obtenir votre position.";
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = "L'accès à la géolocalisation a été refusé. Veuillez autoriser l'accès dans les paramètres de votre navigateur.";
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = "Les informations de localisation ne sont pas disponibles.";
              break;
            case error.TIMEOUT:
              errorMessage = "La requête de localisation a expiré. Veuillez réessayer.";
              break;
            default:
              errorMessage = `Une erreur est survenue: ${error.message}`;
          }
          
          toast.error("Erreur de localisation", {
            description: errorMessage
          });
        },
        { 
          enableHighAccuracy: false, // Changed to false for better reliability
          timeout: 30000,           // Increased timeout to 30 seconds
          maximumAge: 300000        // Allow cached positions up to 5 minutes old
        }
      );
    } else {
      setIsLocating(false);
      toast.error("Localisation non supportée", {
        description: "Votre navigateur ne supporte pas la géolocalisation."
      });
    }
  };
  
  // Clear signature
  const clearSignature = () => {
    if (signatureRef.current) {
      signatureRef.current.clear();
    }
  };
  
  // Submit signature
  const submitSignature = async () => {
    if (!location) {
      toast.error("Erreur", {
        description: "La localisation est requise. Veuillez autoriser l'accès à votre position."
      });
      return;
    }

    if (!signatureRef.current || signatureRef.current.isEmpty()) {
      toast.error("Erreur", {
        description: "Veuillez signer avant de soumettre."
      });
      return;
    }

    if (!currentPeriod) {
      toast.error("Erreur", {
        description: "Les signatures ne sont autorisées qu'entre 9h-12h (matin) et 13h-17h (après-midi)."
      });
      return;
    }

    if (signedPeriods.includes(currentPeriod)) {
      toast.error("Erreur", {
        description: `Vous avez déjà signé pour la période ${availablePeriods[currentPeriod]} aujourd'hui.`
      });
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Get signature data URL (but don't send it to the backend for now)
      const signatureData = signatureRef.current.toDataURL();
      console.log(`Signature data size: ${signatureData.length} characters`);
      
      // Prepare the request data
      const requestData = {
        location,
      };
      
      console.log('Sending signature request with data:', requestData);
      
      // Get the token from localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token not found');
      }

      // Send the actual API request to the backend
      console.log('Sending actual API request to backend');
      
      try {
        // Use the direct backend URL
        const response = await fetch('http://localhost:8000/api/signatures', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(requestData)
        });
        
        console.log('API Response status:', response.status);
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to create signature');
        }
        
        const data = await response.json();
        console.log('Signature created successfully:', data);
        
        // Update local state
        setSignedPeriods([...signedPeriods, currentPeriod]);
        setSubmissionSuccess(true);
        
        // Clear the signature
        clearSignature();
        
        // Show success message
        toast.success("Succès", {
          description: `Signature enregistrée pour la période ${availablePeriods[currentPeriod]}.`
        });
        
        // Close the popup after a delay
        setTimeout(() => {
          if (window.closeAttendancePopup) {
            window.closeAttendancePopup();
          }
        }, 2000);
        
      } catch (error) {
        console.error('API request failed:', error);
        toast.error("Erreur", {
          description: error.message || "Une erreur est survenue lors de l'envoi de la signature."
        });
      }
    } catch (error) {
      console.error('Error submitting signature:', error);
      toast.error("Erreur", {
        description: "Une erreur est survenue lors de la soumission de la signature."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isButtonDisabled = () => {
    if (isSubmitting) return true;
    if (!location) return true;
    if (!signatureRef.current || signatureRef.current.isEmpty()) return true;
    if (signedPeriods.includes(currentPeriod)) return true;
    return false;
  };

  const getButtonText = () => {
    if (isSubmitting) return "Envoi en cours...";
    if (!location) return "Localisation requise";
    if (!signatureRef.current || signatureRef.current.isEmpty()) return "Signature requise";
    if (signedPeriods.includes(currentPeriod)) return "Déjà signé pour cette période";
    if (!currentPeriod) return "Hors période";
    return "Signer";
  };

  return (
    <div className="space-y-4">
      <div className="border rounded-md p-4 bg-gray-50 dark:bg-gray-900">
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
          {currentPeriod ? (
            `Signez ci-dessous pour confirmer votre présence pour la période ${availablePeriods[currentPeriod]}`
          ) : (
            "Les signatures ne sont autorisées qu'entre 9h-12h (matin) et 13h-17h (après-midi)."
          )}
        </p>
        
        {/* Use our fallback canvas implementation with proper ref forwarding */}
        <FallbackSignatureCanvas ref={signatureRef} onEnd={() => console.log("Signature completed")} />
        
        <div className="flex justify-between mt-4">
          <Button 
            variant="outline" 
            onClick={clearSignature}
            disabled={isButtonDisabled()}
          >
            Effacer
          </Button>
          
          <Button 
            onClick={submitSignature}
            disabled={isButtonDisabled()}
          >
            {getButtonText()}
          </Button>
        </div>
      </div>
      
      {/* Location status */}
      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
        <MapPin className="h-4 w-4 mr-2" />
        {isLocating ? (
          "Détection de la localisation..."
        ) : location ? (
          "Localisation détectée"
        ) : (
          "Localisation non disponible"
        )}
      </div>
    </div>
  );
};

export default DocumentSignature;
