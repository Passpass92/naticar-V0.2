import React from 'react';

export default function HealthInfo({ formData, onChange }: {
  formData: any;
  onChange: (data: any) => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Antécédents médicaux
        </label>
        <div className="space-y-2">
          {[
            'Diabète',
            'Hypertension',
            'Problèmes cardiaques',
            'Allergies',
            'Aucun antécédent particulier'
          ].map((option) => (
            <label key={option} className="flex items-center">
              <input
                type="checkbox"
                name="medicalHistory"
                value={option}
                checked={formData.medicalHistory?.includes(option)}
                onChange={(e) => {
                  const current = formData.medicalHistory || [];
                  const newHistory = e.target.checked
                    ? [...current, option]
                    : current.filter((item: string) => item !== option);
                  onChange({ medicalHistory: newHistory });
                }}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 rounded"
              />
              <span className="ml-3 text-gray-700">{option}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Allergies ou restrictions alimentaires
        </label>
        <textarea
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          rows={3}
          placeholder="Décrivez vos allergies ou restrictions alimentaires"
          value={formData.allergies || ''}
          onChange={(e) => onChange({ allergies: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Informations d'assurance santé
        </label>
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Numéro d'assurance ou mutuelle"
          value={formData.insuranceInfo || ''}
          onChange={(e) => onChange({ insuranceInfo: e.target.value })}
        />
      </div>
    </div>
  );
}