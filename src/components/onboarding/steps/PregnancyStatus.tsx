import React, { useState } from 'react';
import { Calendar, Info } from 'lucide-react';

export default function PregnancyStatus({ formData, onChange }: {
  formData: any;
  onChange: (data: any) => void;
}) {
  const [dateType, setDateType] = useState<'lmp' | 'conception'>('lmp');

  const calculateDueDate = (date: string, type: 'lmp' | 'conception') => {
    if (!date) return '';
    
    const inputDate = new Date(date);
    const dueDate = new Date(inputDate);
    
    if (type === 'lmp') {
      // Pour la date des dernières règles : ajouter 280 jours (40 semaines)
      dueDate.setDate(dueDate.getDate() + 280);
    } else {
      // Pour la date de conception : ajouter 266 jours (38 semaines)
      dueDate.setDate(dueDate.getDate() + 266);
    }
    
    return dueDate.toISOString().split('T')[0];
  };

  const handleDateChange = (date: string) => {
    const dueDate = calculateDueDate(date, dateType);
    onChange({ 
      [dateType === 'lmp' ? 'lastPeriodDate' : 'conceptionDate']: date,
      dueDate
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Type de date
        </label>
        <div className="grid grid-cols-2 gap-4 mb-4">
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

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Calendar className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="date"
            value={dateType === 'lmp' ? formData.lastPeriodDate || '' : formData.conceptionDate || ''}
            onChange={(e) => handleDateChange(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        {formData.dueDate && (
          <div className="mt-4 p-4 bg-indigo-50 dark:bg-indigo-900/50 rounded-lg">
            <div className="flex items-start">
              <Info className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mt-0.5" />
              <div className="ml-3">
                <h4 className="text-sm font-medium text-indigo-800 dark:text-indigo-200">
                  Date prévue d'accouchement
                </h4>
                <p className="mt-1 text-sm text-indigo-700 dark:text-indigo-300">
                  {new Date(formData.dueDate).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Statut
        </label>
        <div className="space-y-2">
          {['Première grossesse', 'Grossesse suivante', 'Déjà parent'].map((option) => (
            <label key={option} className="flex items-center">
              <input
                type="radio"
                name="status"
                value={option}
                checked={formData.status === option}
                onChange={(e) => onChange({ status: e.target.value })}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-3 text-gray-700 dark:text-gray-300">{option}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}