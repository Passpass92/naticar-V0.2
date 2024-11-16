import React from 'react';
import { Weight, Ruler, Activity, ArrowUp, ArrowDown } from 'lucide-react';
import { GrowthData } from './data';

interface HealthMetricsProps {
  data: GrowthData;
  themeColor: string;
}

export default function HealthMetrics({ data, themeColor }: HealthMetricsProps) {
  const calculateTrend = (current: number, previous: number) => {
    const diff = current - previous;
    return {
      direction: diff >= 0 ? 'up' : 'down',
      value: Math.abs(diff).toFixed(1)
    };
  };

  const weightTrend = calculateTrend(data.weight, data.weight - 0.3);
  const heightTrend = calculateTrend(data.height, data.height - 1);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <MetricCard
        icon={<Weight className={`h-8 w-8 text-${themeColor}-500`} />}
        title="Poids"
        value={`${data.weight} kg`}
        trend={weightTrend}
        date={data.date}
        themeColor={themeColor}
      />
      <MetricCard
        icon={<Ruler className={`h-8 w-8 text-${themeColor}-500`} />}
        title="Taille"
        value={`${data.height} cm`}
        trend={heightTrend}
        subtitle="Percentile estimé: 75th"
        themeColor={themeColor}
      />
      <MetricCard
        icon={<Activity className={`h-8 w-8 text-${themeColor}-500`} />}
        title="IMC"
        value={(data.weight / Math.pow(data.height / 100, 2)).toFixed(1)
        }
        status="Normal"
        subtitle="Dans la moyenne pour l'âge"
        themeColor={themeColor}
      />
    </div>
  );
}

interface MetricCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  trend?: { direction: 'up' | 'down'; value: string };
  status?: string;
  date?: string;
  subtitle?: string;
  themeColor: string;
}

function MetricCard({ 
  icon, 
  title, 
  value, 
  trend, 
  status, 
  date, 
  subtitle,
  themeColor 
}: MetricCardProps) {
  return (
    <div className={`bg-white dark:bg-gray-800 shadow rounded-lg p-6 border-l-4 border-${themeColor}-500`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {icon}
          <div className="ml-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              {title}
            </h3>
            <div className="flex items-center mt-1">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {value}
              </span>
              {trend && (
                <div className={`ml-2 flex items-center ${
                  trend.direction === 'up' 
                    ? 'text-green-500' 
                    : 'text-red-500'
                }`}>
                  {trend.direction === 'up' ? (
                    <ArrowUp className="h-4 w-4" />
                  ) : (
                    <ArrowDown className="h-4 w-4" />
                  )}
                  <span className="text-sm ml-1">{trend.value}</span>
                </div>
              )}
              {status && (
                <span className="ml-2 text-sm text-green-500">{status}</span>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        {date && `Dernière mesure: ${new Date(date).toLocaleDateString()}`}
        {subtitle && subtitle}
      </div>
    </div>
  );
}