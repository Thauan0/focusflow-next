// src/components/sections/FeaturesSection.tsx (ATUALIZADO)

'use client';
import { useState } from 'react';
import styles from './FeaturesSection.module.css';
import { Timer, BrainCircuit, ClipboardList } from 'lucide-react';

// Componentes
import { FeatureCard } from './FeatureCard';
import { PomodoroTimer } from './PomodoroTimer';
import { DynamicCard } from './DynamicCard';
import { TodoListPanel } from './TodoListModal'; // Importa nosso novo painel
import { getTechnique } from '@/lib/api';

export function FeaturesSection() {
  const [isTodoListOpen, setTodoListOpen] = useState(false);

  return (
    // Usamos um fragmento para poder renderizar a seção e o painel como irmãos
    <> 
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h2 className={styles.headerTitle}>Tudo o que você precisa para focar</h2>
            <p className={styles.headerSubtitle}>Ferramentas desenhadas para máxima produtividade.</p>
          </div>
          
          <div className={styles.grid}>
            <FeatureCard icon={Timer} title="Sessões Pomodoro">
              <PomodoroTimer />
            </FeatureCard>

            <DynamicCard
              icon={BrainCircuit}
              title="Técnicas de Foco"
              fetcher={getTechnique} 
            />

            {/* Este card agora tem um onClick para abrir o painel */}
            <div onClick={() => setTodoListOpen(true)} style={{ cursor: 'pointer' }}>
              <FeatureCard
                icon={ClipboardList}
                title="Lista de Tarefas"
              />
            </div>
          </div>
        </div>
      </section>

      {/* O Painel é renderizado aqui, fora da seção, para facilitar o posicionamento fixed */}
      <TodoListPanel 
        isOpen={isTodoListOpen} 
        onClose={() => setTodoListOpen(false)} 
      />
    </>
  );
}