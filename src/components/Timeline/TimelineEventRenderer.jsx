import React from "react";
import { hexToRgba, getEventColorTone } from "../../utils/colorUtils";
import styles from "./Timeline.module.css";

/**
 * Render a year flag
 */
const renderYearFlag = (item) => {
  const tone = { solid: item.color || "#2563EB" };
  
  return (
    <div key={item.id} className="timeline-item year-flag-item">
      <div 
        className="year-flag-content"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 40,
          height: 40,
          borderRadius: '50%',
          background: tone.solid,
          color: '#fff',
          fontSize: 12,
          fontWeight: 'bold',
          boxShadow: `0 8px 18px ${hexToRgba(tone.solid, 0.32)}, inset 0 0 0 2px ${hexToRgba("#FFFFFF", 0.16)}`,
          margin: '20px auto',
        }}
      >
        {item.year}
      </div>
    </div>
  );
};

/**
 * Render a step event
 */
const renderStep = (item, onEdit, onDelete, readOnly) => {
  const tone = getEventColorTone(item);
  const dateStr = item.dateStr || item.date || "";

  return (
    <div key={item.id} className="timeline-item step-item">
      <div className="timeline-date">{dateStr}</div>
      <div className="timeline-content">
        <div
          style={{
            background: tone.bg,
            color: "#0B1220",
            padding: "10px 14px",
            borderRadius: 10,
            display: "inline-block",
            border: `1px solid ${hexToRgba(tone.solid, 0.4)}`,
            boxShadow: `0 8px 20px ${hexToRgba(tone.solid, 0.18)}`,
            fontWeight: 600,
            position: 'relative',
          }}
        >
          <div className={styles.stepFlagInner}>
            <span>{item?.title || item?.label || "Étape"}</span>
            {!readOnly && (
              <div className={styles.tlFlagActions}>
                <button 
                  type="button" 
                  className="IconBtn" 
                  title="Éditer" 
                  onClick={() => onEdit(item.id)}
                >
                  ✎
                </button>
                <button 
                  type="button" 
                  className="IconBtn" 
                  title="Supprimer" 
                  onClick={() => onDelete(item.id)}
                >
                  🗑
                </button>
              </div>
            )}
          </div>
          
          {/* Custom circle indicator */}
          <div
            className="timeline-circle"
            style={{
              background: tone.solid,
              boxShadow: `0 2px 6px ${hexToRgba(tone.solid, 0.36)}`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

/**
 * Render a card event
 */
const renderCard = (item, onEdit, onDelete, readOnly) => {
  const tone = getEventColorTone(item);
  const dateStr = item.dateStr || item.date || "";

  return (
    <div key={item.id} className="timeline-item card-item">
      <div className="timeline-date">{dateStr}</div>
      <div className="timeline-content">
        <div
          style={{
            background: tone.bg,
            color: "#0B1220",
            borderLeft: `5px solid ${tone.solid}`,
            boxShadow: `0 12px 26px ${hexToRgba(tone.solid, 0.18)}`,
            borderRadius: 14,
            padding: 16,
            position: 'relative',
          }}
        >
          <header className={styles.tlCardHeader}>
            <h4 className={styles.tlCardTitle}>
              {item?.title || item?.label || "Évènement"}
            </h4>
            {!readOnly && (
              <div className={styles.tlCardActions}>
                <button 
                  type="button" 
                  className="IconBtn" 
                  title="Éditer" 
                  onClick={() => onEdit(item.id)}
                >
                  ✎
                </button>
                <button 
                  type="button" 
                  className="IconBtn" 
                  title="Supprimer" 
                  onClick={() => onDelete(item.id)}
                >
                  🗑
                </button>
              </div>
            )}
          </header>

          {item?.description && (
            <p style={{ whiteSpace: "pre-wrap", marginTop: 0, color: "#334155" }}>
              {item.description}
            </p>
          )}

          {Array.isArray(item?.images) && item.images.length > 0 && (
            <div className={styles.tlImages}>
              {item.images.map((img) => (
                <img
                  key={img.id || img.url}
                  src={img.url}
                  alt=""
                  className={styles.tlImage}
                />
              ))}
            </div>
          )}

          {/* Custom circle indicator */}
          <div
            className="timeline-circle"
            style={{
              background: tone.solid,
              boxShadow: `0 2px 6px ${hexToRgba(tone.solid, 0.36)}`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

/**
 * Main renderer function
 */
export const renderTimelineEvent = (item, onEdit, onDelete, readOnly) => {
  if (item.type === 'year-flag') {
    return renderYearFlag(item);
  }
  
  const isStep = String(item?.type || "").toLowerCase() === "etape";
  
  if (isStep) {
    return renderStep(item, onEdit, onDelete, readOnly);
  } else {
    return renderCard(item, onEdit, onDelete, readOnly);
  }
};
