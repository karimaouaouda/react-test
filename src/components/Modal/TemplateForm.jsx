import React from "react";
import { recomputePlanFromFirst } from "../../utils/templateUtils";
import styles from "./Modal.module.css";
import uiStyles from "../UI/UI.module.css";

/**
 * TemplateForm Component
 * Form for adding multiple steps from a template
 */
const TemplateForm = ({
  title,
  color,
  templatePlan,
  onTitleChange,
  onPlanChange,
  onDateChange,
  initialDate,
}) => {
  const handleStepDateChange = (index, newDate) => {
    if (index === 0) {
      onDateChange(newDate);
    } else {
      onPlanChange((prev) => {
        const next = [...prev];
        next[index] = { ...next[index], date: newDate };
        return next;
      });
    }
  };

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
          placeholder="Titre du template (facultatif)"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          style={{ border: `1px solid ${color}`, flex: "1 1 360px" }}
        />
      </div>

      <div className={styles.templatePlan}>
        {templatePlan.map((step, index) => (
          <div key={index} className={styles.templateStep}>
            <span className={styles.stepNumber}>{index + 1}.</span>
            <div className={styles.stepInfo}>
              <span
                className={styles.colorIndicator}
                style={{
                  width: 12,
                  height: 12,
                  background: step.color,
                  border: `1px solid ${step.color}`,
                }}
              />
              <span>{step.label}</span>
            </div>
            <span className={styles.stepDuration}>
              {Number(step.duree || 0) > 0 ? `+${Number(step.duree)} j` : "±0 j"}
            </span>
            <input
              className={uiStyles.input}
              type="date"
              value={step.date || ""}
              onChange={(e) => handleStepDateChange(index, e.target.value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateForm;
