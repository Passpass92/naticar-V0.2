import React from 'react';
import { Line } from 'react-chartjs-2';

interface GrowthChartProps {
  title: string;
  data: any;
  options: any;
  themeColor: string;
}

export default function GrowthChart({ title, data, options, themeColor }: GrowthChartProps) {
  return (
    <div className={`bg-white dark:bg-gray-800 shadow rounded-lg p-6 border-t-4 border-${themeColor}-500`}>
      <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
        {title}
      </h2>
      <div className="h-[300px]">
        <Line options={options} data={data} />
      </div>
    </div>
  );
}