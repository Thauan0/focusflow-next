// src/components/Footer.tsx

import React from 'react';
import styles from './Footer.module.css';
import { Github, Linkedin } from 'lucide-react'; // 1. Importar os ícones

export function Footer() {
  const currentYear = new Date().getFullYear();
  const linkedInUrl = "https://www.linkedin.com/in/thauan-carneiro-0428th/";
  // Assumi seu usuário do GitHub baseado nos links anteriores. Se for diferente, altere aqui.
  const githubUrl = "https://github.com/Thauan0"; 

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.copyright}>
          © {currentYear} FocusFlow. Desenvolvido por Thauan Carneiro.
        </p>
        
        {/* 2. Container para os links das redes sociais */}
        <div className={styles.socialLinks}>
          <a 
            href={linkedInUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.link}
            aria-label="LinkedIn de Thauan Carneiro"
          >
            <Linkedin size={22} />
          </a>
          <a 
            href={githubUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.link}
            aria-label="GitHub de Thauan Carneiro"
          >
            <Github size={22} />
          </a>
        </div>
      </div>
    </footer>
  );
}