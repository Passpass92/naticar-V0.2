import React from 'react';
import { Calendar, Baby, Activity, Utensils, Briefcase, AlertCircle } from 'lucide-react';
import { useNavigationStore } from '../stores/navigationStore';
import PregnancyProgress from './PregnancyProgress';
import UpcomingAppointments from './UpcomingAppointments';
import WeeklyInsights from './WeeklyInsights';
import AdministrativeOverview from './AdministrativeOverview';

interface QuickActionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
  color?: string;
}

function QuickActionCard({ icon, title, description, onClick, color = 'indigo' }: QuickActionCardProps) {
  return (
    <button
      onClick={onClick}
      className={`p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border-l-4 border-${color}-500 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors text-left w-full`}
    >
      <div className="flex items-start">
        <div className={`flex-shrink-0 p-3 bg-${color}-100 dark:bg-${color}-900/50 rounded-lg`}>
          {icon}
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">{title}</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>
        </div>
      </div>
    </button>
  );
}

export default function Dashboard() {
  const { setCurrentSection } = useNavigationStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Content - Left Column */}
        <div className="lg:col-span-8 space-y-6">
          <PregnancyProgress />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <QuickActionCard
              icon={<Calendar className="h-8 w-8 text-indigo-500" />}
              title="Rendez-vous"
              description="Planifier un rendez-vous médical"
              onClick={() => setCurrentSection('appointments')}
              color="indigo"
            />
            <QuickActionCard
              icon={<Activity className="h-8 w-8 text-rose-500" />}
              title="Mesures"
              description="Suivre vos mesures importantes"
              onClick={() => setCurrentSection('measurements')}
              color="rose"
            />
          </div>

          <WeeklyInsights />
        </div>

        {/* Right Column - Important Information */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Actions importantes
            </h2>
            <div className="space-y-4">
              <QuickActionCard
                icon={<Briefcase className="h-8 w-8 text-amber-500" />}
                title="Démarches"
                description="Gérer vos démarches administratives"
                onClick={() => setCurrentSection('administrative')}
                color="amber"
              />
              <QuickActionCard
                icon={<Baby className="h-8 w-8 text-blue-500" />}
                title="Préparation"
                description="Préparer l'arrivée de bébé"
                onClick={() => setCurrentSection('birth-prep')}
                color="blue"
              />
            </div>
          </div>

          <UpcomingAppointments />

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <div className="flex items-start">
              <AlertCircle className="h-6 w-6 text-indigo-500 mt-0.5" />
              <div className="ml-3">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Rappels
                </h3>
                <ul className="mt-2 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>• Prochain rendez-vous dans 5 jours</li>
                  <li>• Prise de sang à faire cette semaine</li>
                  <li>• Déclaration CAF à compléter</li>
                </ul>
              </div>
            </div>
          </div>

          <AdministrativeOverview />
        </div>
      </div>
    </div>
  );
}