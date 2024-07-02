// /app/week-6/page.js
'use client';

import { useState } from 'react';
import ItemList from './item-list';
import NewItem from './new-item';
import MealIdeas from './meal-ideas';
import styles from './page.module.css';
import itemsData from './items.json';

export default function Page() {
  const [items, setItems] = useState(itemsData);
  const [selectedItemName, setSelectedItemName] = useState('');

  const handleAddItem = (item) => {
    const newItem = { id: items.length + 1, ...item };
    setItems([...items, newItem]);
  };

  const handleItemSelect = (itemName) => {
    const cleanName = itemName
      .split(',')[0]
      .trim()
      .replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '');
    setSelectedItemName(cleanName);
  };

  return (
    <main className={styles.main}>
      <h1 className={styles.header}>Shopping List</h1>
      <NewItem onAddItem={handleAddItem} />
      <br />
      <div className={styles.container}>
        <div className={styles.leftColumn}>
          <ItemList items={items} onItemSelect={handleItemSelect} />
        </div>
        <div className={styles.rightColumn}>
          <MealIdeas ingredient={selectedItemName} />
        </div>
      </div>
    </main>
  );
}
