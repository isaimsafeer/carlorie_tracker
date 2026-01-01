
export enum MealType {
  BREAKFAST = 'Breakfast',
  LUNCH = 'Lunch',
  DINNER = 'Dinner',
  SNACK = 'Snack'
}

export interface Nutrients {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

export interface FoodItem {
  id: string;
  name: string;
  nutrients: Nutrients;
  mealType: MealType;
  timestamp: number;
  imageUrl?: string;
}

export interface UserProfile {
  name: string;
  weight: number; // in kg
  height: number; // in cm
  age: number;
  gender: 'male' | 'female' | 'other';
  goalCalories: number;
  goalProtein: number;
  goalCarbs: number;
  goalFats: number;
}

export interface DailyLog {
  date: string; // YYYY-MM-DD
  items: FoodItem[];
}

export type AppTab = 'dashboard' | 'log' | 'camera' | 'profile';
