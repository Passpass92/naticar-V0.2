import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  direction?: 'ltr' | 'rtl';
}

interface LanguageState {
  currentLanguage: Language;
  languages: Language[];
  setLanguage: (language: Language) => void;
}

const languages: Language[] = [
  {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    flag: '🇫🇷',
    direction: 'ltr'
  },
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇬🇧',
    direction: 'ltr'
  },
  {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    flag: '🇸🇦',
    direction: 'rtl'
  },
  {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    flag: '🇪🇸',
    direction: 'ltr'
  },
  {
    code: 'zh',
    name: 'Chinese',
    nativeName: '中文',
    flag: '🇨🇳',
    direction: 'ltr'
  }
];

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      currentLanguage: languages[0], // Default to French
      languages,
      setLanguage: (language) => {
        set({ currentLanguage: language });
        // Update document direction based on language
        document.documentElement.dir = language.direction || 'ltr';
      }
    }),
    {
      name: 'language-store'
    }
  )
);