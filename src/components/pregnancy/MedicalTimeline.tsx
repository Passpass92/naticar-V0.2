import React from 'react';
import { Calendar, AlertCircle } from 'lucide-react';
import { generateAppointmentSchedule } from '../../utils/pregnancyCalculations';
import type { PregnancyDates } from '../../utils/pregnancyCalculations';

interface MedicalTimelineProps {
  pregnancyDates: PregnancyDates;
}

export default function MedicalTimeline({ pregnancyDates }: MedicalTimelineProps) {
  const appointments = generateAppointmentSchedule(pregnancyDates);

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
        Calendrier de suivi
      </h2>

      <div className="relative">
        <div className="absolute top-0 bottom-0 left-8 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
        
        <div className="space-y-8">
          {appointments.map((appointment, index) => (
            <div key={index} className="relative flex items-start">
              <div className={`absolute left-8 -ml-3 h-6 w-6 rounded-full border-2 border-white dark:border-gray-800 ${
                appointment.isPast
                  ? 'bg-green-500'
                  : 'bg-indigo-500'
              }`}>
                <Calendar className="h-4 w-4 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </div>

              <div className="ml-12">
                <div className="flex items-center">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {appointment.type}
                  </h3>
                  <span className="ml-3 text-sm text-gray-500 dark:text-gray-400">
                    {appointment.date.toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long'
                    })}
                  </span>
                </div>
                <p className="mt-1 text-gray-600 dark:text-gray-300">
                  {appointment.description}
                </p>

                {!appointment.isPast && (
                  <div className="mt-2 flex items-center text-sm text-indigo-600 dark:text-indigo-400">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    Pensez à prendre rendez-vous
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}