import React from 'react';
import { MessageSquare, TrendingUp, Sparkles, RefreshCw } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onNewChat: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onNewChat,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#0B0F17]/95 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => setActiveTab('chat')}
          className="flex items-center gap-2.5 text-left focus:outline-none group cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:border-emerald-400 transition-colors">
            <TrendingUp className="w-4 h-4" />
          </div>
          <span className="text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0">
            Floussi<span className="text-emerald-400 font-extrabold">.ai</span>
          </span>
        </button>

        {/* Zone 2: 4-5 clean single-line nav links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <button
            onClick={() => setActiveTab('chat')}
            className={`whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
              activeTab === 'chat'
                ? 'text-emerald-400 font-semibold'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            المحادثة المباشرة
          </button>
          <button
            onClick={() => setActiveTab('calculators')}
            className={`whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
              activeTab === 'calculators'
                ? 'text-emerald-400 font-semibold'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            حاسبة الأرباح COD
          </button>
          <button
            onClick={() => setActiveTab('pitches')}
            className={`whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
              activeTab === 'pitches'
                ? 'text-emerald-400 font-semibold'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            رسائل الكليان
          </button>
          <button
            onClick={() => setActiveTab('blueprints')}
            className={`whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
              activeTab === 'blueprints'
                ? 'text-emerald-400 font-semibold'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            دليل المشاريع
          </button>
          <button
            onClick={() => setActiveTab('tracker')}
            className={`whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
              activeTab === 'tracker'
                ? 'text-emerald-400 font-semibold'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            سجل المهام
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => {
              setActiveTab('chat');
              onNewChat();
            }}
            className="px-4 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-all shadow-sm flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>محادثة جديدة</span>
          </button>
        </div>
      </div>
    </header>
  );
};
