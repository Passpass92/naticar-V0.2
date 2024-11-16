import { db } from '../lib/firebase';
import { collection, addDoc, query, where, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';

export interface Appointment {
  id?: string;
  userId: string;
  title: string;
  date: Date;
  doctor: string;
  type: string;
  location: string;
  notes?: string;
}

export const appointmentService = {
  async createAppointment(appointment: Appointment) {
    try {
      const docRef = await addDoc(collection(db, 'appointments'), {
        ...appointment,
        date: appointment.date.toISOString()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating appointment:', error);
      return null;
    }
  },

  async getUserAppointments(userId: string) {
    try {
      const q = query(collection(db, 'appointments'), where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        date: new Date(doc.data().date)
      })) as Appointment[];
    } catch (error) {
      console.error('Error getting appointments:', error);
      return [];
    }
  },

  async updateAppointment(id: string, updates: Partial<Appointment>) {
    try {
      const docRef = doc(db, 'appointments', id);
      if (updates.date) {
        updates.date = updates.date.toISOString();
      }
      await updateDoc(docRef, updates);
      return true;
    } catch (error) {
      console.error('Error updating appointment:', error);
      return false;
    }
  },

  async deleteAppointment(id: string) {
    try {
      await deleteDoc(doc(db, 'appointments', id));
      return true;
    } catch (error) {
      console.error('Error deleting appointment:', error);
      return false;
    }
  }
};