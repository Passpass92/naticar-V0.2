import React from 'react';
import { 
  Baby, Calendar, Activity, Utensils, Brain, 
  Heart, Users, Moon, SmilePlus, BookOpen,
  ArrowUp, ArrowDown, AlertCircle, Clock
} from 'lucide-react';
import { useNavigationStore } from '../../../stores/navigationStore';
import { Line } from 'react-chartjs-2';
import { growthData, sleepData } from './data';

const quickStats = [
  {
    title: "Poids",
    value: "4.8 kg",
    change: "+300g",
    trend: "up",
    icon: <Activity className="h-6 w-6 text-blue-500" />
  },
  {
    title: "Taille",
    value: "55 cm",
    change: "+2cm",
    trend: "up",
    icon: <ArrowUp className="h-6 w-6 text-green-500" />
  },
  {
    title: "Sommeil",
    value: "14h",
    change: "stable",
    trend: "neutral",
    icon: <Moon className="h-6 w-6 text-indigo-500" />
  },
  {
    title: "Prochain vaccin",
    value: "2 semaines",
    change: "DTCaP",
    trend: "warning",
    icon: <Heart className="h-6 w-6 text-rose-500" />
  }
];

const growthChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: false
    }
  },
  scales: {
    y: {
      beginAtZero: false,
    }
  }
};

const growthChartData = {
  labels: growthData.map(d => new Date(d.date).toLocaleDateString('fr-FR')),
  datasets: [
    {
      label: 'Poids (kg)',
      data: growthData.map(d => d.weight),
      borderColor: 'rgb(99, 102, 241)',
      backgroundColor: 'rgba(99, 102, 241, 0.5)',
    }
  ]
};

const sleepChartData = {
  labels: sleepData.labels,
  datasets: [
    {
      label: 'Heures de sommeil',
      data: sleepData.datasets[0].data,
      borderColor: 'rgb(147, 51, 234)',
      backgroundColor: 'rgba(147, 51, 234, 0.5)',
    }
  ]
};

export default function Dashboard() {
  const { setCurrentSection } = useNavigationStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {quickStats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center">
                  {stat.icon}
                  <h3 className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                    {stat.title}
                  </h3>
                </div>
                <div className="mt-2 flex items-baseline">
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                  <p className={`ml-2 flex items-center text-sm ${
                    stat.trend === 'up' 
                      ? 'text-green-600 dark:text-green-400'
                      : stat.trend === 'down'
                      ? 'text-red-600 dark:text-red-400'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {stat.change}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Growth and Sleep Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Courbe de croissance
          </h3>
          <div className="h-[300px]">
            <Line options={growthChartOptions} data={growthChartData} />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Suivi du sommeil
          </h3>
          <div className="h-[300px]">
            <Line options={growthChartOptions} data={sleepChartData} />
          </div>
        </div>
      </div>

      {/* Next Actions and Reminders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Prochains rendez-vous
            </h3>
            <button
              onClick={() => setCurrentSection('appointments')}
              className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-500"
            >
              Voir tout
            </button>
          </div>
          <div className="space-y-4">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-gray-400" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Visite 2 mois
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  25 Mars - Dr. Martin
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Développement
            </h3>
            <button
              onClick={() => setCurrentSection('development')}
              className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-500"
            >
              Voir les progrès
            </button>
          </div>
          <div className="space-y-3">
            <div className="flex items-center">
              <Brain className="h-5 w-5 text-purple-500" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Prochaine étape
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Tenue de tête
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Alimentation
            </h3>
            <button
              onClick={() => setCurrentSection('feeding')}
              className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-500"
            >
              Voir le suivi
            </button>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-gray-400" />
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                  Dernier repas
                </span>
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                14:30
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-gray-400" />
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                  Prochain repas
                </span>
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                ~17:30
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <div className="flex items-center mb-4">
            <SmilePlus className="h-6 w-6 text-indigo-500" />
            <h3 className="ml-2 text-lg font-medium text-gray-900 dark:text-white">
              Bien-être
            </h3>
          </div>
          <button
            onClick={() => setCurrentSection('mood-evaluate')}
            className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Évaluer mon humeur
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <div className="flex items-center mb-4">
            <Users className="h-6 w-6 text-indigo-500" />
            <h3 className="ml-2 text-lg font-medium text-gray-900 dark:text-white">
              Support
            </h3>
          </div>
          <button
            onClick={() => setCurrentSection('support')}
            className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Contacter un professionnel
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <div className="flex items-center mb-4">
            <BookOpen className="h-6 w-6 text-indigo-500" />
            <h3 className="ml-2 text-lg font-medium text-gray-900 dark:text-white">
              Conseils
            </h3>
          </div>
          <button
            onClick={() => setCurrentSection('advice')}
            className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Accéder aux conseils
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <div className="flex items-center mb-4">
            <AlertCircle className="h-6 w-6 text-yellow-500" />
            <h3 className="ml-2 text-lg font-medium text-gray-900 dark:text-white">
              Rappels
            </h3>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <p>• Prochain vaccin dans 2 semaines</p>
            <p>• Rendez-vous pédiatre le 25/03</p>
          </div>
        </div>
      </div>
    </div>
  );
}