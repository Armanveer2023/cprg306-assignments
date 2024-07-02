import Link from "next/link";
import styles from "./week-5/page.module.css";

export default function HomePage() {
  return (
    <main className={styles.main}>
      <h1>Shopping List</h1>
      <ul className={styles.linkList}>
        
        <li>
          <Link href="/week-4">week-4</Link>
        </li>
        <li>
          <Link href="/week-5">week-3</Link>
        </li>
        <li>
          <Link href="/week-6">week-3</Link>
        </li>
         <Link href="/week-7">week-7</Link>
      </ul>
    </main>
  );
}
