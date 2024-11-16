import { db } from '../lib/firebase';
import { collection, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { UserProfile } from '../types';

export const userService = {
  async createProfile(userId: string, profile: UserProfile) {
    try {
      await setDoc(doc(db, 'users', userId), profile);
      return true;
    } catch (error) {
      console.error('Error creating profile:', error);
      return false;
    }
  },

  async getProfile(userId: string) {
    try {
      const docRef = doc(db, 'users', userId);
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? docSnap.data() as UserProfile : null;
    } catch (error) {
      console.error('Error getting profile:', error);
      return null;
    }
  },

  async updateProfile(userId: string, updates: Partial<UserProfile>) {
    try {
      const docRef = doc(db, 'users', userId);
      await updateDoc(docRef, updates);
      return true;
    } catch (error) {
      console.error('Error updating profile:', error);
      return false;
    }
  }
};