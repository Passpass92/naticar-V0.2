import { db } from '../lib/firebase';
import { collection, addDoc, query, where, getDocs, orderBy } from 'firebase/firestore';

export interface Measurement {
  id?: string;
  userId: string;
  date: Date;
  weight?: number;
  bloodPressure?: string;
  waistSize?: number;
  notes?: string;
}

export const measurementService = {
  async addMeasurement(measurement: Measurement) {
    try {
      const docRef = await addDoc(collection(db, 'measurements'), {
        ...measurement,
        date: measurement.date.toISOString()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding measurement:', error);
      return null;
    }
  },

  async getUserMeasurements(userId: string) {
    try {
      const q = query(
        collection(db, 'measurements'),
        where('userId', '==', userId),
        orderBy('date', 'desc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        date: new Date(doc.data().date)
      })) as Measurement[];
    } catch (error) {
      console.error('Error getting measurements:', error);
      return [];
    }
  }
};