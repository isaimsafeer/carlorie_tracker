
import {
    collection,
    doc,
    setDoc,
    getDoc,
    updateDoc,
    arrayUnion,
    arrayRemove,
    Timestamp
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { MealEntry, DailyLog } from '../types';

export const mealsService = {
    // Add meal entry
    addMealEntry: async (userId: string, date: string, mealEntry: MealEntry) => {
        const mealRef = doc(db, 'users', userId, 'meals', date);
        const mealDoc = await getDoc(mealRef);

        if (mealDoc.exists()) {
            // Update existing day
            await updateDoc(mealRef, {
                [mealEntry.mealType]: arrayUnion(mealEntry)
            });
        } else {
            // Create new day
            const newDayLog: DailyLog = {
                date,
                breakfast: [],
                lunch: [],
                dinner: [],
                snacks: [],
                totals: { calories: 0, protein: 0, carbs: 0, fats: 0 }
            };
            // Initialize the specific meal type array with the entry
            (newDayLog[mealEntry.mealType] as MealEntry[]).push(mealEntry);

            await setDoc(mealRef, newDayLog);
        }

        // Update totals
        await updateMealTotals(userId, date);
    },

    // Get daily log
    getDailyLog: async (userId: string, date: string): Promise<DailyLog | null> => {
        const mealRef = doc(db, 'users', userId, 'meals', date);
        const mealSnap = await getDoc(mealRef);

        if (mealSnap.exists()) {
            return mealSnap.data() as DailyLog;
        }
        return null;
    },

    // Delete meal entry
    deleteMealEntry: async (userId: string, date: string, mealEntry: MealEntry) => {
        const mealRef = doc(db, 'users', userId, 'meals', date);
        await updateDoc(mealRef, {
            [mealEntry.mealType]: arrayRemove(mealEntry)
        });
        await updateMealTotals(userId, date);
    },

    // Update meal entry
    updateMealEntry: async (
        userId: string,
        date: string,
        oldEntry: MealEntry,
        newEntry: MealEntry
    ) => {
        const mealRef = doc(db, 'users', userId, 'meals', date);
        await updateDoc(mealRef, {
            [oldEntry.mealType]: arrayRemove(oldEntry)
        });
        await updateDoc(mealRef, {
            [newEntry.mealType]: arrayUnion(newEntry)
        });
        await updateMealTotals(userId, date);
    }
};

// Helper function to update totals
const updateMealTotals = async (userId: string, date: string) => {
    const dailyLog = await mealsService.getDailyLog(userId, date);

    if (!dailyLog) return;

    const allMeals = [
        ...dailyLog.breakfast,
        ...dailyLog.lunch,
        ...dailyLog.dinner,
        ...dailyLog.snacks
    ];

    const totals = allMeals.reduce(
        (acc, meal) => ({
            calories: acc.calories + (meal.calories * meal.quantity),
            protein: acc.protein + (meal.protein * meal.quantity),
            carbs: acc.carbs + (meal.carbs * meal.quantity),
            fats: acc.fats + (meal.fats * meal.quantity)
        }),
        { calories: 0, protein: 0, carbs: 0, fats: 0 }
    );

    const mealRef = doc(db, 'users', userId, 'meals', date);
    await updateDoc(mealRef, { totals });
};
