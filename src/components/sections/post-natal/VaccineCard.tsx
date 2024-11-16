import React, { useState } from 'react';
import { ChevronDown, AlertCircle, Heart } from 'lucide-react';

interface Vaccine {
  name: string;
  date: string;
  status: string;
  sideEffects: string;
  monitoring: string;
}

interface VaccineSchedule {
  age: string;
  vaccines: Vaccine[];
}

interface VaccineCardProps {
  schedule: VaccineSchedule;
  themeColor: string;
}

export default function VaccineCard({ schedule, themeColor }: VaccineCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`bg-white dark:bg-gray-800 shadow rounded-lg p-6 border-l-4 border-${themeColor}-500`}>
      <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">{schedule.age}</h3>
          <p className="text-sm text-gray-500">{schedule.vaccines[0].name}</p>
        </div>
        <ChevronDown className={`h-5 w-5 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
      </div>
      
      {isExpanded && (
        <div className="mt-4 space-y-4">
          {schedule.vaccines.map((vaccine, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center space-x-2">
                <AlertCircle className={`h-5 w-5 text-${themeColor}-500`} />
                <p className="text-sm font-medium">Effets secondaires possibles:</p>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 ml-7">{vaccine.sideEffects}</p>
              
              <div className="flex items-center space-x-2">
                <Heart className={`h-5 w-5 text-${themeColor}-500`} />
                <p className="text-sm font-medium">Surveillance:</p>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 ml-7">{vaccine.monitoring}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}