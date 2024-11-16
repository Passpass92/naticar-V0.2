import React from 'react';
import { ShoppingBag, Heart, ShoppingCart } from 'lucide-react';

const products = [
  {
    id: '1',
    name: 'Lit bébé évolutif',
    price: '299,99 €',
    image: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?w=300',
    description: 'Lit bébé convertible en lit junior, coloris blanc',
    category: 'Mobilier'
  },
  {
    id: '2',
    name: 'Poussette 3 en 1',
    price: '499,99 €',
    image: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=300',
    description: 'Poussette combinée avec nacelle et siège auto',
    category: 'Transport'
  },
  {
    id: '3',
    name: 'Lot de 5 bodies',
    price: '24,99 €',
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=300',
    description: 'Bodies en coton bio, taille 0-3 mois',
    category: 'Vêtements'
  }
];

const categories = [
  'Tous les produits',
  'Mobilier',
  'Transport',
  'Vêtements',
  'Puériculture',
  'Jouets'
];

export default function Shopping() {
  const [selectedCategory, setSelectedCategory] = React.useState('Tous les produits');
  const [cartCount, setCartCount] = React.useState(0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Boutique</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Découvrez notre sélection de produits pour bébé
          </p>
        </div>
        <button className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
          <ShoppingCart className="h-5 w-5 mr-2" />
          Panier ({cartCount})
        </button>
      </div>

      <div className="flex space-x-4 mb-6 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              selectedCategory === category
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <button className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white">
                <Heart className="h-5 w-5 text-gray-600 hover:text-red-500" />
              </button>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">{product.name}</h3>
              <p className="mt-1 text-gray-500 dark:text-gray-400">{product.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-lg font-bold text-gray-900 dark:text-white">{product.price}</span>
                <button
                  onClick={() => setCartCount(prev => prev + 1)}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  <ShoppingCart className="h-4 w-4 mr-1" />
                  Ajouter
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}