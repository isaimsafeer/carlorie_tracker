
import { UserProfile, MealType } from './types';

export const INITIAL_PROFILE: UserProfile = {
  name: 'Health Explorer',
  weight: 75,
  height: 180,
  age: 28,
  gender: 'male',
  goalCalories: 2200,
  goalProtein: 150,
  goalCarbs: 250,
  goalFats: 70
};

export const MEAL_TYPES = [
  MealType.BREAKFAST,
  MealType.LUNCH,
  MealType.DINNER,
  MealType.SNACK
];

export const COLORS = {
  primary: '#10b981', // emerald-500
  secondary: '#3b82f6', // blue-500
  accent: '#f59e0b', // amber-500
  danger: '#ef4444', // red-500
};
