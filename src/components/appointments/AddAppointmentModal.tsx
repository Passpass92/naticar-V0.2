import React, { useState } from 'react';
import { X, Calendar } from 'lucide-react';
import { appointmentService } from '../../services/appointmentService';
import { useAuth } from '../../hooks/useAuth';

interface AddAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddAppointmentModal({ isOpen, onClose, onSuccess }: AddAppointmentModalProps) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    doctor: '',
    type: 'consultation',
    location: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    setError('');

    try {
      const dateTime = new Date(`${formData.date}T${formData.time}`);
      
      await appointmentService.createAppointment({
        userId: user.uid,
        title: formData.title,
        date: dateTime,
        doctor: formData.doctor,
        type: formData.type,
        location: formData.location
      });

      onSuccess();
      onClose();
    } catch (err) {
      setError('Une erreur est survenue lors de la création du rendez-vous');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

        <div className="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 px-4 pb-4 pt-5 shadow-xl transition-all sm:w-full sm:max-w-lg sm:p-6">
          <div className="absolute right-0 top-0 pr-4 pt-4">
            <button
              onClick={onClose}
              className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="mb-4">
            <div className="flex items-center justify-center mb-4">
              <div className="rounded-full bg-indigo-100 dark:bg-indigo-900/50 p-3">
                <Calendar className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white text-center">
              Nouveau rendez-vous
            </h2>
          </div>

          {error && (
            <div className="mb-4 p-4 rounded-md bg-red-50 dark:bg-red-900/50 text-red-600 dark:text-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Titre
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700"
                placeholder="Ex: Consultation mensuelle"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Date
                </label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Heure
                </label>
                <input
                  type="time"
                  required
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Médecin
              </label>
              <input
                type="text"
                required
                value={formData.doctor}
                onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700"
                placeholder="Dr. Dupont"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Type de rendez-vous
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700"
              >
                <option value="consultation">Consultation</option>
                <option value="echographie">Échographie</option>
                <option value="analyse">Analyse</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Lieu
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700"
                placeholder="Cabinet médical, hôpital..."
              />
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md disabled:opacity-50"
              >
                {loading ? 'Création...' : 'Créer le rendez-vous'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}