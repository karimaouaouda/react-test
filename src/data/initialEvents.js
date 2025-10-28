import { generateId } from "../utils/idUtils";

/**
 * Initial timeline events data
 */
export const getInitialTimelineEvents = () => [
  // 2024
  { 
    id: generateId(), 
    type: "etape", 
    title: "Consultation initiale", 
    date: "2024-11-15", 
    color: "#2563EB" 
  },
  { 
    id: generateId(), 
    type: "card", 
    title: "Compte-rendu initial", 
    description: "RAS notable. Orientation vers analyses complémentaires.", 
    date: "2024-11-16", 
    color: "#0EA5E9" 
  },

  // 2025
  { 
    id: generateId(), 
    type: "etape", 
    title: "Bilan sanguin", 
    date: "2025-01-05", 
    color: "#DC2626" 
  },
  { 
    id: generateId(), 
    type: "etape", 
    title: "Échographie abdominale", 
    date: "2025-01-08", 
    color: "#0EA5E9" 
  },
  { 
    id: generateId(), 
    type: "card", 
    title: "Analyse des résultats", 
    description: "Légère anomalie détectée, recommandation d'IRM.", 
    date: "2025-01-10", 
    color: "#22C55E" 
  },
  { 
    id: generateId(), 
    type: "etape", 
    title: "IRM", 
    date: "2025-01-12", 
    color: "#7C3AED" 
  },
  { 
    id: generateId(), 
    type: "card", 
    title: "Compte-rendu IRM", 
    description: "IRM satisfaisante. Poursuite du suivi.", 
    date: "2025-01-14", 
    color: "#0EA5E9", 
    images: [{ 
      id: generateId(), 
      url: "https://picsum.photos/seed/irm/400/220" 
    }] 
  },

  { 
    id: generateId(), 
    type: "etape", 
    title: "Vaccination rappel", 
    date: "2025-02-02", 
    color: "#14B8A6" 
  },
  { 
    id: generateId(), 
    type: "etape", 
    title: "Contrôle clinique", 
    date: "2025-02-10", 
    color: "#F59E0B" 
  },

  { 
    id: generateId(), 
    type: "etape", 
    title: "Hospitalisation (programmée)", 
    date: "2025-03-01", 
    color: "#EF4444" 
  },
  { 
    id: generateId(), 
    type: "card", 
    title: "Note de service", 
    description: "Intervention réalisée sans complication. Surveillance standard.", 
    date: "2025-03-02", 
    color: "#0EA5E9", 
    images: [{ 
      id: generateId(), 
      url: "https://picsum.photos/seed/room/400/220" 
    }] 
  },
  { 
    id: generateId(), 
    type: "etape", 
    title: "Sortie", 
    date: "2025-03-04", 
    color: "#8B5CF6" 
  },

  { 
    id: generateId(), 
    type: "etape", 
    title: "Suivi 1m", 
    date: "2025-04-04", 
    color: "#3B82F6" 
  },
  { 
    id: generateId(), 
    type: "card", 
    title: "Compte-rendu suivi", 
    description: "Bon rétablissement, poursuite du plan de suivi.", 
    date: "2025-04-05", 
    color: "#0EA5E9" 
  },
  { 
    id: generateId(), 
    type: "etape", 
    title: "Suivi 3m", 
    date: "2025-06-30", 
    color: "#0891B2" 
  },
];
