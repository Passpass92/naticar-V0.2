import React, { useState } from 'react';
import { FileText, Calculator, Calendar, Download, Mail } from 'lucide-react';
import BenefitsCalculator from '../calculators/BenefitsCalculator';

const documents = [
  {
    category: "Déclarations obligatoires",
    items: [
      {
        title: "Déclaration de grossesse",
        description: "À envoyer à la CAF et CPAM avant la fin du 3ème mois",
        action: "Remplir",
        type: "form"
      },
      {
        title: "Reconnaissance anticipée",
        description: "Pour les parents non mariés",
        action: "Guide",
        type: "guide"
      }
    ]
  },
  {
    category: "Droits et prestations",
    items: [
      {
        title: "Prime de naissance",
        description: "Calculez vos droits à la prime de naissance CAF",
        action: "Calculer",
        type: "calculator",
        calculatorType: "prime"
      },
      {
        title: "Congé maternité",
        description: "Calculez vos dates de congé maternité",
        action: "Calculer",
        type: "calculator",
        calculatorType: "conge"
      }
    ]
  },
  {
    category: "Modèles de lettres",
    items: [
      {
        title: "Information employeur",
        description: "Modèle de lettre pour informer votre employeur",
        action: "Télécharger",
        type: "template"
      },
      {
        title: "Demande de temps partiel",
        description: "Modèle de demande de passage à temps partiel",
        action: "Télécharger",
        type: "template"
      }
    ]
  }
];

export default function Administrative() {
  const [calculatorOpen, setCalculatorOpen] = useState(false);
  const [calculatorType, setCalculatorType] = useState<'prime' | 'conge'>('prime');

  const handleCalculatorClick = (type: 'prime' | 'conge') => {
    setCalculatorType(type);
    setCalculatorOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Démarches administratives</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Gérez vos démarches administratives et accédez à vos droits
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatusCard
          icon={<FileText className="h-8 w-8 text-indigo-600" />}
          title="Documents à fournir"
          value="3/5"
          label="documents complétés"
        />
        <StatusCard
          icon={<Calculator className="h-8 w-8 text-emerald-600" />}
          title="Droits calculés"
          value="1 250 €"
          label="prime de naissance estimée"
        />
        <StatusCard
          icon={<Calendar className="h-8 w-8 text-rose-600" />}
          title="Congé maternité"
          value="16 sem."
          label="durée estimée"
        />
      </div>

      <div className="space-y-8">
        {documents.map((section) => (
          <div key={section.category} className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                {section.category}
              </h2>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {section.items.map((item) => (
                <div key={item.title} className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {item.description}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        if (item.type === 'calculator' && item.calculatorType) {
                          handleCalculatorClick(item.calculatorType);
                        }
                      }}
                      className={`ml-4 inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md ${
                        item.type === 'form'
                          ? 'text-white bg-indigo-600 hover:bg-indigo-700'
                          : 'text-indigo-600 bg-indigo-100 hover:bg-indigo-200 dark:bg-indigo-900/50 dark:text-indigo-400'
                      }`}
                    >
                      {item.type === 'form' && <Mail className="h-4 w-4 mr-1" />}
                      {item.type === 'template' && <Download className="h-4 w-4 mr-1" />}
                      {item.action}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <BenefitsCalculator
        isOpen={calculatorOpen}
        onClose={() => setCalculatorOpen(false)}
        type={calculatorType}
      />
    </div>
  );
}

function StatusCard({ icon, title, value, label }: {
  icon: React.ReactNode;
  title: string;
  value: string;
  label: string;
}) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          {icon}
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">{title}</h3>
          <div className="mt-1">
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">{value}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
          </div>
        </div>
      </div>
    </div>
  );
}