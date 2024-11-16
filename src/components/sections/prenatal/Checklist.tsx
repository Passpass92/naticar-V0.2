import React, { useState } from 'react';
import { Check, Plus, X, AlertCircle } from 'lucide-react';

interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
  category: string;
  deadline?: string;
}

const defaultItems: ChecklistItem[] = [
  {
    id: '1',
    text: 'Installer le lit bébé',
    completed: false,
    category: 'Chambre',
    deadline: '2024-08-01'
  },
  {
    id: '2',
    text: 'Acheter une table à langer',
    completed: false,
    category: 'Chambre'
  },
  {
    id: '3',
    text: 'Sécuriser les prises électriques',
    completed: false,
    category: 'Sécurité'
  },
  {
    id: '4',
    text: 'Installer les barrières d\'escalier',
    completed: false,
    category: 'Sécurité'
  }
];

const categories = [
  'Chambre',
  'Sécurité',
  'Vêtements',
  'Alimentation',
  'Hygiène',
  'Transport'
];

export default function Checklist() {
  const [items, setItems] = useState<ChecklistItem[]>(defaultItems);
  const [showNewItem, setShowNewItem] = useState(false);
  const [newItem, setNewItem] = useState<Partial<ChecklistItem>>({
    category: categories[0]
  });

  const handleAddItem = () => {
    if (newItem.text) {
      const item: ChecklistItem = {
        id: Date.now().toString(),
        text: newItem.text,
        completed: false,
        category: newItem.category || categories[0],
        deadline: newItem.deadline
      };

      setItems([...items, item]);
      setNewItem({ category: categories[0] });
      setShowNewItem(false);
    }
  };

  const toggleItem = (id: string) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const deleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const itemsByCategory = categories.reduce((acc, category) => {
    const categoryItems = items.filter(item => item.category === category);
    if (categoryItems.length > 0) {
      acc[category] = categoryItems;
    }
    return acc;
  }, {} as Record<string, ChecklistItem[]>);

  const progress = {
    total: items.length,
    completed: items.filter(item => item.completed).length
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Checklist maison</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Préparez votre maison pour l'arrivée de bébé
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                Tâches à faire
              </h2>
              <button
                onClick={() => setShowNewItem(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                <Plus className="h-5 w-5 mr-2" />
                Ajouter
              </button>
            </div>

            {showNewItem && (
              <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Nouvelle tâche
                  </h3>
                  <button
                    onClick={() => setShowNewItem(false)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Description
                    </label>
                    <input
                      type="text"
                      value={newItem.text || ''}
                      onChange={(e) => setNewItem({ ...newItem, text: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
                      placeholder="Que faut-il faire ?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Catégorie
                    </label>
                    <select
                      value={newItem.category}
                      onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Date limite (optionnel)
                    </label>
                    <input
                      type="date"
                      value={newItem.deadline || ''}
                      onChange={(e) => setNewItem({ ...newItem, deadline: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
                    />
                  </div>

                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => setShowNewItem(false)}
                      className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md"
                    >
                      Annuler
                    </button>
                    <button
                      onClick={handleAddItem}
                      className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
                    >
                      Ajouter
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-6">
              {Object.entries(itemsByCategory).map(([category, categoryItems]) => (
                <div key={category}>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    {category}
                  </h3>
                  <div className="space-y-3">
                    {categoryItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                      >
                        <div className="flex items-center">
                          <button
                            onClick={() => toggleItem(item.id)}
                            className={`flex-shrink-0 w-5 h-5 rounded border ${
                              item.completed
                                ? 'bg-green-500 border-green-500'
                                : 'border-gray-300 dark:border-gray-600'
                            }`}
                          >
                            {item.completed && (
                              <Check className="h-4 w-4 text-white" />
                            )}
                          </button>
                          <span className={`ml-3 ${
                            item.completed
                              ? 'line-through text-gray-400 dark:text-gray-500'
                              : 'text-gray-900 dark:text-white'
                          }`}>
                            {item.text}
                          </span>
                        </div>
                        <div className="flex items-center">
                          {item.deadline && (
                            <span className="mr-4 text-sm text-gray-500 dark:text-gray-400">
                              {new Date(item.deadline).toLocaleDateString()}
                            </span>
                          )}
                          <button
                            onClick={() => deleteItem(item.id)}
                            className="text-gray-400 hover:text-gray-500"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Progression
            </h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Tâches complétées
                  </span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {progress.completed}/{progress.total}
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div
                    className="bg-green-500 h-2.5 rounded-full"
                    style={{ width: `${(progress.completed / progress.total) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <div className="flex items-start">
              <AlertCircle className="h-6 w-6 text-indigo-500 mt-0.5" />
              <div className="ml-3">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Conseils
                </h3>
                <ul className="mt-2 space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li>• Commencez par la chambre de bébé</li>
                  <li>• Sécurisez toutes les pièces</li>
                  <li>• Préparez la valise maternité</li>
                  <li>• Organisez l'espace de change</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}