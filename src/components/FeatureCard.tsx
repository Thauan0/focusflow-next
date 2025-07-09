// src/components/sections/FeatureCard.tsx (COM A NOVA ESTRUTURA)

import React from 'react';
import { LucideIcon } from 'lucide-react';
import styles from './FeatureCard.module.css'; // Vamos usar o novo CSS

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  children?: React.ReactNode;
}

export function FeatureCard({ icon: IconComponent, title, children }: FeatureCardProps) {
  return (
    // O contêiner principal do card, que é posicionado relativamente
    <div className={styles.card}>
      
      {/* As três ondas animadas que ficam no fundo */}
      <div className={styles.wave}></div>
      <div className={styles.wave}></div>
      <div className={styles.wave}></div>

      {/* 
        O contêiner do conteúdo, com z-index para ficar sobre as ondas.
        Ele contém o ícone, o título e qualquer conteúdo filho (como o timer ou a sugestão dinâmica).
      */}
      <div className={styles.content}>
        <IconComponent className={styles.icon} />
        <h3 className={styles.title}>{title}</h3>
        
        {/* Renderiza o conteúdo dinâmico (children) se ele existir */}
        {children && (
          <div className={styles.childrenWrapper}>
            {children}
          </div>
        )}
      </div>
    </div>
  );
}