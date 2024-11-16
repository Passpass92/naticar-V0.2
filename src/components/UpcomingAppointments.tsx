import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import { appointmentService } from '../services/appointmentService';
import { useAuth } from '../hooks/useAuth';
import AddAppointmentModal from './appointments/AddAppointmentModal';

export default function UpcomingAppointments() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadAppointments = async () => {
    if (!user) return;
    const userAppointments = await appointmentService.getUserAppointments(user.uid);
    setAppointments(userAppointments);
  };

  useEffect(() => {
    loadAppointments();
  }, [user]);

  const handleAppointmentCreated = () => {
    loadAppointments();
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Prochains Rendez-vous</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            + Ajouter
          </button>
        </div>

        <div className="space-y-4">
          {appointments.map((appointment) => (
            <AppointmentCard key={appointment.id} appointment={appointment} />
          ))}
        </div>
      </div>

      <AddAppointmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleAppointmentCreated}
      />
    </>
  );
}

function AppointmentCard({ appointment }: { appointment: any }) {
  const typeColors = {
    consultation: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    echographie: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    analyse: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
  };

  return (
    <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
      <Calendar className="h-10 w-10 text-gray-400" />
      <div className="ml-4 flex-1">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white">{appointment.title}</h3>
          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${typeColors[appointment.type as keyof typeof typeColors]}`}>
            {appointment.type}
          </span>
        </div>
        <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          <p>{appointment.doctor}</p>
          <p>{new Date(appointment.date).toLocaleDateString('fr-FR')} à {new Date(appointment.date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</p>
          {appointment.location && <p>{appointment.location}</p>}
        </div>
      </div>
    </div>
  );
}