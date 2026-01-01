
import React, { useState, useEffect, useCallback } from 'react';
import { FoodItem, UserProfile, AppTab, MealType } from './types';
import { INITIAL_PROFILE } from './constants';
import { analyzeFoodImage, FoodAnalysisResult } from './services/geminiService';
import Dashboard from './components/Dashboard';
import MealLog from './components/MealLog';
import Profile from './components/Profile';
import CameraView from './components/CameraView';
import AnalysisResult from './components/AnalysisResult';
import ApiKeyGuard from './components/ApiKeyGuard';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>('dashboard');
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('nutrilens_profile');
    return saved ? JSON.parse(saved) : INITIAL_PROFILE;
  });
  
  const [items, setItems] = useState<FoodItem[]>(() => {
    const saved = localStorage.getItem('nutrilens_logs');
    if (!saved) return [];
    const allItems: FoodItem[] = JSON.parse(saved);
    // Only show today's items
    const today = new Date().toISOString().split('T')[0];
    return allItems.filter(item => new Date(item.timestamp).toISOString().split('T')[0] === today);
  });

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<FoodAnalysisResult | null>(null);
  const [lastCapturedImage, setLastCapturedImage] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('nutrilens_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    // Keep full history but state only has today
    const saved = localStorage.getItem('nutrilens_logs');
    const existing: FoodItem[] = saved ? JSON.parse(saved) : [];
    const otherDays = existing.filter(i => new Date(i.timestamp).toISOString().split('T')[0] !== new Date().toISOString().split('T')[0]);
    localStorage.setItem('nutrilens_logs', JSON.stringify([...otherDays, ...items]));
  }, [items]);

  const handleCapture = useCallback(async (image: string) => {
    setLastCapturedImage(image);
    setShowCamera(false);
    setIsAnalyzing(true);
    setError(null);
    
    try {
      const result = await analyzeFoodImage(image);
      setAnalysisResult(result);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to analyze image. Try again.");
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  const handleConfirmItem = useCallback((data: { name: string; mealType: MealType; nutrients: any }) => {
    const newItem: FoodItem = {
      id: Math.random().toString(36).substr(2, 9),
      name: data.name,
      nutrients: data.nutrients,
      mealType: data.mealType,
      timestamp: Date.now(),
      imageUrl: lastCapturedImage || undefined
    };
    setItems(prev => [newItem, ...prev]);
    setAnalysisResult(null);
    setLastCapturedImage(null);
    setActiveTab('log');
  }, [lastCapturedImage]);

  const handleRemoveItem = useCallback((id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
  }, []);

  return (
    <ApiKeyGuard>
      <div className="min-h-screen bg-slate-50 relative flex flex-col max-w-lg mx-auto shadow-xl ring-1 ring-gray-200 overflow-x-hidden">
        {/* Content Area */}
        <main className="flex-1 overflow-y-auto no-scrollbar">
          {activeTab === 'dashboard' && <Dashboard items={items} profile={profile} />}
          {activeTab === 'log' && <MealLog items={items} onRemoveItem={handleRemoveItem} />}
          {activeTab === 'profile' && <Profile profile={profile} onUpdate={setProfile} />}
        </main>

        {/* Global Loading Overlay */}
        {isAnalyzing && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-md z-[100] flex flex-col items-center justify-center p-6">
            <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-6"></div>
            <h2 className="text-white text-xl font-bold mb-2">Analyzing Food...</h2>
            <p className="text-white/70 text-center max-w-xs">
              Gemini is identifying your meal and estimating nutritional values.
            </p>
          </div>
        )}

        {/* Error Notification */}
        {error && (
          <div className="fixed top-6 inset-x-6 z-[110] bg-red-500 text-white p-4 rounded-2xl shadow-lg flex items-center justify-between animate-in slide-in-from-top">
            <span className="font-medium">{error}</span>
            <button onClick={() => setError(null)} className="p-1">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        {/* Modals */}
        {showCamera && <CameraView onCapture={handleCapture} onClose={() => setShowCamera(false)} />}
        {analysisResult && lastCapturedImage && (
          <AnalysisResult 
            result={analysisResult} 
            imageUrl={lastCapturedImage}
            onConfirm={handleConfirmItem}
            onCancel={() => {
              setAnalysisResult(null);
              setLastCapturedImage(null);
            }}
          />
        )}

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 max-w-lg mx-auto bg-white border-t border-gray-100 px-6 py-3 pb-8 z-40 flex justify-between items-center shadow-[0_-8px_30px_rgb(0,0,0,0.04)]">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'dashboard' ? 'text-emerald-500' : 'text-gray-300'}`}
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11 6a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1V6zM9 9a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H10a1 1 0 01-1-1V9zM13 14a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1h-2a1 1 0 01-1-1v-5z" />
            </svg>
            <span className="text-[10px] font-bold uppercase tracking-widest">Dash</span>
          </button>

          <button 
            onClick={() => setActiveTab('log')}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'log' ? 'text-emerald-500' : 'text-gray-300'}`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span className="text-[10px] font-bold uppercase tracking-widest">Log</span>
          </button>

          {/* Fab Button */}
          <button 
            onClick={() => setShowCamera(true)}
            className="w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-emerald-200 -mt-8 active:scale-95 transition-transform"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>

          <button 
            className="flex flex-col items-center gap-1 transition-colors text-gray-300 pointer-events-none opacity-50"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <span className="text-[10px] font-bold uppercase tracking-widest">Trends</span>
          </button>

          <button 
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'profile' ? 'text-emerald-500' : 'text-gray-300'}`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-[10px] font-bold uppercase tracking-widest">Me</span>
          </button>
        </nav>
      </div>
    </ApiKeyGuard>
  );
};

export default App;
