// /app/week-6/page.js
'use client';

import { useState } from 'react';
import ItemList from './item-list';
import NewItem from './new-item';
import styles from './page.module.css';
import itemsData from './items.json';

export default function Page() {
  const [items, setItems] = useState(itemsData);

  const handleAddItem = (item) => {
    const newItem = { id: items.length + 1, ...item };
    setItems([...items, newItem]);
  };

  return (
    <main className={styles.main}>
      <h1 className={styles.header}>Shopping List</h1>
      <NewItem onAddItem={handleAddItem} />
      <br />
      <ItemList items={items} />
    </main>
  );
}
