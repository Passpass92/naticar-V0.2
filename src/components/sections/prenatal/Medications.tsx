import React, { useState } from 'react';
import { Pill, Plus, Clock, AlertCircle, X, Calendar } from 'lucide-react';

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate?: string;
  notes?: string;
  reminders: string[];
  type: 'medication' | 'supplement';
}

interface ContraIndication {
  name: string;
  reason: string;
  alternatives?: string[];
}

const commonMedications: Medication[] = [
  {
    id: '1',
    name: 'Acide folique',
    dosage: '0.4mg',
    frequency: '1 fois par jour',
    startDate: '2024-01-01',
    type: 'supplement',
    reminders: ['08:00'],
    notes: 'À prendre le matin avec de la nourriture'
  },
  {
    id: '2',
    name: 'Fer',
    dosage: '30mg',
    frequency: '1 fois par jour',
    startDate: '2024-01-01',
    type: 'supplement',
    reminders: ['12:00'],
    notes: 'À prendre à distance des produits laitiers'
  }
];

const contraIndications: ContraIndication[] = [
  {
    name: 'Ibuprofène',
    reason: 'Risque pour le développement du fœtus',
    alternatives: ['Paracétamol (après avis médical)']
  },
  {
    name: 'Aspirine',
    reason: 'Risque hémorragique',
    alternatives: ['Paracétamol (après avis médical)']
  }
];

export default function Medications() {
  const [medications, setMedications] = useState<Medication[]>(commonMedications);
  const [showNewMedication, setShowNewMedication] = useState(false);
  const [newMedication, setNewMedication] = useState<Partial<Medication>>({
    startDate: new Date().toISOString().split('T')[0],
    type: 'supplement',
    reminders: []
  });

  const handleAddMedication = () => {
    if (newMedication.name && newMedication.dosage) {
      const medication: Medication = {
        id: Date.now().toString(),
        name: newMedication.name,
        dosage: newMedication.dosage,
        frequency: newMedication.frequency || '1 fois par jour',
        startDate: newMedication.startDate || new Date().toISOString().split('T')[0],
        endDate: newMedication.endDate,
        notes: newMedication.notes,
        type: newMedication.type || 'supplement',
        reminders: newMedication.reminders || []
      };

      setMedications([...medications, medication]);
      setNewMedication({
        startDate: new Date().toISOString().split('T')[0],
        type: 'supplement',
        reminders: []
      });
      setShowNewMedication(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Médicaments & Suppléments
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Gérez vos traitements et suppléments
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                Traitements en cours
              </h2>
              <button
                onClick={() => setShowNewMedication(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                <Plus className="h-5 w-5 mr-2" />
                Ajouter
              </button>
            </div>

            {showNewMedication && (
              <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Nouveau traitement
                  </h3>
                  <button
                    onClick={() => setShowNewMedication(false)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Type
                    </label>
                    <div className="flex space-x-4">
                      <button
                        onClick={() => setNewMedication({ ...newMedication, type: 'medication' })}
                        className={`px-4 py-2 rounded-md ${
                          newMedication.type === 'medication'
                            ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300'
                            : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                        }`}
                      >
                        Médicament
                      </button>
                      <button
                        onClick={() => setNewMedication({ ...newMedication, type: 'supplement' })}
                        className={`px-4 py-2 rounded-md ${
                          newMedication.type === 'supplement'
                            ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300'
                            : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                        }`}
                      >
                        Supplément
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Nom
                    </label>
                    <input
                      type="text"
                      value={newMedication.name || ''}
                      onChange={(e) => setNewMedication({ ...newMedication, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
                      placeholder="Nom du médicament ou supplément"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Dosage
                    </label>
                    <input
                      type="text"
                      value={newMedication.dosage || ''}
                      onChange={(e) => setNewMedication({ ...newMedication, dosage: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
                      placeholder="Ex: 400mg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Fréquence
                    </label>
                    <select
                      value={newMedication.frequency || ''}
                      onChange={(e) => setNewMedication({ ...newMedication, frequency: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
                    >
                      <option value="">Sélectionnez une fréquence</option>
                      <option value="1 fois par jour">1 fois par jour</option>
                      <option value="2 fois par jour">2 fois par jour</option>
                      <option value="3 fois par jour">3 fois par jour</option>
                      <option value="1 fois par semaine">1 fois par semaine</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Date de début
                      </label>
                      <input
                        type="date"
                        value={newMedication.startDate || ''}
                        onChange={(e) => setNewMedication({ ...newMedication, startDate: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Date de fin (optionnel)
                      </label>
                      <input
                        type="date"
                        value={newMedication.endDate || ''}
                        onChange={(e) => setNewMedication({ ...newMedication, endDate: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Notes
                    </label>
                    <textarea
                      value={newMedication.notes || ''}
                      onChange={(e) => setNewMedication({ ...newMedication, notes: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
                      rows={3}
                      placeholder="Instructions particulières..."
                    />
                  </div>

                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => setShowNewMedication(false)}
                      className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md"
                    >
                      Annuler
                    </button>
                    <button
                      onClick={handleAddMedication}
                      className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
                    >
                      Enregistrer
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {medications.map((medication) => (
                <div
                  key={medication.id}
                  className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Pill className={`h-5 w-5 ${
                        medication.type === 'medication'
                          ? 'text-rose-500'
                          : 'text-green-500'
                      }`} />
                      <div className="ml-3">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                          {medication.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {medication.dosage} - {medication.frequency}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {medication.reminders.map((time, index) => (
                        <div
                          key={index}
                          className="flex items-center ml-2 px-2 py-1 bg-indigo-100 dark:bg-indigo-900/50 rounded-md"
                        >
                          <Clock className="h-4 w-4 text-indigo-600 dark:text-indigo-400 mr-1" />
                          <span className="text-sm text-indigo-600 dark:text-indigo-400">
                            {time}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  {medication.notes && (
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                      {medication.notes}
                    </p>
                  )}
                  <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>
                      Depuis le {new Date(medication.startDate).toLocaleDateString()}
                      {medication.endDate && ` jusqu'au ${new Date(medication.endDate).toLocaleDateString()}`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Médicaments contre-indiqués
            </h2>
            <div className="space-y-4">
              {contraIndications.map((med, index) => (
                <div
                  key={index}
                  className="p-4 bg-red-50 dark:bg-red-900/50 rounded-lg"
                >
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                        {med.name}
                      </h3>
                      <p className="mt-1 text-sm text-red-700 dark:text-red-300">
                        {med.reason}
                      </p>
                      {med.alternatives && (
                        <div className="mt-2">
                          <p className="text-sm font-medium text-red-800 dark:text-red-200">
                            Alternatives possibles :
                          </p>
                          <ul className="mt-1 list-disc list-inside text-sm text-red-700 dark:text-red-300">
                            {med.alternatives.map((alt, i) => (
                              <li key={i}>{alt}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Rappels
            </h2>
            <div className="space-y-3">
              {medications.flatMap(med => 
                med.reminders.map((time, index) => (
                  <div
                    key={`${med.id}-${index}`}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                  >
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-indigo-500 mr-2" />
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {med.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {med.dosage}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {time}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}