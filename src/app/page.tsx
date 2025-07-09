// src/app/page.tsx

import { HeroSection } from '@/components/sections/HeroSection';
import { FeaturesSection } from '@/components/FeaturesSection';
import { TechniquesSection } from '@/components/sections/TechniquesSection';
import { BreakSuggestionSection } from '@/components/BreakSuggestion'; // 1. Importar a nova seção
import { getQuote, getTechnique, getBreakSuggestion } from '@/lib/api'; // 2. Importar o novo fetcher

export default async function HomePage() {
  // 3. Buscar todos os dados iniciais em paralelo para melhor performance
  const [quote, initialTechnique, initialBreakSuggestion] = await Promise.all([
    getQuote().catch(() => null),
    getTechnique().catch(() => null),
    getBreakSuggestion().catch(() => null) // Adicionar a busca da sugestão de pausa
  ]);

  return (
    <>
      <HeroSection quote={quote} />
      <FeaturesSection />
      
      {initialTechnique && (
        <TechniquesSection initialTechnique={initialTechnique} />
      )}

      {/* 4. Renderizar a nova seção, se os dados foram recebidos */}
      {initialBreakSuggestion && (
        <BreakSuggestionSection initialSuggestion={initialBreakSuggestion} />
      )}
    </>
  );
}