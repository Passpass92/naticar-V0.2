import React from 'react';
import { Calendar, Heart } from 'lucide-react';

interface UpcomingEventsProps {
  nextVaccine: any;
  themeColor: string;
}

export default function UpcomingEvents({ nextVaccine, themeColor }: UpcomingEventsProps) {
  return (
    <div className={`bg-white dark:bg-gray-800 shadow rounded-lg p-6 border-l-4 border-${themeColor}-500`}>
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
        Prochains rendez-vous médicaux
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-start space-x-4">
            <div className={`p-2 bg-${themeColor}-100 dark:bg-${themeColor}-900/50 rounded-lg`}>
              <Calendar className={`h-6 w-6 text-${themeColor}-500`} />
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">
                Visite des {nextVaccine.age}
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(nextVaccine.vaccines[0].date).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                Consultation de routine et vaccinations
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start space-x-4">
            <div className={`p-2 bg-${themeColor}-100 dark:bg-${themeColor}-900/50 rounded-lg`}>
              <Heart className={`h-6 w-6 text-${themeColor}-500`} />
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">
                Vaccinations prévues
              </h4>
              <ul className="mt-1 space-y-1">
                {nextVaccine.vaccines.map((vaccine: any, index: number) => (
                  <li key={index} className="text-sm text-gray-600 dark:text-gray-300">
                    • {vaccine.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}