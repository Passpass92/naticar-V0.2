import React from 'react';

export default function BasicInfo({ formData, onChange }: { 
  formData: any; 
  onChange: (data: any) => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nom complet
        </label>
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Votre nom"
          value={formData.name || ''}
          onChange={(e) => onChange({ name: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="votre@email.com"
          value={formData.email || ''}
          onChange={(e) => onChange({ email: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Téléphone
        </label>
        <input
          type="tel"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Votre numéro de téléphone"
          value={formData.phone || ''}
          onChange={(e) => onChange({ phone: e.target.value })}
        />
      </div>
    </div>
  );
}