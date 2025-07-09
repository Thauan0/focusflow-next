// src/types/index.ts

export interface Quote {
  id: number;
  text: string;
  author: string;
}

export interface Technique {
  id: number;
  name: string;
  description: string;
}

export interface BreakSuggestion {
  id: number;
  suggestion: string;
  duration_minutes: number;
}

export interface PomodoroSettings {
  work_minutes: number;
  short_break_minutes: number;
  long_break_minutes: number;
  cycles_before_long_break: number;
}

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}