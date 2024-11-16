import React from 'react';
import { Tv, Clock, AlertCircle, Lightbulb } from 'lucide-react';

interface ScreenTimeAdviceProps {
  babyAge: number; // in months
}

const alternatives = [
  {
    title: "Jeux interactifs",
    description: "Cache-cache, comptines avec gestes",
    icon: <Lightbulb className="h-6 w-6 text-yellow-500" />
  },
  {
    title: "Activités sensorielles",
    description: "Exploration de différentes textures",
    icon: <Lightbulb className="h-6 w-6 text-green-500" />
  },
  {
    title: "Temps en nature",
    description: "Promenades, observation de l'environnement",
    icon: <Lightbulb className="h-6 w-6 text-blue-500" />
  }
];

export default function ScreenTimeAdvice({ babyAge }: ScreenTimeAdviceProps) {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          Recommandations sur le temps d'écran
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Pour un bébé de {babyAge} mois
        </p>
      </div>

      <div className="bg-red-50 dark:bg-red-900/50 rounded-lg p-6 mb-8">
        <div className="flex items-start">
          <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400 mt-1" />
          <div className="ml-3">
            <h3 className="text-lg font-medium text-red-800 dark:text-red-200">
              Recommandations de l'OMS
            </h3>
            <p className="mt-2 text-red-700 dark:text-red-300">
              Avant 2 ans, l'exposition aux écrans n'est pas recommandée pour le développement optimal de votre enfant.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="col-span-full md:col-span-1 bg-blue-50 dark:bg-blue-900/50 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <h3 className="ml-3 text-lg font-medium text-gray-900 dark:text-white">
              Temps recommandé
            </h3>
          </div>
          <div className="space-y-3">
            <p className="text-blue-800 dark:text-blue-200">
              <strong>0-18 mois :</strong> Pas d'écran
            </p>
            <p className="text-blue-800 dark:text-blue-200">
              <strong>18-24 mois :</strong> Maximum 15 min/jour avec un parent
            </p>
            <p className="text-blue-800 dark:text-blue-200">
              <strong>2-3 ans :</strong> Maximum 30 min/jour
            </p>
          </div>
        </div>

        <div className="col-span-full md:col-span-2">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Alternatives aux écrans
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {alternatives.map((alternative, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center mb-2">
                  {alternative.icon}
                  <h4 className="ml-3 font-medium text-gray-900 dark:text-white">
                    {alternative.title}
                  </h4>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {alternative.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Impact des écrans
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
              Effets sur le développement
            </h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>• Retard de langage possible</li>
              <li>• Diminution des interactions sociales</li>
              <li>• Impact sur le sommeil</li>
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
              Conseils pratiques
            </h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>• Privilégier les interactions humaines</li>
              <li>• Créer des zones sans écran</li>
              <li>• Établir des routines sans écran</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}