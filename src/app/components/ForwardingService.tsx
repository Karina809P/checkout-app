'use client';

import React, { useState } from 'react';
import styles from './ForwardingService.module.scss';

const ForwardingService = () => {
  const [enabled, setEnabled] = useState(false);

  const toggleSwitch = () => {
    setEnabled((prev) => !prev);
  };

  return (
    <div className={styles.forwarding}>
      <label className={styles.label}>Forwarding service</label>
      <div className={styles.switchWrapper}>
        <input
          type="checkbox"
          id="forwardingSwitch"
          className={styles.switchInput}
          checked={enabled}
          onChange={toggleSwitch}
        />
        <label htmlFor="forwardingSwitch" className={styles.switchSlider} />
      </div>
    </div>
  );
};

export default ForwardingService;
