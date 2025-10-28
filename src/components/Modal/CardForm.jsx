import React from "react";
import styles from "./Modal.module.css";
import uiStyles from "../UI/UI.module.css";

/**
 * CardForm Component
 * Form for adding a card/note event
 */
const CardForm = ({
  title,
  description,
  color,
  date,
  onTitleChange,
  onDescriptionChange,
  onColorChange,
  onDateChange,
}) => {
  return (
    <div className={styles.formSection}>
      <div className={styles.colorPickerWrapper}>
        <span
          className={styles.colorIndicator}
          style={{
            width: 16,
            height: 16,
            background: color,
            border: `1px solid ${color}`,
          }}
        />
        <input
          className={uiStyles.input}
          placeholder="Titre de la carte"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          style={{ border: `1px solid ${color}`, flex: "1 1 360px" }}
        />
        <input
          type="color"
          value={color}
          onChange={(e) => onColorChange(e.target.value)}
          title="Choisir une couleur"
          className={styles.colorPicker}
        />
      </div>

      <div className={styles.formRow}>
        <label className={styles.formLabel}>Date de la carte</label>
        <input
          className={uiStyles.input}
          type="date"
          value={date}
          onChange={(e) => onDateChange(e.target.value)}
        />
      </div>

      <textarea
        className={uiStyles.input}
        rows={4}
        placeholder="Description (optionnel)"
        value={description}
        onChange={(e) => onDescriptionChange(e.target.value)}
      />
    </div>
  );
};

export default CardForm;
