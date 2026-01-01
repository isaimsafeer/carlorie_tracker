
import React, { useState } from 'react';
import { FoodAnalysisResult } from '../services/geminiService';
import { MealType } from '../types';
import { MEAL_TYPES } from '../constants';

interface AnalysisResultProps {
  result: FoodAnalysisResult;
  imageUrl: string;
  onConfirm: (item: { name: string; mealType: MealType; nutrients: any }) => void;
  onCancel: () => void;
}

const AnalysisResult: React.FC<AnalysisResultProps> = ({ result, imageUrl, onConfirm, onCancel }) => {
  const [mealType, setMealType] = useState<MealType>(MealType.LUNCH);
  const [name, setName] = useState(result.foodName);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-end sm:items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-t-[32px] sm:rounded-[32px] overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-500">
        <div className="relative h-48 bg-gray-100">
          <img src={imageUrl} alt="Captured food" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-4 left-6 right-6">
            <h2 className="text-white text-2xl font-bold">Analysis Complete</h2>
            <p className="text-white/80 text-sm italic">"Looks delicious!"</p>
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Item Name</label>
            <input 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full text-lg font-semibold bg-gray-50 border-none rounded-xl p-3 focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="grid grid-cols-4 gap-3">
             <div className="text-center p-2 bg-emerald-50 rounded-xl">
               <p className="text-[10px] text-emerald-600 font-bold uppercase">Cals</p>
               <p className="font-bold text-gray-900">{Math.round(result.nutrients.calories)}</p>
             </div>
             <div className="text-center p-2 bg-blue-50 rounded-xl">
               <p className="text-[10px] text-blue-600 font-bold uppercase">Prot</p>
               <p className="font-bold text-gray-900">{Math.round(result.nutrients.protein)}g</p>
             </div>
             <div className="text-center p-2 bg-amber-50 rounded-xl">
               <p className="text-[10px] text-amber-600 font-bold uppercase">Carbs</p>
               <p className="font-bold text-gray-900">{Math.round(result.nutrients.carbs)}g</p>
             </div>
             <div className="text-center p-2 bg-red-50 rounded-xl">
               <p className="text-[10px] text-red-600 font-bold uppercase">Fats</p>
               <p className="font-bold text-gray-900">{Math.round(result.nutrients.fats)}g</p>
             </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Meal Type</label>
            <div className="grid grid-cols-2 gap-2">
              {MEAL_TYPES.map((type) => (
                <button
                  key={type}
                  onClick={() => setMealType(type)}
                  className={`p-3 rounded-xl text-sm font-semibold transition-all border-2 ${
                    mealType === type 
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700' 
                      : 'border-gray-100 bg-white text-gray-500 hover:border-gray-200'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <p className="text-xs text-gray-400 text-center italic">
            {result.description}
          </p>

          <div className="flex gap-3 pt-2">
            <button 
              onClick={onCancel}
              className="flex-1 py-4 font-bold text-gray-400 hover:text-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={() => onConfirm({ name, mealType, nutrients: result.nutrients })}
              className="flex-[2] bg-emerald-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-emerald-100 hover:bg-emerald-700 active:scale-95 transition-all"
            >
              Add to Log
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResult;
