import React from 'react';
import ParentingSupport from './ParentingSupport';

export default function Support() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Soutien</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Ressources et soutien pour les parents
        </p>
      </div>

      <ParentingSupport themeColor="indigo" />
    </div>
  );
}