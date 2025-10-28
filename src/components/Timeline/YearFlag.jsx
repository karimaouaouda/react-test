import React from "react";
import { VerticalTimelineElement } from "react-vertical-timeline-component";
import { hexToRgba, getEventColorTone } from "../../utils/colorUtils";
import styles from "./Timeline.module.css";

/**
 * YearFlag component - Display year separator in timeline
 */
const YearFlag = ({ year, color }) => {
  const tone = { solid: color || "#2563EB" };
  
  return (
    <VerticalTimelineElement
      icon={<strong style={{ fontSize: 12, lineHeight: 1 }}>{year}</strong>}
      dateClassName={styles.tlDateBlack}
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
};

export default YearFlag;
