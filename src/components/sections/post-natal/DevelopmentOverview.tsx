import React from 'react';
import { Brain, Activity, Heart, AlertCircle } from 'lucide-react';

interface DevelopmentOverviewProps {
  developmentMilestones: any;
  themeColor: string;
}

export default function DevelopmentOverview({ developmentMilestones, themeColor }: DevelopmentOverviewProps) {
  return (
    <div className={`bg-white dark:bg-gray-800 shadow rounded-lg p-6 border-l-4 border-${themeColor}-500`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Développement ({developmentMilestones.current.age})
        </h3>
        <span className={`px-3 py-1 rounded-full text-sm bg-${themeColor}-100 dark:bg-${themeColor}-900/50 text-${themeColor}-700 dark:text-${themeColor}-300`}>
          En bonne progression
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MilestoneCategory
          title="Cognitif"
          icon={<Brain className="h-5 w-5 mr-2" />}
          milestones={developmentMilestones.current.cognitive}
          themeColor={themeColor}
        />
        <MilestoneCategory
          title="Moteur"
          icon={<Activity className="h-5 w-5 mr-2" />}
          milestones={developmentMilestones.current.physical}
          themeColor={themeColor}
        />
        <MilestoneCategory
          title="Social"
          icon={<Heart className="h-5 w-5 mr-2" />}
          milestones={developmentMilestones.current.social}
          themeColor={themeColor}
        />
      </div>

      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
        <div className="flex items-start">
          <AlertCircle className={`h-5 w-5 text-${themeColor}-500 mt-0.5`} />
          <div className="ml-3">
            <h4 className="font-medium text-gray-900 dark:text-white">
              Prochaines étapes ({developmentMilestones.next.age})
            </h4>
            <ul className="mt-2 space-y-1">
              {developmentMilestones.next.milestones.map((milestone: string, index: number) => (
                <li key={index} className="text-sm text-gray-600 dark:text-gray-300">
                  • {milestone}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

interface MilestoneCategoryProps {
  title: string;
  icon: React.ReactNode;
  milestones: string[];
  themeColor: string;
}

function MilestoneCategory({ title, icon, milestones, themeColor }: MilestoneCategoryProps) {
  return (
    <div>
      <h4 className="font-medium text-gray-900 dark:text-white mb-2 flex items-center">
        {icon}
        {title}
      </h4>
      <ul className="space-y-2">
        {milestones.map((milestone, index) => (
          <li key={index} className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
            <span className={`h-2 w-2 rounded-full bg-${themeColor}-500 mr-2 mt-1.5`} />
            {milestone}
          </li>
        ))}
      </ul>
    </div>
  );
}