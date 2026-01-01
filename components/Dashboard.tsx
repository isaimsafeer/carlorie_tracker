
import React, { useMemo } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { MealEntry, UserProfile } from '../types';

interface DashboardProps {
  items: MealEntry[];
  profile: UserProfile;
}

const Dashboard: React.FC<DashboardProps> = ({ items, profile }) => {
  const totals = useMemo(() => {
    return items.reduce((acc, item) => ({
      calories: acc.calories + item.calories,
      protein: acc.protein + item.protein,
      carbs: acc.carbs + item.carbs,
      fats: acc.fats + item.fats,
    }), { calories: 0, protein: 0, carbs: 0, fats: 0 });
  }, [items]);

  const caloriePercentage = Math.min(Math.round((totals.calories / profile.settings.dailyCalorieGoal) * 100), 100);

  const macroData = [
    { name: 'Protein', value: totals.protein, goal: profile.settings.proteinGoal, color: '#10b981' },
    { name: 'Carbs', value: totals.carbs, goal: profile.settings.carbsGoal, color: '#3b82f6' },
    { name: 'Fats', value: totals.fats, goal: profile.settings.fatsGoal, color: '#f59e0b' },
  ];

  const pieData = macroData.map(m => ({
    name: m.name,
    value: m.value * 4, // Approx calories from grams
  }));

  return (
    <div className="pb-24 pt-6 px-4 space-y-6 max-w-2xl mx-auto">
      <header className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Today's Summary</h1>
          <p className="text-gray-500">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
        </div>
      </header>

      {/* Calorie Ring Card */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-gray-500 font-medium">Calories</p>
          <p className="text-3xl font-bold text-gray-900">{Math.round(totals.calories)}</p>
          <p className="text-sm text-gray-400">of {profile.settings.dailyCalorieGoal} kcal</p>
        </div>
        <div className="relative w-24 h-24">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-gray-100"
              strokeDasharray="100, 100"
              stroke="currentColor"
              strokeWidth="3.5"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="text-emerald-500"
              strokeDasharray={`${caloriePercentage}, 100`}
              stroke="currentColor"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center font-bold text-gray-800">
            {caloriePercentage}%
          </div>
        </div>
      </div>

      {/* Macros Grid */}
      <div className="grid grid-cols-3 gap-4">
        {macroData.map((macro) => (
          <div key={macro.name} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{macro.name}</p>
            <p className="text-lg font-bold text-gray-900 mt-1">{Math.round(macro.value)}g</p>
            <div className="mt-2 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min((macro.value / macro.goal) * 100, 100)}%`, backgroundColor: macro.color }}
              ></div>
            </div>
            <p className="text-[10px] text-gray-400 mt-1">Goal: {macro.goal}g</p>
          </div>
        ))}
      </div>

      {/* Chart Card */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Macro Distribution</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={macroData}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip
                cursor={{ fill: '#f9fafb' }}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {macroData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Visual Breakdown */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Caloric Contribution</h3>
        <div className="h-48 w-full flex items-center justify-center">
          {totals.calories > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={macroData[index].color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-gray-400 text-sm">Log some food to see the breakdown</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
