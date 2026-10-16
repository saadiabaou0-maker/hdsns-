import React, { useState } from 'react';
import { SnackProvider } from './context/SnackContext';
import { SnackClientView } from './components/snack/SnackClientView';
import { SnackAdminView } from './components/snack/SnackAdminView';
import { ConversationalPartner } from './components/ConversationalPartner';
import { CalculatorsView } from './components/CalculatorsView';
import { PitchGeneratorView } from './components/PitchGeneratorView';
import { BlueprintsView } from './components/BlueprintsView';
import { HustleTrackerView } from './components/HustleTrackerView';
import { MessageSquare, ArrowLeft } from 'lucide-react';
import { Blueprint } from './types';

export default function App() {
  // 'client': Real customer snack website (100% clean, no admin buttons visible to customers)
  // 'admin': Owner admin panel (accessed only after entering hamid123321)
  // 'chat': Floussi AI partner conversation
  const [activeView, setActiveView] = useState<'client' | 'admin' | 'chat' | 'calculators' | 'pitches'>('client');
  const [selectedBlueprintModal, setSelectedBlueprintModal] = useState<Blueprint | null>(null);

  return (
    <SnackProvider>
      <div className="min-h-screen bg-[#0B0F17] text-slate-100 flex flex-col selection:bg-amber-400 selection:text-slate-950">
        <main className="flex-1">
          {/* View 1: 100% Clean Client Website. No client will ever notice the stealth button in the footer! */}
          {activeView === 'client' && (
            <SnackClientView onOpenAdmin={() => setActiveView('admin')} />
          )}

          {/* View 2: Secret Admin Panel (Unlocked only with code: hamid123321) */}
          {activeView === 'admin' && (
            <div className="space-y-4">
              <div className="bg-[#151D2C] border-b border-slate-800 px-4 py-2 flex items-center justify-between text-xs text-slate-400">
                <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                  ✓ تم تسجيل الدخول بنجاح بالكود السري hamid123321
                </span>
                <button
                  onClick={() => setActiveView('chat')}
                  className="text-sky-400 hover:text-sky-300 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>الرجوع لمحادثة المستشار Floussi</span>
                </button>
              </div>
              <SnackAdminView onSwitchToClient={() => setActiveView('client')} />
            </div>
          )}

          {/* View 3: Conversational Partner Chat */}
          {activeView === 'chat' && (
            <div className="py-4 space-y-4">
              <div className="max-w-5xl mx-auto px-4">
                <button
                  onClick={() => setActiveView('client')}
                  className="text-xs text-amber-400 hover:underline cursor-pointer flex items-center gap-1 font-bold"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>رجوع لموقع السناك (Client View)</span>
                </button>
              </div>
              <ConversationalPartner
                onOpenCalculators={() => setActiveView('calculators')}
                onOpenPitches={() => setActiveView('pitches')}
                onOpenBlueprints={() => setActiveView('client')}
              />
            </div>
          )}

          {/* View 4: Calculators */}
          {activeView === 'calculators' && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
              <button
                onClick={() => setActiveView('client')}
                className="text-xs text-amber-400 hover:underline cursor-pointer flex items-center gap-1"
              >
                ← رجوع لموقع السناك
              </button>
              <CalculatorsView />
            </div>
          )}

          {/* View 5: Pitches */}
          {activeView === 'pitches' && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
              <button
                onClick={() => setActiveView('client')}
                className="text-xs text-amber-400 hover:underline cursor-pointer flex items-center gap-1"
              >
                ← رجوع لموقع السناك
              </button>
              <PitchGeneratorView />
            </div>
          )}
        </main>
      </div>
    </SnackProvider>
  );
}
