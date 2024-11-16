import React from 'react';
import { FileText, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { useNavigationStore } from '../stores/navigationStore';

const administrativeTasks = [
  {
    id: '1',
    title: 'Déclaration de grossesse',
    deadline: '16ème semaine',
    status: 'pending',
    description: 'À envoyer à la CAF et à votre CPAM'
  },
  {
    id: '2',
    title: 'Congé maternité',
    deadline: '3ème mois',
    status: 'todo',
    description: 'Informer votre employeur'
  },
  {
    id: '3',
    title: 'Prime de naissance',
    deadline: '7ème mois',
    status: 'completed',
    description: 'Demande auprès de la CAF'
  }
];

export default function AdministrativeOverview() {
  const { setCurrentSection } = useNavigationStore();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-amber-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-400" />;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Démarches administratives</h2>
        <button
          onClick={() => setCurrentSection('administrative')}
          className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          Voir tout
        </button>
      </div>

      <div className="space-y-4">
        {administrativeTasks.map((task) => (
          <div
            key={task.id}
            className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
          >
            <div className="flex-shrink-0">
              {getStatusIcon(task.status)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {task.title}
                </p>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Avant {task.deadline}
                </span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {task.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}