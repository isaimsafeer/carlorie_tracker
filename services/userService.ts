
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { UserProfile, UserSettings } from '../types';

export const userService = {
    // Create new user profile
    createUserProfile: async (userId: string, profile: Partial<UserProfile>) => {
        const userRef = doc(db, 'users', userId);
        await setDoc(userRef, {
            ...profile,
            createdAt: new Date()
        });
    },

    // Get user profile
    getUserProfile: async (userId: string): Promise<UserProfile | null> => {
        const userRef = doc(db, 'users', userId);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            return userSnap.data() as UserProfile;
        }
        return null;
    },

    // Update user settings
    updateUserSettings: async (userId: string, settings: Partial<UserSettings>) => {
        const userRef = doc(db, 'users', userId);
        await updateDoc(userRef, {
            settings: settings
        });
    },

    // Calculate daily calorie goal
    calculateCalorieGoal: (settings: UserSettings): number => {
        // Mifflin-St Jeor Equation
        let bmr: number;

        if (settings.gender === 'male') {
            bmr = (10 * settings.weight) + (6.25 * settings.height) - (5 * settings.age) + 5;
        } else {
            bmr = (10 * settings.weight) + (6.25 * settings.height) - (5 * settings.age) - 161;
        }

        // Activity multipliers
        const activityMultipliers = {
            sedentary: 1.2,
            light: 1.375,
            moderate: 1.55,
            active: 1.725,
            very_active: 1.9
        };

        let tdee = bmr * activityMultipliers[settings.activityLevel];

        // Adjust for goal
        if (settings.goal === 'lose') {
            tdee -= 500; // 500 calorie deficit for ~0.5kg/week loss
        } else if (settings.goal === 'gain') {
            tdee += 500; // 500 calorie surplus
        }

        return Math.round(tdee);
    }
};
