'use client';

import { useEffect, useState } from 'react';
import { useTheme } from './../hooks/useTheme';
import styles from './ThemeSwitch.module.css';
import { Icon } from '@iconify/react';
import sunIcon from '@iconify-icons/feather/sun';
import moonIcon from '@iconify-icons/feather/moon';

const ThemeSwitch = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if(isDarkMode === true) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  }, []);

  const handleToggle = () => {
    toggleTheme();
    setIsChecked((prev) => !prev);
  };

  return (
    
    <div className={styles.btnContainer}>

    <label className={styles.label}>
      <input
        className={styles.toggleCheckbox}
        type="checkbox"
        onChange={handleToggle}
        checked={isChecked}
      />
      <div className={styles.toggleSlot}>
        <div className={styles.sunIconWrapper}>
          <Icon icon={sunIcon} className={styles.sunIcon} />
        </div>
        <div className={styles.toggleButton}></div>
        <div className={styles.moonIconWrapper}>
          <Icon icon={moonIcon} className={styles.moonIcon} />
        </div>
      </div>
    </label>
    </div>
  );
};

export default ThemeSwitch;
