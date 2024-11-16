import React, { useState, useEffect } from 'react';
import { Calendar, AlertCircle, Info } from 'lucide-react';
import { calculatePregnancyDates, formatGA, getTrimesterInfo } from '../../utils/pregnancyCalculations';
import type { PregnancyDates } from '../../utils/pregnancyCalculations';

export default function PregnancyCalculator() {
  const [dateType, setDateType] = useState<'lmp' | 'conception'>('lmp');
  const [inputDate, setInputDate] = useState('');
  const [pregnancyInfo, setPregnancyInfo] = useState<PregnancyDates | null>(null);

  useEffect(() => {
    if (inputDate) {
      const date = new Date(inputDate);
      const info = calculatePregnancyDates({
        [dateType]: date
      });
      setPregnancyInfo(info);
    }
  }, [inputDate, dateType]);

  const trimesterInfo = pregnancyInfo?.trimester ? getTrimesterInfo(pregnancyInfo.trimester) : null;

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
        Calculateur de grossesse
      </h2>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Type de date
          </label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setDateType('lmp')}
              className={`p-3 text-sm border rounded-lg flex items-center justify-center ${
                dateType === 'lmp'
                  ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300'
                  : 'border-gray-300 dark:border-gray-600'
              }`}
            >
              Date des dernières règles
            </button>
            <button
              type="button"
              onClick={() => setDateType('conception')}
              className={`p-3 text-sm border rounded-lg flex items-center justify-center ${
                dateType === 'conception'
                  ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300'
                  : 'border-gray-300 dark:border-gray-600'
              }`}
            >
              Date de conception
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Sélectionnez la date
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="date"
              value={inputDate}
              onChange={(e) => setInputDate(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700"
            />
          </div>
        </div>

        {pregnancyInfo?.dueDate && (
          <div className="space-y-4">
            <div className="p-4 bg-indigo-50 dark:bg-indigo-900/50 rounded-lg">
              <div className="flex items-start">
                <Info className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mt-0.5" />
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-indigo-800 dark:text-indigo-200">
                    Date prévue d'accouchement
                  </h4>
                  <p className="mt-1 text-sm text-indigo-700 dark:text-indigo-300">
                    {pregnancyInfo.dueDate.toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>

            {pregnancyInfo.currentGA && (
              <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                  Âge gestationnel actuel
                </h4>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  {formatGA(pregnancyInfo.currentGA)}
                </p>
              </div>
            )}

            {trimesterInfo && (
              <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                  {trimesterInfo.name}
                </h4>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {trimesterInfo.range}
                </p>
                <div className="mt-3">
                  <h5 className="text-sm font-medium text-gray-900 dark:text-white">
                    Événements clés :
                  </h5>
                  <ul className="mt-2 space-y-1">
                    {trimesterInfo.keyEvents.map((event, index) => (
                      <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                        <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 mr-2"></span>
                        {event}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}