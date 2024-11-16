import React from 'react';
import { Sun, Snowflake, Thermometer, Droplets } from 'lucide-react';

const currentSeason = 'summer'; // This would normally be determined dynamically

const seasonalAdvice = {
  summer: {
    icon: <Sun className="h-8 w-8 text-yellow-500" />,
    title: "Conseils pour l'été",
    mainAdvice: "Protection contre la chaleur et le soleil",
    tips: [
      {
        title: "Hydratation",
        content: "Proposez plus souvent le sein ou le biberon",
        icon: <Droplets className="h-6 w-6 text-blue-500" />
      },
      {
        title: "Protection solaire",
        content: "Évitez l'exposition directe, utilisez un chapeau et des vêtements légers",
        icon: <Sun className="h-6 w-6 text-orange-500" />
      },
      {
        title: "Température",
        content: "Maintenez une température ambiante entre 22-24°C",
        icon: <Thermometer className="h-6 w-6 text-red-500" />
      }
    ],
    warnings: [
      "Évitez les sorties entre 12h et 16h",
      "Surveillez les signes de déshydratation",
      "Ne couvrez jamais la poussette avec un tissu"
    ]
  },
  winter: {
    icon: <Snowflake className="h-8 w-8 text-blue-500" />,
    title: "Conseils pour l'hiver",
    mainAdvice: "Protection contre le froid et les maladies saisonnières",
    tips: [
      {
        title: "Habillement",
        content: "Privilégiez plusieurs couches fines plutôt qu'une seule épaisse",
        icon: <Snowflake className="h-6 w-6 text-blue-500" />
      },
      {
        title: "Température intérieure",
        content: "Maintenez une température de 19-21°C dans les pièces de vie",
        icon: <Thermometer className="h-6 w-6 text-red-500" />
      },
      {
        title: "Hydratation",
        content: "Continuez l'hydratation malgré le froid",
        icon: <Droplets className="h-6 w-6 text-blue-500" />
      }
    ],
    warnings: [
      "Évitez les changements brusques de température",
      "Lavez régulièrement les mains",
      "Aérez quotidiennement la chambre"
    ]
  }
};

export default function SeasonalAdvice() {
  const advice = seasonalAdvice[currentSeason as keyof typeof seasonalAdvice];

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        {advice.icon}
        <div className="ml-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {advice.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {advice.mainAdvice}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {advice.tips.map((tip, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center mb-4">
              {tip.icon}
              <h3 className="ml-3 font-medium text-gray-900 dark:text-white">
                {tip.title}
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              {tip.content}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-yellow-50 dark:bg-yellow-900/50 rounded-lg p-6">
        <h3 className="text-lg font-medium text-yellow-800 dark:text-yellow-200 mb-4">
          Points de vigilance
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {advice.warnings.map((warning, index) => (
            <div
              key={index}
              className="flex items-center bg-white dark:bg-gray-800 p-4 rounded-lg"
            >
              <Thermometer className="h-5 w-5 text-yellow-500 mr-3" />
              <span className="text-gray-700 dark:text-gray-300">
                {warning}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-indigo-50 dark:bg-indigo-900/50 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Activités recommandées
          </h3>
          <ul className="space-y-3 text-gray-600 dark:text-gray-400">
            {currentSeason === 'summer' ? (
              <>
                <li>• Jeux d'eau supervisés</li>
                <li>• Activités d'intérieur aux heures chaudes</li>
                <li>• Promenades tôt le matin ou en soirée</li>
              </>
            ) : (
              <>
                <li>• Jeux sensoriels d'intérieur</li>
                <li>• Lectures sous une couverture</li>
                <li>• Courtes sorties bien équipées</li>
              </>
            )}
          </ul>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900/50 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Équipement essentiel
          </h3>
          <ul className="space-y-3 text-gray-600 dark:text-gray-400">
            {currentSeason === 'summer' ? (
              <>
                <li>• Chapeau à large bord</li>
                <li>• Vêtements légers et couvrants</li>
                <li>• Crème solaire spéciale bébé</li>
              </>
            ) : (
              <>
                <li>• Bonnet et moufles</li>
                <li>• Combinaison chaude</li>
                <li>• Chaussons doublés</li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}