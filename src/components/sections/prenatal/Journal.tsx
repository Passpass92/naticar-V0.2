import React, { useState } from 'react';
import { Book, Camera, Plus, Calendar, X, Edit2, Trash2 } from 'lucide-react';

interface JournalEntry {
  id: string;
  date: string;
  week: number;
  content: string;
  mood: string;
  symptoms: string[];
  photos: string[];
}

const moods = [
  '😊 Heureuse',
  '😴 Fatiguée',
  '🤢 Nauséeuse',
  '😌 Détendue',
  '😤 Stressée',
  '🥰 Excitée'
];

const commonSymptoms = [
  'Nausées',
  'Fatigue',
  'Maux de dos',
  'Contractions',
  'Insomnie',
  'Crampes'
];

export default function Journal() {
  const [showNewEntry, setShowNewEntry] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);
  const [entries, setEntries] = useState<JournalEntry[]>([
    {
      id: '1',
      date: '2024-03-15',
      week: 24,
      content: "Aujourd'hui, j'ai senti le bébé bouger beaucoup plus que d'habitude !",
      mood: '🥰 Excitée',
      symptoms: ['Fatigue', 'Maux de dos'],
      photos: ['https://images.unsplash.com/photo-1584559582128-b8be739912e1?w=300']
    }
  ]);

  const [newEntry, setNewEntry] = useState<Partial<JournalEntry>>({
    date: new Date().toISOString().split('T')[0],
    mood: '',
    symptoms: [],
    photos: []
  });

  const handleAddEntry = () => {
    if (newEntry.content) {
      const entry: JournalEntry = {
        id: Date.now().toString(),
        date: newEntry.date || new Date().toISOString().split('T')[0],
        week: 24, // Calculer la semaine en fonction de la DPA
        content: newEntry.content || '',
        mood: newEntry.mood || '',
        symptoms: newEntry.symptoms || [],
        photos: newEntry.photos || []
      };

      setEntries([entry, ...entries]);
      setNewEntry({
        date: new Date().toISOString().split('T')[0],
        mood: '',
        symptoms: [],
        photos: []
      });
      setShowNewEntry(false);
    }
  };

  const handleDeleteEntry = (id: string) => {
    setEntries(entries.filter(entry => entry.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Journal de grossesse</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Gardez une trace de vos moments précieux
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <button
            onClick={() => setShowNewEntry(true)}
            className="w-full p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-center hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors"
          >
            <Plus className="h-8 w-8 mx-auto text-gray-400" />
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Ajouter une nouvelle entrée
            </p>
          </button>

          {showNewEntry && (
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Nouvelle entrée
                </h3>
                <button
                  onClick={() => setShowNewEntry(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    value={newEntry.date}
                    onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Humeur
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {moods.map((mood) => (
                      <button
                        key={mood}
                        onClick={() => setNewEntry({ ...newEntry, mood })}
                        className={`px-3 py-1 rounded-full text-sm ${
                          newEntry.mood === mood
                            ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300'
                            : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {mood}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Symptômes
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {commonSymptoms.map((symptom) => (
                      <button
                        key={symptom}
                        onClick={() => {
                          const symptoms = newEntry.symptoms || [];
                          setNewEntry({
                            ...newEntry,
                            symptoms: symptoms.includes(symptom)
                              ? symptoms.filter(s => s !== symptom)
                              : [...symptoms, symptom]
                          });
                        }}
                        className={`px-3 py-1 rounded-full text-sm ${
                          newEntry.symptoms?.includes(symptom)
                            ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300'
                            : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {symptom}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Note
                  </label>
                  <textarea
                    rows={4}
                    value={newEntry.content}
                    onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
                    placeholder="Partagez vos pensées, ressentis..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Photos
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
                    <div className="space-y-1 text-center">
                      <Camera className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600 dark:text-gray-400">
                        <label className="relative cursor-pointer rounded-md font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500">
                          <span>Ajouter une photo</span>
                          <input type="file" className="sr-only" accept="image/*" />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowNewEntry(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleAddEntry}
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
                  >
                    Enregistrer
                  </button>
                </div>
              </div>
            </div>
          )}

          {entries.map((entry) => (
            <div
              key={entry.id}
              className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-gray-400" />
                      <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                        {new Date(entry.date).toLocaleDateString('fr-FR')} - Semaine {entry.week}
                      </span>
                    </div>
                    <div className="mt-2">
                      <span className="text-xl">{entry.mood}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setSelectedEntry(entry)}
                      className="p-2 text-gray-400 hover:text-gray-500"
                    >
                      <Edit2 className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteEntry(entry.id)}
                      className="p-2 text-gray-400 hover:text-gray-500"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {entry.symptoms.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {entry.symptoms.map((symptom, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                      >
                        {symptom}
                      </span>
                    ))}
                  </div>
                )}

                <p className="mt-4 text-gray-600 dark:text-gray-300">
                  {entry.content}
                </p>

                {entry.photos.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    {entry.photos.map((photo, index) => (
                      <img
                        key={index}
                        src={photo}
                        alt={`Photo ${index + 1}`}
                        className="rounded-lg object-cover w-full h-48"
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Statistiques
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Entrées ce mois-ci
                </p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {entries.length}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Humeur la plus fréquente
                </p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                  😊 Heureuse
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Conseils d'écriture
            </h3>
            <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
              <li className="flex items-start">
                <Book className="h-5 w-5 text-indigo-500 mr-2" />
                Notez vos émotions et ressentis
              </li>
              <li className="flex items-start">
                <Camera className="h-5 w-5 text-indigo-500 mr-2" />
                Ajoutez des photos pour garder des souvenirs
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}