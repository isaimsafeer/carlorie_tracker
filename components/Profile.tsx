
import React from 'react';
import { UserProfile } from '../types';

interface ProfileProps {
  profile: UserProfile;
  onUpdate: (profile: UserProfile) => void;
}

const Profile: React.FC<ProfileProps> = ({ profile, onUpdate }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onUpdate({
      ...profile,
      [name]: isNaN(Number(value)) ? value : Number(value)
    });
  };

  return (
    <div className="pb-24 pt-6 px-4 space-y-6 max-w-2xl mx-auto">
      <header className="flex flex-col items-center mb-8">
        <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
          <span className="text-3xl">🧘‍♂️</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">{profile.name}</h1>
        <p className="text-gray-500">Setting goals for health</p>
      </header>

      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-6">
        <h2 className="text-lg font-bold text-gray-900 border-b pb-4">Personal Metrics</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-400 uppercase">Weight (kg)</label>
            <input 
              name="weight"
              type="number"
              value={profile.weight}
              onChange={handleChange}
              className="w-full bg-gray-50 border-none rounded-xl p-3 focus:ring-2 focus:ring-emerald-500 font-medium"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-400 uppercase">Height (cm)</label>
            <input 
              name="height"
              type="number"
              value={profile.height}
              onChange={handleChange}
              className="w-full bg-gray-50 border-none rounded-xl p-3 focus:ring-2 focus:ring-emerald-500 font-medium"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-400 uppercase">Age</label>
            <input 
              name="age"
              type="number"
              value={profile.age}
              onChange={handleChange}
              className="w-full bg-gray-50 border-none rounded-xl p-3 focus:ring-2 focus:ring-emerald-500 font-medium"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-400 uppercase">Gender</label>
            <select 
              name="gender"
              value={profile.gender}
              onChange={handleChange}
              className="w-full bg-gray-50 border-none rounded-xl p-3 focus:ring-2 focus:ring-emerald-500 font-medium"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-6">
        <h2 className="text-lg font-bold text-gray-900 border-b pb-4">Daily Goals</h2>
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-400 uppercase">Calorie Goal (kcal)</label>
            <input 
              name="goalCalories"
              type="number"
              value={profile.goalCalories}
              onChange={handleChange}
              className="w-full bg-gray-50 border-none rounded-xl p-3 focus:ring-2 focus:ring-emerald-500 font-medium"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-semibold text-gray-400 uppercase">Protein (g)</label>
              <input 
                name="goalProtein"
                type="number"
                value={profile.goalProtein}
                onChange={handleChange}
                className="w-full bg-gray-50 border-none rounded-xl p-3 focus:ring-2 focus:ring-emerald-500 font-medium"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-semibold text-gray-400 uppercase">Carbs (g)</label>
              <input 
                name="goalCarbs"
                type="number"
                value={profile.goalCarbs}
                onChange={handleChange}
                className="w-full bg-gray-50 border-none rounded-xl p-3 focus:ring-2 focus:ring-emerald-500 font-medium"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-semibold text-gray-400 uppercase">Fats (g)</label>
              <input 
                name="goalFats"
                type="number"
                value={profile.goalFats}
                onChange={handleChange}
                className="w-full bg-gray-50 border-none rounded-xl p-3 focus:ring-2 focus:ring-emerald-500 font-medium"
              />
            </div>
          </div>
        </div>
      </div>
      
      <button 
        onClick={() => alert('Profile updated!')}
        className="w-full bg-emerald-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-emerald-100 active:scale-95 transition-transform"
      >
        Save Profile
      </button>
    </div>
  );
};

export default Profile;
