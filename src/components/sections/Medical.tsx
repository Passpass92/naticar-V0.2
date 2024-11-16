import React from 'react';
import { HeartPulse, FileText, Activity, AlertCircle } from 'lucide-react';

const medicalData = {
  nextAppointment: {
    date: new Date('2024-03-25'),
    type: 'Consultation mensuelle',
    doctor: 'Dr. Martin'
  },
  recentTests: [
    {
      id: '1',
      date: new Date('2024-03-10'),
      type: 'Analyse de sang',
      status: 'normal',
      results: 'Taux de fer: 11.5 g/dL'
    },
    {
      id: '2',
      date: new Date('2024-03-05'),
      type: 'Tension artérielle',
      status: 'attention',
      results: '140/90 mmHg'
    }
  ]
};

export default function Medical() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Suivi Médical</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Suivez vos rendez-vous et résultats médicaux
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <div className="flex items-center mb-4">
            <HeartPulse className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            <h2 className="ml-2 text-lg font-medium text-gray-900 dark:text-white">
              Prochain rendez-vous
            </h2>
          </div>
          <div className="space-y-2">
            <p className="text-gray-600 dark:text-gray-400">
              Date: {medicalData.nextAppointment.date.toLocaleDateString()}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Type: {medicalData.nextAppointment.type}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Médecin: {medicalData.nextAppointment.doctor}
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Activity className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            <h2 className="ml-2 text-lg font-medium text-gray-900 dark:text-white">
              Derniers examens
            </h2>
          </div>
          <div className="space-y-4">
            {medicalData.recentTests.map((test) => (
              <div 
                key={test.id}
                className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
              >
                <div className={`flex-shrink-0 ${
                  test.status === 'normal' 
                    ? 'text-green-500' 
                    : 'text-yellow-500'
                }`}>
                  {test.status === 'normal' ? (
                    <FileText className="h-5 w-5" />
                  ) : (
                    <AlertCircle className="h-5 w-5" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{test.type}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {test.date.toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    {test.results}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Documents importants
        </h2>
        <div className="space-y-4">
          <DocumentRow
            title="Carnet de santé numérique"
            date="Mis à jour le 15/03/2024"
            type="pdf"
          />
          <DocumentRow
            title="Résultats dernière prise de sang"
            date="10/03/2024"
            type="pdf"
          />
          <DocumentRow
            title="Échographie T2"
            date="01/03/2024"
            type="image"
          />
        </div>
      </div>
    </div>
  );
}

function DocumentRow({ title, date, type }: { title: string; date: string; type: string }) {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
      <div className="flex items-center">
        <FileText className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
        <div className="ml-3">
          <p className="text-sm font-medium text-gray-900 dark:text-white">{title}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{date}</p>
        </div>
      </div>
      <button className="px-3 py-1 text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300">
        Voir
      </button>
    </div>
  );
}