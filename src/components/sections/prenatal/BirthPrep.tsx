import React from 'react';
import { BookOpen, Video, Heart, FileText } from 'lucide-react';

const resources = [
  {
    id: '1',
    title: 'Cours de préparation à l\'accouchement',
    description: 'Séances vidéo guidées par des sages-femmes expérimentées',
    icon: <Video className="h-6 w-6" />,
    progress: 60
  },
  {
    id: '2',
    title: 'Exercices de respiration',
    description: 'Techniques de respiration pour le travail et l\'accouchement',
    icon: <Heart className="h-6 w-6" />,
    progress: 40
  },
  {
    id: '3',
    title: 'Projet de naissance',
    description: 'Créez votre projet de naissance personnalisé',
    icon: <FileText className="h-6 w-6" />,
    progress: 20
  }
];

export default function BirthPrep() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Préparation à la naissance
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Ressources et exercices pour vous préparer à l'accouchement
        </p>
      </div>

      <div className="grid gap-6">
        {resources.map((resource) => (
          <div 
            key={resource.id}
            className="bg-white dark:bg-gray-800 shadow rounded-lg p-6"
          >
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="p-3 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg">
                  {React.cloneElement(resource.icon, {
                    className: 'text-indigo-600 dark:text-indigo-400'
                  })}
                </div>
              </div>
              <div className="ml-4 flex-1">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {resource.title}
                </h3>
                <p className="mt-1 text-gray-500 dark:text-gray-400">
                  {resource.description}
                </p>
                <div className="mt-4">
                  <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                      <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-200 dark:text-indigo-200 dark:bg-indigo-900">
                          Progression
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-semibold inline-block text-indigo-600 dark:text-indigo-200">
                          {resource.progress}%
                        </span>
                      </div>
                    </div>
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200 dark:bg-indigo-900">
                      <div 
                        style={{ width: `${resource.progress}%` }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"
                      ></div>
                    </div>
                  </div>
                  <button className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
                    Continuer
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}