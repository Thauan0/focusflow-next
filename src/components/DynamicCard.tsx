// src/components/sections/DynamicCard.tsx (VERSÃO FINAL)

'use client';
import { useState, useEffect } from 'react';
import { FeatureCard } from './FeatureCard';
import { LucideIcon } from 'lucide-react';
import { Technique } from '@/types'; // 1. Importar o tipo Technique completo
import styles from './DynamicCard.module.css';

interface DynamicCardProps {
  icon: LucideIcon;
  title: string;
  // 2. O fetcher agora deve retornar uma Promise com o objeto Technique
  fetcher: () => Promise<Technique>;
}

export function DynamicCard({ icon, title, fetcher }: DynamicCardProps) {
  // 3. O estado agora guarda o objeto Technique inteiro, ou null
  const [technique, setTechnique] = useState<Technique | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    if (isLoading && technique) return;
    setIsLoading(true);
    try {
      const data = await fetcher();
      setTechnique(data);
    } catch (error) {
      console.error("Falha ao buscar técnica para o card:", error);
      // Limpa a técnica em caso de erro para não mostrar dados antigos
      setTechnique(null); 
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <FeatureCard icon={icon} title={title}>
      <div className={styles.contentWrapper}>
        {/* 4. Renderização condicional baseada no estado */}
        {isLoading && !technique && <p className={styles.description}>Buscando sugestão...</p>}
        
        {technique && (
          // Usamos a key para re-animar o conteúdo quando a técnica mudar
          <div key={technique.id} className={styles.techniqueContent}> 
            <h4 className={styles.techniqueName}>{technique.name}</h4>
            <p className={styles.description}>{technique.description}</p>
          </div>
        )}

        {!isLoading && !technique && <p className={styles.description}>Não foi possível buscar uma sugestão. Tente novamente.</p>}

        <button
          onClick={fetchData}
          disabled={isLoading}
          className={styles.actionButton}
        >
          {isLoading ? 'Buscando...' : 'Nova Sugestão'}
        </button>
      </div>
    </FeatureCard>
  );
}