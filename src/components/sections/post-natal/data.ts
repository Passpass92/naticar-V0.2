export interface GrowthData {
  date: string;
  weight: number;
  height: number;
  headCircumference: number;
  milestones: string[];
}

export const growthData: GrowthData[] = [
  { 
    date: "2024-03-01", 
    weight: 3.2, 
    height: 49, 
    headCircumference: 34,
    milestones: ["Tient sa tête", "Suit des yeux"]
  },
  { 
    date: "2024-03-15", 
    weight: 3.8, 
    height: 51, 
    headCircumference: 35,
    milestones: ["Sourire social", "Gazouille"]
  },
  { 
    date: "2024-03-30", 
    weight: 4.3, 
    height: 53, 
    headCircumference: 36,
    milestones: ["Se tourne sur le côté", "Rit aux éclats"]
  },
  { 
    date: "2024-04-15", 
    weight: 4.8, 
    height: 55, 
    headCircumference: 37,
    milestones: ["Tient assis avec support", "Attrape les objets"]
  }
];

export const omsReferenceData = {
  weight: [3.3, 4.0, 4.5, 5.0],
  height: [49.5, 52.0, 54.0, 56.0],
  headCircumference: [34.5, 35.5, 36.5, 37.5]
};

export const vaccineSchedule = [
  {
    age: "2 mois",
    vaccines: [
      {
        name: "DTCaP Hib HepB",
        date: "2024-05-01",
        status: "upcoming",
        sideEffects: "Fièvre légère, irritabilité",
        monitoring: "Surveiller la température pendant 48h"
      },
      {
        name: "Pneumocoque",
        date: "2024-05-01",
        status: "upcoming",
        sideEffects: "Rougeur au point d'injection",
        monitoring: "Surveiller la zone d'injection"
      }
    ]
  },
  {
    age: "4 mois",
    vaccines: [
      {
        name: "DTCaP Hib HepB",
        date: "2024-07-01",
        status: "scheduled",
        sideEffects: "Fièvre légère, douleur au point d'injection",
        monitoring: "Surveiller la zone d'injection"
      }
    ]
  }
];

export const sleepData = {
  labels: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
  datasets: [
    {
      label: "Heures de sommeil",
      data: [14, 15, 13, 14, 15, 14, 13],
    }
  ]
};

export const feedingData = {
  currentStage: "Allaitement exclusif",
  nextMilestone: "Introduction des purées",
  nextMilestoneAge: "4-6 mois",
  recommendations: [
    "Allaitement à la demande",
    "8-12 tétées par 24h",
    "Durée moyenne: 20-40 minutes"
  ],
  schedule: [
    { time: "6h00", type: "Tétée du matin" },
    { time: "9h00", type: "Tétée matinale" },
    { time: "12h00", type: "Tétée midi" },
    { time: "15h00", type: "Tétée après-midi" },
    { time: "18h00", type: "Tétée soir" },
    { time: "21h00", type: "Tétée nuit" }
  ]
};

export const developmentMilestones = {
  current: {
    age: "2 mois",
    physical: [
      "Tient sa tête",
      "Suit des yeux",
      "Bouge les bras et les jambes"
    ],
    social: [
      "Sourire social",
      "Gazouille",
      "Réagit aux visages"
    ],
    cognitive: [
      "Fixe son regard",
      "Réagit aux sons",
      "Commence à observer ses mains"
    ]
  },
  next: {
    age: "4 mois",
    milestones: [
      "Se retourne",
      "Tient les objets",
      "Rit aux éclats",
      "Pousse sur ses jambes"
    ]
  },
  activities: [
    {
      title: "Temps sur le ventre",
      description: "5-10 minutes plusieurs fois par jour",
      benefits: "Renforce les muscles du cou et du dos"
    },
    {
      title: "Jeux de regard",
      description: "Suivre des objets colorés",
      benefits: "Développe la coordination œil-main"
    },
    {
      title: "Conversations",
      description: "Parler et chanter avec bébé",
      benefits: "Stimule le développement du langage"
    }
  ]
};