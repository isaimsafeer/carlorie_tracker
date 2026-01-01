
import { UserProfile, MealType } from './types';


export const INITIAL_PROFILE: UserProfile = {
  email: 'guest@example.com',
  displayName: 'Guest User',
  createdAt: new Date(),
  settings: {
    age: 28,
    gender: 'male',
    weight: 75,
    height: 180,
    activityLevel: 'moderate',
    goal: 'maintain',
    dailyCalorieGoal: 2200,
    proteinGoal: 150,
    carbsGoal: 250,
    fatsGoal: 70
  }
};

export const MEAL_TYPES = [
  'breakfast',
  'lunch',
  'dinner',
  'snacks'
];

export const COLORS = {
  primary: '#10b981', // emerald-500
  secondary: '#3b82f6', // blue-500
  accent: '#f59e0b', // amber-500
  danger: '#ef4444', // red-500
};
