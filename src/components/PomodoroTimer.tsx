// src/components/PomodoroTimer.tsx
'use client';
import { useState, useEffect, useRef } from 'react';
import styles from './PomodoroTimer.module.css'; // Vamos criar este arquivo
import { Play, Pause, RotateCcw } from 'lucide-react';

export function PomodoroTimer() {
  // Estado para o tempo restante, em segundos
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  // Estado para saber se o timer está rodando
  const [isActive, setIsActive] = useState(false);
  // Estado para o modo atual (Foco ou Pausa)
  const [mode, setMode] = useState<'work' | 'break'>('work');

  // useRef para manter a referência do intervalo mesmo quando o componente re-renderiza
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Efeito que controla o timer
  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime >= 1) {
            return prevTime - 1;
          }
          // Quando o tempo chega a zero, para o timer e reseta
          resetTimer();
          return 0;
        });
      }, 1000);
    } else {
      // Limpa o intervalo se o timer for pausado
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    // Função de limpeza para quando o componente for desmontado
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive]);

  // Funções de controle
  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsActive(false);
    // Reseta para o tempo do modo atual
    setTimeLeft(mode === 'work' ? 25 * 60 : 5 * 60);
  };

  const switchMode = (newMode: 'work' | 'break') => {
    setMode(newMode);
    setIsActive(false);
    setTimeLeft(newMode === 'work' ? 25 * 60 : 5 * 60);
  }

  // Formatação do tempo para MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={styles.timerContainer}>
      <div className={styles.modeButtons}>
        <button 
          onClick={() => switchMode('work')} 
          className={`${styles.modeButton} ${mode === 'work' ? styles.active : ''}`}
        >
          Foco
        </button>
        <button 
          onClick={() => switchMode('break')} 
          className={`${styles.modeButton} ${mode === 'break' ? styles.active : ''}`}
        >
          Pausa
        </button>
      </div>
      <div className={styles.timeDisplay}>{formatTime(timeLeft)}</div>
      <div className={styles.controls}>
        <button onClick={toggleTimer} className={styles.controlButton}>
          {isActive ? <Pause size={32} /> : <Play size={32} />}
        </button>
        <button onClick={resetTimer} className={styles.controlButton}>
          <RotateCcw size={32} />
        </button>
      </div>
    </div>
  );
}