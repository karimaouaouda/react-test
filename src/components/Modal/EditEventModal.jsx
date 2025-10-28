import React, { useState } from "react";
import { generateId } from "../../utils/idUtils";
import IconClose from "../Icons/IconClose";
import styles from "./Modal.module.css";
import uiStyles from "../UI/UI.module.css";

/**
 * EditEventModal Component
 * Modal for editing existing timeline events
 */
const EditEventModal = ({ isOpen, event, onClose, onSave }) => {
  const [title, setTitle] = useState(event?.title || event?.label || "");
  const [description, setDescription] = useState(event?.description || "");
  const [images, setImages] = useState(Array.isArray(event?.images) ? event.images : []);

  if (!isOpen) return null;

  const handleSave = () => {
    if (!title.trim()) return;
    
    onSave({
      title: title.trim(),
      description: description.trim(),
      images,
    });
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const toDataURL = (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () =>
          resolve({ id: generateId(), url: String(reader.result) });
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

    const uploaded = [];
    for (const file of files) {
      uploaded.push(await toDataURL(file));
    }
    
    setImages((prev) => [...prev, ...uploaded]);
    e.target.value = "";
  };

  const handleRemoveImage = (imageId) => {
    setImages((prev) => prev.filter((img) => img.id !== imageId));
  };

  return (
    <div
      className={styles.modalOverlay}
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={`${styles.modal} ${styles.modalFullscreen}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={styles.modalHead}>
          <strong>Modifier l'élément</strong>
          <button
            className={uiStyles.iconBtn}
            onClick={onClose}
            title="Fermer"
          >
            <IconClose />
          </button>
        </div>

        {/* Body */}
        <div className={styles.modalBody}>
          <div>
            <input
              className={uiStyles.input}
              placeholder="Titre"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <textarea
            className={uiStyles.input}
            rows={4}
            placeholder="Description (optionnel)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className={uiStyles.gridGap}>
            <div className={styles.formRow}>
              <label style={{ fontWeight: 600 }}>Images</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
              />
            </div>

            {images.length > 0 && (
              <div className={styles.tlImages}>
                {images.map((img) => (
                  <div key={img.id} className={styles.tlImageWrapper}>
                    <img
                      src={img.url}
                      alt=""
                      className={styles.tlImage}
                    />
                    <button
                      type="button"
                      className={`${uiStyles.iconBtn} ${styles.tlImageDeleteBtn}`}
                      title="Supprimer"
                      onClick={() => handleRemoveImage(img.id)}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className={styles.modalFoot}>
          <button className={`${uiStyles.btn} ${uiStyles.btnGhost}`} onClick={onClose}>
            Annuler
          </button>
          <button
            className={uiStyles.btn}
            onClick={handleSave}
            disabled={!title.trim()}
          >
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditEventModal;
