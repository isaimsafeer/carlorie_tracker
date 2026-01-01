
import React, { useState, useEffect } from 'react';

interface ApiKeyGuardProps {
  children: React.ReactNode;
}

const ApiKeyGuard: React.FC<ApiKeyGuardProps> = ({ children }) => {
  const [hasKey, setHasKey] = useState<boolean | null>(null);

  useEffect(() => {
    const checkKey = () => {
        // Check both possible env var names mapped in vite.config.ts
        const key = process.env.API_KEY || process.env.GEMINI_API_KEY;
        setHasKey(!!key && key.length > 0);
    };
    checkKey();
  }, []);

  if (hasKey === null) return null;

  if (!hasKey) {
    return (
      <div className="fixed inset-0 bg-white z-[100] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
          <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Setup NutriLens AI</h1>
        <p className="text-gray-600 mb-4 max-w-sm">
          To use the food analysis features, you need to set your Gemini API key.
        </p>
        
        <div className="bg-slate-100 p-4 rounded-lg text-left text-sm font-mono text-slate-700 mb-6 w-full max-w-md overflow-x-auto">
            <div className="font-bold mb-2 text-slate-500 uppercase text-xs">Instructions</div>
            1. Create a file named <span className="text-emerald-600">.env.local</span> in the project root.<br/>
            2. Add your key:<br/>
            <span className="text-emerald-600">GEMINI_API_KEY=your_api_key_here</span><br/>
            3. Restart the dev server.
        </div>

        <a 
          href="https://ai.google.dev/gemini-api/docs/billing" 
          target="_blank" 
          rel="noopener noreferrer"
          className="mt-2 text-sm text-emerald-600 hover:underline"
        >
          Get an API Key
        </a>
      </div>
    );
  }

  return <>{children}</>;
};

export default ApiKeyGuard;
