import React from "react";
import { VerticalTimelineElement } from "react-vertical-timeline-component";
import { hexToRgba, getEventColorTone } from "../../utils/colorUtils";
import styles from "./Timeline.module.css";

/**
 * TimelineCard component - Display a card/note in the timeline
 */
const TimelineCard = ({ event, onEdit, onDelete, readOnly }) => {
  const tone = getEventColorTone(event);
  const dateStr = String(event?.event_date ?? event?.date ?? "");

  return (
    <VerticalTimelineElement
      date={dateStr}
      dateClassName={styles.tlDateBlack}
      contentStyle={{
        background: tone.bg,
        color: "#0B1220",
        borderLeft: `5px solid ${tone.solid}`,
        boxShadow: `0 12px 26px ${hexToRgba(tone.solid, 0.18)}`,
        borderRadius: 14,
        width: "calc(50% - 10px)",
      }}
      contentArrowStyle={{ borderRight: `7px solid ${tone.bg}` }}
      icon={<span aria-hidden="true" />}
      iconStyle={{
        background: tone.solid,
        color: "transparent",
        width: 10,
        height: 10,
        marginLeft: -5,
        borderRadius: 999,
        border: "2px solid #fff",
        boxShadow: `0 2px 6px ${hexToRgba(tone.solid, 0.36)}`,
      }}
    >
      <header className={styles.tlCardHeader}>
        <h4 className={styles.tlCardTitle}>
          {event?.title || event?.label || "Évènement"}
        </h4>
        {!readOnly && (
          <div className={styles.tlCardActions}>
            <button 
              type="button" 
              className="IconBtn" 
              title="Éditer" 
              onClick={() => onEdit(event)}
            >
              ✎
            </button>
            <button 
              type="button" 
              className="IconBtn" 
              title="Supprimer" 
              onClick={() => onDelete(event?.id)}
            >
              🗑
            </button>
          </div>
        )}
      </header>

      {event?.description && (
        <p style={{ whiteSpace: "pre-wrap", marginTop: 0, color: "#334155" }}>
          {event.description}
        </p>
      )}

      {Array.isArray(event?.images) && event.images.length > 0 && (
        <div className={styles.tlImages}>
          {event.images.map((img) => (
            <img
              key={img.id || img.url}
              src={img.url}
              alt=""
              className={styles.tlImage}
            />
          ))}
        </div>
      )}
    </VerticalTimelineElement>
  );
};

export default TimelineCard;
