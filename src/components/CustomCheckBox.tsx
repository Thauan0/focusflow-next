// src/components/sections/CustomCheckbox.tsx

import React from 'react';
import styles from './CustomCheckBox.module.css';

interface CustomCheckboxProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: () => void;
}

export function CustomCheckbox({ id, label, checked, onChange }: CustomCheckboxProps) {
  const uniqueId = `cbx-${id}`;
  return (
    <div className={styles.checkboxWrapper}>
      <input 
        id={uniqueId} 
        className={styles.inpCbx} 
        type="checkbox" 
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={uniqueId} className={styles.cbx}>
        {/* O círculo e a animação do check */}
        <span>
          <svg width="12px" height="9px" viewBox="0 0 12 9">
            <polyline points="1 5 4 8 11 1"></polyline>
          </svg>
        </span>
        {/* O texto da tarefa */}
        <span>{label}</span>
      </label>
    </div>
  );
}