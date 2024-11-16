import { Language } from '../stores/languageStore';

export type TranslationKey = 
  | 'dashboard'
  | 'appointments'
  | 'measurements'
  | 'nutrition'
  | 'medications'
  | 'mood'
  | 'moodEvaluate'
  | 'moodHelp'
  | 'moodDiscuss'
  | 'administrative'
  | 'profile'
  | 'prenatal'
  | 'postnatal'
  | 'notifications'
  | 'viewAll'
  | 'growth'
  | 'development'
  | 'sleep'
  | 'feeding'
  | 'vaccines'
  | 'support'
  | 'advice'
  | 'community';

type Translations = {
  [key in TranslationKey]: string;
};

export const translations: Record<string, Translations> = {
  fr: {
    dashboard: 'Tableau de bord',
    appointments: 'Rendez-vous',
    measurements: 'Mesures',
    nutrition: 'Nutrition',
    medications: 'Médicaments',
    mood: 'Humeur',
    moodEvaluate: 'Évaluer mon humeur',
    moodHelp: 'Besoin d\'aide',
    moodDiscuss: 'Discuter',
    administrative: 'Démarches',
    profile: 'Mon Profil',
    prenatal: 'Pré-natal',
    postnatal: 'Post-natal',
    notifications: 'Notifications',
    viewAll: 'Voir tout',
    growth: 'Croissance',
    development: 'Développement',
    sleep: 'Sommeil',
    feeding: 'Alimentation',
    vaccines: 'Vaccins',
    support: 'Soutien',
    advice: 'Espace Conseils',
    community: 'Communauté'
  },
  // Other languages follow the same pattern...
};