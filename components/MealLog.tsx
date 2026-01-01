
import React from 'react';
import { MealEntry } from '../types';
import { MEAL_TYPES } from '../constants';

interface MealLogProps {
  items: MealEntry[];
  onRemoveItem: (id: string) => void;
}

const MealLog: React.FC<MealLogProps> = ({ items, onRemoveItem }) => {
  const groupedItems = MEAL_TYPES.reduce((acc, type) => {
    acc[type] = items.filter(item => item.mealType === type);
    return acc;
  }, {} as Record<string, MealEntry[]>);

  return (
    <div className="pb-24 pt-6 px-4 space-y-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900">Meal Log</h1>

      {MEAL_TYPES.map((type) => {
        const mealItems = groupedItems[type];
        const totalCals = mealItems.reduce((sum, i) => sum + i.calories, 0);

        return (
          <section key={type} className="space-y-4">
            <div className="flex justify-between items-end">
              <h2 className="text-lg font-bold text-gray-800 capitalize">{type}</h2>
              <span className="text-sm font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg">
                {Math.round(totalCals)} kcal
              </span>
            </div>

            <div className="space-y-3">
              {mealItems.length > 0 ? (
                mealItems.map((item) => (
                  <div key={item.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex gap-4 animate-in slide-in-from-right duration-300">
                    {item.imageUrl && (
                      <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                        <img src={item.imageUrl} alt={item.foodName} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between">
                        <h3 className="font-semibold text-gray-900 truncate">{item.foodName}</h3>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-gray-300 hover:text-red-500 transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                        <span>{Math.round(item.calories)} kcal</span>
                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                        <span>{Math.round(item.protein)}g Protein</span>
                      </div>
                      <p className="text-[10px] text-gray-400 mt-1">
                        {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl p-6 text-center">
                  <p className="text-sm text-gray-400">No {type.toLowerCase()} logged yet.</p>
                </div>
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default MealLog;
