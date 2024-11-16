import React from 'react';
import { FileText, Download, Upload, Search } from 'lucide-react';

const documents = [
  {
    id: '1',
    name: 'Déclaration de grossesse',
    type: 'PDF',
    size: '245 KB',
    date: '15/03/2024',
    status: 'completed'
  },
  {
    id: '2',
    name: 'Résultats analyses T1',
    type: 'PDF',
    size: '1.2 MB',
    date: '10/03/2024',
    status: 'pending'
  },
  {
    id: '3',
    name: 'Échographie T2',
    type: 'JPG',
    size: '3.4 MB',
    date: '01/03/2024',
    status: 'completed'
  }
];

export default function Documents() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Documents</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Gérez vos documents importants
        </p>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Rechercher un document..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
          <Upload className="h-5 w-5 mr-2" />
          Ajouter un document
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
        <div className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <div className="bg-gray-50 dark:bg-gray-700">
            <div className="grid grid-cols-12 px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              <div className="col-span-6">Nom</div>
              <div className="col-span-2">Type</div>
              <div className="col-span-2">Taille</div>
              <div className="col-span-2">Actions</div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {documents.map((doc) => (
              <div key={doc.id} className="grid grid-cols-12 px-6 py-4 items-center">
                <div className="col-span-6">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-gray-400" />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {doc.name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Ajouté le {doc.date}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-2 text-sm text-gray-500 dark:text-gray-400">
                  {doc.type}
                </div>
                <div className="col-span-2 text-sm text-gray-500 dark:text-gray-400">
                  {doc.size}
                </div>
                <div className="col-span-2">
                  <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300">
                    <Download className="h-4 w-4 mr-1" />
                    Télécharger
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Documents importants
          </h2>
          <ul className="space-y-3">
            <li className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <FileText className="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400" />
              Déclaration de grossesse
            </li>
            <li className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <FileText className="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400" />
              Examens obligatoires
            </li>
            <li className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <FileText className="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400" />
              Échographies
            </li>
          </ul>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Stockage utilisé
          </h2>
          <div className="relative pt-1">
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200 dark:bg-indigo-900">
              <div
                style={{ width: '30%' }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"
              ></div>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              150 MB utilisés sur 500 MB
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Partage de documents
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Partagez vos documents en toute sécurité avec vos professionnels de santé.
          </p>
          <button className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
            Gérer les partages
          </button>
        </div>
      </div>
    </div>
  );
}