// src/components/sections/HeroSection.tsx (ATUALIZADO)

'use client';
import styles from './HeroSection.module.css';
import { motion } from 'framer-motion';

type Quote = {
  text: string;
  author: string;
} | null;

interface HeroSectionProps {
  quote: Quote;
}

export function HeroSection({ quote }: HeroSectionProps) {
  const handleScrollToFeatures = () => {
    const featuresSection = document.getElementById('features-section');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    // 1. A seção principal agora é o contêiner relativo
    <section className={styles.hero}>
      
      {/* 2. Adicionamos as ondas animadas exatamente como no FeatureCard */}
      <div className={styles.wave}></div>
      <div className={styles.wave}></div>
      <div className={styles.wave}></div>

      {/* 3. O conteúdo principal fica em um contêiner com z-index para ficar na frente */}
      <motion.div
        className={styles.contentWrapper}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <h1 className={styles.title}>
          Onde a Produtividade
          <br />
          Encontra a Serenidade
        </h1>
        <button onClick={handleScrollToFeatures} className={styles.ctaButton}>
          Inicie
        </button>

        {quote && (
          <motion.blockquote
            className={styles.quote}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <p className={styles.quoteText}>"{quote.text}"</p>
            <footer className={styles.quoteAuthor}>— {quote.author}</footer>
          </motion.blockquote>
        )}
      </motion.div>
    </section>
  );
}