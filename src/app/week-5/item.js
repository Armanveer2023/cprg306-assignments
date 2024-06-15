import styles from "./item.module.css";

export default function Item({ name, quantity, category }) {
  return (
    <li className={styles.item}>
      <div className={styles.itemName}>{name}</div>
      <div className={styles.itemDetails}>
        Buy {quantity} in {category}
      </div>
    </li>
  );
}
