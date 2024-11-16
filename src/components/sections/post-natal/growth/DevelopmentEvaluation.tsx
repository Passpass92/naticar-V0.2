import React, { useState } from 'react';
import { Brain, Activity, Users, Heart, ChevronRight, ChevronLeft, CheckCircle, AlertCircle } from 'lucide-react';

interface Question {
  id: string;
  domain: 'motor' | 'cognitive' | 'social' | 'emotional';
  text: string;
  icon: React.ReactNode;
  feedback: {
    yes: string;
    no: string;
    notObserved: string;
  };
  activities: string[];
}

const questions: Question[] = [
  {
    id: 'motor1',
    domain: 'motor',
    text: 'Votre enfant peut-il se tourner du ventre au dos sans aide ?',
    icon: <Activity className="h-6 w-6 text-blue-500" />,
    feedback: {
      yes: 'Excellent ! Votre enfant montre un bon développement moteur.',
      no: 'Continuez à encourager les mouvements lors des temps d\'éveil.',
      notObserved: 'Essayez de créer des occasions d\'observer ce comportement.'
    },
    activities: [
      'Placer l\'enfant sur le ventre quelques minutes chaque jour',
      'Utiliser des jouets pour encourager les mouvements',
      'Pratiquer le temps sur le ventre après chaque change'
    ]
  },
  {
    id: 'cognitive1',
    domain: 'cognitive',
    text: 'Votre enfant réagit-il lorsqu\'il voit un jouet coloré à portée de main ?',
    icon: <Brain className="h-6 w-6 text-purple-500" />,
    feedback: {
      yes: 'Parfait ! Votre enfant montre une bonne coordination œil-main.',
      no: 'Cette capacité se développe progressivement.',
      notObserved: 'Essayez de présenter des objets colorés à différentes distances.'
    },
    activities: [
      'Montrer des objets contrastés à 20-30 cm du visage',
      'Varier les couleurs et les formes des jouets',
      'Jouer à faire suivre un objet des yeux'
    ]
  },
  {
    id: 'social1',
    domain: 'social',
    text: 'Votre enfant sourit-il en réponse à vos sourires ?',
    icon: <Users className="h-6 w-6 text-green-500" />,
    feedback: {
      yes: 'Très bien ! Les sourires sociaux sont un jalon important.',
      no: 'Continuez les interactions face à face.',
      notObserved: 'Créez des moments privilégiés pour observer les interactions.'
    },
    activities: [
      'Faire des jeux de visage',
      'Parler doucement en face à face',
      'Imiter les expressions du bébé'
    ]
  },
  {
    id: 'emotional1',
    domain: 'emotional',
    text: 'Votre enfant semble-t-il reconnaître vos voix ?',
    icon: <Heart className="h-6 w-6 text-rose-500" />,
    feedback: {
      yes: 'Excellent ! Votre enfant développe des liens d\'attachement.',
      no: 'Cette reconnaissance se développe progressivement.',
      notObserved: 'Essayez de parler à votre enfant depuis différentes positions.'
    },
    activities: [
      'Parler doucement à l\'enfant',
      'Chanter des comptines',
      'Réagir aux vocalisations du bébé'
    ]
  }
];

interface Answer {
  questionId: string;
  response: 'yes' | 'no' | 'notObserved' | null;
}

export default function DevelopmentEvaluation() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>(
    questions.map(q => ({ questionId: q.id, response: null }))
  );
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (response: 'yes' | 'no' | 'notObserved') => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = {
      questionId: questions[currentQuestion].id,
      response
    };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const getScore = () => {
    const positiveAnswers = answers.filter(a => a.response === 'yes').length;
    return {
      score: positiveAnswers,
      total: questions.length
    };
  };

  if (showResults) {
    const { score, total } = getScore();
    const percentage = (score / total) * 100;

    return (
      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Résultats de l'évaluation
          </h3>
          
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Jalons atteints
              </span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {score}/{total}
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
              <div
                className="bg-indigo-600 h-2.5 rounded-full"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>

          {answers.map((answer, index) => {
            const question = questions[index];
            return (
              <div key={question.id} className="mb-6">
                <div className="flex items-start mb-2">
                  {question.icon}
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {question.text}
                    </p>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {answer.response && question.feedback[answer.response]}
                    </p>
                  </div>
                </div>
                {answer.response !== 'yes' && (
                  <div className="mt-2 pl-9">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                      Activités suggérées :
                    </h4>
                    <ul className="space-y-1">
                      {question.activities.map((activity, idx) => (
                        <li key={idx} className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                          <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 mr-2"></span>
                          {activity}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}

          <div className="mt-6">
            <button
              onClick={() => {
                setCurrentQuestion(0);
                setAnswers(questions.map(q => ({ questionId: q.id, response: null })));
                setShowResults(false);
              }}
              className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Recommencer l'évaluation
            </button>
          </div>
        </div>

        {score < total && (
          <div className="bg-yellow-50 dark:bg-yellow-900/50 rounded-lg p-6">
            <div className="flex items-start">
              <AlertCircle className="h-6 w-6 text-yellow-600 dark:text-yellow-400 mt-1" />
              <div className="ml-3">
                <h3 className="text-lg font-medium text-yellow-800 dark:text-yellow-200">
                  Recommandation
                </h3>
                <p className="mt-2 text-yellow-700 dark:text-yellow-300">
                  N'oubliez pas que chaque enfant se développe à son rythme. Si vous avez des inquiétudes, 
                  n'hésitez pas à en parler à votre pédiatre lors de la prochaine visite.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Question {currentQuestion + 1}/{questions.length}
          </h3>
          <div className="flex items-center space-x-2">
            {[...Array(questions.length)].map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full ${
                  index === currentQuestion
                    ? 'bg-indigo-600'
                    : index < currentQuestion
                    ? 'bg-indigo-200'
                    : 'bg-gray-200 dark:bg-gray-700'
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <div className="flex items-start">
          {question.icon}
          <p className="ml-3 text-lg text-gray-900 dark:text-white">
            {question.text}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <button
            onClick={() => handleAnswer('yes')}
            className="p-4 border-2 border-green-500 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/50"
          >
            <CheckCircle className="h-6 w-6 text-green-500 mx-auto mb-2" />
            <span className="block text-sm font-medium text-gray-900 dark:text-white">
              Oui
            </span>
          </button>

          <button
            onClick={() => handleAnswer('no')}
            className="p-4 border-2 border-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/50"
          >
            <AlertCircle className="h-6 w-6 text-red-500 mx-auto mb-2" />
            <span className="block text-sm font-medium text-gray-900 dark:text-white">
              Non
            </span>
          </button>

          <button
            onClick={() => handleAnswer('notObserved')}
            className="p-4 border-2 border-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50"
          >
            <Users className="h-6 w-6 text-gray-400 mx-auto mb-2" />
            <span className="block text-sm font-medium text-gray-900 dark:text-white">
              Pas encore observé
            </span>
          </button>
        </div>

        {currentQuestion > 0 && (
          <button
            onClick={() => setCurrentQuestion(currentQuestion - 1)}
            className="flex items-center text-sm text-gray-500 hover:text-gray-700"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Question précédente
          </button>
        )}
      </div>
    </div>
  );
}