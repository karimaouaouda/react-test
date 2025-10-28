import React from "react";
import { VerticalTimelineElement } from "react-vertical-timeline-component";
import { hexToRgba, getEventColorTone } from "../../utils/colorUtils";
import styles from "./Timeline.module.css";

/**
 * TimelineStep component - Display a step/milestone in the timeline
 */
const TimelineStep = ({ event, onEdit, onDelete, readOnly }) => {
  const tone = getEventColorTone(event);
  const dateStr = String(event?.event_date ?? event?.date ?? "");

  return (
    <VerticalTimelineElement
      className="StepFlagEl"
      date={dateStr}
      dateClassName={styles.tlDateBlack}
      contentStyle={{
        background: tone.bg,
        color: "#0B1220",
        padding: "10px 14px",
        borderRadius: 10,
        display: "inline-block",
        border: `1px solid ${hexToRgba(tone.solid, 0.4)}`,
        boxShadow: `0 8px 20px ${hexToRgba(tone.solid, 0.18)}`,
        fontWeight: 600,
      }}
      contentArrowStyle={{ display: "none" }}
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
      <div className={styles.stepFlagInner}>
        <span>{event?.title || event?.label || "Étape"}</span>
        {!readOnly && (
          <div className={styles.tlFlagActions}>
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
      </div>
    </VerticalTimelineElement>
  );
};

export default TimelineStep;
