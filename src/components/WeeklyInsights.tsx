import React from 'react';
import { Heart, Baby, Apple } from 'lucide-react';

export default function WeeklyInsights() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Aperçu de la Semaine</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <InsightCard
          icon={<Baby className="h-6 w-6 text-purple-500" />}
          title="Développement du Bébé"
          content="Votre bébé fait maintenant la taille d'une papaye et pèse environ 550g. L'oreille interne est maintenant suffisamment développée pour l'aider à maintenir son équilibre."
        />
        <InsightCard
          icon={<Heart className="h-6 w-6 text-rose-500" />}
          title="Votre Santé"
          content="Vous pourriez ressentir des contractions de Braxton Hicks. Restez hydratée et changez de position si elles deviennent inconfortables."
        />
        <InsightCard
          icon={<Apple className="h-6 w-6 text-emerald-500" />}
          title="Focus Nutrition"
          content="Cette semaine, concentrez-vous sur les aliments riches en fer. Essayez d'incorporer plus de légumes verts, viandes maigres et légumineuses dans vos repas."
        />
      </div>
    </div>
  );
}

function InsightCard({ icon, title, content }: {
  icon: React.ReactNode;
  title: string;
  content: string;
}) {
  return (
    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
      <div className="flex items-center mb-4">
        {icon}
        <h3 className="ml-3 text-lg font-medium text-gray-900 dark:text-white">{title}</h3>
      </div>
      <p className="text-gray-600 dark:text-gray-300">{content}</p>
    </div>
  );
}