import React from 'react';
import DevelopmentTracker from './DevelopmentTracker';
import { developmentMilestones } from './data';

export default function Development() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Développement</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Suivi du développement de votre enfant
        </p>
      </div>

      <DevelopmentTracker
        milestones={developmentMilestones}
        themeColor="indigo"
      />
    </div>
  );
}