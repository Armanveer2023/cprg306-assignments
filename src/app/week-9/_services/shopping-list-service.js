// /app/week-9/_services/shopping-list-service.js
import { db } from "../_utils/firebase";
import { collection, getDocs, addDoc, query, where } from "firebase/firestore";

export const getItems = async (userId) => {
  const items = [];
  const itemsRef = collection(db, "users", userId, "items");
  const q = query(itemsRef);
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    items.push({ id: doc.id, ...doc.data() });
  });
  return items;
};

export const addItem = async (userId, item) => {
  const itemsRef = collection(db, "users", userId, "items");
  const docRef = await addDoc(itemsRef, item);
  return docRef.id;
};

