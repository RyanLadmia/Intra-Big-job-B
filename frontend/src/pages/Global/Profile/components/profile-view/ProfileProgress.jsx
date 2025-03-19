import React, { useState, useEffect, useMemo, useContext } from "react";
import { CheckCircle2, XCircle, InfoIcon, ExternalLinkIcon, PieChart, RefreshCw } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ProfileContext } from "@/components/MainLayout";
import { motion, AnimatePresence } from "framer-motion";

const ProfileProgress = ({ userData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { refreshProfileData, isProfileLoading, profileData } = useContext(ProfileContext);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const navigate = useNavigate();
  // État pour déterminer si la popup doit s'afficher vers le haut ou le bas
  const [popupDirection, setPopupDirection] = useState("up");
  // Toujours utiliser les données les plus récentes disponibles
  const [localUserData, setLocalUserData] = useState(userData || profileData);
  
  // Référence pour stocker la dernière valeur de profileData pour comparaison
  const [lastProfileData, setLastProfileData] = useState(null);

  // Déterminer la direction de la popup en fonction de la position sur l'écran
  useEffect(() => {
    const handleResize = () => {
      // Si la hauteur de la fenêtre est inférieure à 600px, on affiche vers le haut
      // pour éviter que la popup soit masquée par la navbar
      const shouldShowUp = window.innerHeight < 600;
      setPopupDirection(shouldShowUp ? "up" : "down");
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Mettre à jour les données locales lorsque userData change
  useEffect(() => {
    if (userData && !isRefreshing) {
      setLocalUserData(userData);
    }
  }, [userData, isRefreshing]);

  // Mettre à jour les données locales lorsque profileData change
  useEffect(() => {
    // Si profileData a changé depuis la dernière fois
    if (profileData && JSON.stringify(profileData) !== JSON.stringify(lastProfileData)) {
      setLocalUserData(profileData);
      setLastProfileData(profileData);
      
      // Si nous étions en train de rafraîchir, terminer le rafraîchissement
      if (isRefreshing) {
        setIsRefreshing(false);
      }
    }
  }, [profileData, isRefreshing, lastProfileData]);

  // Mécanisme de secours pour s'assurer que l'état de chargement ne reste pas bloqué
  useEffect(() => {
    let timeoutId;
    if (isRefreshing) {
      // Après 3 secondes, forcer la fin du rafraîchissement si toujours en cours
      timeoutId = setTimeout(() => {
        setIsRefreshing(false);
        // Utiliser les dernières données disponibles
        if (profileData) {
          setLocalUserData(profileData);
        }
      }, 3000);
    }
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isRefreshing, profileData]);

  // Calculer les éléments complétés à partir des données locales
  const { completedItems, completionItems } = useMemo(() => {
    if (!localUserData) {
      return { completedItems: 0, completionItems: [] };
    }

    const hasLinkedIn = Boolean(localUserData?.user?.linkedinUrl);
    const hasCv = Boolean(localUserData?.documents?.some(doc => doc?.documentType?.code === 'CV' || doc?.type === 'CV'));
    const hasDiploma = Boolean(localUserData?.diplomas?.length > 0);
    
    const items = [
      { 
        name: 'LinkedIn', 
        completed: hasLinkedIn,
        description: "Votre profil LinkedIn permet aux recruteurs de mieux vous connaître.",
        action: "/settings/profile",
        icon: ExternalLinkIcon
      },
      { 
        name: 'CV', 
        completed: hasCv,
        description: "Votre CV est essentiel pour présenter votre parcours.",
        action: "/settings/career",
        icon: ExternalLinkIcon
      },
      { 
        name: 'Diplôme', 
        completed: hasDiploma,
        description: "Vos diplômes certifient vos qualifications.",
        action: "/settings/career",
        icon: ExternalLinkIcon
      }
    ].sort((a, b) => {
      if (a.completed && !b.completed) return -1;
      if (!a.completed && b.completed) return 1;
      return 0;
    });

    const completed = [hasLinkedIn, hasCv, hasDiploma].filter(Boolean).length;

    return { completedItems: completed, completionItems: items };
  }, [localUserData]);

  // Fonction pour rafraîchir manuellement les données
  const handleRefresh = async () => {
    if (isRefreshing || isProfileLoading) return;
    
    setIsRefreshing(true);
    try {
      const newData = await refreshProfileData();
      // Mettre à jour directement les données locales si refreshProfileData renvoie des données
      if (newData) {
        setLocalUserData(newData);
        setLastProfileData(newData);
        setIsRefreshing(false);
      }
      // Sinon, l'useEffect qui surveille profileData s'en chargera
    } catch (error) {
      setIsRefreshing(false);
    }
  };

  // Fonction pour naviguer vers une page
  const handleNavigate = (path) => {
    setIsOpen(false); // Fermer la popup
    navigate(path);
  };

  // Si aucune donnée n'est disponible, afficher un état de chargement au lieu de rien
  if (!localUserData) {
    return (
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed right-8 bottom-8 z-20 flex items-center gap-2 px-4 py-3 rounded-full shadow-lg bg-primary text-primary-foreground hover:bg-primary/90"
      >
        <PieChart className="w-5 h-5" />
        <span className="font-medium">Chargement...</span>
      </motion.button>
    );
  }

  const percentage = Math.round((completedItems / 3) * 100);

  // Déterminer la couleur de la barre de progression en fonction du pourcentage
  const getProgressColor = () => {
    if (percentage === 100) return "from-emerald-500 to-emerald-400";
    if (percentage >= 66) return "from-blue-500 to-blue-400";
    if (percentage >= 33) return "from-amber-500 to-amber-400";
    return "from-red-500 to-red-400";
  };

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`fixed right-8 bottom-8 z-20 flex items-center gap-2 px-4 py-3 rounded-full shadow-lg transition-colors duration-300 ${
          isOpen 
            ? 'bg-background text-foreground hover:bg-muted' 
            : percentage === 100 
              ? 'bg-emerald-500 text-white hover:bg-emerald-600' 
              : 'bg-primary text-primary-foreground hover:bg-primary/90'
        }`}
      >
        <PieChart className="w-5 h-5" />
        <span className="font-medium">
          {completedItems === 3 
            ? "Profil complet ✨" 
            : `${3 - completedItems} élément${3 - completedItems > 1 ? 's' : ''} à compléter`}
        </span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className={`fixed right-8 ${
              popupDirection === "up" ? "bottom-24" : "top-20"
            } w-80 sm:w-96 z-50 max-h-[min(600px,80vh)] overflow-y-auto`}
            initial={{ opacity: 0, y: popupDirection === "up" ? 10 : -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: popupDirection === "up" ? 10 : -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="bg-background/95 backdrop-blur-lg rounded-xl shadow-lg border border-border/10 overflow-hidden">
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-medium text-foreground">Complétude du profil</h3>
                    <Popover>
                      <PopoverTrigger asChild>
                        <button className="inline-flex items-center justify-center rounded-full w-4 h-4 text-muted-foreground hover:text-primary transition-colors">
                          <InfoIcon className="w-3 h-3" />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-64 p-3" align="end">
                        <p className="text-xs text-muted-foreground">
                          Complétez ces informations pour augmenter la visibilité de votre profil auprès des recruteurs.
                        </p>
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={handleRefresh}
                      disabled={isRefreshing || isProfileLoading}
                      className="inline-flex items-center justify-center rounded-full w-6 h-6 text-muted-foreground hover:text-primary transition-colors disabled:opacity-50"
                      title="Actualiser"
                    >
                      <RefreshCw className={`w-4 h-4 ${isRefreshing || isProfileLoading ? 'animate-spin' : ''}`} />
                    </button>
                    <span className="text-sm font-medium flex items-center gap-1">
                      <span>{completedItems}</span>
                      <span className="text-muted-foreground">/</span>
                      <span className="text-muted-foreground">3</span>
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>{percentage}% complété</span>
                    {percentage === 100 && <span>Profil complet ✨</span>}
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <motion.div 
                      className={`h-full bg-gradient-to-r ${getProgressColor()} rounded-full`}
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                  </div>
                </div>

                <div className={`space-y-3 transition-opacity duration-300 ${isRefreshing || isProfileLoading ? 'opacity-50' : 'opacity-100'}`}>
                  {completionItems.map((item, index) => (
                    <motion.div 
                      key={item.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.1 }}
                      className={`flex items-start gap-3 p-3 rounded-lg transition-colors duration-300 ${
                        item.completed 
                          ? 'bg-green-50/50 dark:bg-green-900/10 border border-green-100 dark:border-green-800/20' 
                          : 'bg-red-50/50 dark:bg-red-900/10 border border-red-100 dark:border-red-800/20'
                      }`}
                    >
                      <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 transition-colors duration-300 ${
                        item.completed 
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-red-500 dark:text-red-400'
                      }`}>
                        {item.completed ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : (
                          <XCircle className="w-4 h-4" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{item.name}</span>
                          {!item.completed && (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-6 px-2 text-xs hover:bg-red-100/50 dark:hover:bg-red-900/20"
                              onClick={() => handleNavigate(item.action)}
                            >
                              <span className="flex items-center gap-1">
                                Compléter
                                <ExternalLinkIcon className="w-3 h-3" />
                              </span>
                            </Button>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProfileProgress;