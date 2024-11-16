import React from 'react';
import Dashboard from './Dashboard';
import Appointments from './sections/Appointments';
import Measurements from './sections/Measurements';
import Nutrition from './sections/Nutrition';
import Medications from './sections/prenatal/Medications';
import Administrative from './sections/Administrative';
import Profile from './sections/Profile';
import Community from './sections/Community';
import MoodEvaluate from './sections/mood/MoodEvaluate';
import MoodHelp from './sections/mood/MoodHelp';
import MoodDiscuss from './sections/mood/MoodDiscuss';
import PostNatalDashboard from './sections/post-natal/Dashboard';
import Growth from './sections/post-natal/Growth';
import Development from './sections/post-natal/Development';
import Sleep from './sections/post-natal/Sleep';
import Feeding from './sections/post-natal/Feeding';
import Vaccines from './sections/post-natal/Vaccines';
import Support from './sections/post-natal/Support';
import Journal from './sections/prenatal/Journal';
import BirthPrep from './sections/prenatal/BirthPrep';
import Shop from './sections/prenatal/Shop';
import Checklist from './sections/prenatal/Checklist';
import AdvicePortal from './sections/post-natal/advice/AdvicePortal';
import ExercisesPortal from './sections/post-natal/exercises/ExercisesPortal';

const sections: Record<string, React.ComponentType> = {
  dashboard: Dashboard,
  appointments: Appointments,
  measurements: Measurements,
  nutrition: Nutrition,
  medications: Medications,
  administrative: Administrative,
  profile: Profile,
  community: Community,
  'mood-evaluate': MoodEvaluate,
  'mood-help': MoodHelp,
  'mood-discuss': MoodDiscuss,
  'post-natal': PostNatalDashboard,
  growth: Growth,
  development: Development,
  sleep: Sleep,
  feeding: Feeding,
  vaccines: Vaccines,
  support: Support,
  journal: Journal,
  'birth-prep': BirthPrep,
  shop: Shop,
  checklist: Checklist,
  advice: AdvicePortal,
  exercises: ExercisesPortal
};

export default function MainContent({ currentSection }: { currentSection: string }) {
  const CurrentComponent = sections[currentSection] || Dashboard;
  
  return (
    <div className="py-6">
      <CurrentComponent />
    </div>
  );
}