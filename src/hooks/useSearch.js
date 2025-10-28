import { useState, useCallback, useEffect } from "react";
import { STATIC_ETAPES, STATIC_TEMPLATES, STATIC_CARTES } from "../constants/timelineConstants";

/**
 * Custom hook for search functionality
 * @returns {Object} Search state and handlers
 */
export const useSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [matches, setMatches] = useState([]);

  const computeMatches = useCallback((query) => {
    const trimmedQuery = String(query).trim().toLowerCase();
    const items = [];

    // Search in ETAPES
    STATIC_ETAPES.forEach((etape) => {
      if (!trimmedQuery || etape.label.toLowerCase().includes(trimmedQuery)) {
        items.push({ 
          kind: "etape", 
          id: etape.id, 
          label: etape.label, 
          color: etape.color 
        });
      }
    });

    // Search in TEMPLATES
    STATIC_TEMPLATES.forEach((template) => {
      if (!trimmedQuery || template.label.toLowerCase().includes(trimmedQuery)) {
        items.push({ 
          kind: "template", 
          id: template.id, 
          label: template.label, 
          steps_count: template.steps?.length || 0 
        });
      }
    });

    // Search in CARTES
    STATIC_CARTES.forEach((carte) => {
      if (!trimmedQuery || carte.title.toLowerCase().includes(trimmedQuery)) {
        items.push({ 
          kind: "card", 
          id: carte.id, 
          label: carte.title, 
          color: carte.color 
        });
      }
    });

    // Add "new" option if query doesn't match existing items
    if (trimmedQuery && !items.some((item) => item.label.toLowerCase() === trimmedQuery)) {
      items.unshift({ 
        kind: "new", 
        id: 0, 
        label: query || "Nouveau", 
        steps_count: 0 
      });
    }

    setMatches(items);
  }, []);

  useEffect(() => {
    computeMatches(searchQuery);
  }, [searchQuery, computeMatches]);

  const updateQuery = useCallback((query) => {
    setSearchQuery(query);
    setIsOpen(true);
  }, []);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return {
    searchQuery,
    isOpen,
    matches,
    updateQuery,
    setSearchQuery,
    open,
    close,
  };
};
