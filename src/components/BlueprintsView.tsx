import React, { useState } from 'react';
import { Blueprint } from '../types';
import { BLUEPRINTS } from '../data/blueprints';
import { ArrowUpRight, CheckCircle2, AlertTriangle, Building2, Smartphone, Laptop, Sparkles, X } from 'lucide-react';

interface BlueprintsViewProps {
  onSelectPitchForBlueprint: (blueprint: Blueprint) => void;
  onAskCopilotForBlueprint: (blueprint: Blueprint) => void;
  selectedBlueprintModal: Blueprint | null;
  setSelectedBlueprintModal: (bp: Blueprint | null) => void;
}

export const BlueprintsView: React.FC<BlueprintsViewProps> = ({
  onSelectPitchForBlueprint,
  onAskCopilotForBlueprint,
  selectedBlueprintModal,
  setSelectedBlueprintModal,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [capitalFilter, setCapitalFilter] = useState<'all' | 'zero' | 'low'>('all');

  const filteredBlueprints = BLUEPRINTS.filter((bp) => {
    if (activeCategory !== 'all' && bp.category !== activeCategory) {
      return false;
    }
    if (capitalFilter === 'zero' && bp.minCapital > 0) {
      return false;
    }
    if (capitalFilter === 'low' && bp.minCapital > 500) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Category and Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            دليل المشاريع وخطط الدخل الواقعية بالمغرب
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            نماذج حقيقية مجربة بدون خرافات الربح السريع: خطوات عملية بالدرهم المغربي.
          </p>
        </div>

        {/* Segmented Filter Buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-lg self-start sm:self-auto overflow-x-auto max-w-full">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            الكل ({BLUEPRINTS.length})
          </button>
          <button
            onClick={() => setActiveCategory('ecommerce')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeCategory === 'ecommerce'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            E-Commerce COD
          </button>
          <button
            onClick={() => setActiveCategory('agency')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeCategory === 'agency'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            وكالة وخدمات (SMMA)
          </button>
          <button
            onClick={() => setActiveCategory('freelance')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeCategory === 'freelance'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            عمل حر (Freelance)
          </button>
          <button
            onClick={() => setActiveCategory('local')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeCategory === 'local'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            تجارة محلية / فريپ
          </button>
        </div>
      </div>

      {/* Capital quick filters */}
      <div className="flex items-center gap-2 text-xs">
        <span className="text-slate-400">تصفية حسب رأس المال :</span>
        <button
          onClick={() => setCapitalFilter('all')}
          className={`px-2.5 py-1 rounded-md border cursor-pointer transition-colors ${
            capitalFilter === 'all'
              ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400 font-semibold'
              : 'border-slate-800 text-slate-400 hover:border-slate-700'
          }`}
        >
          كل الميزانيات
        </button>
        <button
          onClick={() => setCapitalFilter('zero')}
          className={`px-2.5 py-1 rounded-md border cursor-pointer transition-colors ${
            capitalFilter === 'zero'
              ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400 font-semibold'
              : 'border-slate-800 text-slate-400 hover:border-slate-700'
          }`}
        >
          0 درهم فقط (بدون رأس مال)
        </button>
        <button
          onClick={() => setCapitalFilter('low')}
          className={`px-2.5 py-1 rounded-md border cursor-pointer transition-colors ${
            capitalFilter === 'low'
              ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400 font-semibold'
              : 'border-slate-800 text-slate-400 hover:border-slate-700'
          }`}
        >
          أقل من 500 درهم
        </button>
      </div>

      {/* Blueprints Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBlueprints.map((bp) => (
          <div
            key={bp.id}
            className="rounded-xl border border-slate-800 bg-[#111827] flex flex-col justify-between hover:border-slate-700 transition-all group overflow-hidden"
          >
            {/* Image (if available) or styled banner */}
            {bp.image ? (
              <div className="h-44 w-full relative overflow-hidden bg-slate-900 border-b border-slate-800">
                <img
                  src={bp.image}
                  alt={bp.title}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent" />
                <div className="absolute top-3 left-3 bg-[#111827]/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-slate-700/60 text-xs font-mono tabular-nums text-emerald-400 font-semibold">
                  {bp.minCapital === 0 ? '0 DH Capital' : `Min: ${bp.minCapital} DH`}
                </div>
              </div>
            ) : (
              <div className="h-20 w-full bg-slate-900/50 border-b border-slate-800/80 px-5 flex items-center justify-between">
                <span className="text-xs font-mono text-emerald-400 font-semibold">
                  {bp.minCapital === 0 ? '0 DH Capital' : `Min: ${bp.minCapital} DH`}
                </span>
                <span className="text-xs text-slate-400 capitalize">{bp.category}</span>
              </div>
            )}

            {/* Card Content */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                {/* Clean unboxed metadata with separators */}
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                  <span className="capitalize">{bp.difficulty}</span>
                  <span aria-hidden="true">·</span>
                  <span>{bp.timeRequired}</span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1">
                    {bp.deviceRequired === 'smartphone' ? (
                      <Smartphone className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <Laptop className="w-3 h-3 text-sky-400" />
                    )}
                    {bp.deviceRequired === 'smartphone' ? 'هاتف' : 'حاسوب / هاتف'}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors leading-snug">
                  {bp.title}
                </h3>
                <p className="text-xs text-emerald-300/90 font-medium mt-0.5">
                  {bp.titleDarija}
                </p>

                <p className="text-xs text-slate-300 mt-2.5 line-clamp-3 leading-relaxed">
                  {bp.summaryDarija}
                </p>
              </div>

              {/* Bottom metric & Action */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider">المدخول الشهري التقديري</p>
                  <p className="text-xs font-bold text-emerald-400 font-mono tabular-nums">
                    {bp.potentialMonthlyIncomeMAD}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedBlueprintModal(bp)}
                  className="px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-md transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>التفاصيل</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Blueprint Detail Modal */}
      {selectedBlueprintModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#111827] border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 relative shadow-2xl">
            <button
              onClick={() => setSelectedBlueprintModal(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="space-y-2 mb-6 pr-8">
              <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
                <span className="capitalize">{selectedBlueprintModal.category}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono tabular-nums">
                  رأس المال: {selectedBlueprintModal.minCapital === 0 ? '0 DH' : `${selectedBlueprintModal.minCapital} DH`}
                </span>
                <span aria-hidden="true">·</span>
                <span>المستوى: {selectedBlueprintModal.difficulty}</span>
              </div>
              <h2 className="text-xl font-bold text-white">{selectedBlueprintModal.title}</h2>
              <p className="text-sm text-emerald-400 font-semibold">{selectedBlueprintModal.titleDarija}</p>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-3 p-3.5 rounded-xl bg-slate-900 border border-slate-800 mb-6 text-xs text-center">
              <div>
                <p className="text-slate-400">الوقت المطلوب</p>
                <p className="text-white font-bold mt-0.5">{selectedBlueprintModal.timeRequired}</p>
              </div>
              <div>
                <p className="text-slate-400">الربح الشهري المقدر</p>
                <p className="text-emerald-400 font-bold font-mono tabular-nums mt-0.5">
                  {selectedBlueprintModal.potentialMonthlyIncomeMAD}
                </p>
              </div>
              <div>
                <p className="text-slate-400">الجهاز المناسب</p>
                <p className="text-white font-bold mt-0.5 capitalize">
                  {selectedBlueprintModal.deviceRequired}
                </p>
              </div>
            </div>

            {/* Key Action Steps */}
            <div className="space-y-4 mb-6">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>خطوات التنفيذ خطوة بخطوة (Roadmap) :</span>
              </h3>
              <div className="space-y-3">
                {selectedBlueprintModal.keySteps.map((step, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                    <p className="text-xs font-bold text-emerald-300 font-mono">{step.title}</p>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Moroccan Partners and Tools */}
            <div className="mb-6">
              <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-2">
                <Building2 className="w-4 h-4 text-sky-400" />
                <span>أدوات وشركاء مغاربة موصى بهم :</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedBlueprintModal.moroccanToolsAndPartners.map((tool, i) => (
                  <span
                    key={i}
                    className="text-xs text-slate-300 bg-slate-900 border border-slate-800 rounded-md px-2.5 py-1"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Immediate Action Protocol */}
            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 mb-6">
              <p className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                <span>خطة الأسبوع الأول (شنو تدير اليوم وغدا) :</span>
              </p>
              <p className="text-xs text-slate-200 mt-1.5 leading-relaxed font-medium">
                {selectedBlueprintModal.firstWeekAction}
              </p>
            </div>

            {/* Common Mistakes */}
            <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/20 mb-6">
              <p className="text-xs font-bold text-red-400 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" />
                <span>أخطاء شائعة يتفاداها المبتدئون :</span>
              </p>
              <ul className="text-xs text-slate-300 mt-2 space-y-1 list-disc list-inside">
                {selectedBlueprintModal.commonMistakes.map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-800">
              <button
                onClick={() => {
                  onSelectPitchForBlueprint(selectedBlueprintModal);
                  setSelectedBlueprintModal(null);
                }}
                className="flex-1 py-2.5 px-4 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>نسخ نماذج رسائل الكليان لهذا المشروع</span>
              </button>

              <button
                onClick={() => {
                  onAskCopilotForBlueprint(selectedBlueprintModal);
                  setSelectedBlueprintModal(null);
                }}
                className="py-2.5 px-4 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>سول الذكاء الاصطناعي على هاد الفكرة</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
