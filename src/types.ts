export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  lastPeriodDate?: string;
  conceptionDate?: string;
  dueDate?: string;
  pregnancyStatus: 'expecting' | 'parent';
  previousPregnancies: number;
  medicalHistory?: string[];
  allergies?: string[];
  employmentStatus: 'employed' | 'self-employed' | 'unemployed';
  insuranceInfo?: string;
  notificationPreferences: {
    frequency: 'daily' | 'weekly';
    types: string[];
    format: ('text' | 'video' | 'audio')[];
  };
}

export interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  fields: FormField[];
}

export interface FormField {
  id: string;
  type: 'text' | 'email' | 'tel' | 'date' | 'number' | 'select' | 'radio' | 'checkbox';
  label: string;
  placeholder?: string;
  options?: { value: string; label: string }[];
  required?: boolean;
}

export interface AppState {
  onboardingComplete: boolean;
  currentStep: number;
  userProfile?: UserProfile;
}