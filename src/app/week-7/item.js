// /app/week-6/item.js
import React from 'react';
import styles from "./item.module.css";

export default function Item({ name, quantity, category, onSelect }) {
  return (
    <li className={styles.item} onClick={() => onSelect(name)}>
      <div className={styles.itemName}>{name}</div>
      <div className={styles.itemDetails}>
        Buy {quantity} in {category}
      </div>
    </li>
  );
}
