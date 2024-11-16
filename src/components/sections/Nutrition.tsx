import React, { useState } from 'react';
import { Utensils, Apple, Coffee, Droplets, Plus, Search, Filter, Heart, AlertCircle, Clock } from 'lucide-react';

const nutritionSummary = [
  {
    id: '1',
    icon: <Apple className="h-8 w-8 text-emerald-600" />,
    title: "Calories",
    value: "2100",
    subtitle: "kcal / jour",
    info: "Besoins augmentés pendant la grossesse"
  },
  {
    id: '2',
    icon: <Coffee className="h-8 w-8 text-amber-600" />,
    title: "Protéines",
    value: "75",
    subtitle: "g / jour",
    info: "Important pour le développement du bébé"
  },
  {
    id: '3',
    icon: <Droplets className="h-8 w-8 text-blue-600" />,
    title: "Hydratation",
    value: "2.5",
    subtitle: "L / jour",
    info: "Essentiel pour prévenir la déshydratation"
  }
];

const mealPlan = [
  {
    id: '1',
    meal: 'Petit-déjeuner',
    time: '08:00',
    suggestions: [
      'Yaourt nature avec fruits frais',
      'Pain complet avec avocat',
      'Thé vert ou infusion'
    ]
  },
  {
    id: '2',
    meal: 'Collation',
    time: '10:30',
    suggestions: [
      'Poignée d\'amandes',
      'Une pomme',
      'Eau minérale'
    ]
  },
  {
    id: '3',
    meal: 'Déjeuner',
    time: '12:30',
    suggestions: [
      'Salade de quinoa aux légumes',
      'Filet de poisson grillé',
      'Légumes vapeur'
    ]
  }
];

const dietaryRestrictions = [
  { id: 'vegetarian', label: 'Végétarien' },
  { id: 'vegan', label: 'Végétalien' },
  { id: 'gluten-free', label: 'Sans gluten' },
  { id: 'dairy-free', label: 'Sans lactose' },
  { id: 'nut-free', label: 'Sans fruits à coque' }
];

const mealTypes = [
  { value: 'breakfast', label: 'Petit-déjeuner' },
  { value: 'lunch', label: 'Déjeuner' },
  { value: 'dinner', label: 'Dîner' },
  { value: 'snack', label: 'Collation' }
];

export default function Nutrition() {
  const [activeTab, setActiveTab] = useState('planner');
  const [showAddMealModal, setShowAddMealModal] = useState(false);
  const [selectedRestrictions, setSelectedRestrictions] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMealType, setSelectedMealType] = useState('');

  const handleRestrictionToggle = (restrictionId: string) => {
    setSelectedRestrictions(prev => 
      prev.includes(restrictionId)
        ? prev.filter(id => id !== restrictionId)
        : [...prev, restrictionId]
    );
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleMealTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMealType(e.target.value);
  };

  const filteredMeals = mealPlan.filter(meal => {
    if (selectedMealType && meal.meal.toLowerCase() !== selectedMealType) return false;
    if (searchQuery && !meal.suggestions.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))) return false;
    return true;
  });

  const renderTabContent = () => {
    switch (activeTab) {
      case 'planner':
        return (
          <div className="space-y-6">
            {filteredMeals.map(meal => (
              <div
                key={meal.id}
                className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                    <h4 className="ml-2 text-lg font-medium text-gray-900 dark:text-white">
                      {meal.meal}
                    </h4>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {meal.time}
                  </span>
                </div>
                <ul className="space-y-2">
                  {meal.suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className="flex items-center text-gray-600 dark:text-gray-300"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 mr-2"></span>
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        );
      case 'recipes':
        return (
          <div className="text-center py-8">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Recettes personnalisées
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Des recettes adaptées à vos besoins et restrictions alimentaires seront bientôt disponibles.
            </p>
          </div>
        );
      case 'guidelines':
        return (
          <div className="text-center py-8">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Recommandations nutritionnelles
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Des conseils personnalisés pour une alimentation équilibrée seront bientôt disponibles.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Nutrition</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Plan nutritionnel personnalisé pour votre grossesse
            </p>
          </div>
          <button
            onClick={() => setShowAddMealModal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            Ajouter un repas
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {nutritionSummary.map(item => (
          <div key={item.id} className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                {item.icon}
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">{item.title}</h3>
                <div className="mt-1">
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">{item.value}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{item.subtitle}</p>
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
              <AlertCircle className="h-4 w-4 mr-1" />
              {item.info}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {[
              { id: 'planner', label: 'Planning des repas', icon: <Clock className="h-5 w-5" /> },
              { id: 'recipes', label: 'Recettes', icon: <Utensils className="h-5 w-5" /> },
              { id: 'guidelines', label: 'Recommandations', icon: <Heart className="h-5 w-5" /> }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center px-3 py-4 text-sm font-medium border-b-2 
                  ${activeTab === tab.id
                    ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                  }
                `}
              >
                {React.cloneElement(tab.icon, { className: `${tab.icon.props.className} mr-2` })}
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          <div className="mb-6 flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700"
                />
              </div>
            </div>
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  value={selectedMealType}
                  onChange={handleMealTypeChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700"
                >
                  <option value="">Filtrer par catégorie</option>
                  {mealTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Restrictions alimentaires
            </h3>
            <div className="flex flex-wrap gap-2">
              {dietaryRestrictions.map(restriction => (
                <button
                  key={restriction.id}
                  onClick={() => handleRestrictionToggle(restriction.id)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedRestrictions.includes(restriction.id)
                      ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300'
                      : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                  }`}
                >
                  {restriction.label}
                </button>
              ))}
            </div>
          </div>

          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}