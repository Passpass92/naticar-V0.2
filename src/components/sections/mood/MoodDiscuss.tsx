import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Clock, Phone, Calendar, Video, ChevronRight } from 'lucide-react';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
  isUser?: boolean;
}

interface Counselor {
  name: string;
  title: string;
  avatar: string;
  status: 'online' | 'offline';
  specialties: string[];
  languages: string[];
  availability: string;
}

const counselor: Counselor = {
  name: 'Sophie Martin',
  title: 'Psychologue périnatale',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
  status: 'online',
  specialties: ['Post-partum', 'Baby blues', 'Anxiété périnatale'],
  languages: ['Français', 'Anglais'],
  availability: '8h - 20h'
};

const initialMessages: Message[] = [
  {
    id: '1',
    sender: counselor.name,
    content: 'Bonjour ! Je suis Sophie, votre psychologue périnatale. Comment puis-je vous aider aujourd\'hui ?',
    timestamp: new Date()
  }
];

const quickResponses = [
  'Je me sens dépassée',
  'J\'ai du mal à dormir',
  'Je me sens seule',
  'J\'ai besoin de parler'
];

export default function MoodDiscuss() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (content: string = newMessage) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'Vous',
      content: content,
      timestamp: new Date(),
      isUser: true
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');

    // Simulate counselor response
    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        sender: counselor.name,
        content: 'Je comprends ce que vous ressentez. Pouvez-vous m\'en dire plus sur ce qui vous préoccupe ?',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, response]);
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Discussion</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Échangez en toute confidentialité avec une professionnelle
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg flex flex-col h-[600px]">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <div className="relative">
                  <img
                    src={counselor.avatar}
                    alt={counselor.name}
                    className="h-10 w-10 rounded-full"
                  />
                  <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-400 ring-2 ring-white dark:ring-gray-800" />
                </div>
                <div className="ml-3">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                    {counselor.name}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {counselor.title}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`
                    max-w-[80%] rounded-lg p-4
                    ${message.isUser
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                    }
                  `}>
                    <div className="flex items-center mb-1">
                      <User className="h-4 w-4 mr-2" />
                      <span className="font-medium">{message.sender}</span>
                      <Clock className="h-4 w-4 ml-2 mr-1" />
                      <span className="text-xs">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p>{message.content}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="mb-4 flex flex-wrap gap-2">
                {quickResponses.map((response, index) => (
                  <button
                    key={index}
                    onClick={() => handleSend(response)}
                    className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
                  >
                    {response}
                  </button>
                ))}
              </div>
              <div className="flex space-x-4">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Écrivez votre message..."
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700"
                />
                <button
                  onClick={() => handleSend()}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              À propos de {counselor.name}
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Spécialités
                </h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {counselor.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Langues
                </h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {counselor.languages.map((language, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
                    >
                      {language}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Autres options de contact
            </h2>
            <div className="space-y-3">
              <button
                onClick={() => setShowAppointmentModal(true)}
                className="w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600/50"
              >
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-indigo-500 mr-2" />
                  <span className="text-gray-700 dark:text-gray-300">Rendez-vous en cabinet</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </button>
              <button
                className="w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600/50"
              >
                <div className="flex items-center">
                  <Video className="h-5 w-5 text-indigo-500 mr-2" />
                  <span className="text-gray-700 dark:text-gray-300">Consultation vidéo</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </button>
              <button
                className="w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600/50"
              >
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-indigo-500 mr-2" />
                  <span className="text-gray-700 dark:text-gray-300">Appel téléphonique</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Rappels importants
            </h2>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>• Cette conversation est confidentielle</li>
              <li>• Disponible {counselor.availability}</li>
              <li>• En cas d'urgence, appelez le 15</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}