import React from 'react';
import { LineChart, Activity, Weight, Ruler } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const measurements = [
  {
    id: '1',
    date: new Date('2024-01-01'),
    weight: 65.5,
    bloodPressure: '120/80',
    waistSize: 92
  },
  {
    id: '2',
    date: new Date('2024-01-15'),
    weight: 66.2,
    bloodPressure: '118/78',
    waistSize: 93
  },
  {
    id: '3',
    date: new Date('2024-02-01'),
    weight: 67.0,
    bloodPressure: '122/82',
    waistSize: 94
  },
  {
    id: '4',
    date: new Date('2024-02-15'),
    weight: 67.8,
    bloodPressure: '120/80',
    waistSize: 95
  },
  {
    id: '5',
    date: new Date('2024-03-01'),
    weight: 68.5,
    bloodPressure: '118/78',
    waistSize: 96
  },
  {
    id: '6',
    date: new Date('2024-03-15'),
    weight: 69.2,
    bloodPressure: '120/80',
    waistSize: 97
  }
];

const chartOptions: ChartOptions<'line'> = {
  responsive: true,
  interaction: {
    mode: 'index' as const,
    intersect: false,
  },
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: false
    },
  },
  scales: {
    y: {
      type: 'linear' as const,
      display: true,
      position: 'left' as const,
    },
    y1: {
      type: 'linear' as const,
      display: true,
      position: 'right' as const,
      grid: {
        drawOnChartArea: false,
      },
    },
  },
};

const labels = measurements.map(m => m.date.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' }));

const chartData = {
  labels,
  datasets: [
    {
      label: 'Poids (kg)',
      data: measurements.map(m => m.weight),
      borderColor: 'rgb(99, 102, 241)',
      backgroundColor: 'rgba(99, 102, 241, 0.5)',
      yAxisID: 'y',
    },
    {
      label: 'Tour de ventre (cm)',
      data: measurements.map(m => m.waistSize),
      borderColor: 'rgb(34, 197, 94)',
      backgroundColor: 'rgba(34, 197, 94, 0.5)',
      yAxisID: 'y1',
    },
  ],
};

const bloodPressureData = {
  labels,
  datasets: [
    {
      label: 'Systolique',
      data: measurements.map(m => parseInt(m.bloodPressure.split('/')[0])),
      borderColor: 'rgb(244, 63, 94)',
      backgroundColor: 'rgba(244, 63, 94, 0.5)',
      yAxisID: 'y',
    },
    {
      label: 'Diastolique',
      data: measurements.map(m => parseInt(m.bloodPressure.split('/')[1])),
      borderColor: 'rgb(251, 146, 60)',
      backgroundColor: 'rgba(251, 146, 60, 0.5)',
      yAxisID: 'y',
    },
  ],
};

export default function Measurements() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Mesures</h1>
        <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
          <Activity className="h-5 w-5 mr-2" />
          Nouvelle mesure
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <MeasurementCard
          icon={<Weight className="h-8 w-8 text-indigo-600" />}
          title="Poids"
          value="69.2 kg"
          change="+0.7 kg"
        />
        <MeasurementCard
          icon={<Activity className="h-8 w-8 text-rose-600" />}
          title="Tension"
          value="120/80"
          change="Normal"
        />
        <MeasurementCard
          icon={<Ruler className="h-8 w-8 text-emerald-600" />}
          title="Tour de ventre"
          value="97 cm"
          change="+1 cm"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Évolution du poids et tour de ventre
          </h2>
          <div className="h-[300px]">
            <Line options={chartOptions} data={chartData} />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Évolution de la tension artérielle
          </h2>
          <div className="h-[300px]">
            <Line options={chartOptions} data={bloodPressureData} />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Historique</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Poids</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Tension</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Tour de ventre</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {measurements.map((measurement) => (
                <tr key={measurement.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {measurement.date.toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {measurement.weight} kg
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {measurement.bloodPressure}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {measurement.waistSize} cm
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function MeasurementCard({ icon, title, value, change }: {
  icon: React.ReactNode;
  title: string;
  value: string;
  change: string;
}) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          {icon}
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">{title}</h3>
          <div className="mt-1">
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">{value}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{change}</p>
          </div>
        </div>
      </div>
    </div>
  );
}