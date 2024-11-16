import React from 'react';
import { Utensils, Clock, Calendar, AlertCircle } from 'lucide-react';

interface FeedingScheduleProps {
  feedingData: any;
  themeColor: string;
}

export default function FeedingSchedule({ feedingData, themeColor }: FeedingScheduleProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={`bg-white dark:bg-gray-800 shadow rounded-lg p-6 border-l-4 border-${themeColor}-500`}>
          <div className="flex items-center mb-4">
            <Utensils className={`h-6 w-6 text-${themeColor}-500`} />
            <div className="ml-3">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Stade actuel
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {feedingData.currentStage}
              </p>
            </div>
          </div>
          {/* Rest of the component remains the same */}
        </div>
      </div>
    </div>
  );
}