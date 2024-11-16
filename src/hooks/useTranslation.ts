import { useLanguageStore } from '../stores/languageStore';
import { translations, TranslationKey } from '../i18n/translations';

export function useTranslation() {
  const { currentLanguage } = useLanguageStore();
  
  const t = (key: TranslationKey): string => {
    return translations[currentLanguage.code][key] || key;
  };

  return { t };
}