import React from 'react';
import { Baby, Ruler, Scale, Brain } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

interface FetalDevelopmentData {
  week: number;
  length: string;
  weight: string;
  sizeComparison: string;
  image: string;
  milestones: string[];
}

const fetalDevelopment: FetalDevelopmentData = {
  week: 24,
  length: "30 cm",
  weight: "600g",
  sizeComparison: "un épi de maïs",
  image: "https://images.unsplash.com/photo-1584187839132-5f1e7ddb0d44?w=300",
  milestones: [
    "Bébé fait la taille d'un épi de maïs",
    "Peut maintenant entendre les sons extérieurs",
    "Développement des cycles de sommeil"
  ]
};

export default function PregnancyProgress() {
  const { isDark } = useTheme();
  const currentWeek = 24;
  const totalWeeks = 40;
  const progress = (currentWeek / totalWeeks) * 100;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Suivi de Grossesse
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
        {/* Fetal Development Visualization */}
        <div className="space-y-6">
          <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
            <img
              src={fetalDevelopment.image}
              alt={`Développement fœtal à ${fetalDevelopment.week} semaines`}
              className="object-cover w-full h-full"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
              <p className="text-white text-lg font-medium">
                Semaine {fetalDevelopment.week}
              </p>
              <p className="text-white/80 text-sm">
                Taille d'un {fetalDevelopment.sizeComparison}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-indigo-50 dark:bg-indigo-900/50 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <Ruler className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Taille
                </span>
              </div>
              <p className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400">
                {fetalDevelopment.length}
              </p>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/50 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <Scale className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Poids
                </span>
              </div>
              <p className="text-2xl font-semibold text-purple-600 dark:text-purple-400">
                {fetalDevelopment.weight}
              </p>
            </div>
          </div>
        </div>

        {/* Progress and Milestones */}
        <div className="space-y-6">
          <div>
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-200 dark:text-indigo-200 dark:bg-indigo-900">
                  Semaine {currentWeek}
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-indigo-600 dark:text-indigo-200">
                  {Math.round(progress)}%
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200 dark:bg-indigo-900">
              <div 
                style={{ width: `${progress}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"
              ></div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
              <Brain className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mr-2" />
              Développement cette semaine
            </h3>
            <ul className="space-y-3">
              {fetalDevelopment.milestones.map((milestone, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <span className="h-2 w-2 rounded-full bg-indigo-500"></span>
                  <span className="text-gray-700 dark:text-gray-300">{milestone}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/50 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Conseils pour cette semaine
            </h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>• Maintenez une activité physique modérée</li>
              <li>• Surveillez votre alimentation</li>
              <li>• Restez bien hydratée</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}