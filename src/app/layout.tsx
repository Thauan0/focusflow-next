// src/app/layout.tsx (CORRIGIDO)

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import { ThemeProvider } from '@/components/ThemeProvider';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Focus',
  description: 'Onde a Produtividade Encontra a Serenidade',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Removido qualquer espaço ou comentário entre <html> e <body>
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {/* Camada para a imagem de fundo */}
          <div className="fixed top-0 left-0 -z-10 h-full w-full dark:opacity-100 opacity-0 transition-opacity duration-500">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('/wave-haikei.svg')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
          </div>

          {/* Container principal com Flexbox */}
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow relative z-10">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}