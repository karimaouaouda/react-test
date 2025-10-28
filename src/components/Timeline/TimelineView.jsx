import React, { useState, useMemo } from "react";
import { Timeline } from "@progress/kendo-react-layout";
import "@progress/kendo-theme-default/dist/all.css";
import { compareEventsByDateDesc } from "../../utils/dateUtils";
import { getLocalYMD } from "../../utils/dateUtils";
import { useTimelineEvents } from "../../hooks/useTimelineEvents";
import { useModal } from "../../hooks/useModal";
import { getInitialTimelineEvents } from "../../data/initialEvents";
import IconPlus from "../Icons/IconPlus";
import IconClose from "../Icons/IconClose";
import { renderTimelineEvent } from "./TimelineEventRenderer";
import AddEventModal from "../Modal/AddEventModal";
import EditEventModal from "../Modal/EditEventModal";
import styles from "./Timeline.module.css";
import uiStyles from "../UI/UI.module.css";
import "./KendoTimelineCustom.css";

/**
 * TimelineView Component
 * Main component for displaying and managing timeline events
 */
const TimelineView = () => {
  const [readOnly] = useState(false);
  const [timelineHeight] = useState("70vh");
  
  // Timeline events management
  const { 
    events, 
    addEvent, 
    addMultipleEvents, 
    updateEvent, 
    deleteEvent 
  } = useTimelineEvents(getInitialTimelineEvents());

  // Modals management
  const addModal = useModal(false);
  const editModal = useModal(false);
  const chartsModal = useModal(false);

  // Edit state
  const [editTargetId, setEditTargetId] = useState(null);

  const handleOpenAddModal = () => {
    addModal.open();
  };

  const handleOpenEditModal = (event) => {
    setEditTargetId(event?.id);
    editModal.open();
  };

  const handleDeleteEvent = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet élément ?")) {
      deleteEvent(id);
    }
  };

  // Convert events to Kendo Timeline format
  const timelineData = useMemo(() => {
    const data = [];
    let lastYear = null;
    const sortedEvents = [...events].sort(compareEventsByDateDesc);

    sortedEvents.forEach((event, idx) => {
      const dateStr = String(event?.event_date ?? event?.date ?? "");
      const year = dateStr ? dateStr.slice(0, 4) : "";

      // Add year flag if year changed
      if (year && year !== lastYear) {
        data.push({
          id: `year-${year}-${idx}`,
          type: 'year-flag',
          year,
          date: dateStr,
          color: event?.color,
        });
        lastYear = year;
      }

      // Add the event
      data.push({
        ...event,
        id: event?.id ?? `ev-${idx}`,
        dateStr,
      });
    });

    return data;
  }, [events]);

  const handleEditFromTimeline = (eventId) => {
    const event = events.find((e) => e.id === eventId);
    if (event) handleOpenEditModal(event);
  };

  const handleDeleteFromTimeline = (eventId) => {
    handleDeleteEvent(eventId);
  };

  const renderTimelineElements = () => {
    return timelineData.map((item) => 
      renderTimelineEvent(item, handleEditFromTimeline, handleDeleteFromTimeline, readOnly)
    );
  };

  const currentEvent = editTargetId 
    ? events.find((e) => e.id === editTargetId) 
    : null;

  return (
    <div
      style={{
        padding: 16,
        background: "#F8FAFC",
        minHeight: "100vh",
        fontFamily: "Inter, system-ui, Segoe UI, Roboto, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji",
      }}
    >
      {/* Timeline Section */}
      <section className={`${uiStyles.panel} ${uiStyles.panelCompact}`}>
        <header className={uiStyles.panelHeader}>
          <span>timeline</span>
          <div className={uiStyles.flexRow}>
            {!readOnly && (
              <button
                type="button"
                className={`${uiStyles.iconBtn} ${uiStyles.iconBtnPlus}`}
                aria-label="Ajouter"
                title="Ajouter un évènement timeline"
                onClick={handleOpenAddModal}
              >
                <IconPlus />
              </button>
            )}
          </div>
        </header>

        <div
          className={styles.timelineContainer}
          style={{ height: timelineHeight }}
        >
          <div className="custom-timeline-wrapper">
            {renderTimelineElements()}
          </div>
        </div>
      </section>

      {/* Charts Section */}
      <section
        className={uiStyles.panel}
        style={{
          marginTop: chartsModal.isOpen ? -180 : -40,
          height: chartsModal.isOpen ? 200 : 80,
          transition: "margin-top .24s ease, height .24s ease",
        }}
      >
        <header
          className={`${uiStyles.panelHeader} ${uiStyles.panelHeaderToggle} ${
            chartsModal.isOpen ? uiStyles.isOpen : ""
          }`}
          onClick={chartsModal.toggle}
          role="button"
          tabIndex={0}
          onKeyDown={(e) =>
            e.key === "Enter" || e.key === " " ? chartsModal.toggle() : null
          }
          aria-expanded={chartsModal.isOpen}
          aria-controls="charts-content"
          title={chartsModal.isOpen ? "Réduire" : "Déplier"}
        >
          <span>charts</span>
          <button
            type="button"
            className={uiStyles.panelChevron}
            aria-hidden="true"
            tabIndex={-1}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path
                d="M9 6l6 6-6 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </header>

        <div
          id="charts-content"
          style={{
            height: chartsModal.isOpen ? 350 : 0,
            overflowY: chartsModal.isOpen ? "auto" : "hidden",
            transition: "height .24s ease",
          }}
        >
          <div className={uiStyles.chartsArea}>
            <div
              className={uiStyles.bigChart}
              style={{ display: chartsModal.isOpen ? "grid" : "none" }}
            >
              <div>Place ton graphique ici (ex: Recharts)</div>
            </div>
          </div>
        </div>
      </section>

      {/* Add Event Modal */}
      {addModal.isOpen && !readOnly && (
        <AddEventModal
          isOpen={addModal.isOpen}
          onClose={addModal.close}
          onAddEvent={addEvent}
          onAddMultipleEvents={addMultipleEvents}
        />
      )}

      {/* Edit Event Modal */}
      {editModal.isOpen && currentEvent && (
        <EditEventModal
          isOpen={editModal.isOpen}
          event={currentEvent}
          onClose={editModal.close}
          onSave={(updates) => {
            updateEvent(editTargetId, updates);
            editModal.close();
          }}
        />
      )}
    </div>
  );
};

export default TimelineView;
