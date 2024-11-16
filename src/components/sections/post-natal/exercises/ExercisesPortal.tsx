import React, { useState } from 'react';
import { 
  Dumbbell, Heart, Brain, Wind, Calendar, 
  Play, CheckCircle, AlertCircle, Video 
} from 'lucide-react';
import ExerciseProgram from './ExerciseProgram';

const categories = [
  {
    id: 'perineal',
    title: 'Rééducation périnéale',
    icon: <Heart className="h-6 w-6 text-pink-500" />,
    description: 'Exercices de Kegel et renforcement du plancher pelvien'
  },
  {
    id: 'abdominal',
    title: 'Renforcement abdominal',
    icon: <Dumbbell className="h-6 w-6 text-purple-500" />,
    description: 'Exercices doux pour les abdominaux post-partum'
  },
  {
    id: 'yoga',
    title: 'Yoga post-natal',
    icon: <Brain className="h-6 w-6 text-blue-500" />,
    description: 'Séances adaptées pour la récupération'
  },
  {
    id: 'breathing',
    title: 'Respiration & Relaxation',
    icon: <Wind className="h-6 w-6 text-green-500" />,
    description: 'Techniques de respiration et relaxation'
  }
];

const dailyTip = {
  title: "Conseil du jour",
  content: "Commencez doucement avec 5-10 minutes d'exercices et augmentez progressivement la durée.",
  type: "info"
};

export default function ExercisesPortal() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Exercices & Rééducation
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Programme personnalisé pour votre récupération post-natale
        </p>
      </div>

      {/* Daily Tip */}
      <div className="mb-8 bg-indigo-50 dark:bg-indigo-900/50 rounded-lg p-6">
        <div className="flex items-start">
          <AlertCircle className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mt-0.5" />
          <div className="ml-3">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">
              {dailyTip.title}
            </h2>
            <p className="mt-1 text-gray-600 dark:text-gray-400">
              {dailyTip.content}
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Séances cette semaine
              </p>
              <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">
                3/5
              </p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Minutes d'exercice
              </p>
              <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">
                45
              </p>
            </div>
            <Play className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Prochain RDV
              </p>
              <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">
                5j
              </p>
            </div>
            <Calendar className="h-8 w-8 text-purple-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Progression
              </p>
              <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">
                60%
              </p>
            </div>
            <Brain className="h-8 w-8 text-pink-500" />
          </div>
        </div>
      </div>

      {/* Exercise Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`p-6 rounded-lg text-left transition-colors ${
              activeCategory === category.id
                ? 'bg-indigo-50 dark:bg-indigo-900/50 ring-2 ring-indigo-500'
                : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50'
            }`}
          >
            <div className="flex items-center mb-3">
              {category.icon}
              <h3 className="ml-3 text-lg font-medium text-gray-900 dark:text-white">
                {category.title}
              </h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {category.description}
            </p>
          </button>
        ))}
      </div>

      {/* Professional Support */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <div className="flex items-center mb-4">
            <Video className="h-6 w-6 text-indigo-500" />
            <h3 className="ml-3 text-lg font-medium text-gray-900 dark:text-white">
              Téléconsultation
            </h3>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Consultez un professionnel de la rééducation à distance
          </p>
          <button
            onClick={() => setShowBookingModal(true)}
            className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Prendre rendez-vous
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <div className="flex items-center mb-4">
            <AlertCircle className="h-6 w-6 text-red-500" />
            <h3 className="ml-3 text-lg font-medium text-gray-900 dark:text-white">
              Points de vigilance
            </h3>
          </div>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400">
            <li>• Respectez votre rythme de récupération</li>
            <li>• Arrêtez en cas de douleur</li>
            <li>• Consultez si besoin un professionnel</li>
          </ul>
        </div>
      </div>

      {/* Render active category content */}
      {activeCategory && (
        <div className="mt-8">
          <ExerciseProgram category={activeCategory as any} />
        </div>
      )}
    </div>
  );
}