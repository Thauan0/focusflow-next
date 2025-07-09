// src/components/sections/BreakSuggestionSection.tsx

'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Coffee } from 'lucide-react';
import { BreakSuggestion } from '@/types'; // Certifique-se de que este tipo existe em 'types.ts'
import { getBreakSuggestion } from '@/lib/api';
import styles from './BreakSuggestionSection.module.css';

interface BreakSuggestionSectionProps {
  initialSuggestion: BreakSuggestion;
}

export function BreakSuggestionSection({ initialSuggestion }: BreakSuggestionSectionProps) {
  const [suggestion, setSuggestion] = useState(initialSuggestion);
  const [isLoading, setIsLoading] = useState(false);

  const fetchNewSuggestion = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const newSuggestion = await getBreakSuggestion();
      setSuggestion(newSuggestion);
    } catch (error) {
      console.error("Falha ao buscar nova sugestão de pausa:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.backgroundGradient} />
      <div className={styles.header}>
        <div className={styles.iconWrapper}>
          <Coffee size={32} className={styles.headerIcon} />
        </div>
        <h2 className={styles.title}>É Hora de uma Pausa</h2>
      </div>

      <motion.div
        key={suggestion.id}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className={styles.card}
      >
        <p className={styles.suggestionText}>"{suggestion.suggestion}"</p>
        <button
          onClick={fetchNewSuggestion}
          disabled={isLoading}
          className={styles.button}
        >
          {isLoading ? 'Hmm...' : 'Outra sugestão'}
        </button>
      </motion.div>
    </section>
  );
}