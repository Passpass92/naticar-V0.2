import React, { useState } from 'react';
import { Book, Tv, Sun, Thermometer, Bookmark, AlertCircle } from 'lucide-react';
import DevelopmentAdvice from './DevelopmentAdvice';
import ScreenTimeAdvice from './ScreenTimeAdvice';
import SeasonalAdvice from './SeasonalAdvice';
import { useUserStore } from '../../../../stores/userStore';

const categories = [
  {
    id: 'development',
    title: 'Apprentissage & Développement',
    icon: <Book className="h-6 w-6 text-purple-500" />,
    description: 'Activités et conseils adaptés à l\'âge'
  },
  {
    id: 'screenTime',
    title: 'Temps d\'écran',
    icon: <Tv className="h-6 w-6 text-blue-500" />,
    description: 'Recommandations et alternatives'
  },
  {
    id: 'seasonal',
    title: 'Soins saisonniers',
    icon: <Sun className="h-6 w-6 text-orange-500" />,
    description: 'Conseils adaptés à la saison'
  }
];

const dailyTip = {
  title: "Astuce du jour",
  content: "Privilégiez les jeux d'éveil sensoriels pour stimuler le développement de votre bébé.",
  category: "development"
};

export default function AdvicePortal() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const { profile } = useUserStore();

  const renderCategoryContent = () => {
    switch (activeCategory) {
      case 'development':
        return <DevelopmentAdvice babyAge={2} />;
      case 'screenTime':
        return <ScreenTimeAdvice babyAge={2} />;
      case 'seasonal':
        return <SeasonalAdvice />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Conseils & Recommandations
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Des conseils personnalisés pour le bien-être de votre bébé
        </p>
      </div>

      {/* Daily Tip */}
      <div className="mb-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-6 text-white">
        <div className="flex items-start">
          <AlertCircle className="h-6 w-6 mr-3 flex-shrink-0" />
          <div>
            <h2 className="text-lg font-medium">{dailyTip.title}</h2>
            <p className="mt-1 text-indigo-100">{dailyTip.content}</p>
          </div>
          <button className="ml-auto p-2 hover:bg-white/10 rounded-full">
            <Bookmark className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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

      {/* Category Content */}
      {activeCategory && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          {renderCategoryContent()}
        </div>
      )}

      {/* Weather Alert */}
      <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/50 rounded-lg">
        <div className="flex items-center">
          <Thermometer className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
              Alerte météo
            </h3>
            <p className="mt-1 text-sm text-yellow-700 dark:text-yellow-300">
              Températures élevées prévues. Pensez à bien hydrater votre bébé.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}