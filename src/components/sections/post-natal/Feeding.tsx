import React from 'react';
import FeedingSchedule from './FeedingSchedule';
import { feedingData } from './data';

export default function Feeding() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Alimentation</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Suivi de l'alimentation de votre enfant
        </p>
      </div>

      <FeedingSchedule
        feedingData={feedingData}
        themeColor="indigo"
      />
    </div>
  );
}