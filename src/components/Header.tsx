// src/components/Header.tsx
import styles from './Header.module.css';
import { ThemeToggle } from './ThemeToggle';

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          Focus
        </div>
        <nav>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}