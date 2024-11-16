import React from 'react';

export default function Preferences({ formData, onChange }: {
  formData: any;
  onChange: (data: any) => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Fréquence des notifications
        </label>
        <div className="space-y-2">
          {[
            { value: 'daily', label: 'Quotidienne' },
            { value: 'weekly', label: 'Hebdomadaire' }
          ].map((option) => (
            <label key={option.value} className="flex items-center">
              <input
                type="radio"
                name="notificationFrequency"
                value={option.value}
                checked={formData.notificationFrequency === option.value}
                onChange={(e) => onChange({ notificationFrequency: e.target.value })}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-3 text-gray-700">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Types de contenu souhaités
        </label>
        <div className="space-y-2">
          {[
            { value: 'health', label: 'Conseils santé' },
            { value: 'nutrition', label: 'Nutrition' },
            { value: 'exercise', label: 'Exercices adaptés' },
            { value: 'administrative', label: 'Démarches administratives' },
            { value: 'babyDevelopment', label: 'Développement du bébé' }
          ].map((option) => (
            <label key={option.value} className="flex items-center">
              <input
                type="checkbox"
                name="contentTypes"
                value={option.value}
                checked={formData.contentTypes?.includes(option.value)}
                onChange={(e) => {
                  const current = formData.contentTypes || [];
                  const newTypes = e.target.checked
                    ? [...current, option.value]
                    : current.filter((item: string) => item !== option.value);
                  onChange({ contentTypes: newTypes });
                }}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 rounded"
              />
              <span className="ml-3 text-gray-700">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Format de contenu préféré
        </label>
        <div className="space-y-2">
          {[
            { value: 'text', label: 'Articles et guides' },
            { value: 'video', label: 'Vidéos' },
            { value: 'audio', label: 'Podcasts et audio' }
          ].map((option) => (
            <label key={option.value} className="flex items-center">
              <input
                type="checkbox"
                name="contentFormat"
                value={option.value}
                checked={formData.contentFormat?.includes(option.value)}
                onChange={(e) => {
                  const current = formData.contentFormat || [];
                  const newFormats = e.target.checked
                    ? [...current, option.value]
                    : current.filter((item: string) => item !== option.value);
                  onChange({ contentFormat: newFormats });
                }}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 rounded"
              />
              <span className="ml-3 text-gray-700">{option.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}