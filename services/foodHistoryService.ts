
import {
    collection,
    doc,
    setDoc,
    getDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    increment,
    query,
    orderBy,
    limit
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { FoodItem } from '../types';

export const foodHistoryService = {
    // Add to food history
    addToHistory: async (userId: string, food: FoodItem) => {
        const foodRef = doc(db, 'users', userId, 'foodHistory', food.id);
        const foodDoc = await getDoc(foodRef);

        if (foodDoc.exists()) {
            // Update existing entry
            await updateDoc(foodRef, {
                lastUsed: new Date(),
                frequency: increment(1)
            });
        } else {
            // Create new entry
            await setDoc(foodRef, {
                ...food,
                lastUsed: new Date(),
                frequency: 1
            });
        }
    },

    // Get recent foods
    getRecentFoods: async (userId: string, limitCount: number = 10): Promise<FoodItem[]> => {
        const historyRef = collection(db, 'users', userId, 'foodHistory');
        const q = query(historyRef, orderBy('lastUsed', 'desc'), limit(limitCount));
        const snapshot = await getDocs(q);

        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as FoodItem));
    },

    // Get frequent foods
    getFrequentFoods: async (userId: string, limitCount: number = 10): Promise<FoodItem[]> => {
        const historyRef = collection(db, 'users', userId, 'foodHistory');
        const q = query(historyRef, orderBy('frequency', 'desc'), limit(limitCount));
        const snapshot = await getDocs(q);

        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as FoodItem));
    },

    // Add to favorites
    addToFavorites: async (userId: string, food: FoodItem) => {
        const favRef = doc(db, 'users', userId, 'favorites', food.id);
        await setDoc(favRef, {
            ...food,
            addedAt: new Date()
        });
    },

    // Remove from favorites
    removeFromFavorites: async (userId: string, foodId: string) => {
        const favRef = doc(db, 'users', userId, 'favorites', foodId);
        await deleteDoc(favRef);
    },

    // Get favorites
    getFavorites: async (userId: string): Promise<FoodItem[]> => {
        const favRef = collection(db, 'users', userId, 'favorites');
        const snapshot = await getDocs(favRef);

        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as FoodItem));
    }
};
