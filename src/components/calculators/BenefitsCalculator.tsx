import React, { useState } from 'react';
import { X, Calculator } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'prime' | 'conge';
}

export default function BenefitsCalculator({ isOpen, onClose, type }: CalculatorModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    revenus: '',
    situation: 'couple',
    enfants: '0',
    grossesseMultiple: 'non',
    dateAccouchement: ''
  });
  const [result, setResult] = useState<any>(null);

  const calculatePrimeNaissance = () => {
    const revenus = parseInt(formData.revenus);
    const plafondBase = formData.situation === 'couple' ? 46125 : 35872;
    const plafondParEnfant = 7688;
    const nombreEnfants = parseInt(formData.enfants);
    
    const plafondTotal = plafondBase + (plafondParEnfant * nombreEnfants);
    
    if (revenus <= plafondTotal) {
      const montantPrime = formData.grossesseMultiple === 'oui' ? 2000 : 1000;
      setResult({
        eligible: true,
        montant: montantPrime,
        message: `Vous êtes éligible à la prime de naissance d'un montant de ${montantPrime}€`
      });
    } else {
      setResult({
        eligible: false,
        montant: 0,
        message: "Vos revenus dépassent le plafond, vous n'êtes pas éligible à la prime de naissance"
      });
    }
  };

  const calculateCongeMat = () => {
    const nombreEnfants = parseInt(formData.enfants);
    const isMultiple = formData.grossesseMultiple === 'oui';
    let dureePrenatale = 6;
    let dureePostnatale = 10;

    if (isMultiple) {
      dureePrenatale = 12;
      dureePostnatale = 22;
    } else if (nombreEnfants >= 2) {
      dureePrenatale = 8;
      dureePostnatale = 18;
    }

    const dpa = new Date(formData.dateAccouchement);
    const debutConge = new Date(dpa);
    debutConge.setDate(dpa.getDate() - (dureePrenatale * 7));
    
    const finConge = new Date(dpa);
    finConge.setDate(dpa.getDate() + (dureePostnatale * 7));

    setResult({
      dureePrenatale,
      dureePostnatale,
      dureeTotal: dureePrenatale + dureePostnatale,
      debutConge: debutConge.toLocaleDateString('fr-FR'),
      finConge: finConge.toLocaleDateString('fr-FR')
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      if (type === 'prime') {
        calculatePrimeNaissance();
      } else {
        calculateCongeMat();
      }
      setStep(4);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

        <div className="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 px-4 pb-4 pt-5 shadow-xl transition-all sm:w-full sm:max-w-lg sm:p-6">
          <div className="absolute right-0 top-0 pr-4 pt-4">
            <button
              onClick={onClose}
              className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="mb-4">
            <div className="flex items-center justify-center mb-4">
              <div className="rounded-full bg-indigo-100 dark:bg-indigo-900/50 p-3">
                <Calculator className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white text-center">
              {type === 'prime' ? 'Calculateur Prime de Naissance' : 'Calculateur Congé Maternité'}
            </h2>
          </div>

          <AnimatePresence mode="wait">
            {step < 4 ? (
              <motion.form
                key="form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                {step === 1 && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Situation familiale
                      </label>
                      <select
                        value={formData.situation}
                        onChange={(e) => setFormData({ ...formData, situation: e.target.value })}
                        className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700"
                      >
                        <option value="couple">En couple</option>
                        <option value="seul">Parent isolé</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Nombre d'enfants à charge
                      </label>
                      <select
                        value={formData.enfants}
                        onChange={(e) => setFormData({ ...formData, enfants: e.target.value })}
                        className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700"
                      >
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3 ou plus</option>
                      </select>
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Grossesse multiple
                      </label>
                      <select
                        value={formData.grossesseMultiple}
                        onChange={(e) => setFormData({ ...formData, grossesseMultiple: e.target.value })}
                        className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700"
                      >
                        <option value="non">Non</option>
                        <option value="oui">Oui</option>
                      </select>
                    </div>

                    {type === 'conge' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Date prévue d'accouchement
                        </label>
                        <input
                          type="date"
                          value={formData.dateAccouchement}
                          onChange={(e) => setFormData({ ...formData, dateAccouchement: e.target.value })}
                          className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700"
                        />
                      </div>
                    )}
                  </>
                )}

                {step === 3 && type === 'prime' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Revenus annuels du foyer (N-2)
                    </label>
                    <input
                      type="number"
                      value={formData.revenus}
                      onChange={(e) => setFormData({ ...formData, revenus: e.target.value })}
                      className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700"
                      placeholder="Entrez vos revenus"
                    />
                  </div>
                )}

                <div className="mt-6 flex justify-between">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={() => setStep(step - 1)}
                      className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md"
                    >
                      Précédent
                    </button>
                  )}
                  <button
                    type="submit"
                    className="ml-auto px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
                  >
                    {step === 3 ? 'Calculer' : 'Suivant'}
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                {type === 'prime' ? (
                  <div className={`p-4 rounded-lg ${
                    result.eligible 
                      ? 'bg-green-50 dark:bg-green-900/50' 
                      : 'bg-red-50 dark:bg-red-900/50'
                  }`}>
                    <p className={`text-lg font-medium ${
                      result.eligible 
                        ? 'text-green-800 dark:text-green-200' 
                        : 'text-red-800 dark:text-red-200'
                    }`}>
                      {result.message}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-indigo-50 dark:bg-indigo-900/50 p-4 rounded-lg">
                      <h3 className="text-lg font-medium text-indigo-800 dark:text-indigo-200">
                        Durée de votre congé maternité
                      </h3>
                      <p className="mt-2 text-indigo-600 dark:text-indigo-300">
                        {result.dureeTotal} semaines au total
                      </p>
                      <ul className="mt-4 space-y-2 text-sm text-indigo-700 dark:text-indigo-300">
                        <li>Congé prénatal : {result.dureePrenatale} semaines</li>
                        <li>Congé postnatal : {result.dureePostnatale} semaines</li>
                      </ul>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                      <p className="text-gray-700 dark:text-gray-300">
                        Début du congé : {result.debutConge}
                      </p>
                      <p className="text-gray-700 dark:text-gray-300">
                        Fin du congé : {result.finConge}
                      </p>
                    </div>
                  </div>
                )}

                <button
                  onClick={onClose}
                  className="mt-6 px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
                >
                  Fermer
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}