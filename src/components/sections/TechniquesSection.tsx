// src/components/sections/TechniquesSection.tsx (ATUALIZADO COM CSS MODULES)

'use client';

import { useState } from 'react';
import { Technique } from '@/types';
import { getTechnique } from '@/lib/api';
import { motion } from 'framer-motion';
import styles from './TechniquesSection.module.css'; // 1. Importar o nosso novo arquivo CSS

interface TechniquesSectionProps {
  initialTechnique: Technique;
}

export function TechniquesSection({ initialTechnique }: TechniquesSectionProps) {
  const [technique, setTechnique] = useState(initialTechnique);
  const [isLoading, setIsLoading] = useState(false);

  const fetchNewTechnique = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const newTechnique = await getTechnique();
      setTechnique(newTechnique);
    } catch (error) {
      console.error("Falha ao buscar nova técnica:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 2. Substituir todas as classes do Tailwind pelas classes do 'styles'
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Domine Novas Técnicas</h2>
      
      <motion.div
        key={technique.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={styles.card}
      >
        <h3 className={styles.cardTitle}>{technique.name}</h3>
        <p className={styles.cardDescription}>{technique.description}</p>
      </motion.div>

      <button
        onClick={fetchNewTechnique}
        disabled={isLoading}
        className={styles.button}
      >
        {isLoading ? 'Buscando...' : 'Me ensine outra'}
      </button>
    </section>
  );
}