import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  PhoneAuthProvider,
  signInWithCredential,
  updateProfile,
  User
} from 'firebase/auth';
import { auth } from '../lib/firebase';
import { userService } from './userService';

export const authService = {
  async registerWithEmail(email: string, password: string, name: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      
      // Create user profile in Firestore
      await userService.createProfile(userCredential.user.uid, {
        id: userCredential.user.uid,
        name,
        email,
        pregnancyStatus: 'expecting',
        previousPregnancies: 0,
        employmentStatus: 'employed',
        notificationPreferences: {
          frequency: 'daily',
          types: [],
          format: []
        }
      });

      return userCredential.user;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  async loginWithEmail(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  async logout() {
    try {
      await auth.signOut();
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
};