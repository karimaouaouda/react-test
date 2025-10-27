import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

/* ==== Icônes SVG inline (zéro dépendance) ==== */
const IconPlus = (props) => (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const IconClose = (props) => (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export default function TimelinePageStatic() {
  // ===== Helpers
  const ymdLocal = () =>
    new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 10);

  const hexToRgba = (hex, a = 1) => {
    if (!hex) return `rgba(0,0,0,${a})`;
    const h = hex.replace("#", "");
    const bigint = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  };

  const cmpByEventDateDesc = (a, b) => {
    const da = String(a?.event_date ?? a?.date ?? "");
    const db = String(b?.event_date ?? b?.date ?? "");
    if (da < db) return 1;
    if (da > db) return -1;
    return 0;
  };

  const cryptoRandomId = () =>
    `${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;

  const toneForEvent = (ev) => {
    const solid = ev?.color || (ev?.type === "etape" ? "#2563EB" : "#0EA5E9");
    return { solid, bg: hexToRgba(solid, 0.18) };
  };

  const recomputePlanFromFirst = (firstDate, plan) => {
    if (!firstDate || !Array.isArray(plan)) return plan || [];
    const base = new Date(firstDate + "T00:00:00");
    return plan.map((st, i) => {
      if (i === 0) return { ...st, date: firstDate };
      const d = new Date(base);
      const add = Number(st?.duree || 0);
      d.setDate(d.getDate() + add);
      const iso = new Date(d.getTime() - d.getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 10);
      return { ...st, date: iso };
    });
  };

  // ===== Données statiques : ÉTAPES / TEMPLATES / CARTES
  const STATIC_ETAPES = [
    { id: 1, label: "Consultation", color: "#2563EB" },
    { id: 2, label: "Radio", color: "#06B6D4" },
    { id: 3, label: "Analyse", color: "#22C55E" },
    { id: 4, label: "Contrôle", color: "#F59E0B" },
    { id: 5, label: "Bilan sanguin", color: "#DC2626" },
    { id: 6, label: "Échographie", color: "#0EA5E9" },
    { id: 7, label: "IRM", color: "#7C3AED" },
    { id: 8, label: "Traitement", color: "#10B981" },
    { id: 9, label: "Vaccination", color: "#14B8A6" },
    { id: 10, label: "Hospitalisation", color: "#EF4444" },
    { id: 11, label: "Sortie", color: "#8B5CF6" },
    { id: 12, label: "Suivi 1m", color: "#3B82F6" },
    { id: 13, label: "Suivi 3m", color: "#0891B2" },
  ];

  const STATIC_TEMPLATES = [
    {
      id: 101,
      label: "Protocole standard",
      steps: [
        { label: "Consultation", color: "#2563EB", duree: 0 },
        { label: "Analyse", color: "#22C55E", duree: 2 },
        { label: "Contrôle", color: "#F59E0B", duree: 7 },
      ],
    },
    {
      id: 102,
      label: "Suivi imagerie",
      steps: [
        { label: "Consultation", color: "#2563EB", duree: 0 },
        { label: "Radio", color: "#06B6D4", duree: 1 },
        { label: "Contrôle", color: "#F59E0B", duree: 5 },
      ],
    },
    {
      id: 103,
      label: "Bilan complet",
      steps: [
        { label: "Consultation", color: "#2563EB", duree: 0 },
        { label: "Bilan sanguin", color: "#DC2626", duree: 1 },
        { label: "Échographie", color: "#0EA5E9", duree: 3 },
        { label: "Contrôle", color: "#F59E0B", duree: 10 },
      ],
    },
    {
      id: 104,
      label: "Parcours imagerie",
      steps: [
        { label: "Radio", color: "#06B6D4", duree: 0 },
        { label: "IRM", color: "#7C3AED", duree: 2 },
        { label: "Contrôle", color: "#F59E0B", duree: 7 },
      ],
    },
    {
      id: 105,
      label: "Suivi post-op",
      steps: [
        { label: "Hospitalisation", color: "#EF4444", duree: 0 },
        { label: "Sortie", color: "#8B5CF6", duree: 3 },
        { label: "Suivi 1m", color: "#3B82F6", duree: 30 },
        { label: "Suivi 3m", color: "#0891B2", duree: 90 },
      ],
    },
  ];

  const STATIC_CARTES = [
    {
      id: 201,
      title: "Compte-rendu initial",
      description: "RAS notable. Orientation vers analyses complémentaires.",
      color: "#0EA5E9",
      images: [{ id: cryptoRandomId(), url: "https://picsum.photos/seed/cr1/480/260" }],
    },
    {
      id: 202,
      title: "Analyse des résultats",
      description: "Légère anomalie détectée, recommandation d’IRM.",
      color: "#22C55E",
    },
    {
      id: 203,
      title: "Note de service",
      description: "Intervention réalisée sans complication. Surveillance standard.",
      color: "#0EA5E9",
      images: [{ id: cryptoRandomId(), url: "https://picsum.photos/seed/cr2/480/260" }],
    },
  ];

  // ===== AUTOFILL (presets rapides)
  const AUTOFILL_PRESETS = [
    // Étapes
    { kind: "etape", label: "Étape — Consultation (aujourd’hui)", payload: { title: "Consultation", color: "#2563EB", date: ymdLocal() } },
    {
      kind: "etape",
      label: "Étape — Bilan sanguin (+3 jours)",
      payload: {
        title: "Bilan sanguin",
        color: "#DC2626",
        date: (() => {
          const d = new Date();
          d.setDate(d.getDate() + 3);
          return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
        })(),
      },
    },
    // Cartes
    { kind: "card", label: "Carte — Compte-rendu bref", payload: { title: "Compte-rendu", description: "RAS. Poursuite du suivi recommandé.", color: "#0EA5E9", date: ymdLocal() } },
    // Templates
    { kind: "template", label: "Template — Protocole standard (J0, J+2, J+7)", payload: { templateId: 101 } },
    { kind: "template", label: "Template — Suivi post-op (J0, J+3, J+30, J+90)", payload: { templateId: 105 } },
  ];

  // ====== State global UI
  const [readOnly] = React.useState(false);
  const [timelineH] = React.useState("70vh");
  const [chartsOpen, setChartsOpen] = React.useState(false);

  // ====== State Timeline (évènements)
  const [timelineEvents, setTimelineEvents] = React.useState(() => [
    // 2024
    { id: cryptoRandomId(), type: "etape", title: "Consultation initiale", date: "2024-11-15", color: "#2563EB" },
    { id: cryptoRandomId(), type: "card", title: "Compte-rendu initial", description: "RAS notable. Orientation vers analyses complémentaires.", date: "2024-11-16", color: "#0EA5E9" },

    // 2025
    { id: cryptoRandomId(), type: "etape", title: "Bilan sanguin", date: "2025-01-05", color: "#DC2626" },
    { id: cryptoRandomId(), type: "etape", title: "Échographie abdominale", date: "2025-01-08", color: "#0EA5E9" },
    { id: cryptoRandomId(), type: "card", title: "Analyse des résultats", description: "Légère anomalie détectée, recommandation d’IRM.", date: "2025-01-10", color: "#22C55E" },
    { id: cryptoRandomId(), type: "etape", title: "IRM", date: "2025-01-12", color: "#7C3AED" },
    { id: cryptoRandomId(), type: "card", title: "Compte-rendu IRM", description: "IRM satisfaisante. Poursuite du suivi.", date: "2025-01-14", color: "#0EA5E9", images: [{ id: cryptoRandomId(), url: "https://picsum.photos/seed/irm/400/220" }] },

    { id: cryptoRandomId(), type: "etape", title: "Vaccination rappel", date: "2025-02-02", color: "#14B8A6" },
    { id: cryptoRandomId(), type: "etape", title: "Contrôle clinique", date: "2025-02-10", color: "#F59E0B" },

    { id: cryptoRandomId(), type: "etape", title: "Hospitalisation (programmée)", date: "2025-03-01", color: "#EF4444" },
    { id: cryptoRandomId(), type: "card", title: "Note de service", description: "Intervention réalisée sans complication. Surveillance standard.", date: "2025-03-02", color: "#0EA5E9", images: [{ id: cryptoRandomId(), url: "https://picsum.photos/seed/room/400/220" }] },
    { id: cryptoRandomId(), type: "etape", title: "Sortie", date: "2025-03-04", color: "#8B5CF6" },

    { id: cryptoRandomId(), type: "etape", title: "Suivi 1m", date: "2025-04-04", color: "#3B82F6" },
    { id: cryptoRandomId(), type: "card", title: "Compte-rendu suivi", description: "Bon rétablissement, poursuite du plan de suivi.", date: "2025-04-05", color: "#0EA5E9" },
    { id: cryptoRandomId(), type: "etape", title: "Suivi 3m", date: "2025-06-30", color: "#0891B2" },
  ]);

  // ====== State modale Add
  const [showAdd, setShowAdd] = React.useState(false);
  const [busy, setBusy] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  // [{kind:'etape'|'template'|'card'|'new', id?, label, steps_count?, color?}]
  const [matches, setMatches] = React.useState([]);
  const [selectedKind, setSelectedKind] = React.useState(null); // 'etape' | 'template' | 'card'
  const [selectedId, setSelectedId] = React.useState(null);
  const [addTitle, setAddTitle] = React.useState("");
  const [addDescription, setAddDescription] = React.useState("");
  const [addColor, setAddColor] = React.useState("#2563EB");
  const [addDate, setAddDate] = React.useState(ymdLocal());
  const [templatePlan, setTemplatePlan] = React.useState([]); // [{label,color,duree,date?}]

  // ====== State modale Edit
  const [editOpen, setEditOpen] = React.useState(false);
  const [editTargetId, setEditTargetId] = React.useState(null);
  const [editTitle, setEditTitle] = React.useState("");
  const [editDescription, setEditDescription] = React.useState("");
  const [editImages, setEditImages] = React.useState([]);

  // ----- Recherche et suggestions (Add)
  const computeMatches = React.useCallback(
    (q) => {
      const query = String(q ?? searchQuery).trim().toLowerCase();
      const items = [];

      // Étapes
      STATIC_ETAPES.forEach((e) => {
        if (!query || e.label.toLowerCase().includes(query)) {
          items.push({ kind: "etape", id: e.id, label: e.label, color: e.color });
        }
      });

      // Templates
      STATIC_TEMPLATES.forEach((t) => {
        const stepsCount = t.steps?.length || 0;
        if (!query || t.label.toLowerCase().includes(query)) {
          items.push({ kind: "template", id: t.id, label: t.label, steps_count: stepsCount });
        }
      });

      // Cartes
      STATIC_CARTES.forEach((c) => {
        if (!query || c.title.toLowerCase().includes(query)) {
          items.push({ kind: "card", id: c.id, label: c.title, color: c.color });
        }
      });

      // Nouveau (création directe d'étape)
      if (query && !items.some((x) => x.label.toLowerCase() === query)) {
        items.unshift({ kind: "new", id: 0, label: searchQuery || "Nouveau", steps_count: 0 });
      }

      setMatches(items);
    },
    [searchQuery]
  );

  React.useEffect(() => {
    computeMatches(searchQuery);
  }, [searchQuery, computeMatches]);

  const selectOption = (opt) => {
    setSearchOpen(false);
    if (opt.kind === "etape") {
      const ref = STATIC_ETAPES.find((e) => e.id === opt.id);
      setSelectedKind("etape");
      setSelectedId(opt.id);
      setAddTitle(ref?.label || opt.label);
      setAddColor(ref?.color || "#2563EB");
      setTemplatePlan([]);
      setAddDescription("");
    } else if (opt.kind === "template") {
      const tpl = STATIC_TEMPLATES.find((t) => t.id === opt.id);
      setSelectedKind("template");
      setSelectedId(opt.id);
      setAddTitle(tpl?.label || opt.label);
      const basePlan = (tpl?.steps || []).map((s) => ({
        label: s.label,
        color: s.color,
        duree: Number(s.duree || 0),
        date: "",
      }));
      setTemplatePlan(recomputePlanFromFirst(addDate, basePlan));
      setAddDescription("");
    } else if (opt.kind === "card") {
      const c = STATIC_CARTES.find((x) => x.id === opt.id);
      setSelectedKind("card");
      setSelectedId(opt.id);
      setAddTitle(c?.title || opt.label);
      setAddColor(c?.color || "#0EA5E9");
      setTemplatePlan([]);
      setAddDescription(c?.description || "");
    } else {
      // new -> étape
      setSelectedKind("etape");
      setSelectedId(null);
      setAddTitle(opt.label);
      setAddColor("#2563EB");
      setTemplatePlan([]);
      setAddDescription("");
    }
  };

  // ====== AUTOFILL : appliquer un preset
  const applyPreset = (preset) => {
    if (!preset) return;

    if (preset.kind === "etape") {
      setSelectedKind("etape");
      setSelectedId(null);
      setAddTitle(preset.payload.title || "");
      setAddColor(preset.payload.color || "#2563EB");
      setAddDate(preset.payload.date || ymdLocal());
      setAddDescription("");
      setTemplatePlan([]);
      setSearchOpen(false);
      return;
    }

    if (preset.kind === "card") {
      setSelectedKind("card");
      setSelectedId(null);
      setAddTitle(preset.payload.title || "");
      setAddColor(preset.payload.color || "#0EA5E9");
      setAddDate(preset.payload.date || ymdLocal());
      setAddDescription(preset.payload.description || "");
      setTemplatePlan([]);
      setSearchOpen(false);
      return;
    }

    if (preset.kind === "template") {
      const tpl = STATIC_TEMPLATES.find((t) => t.id === preset.payload.templateId);
      setSelectedKind("template");
      setSelectedId(tpl?.id ?? null);
      setAddTitle(tpl?.label || "");
      const basePlan = (tpl?.steps || []).map((s) => ({
        label: s.label,
        color: s.color,
        duree: Number(s.duree || 0),
        date: "",
      }));
      const start = ymdLocal();
      setAddDate(start);
      setTemplatePlan(recomputePlanFromFirst(start, basePlan));
      setAddDescription("");
      setSearchOpen(false);
    }
  };

  const handleAddConfirm = async () => {
    setBusy(true);
    try {
      if (selectedKind === "template" && templatePlan.length > 0) {
        // ajouter toutes les étapes du template
        const toPush = templatePlan.map((st) => ({
          id: cryptoRandomId(),
          type: "etape",
          title: st.label,
          date: st.date || addDate,
          color: st.color,
        }));
        setTimelineEvents((prev) => [...prev, ...toPush]);
      } else if (selectedKind === "card") {
        if (!addTitle.trim() || !addDate) return;
        setTimelineEvents((prev) => [
          ...prev,
          {
            id: cryptoRandomId(),
            type: "card",
            title: addTitle.trim(),
            description: addDescription?.trim() || "",
            date: addDate,
            color: addColor,
          },
        ]);
      } else {
        // étape simple (par défaut)
        if (!addTitle.trim() || !addDate) return;
        setTimelineEvents((prev) => [
          ...prev,
          { id: cryptoRandomId(), type: "etape", title: addTitle.trim(), date: addDate, color: addColor },
        ]);
      }

      // Reset form
      setShowAdd(false);
      setSearchQuery("");
      setSelectedKind(null);
      setSelectedId(null);
      setTemplatePlan([]);
      setAddDate(ymdLocal());
      setAddTitle("");
      setAddDescription("");
      setAddColor("#2563EB");
    } finally {
      setBusy(false);
    }
  };

  const openEdit = (ev) => {
    setEditTargetId(ev?.id);
    setEditTitle(ev?.title || ev?.label || "");
    setEditDescription(ev?.description || "");
    setEditImages(Array.isArray(ev?.images) ? ev.images : []);
    setEditOpen(true);
  };

  const saveEdit = () => {
    if (!editTitle.trim()) return;
    setTimelineEvents((prev) =>
      prev.map((e) => {
        if (e.id !== editTargetId) return e;
        return { ...e, title: editTitle.trim(), description: editDescription, images: editImages };
      })
    );
    setEditOpen(false);
  };

  const doDelete = (id) => {
    setTimelineEvents((prev) => prev.filter((e) => e.id !== id));
  };

  const onToggleCharts = () => setChartsOpen((v) => !v);

  // ===== Rendu
  return (
    <div
      style={{
        padding: 16,
        background: "#F8FAFC",
        minHeight: "100vh",
        fontFamily:
          "Inter, system-ui, Segoe UI, Roboto, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji",
      }}
    >
      {/* ===== Section Timeline ===== */}
      <section className="Panel Panel--compact" style={{ gridArea: "timeline" }}>
        <header className="Panel__header">
          <span>timeline</span>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {!readOnly && (
              <button
                type="button"
                className="IconBtn IconBtn--plus"
                aria-label="Ajouter"
                title="Ajouter un évènement timeline"
                onClick={() => {
                  setShowAdd(true);
                  setSearchQuery("");
                  setSelectedKind(null);
                  setSelectedId(null);
                  setTemplatePlan([]);
                  setAddDate(ymdLocal());
                  setAddTitle("");
                  setAddDescription("");
                  setAddColor("#2563EB");
                }}
              >
                <IconPlus />
              </button>
            )}
          </div>
        </header>

        <div
          className="TimelineCol"
          style={{
            position: "relative",
            height: timelineH || "70vh",
            overflowY: "auto",
            minHeight: 0,
            transition: "height .24s ease",
            scrollbarWidth: "none",
            paddingTop: 0,
            ["--tl-line"]: "#93C5FD",
          }}
        >
          <VerticalTimeline
            layout="2-columns"
            animate
            lineColor="var(--tl-line, #93C5FD)"
            className="vtl--inside"
          >
            {(() => {
              const nodes = [];
              let lastYear = null;

              (timelineEvents || [])
                .slice()
                .sort(cmpByEventDateDesc)
                .forEach((ev, idx) => {
                  const dateStr = String(ev?.event_date ?? ev?.date ?? "");
                  const year = dateStr ? dateStr.slice(0, 4) : "";
                  const tone = toneForEvent(ev);

                  // Drapeau d'année
                  if (year && year !== lastYear) {
                    nodes.push(
                      <VerticalTimelineElement
                        key={`year-${year}-${idx}`}
                        icon={<strong style={{ fontSize: 12, lineHeight: 1 }}>{year}</strong>}
                        dateClassName="TLDateBlack"
                        contentStyle={{ display: "none", padding: 0, background: "transparent", boxShadow: "none" }}
                        contentArrowStyle={{ display: "none" }}
                        iconStyle={{
                          background: tone.solid,
                          color: "#fff",
                          width: 40,
                          height: 40,
                          marginLeft: -20,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          boxShadow: `0 8px 18px ${hexToRgba(tone.solid, 0.32)}, inset 0 0 0 2px ${hexToRgba("#FFFFFF", 0.16)}`,
                        }}
                        className="YearFlagEl"
                      />
                    );
                    lastYear = year;
                  }

                  const isEtape = String(ev?.type || "").toLowerCase() === "etape";

                  if (isEtape) {
                    // Étape (badge centré)
                    nodes.push(
                      <VerticalTimelineElement
                        key={`ev-${ev?.id ?? idx}-step`}
                        className="StepFlagEl"
                        date={dateStr}
                        dateClassName="TLDateBlack"
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
                        <div
                          className="StepFlagInner"
                          style={{ position: "relative", display: "inline-flex", alignItems: "center", gap: 8 }}
                        >
                          <span>{ev?.title || ev?.label || "Étape"}</span>
                          {!readOnly && (
                            <div className="TLFlagActions">
                              <button type="button" className="IconBtn" title="Éditer" onClick={() => openEdit(ev)}>
                                ✎
                              </button>
                              <button type="button" className="IconBtn" title="Supprimer" onClick={() => doDelete(ev?.id)}>
                                🗑
                              </button>
                            </div>
                          )}
                        </div>
                      </VerticalTimelineElement>
                    );
                  } else {
                    // Carte latérale
                    nodes.push(
                      <VerticalTimelineElement
                        key={`ev-${ev?.id ?? idx}`}
                        date={dateStr}
                        dateClassName="TLDateBlack"
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
                        <header
                          className="TLCardHeader"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: 8,
                            marginBottom: 6,
                          }}
                        >
                          <h4 className="TLCardTitle" style={{ margin: 0, fontWeight: 700 }}>
                            {ev?.title || ev?.label || "Évènement"}
                          </h4>
                          {!readOnly && (
                            <div className="TLCardActions" style={{ display: "flex", gap: 8 }}>
                              <button type="button" className="IconBtn" title="Éditer" onClick={() => openEdit(ev)}>
                                ✎
                              </button>
                              <button type="button" className="IconBtn" title="Supprimer" onClick={() => doDelete(ev?.id)}>
                                🗑
                              </button>
                            </div>
                          )}
                        </header>

                        {ev?.description && (
                          <p style={{ whiteSpace: "pre-wrap", marginTop: 0, color: "#334155" }}>{ev.description}</p>
                        )}

                        {Array.isArray(ev?.images) && ev.images.length > 0 && (
                          <div
                            style={{
                              display: "grid",
                              gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
                              gap: 8,
                              marginTop: 8,
                            }}
                          >
                            {ev.images.map((img) => (
                              <img
                                key={img.id || img.url}
                                src={img.url}
                                alt=""
                                style={{
                                  width: "100%",
                                  height: 120,
                                  objectFit: "cover",
                                  borderRadius: 8,
                                  display: "block",
                                }}
                              />
                            ))}
                          </div>
                        )}
                      </VerticalTimelineElement>
                    );
                  }
                });

              return nodes;
            })()}
          </VerticalTimeline>
        </div>

        {/* ===== Modale ADD ===== */}
        {showAdd && !readOnly && (
          <div
            className="ModalOverlay"
            role="dialog"
            aria-modal="true"
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(15,23,42,.50)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "24px",
              zIndex: 9999,
              overflow: "hidden",
            }}
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowAdd(false);
            }}
            onWheel={(e) => {
              if (e.target === e.currentTarget) e.preventDefault();
            }}
            onTouchMove={(e) => {
              if (e.target === e.currentTarget) e.preventDefault();
            }}
          >
            <div
              className="Modal"
              style={{
                width: "clamp(560px, 68vw, 920px)",
                height: "min(84vh, 760px)",
                minHeight: "440px",
                background: "#fff",
                borderRadius: 16,
                boxShadow: "0 20px 50px rgba(0,0,0,.25)",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* head (sticky) */}
              <div
                className="Modal__head"
                style={{
                  position: "sticky",
                  top: 0,
                  zIndex: 1,
                  background: "#fff",
                  borderBottom: "1px solid #E5E7EB",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px 16px",
                }}
              >
                <strong>Nouvel évènement timeline</strong>
                <div style={{ display: "flex", gap: 8 }}>
                  <button className="IconBtn" onClick={() => setShowAdd(false)} title="Fermer">
                    <IconClose />
                  </button>
                </div>
              </div>

              {/* corps = seul scroll */}
              <div
                className="Modal__body"
                style={{
                  flex: 1,
                  overflow: "auto",
                  padding: "14px 16px",
                  display: "grid",
                  gap: 12,
                  overscrollBehavior: "contain",
                  position: "relative",
                }}
              >


                {/* === Recherche / création (STICKY) === */}
                <div
                  className="SearchSticky"
                  style={{
                    position: "sticky",
                    top: 0,
                    zIndex: 2,
                    background: "#fff",
                    padding: "8px 0 10px",
                    marginBottom: 8,
                    borderBottom: "1px solid #F1F5F9",
                  }}
                >
                  <div style={{ position: "relative" }}>
                    <input
                      className="Input md"
                      placeholder="Rechercher une étape, une carte ou un template… (ou taper un nouveau nom)"
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setSearchOpen(true);
                      }}
                      onFocus={() => setSearchOpen(true)}
                    />

                    {searchOpen && matches?.length > 0 && (
                      <ul
                        className="Dropdown"
                        style={{
                          position: "absolute",
                          top: "calc(100% + 6px)",
                          left: 0,
                          right: 0,
                          zIndex: 3,
                          background: "#fff",
                          border: "1px solid #E5E7EB",
                          borderRadius: 10,
                          padding: 6,
                          maxHeight: "min(38vh, 260px)",
                          overflowY: "auto",
                          overscrollBehavior: "contain",
                          boxShadow: "0 12px 28px rgba(0,0,0,.12)",
                          willChange: "transform",
                        }}
                        onWheel={(e) => e.stopPropagation()}
                        onTouchMove={(e) => e.stopPropagation()}
                      >
                        {matches.map((opt) => {
                          const t = { solid: opt.color || "#2563EB" };
                          return (
                            <li key={`${opt.kind}-${opt.id}-${opt.label}`} style={{ listStyle: "none" }}>
                              <button
                                type="button"
                                className="Dropdown__item"
                                onClick={() => selectOption(opt)}
                                onMouseDown={(e) => e.preventDefault()}
                                style={{
                                  width: "100%",
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 8,
                                  padding: "8px 10px",
                                  borderRadius: 6,
                                  background: "#fff",
                                  border: "none",
                                  boxShadow: "none",
                                  outline: "none",
                                  lineHeight: 1.2,
                                  cursor: "pointer",
                                }}
                              >
                                <span
                                  style={{
                                    width: 10,
                                    height: 10,
                                    borderRadius: 999,
                                    background: t.solid,
                                    border: `1px solid ${t.solid}`,
                                    flex: "0 0 auto",
                                  }}
                                />
                                <span style={{ flex: 1, textAlign: "left", color: "#0B1220", fontSize: 14 }}>
                                  {opt.label}
                                </span>
                                <small style={{ opacity: 0.6, fontSize: 12 }}>
                                  {opt.kind === "etape"
                                    ? "Étape"
                                    : opt.kind === "template"
                                    ? `Template${opt.steps_count ? ` • ${opt.steps_count}` : ""}`
                                    : opt.kind === "card"
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

                {/* Formulaires (le type est déduit via recherche/autofill) */}
                {/* Étape simple (par défaut si rien/nouveau) */}
                {selectedKind !== "template" && selectedKind !== "card" && (
                  <div style={{ display: "grid", gap: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                      <span
                        style={{
                          width: 16,
                          height: 16,
                          borderRadius: 999,
                          background: addColor,
                          border: `1px solid ${addColor}`,
                        }}
                      />
                      <input
                        className="Input md"
                        placeholder="Titre de l’étape"
                        value={addTitle}
                        onChange={(e) => setAddTitle(e.target.value)}
                        style={{ border: `1px solid ${addColor}`, flex: "1 1 360px" }}
                      />
                      <input
                        type="color"
                        value={addColor}
                        onChange={(e) => setAddColor(e.target.value)}
                        title="Choisir une couleur"
                        style={{ width: 36, height: 36, padding: 0, border: "none", background: "transparent" }}
                      />
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                      <label style={{ fontSize: 12, opacity: 0.8, minWidth: 140 }}>Date de l’étape</label>
                      <input className="Input md" type="date" value={addDate} onChange={(e) => setAddDate(e.target.value)} />
                    </div>
                  </div>
                )}

                {/* Carte simple */}
                {selectedKind === "card" && (
                  <div style={{ display: "grid", gap: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                      <span
                        style={{
                          width: 16,
                          height: 16,
                          borderRadius: 999,
                          background: addColor,
                          border: `1px solid ${addColor}`,
                        }}
                      />
                      <input
                        className="Input md"
                        placeholder="Titre de la carte"
                        value={addTitle}
                        onChange={(e) => setAddTitle(e.target.value)}
                        style={{ border: `1px solid ${addColor}`, flex: "1 1 360px" }}
                      />
                      <input
                        type="color"
                        value={addColor}
                        onChange={(e) => setAddColor(e.target.value)}
                        title="Choisir une couleur"
                        style={{ width: 36, height: 36, padding: 0, border: "none", background: "transparent" }}
                      />
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                      <label style={{ fontSize: 12, opacity: 0.8, minWidth: 140 }}>Date de la carte</label>
                      <input className="Input md" type="date" value={addDate} onChange={(e) => setAddDate(e.target.value)} />
                    </div>

                    <textarea
                      className="Input md"
                      rows={4}
                      placeholder="Description (optionnel)"
                      value={addDescription}
                      onChange={(e) => setAddDescription(e.target.value)}
                    />
                  </div>
                )}

                {/* Template multi-étapes */}
                {selectedKind === "template" && templatePlan.length > 0 && (
                  <div style={{ display: "grid", gap: 14 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                      <span
                        style={{
                          width: 16,
                          height: 16,
                          borderRadius: 999,
                          background: addColor,
                          border: `1px solid ${addColor}`,
                        }}
                      />
                      <input
                        className="Input md"
                        placeholder="Titre du template (facultatif)"
                        value={addTitle}
                        onChange={(e) => setAddTitle(e.target.value)}
                        style={{ border: `1px solid ${addColor}`, flex: "1 1 360px" }}
                      />
                    </div>

                    <div style={{ display: "grid", gap: 8 }}>
                      {templatePlan.map((st, i) => (
                        <div
                          key={i}
                          style={{
                            display: "grid",
                            gridTemplateColumns: "36px 1fr 110px 180px",
                            alignItems: "center",
                            gap: 8,
                          }}
                        >
                          <span style={{ fontWeight: 600 }}>{i + 1}.</span>
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <span
                              style={{
                                width: 12,
                                height: 12,
                                borderRadius: 999,
                                background: st.color,
                                border: `1px solid ${st.color}`,
                              }}
                            />
                            <span>{st.label}</span>
                          </div>
                          <span style={{ fontSize: 12, opacity: 0.8 }}>
                            {Number(st.duree || 0) > 0 ? `+${Number(st.duree)} j` : "±0 j"}
                          </span>
                          <input
                            className="Input md"
                            type="date"
                            value={st.date || ""}
                            onChange={(e) => {
                              const v = e.target.value;
                              if (i === 0) {
                                setAddDate(v);
                                setTemplatePlan((old) => recomputePlanFromFirst(v, old));
                              } else {
                                setTemplatePlan((old) => {
                                  const next = [...old];
                                  next[i] = { ...next[i], date: v };
                                  return next;
                                });
                              }
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* pied */}
              <div
                className="Modal__foot"
                style={{
                  position: "sticky",
                  bottom: 0,
                  zIndex: 1,
                  background: "#fff",
                  borderTop: "1px solid #E5E7EB",
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 8,
                  padding: "10px 16px",
                }}
              >
                <button className="Btn Btn--ghost" onClick={() => setShowAdd(false)}>
                  Annuler
                </button>
                <button
                  className="Btn"
                  onClick={handleAddConfirm}
                  disabled={
                    busy ||
                    (selectedKind === "template" && (templatePlan.length === 0 || templatePlan.some((s) => !s.date))) ||
                    (selectedKind === "card" && (!addTitle.trim() || !addDate)) ||
                    (selectedKind !== "template" && selectedKind !== "card" && (!addTitle.trim() || !addDate))
                  }
                >
                  Ajouter à la timeline
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ===== Modale EDIT — plein écran (sans choix de type) ===== */}
        {editOpen && (
          <div
            className="ModalOverlay"
            role="dialog"
            aria-modal="true"
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(15,23,42,.50)",
              display: "flex",
              alignItems: "stretch",
              justifyContent: "stretch",
              padding: 0,
              zIndex: 9999,
            }}
            onClick={(e) => {
              if (e.target === e.currentTarget) setEditOpen(false);
            }}
          >
            <div
              className="Modal"
              style={{
                width: "100vw",
                height: "100vh",
                background: "#fff",
                borderRadius: 0,
                boxShadow: "0 0 0 rgba(0,0,0,0)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                className="Modal__head"
                style={{
                  position: "sticky",
                  top: 0,
                  zIndex: 1,
                  background: "#fff",
                  borderBottom: "1px solid #E5E7EB",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "16px 20px",
                }}
              >
                <strong>Modifier l’élément</strong>
                <button className="IconBtn" onClick={() => setEditOpen(false)} title="Fermer">
                  <IconClose />
                </button>
              </div>

              <div className="Modal__body" style={{ flex: 1, overflow: "auto", padding: "16px 20px", display: "grid", gap: 12 }}>
                <div style={{ position: "relative" }}>
                  <input className="Input md" placeholder="Titre" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                </div>

                <textarea
                  className="Input md"
                  rows={4}
                  placeholder="Description (optionnel)"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                />

                <div style={{ display: "grid", gap: 8 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, flexWrap: "wrap" }}>
                    <label style={{ fontWeight: 600 }}>Images</label>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={async (e) => {
                        const files = Array.from(e.target.files || []);
                        if (files.length === 0) return;
                        const toDataURL = (f) =>
                          new Promise((resolve, reject) => {
                            const r = new FileReader();
                            r.onload = () => resolve({ id: cryptoRandomId(), url: String(r.result) });
                            r.onerror = reject;
                            r.readAsDataURL(f);
                          });
                        const uploaded = [];
                        for (const f of files) {
                          uploaded.push(await toDataURL(f));
                        }
                        setEditImages((old) => [...(old || []), ...uploaded]);
                        e.target.value = "";
                      }}
                    />
                  </div>

                  {Array.isArray(editImages) && editImages.length > 0 && (
                    <div className="TLImages" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: 8 }}>
                      {editImages.map((img) => (
                        <div key={img.id || img.url} style={{ position: "relative" }}>
                          <img
                            src={img.url}
                            alt=""
                            style={{ width: "100%", height: 120, objectFit: "cover", borderRadius: 8, display: "block" }}
                          />
                          <button
                            type="button"
                            className="IconBtn"
                            title="Supprimer"
                            onClick={() => setEditImages((old) => (old || []).filter((x) => (x.id || x.url) !== (img.id || img.url)))}
                            style={{ position: "absolute", top: 6, right: 6, background: "rgba(0,0,0,.5)", color: "#fff", borderRadius: 6 }}
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div
                className="Modal__foot"
                style={{
                  position: "sticky",
                  bottom: 0,
                  zIndex: 1,
                  background: "#fff",
                  borderTop: "1px solid #E5E7EB",
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 8,
                  padding: "12px 20px",
                }}
              >
                <button className="Btn Btn--ghost" onClick={() => setEditOpen(false)}>
                  Annuler
                </button>
                <button className="Btn" onClick={saveEdit} disabled={!editTitle.trim()}>
                  Enregistrer
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ===== Styles locaux ===== */}
        <style>{`
          .TLDateBlack { color:#0B1220 !important; font-weight:600; }

          /* Actions visibles au hover */
          .vertical-timeline-element-content .TLCardActions {
            opacity:0; transform: translateY(-2px); pointer-events:none;
            transition:opacity .18s ease, transform .18s ease;
          }
          .vertical-timeline-element-content:hover .TLCardActions {
            opacity:1; transform: translateY(0); pointer-events:auto;
          }
          .StepFlagEl .TLFlagActions {
            opacity:0; transform: translateY(-2px); pointer-events:none;
            transition:opacity .18s ease, transform .18s ease;
            display:inline-flex; gap:8px; margin-left:4px;
          }
          .StepFlagEl:hover .TLFlagActions { opacity:1; transform: translateY(0); pointer-events:auto; }

          /* Largeur des cards en 2 colonnes */
          .vertical-timeline.vertical-timeline--two-columns .vertical-timeline-element-content {
            width: calc(50% - 10px) !important;
          }
          @media (max-width: 1370px) {
            .vertical-timeline.vertical-timeline--two-columns .vertical-timeline-element-content { width: 100% !important; }
          }

          /* UI utilitaires */
          .Panel { background:#fff; border:1px solid #E5E7EB; border-radius:14px; box-shadow: 0 10px 30px rgba(2,6,23,.04); overflow:hidden; }
          .Panel--compact .Panel__header { padding:10px 12px; }
          .Panel__header { display:flex; align-items:center; justify-content:space-between; padding:14px 16px; border-bottom:1px solid #E5E7EB; font-weight:700; text-transform:lowercase; color:#0B1220; }
          .IconBtn { background:#F1F5F9; border:1px solid #E2E8F0; border-radius:8px; padding:6px 8px; cursor:pointer; }
          .IconBtn:hover { background:#E2E8F0; }
          .IconBtn--plus { width:32px; height:32px; display:grid; place-items:center; }
          .Input { width:100%; border:1px solid #E2E8F0; border-radius:10px; padding:10px 12px; background:#fff; }
          .Input:focus { outline:none; border-color:#93C5FD; box-shadow:0 0 0 3px rgba(147,197,253,.35); }
          .Btn { background:#2563EB; color:#fff; border:none; border-radius:10px; padding:10px 14px; font-weight:600; cursor:pointer; }
          .Btn:disabled { opacity:.6; cursor:not-allowed; }
          .Btn--ghost { background:#fff; color:#0B1220; border:1px solid #E2E8F0; }
          .Btn--sm { padding:6px 10px; font-size:12px; }
          .Dropdown__item:hover { background:#F8FAFC; }
        `}</style>
      </section>

      {/* === SECTION CHARTS (placeholder) === */}
      <section
        className="Panel"
        style={{
          gridArea: "charts",
          marginTop: chartsOpen ? -180 : -40,
          height: chartsOpen ? 200 : 80,
          transition: "margin-top .24s ease",
        }}
      >
        <header
          className={`Panel__header is-toggle ${chartsOpen ? "is-open" : ""}`}
          onClick={onToggleCharts}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " " ? onToggleCharts() : null)}
          aria-expanded={chartsOpen}
          aria-controls="charts-content"
          title={chartsOpen ? "Réduire" : "Déplier"}
        >
          <span>charts</span>
          <button type="button" className="PanelChevron" aria-hidden="true" tabIndex={-1}>
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </header>

        <div
          id="charts-content"
          style={{
            height: chartsOpen ? 350 : 0,
            overflowY: chartsOpen ? "auto" : "hidden",
            transition: "height .24s ease",
          }}
        >
          <div style={{ minHeight: 0 }}>
            <div className="ChartsArea" style={{ padding: 16, color: "#64748B" }}>
              <div
                className="BigChart"
                style={{
                  height: 300,
                  border: "1px dashed #E2E8F0",
                  borderRadius: 12,
                  display: chartsOpen ? "grid" : "none",
                  placeItems: "center",
                }}
              >
                <div>Place ton graphique ici (ex: Recharts)</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
