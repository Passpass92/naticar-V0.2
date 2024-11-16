import React, { useState } from 'react';
import { Heart, Search, MessageCircle, Calendar, X, ChevronDown, ChevronUp } from 'lucide-react';

interface ParentingSupportProps {
  themeColor: string;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  icon: React.ReactNode;
}

interface Professional {
  id: string;
  name: string;
  title: string;
  speciality: string;
  availability: string[];
  description: string;
  image?: string;
}

const faqs: FAQ[] = [
  {
    id: '1',
    question: 'Comment gérer les pleurs du soir ?',
    answer: 'Les pleurs du soir, aussi appelés "pleurs du soir pourpre", sont normaux chez les bébés. Voici quelques conseils : maintenir une routine apaisante, réduire les stimulations, porter votre bébé, utiliser un bruit blanc, et demander de l\'aide si nécessaire.',
    category: 'Sommeil',
    icon: <MessageCircle />
  },
  {
    id: '2',
    question: 'Retour au travail',
    answer: 'Préparez votre retour au travail en organisant la garde de votre enfant à l\'avance, en établissant une routine stable, et en discutant des modalités de télétravail avec votre employeur si possible.',
    category: 'Organisation',
    icon: <Calendar />
  }
];

const professionals: Professional[] = [
  {
    id: '1',
    name: 'Dr. Martin',
    title: 'Pédiatre',
    speciality: 'Développement du nourrisson',
    availability: ['Lundi - Vendredi', '9:00 - 17:00'],
    description: 'Spécialisé dans le suivi des nourrissons et le développement précoce',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150'
  }
];

export default function ParentingSupport({ themeColor }: ParentingSupportProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [selectedProfessional, setSelectedProfessional] = useState<Professional | null>(null);
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAppointmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici, vous pouvez ajouter la logique pour sauvegarder le rendez-vous
    alert(`Rendez-vous confirmé pour le ${appointmentDate} à ${appointmentTime}`);
    setShowAppointmentModal(false);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className={`bg-white dark:bg-gray-800 shadow rounded-lg p-6 border-l-4 border-${themeColor}-500`}>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Questions fréquentes
        </h3>

        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Rechercher une question..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
            />
          </div>
        </div>

        <div className="space-y-4">
          {filteredFaqs.map((faq) => (
            <div 
              key={faq.id}
              className="bg-gray-50 dark:bg-gray-700/50 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                className="w-full text-left p-4 flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-600/50"
              >
                <div className="flex items-center">
                  <span className={`p-2 rounded-full bg-${themeColor}-100 dark:bg-${themeColor}-900/50 mr-3`}>
                    {faq.icon}
                  </span>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{faq.question}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{faq.category}</p>
                  </div>
                </div>
                {expandedFaq === faq.id ? (
                  <ChevronUp className="h-5 w-5 text-gray-400" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                )}
              </button>
              {expandedFaq === faq.id && (
                <div className="px-4 pb-4">
                  <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className={`bg-white dark:bg-gray-800 shadow rounded-lg p-6 border-l-4 border-${themeColor}-500`}>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Contacter un professionnel
        </h3>

        <div className="space-y-4">
          {professionals.map((professional) => (
            <div
              key={professional.id}
              className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                {professional.image && (
                  <img
                    src={professional.image}
                    alt={professional.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                )}
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {professional.name}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {professional.title} - {professional.speciality}
                  </p>
                  <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                    {professional.availability.map((time, index) => (
                      <p key={index}>{time}</p>
                    ))}
                  </div>
                </div>
              </div>
              <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
                {professional.description}
              </p>
              <button
                onClick={() => {
                  setSelectedProfessional(professional);
                  setShowAppointmentModal(true);
                }}
                className={`mt-4 w-full px-4 py-2 bg-${themeColor}-600 text-white rounded-lg hover:bg-${themeColor}-700`}
              >
                Prendre rendez-vous
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de prise de rendez-vous */}
      {showAppointmentModal && selectedProfessional && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setShowAppointmentModal(false)} />
            
            <div className="relative bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
              <button
                onClick={() => setShowAppointmentModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
              >
                <X className="h-6 w-6" />
              </button>

              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Prendre rendez-vous avec {selectedProfessional.name}
              </h3>

              <form onSubmit={handleAppointmentSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    required
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Heure
                  </label>
                  <input
                    type="time"
                    required
                    value={appointmentTime}
                    onChange={(e) => setAppointmentTime(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
                  />
                </div>

                <button
                  type="submit"
                  className={`w-full px-4 py-2 bg-${themeColor}-600 text-white rounded-lg hover:bg-${themeColor}-700`}
                >
                  Confirmer le rendez-vous
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}