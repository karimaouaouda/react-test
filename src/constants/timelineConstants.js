/**
 * Static data for timeline events
 */

export const STATIC_ETAPES = [
  { id: 1, label: "Consultation", color: "#2563EB" },
  { id: 2, label: "Radio", color: "#06B6D4" },
  { id: 3, label: "Analyse", color: "#22C55E" },
  { id: 4, label: "Contrôle", color: "#F59E0B" },
  { id: 5, label: "Bilan sanguin", color: "#DC2626" },
  { id: 6, label: "Échographie", color: "#0EA5E9" },
  { id: 7, label: "IRM", color: "#7C3AED" },
  { id: 8, label: "Traitement", color: "#10B981" },
  { id: 9, label: "Vaccination", color: "#14B8A6" },
  { id: 10, label: "Hospitalisation", color: "#EF4444" },
  { id: 11, label: "Sortie", color: "#8B5CF6" },
  { id: 12, label: "Suivi 1m", color: "#3B82F6" },
  { id: 13, label: "Suivi 3m", color: "#0891B2" },
];

export const STATIC_TEMPLATES = [
  {
    id: 101,
    label: "Protocole standard",
    steps: [
      { label: "Consultation", color: "#2563EB", duree: 0 },
      { label: "Analyse", color: "#22C55E", duree: 2 },
      { label: "Contrôle", color: "#F59E0B", duree: 7 },
    ],
  },
  {
    id: 102,
    label: "Suivi imagerie",
    steps: [
      { label: "Consultation", color: "#2563EB", duree: 0 },
      { label: "Radio", color: "#06B6D4", duree: 1 },
      { label: "Contrôle", color: "#F59E0B", duree: 5 },
    ],
  },
  {
    id: 103,
    label: "Bilan complet",
    steps: [
      { label: "Consultation", color: "#2563EB", duree: 0 },
      { label: "Bilan sanguin", color: "#DC2626", duree: 1 },
      { label: "Échographie", color: "#0EA5E9", duree: 3 },
      { label: "Contrôle", color: "#F59E0B", duree: 10 },
    ],
  },
  {
    id: 104,
    label: "Parcours imagerie",
    steps: [
      { label: "Radio", color: "#06B6D4", duree: 0 },
      { label: "IRM", color: "#7C3AED", duree: 2 },
      { label: "Contrôle", color: "#F59E0B", duree: 7 },
    ],
  },
  {
    id: 105,
    label: "Suivi post-op",
    steps: [
      { label: "Hospitalisation", color: "#EF4444", duree: 0 },
      { label: "Sortie", color: "#8B5CF6", duree: 3 },
      { label: "Suivi 1m", color: "#3B82F6", duree: 30 },
      { label: "Suivi 3m", color: "#0891B2", duree: 90 },
    ],
  },
];

export const STATIC_CARTES = [
  {
    id: 201,
    title: "Compte-rendu initial",
    description: "RAS notable. Orientation vers analyses complémentaires.",
    color: "#0EA5E9",
  },
  {
    id: 202,
    title: "Analyse des résultats",
    description: "Légère anomalie détectée, recommandation d'IRM.",
    color: "#22C55E",
  },
  {
    id: 203,
    title: "Note de service",
    description: "Intervention réalisée sans complication. Surveillance standard.",
    color: "#0EA5E9",
  },
];
