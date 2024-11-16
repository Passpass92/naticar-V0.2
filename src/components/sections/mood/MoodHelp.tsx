import React, { useState } from 'react';
import { Phone, Users, BookOpen, Calendar, MapPin, ExternalLink } from 'lucide-react';

const emergencyContacts = [
  { 
    name: 'SOS Dépression',
    phone: '0800 00 00 00',
    available: '24/7',
    description: 'Ligne d\'écoute pour les situations de détresse'
  },
  {
    name: 'Soutien Périnatal',
    phone: '0800 00 00 01',
    available: '9h-18h',
    description: 'Accompagnement spécialisé post-natal'
  }
];

const supportGroups = [
  {
    name: 'Café des parents',
    schedule: 'Tous les mardis - 14h',
    location: 'Centre médical Saint-Jean',
    type: 'Présentiel',
    description: 'Groupe de parole pour jeunes parents'
  },
  {
    name: 'Cercle des mamans',
    schedule: 'Jeudis - 10h',
    location: 'En ligne (Zoom)',
    type: 'En ligne',
    description: 'Échanges et soutien entre mamans'
  }
];

const resources = [
  {
    title: 'Guide du baby blues',
    type: 'Article',
    description: 'Comprendre et surmonter cette période',
    link: '#'
  },
  {
    title: 'Méditation post-natale',
    type: 'Audio',
    description: 'Exercices de relaxation guidée',
    link: '#'
  },
  {
    title: 'Témoignages',
    type: 'Vidéo',
    description: 'Histoires de mamans qui s\'en sont sorties',
    link: '#'
  }
];

const professionals = [
  {
    name: 'Dr. Marie Martin',
    specialty: 'Psychologue périnatale',
    location: 'Centre médical Saint-Jean',
    availability: 'Lundi - Vendredi',
    nextSlot: '2024-03-20'
  },
  {
    name: 'Sophie Dubois',
    specialty: 'Sage-femme',
    location: 'Cabinet paramédical',
    availability: 'Mardi - Samedi',
    nextSlot: '2024-03-18'
  }
];

export default function MoodHelp() {
  const [selectedProfessional, setSelectedProfessional] = useState<string | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Besoin d'aide</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Des professionnels et des ressources sont là pour vous accompagner
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
              <Phone className="h-5 w-5 mr-2 text-indigo-500" />
              Contacts d'urgence
            </h2>
            <div className="space-y-4">
              {emergencyContacts.map((contact, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {contact.name}
                      </h3>
                      <p className="mt-1 text-gray-600 dark:text-gray-400">
                        {contact.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-indigo-600 dark:text-indigo-400 font-medium">
                        {contact.phone}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {contact.available}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-indigo-500" />
              Prendre rendez-vous
            </h2>
            <div className="space-y-4">
              {professionals.map((professional, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {professional.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {professional.specialty}
                      </p>
                      <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <MapPin className="h-4 w-4 mr-1" />
                        {professional.location}
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedProfessional(professional.name)}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm"
                    >
                      Prendre RDV
                    </button>
                  </div>
                  {selectedProfessional === professional.name && (
                    <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                        Prochaines disponibilités
                      </h4>
                      <div className="grid grid-cols-3 gap-2">
                        {[...Array(6)].map((_, i) => (
                          <button
                            key={i}
                            className="p-2 text-sm text-center border border-gray-200 dark:border-gray-700 rounded hover:bg-gray-50 dark:hover:bg-gray-700"
                          >
                            {new Date(professional.nextSlot).toLocaleDateString()}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
              <Users className="h-5 w-5 mr-2 text-indigo-500" />
              Groupes de soutien
            </h2>
            <div className="space-y-4">
              {supportGroups.map((group, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                >
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {group.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {group.description}
                  </p>
                  <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    <p>{group.schedule}</p>
                    <p className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {group.location}
                    </p>
                  </div>
                  <button className="mt-2 w-full px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 text-sm">
                    S'inscrire
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
              <BookOpen className="h-5 w-5 mr-2 text-indigo-500" />
              Ressources utiles
            </h2>
            <div className="space-y-3">
              {resources.map((resource, index) => (
                <a
                  key={index}
                  href={resource.link}
                  className="block p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600/50"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {resource.title}
                      </h3>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        {resource.description}
                      </p>
                    </div>
                    <ExternalLink className="h-5 w-5 text-gray-400" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}