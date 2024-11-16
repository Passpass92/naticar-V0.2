import React, { useState } from 'react';
import { Calendar, AlertCircle, CheckCircle, ChevronDown, ChevronUp, Info } from 'lucide-react';
import VaccineCard from './VaccineCard';
import { vaccineSchedule } from './data';

interface VaccineScheduleItem {
  age: string;
  vaccines: string[];
  recommended: boolean;
  info?: string;
}

const fullSchedule: VaccineScheduleItem[] = [
  {
    age: "Naissance",
    vaccines: ["BCG", "Hépatite B (1ère dose)"],
    recommended: true,
    info: "À faire à la maternité"
  },
  {
    age: "2 mois",
    vaccines: [
      "DTCaP Hib HepB (1ère dose)",
      "Pneumocoque (1ère dose)",
      "Rotavirus (1ère dose)"
    ],
    recommended: true
  },
  {
    age: "4 mois",
    vaccines: [
      "DTCaP Hib HepB (2ème dose)",
      "Pneumocoque (2ème dose)",
      "Rotavirus (2ème dose)"
    ],
    recommended: true
  },
  {
    age: "11 mois",
    vaccines: [
      "DTCaP Hib HepB (rappel)",
      "Pneumocoque (rappel)"
    ],
    recommended: true
  },
  {
    age: "12 mois",
    vaccines: ["ROR (1ère dose)", "Méningocoque C (1ère dose)"],
    recommended: true
  },
  {
    age: "16-18 mois",
    vaccines: ["ROR (2ème dose)"],
    recommended: true
  },
  {
    age: "6 ans",
    vaccines: ["DTCaP (rappel)"],
    recommended: true
  },
  {
    age: "11-13 ans",
    vaccines: ["DTCaP (rappel)", "HPV (2 doses)"],
    recommended: true,
    info: "HPV recommandé pour les filles et les garçons"
  },
  {
    age: "15 ans",
    vaccines: ["Méningocoque C (rappel)"],
    recommended: true
  },
  {
    age: "25 ans",
    vaccines: ["DTCaP (rappel)"],
    recommended: true,
    info: "Puis rappel tous les 20 ans"
  }
];

export default function Vaccines() {
  const [expandedAge, setExpandedAge] = useState<string | null>(null);
  const [showFullSchedule, setShowFullSchedule] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Vaccins</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Suivi des vaccinations de votre enfant
        </p>
      </div>

      <div className="space-y-6">
        {/* Prochains vaccins */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Prochaines vaccinations
            </h2>
            <div className="space-y-4">
              {vaccineSchedule.map((schedule, index) => (
                <VaccineCard
                  key={index}
                  schedule={schedule}
                  themeColor="indigo"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Calendrier vaccinal complet */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                Calendrier vaccinal complet
              </h2>
              <button
                onClick={() => setShowFullSchedule(!showFullSchedule)}
                className="flex items-center text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-500"
              >
                {showFullSchedule ? (
                  <>
                    <ChevronUp className="h-5 w-5 mr-1" />
                    Réduire
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-5 w-5 mr-1" />
                    Voir tout
                  </>
                )}
              </button>
            </div>

            <div className="space-y-4">
              {fullSchedule
                .filter(item => showFullSchedule || parseInt(item.age) <= 4 || item.age === "Naissance")
                .map((item, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() => setExpandedAge(expandedAge === item.age ? null : item.age)}
                      className="w-full px-4 py-3 flex items-center justify-between bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-600/50"
                    >
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mr-3" />
                        <span className="font-medium text-gray-900 dark:text-white">
                          {item.age}
                        </span>
                        {item.recommended && (
                          <span className="ml-2 px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200">
                            Recommandé
                          </span>
                        )}
                      </div>
                      {expandedAge === item.age ? (
                        <ChevronUp className="h-5 w-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      )}
                    </button>

                    {expandedAge === item.age && (
                      <div className="px-4 py-3 bg-white dark:bg-gray-800">
                        <ul className="space-y-2">
                          {item.vaccines.map((vaccine, vIndex) => (
                            <li
                              key={vIndex}
                              className="flex items-start text-gray-600 dark:text-gray-300"
                            >
                              <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                              {vaccine}
                            </li>
                          ))}
                        </ul>
                        {item.info && (
                          <div className="mt-3 flex items-start p-3 bg-indigo-50 dark:bg-indigo-900/50 rounded-lg">
                            <Info className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mr-2 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-indigo-700 dark:text-indigo-300">
                              {item.info}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
            </div>

            {!showFullSchedule && (
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setShowFullSchedule(true)}
                  className="flex items-center justify-center w-full px-4 py-2 text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-500"
                >
                  <AlertCircle className="h-5 w-5 mr-2" />
                  Voir le calendrier vaccinal complet
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}