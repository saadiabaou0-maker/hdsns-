import React from 'react';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onOpenAudit: () => void;
  onExploreBlueprints: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenAudit, onExploreBlueprints }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-12 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Text Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs font-medium text-emerald-400">
              <span>Morocco & MENA Hustle OS</span>
              <span aria-hidden="true">·</span>
              <span>100% Practical & Real Numbers</span>
              <span aria-hidden="true">·</span>
              <span>0% Scam Fluff</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight max-w-2xl text-balance">
              دخول الفلوس بطريقة واقعية :{' '}
              <span className="text-emerald-400">مشاريع حقيقية</span> وخطط عمل خطوة بخطوة
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed">
              بغات تبدا من 0 درهم ولا عندك راس مال صغير؟ جمعنا ليك نماذج عمل مجربة فالمغرب
              (E-commerce COD، المونتاج، إدارة صفحات المحلات المحلية، صناعة المحتوى)،
              مع حاسبة الأرباح، نماذج رسائل الكليان، ومستشار ذكاء اصطناعي واعر.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenAudit}
                className="px-5 py-3 text-sm font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors flex items-center gap-2 shadow-sm cursor-pointer whitespace-nowrap shrink-0"
              >
                <Sparkles className="w-4 h-4" />
                <span>دير الـ Audit ولقا الخطة المناسبة ليك</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreBlueprints}
                className="px-5 py-3 text-sm font-medium text-slate-200 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                اكتشف 8 خطط عمل واجدة
              </button>
            </div>

            {/* Quick Proof Points */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800/80">
              <div>
                <p className="text-2xl font-bold text-white font-mono tabular-nums">0 - 800 DH</p>
                <p className="text-xs text-slate-400 mt-0.5">رأس المال الأدنى للبدء</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-emerald-400 font-mono tabular-nums">14 - 30 Jours</p>
                <p className="text-xs text-slate-400 mt-0.5">المدة لأول دخل حقيقي</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white font-mono tabular-nums">100% Maroc</p>
                <p className="text-xs text-slate-400 mt-0.5">شركات توصيل وأبناك محلية</p>
              </div>
            </div>
          </div>

          {/* Visual Showcase */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900 group">
              <img
                src="/src/assets/images/hero_entrepreneur_workspace_1791806698276.jpg"
                alt="Entrepreneur Workspace in Morocco"
                className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-102 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-800 text-xs text-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>خطط مدروسة بالدرهم المغربي (MAD) والواقع المحلي</span>
                </div>
                <span className="font-mono text-emerald-400 font-semibold tabular-nums">v2026.1</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
