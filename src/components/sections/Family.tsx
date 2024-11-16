import React, { useState } from 'react';
import { UserPlus, Book, Image, Calendar, Plus, X } from 'lucide-react';

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

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75" onClick={onClose} />
        <div className="relative bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">{title}</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X className="h-6 w-6" />
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

export default function Family() {
  const [selectedAlbum, setSelectedAlbum] = useState<string | null>(null);
  const [showNewEntryModal, setShowNewEntryModal] = useState(false);
  const [showNewAlbumModal, setShowNewAlbumModal] = useState(false);
  const [showNewEventModal, setShowNewEventModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);

  const handleAlbumClick = (albumName: string) => {
    setSelectedAlbum(albumName);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Espace Famille</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Partagez les moments importants avec votre famille
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Journal collaboratif */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                Journal de famille
              </h2>
              <button 
                onClick={() => setShowNewEntryModal(true)}
                className="flex items-center text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-500"
              >
                <Plus className="h-4 w-4 mr-1" />
                Nouvelle entrée
              </button>
            </div>
            <div className="space-y-4">
              <div 
                className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600/50 transition-colors"
                onClick={() => setShowNewEntryModal(true)}
              >
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
              <button 
                onClick={() => setShowNewAlbumModal(true)}
                className="flex items-center text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-500"
              >
                <Image className="h-4 w-4 mr-1" />
                Nouvel album
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div 
                className="relative group cursor-pointer"
                onClick={() => handleAlbumClick('Mois par mois')}
              >
                <img
                  src="https://images.unsplash.com/photo-1556374002-b5ba944634b3?w=300"
                  alt="Album grossesse"
                  className="w-full h-32 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition-opacity rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-medium">Mois par mois</span>
                </div>
              </div>
              <div 
                className="relative group cursor-pointer"
                onClick={() => handleAlbumClick('Échographies')}
              >
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
              <button 
                onClick={() => setShowInviteModal(true)}
                className="flex items-center text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-500"
              >
                <UserPlus className="h-4 w-4 mr-1" />
                Inviter
              </button>
            </div>
            <div className="space-y-4">
              {familyMembers.map((member) => (
                <div 
                  key={member.id} 
                  className="flex items-center p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors"
                  onClick={() => {/* Handle member click */}}
                >
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
              <button 
                onClick={() => setShowNewEventModal(true)}
                className="flex items-center text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-500"
              >
                <Calendar className="h-4 w-4 mr-1" />
                Ajouter
              </button>
            </div>
            <div className="space-y-3">
              {familyEvents.map((event) => (
                <div 
                  key={event.id} 
                  className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600/50 cursor-pointer transition-colors"
                  onClick={() => {/* Handle event click */}}
                >
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

      {/* Modals */}
      <Modal
        isOpen={showNewEntryModal}
        onClose={() => setShowNewEntryModal(false)}
        title="Nouvelle entrée dans le journal"
      >
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Titre"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          <textarea
            placeholder="Votre message..."
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
            Publier
          </button>
        </div>
      </Modal>

      <Modal
        isOpen={showNewAlbumModal}
        onClose={() => setShowNewAlbumModal(false)}
        title="Créer un nouvel album"
      >
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Nom de l'album"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <p className="text-gray-500">Glissez-déposez vos photos ici</p>
          </div>
          <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
            Créer l'album
          </button>
        </div>
      </Modal>

      <Modal
        isOpen={showNewEventModal}
        onClose={() => setShowNewEventModal(false)}
        title="Ajouter un événement"
      >
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Titre de l'événement"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="date"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="time"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
            Ajouter l'événement
          </button>
        </div>
      </Modal>

      <Modal
        isOpen={showInviteModal}
        onClose={() => setShowInviteModal(false)}
        title="Inviter un membre"
      >
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Adresse email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
            <option value="">Sélectionner un rôle</option>
            <option value="parent">Parent</option>
            <option value="grandparent">Grand-parent</option>
            <option value="sibling">Frère/Sœur</option>
          </select>
          <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
            Envoyer l'invitation
          </button>
        </div>
      </Modal>

      <Modal
        isOpen={selectedAlbum !== null}
        onClose={() => setSelectedAlbum(null)}
        title={selectedAlbum || ''}
      >
        <div className="grid grid-cols-2 gap-4">
          <img
            src="https://images.unsplash.com/photo-1556374002-b5ba944634b3?w=300"
            alt="Photo"
            className="w-full rounded-lg"
          />
          <img
            src="https://images.unsplash.com/photo-1519689680058-324335c77eba?w=300"
            alt="Photo"
            className="w-full rounded-lg"
          />
        </div>
      </Modal>
    </div>
  );
}