import React, { useState } from 'react';
import { X, Baby } from 'lucide-react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { motion, AnimatePresence } from 'framer-motion';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-gray-500 bg-opacity-75 backdrop-blur-sm transition-opacity"
        />

        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 px-4 pb-4 pt-5 shadow-xl transition-all sm:w-full sm:max-w-md sm:p-8"
        >
          <div className="absolute right-0 top-0 pr-4 pt-4">
            <button
              onClick={onClose}
              className="rounded-full p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-500 focus:outline-none transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="mb-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="rounded-full bg-indigo-100 dark:bg-indigo-900/50 p-3">
                <Baby className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {isLogin ? 'Bienvenue' : 'Créer un compte'}
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {isLogin 
                ? 'Connectez-vous pour accéder à votre espace personnel'
                : 'Rejoignez-nous pour suivre votre grossesse en toute sérénité'
              }
            </p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? 'login' : 'register'}
              initial={{ x: isLogin ? -20 : 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: isLogin ? 20 : -20, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {isLogin ? (
                <LoginForm onSuccess={onSuccess} />
              ) : (
                <RegisterForm onSuccess={onSuccess} />
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-700" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white dark:bg-gray-800 px-2 text-gray-500 dark:text-gray-400">
                  ou
                </span>
              </div>
            </div>

            <div className="mt-6">
              <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                <img
                  className="h-5 w-5 mr-2"
                  src="https://www.google.com/favicon.ico"
                  alt="Google"
                />
                Continuer avec Google
              </button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 transition-colors"
            >
              {isLogin 
                ? "Vous n'avez pas de compte ? Inscrivez-vous"
                : 'Déjà inscrit ? Connectez-vous'
              }
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}