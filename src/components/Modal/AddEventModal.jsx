import React, { useState } from "react";
import { getLocalYMD } from "../../utils/dateUtils";
import { recomputePlanFromFirst } from "../../utils/templateUtils";
import { STATIC_ETAPES, STATIC_TEMPLATES, STATIC_CARTES } from "../../constants/timelineConstants";
import { useSearch } from "../../hooks/useSearch";
import IconClose from "../Icons/IconClose";
import SearchDropdown from "./SearchDropdown";
import TemplateForm from "./TemplateForm";
import CardForm from "./CardForm";
import StepForm from "./StepForm";
import styles from "./Modal.module.css";
import uiStyles from "../UI/UI.module.css";

/**
 * AddEventModal Component
 * Modal for adding new timeline events (steps, cards, or templates)
 */
const AddEventModal = ({ isOpen, onClose, onAddEvent, onAddMultipleEvents }) => {
  const [busy, setBusy] = useState(false);
  const [selectedKind, setSelectedKind] = useState(null); // 'etape' | 'template' | 'card'
  const [selectedId, setSelectedId] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("#2563EB");
  const [date, setDate] = useState(getLocalYMD());
  const [templatePlan, setTemplatePlan] = useState([]);

  const search = useSearch();

  if (!isOpen) return null;

  const handleSelectOption = (option) => {
    search.close();
    
    if (option.kind === "etape") {
      const ref = STATIC_ETAPES.find((e) => e.id === option.id);
      setSelectedKind("etape");
      setSelectedId(option.id);
      setTitle(ref?.label || option.label);
      setColor(ref?.color || "#2563EB");
      setTemplatePlan([]);
      setDescription("");
    } else if (option.kind === "template") {
      const template = STATIC_TEMPLATES.find((t) => t.id === option.id);
      setSelectedKind("template");
      setSelectedId(option.id);
      setTitle(template?.label || option.label);
      
      const basePlan = (template?.steps || []).map((step) => ({
        label: step.label,
        color: step.color,
        duree: Number(step.duree || 0),
        date: "",
      }));
      
      setTemplatePlan(recomputePlanFromFirst(date, basePlan));
      setDescription("");
    } else if (option.kind === "card") {
      const card = STATIC_CARTES.find((c) => c.id === option.id);
      setSelectedKind("card");
      setSelectedId(option.id);
      setTitle(card?.title || option.label);
      setColor(card?.color || "#0EA5E9");
      setTemplatePlan([]);
      setDescription(card?.description || "");
    } else {
      // new -> étape
      setSelectedKind("etape");
      setSelectedId(null);
      setTitle(option.label);
      setColor("#2563EB");
      setTemplatePlan([]);
      setDescription("");
    }
  };

  const handleConfirm = async () => {
    setBusy(true);
    
    try {
      if (selectedKind === "template" && templatePlan.length > 0) {
        // Add all template steps
        const steps = templatePlan.map((step) => ({
          type: "etape",
          title: step.label,
          date: step.date || date,
          color: step.color,
        }));
        onAddMultipleEvents(steps);
      } else if (selectedKind === "card") {
        if (!title.trim() || !date) return;
        onAddEvent({
          type: "card",
          title: title.trim(),
          description: description?.trim() || "",
          date,
          color,
        });
      } else {
        // Simple step (default)
        if (!title.trim() || !date) return;
        onAddEvent({
          type: "etape",
          title: title.trim(),
          date,
          color,
        });
      }

      // Reset and close
      handleClose();
    } finally {
      setBusy(false);
    }
  };

  const handleClose = () => {
    search.setSearchQuery("");
    setSelectedKind(null);
    setSelectedId(null);
    setTemplatePlan([]);
    setDate(getLocalYMD());
    setTitle("");
    setDescription("");
    setColor("#2563EB");
    onClose();
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
    if (selectedKind === "template" && templatePlan.length > 0) {
      setTemplatePlan(recomputePlanFromFirst(newDate, templatePlan));
    }
  };

  const isValid = () => {
    if (selectedKind === "template") {
      return templatePlan.length > 0 && templatePlan.every((s) => s.date);
    }
    if (selectedKind === "card") {
      return title.trim() && date;
    }
    return title.trim() && date;
  };

  return (
    <div
      className={styles.modalOverlay}
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
      onWheel={(e) => {
        if (e.target === e.currentTarget) e.preventDefault();
      }}
      onTouchMove={(e) => {
        if (e.target === e.currentTarget) e.preventDefault();
      }}
    >
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={styles.modalHead}>
          <strong>Nouvel évènement timeline</strong>
          <button
            className={uiStyles.iconBtn}
            onClick={handleClose}
            title="Fermer"
          >
            <IconClose />
          </button>
        </div>

        {/* Body */}
        <div className={styles.modalBody}>
          {/* Search Section */}
          <SearchDropdown
            searchQuery={search.searchQuery}
            isOpen={search.isOpen}
            matches={search.matches}
            onQueryChange={search.updateQuery}
            onFocus={search.open}
            onSelectOption={handleSelectOption}
          />

          {/* Form based on selected type */}
          {selectedKind === "template" && templatePlan.length > 0 && (
            <TemplateForm
              title={title}
              color={color}
              templatePlan={templatePlan}
              onTitleChange={setTitle}
              onPlanChange={setTemplatePlan}
              onDateChange={handleDateChange}
              initialDate={date}
            />
          )}

          {selectedKind === "card" && (
            <CardForm
              title={title}
              description={description}
              color={color}
              date={date}
              onTitleChange={setTitle}
              onDescriptionChange={setDescription}
              onColorChange={setColor}
              onDateChange={setDate}
            />
          )}

          {selectedKind !== "template" && selectedKind !== "card" && (
            <StepForm
              title={title}
              color={color}
              date={date}
              onTitleChange={setTitle}
              onColorChange={setColor}
              onDateChange={setDate}
            />
          )}
        </div>

        {/* Footer */}
        <div className={styles.modalFoot}>
          <button
            className={`${uiStyles.btn} ${uiStyles.btnGhost}`}
            onClick={handleClose}
          >
            Annuler
          </button>
          <button
            className={uiStyles.btn}
            onClick={handleConfirm}
            disabled={busy || !isValid()}
          >
            Ajouter à la timeline
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEventModal;
