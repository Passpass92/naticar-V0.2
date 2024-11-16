import React, { useState } from 'react';
import { Users, MessageCircle, Heart, Share2, Book, Calendar, Image, Lock, Plus } from 'lucide-react';

const posts = [
  {
    id: '1',
    author: 'Sophie M.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    date: '2h',
    content: 'Je viens de terminer ma première séance de yoga prénatal, c\'était génial ! Quelqu\'un d\'autre pratique le yoga pendant sa grossesse ?',
    likes: 12,
    comments: 5
  },
  {
    id: '2',
    author: 'Marie L.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    date: '5h',
    content: 'Petit conseil pour les futures mamans : n\'oubliez pas de bien vous hydrater, surtout pendant ces journées chaudes !',
    likes: 24,
    comments: 8
  }
];

const groups = [
  {
    id: '1',
    name: 'Futures mamans Paris',
    members: 234,
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=150'
  },
  {
    id: '2',
    name: 'Yoga prénatal',
    members: 156,
    image: 'https://images.unsplash.com/photo-1599447421416-3414500d18a5?w=150'
  }
];

const familyMembers = [
  {
    id: '1',
    name: 'Marc (Papa)',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    role: 'parent',
    lastActive: 'En ligne'
  },
  {
    id: '2',
    name: 'Emma (Grande sœur)',
    avatar: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=150',
    role: 'sibling',
    lastActive: 'Il y a 1h'
  }
];

const familyEvents = [
  {
    id: '1',
    title: 'Échographie T2',
    date: '25 Mars 2024',
    participants: ['Papa', 'Maman']
  },
  {
    id: '2',
    title: 'Cours de préparation',
    date: '28 Mars 2024',
    participants: ['Papa', 'Maman']
  }
];

export default function Community() {
  const [activeTab, setActiveTab] = useState('posts');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Communauté</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Échangez avec d'autres futures mamans et votre famille
        </p>
      </div>

      <div className="mb-6">
        <nav className="flex space-x-4">
          {[
            { id: 'posts', label: 'Publications', icon: <MessageCircle className="h-5 w-5" /> },
            { id: 'family', label: 'Famille', icon: <Users className="h-5 w-5" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2 rounded-lg ${
                activeTab === tab.id
                  ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              {tab.icon}
              <span className="ml-2">{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {activeTab === 'posts' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {posts.map((post) => (
              <div key={post.id} className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                <div className="flex items-center">
                  <img
                    src={post.avatar}
                    alt={post.author}
                    className="h-10 w-10 rounded-full"
                  />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {post.author}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Il y a {post.date}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-gray-600 dark:text-gray-300">
                  {post.content}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                      <Heart className="h-5 w-5 mr-1" />
                      {post.likes}
                    </button>
                    <button className="flex items-center text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                      <MessageCircle className="h-5 w-5 mr-1" />
                      {post.comments}
                    </button>
                  </div>
                  <button className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Groupes recommandés
              </h2>
              <div className="space-y-4">
                {groups.map((group) => (
                  <div key={group.id} className="flex items-center">
                    <img
                      src={group.image}
                      alt={group.name}
                      className="h-12 w-12 rounded-lg object-cover"
                    />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {group.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {group.members} membres
                      </p>
                    </div>
                    <button className="ml-auto px-3 py-1 text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300">
                      Rejoindre
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Créer une publication
              </h2>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                rows={4}
                placeholder="Partagez votre expérience..."
              />
              <button className="mt-4 w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
                Publier
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Journal collaboratif */}
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                  Journal de famille
                </h2>
                <button className="flex items-center text-sm text-indigo-600 dark:text-indigo-400">
                  <Plus className="h-4 w-4 mr-1" />
                  Nouvelle entrée
                </button>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <Book className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                      <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
                        Premier coup de pied
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Hier, 20:30
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Aujourd'hui, nous avons ressenti les premiers mouvements du bébé !
                  </p>
                </div>
              </div>
            </div>

            {/* Albums photos */}
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                  Albums photos
                </h2>
                <button className="flex items-center text-sm text-indigo-600 dark:text-indigo-400">
                  <Image className="h-4 w-4 mr-1" />
                  Nouvel album
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="relative group">
                  <img
                    src="https://images.unsplash.com/photo-1556374002-b5ba944634b3?w=300"
                    alt="Album grossesse"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition-opacity rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm font-medium">Mois par mois</span>
                  </div>
                </div>
                <div className="relative group">
                  <img
                    src="https://images.unsplash.com/photo-1519689680058-324335c77eba?w=300"
                    alt="Échographies"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition-opacity rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm font-medium">Échographies</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Membres de la famille */}
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                  Membres de la famille
                </h2>
                <button className="flex items-center text-sm text-indigo-600 dark:text-indigo-400">
                  <Plus className="h-4 w-4 mr-1" />
                  Inviter
                </button>
              </div>
              <div className="space-y-4">
                {familyMembers.map((member) => (
                  <div key={member.id} className="flex items-center">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="h-10 w-10 rounded-full"
                    />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {member.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {member.lastActive}
                      </p>
                    </div>
                    <button className="ml-auto p-1 text-gray-400 hover:text-gray-500">
                      <Lock className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Planning familial */}
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                  Planning familial
                </h2>
                <button className="flex items-center text-sm text-indigo-600 dark:text-indigo-400">
                  <Calendar className="h-4 w-4 mr-1" />
                  Ajouter
                </button>
              </div>
              <div className="space-y-3">
                {familyEvents.map((event) => (
                  <div key={event.id} className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {event.title}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {event.date}
                        </p>
                      </div>
                      <div className="flex -space-x-2">
                        {event.participants.map((participant, index) => (
                          <div
                            key={index}
                            className="h-6 w-6 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-xs font-medium text-indigo-600 dark:text-indigo-400 border-2 border-white dark:border-gray-800"
                          >
                            {participant[0]}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}