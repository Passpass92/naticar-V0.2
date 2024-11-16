import React, { useState } from 'react';
import { Heart, Calendar, AlertCircle, Phone, Users, BookOpen } from 'lucide-react';

interface MoodEntry {
  date: string;
  mood: number;
  sleepIssues: boolean;
  crying: boolean;
  overwhelmed: boolean;
  babycare: boolean;
  lonely: boolean;
  notes?: string;
}

const moods = [
  { emoji: '😢', label: 'Très mal - Je me sens désespérée', value: 1 },
  { emoji: '😟', label: 'Mal - Je me sens triste et anxieuse', value: 2 },
  { emoji: '😐', label: 'Neutre - Ça peut aller', value: 3 },
  { emoji: '🙂', label: 'Bien - Je me sens plutôt positive', value: 4 },
  { emoji: '😊', label: 'Très bien - Je me sens heureuse', value: 5 }
];

const questions = [
  { id: 'sleepIssues', text: 'Avez-vous des difficultés à dormir même quand votre bébé dort ?' },
  { id: 'crying', text: 'Pleurez-vous facilement sans raison apparente ?' },
  { id: 'overwhelmed', text: 'Vous sentez-vous dépassée par les événements ?' },
  { id: 'babycare', text: 'Avez-vous du mal à vous occuper de votre bébé ?' },
  { id: 'lonely', text: 'Vous sentez-vous seule ou isolée ?' }
];

export default function MoodEvaluate() {
  const [currentMood, setCurrentMood] = useState<MoodEntry>({
    date: new Date().toISOString().split('T')[0],
    mood: 3,
    sleepIssues: false,
    crying: false,
    overwhelmed: false,
    babycare: false,
    lonely: false,
    notes: ''
  });
  const [showResults, setShowResults] = useState(false);

  const calculateScore = () => {
    let score = currentMood.mood;
    const issues = [
      currentMood.sleepIssues,
      currentMood.crying,
      currentMood.overwhelmed,
      currentMood.babycare,
      currentMood.lonely
    ].filter(Boolean).length;
    
    return score - (issues * 0.5);
  };

  const getRecommendation = () => {
    const score = calculateScore();
    if (score >= 4) {
      return {
        type: 'success',
        message: 'Tout semble aller bien ! N\'hésitez pas à continuer de surveiller votre humeur.',
        icon: <Heart className="h-6 w-6 text-green-500" />
      };
    } else if (score >= 2.5) {
      return {
        type: 'warning',
        message: 'Vous présentez peut-être des signes de baby blues. Parlez-en à votre entourage et professionnels de santé.',
        icon: <AlertCircle className="h-6 w-6 text-yellow-500" />
      };
    } else {
      return {
        type: 'danger',
        message: 'Il est recommandé de consulter rapidement un professionnel. Vous n\'êtes pas seule.',
        icon: <AlertCircle className="h-6 w-6 text-red-500" />
      };
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResults(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Évaluer mon humeur</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Pour nous permettre de mieux vous accompagner
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <div className="mb-6">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Comment vous sentez-vous aujourd'hui ?
              </h2>
              <div className="grid grid-cols-5 gap-4">
                {moods.map((mood) => (
                  <button
                    key={mood.value}
                    type="button"
                    onClick={() => setCurrentMood({ ...currentMood, mood: mood.value })}
                    className={`p-4 rounded-lg text-center transition-colors ${
                      currentMood.mood === mood.value
                        ? 'bg-indigo-100 dark:bg-indigo-900/50 ring-2 ring-indigo-500'
                        : 'bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-600/50'
                    }`}
                  >
                    <span className="text-3xl">{mood.emoji}</span>
                    <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                      {mood.label}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Questions rapides
              </h3>
              {questions.map((question) => (
                <div key={question.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={question.id}
                    checked={currentMood[question.id as keyof MoodEntry] as boolean}
                    onChange={(e) => setCurrentMood({
                      ...currentMood,
                      [question.id]: e.target.checked
                    })}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor={question.id} className="ml-3 text-gray-700 dark:text-gray-300">
                    {question.text}
                  </label>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Notes supplémentaires (optionnel)
              </label>
              <textarea
                value={currentMood.notes}
                onChange={(e) => setCurrentMood({ ...currentMood, notes: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700"
                placeholder="Partagez vos pensées ou préoccupations..."
              />
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Valider
              </button>
            </div>
          </form>

          {showResults && (
            <div className="mt-6 bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <div className="flex items-start">
                {getRecommendation().icon}
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Résultats
                  </h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    {getRecommendation().message}
                  </p>
                </div>
              </div>

              {calculateScore() < 4 && (
                <div className="mt-4 space-y-4">
                  <button
                    onClick={() => window.location.hash = '#/mood-help'}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Voir les ressources d'aide disponibles
                  </button>
                  <button
                    onClick={() => window.location.hash = '#/mood-discuss'}
                    className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Parler à un professionnel
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Pourquoi évaluer mon humeur ?
            </h3>
            <div className="space-y-3 text-gray-600 dark:text-gray-300">
              <p>• Identifier les signes de baby blues</p>
              <p>• Suivre votre bien-être émotionnel</p>
              <p>• Obtenir un soutien adapté si nécessaire</p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Ressources d'urgence
            </h3>
            <div className="space-y-3">
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <Phone className="h-5 w-5 mr-2 text-indigo-500" />
                <span>SOS Dépression : 0800 00 00 00</span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <Users className="h-5 w-5 mr-2 text-indigo-500" />
                <span>Soutien Périnatal : 0800 00 00 01</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}