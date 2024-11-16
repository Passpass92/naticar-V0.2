import React from 'react';
import { Brain, Heart, Users } from 'lucide-react';

interface DevelopmentTrackerProps {
  milestones: any;
  themeColor: string;
}

export default function DevelopmentTracker({ milestones, themeColor }: DevelopmentTrackerProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`bg-white dark:bg-gray-800 shadow rounded-lg p-6 border-l-4 border-${themeColor}-500`}>
          <div className="flex items-center mb-4">
            <Brain className={`h-6 w-6 text-${themeColor}-500`} />
            <h3 className="ml-2 text-lg font-medium text-gray-900 dark:text-white">
              Développement physique
            </h3>
          </div>
          <ul className="space-y-2">
            {milestones.current.physical.map((milestone: string, index: number) => (
              <li key={index} className="flex items-center text-gray-600 dark:text-gray-400">
                <span className={`h-2 w-2 rounded-full bg-${themeColor}-500 mr-2`}></span>
                {milestone}
              </li>
            ))}
          </ul>
        </div>

        <div className={`bg-white dark:bg-gray-800 shadow rounded-lg p-6 border-l-4 border-${themeColor}-500`}>
          <div className="flex items-center mb-4">
            <Heart className={`h-6 w-6 text-${themeColor}-500`} />
            <h3 className="ml-2 text-lg font-medium text-gray-900 dark:text-white">
              Développement social
            </h3>
          </div>
          <ul className="space-y-2">
            {milestones.current.social.map((milestone: string, index: number) => (
              <li key={index} className="flex items-center text-gray-600 dark:text-gray-400">
                <span className={`h-2 w-2 rounded-full bg-${themeColor}-500 mr-2`}></span>
                {milestone}
              </li>
            ))}
          </ul>
        </div>

        <div className={`bg-white dark:bg-gray-800 shadow rounded-lg p-6 border-l-4 border-${themeColor}-500`}>
          <div className="flex items-center mb-4">
            <Users className={`h-6 w-6 text-${themeColor}-500`} />
            <h3 className="ml-2 text-lg font-medium text-gray-900 dark:text-white">
              Développement cognitif
            </h3>
          </div>
          <ul className="space-y-2">
            {milestones.current.cognitive.map((milestone: string, index: number) => (
              <li key={index} className="flex items-center text-gray-600 dark:text-gray-400">
                <span className={`h-2 w-2 rounded-full bg-${themeColor}-500 mr-2`}></span>
                {milestone}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={`bg-white dark:bg-gray-800 shadow rounded-lg p-6 border-l-4 border-${themeColor}-500`}>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Activités recommandées
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {milestones.activities.map((activity: any, index: number) => (
            <div key={index} className="space-y-2">
              <h4 className="font-medium text-gray-900 dark:text-white">
                {activity.title}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {activity.description}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                Bénéfices : {activity.benefits}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className={`bg-white dark:bg-gray-800 shadow rounded-lg p-6 border-l-4 border-${themeColor}-500`}>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Prochaines étapes ({milestones.next.age})
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
              À surveiller
            </h4>
            <ul className="space-y-2">
              {milestones.next.milestones.map((milestone: string, index: number) => (
                <li key={index} className="flex items-center text-gray-600 dark:text-gray-400">
                  <span className={`h-2 w-2 rounded-full bg-${themeColor}-500 mr-2`}></span>
                  {milestone}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
              Conseils pour les parents
            </h4>
            <ul className="space-y-2">
              <li className="text-sm text-gray-600 dark:text-gray-400">
                • Maintenez une routine stable
              </li>
              <li className="text-sm text-gray-600 dark:text-gray-400">
                • Parlez beaucoup à votre bébé
              </li>
              <li className="text-sm text-gray-600 dark:text-gray-400">
                • Proposez des jeux adaptés à son âge
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}