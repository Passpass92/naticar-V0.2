import React from 'react';
import { Moon, Book } from 'lucide-react';

interface SleepTipsProps {
  themeColor: string;
}

export default function SleepTips({ themeColor }: SleepTipsProps) {
  return (
    <div className={`bg-white dark:bg-gray-800 shadow rounded-lg p-6 border-l-4 border-${themeColor}-500`}>
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Conseils sommeil</h3>
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <Moon className={`h-5 w-5 text-${themeColor}-500 mt-0.5`} />
          <div>
            <p className="font-medium">Routine du soir</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Établissez une routine calme et régulière avant le coucher
            </p>
          </div>
        </div>
        <div className="flex items-start space-x-3">
          <Book className={`h-5 w-5 text-${themeColor}-500 mt-0.5`} />
          <div>
            <p className="font-medium">Signes de fatigue</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Apprenez à reconnaître les signes de fatigue de votre bébé
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}