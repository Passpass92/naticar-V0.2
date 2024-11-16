import React from 'react';
import { Baby } from 'lucide-react';

export default function Logo() {
  return (
    <div className="flex items-center space-x-2">
      <Baby className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
      <span className="text-xl font-bold text-gray-900 dark:text-white">NatiCare</span>
    </div>
  );
}