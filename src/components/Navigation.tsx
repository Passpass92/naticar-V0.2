import React, { useState } from 'react';
import { 
  Baby, Calendar, Activity, Utensils, Brain, 
  Users, Heart, UserCircle, Book, ShoppingBag,
  MessageCircle, CalendarClock, Briefcase,
  Share2, Moon, Pill, SmilePlus, HelpCircle, MessageSquare,
  Menu as MenuIcon, X, BookOpen, Dumbbell
} from 'lucide-react';
import { useNavigationStore } from '../stores/navigationStore';
import { useUserStore } from '../stores/userStore';
import { useTranslation } from '../hooks/useTranslation';

const getMenuItems = (period: 'prenatal' | 'postnatal', t: (key: any) => string) => {
  const prenatalItems = [
    {
      category: 'Suivi de grossesse',
      items: [
        { id: 'dashboard', icon: <Baby />, label: 'Tableau de bord' },
        { id: 'measurements', icon: <Activity />, label: 'Mesures' },
        { id: 'journal', icon: <Book />, label: 'Journal' },
        { id: 'medications', icon: <Pill />, label: 'Médicaments' }
      ]
    },
    {
      category: 'Organisation & Planning',
      items: [
        { id: 'appointments', icon: <Calendar />, label: 'Rendez-vous' },
        { id: 'checklist', icon: <Book />, label: 'Checklist' },
        { id: 'administrative', icon: <Briefcase />, label: 'Démarches' },
        { id: 'birth-prep', icon: <Book />, label: 'Préparation naissance' }
      ]
    },
    {
      category: 'Bien-être & Nutrition',
      items: [
        { id: 'nutrition', icon: <Utensils />, label: 'Nutrition' },
        { id: 'mood-evaluate', icon: <SmilePlus />, label: 'Évaluer mon humeur' },
        { id: 'mood-help', icon: <HelpCircle />, label: 'Besoin d\'aide' },
        { id: 'shop', icon: <ShoppingBag />, label: 'Boutique' }
      ]
    }
  ];

  const postnatalItems = [
    {
      category: 'Suivi Bébé',
      items: [
        { id: 'dashboard', icon: <Baby />, label: 'Tableau de bord' },
        { id: 'growth', icon: <Activity />, label: 'Croissance' },
        { id: 'development', icon: <Brain />, label: 'Développement' },
        { id: 'sleep', icon: <Moon />, label: 'Sommeil' }
      ]
    },
    {
      category: 'Santé & Soins',
      items: [
        { id: 'feeding', icon: <Utensils />, label: 'Alimentation' },
        { id: 'vaccines', icon: <Heart />, label: 'Vaccins' },
        { id: 'advice', icon: <BookOpen />, label: 'Espace Conseils' }
      ]
    },
    {
      category: 'Rééducation & Bien-être',
      items: [
        { id: 'exercises', icon: <Dumbbell />, label: 'Exercices & Rééducation' },
        { id: 'support', icon: <Users />, label: 'Soutien' },
        { id: 'mood-evaluate', icon: <SmilePlus />, label: 'Évaluer mon humeur' },
        { id: 'mood-help', icon: <HelpCircle />, label: 'Besoin d\'aide' }
      ]
    }
  ];

  // Common sections for both modes
  const commonSections = [
    {
      category: 'Communauté',
      items: [
        { id: 'community', icon: <Users />, label: 'Communauté' },
        { id: 'mood-discuss', icon: <MessageSquare />, label: 'Discuter' }
      ]
    },
    {
      category: 'Mon Compte',
      items: [
        { id: 'profile', icon: <UserCircle />, label: 'Mon Profil' }
      ]
    }
  ];

  return period === 'prenatal' 
    ? [...prenatalItems, ...commonSections]
    : [...postnatalItems, ...commonSections];
};

export default function Navigation() {
  const { currentSection, setCurrentSection } = useNavigationStore();
  const { period } = useUserStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useTranslation();
  const menuItems = getMenuItems(period, t);

  return (
    <>
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="lg:hidden fixed left-4 top-4 p-2 rounded-md text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
      >
        <MenuIcon className="h-6 w-6" />
      </button>

      <div className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-200 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-0
      `}>
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{t('menu')}</h2>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto p-4">
            <div className="space-y-8">
              {menuItems.map((section) => (
                <div key={section.category}>
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                    {section.category}
                  </h3>
                  <ul className="space-y-2">
                    {section.items.map((item) => (
                      <li key={item.id}>
                        <button
                          onClick={() => {
                            setCurrentSection(item.id);
                            setIsMobileMenuOpen(false);
                          }}
                          className={`
                            w-full flex items-center px-3 py-2 text-sm rounded-md
                            ${currentSection === item.id
                              ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/50'
                              : 'text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                            }
                          `}
                        >
                          {React.cloneElement(item.icon, {
                            className: `h-5 w-5 mr-3 ${
                              currentSection === item.id
                                ? 'text-indigo-600 dark:text-indigo-400'
                                : 'text-gray-400 group-hover:text-indigo-600'
                            }`
                          })}
                          {item.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}