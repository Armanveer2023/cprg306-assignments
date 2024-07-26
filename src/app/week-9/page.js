// /app/week-9/page.js
'use client';

import { useState, useEffect } from 'react';
import ItemList from './item-list';
import NewItem from './new-item';
import MealIdeas from './meal-ideas';
import styles from './page.module.css';
import { useUserAuth } from './_utils/auth_context';
import { getItems, addItem, deleteItem } from './_services/shopping-list-service';

export default function Page() {
  const [items, setItems] = useState([]);
  const [selectedItemName, setSelectedItemName] = useState('');
  const { user, gitHubSignIn, firebaseSignOut, loading } = useUserAuth();

  useEffect(() => {
    const loadItems = async () => {
      if (user) {
        const fetchedItems = await getItems(user.uid);
        setItems(fetchedItems);
      }
    };
    loadItems();
  }, [user]);

  const handleAddItem = async (item) => {
    if (user) {
      const newItemId = await addItem(user.uid, item);
      const newItem = { id: newItemId, ...item };
      setItems([...items, newItem]);
    }
  };

  const handleDeleteItem = async (itemId) => {
    if (user) {
      await deleteItem(user.uid, itemId);
      setItems(items.filter(item => item.id !== itemId));
    }
  };

  const handleItemSelect = (itemName) => {
    const cleanName = itemName
      .split(',')[0]
      .trim()
      .replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '');
    setSelectedItemName(cleanName);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <main className={styles.main}>
      <h1 className={styles.header}>Shopping List</h1>
      {!user ? (
        <div className={styles.authContainer}>
          <button onClick={gitHubSignIn} className={styles.githubButton}>
            Sign in with GitHub
          </button>
        </div>
      ) : (
        <>
          <button onClick={firebaseSignOut} className={styles.signOutButton}>
            Sign Out
          </button>
          <NewItem onAddItem={handleAddItem} />
          <br />
          <div className={styles.container}>
            <div className={styles.leftColumn}>
              <ItemList items={items} onItemSelect={handleItemSelect} onDeleteItem={handleDeleteItem} />
            </div>
            <div className={styles.rightColumn}>
              <MealIdeas ingredient={selectedItemName} />
            </div>
          </div>
        </>
      )}
    </main>
  );
}
