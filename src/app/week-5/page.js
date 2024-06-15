import ItemList from "./item-list";
import styles from "./page.module.css";

export default function Page() {
  return (
    <main className={styles.main}>
      <h1 className={styles.header}>Shopping List</h1>
      <ItemList />
    </main>
  );
}
