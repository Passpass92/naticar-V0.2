import React from 'react';
import HealthMetrics from './HealthMetrics';
import UpcomingEvents from './UpcomingEvents';
import DevelopmentOverview from './DevelopmentOverview';
import { GrowthData } from './data';

interface HealthOverviewProps {
  latestData: GrowthData;
  nextVaccine: any;
  developmentMilestones: any;
  themeColor: string;
}

export default function HealthOverview({ 
  latestData, 
  nextVaccine, 
  developmentMilestones,
  themeColor 
}: HealthOverviewProps) {
  return (
    <div className="space-y-6">
      <HealthMetrics data={latestData} themeColor={themeColor} />
      <UpcomingEvents nextVaccine={nextVaccine} themeColor={themeColor} />
      <DevelopmentOverview developmentMilestones={developmentMilestones} themeColor={themeColor} />
    </div>
  );
}