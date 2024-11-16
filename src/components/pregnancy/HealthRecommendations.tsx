import React from 'react';
import { AlertCircle, Heart, Info } from 'lucide-react';
import { getRecommendations } from '../../utils/pregnancyCalculations';
import type { PregnancyDates } from '../../utils/pregnancyCalculations';

interface HealthRecommendationsProps {
  pregnancyDates: PregnancyDates;
  medicalHistory: string[];
}

export default function HealthRecommendations({ 
  pregnancyDates,
  medicalHistory 
}: HealthRecommendationsProps) {
  const recommendations = pregnancyDates.currentGA 
    ? getRecommendations(medicalHistory, pregnancyDates.currentGA)
    : [];

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
        Recommandations personnalisées
      </h2>

      <div className="space-y-4">
        {recommendations.map((rec, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg ${
              rec.type === 'warning'
                ? 'bg-red-50 dark:bg-red-900/50'
                : 'bg-indigo-50 dark:bg-indigo-900/50'
            }`}
          >
            <div className="flex items-start">
              {rec.type === 'warning' ? (
                <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5" />
              ) : (
                <Info className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mt-0.5" />
              )}
              <div className="ml-3">
                <p className={`text-sm font-medium ${
                  rec.type === 'warning'
                    ? 'text-red-800 dark:text-red-200'
                    : 'text-indigo-800 dark:text-indigo-200'
                }`}>
                  {rec.text}
                </p>
                {rec.frequency && (
                  <p className={`mt-1 text-sm ${
                    rec.type === 'warning'
                      ? 'text-red-700 dark:text-red-300'
                      : 'text-indigo-700 dark:text-indigo-300'
                  }`}>
                    Fréquence : {rec.frequency}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}

        {medicalHistory.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
              Suivi médical spécifique
            </h3>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
              <div className="flex items-start">
                <Heart className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mt-0.5" />
                <div className="ml-3">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    En raison de vos antécédents médicaux, un suivi renforcé est recommandé.
                    Consultez régulièrement votre équipe médicale.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}