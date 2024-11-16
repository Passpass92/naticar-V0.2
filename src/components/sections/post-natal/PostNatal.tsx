import React, { useState } from 'react';
import { 
  LineChart, Moon, Utensils, Calendar, Brain, 
  Users, Activity, Heart, Baby, SmilePlus 
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

import GrowthChart from './GrowthChart';
import VaccineCard from './VaccineCard';
import SleepTracker from './SleepTracker';
import SleepTips from './SleepTips';
import ParentingSupport from './ParentingSupport';
import DevelopmentTracker from './DevelopmentTracker';
import FeedingSchedule from './FeedingSchedule';
import HealthOverview from './HealthOverview';
import Mood from './Mood';
import MoodHelp from './MoodHelp';
import MoodDiscuss from './MoodDiscuss';

import { 
  growthData, 
  omsReferenceData, 
  vaccineSchedule, 
  sleepData,
  feedingData,
  developmentMilestones 
} from './data';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function PostNatal() {
  const [babyGender, setBabyGender] = useState<'boy' | 'girl' | 'neutral'>('neutral');
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [showOmsReference, setShowOmsReference] = useState(false);

  const getThemeColor = () => {
    switch (babyGender) {
      case 'boy': return 'blue';
      case 'girl': return 'pink';
      default: return 'purple';
    }
  };

  const themeColor = getThemeColor();

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

  const getDatasetColor = () => {
    switch (babyGender) {
      case 'boy': return 'rgb(59, 130, 246)';
      case 'girl': return 'rgb(236, 72, 153)';
      default: return 'rgb(147, 51, 234)';
    }
  };

  const createChartData = (measurements: number[], reference?: number[]) => {
    const datasets = [
      {
        label: 'Mesures',
        data: measurements,
        borderColor: getDatasetColor(),
        backgroundColor: `${getDatasetColor()}50`,
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
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Suivi post-natal</h1>
          <div className="flex space-x-4">
            <button
              onClick={() => setBabyGender('boy')}
              className={`px-4 py-2 rounded-lg ${
                babyGender === 'boy'
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
                  : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
              }`}
            >
              Garçon
            </button>
            <button
              onClick={() => setBabyGender('girl')}
              className={`px-4 py-2 rounded-lg ${
                babyGender === 'girl'
                  ? 'bg-pink-100 text-pink-700 dark:bg-pink-900/50 dark:text-pink-300'
                  : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
              }`}
            >
              Fille
            </button>
            <button
              onClick={() => setBabyGender('neutral')}
              className={`px-4 py-2 rounded-lg ${
                babyGender === 'neutral'
                  ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300'
                  : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
              }`}
            >
              Neutre
            </button>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <nav className="flex space-x-4">
          {[
            { id: 'overview', label: 'Vue d\'ensemble', icon: <Activity /> },
            { id: 'growth', label: 'Croissance', icon: <LineChart /> },
            { id: 'development', label: 'Développement', icon: <Brain /> },
            { id: 'sleep', label: 'Sommeil', icon: <Moon /> },
            { id: 'feeding', label: 'Alimentation', icon: <Utensils /> },
            { id: 'vaccines', label: 'Vaccins', icon: <Heart /> },
            { id: 'support', label: 'Soutien', icon: <Users /> }
          ].map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center px-4 py-2 rounded-lg ${
                activeSection === section.id
                  ? `bg-${themeColor}-100 text-${themeColor}-700 dark:bg-${themeColor}-900/50 dark:text-${themeColor}-300`
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              {React.cloneElement(section.icon, { className: 'h-5 w-5 mr-2' })}
              {section.label}
            </button>
          ))}
        </nav>
      </div>

      {activeSection === 'overview' && (
        <HealthOverview 
          latestData={growthData[growthData.length - 1]} 
          nextVaccine={vaccineSchedule[0]}
          developmentMilestones={developmentMilestones}
          themeColor={themeColor}
        />
      )}

      {activeSection === 'growth' && (
        <>
          <div className="mb-4 flex justify-end">
            <button
              onClick={() => setShowOmsReference(!showOmsReference)}
              className={`flex items-center px-4 py-2 rounded-lg text-sm ${
                showOmsReference
                  ? `bg-${themeColor}-100 text-${themeColor}-700`
                  : 'bg-gray-100 text-gray-700'
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
              themeColor={themeColor}
            />
            <GrowthChart
              title="Taille"
              data={createChartData(
                growthData.map(d => d.height),
                omsReferenceData.height
              )}
              options={chartOptions}
              themeColor={themeColor}
            />
            <GrowthChart
              title="Périmètre crânien"
              data={createChartData(
                growthData.map(d => d.headCircumference),
                omsReferenceData.headCircumference
              )}
              options={chartOptions}
              themeColor={themeColor}
            />
          </div>
        </>
      )}

      {activeSection === 'development' && (
        <DevelopmentTracker
          milestones={developmentMilestones}
          themeColor={themeColor}
        />
      )}

      {activeSection === 'sleep' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SleepTracker data={sleepData} themeColor={themeColor} />
          <SleepTips themeColor={themeColor} />
        </div>
      )}

      {activeSection === 'feeding' && (
        <FeedingSchedule
          feedingData={feedingData}
          themeColor={themeColor}
        />
      )}

      {activeSection === 'vaccines' && (
        <div className="space-y-6">
          {vaccineSchedule.map((schedule, index) => (
            <VaccineCard
              key={index}
              schedule={schedule}
              themeColor={themeColor}
            />
          ))}
        </div>
      )}

      {activeSection === 'support' && (
        <ParentingSupport themeColor={themeColor} />
      )}

      {activeSection === 'mood-evaluate' && (
        <Mood />
      )}

      {activeSection === 'mood-help' && (
        <MoodHelp />
      )}

      {activeSection === 'mood-discuss' && (
        <MoodDiscuss />
      )}
    </div>
  );
}