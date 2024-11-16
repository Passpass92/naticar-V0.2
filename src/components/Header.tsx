import React, { useState } from 'react';
import { Menu, Bell, Sun, Moon, ArrowLeft, Globe } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { useNavigationStore } from '../stores/navigationStore';
import { useUserStore } from '../stores/userStore';
import { useLanguageStore, Language } from '../stores/languageStore';
import Logo from './Logo';

export default function Header() {
  const { isDark, toggleTheme } = useTheme();
  const { currentSection, setCurrentSection } = useNavigationStore();
  const { period, setPeriod } = useUserStore();
  const { currentLanguage, languages, setLanguage } = useLanguageStore();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLanguages, setShowLanguages] = useState(false);

  const notifications = [
    {
      id: 1,
      title: "Prochain rendez-vous",
      message: "Consultation dans 2 jours",
      time: "Il y a 1 heure"
    },
    {
      id: 2,
      title: "Rappel",
      message: "N'oubliez pas de prendre vos vitamines",
      time: "Il y a 3 heures"
    }
  ];

  const showBackButton = currentSection !== 'dashboard';

  const handleLanguageChange = (language: Language) => {
    setLanguage(language);
    setShowLanguages(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button className="p-2 rounded-md text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300">
              <Menu className="h-6 w-6" />
            </button>
            {showBackButton && (
              <button
                onClick={() => setCurrentSection('dashboard')}
                className="ml-2 p-2 rounded-md text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <ArrowLeft className="h-6 w-6" />
              </button>
            )}
            <div className="ml-4">
              <Logo />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Période Toggle */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setPeriod('prenatal')}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  period === 'prenatal'
                    ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                Pré-natal
              </button>
              <button
                onClick={() => setPeriod('postnatal')}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  period === 'postnatal'
                    ? 'bg-pink-100 text-pink-700 dark:bg-pink-900/50 dark:text-pink-300'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                Post-natal
              </button>
            </div>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setShowLanguages(!showLanguages)}
                className="p-2 rounded-md text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 flex items-center"
              >
                <Globe className="h-5 w-5 mr-1" />
                <span className="text-sm">{currentLanguage.flag}</span>
              </button>

              {showLanguages && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    {languages.map((language) => (
                      <button
                        key={language.code}
                        onClick={() => handleLanguageChange(language)}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2 ${
                          currentLanguage.code === language.code
                            ? 'bg-gray-50 dark:bg-gray-700/50 text-indigo-600 dark:text-indigo-400'
                            : 'text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        <span>{language.flag}</span>
                        <span>{language.nativeName}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-md text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <Bell className="h-6 w-6" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-gray-900" />
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
                  <div className="py-2">
                    <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">Notifications</h3>
                    </div>
                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer"
                        >
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {notification.title}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {notification.message}
                          </p>
                          <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                            {notification.time}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
                      <button className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-500">
                        Voir toutes les notifications
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-md text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
            >
              {isDark ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}