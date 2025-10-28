import React from "react";
import styles from "./Modal.module.css";
import uiStyles from "../UI/UI.module.css";

/**
 * SearchDropdown Component
 * Search input with dropdown suggestions
 */
const SearchDropdown = ({
  searchQuery,
  isOpen,
  matches,
  onQueryChange,
  onFocus,
  onSelectOption,
}) => {
  return (
    <div className={styles.searchSticky}>
      <div style={{ position: "relative" }}>
        <input
          className={uiStyles.input}
          placeholder="Rechercher une étape, une carte ou un template… (ou taper un nouveau nom)"
          value={searchQuery}
          onChange={(e) => onQueryChange(e.target.value)}
          onFocus={onFocus}
        />

        {isOpen && matches?.length > 0 && (
          <ul className={styles.dropdown}>
            {matches.map((option) => {
              const tone = { solid: option.color || "#2563EB" };
              
              return (
                <li key={`${option.kind}-${option.id}-${option.label}`}>
                  <button
                    type="button"
                    className={styles.dropdownItem}
                    onClick={() => onSelectOption(option)}
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    <span
                      className={styles.colorIndicator}
                      style={{
                        background: tone.solid,
                        border: `1px solid ${tone.solid}`,
                      }}
                    />
                    <span className={styles.dropdownLabel}>
                      {option.label}
                    </span>
                    <small className={styles.dropdownBadge}>
                      {option.kind === "etape"
                        ? "Étape"
                        : option.kind === "template"
                        ? `Template${option.steps_count ? ` • ${option.steps_count}` : ""}`
                        : option.kind === "card"
                        ? "Carte"
                        : "Nouveau"}
                    </small>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchDropdown;
