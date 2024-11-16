import React from 'react';
import { Brain, Book, Music, Star } from 'lucide-react';

interface DevelopmentAdviceProps {
  babyAge: number; // in months
}

const activities = [
  {
    title: "Jeux sensoriels",
    description: "Utilisez différentes textures pour stimuler le toucher",
    age: "0-3 mois",
    icon: <Brain className="h-6 w-6 text-purple-500" />
  },
  {
    title: "Lecture interactive",
    description: "Montrez des livres avec des contrastes marqués",
    age: "0-6 mois",
    icon: <Book className="h-6 w-6 text-blue-500" />
  },
  {
    title: "Éveil musical",
    description: "Chantez des comptines et utilisez des instruments adaptés",
    age: "3-6 mois",
    icon: <Music className="h-6 w-6 text-pink-500" />
  }
];

const milestones = [
  "Suit des yeux un objet en mouvement",
  "Tient sa tête",
  "Commence à gazouiller",
  "Sourit aux visages familiers"
];

export default function DevelopmentAdvice({ babyAge }: DevelopmentAdviceProps) {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          Activités recommandées
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Adaptées pour un bébé de {babyAge} mois
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6"
          >
            <div className="flex items-center mb-3">
              {activity.icon}
              <h3 className="ml-3 font-medium text-gray-900 dark:text-white">
                {activity.title}
              </h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              {activity.description}
            </p>
            <span className="inline-block px-2 py-1 text-xs bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded-full">
              {activity.age}
            </span>
          </div>
        ))}
      </div>

      <div className="bg-indigo-50 dark:bg-indigo-900/50 rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Étapes de développement à surveiller
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {milestones.map((milestone, index) => (
            <div
              key={index}
              className="flex items-center bg-white dark:bg-gray-800 p-4 rounded-lg"
            >
              <Star className="h-5 w-5 text-yellow-500 mr-3" />
              <span className="text-gray-700 dark:text-gray-300">
                {milestone}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}