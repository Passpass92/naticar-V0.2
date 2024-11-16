import React from 'react';
import { Line } from 'react-chartjs-2';

interface SleepTrackerProps {
  data: any;
  themeColor: string;
}

export default function SleepTracker({ data, themeColor }: SleepTrackerProps) {
  return (
    <div className={`bg-white dark:bg-gray-800 shadow rounded-lg p-6 border-l-4 border-${themeColor}-500`}>
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Suivi du sommeil</h3>
      <div className="h-[300px]">
        <Line
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top' as const,
              },
            },
          }}
          data={data}
        />
      </div>
    </div>
  );
}