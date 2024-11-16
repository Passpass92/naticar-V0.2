import React, { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import confetti from 'canvas-confetti';
import { OnboardingStep } from '../../types';
import BasicInfo from './steps/BasicInfo';
import PregnancyStatus from './steps/PregnancyStatus';
import HealthInfo from './steps/HealthInfo';
import Preferences from './steps/Preferences';
import Logo from '../Logo';

const steps: OnboardingStep[] = [
  {
    id: 'basic-info',
    title: 'Informations Personnelles',
    description: 'Commençons par quelques informations de base',
    fields: []
  },
  {
    id: 'pregnancy-status',
    title: 'Statut de Grossesse',
    description: 'Parlons de votre grossesse',
    fields: []
  },
  {
    id: 'health-info',
    title: 'Informations de Santé',
    description: 'Pour mieux vous accompagner',
    fields: []
  },
  {
    id: 'preferences',
    title: 'Préférences',
    description: 'Personnalisez votre expérience',
    fields: []
  }
];

const initialFormData = {
  name: '',
  email: '',
  phone: '',
  dueDate: '',
  status: '',
  medicalHistory: [],
  allergies: '',
  insuranceInfo: '',
  notificationFrequency: '',
  contentTypes: [],
  contentFormat: []
};

const celebrateCompletion = () => {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    zIndex: 9999
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio)
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
    colors: ['#ff0000', '#ffa500']
  });
  fire(0.2, {
    spread: 60,
    colors: ['#00ff00', '#0000ff']
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
    colors: ['#ff00ff', '#00ffff']
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
    colors: ['#ff0000', '#ffa500', '#00ff00', '#0000ff', '#ff00ff']
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
    colors: ['#ff0000', '#ffa500', '#00ff00', '#0000ff', '#ff00ff']
  });
};

export default function OnboardingFlow({ onComplete }: { onComplete: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState(initialFormData);

  const StepComponent = {
    0: BasicInfo,
    1: PregnancyStatus,
    2: HealthInfo,
    3: Preferences
  }[currentStep];

  const handleNext = () => {
    if (currentStep === steps.length - 1) {
      celebrateCompletion();
      setTimeout(onComplete, 2000);
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <Logo />
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {steps[currentStep].title}
            </h2>
            <p className="text-gray-600">{steps[currentStep].description}</p>
          </div>

          <StepComponent 
            formData={formData} 
            onChange={(data: any) => setFormData({ ...formData, ...data })} 
          />

          <div className="mt-8 flex justify-between">
            {currentStep > 0 && (
              <button
                onClick={handlePrevious}
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-700"
              >
                <ChevronLeft className="h-5 w-5 mr-1" />
                Précédent
              </button>
            )}
            <button
              onClick={handleNext}
              className="ml-auto flex items-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700"
            >
              {currentStep === steps.length - 1 ? 'Commencer' : 'Suivant'}
              <ChevronRight className="h-5 w-5 ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}