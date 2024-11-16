import React, { useState } from 'react';
import GrowthChart from './GrowthChart';
import PsychomotorDevelopment from './growth/PsychomotorDevelopment';
import { growthData, omsReferenceData } from './data';
import { Brain, Activity, Ruler } from 'lucide-react';

export default function Growth() {
  const [showOmsReference, setShowOmsReference] = useState(false);
  const [activeTab, setActiveTab] = useState<'measurements' | 'development'>('measurements');

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  };

  const createChartData = (measurements: number[], reference?: number[]) => {
    const datasets = [
      {
        label: 'Mesures',
        data: measurements,
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.5)',
      }
    ];

    if (showOmsReference && reference) {
      datasets.push({
        label: 'Référence OMS',
        data: reference,
        borderColor: 'rgba(156, 163, 175, 0.5)',
        backgroundColor: 'rgba(156, 163, 175, 0.2)',
        borderDash: [5, 5],
      });
    }

    return {
      labels: growthData.map(d => new Date(d.date).toLocaleDateString('fr-FR')),
      datasets
    };
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Croissance</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Suivi de la croissance et du développement de votre enfant
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="mb-6">
        <nav className="flex space-x-4">
          <button
            onClick={() => setActiveTab('measurements')}
            className={`flex items-center px-4 py-2 rounded-lg ${
              activeTab === 'measurements'
                ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            <Ruler className="h-5 w-5 mr-2" />
            Mesures physiques
          </button>
          <button
            onClick={() => setActiveTab('development')}
            className={`flex items-center px-4 py-2 rounded-lg ${
              activeTab === 'development'
                ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            <Brain className="h-5 w-5 mr-2" />
            Développement psychomoteur
          </button>
        </nav>
      </div>

      {activeTab === 'measurements' && (
        <>
          <div className="mb-4 flex justify-end">
            <button
              onClick={() => setShowOmsReference(!showOmsReference)}
              className={`flex items-center px-4 py-2 rounded-lg text-sm ${
                showOmsReference
                  ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300'
                  : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
              }`}
            >
              {showOmsReference ? 'Masquer' : 'Afficher'} les courbes OMS
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <GrowthChart
              title="Poids"
              data={createChartData(
                growthData.map(d => d.weight),
                omsReferenceData.weight
              )}
              options={chartOptions}
              themeColor="indigo"
            />
            <GrowthChart
              title="Taille"
              data={createChartData(
                growthData.map(d => d.height),
                omsReferenceData.height
              )}
              options={chartOptions}
              themeColor="indigo"
            />
            <GrowthChart
              title="Périmètre crânien"
              data={createChartData(
                growthData.map(d => d.headCircumference),
                omsReferenceData.headCircumference
              )}
              options={chartOptions}
              themeColor="indigo"
            />
          </div>
        </>
      )}

      {activeTab === 'development' && (
        <PsychomotorDevelopment />
      )}
    </div>
  );
}