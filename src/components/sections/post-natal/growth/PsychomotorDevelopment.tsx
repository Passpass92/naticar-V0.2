import React, { useState } from 'react';
import { Brain, Heart, Users, Activity, AlertCircle, CheckCircle, HelpCircle } from 'lucide-react';
import DevelopmentEvaluation from './DevelopmentEvaluation';

interface Milestone {
  description: string;
  achieved: boolean;
}

interface DevelopmentDomain {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  milestones: Milestone[];
}

const developmentDomains: DevelopmentDomain[] = [
  {
    id: 'motor',
    title: 'Développement moteur',
    icon: <Activity className="h-6 w-6 text-blue-500" />,
    color: 'blue',
    milestones: [
      { description: 'Tient sa tête', achieved: true },
      { description: 'Se tourne sur le côté', achieved: true },
      { description: 'S\'appuie sur ses avant-bras', achieved: false }
    ]
  },
  {
    id: 'cognitive',
    title: 'Développement cognitif',
    icon: <Brain className="h-6 w-6 text-purple-500" />,
    color: 'purple',
    milestones: [
      { description: 'Suit des yeux', achieved: true },
      { description: 'Réagit aux sons', achieved: true },
      { description: 'Explore avec ses mains', achieved: false }
    ]
  },
  {
    id: 'social',
    title: 'Développement social',
    icon: <Users className="h-6 w-6 text-green-500" />,
    color: 'green',
    milestones: [
      { description: 'Sourire social', achieved: true },
      { description: 'Gazouille', achieved: true },
      { description: 'Imite les expressions', achieved: false }
    ]
  },
  {
    id: 'emotional',
    title: 'Développement affectif',
    icon: <Heart className="h-6 w-6 text-rose-500" />,
    color: 'rose',
    milestones: [
      { description: 'Reconnaît les visages familiers', achieved: true },
      { description: 'Réagit à la voix des parents', achieved: true },
      { description: 'Exprime ses besoins', achieved: false }
    ]
  }
];

export default function PsychomotorDevelopment() {
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [showEvaluation, setShowEvaluation] = useState(false);

  return (
    <div className="space-y-8">
      {/* Introduction */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
        <div className="flex items-start">
          <Brain className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mt-1" />
          <div className="ml-4">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">
              Développement psychomoteur
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Le développement psychomoteur inclut les étapes du développement moteur, cognitif, 
              social et affectif. Ces jalons indiquent si l'enfant progresse normalement et 
              permettent de détecter d'éventuels retards ou troubles neurologiques.
            </p>
          </div>
        </div>
      </div>

      {/* Development Domains Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {developmentDomains.map((domain) => (
          <button
            key={domain.id}
            onClick={() => setSelectedDomain(domain.id)}
            className={`p-6 rounded-lg text-left transition-colors ${
              selectedDomain === domain.id
                ? `bg-${domain.color}-50 dark:bg-${domain.color}-900/50 ring-2 ring-${domain.color}-500`
                : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50'
            }`}
          >
            <div className="flex items-center mb-4">
              {domain.icon}
              <h3 className="ml-3 text-lg font-medium text-gray-900 dark:text-white">
                {domain.title}
              </h3>
            </div>
            <div className="space-y-3">
              {domain.milestones.map((milestone, index) => (
                <div key={index} className="flex items-center">
                  {milestone.achieved ? (
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  ) : (
                    <HelpCircle className="h-5 w-5 text-gray-400 mr-2" />
                  )}
                  <span className={`text-sm ${
                    milestone.achieved
                      ? 'text-gray-900 dark:text-white'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {milestone.description}
                  </span>
                </div>
              ))}
            </div>
          </button>
        ))}
      </div>

      {/* Evaluation Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Évaluation du développement
          </h3>
          <button
            onClick={() => setShowEvaluation(!showEvaluation)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            {showEvaluation ? 'Fermer l\'évaluation' : 'Commencer l\'évaluation'}
          </button>
        </div>

        {showEvaluation && <DevelopmentEvaluation />}
      </div>

      {/* Recommendations */}
      <div className="bg-yellow-50 dark:bg-yellow-900/50 rounded-lg p-6">
        <div className="flex items-start">
          <AlertCircle className="h-6 w-6 text-yellow-600 dark:text-yellow-400 mt-1" />
          <div className="ml-4">
            <h3 className="text-lg font-medium text-yellow-800 dark:text-yellow-200">
              Recommandations importantes
            </h3>
            <ul className="mt-2 space-y-2 text-yellow-700 dark:text-yellow-300">
              <li>• Consultez un professionnel si certains jalons ne sont pas atteints dans les délais prévus</li>
              <li>• Chaque enfant se développe à son rythme, mais certains retards nécessitent une attention particulière</li>
              <li>• En cas de doute, n'hésitez pas à en parler à votre pédiatre</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}