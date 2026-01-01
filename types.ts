
export type AppTab = 'dashboard' | 'log' | 'camera' | 'profile';

export interface UserProfile {
  email: string;
  displayName: string;
  photoURL?: string;
  createdAt: Date;
  settings: UserSettings;
}

export interface UserSettings {
  age: number;
  gender: 'male' | 'female' | 'other';
  weight: number;
  height: number;
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
  goal: 'lose' | 'maintain' | 'gain';
  targetWeight?: number;
  dailyCalorieGoal: number;
  proteinGoal: number;
  carbsGoal: number;
  fatsGoal: number;
}

export interface MealEntry {
  id: string;
  foodName: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  servingSize: string;
  quantity: number;
  imageUrl?: string;
  timestamp: Date; // Keep as Date for Firebase compatibility, used to be number in old code
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snacks';
}

export interface DailyLog {
  date: string; // YYYY-MM-DD
  breakfast: MealEntry[];
  lunch: MealEntry[];
  dinner: MealEntry[];
  snacks: MealEntry[];
  totals: {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
  };
}

export interface FoodItem {
  id: string;
  foodName: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  servingSize: string;
  lastUsed?: Date;
  frequency?: number;
}

// Keeping these for legacy compat if needed, but the new interfaces above should be primary.
export interface Nutrients {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}
