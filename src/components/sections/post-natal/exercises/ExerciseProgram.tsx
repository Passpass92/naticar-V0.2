import React from 'react';
import { Play, Clock, AlertCircle, CheckCircle } from 'lucide-react';

interface ExerciseProgramProps {
  category: 'perineal' | 'abdominal' | 'yoga' | 'breathing';
}

const exerciseData = {
  perineal: {
    title: 'Rééducation périnéale',
    description: 'Programme progressif de renforcement du plancher pelvien',
    exercises: [
      {
        title: 'Exercices de Kegel - Niveau 1',
        duration: '5 min',
        completed: true,
        instructions: [
          'Contractez les muscles du plancher pelvien',
          'Maintenez 3 secondes',
          'Relâchez doucement',
          'Répétez 10 fois'
        ]
      },
      {
        title: 'Exercices de Kegel - Niveau 2',
        duration: '8 min',
        completed: false,
        instructions: [
          'Contractez les muscles du plancher pelvien',
          'Maintenez 5 secondes',
          'Relâchez lentement',
          'Répétez 12 fois'
        ]
      }
    ]
  },
  abdominal: {
    title: 'Renforcement abdominal',
    description: 'Exercices doux pour renforcer les abdominaux',
    exercises: [
      {
        title: 'Respiration abdominale',
        duration: '5 min',
        completed: true,
        instructions: [
          'Allongez-vous sur le dos',
          'Inspirez en gonflant le ventre',
          'Expirez en rentrant le ventre',
          'Répétez 10 fois'
        ]
      }
    ]
  },
  yoga: {
    title: 'Yoga post-natal',
    description: 'Séances adaptées pour la récupération',
    exercises: [
      {
        title: 'Postures douces',
        duration: '15 min',
        completed: false,
        instructions: [
          'Chat/Vache',
          'Étirements doux',
          'Torsions légères',
          'Relaxation finale'
        ]
      }
    ]
  },
  breathing: {
    title: 'Respiration & Relaxation',
    description: 'Techniques de respiration et relaxation',
    exercises: [
      {
        title: 'Respiration profonde',
        duration: '10 min',
        completed: false,
        instructions: [
          'Installez-vous confortablement',
          'Inspirez par le nez',
          'Expirez par la bouche',
          'Répétez pendant 10 minutes'
        ]
      }
    ]
  }
};

export default function ExerciseProgram({ category }: ExerciseProgramProps) {
  const program = exerciseData[category];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          {program.title}
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          {program.description}
        </p>
      </div>

      <div className="space-y-6">
        {program.exercises.map((exercise, index) => (
          <div
            key={index}
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                {exercise.completed ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <Play className="h-5 w-5 text-indigo-500" />
                )}
                <h3 className="ml-3 text-lg font-medium text-gray-900 dark:text-white">
                  {exercise.title}
                </h3>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {exercise.duration}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Instructions
                </h4>
                <ol className="space-y-2">
                  {exercise.instructions.map((instruction, idx) => (
                    <li
                      key={idx}
                      className="flex items-start text-sm text-gray-600 dark:text-gray-300"
                    >
                      <span className="mr-2">{idx + 1}.</span>
                      {instruction}
                    </li>
                  ))}
                </ol>
              </div>

              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <AlertCircle className="h-4 w-4 mr-2 text-yellow-500" />
                Arrêtez immédiatement en cas de douleur ou d'inconfort
              </div>

              <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                Commencer l'exercice
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}