import React, { useEffect, useState } from 'react';
import { Baby } from 'lucide-react';

export default function SplashScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center z-50">
      <div className="text-center animate-fade-in">
        <Baby className="h-20 w-20 text-white mb-4 animate-bounce" />
        <h1 className="text-4xl font-bold text-white mb-2">BébéCare Pro</h1>
        <p className="text-indigo-100">Votre compagnon de grossesse</p>
      </div>
    </div>
  );
}