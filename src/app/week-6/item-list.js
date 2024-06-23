// /app/week-6/item-list.js
'use client';

import { useState } from 'react';
import Item from './item';
import styles from './item-list.module.css';

export default function ItemList({ items }) {
  const [sortBy, setSortBy] = useState('name');

  const sortedItems = [...items].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'category') {
      return a.category.localeCompare(b.category);
    }
    return 0;
  });

  const groupedItems = sortedItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div>
      <div className={styles.sortButtons}>
        <span>Sort by:</span>
        <button
          onClick={() => setSortBy('name')}
          className={`${styles.button} ${sortBy === 'name' ? styles.active : ''}`}
        >
          Name
        </button>
        <button
          onClick={() => setSortBy('category')}
          className={`${styles.button} ${sortBy === 'category' ? styles.active : ''}`}
        >
          Category
        </button>
        <button
          onClick={() => setSortBy('group')}
          className={`${styles.button} ${sortBy === 'group' ? styles.active : ''}`}
        >
          Grouped Category
        </button>
      </div>
      {sortBy === 'group' ? (
        Object.keys(groupedItems).map((category) => (
          <div key={category}>
            <h2 className={styles.categoryHeader}>{category}</h2>
            <ul>
              {groupedItems[category].map((item) => (
                <Item
                  key={item.id}
                  name={item.name}
                  quantity={item.quantity}
                  category={item.category}
                />
              ))}
            </ul>
          </div>
        ))
      ) : (
        <ul className={styles.itemList}>
          {sortedItems.map((item) => (
            <Item
              key={item.id}
              name={item.name}
              quantity={item.quantity}
              category={item.category}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
