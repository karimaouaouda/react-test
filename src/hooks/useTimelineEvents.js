import { useState, useCallback } from "react";
import { generateId } from "../utils/idUtils";

/**
 * Custom hook for managing timeline events
 * @param {Array} initialEvents - Initial events array
 * @returns {Object} Events state and handlers
 */
export const useTimelineEvents = (initialEvents = []) => {
  const [events, setEvents] = useState(initialEvents);

  const addEvent = useCallback((event) => {
    const newEvent = {
      id: generateId(),
      ...event,
    };
    setEvents((prev) => [...prev, newEvent]);
    return newEvent;
  }, []);

  const addMultipleEvents = useCallback((eventsArray) => {
    const newEvents = eventsArray.map((event) => ({
      id: generateId(),
      ...event,
    }));
    setEvents((prev) => [...prev, ...newEvents]);
    return newEvents;
  }, []);

  const updateEvent = useCallback((id, updates) => {
    setEvents((prev) =>
      prev.map((event) => (event.id === id ? { ...event, ...updates } : event))
    );
  }, []);

  const deleteEvent = useCallback((id) => {
    setEvents((prev) => prev.filter((event) => event.id !== id));
  }, []);

  return {
    events,
    addEvent,
    addMultipleEvents,
    updateEvent,
    deleteEvent,
  };
};
