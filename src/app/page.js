import Link from "next/link";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <main className={styles.main}>
      <h1>Shopping List</h1>
      <ul className={styles.linkList}>
        <li>
          <Link href="/week-3">Week 3</Link>
        </li>
        <li>
          <Link href="/week-5">Week 5</Link>
        </li>
      </ul>
    </main>
  );
}
