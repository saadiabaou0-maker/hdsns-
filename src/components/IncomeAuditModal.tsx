import React, { useState } from 'react';
import { X, Check, ArrowRight, ArrowLeft, Sparkles, AlertCircle } from 'lucide-react';
import { BLUEPRINTS } from '../data/blueprints';
import { Blueprint } from '../types';

interface IncomeAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectBlueprint: (blueprint: Blueprint) => void;
}

export const IncomeAuditModal: React.FC<IncomeAuditModalProps> = ({
  isOpen,
  onClose,
  onSelectBlueprint,
}) => {
  const [step, setStep] = useState(1);
  const [time, setTime] = useState<'1-2h' | '3-4h' | 'full-time'>('3-4h');
  const [capital, setCapital] = useState<number>(0);
  const [device, setDevice] = useState<'smartphone-only' | 'laptop-available'>('smartphone-only');
  const [interest, setInterest] = useState<'sales-social' | 'video-design' | 'writing-languages' | 'tech-nocode' | 'sourcing-trading'>('sales-social');
  const [targetIncome, setTargetIncome] = useState<number>(5000);
  const [recommended, setRecommended] = useState<Blueprint | null>(null);

  if (!isOpen) return null;

  const handleCalculate = () => {
    // Intelligent heuristic matching
    let bestMatch = BLUEPRINTS[1]; // default SMMA

    if (capital >= 800 && (interest === 'sourcing-trading' || targetIncome >= 10000)) {
      bestMatch = BLUEPRINTS[0]; // E-Commerce COD
    } else if (interest === 'video-design') {
      bestMatch = BLUEPRINTS[2]; // Video Editor CapCut
    } else if (interest === 'tech-nocode' && device === 'laptop-available') {
      bestMatch = BLUEPRINTS[4]; // No-code web creation
    } else if (interest === 'sourcing-trading' && capital < 800) {
      bestMatch = BLUEPRINTS[5]; // Frippe / Thrifting
    } else if (interest === 'writing-languages') {
      bestMatch = BLUEPRINTS[6]; // Translation
    } else if (device === 'smartphone-only' && capital === 0) {
      bestMatch = BLUEPRINTS[1]; // SMMA local
    }

    setRecommended(bestMatch);
    setStep(6); // result step
  };

  const handleReset = () => {
    setStep(1);
    setRecommended(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#111827] border border-slate-800 rounded-2xl w-full max-w-xl p-6 relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Moroccan Hustle Audit</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums">Étape {step} / 5</span>
          </div>
          <h2 className="text-xl font-bold text-white">
            {step === 6 ? 'الخطة المقترحة خصيصاً ليك' : 'تشخيص وضعيتك لاختيار أحسن طريقة لدخول الفلوس'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            جاوب بصراحة باش نقترحو عليك المجال اللي يناسب وقتك وراس مالك الحالي.
          </p>
        </div>

        {/* Step 1: Capital */}
        {step === 1 && (
          <div className="space-y-4">
            <label className="text-sm font-semibold text-slate-200 block">
              1. شحال ديال رأس المال باغي تبدا بيه دابا ؟ (Budget)
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { val: 0, label: '0 درهم (Zero Dh)', desc: 'باغي نبدأ غير بمهارتي والوقت' },
                { val: 300, label: '100 - 500 درهم', desc: 'ميزانية صغيرة لتجارب أولية' },
                { val: 1200, label: '800 - 2,000 درهم', desc: 'قادر نشري عينات سلعة أو نطلق إعلانات' },
                { val: 5000, label: '3,000+ درهم', desc: 'مستعد للاستثمار وتكبير البيزنس' },
              ].map((opt) => (
                <button
                  key={opt.val}
                  type="button"
                  onClick={() => setCapital(opt.val)}
                  className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                    capital === opt.val
                      ? 'border-emerald-500 bg-emerald-500/10 text-white'
                      : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <p className="font-bold text-sm text-white font-mono tabular-nums">{opt.label}</p>
                  <p className="text-xs text-slate-400 mt-1">{opt.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Time */}
        {step === 2 && (
          <div className="space-y-4">
            <label className="text-sm font-semibold text-slate-200 block">
              2. شحال عندك ديال الوقت فاليوم ؟ (Disponibilité)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { val: '1-2h', label: '1 - 2 ساعات', desc: 'عندي قراية أو خدمة ثانية' },
                { val: '3-4h', label: '3 - 4 ساعات', desc: 'وقت كافي للتركيز اليومي' },
                { val: 'full-time', label: 'وقت كامل (Full-time)', desc: 'متفرغ 100% للبيزنس' },
              ].map((opt) => (
                <button
                  key={opt.val}
                  type="button"
                  onClick={() => setTime(opt.val as any)}
                  className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                    time === opt.val
                      ? 'border-emerald-500 bg-emerald-500/10 text-white'
                      : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <p className="font-bold text-sm text-white">{opt.label}</p>
                  <p className="text-xs text-slate-400 mt-1">{opt.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Device */}
        {step === 3 && (
          <div className="space-y-4">
            <label className="text-sm font-semibold text-slate-200 block">
              3. أشنو هي الأجهزة المتوفرة عندك دابا ؟ (Matériel)
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { val: 'smartphone-only', label: 'غير التيليفون (Smartphone فقط)', desc: 'Android أو iPhone عادي' },
                { val: 'laptop-available', label: 'عندي بيسي / حاسوب (PC Portable)', desc: 'متوفر حاسوب للعمل والبرامج' },
              ].map((opt) => (
                <button
                  key={opt.val}
                  type="button"
                  onClick={() => setDevice(opt.val as any)}
                  className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                    device === opt.val
                      ? 'border-emerald-500 bg-emerald-500/10 text-white'
                      : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <p className="font-bold text-sm text-white">{opt.label}</p>
                  <p className="text-xs text-slate-400 mt-1">{opt.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Skills / Interests */}
        {step === 4 && (
          <div className="space-y-4">
            <label className="text-sm font-semibold text-slate-200 block">
              4. فاش كتحس براسك مرتاح كثر ؟ (Centre d'intérêt)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                { val: 'sales-social', label: 'التواصل وريلز والمحلات', desc: 'كنعرف نهضر مع الناس وكنفهم فـ Instagram' },
                { val: 'video-design', label: 'المونتاج والتصميم (CapCut / Canva)', desc: 'كنبغي نزوق الفيديوهات والصور' },
                { val: 'tech-nocode', label: 'المتاجر الإلكترونية والتكنولوجيا', desc: 'متاجر YouCan، إعدادات، أنظمة' },
                { val: 'sourcing-trading', label: 'السلعة والبيع والشرا (التجارة)', desc: 'شراء السلعة، الجوطية، التجارة الحقيقية' },
                { val: 'writing-languages', label: 'اللغات والترجمة والكتابة', desc: 'متمكن من الدارجة، الفرنسية أو الإنجليزية' },
              ].map((opt) => (
                <button
                  key={opt.val}
                  type="button"
                  onClick={() => setInterest(opt.val as any)}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                    interest === opt.val
                      ? 'border-emerald-500 bg-emerald-500/10 text-white'
                      : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <p className="font-semibold text-sm text-white">{opt.label}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{opt.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 5: Income Target */}
        {step === 5 && (
          <div className="space-y-4">
            <label className="text-sm font-semibold text-slate-200 block">
              5. شحال الهدف ديال الدخل الشهري اللي باغي توصل ليه ؟
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { val: 3000, label: '3,000 DH / شهر', desc: 'بداية ممتازة لتغطية المصاريف' },
                { val: 6000, label: '6,000 DH / شهر', desc: 'دخل محترم يوازي صالير موظف' },
                { val: 12000, label: '12,000 DH / شهر', desc: 'الوصول لمرحلة التفرغ التام' },
                { val: 25000, label: '25,000+ DH / شهر', desc: 'بناء شركة ووكالة متكاملة' },
              ].map((opt) => (
                <button
                  key={opt.val}
                  type="button"
                  onClick={() => setTargetIncome(opt.val)}
                  className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                    targetIncome === opt.val
                      ? 'border-emerald-500 bg-emerald-500/10 text-white'
                      : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <p className="font-bold text-sm text-white font-mono tabular-nums">{opt.label}</p>
                  <p className="text-xs text-slate-400 mt-1">{opt.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 6: Recommendation Result */}
        {step === 6 && recommended && (
          <div className="space-y-5">
            <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30">
              <span className="text-xs font-semibold text-emerald-400">النموذج الأنسب بنسبة 95% :</span>
              <h3 className="text-lg font-bold text-white mt-1">{recommended.title}</h3>
              <p className="text-sm text-emerald-300 mt-0.5 font-medium">{recommended.titleDarija}</p>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">{recommended.summaryDarija}</p>
            </div>

            <div className="grid grid-cols-3 gap-2.5 text-center text-xs">
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <p className="text-slate-400">رأس المال الأدنى</p>
                <p className="text-white font-bold font-mono tabular-nums mt-0.5">
                  {recommended.minCapital === 0 ? '0 درهم' : `${recommended.minCapital} DH`}
                </p>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <p className="text-slate-400">المدخول المتوقع</p>
                <p className="text-emerald-400 font-bold font-mono tabular-nums mt-0.5">
                  {recommended.potentialMonthlyIncomeMAD}
                </p>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <p className="text-slate-400">الجهاز المطلوب</p>
                <p className="text-white font-bold mt-0.5">
                  {recommended.deviceRequired === 'smartphone'
                    ? 'هاتف فقط'
                    : recommended.deviceRequired === 'laptop'
                    ? 'حاسوب'
                    : 'هاتف أو حاسوب'}
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <p className="text-xs font-bold text-slate-200">الخطوة الأولى للأسبوع الأول (Action immédiate) :</p>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">{recommended.firstWeekAction}</p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => {
                  onSelectBlueprint(recommended);
                  onClose();
                }}
                className="flex-1 py-2.5 px-4 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>فتح تفاصيل الخطة خطوة بخطوة</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={handleReset}
                className="py-2.5 px-3 text-xs text-slate-400 hover:text-white border border-slate-800 rounded-lg transition-colors cursor-pointer"
              >
                إعادة التشخيص
              </button>
            </div>
          </div>
        )}

        {/* Modal Footer Navigation */}
        {step < 6 && (
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-800">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-3.5 py-2 text-xs font-medium text-slate-400 hover:text-white flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>رجوع</span>
              </button>
            ) : (
              <div />
            )}

            {step < 5 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="px-4 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>التالي</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleCalculate}
                className="px-5 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>إظهار الخطة المناسبة</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
