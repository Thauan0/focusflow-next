// src/lib/api.ts
import { Quote, Technique, BreakSuggestion, PomodoroSettings } from '@/types';

// Use uma variável de ambiente para a URL base da API.
// Caso não esteja definida, usa a URL padrão.
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://focusflowapi.onrender.com/api';

// Função genérica para fazer o fetch e tratar erros
async function fetchData<T>(endpoint: string): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${endpoint}: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const getQuote = () => fetchData<Quote>('/quote');
export const getTechnique = () => fetchData<Technique>('/technique');
export const getBreakSuggestion = () => fetchData<BreakSuggestion>('/break');
export const getPomodoroSettings = () => fetchData<PomodoroSettings>('/pomodoro/default');
