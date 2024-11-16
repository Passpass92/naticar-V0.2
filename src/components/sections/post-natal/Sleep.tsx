import React from 'react';
import SleepTracker from './SleepTracker';
import SleepTips from './SleepTips';
import { sleepData } from './data';

export default function Sleep() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Sommeil</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Suivi du sommeil de votre enfant
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SleepTracker data={sleepData} themeColor="indigo" />
        <SleepTips themeColor="indigo" />
      </div>
    </div>
  );
}