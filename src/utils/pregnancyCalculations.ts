import { addDays, differenceInDays, differenceInWeeks } from 'date-fns';

export interface PregnancyDates {
  lmp?: Date;
  conception?: Date;
  dueDate?: Date;
  currentGA?: {
    weeks: number;
    days: number;
  };
  trimester?: 1 | 2 | 3;
}

export function calculatePregnancyDates(input: { lmp?: Date; conception?: Date }): PregnancyDates {
  let result: PregnancyDates = {};
  const today = new Date();

  if (input.lmp) {
    result.lmp = input.lmp;
    result.dueDate = addDays(input.lmp, 280);
    const totalDays = differenceInDays(today, input.lmp);
    result.currentGA = {
      weeks: Math.floor(totalDays / 7),
      days: totalDays % 7
    };
  } else if (input.conception) {
    result.conception = input.conception;
    result.dueDate = addDays(input.conception, 266);
    result.lmp = addDays(input.conception, -14);
    const totalDays = differenceInDays(today, result.lmp);
    result.currentGA = {
      weeks: Math.floor(totalDays / 7),
      days: totalDays % 7
    };
  }

  // Calculate trimester
  if (result.currentGA) {
    const totalWeeks = result.currentGA.weeks;
    if (totalWeeks < 14) {
      result.trimester = 1;
    } else if (totalWeeks < 28) {
      result.trimester = 2;
    } else {
      result.trimester = 3;
    }
  }

  return result;
}

export function formatGA(ga: { weeks: number; days: number }): string {
  return `${ga.weeks} semaines et ${ga.days} jours`;
}

export function getTrimesterInfo(trimester: 1 | 2 | 3) {
  const info = {
    1: {
      name: 'Premier trimestre',
      range: '0-13 semaines',
      keyEvents: [
        'Formation des organes',
        'Premiers battements cardiaques',
        'Échographie T1 (12-13 semaines)'
      ]
    },
    2: {
      name: 'Deuxième trimestre',
      range: '14-27 semaines',
      keyEvents: [
        'Mouvements du bébé',
        'Échographie morphologique (22-24 semaines)',
        'Dépistage du diabète gestationnel'
      ]
    },
    3: {
      name: 'Troisième trimestre',
      range: '28-41 semaines',
      keyEvents: [
        'Croissance rapide du bébé',
        'Échographie T3 (32-34 semaines)',
        'Préparation à l\'accouchement'
      ]
    }
  };

  return info[trimester];
}

export function getRecommendations(medicalHistory: string[], currentGA: { weeks: number; days: number }) {
  const recommendations = [];

  // Base recommendations by gestational age
  if (currentGA.weeks < 14) {
    recommendations.push({
      type: 'general',
      text: 'Prenez de l\'acide folique quotidiennement'
    });
  }

  // Medical history specific recommendations
  if (medicalHistory.includes('diabetes')) {
    recommendations.push({
      type: 'warning',
      text: 'Surveillez votre glycémie plus fréquemment',
      frequency: '4 fois par jour'
    });
  }

  if (medicalHistory.includes('hypertension')) {
    recommendations.push({
      type: 'warning',
      text: 'Mesurez votre tension artérielle régulièrement',
      frequency: '1 fois par jour'
    });
  }

  return recommendations;
}

export function generateAppointmentSchedule(pregnancyDates: PregnancyDates) {
  if (!pregnancyDates.lmp || !pregnancyDates.dueDate) return [];

  const appointments = [
    {
      type: 'Première consultation',
      whenGA: { weeks: 8, days: 0 },
      description: 'Confirmation de grossesse et examens initiaux'
    },
    {
      type: 'Échographie T1',
      whenGA: { weeks: 12, days: 0 },
      description: 'Échographie du premier trimestre'
    },
    {
      type: 'Consultation mensuelle',
      whenGA: { weeks: 16, days: 0 },
      description: 'Suivi régulier'
    },
    {
      type: 'Échographie T2',
      whenGA: { weeks: 22, days: 0 },
      description: 'Échographie morphologique'
    },
    {
      type: 'Test diabète gestationnel',
      whenGA: { weeks: 24, days: 0 },
      description: 'Dépistage du diabète gestationnel'
    },
    {
      type: 'Échographie T3',
      whenGA: { weeks: 32, days: 0 },
      description: 'Dernière échographie systématique'
    }
  ];

  return appointments.map(apt => {
    const date = addDays(pregnancyDates.lmp!, (apt.whenGA.weeks * 7) + apt.whenGA.days);
    return {
      ...apt,
      date,
      isPast: date < new Date()
    };
  });
}