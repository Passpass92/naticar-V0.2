import React, { useState } from 'react';
import { Calendar, Plus, HeartPulse, Activity, Brain, AlertCircle } from 'lucide-react';
import AddAppointmentModal from '../appointments/AddAppointmentModal';
import { useUserStore } from '../../stores/userStore';

const prenatalAppointments = [
  {
    id: '1',
    title: 'Échographie T2',
    date: new Date('2024-03-25T10:00:00'),
    doctor: 'Dr. Martin',
    location: 'Centre d\'échographie',
    type: 'echography',
    category: 'Échographies',
    description: 'Échographie morphologique'
  },
  {
    id: '2',
    title: 'Consultation sage-femme',
    date: new Date('2024-04-02T14:30:00'),
    doctor: 'Mme Dubois',
    location: 'Cabinet de sage-femme',
    type: 'midwife',
    category: 'Sage-femme',
    description: 'Suivi mensuel'
  },
  {
    id: '3',
    title: 'Test glycémie',
    date: new Date('2024-04-15T08:00:00'),
    doctor: 'Laboratoire Central',
    location: 'Laboratoire d\'analyses',
    type: 'test',
    category: 'Examens',
    description: 'Test de dépistage du diabète gestationnel'
  }
];

const postnatalAppointments = [
  {
    id: '1',
    title: 'Visite PMI 1er mois',
    date: new Date('2024-03-25T10:00:00'),
    doctor: 'Dr. Bernard',
    location: 'Centre PMI',
    type: 'pmi',
    category: 'Suivi PMI',
    description: 'Premier examen post-natal'
  },
  {
    id: '2',
    title: 'Vaccins 2 mois',
    date: new Date('2024-04-15T14:30:00'),
    doctor: 'Dr. Martin',
    location: 'Centre de vaccination',
    type: 'vaccination',
    category: 'Vaccinations',
    description: 'DTCaP Hib HepB + Pneumocoque'
  }
];

const prenatalSchedule = [
  {
    month: '1er mois',
    appointments: [
      'Première consultation prénatale',
      'Déclaration de grossesse',
      'Examens sanguins'
    ]
  },
  {
    month: '3ème mois',
    appointments: [
      'Échographie T1 (12-14 SA)',
      'Consultation mensuelle',
      'Test trisomie 21'
    ]
  },
  {
    month: '5ème mois',
    appointments: [
      'Échographie T2 (22-24 SA)',
      'Consultation mensuelle',
      'Bilan sanguin'
    ]
  },
  {
    month: '8ème mois',
    appointments: [
      'Échographie T3 (32-34 SA)',
      'Consultation mensuelle',
      'Monitoring'
    ]
  }
];

const postnatalSchedule = [
  {
    age: 'Naissance',
    appointments: [
      'Examen complet du nouveau-né',
      'BCG',
      'Test de Guthrie'
    ]
  },
  {
    age: '1 mois',
    appointments: [
      'Première visite PMI',
      'Examen post-natal mère'
    ]
  },
  {
    age: '2 mois',
    appointments: [
      'Vaccins obligatoires',
      'Examen du développement'
    ]
  },
  {
    age: '4 mois',
    appointments: [
      'Vaccins (2ème dose)',
      'Suivi de croissance'
    ]
  }
];

export default function Appointments() {
  const [showModal, setShowModal] = useState(false);
  const { period } = useUserStore();
  const appointments = period === 'prenatal' ? prenatalAppointments : postnatalAppointments;
  const schedule = period === 'prenatal' ? prenatalSchedule : postnatalSchedule;

  const getAppointmentIcon = (type: string) => {
    switch (type) {
      case 'vaccination':
        return <HeartPulse className="h-6 w-6 text-rose-600" />;
      case 'pmi':
        return <Brain className="h-6 w-6 text-purple-600" />;
      case 'echography':
        return <Activity className="h-6 w-6 text-blue-600" />;
      case 'midwife':
        return <HeartPulse className="h-6 w-6 text-green-600" />;
      case 'test':
        return <Activity className="h-6 w-6 text-amber-600" />;
      default:
        return <Calendar className="h-6 w-6 text-indigo-600" />;
    }
  };

  const getAppointmentClass = (type: string) => {
    switch (type) {
      case 'vaccination':
        return 'bg-rose-50 dark:bg-rose-900/50';
      case 'pmi':
        return 'bg-purple-50 dark:bg-purple-900/50';
      case 'echography':
        return 'bg-blue-50 dark:bg-blue-900/50';
      case 'midwife':
        return 'bg-green-50 dark:bg-green-900/50';
      case 'test':
        return 'bg-amber-50 dark:bg-amber-900/50';
      default:
        return 'bg-indigo-50 dark:bg-indigo-900/50';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Rendez-vous</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            {period === 'prenatal' 
              ? 'Suivi de grossesse'
              : 'Suivi post-natal'
            }
          </p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Nouveau rendez-vous
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {appointments.map((appointment) => (
            <div 
              key={appointment.id}
              className={`${getAppointmentClass(appointment.type)} rounded-lg p-6`}
            >
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  {getAppointmentIcon(appointment.type)}
                </div>
                <div className="ml-4 flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        {appointment.title}
                      </h3>
                      <span className="inline-block mt-1 px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                        {appointment.category}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {appointment.date.toLocaleDateString()}
                    </span>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {appointment.description}
                    </p>
                    <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      <p>Avec: {appointment.doctor}</p>
                      <p>Heure: {appointment.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                      <p>Lieu: {appointment.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              {period === 'prenatal' ? 'Calendrier de suivi' : 'Calendrier vaccinal et examens'}
            </h2>
            <div className="space-y-4">
              {schedule.map((period, index) => (
                <div 
                  key={index}
                  className="border-l-4 border-indigo-500 pl-4 py-2"
                >
                  <h3 className="text-md font-medium text-gray-900 dark:text-white">
                    {period.age || period.month}
                  </h3>
                  <ul className="mt-2 space-y-2">
                    {period.appointments.map((appointment, idx) => (
                      <li 
                        key={idx}
                        className="flex items-center text-sm text-gray-600 dark:text-gray-300"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 mr-2"></span>
                        {appointment}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <div className="flex items-start">
              <AlertCircle className="h-6 w-6 text-indigo-500 mt-0.5" />
              <div className="ml-3">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Rappels importants
                </h3>
                <ul className="mt-2 space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  {period === 'prenatal' ? (
                    <>
                      <li>• Apportez votre carnet de santé</li>
                      <li>• Venez à jeun pour les tests sanguins</li>
                      <li>• Prévoyez les documents nécessaires</li>
                    </>
                  ) : (
                    <>
                      <li>• Apportez le carnet de santé du bébé</li>
                      <li>• Respectez le calendrier vaccinal</li>
                      <li>• Suivez les visites PMI recommandées</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AddAppointmentModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={() => {
          setShowModal(false);
          // Refresh appointments list
        }}
      />
    </div>
  );
}