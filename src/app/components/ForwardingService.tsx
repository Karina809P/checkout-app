"use client";

import React from "react";
import styles from "./ForwardingService.module.scss";

interface ForwardingServiceProps {
  enabled: boolean;
  onToggle: () => void;
}

const ForwardingService: React.FC<ForwardingServiceProps> = ({ enabled, onToggle }) => {
  return (
    <div className={styles.forwarding}>
      <label className={styles.label}>Forwarding service</label>
      <div className={styles.switchWrapper}>
        <input
          type="checkbox"
          id="forwardingSwitch"
          className={styles.switchInput}
          checked={enabled}
          onChange={onToggle}
        />
        <label htmlFor="forwardingSwitch" className={styles.switchSlider} />
      </div>
    </div>
  );
};

export default ForwardingService;
