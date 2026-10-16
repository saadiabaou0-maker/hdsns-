import React from 'react';
import { TrendingUp } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  onOpenAudit: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onOpenAudit }) => {
  return (
    <footer className="mt-20 border-t border-slate-800/80 bg-[#0B0F17] py-12 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800/60">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <TrendingUp className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-sm text-white">
              Floussi<span className="text-emerald-400">.ai</span>
            </span>
            <span className="text-slate-500 mr-2">منصة مشاريع ودخول الفلوس بالمغرب</span>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-slate-300">
            <button
              onClick={() => setActiveTab('blueprints')}
              className="hover:text-emerald-400 transition-colors cursor-pointer"
            >
              نماذج المشاريع
            </button>
            <button
              onClick={() => setActiveTab('calculators')}
              className="hover:text-emerald-400 transition-colors cursor-pointer"
            >
              حاسبات الأرباح COD
            </button>
            <button
              onClick={() => setActiveTab('pitches')}
              className="hover:text-emerald-400 transition-colors cursor-pointer"
            >
              رسائل الكليان
            </button>
            <button
              onClick={() => setActiveTab('copilot')}
              className="hover:text-emerald-400 transition-colors cursor-pointer"
            >
              مستشار الذكاء الاصطناعي
            </button>
            <button
              onClick={onOpenAudit}
              className="hover:text-emerald-400 transition-colors cursor-pointer font-semibold text-emerald-400"
            >
              تشخيص مجاني
            </button>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <p>© 2026 Floussi AI. صمم لدعم الشباب المقاولين وحرية العمل المالي بالمغرب.</p>
          <div className="flex items-center gap-4">
            <span>درهم مغربي (MAD)</span>
            <span aria-hidden="true">·</span>
            <span>واقعي 100% بدون خرافات</span>
            <span aria-hidden="true">·</span>
            <span>Maroc / MENA</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
