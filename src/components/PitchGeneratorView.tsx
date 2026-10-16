import React, { useState } from 'react';
import { PITCH_PRESETS, PitchPreset } from '../data/pitchPresets';
import { Send, Copy, Check, Sparkles, MessageSquare, RefreshCw } from 'lucide-react';

export const PitchGeneratorView: React.FC = () => {
  const [selectedPreset, setSelectedPreset] = useState<PitchPreset>(PITCH_PRESETS[0]);
  const [languageMode, setLanguageMode] = useState<'darija' | 'french'>('darija');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Custom AI Generator State
  const [customService, setCustomService] = useState('');
  const [customClient, setCustomClient] = useState('');
  const [customLanguage, setCustomLanguage] = useState('Moroccan Darija');
  const [customChannel, setCustomChannel] = useState('Instagram DM');
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiPitchResult, setAiPitchResult] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleGenerateCustomPitch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customService || !customClient) return;

    setIsGenerating(true);
    setAiPitchResult(null);

    try {
      const response = await fetch('/api/ai/pitch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceType: customService,
          targetClient: customClient,
          language: customLanguage,
          channel: customChannel,
        }),
      });

      const data = await response.json();
      if (data.pitch) {
        setAiPitchResult(data.pitch);
      } else {
        setAiPitchResult('Erreur de génération. Veuillez réessayer.');
      }
    } catch (err) {
      console.error(err);
      setAiPitchResult('Erreur de connexion. Veuillez réessayer.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-emerald-400" />
            <span>نماذج رسائل إغلاق الصفقات (Cold DMs & Pitches)</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            رسائل احترافية بالدارجة المغربية والفرنسية بدون سبام، مصممة تجيب ليك موعد أو كليان حقيقي.
          </p>
        </div>

        {/* Language selector */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg">
          <button
            onClick={() => setLanguageMode('darija')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
              languageMode === 'darija'
                ? 'bg-slate-800 text-emerald-400 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            بالدارجة المغربية
          </button>
          <button
            onClick={() => setLanguageMode('french')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
              languageMode === 'french'
                ? 'bg-slate-800 text-white font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            En Français
          </button>
        </div>
      </div>

      {/* Preset Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {PITCH_PRESETS.map((preset) => (
          <button
            key={preset.id}
            onClick={() => setSelectedPreset(preset)}
            className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
              selectedPreset.id === preset.id
                ? 'border-emerald-500 bg-emerald-500/10 text-white'
                : 'border-slate-800 bg-[#111827] text-slate-400 hover:border-slate-700'
            }`}
          >
            <p className="text-xs font-bold text-white line-clamp-1">{preset.niche}</p>
            <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">{preset.channel}</p>
          </button>
        ))}
      </div>

      {/* Preset Content Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 bg-[#111827] border border-slate-800 rounded-xl p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <span className="text-xs font-semibold text-emerald-400">{selectedPreset.channel}</span>
              <h3 className="text-base font-bold text-white mt-0.5">{selectedPreset.niche}</h3>
              <p className="text-xs text-slate-400">{selectedPreset.service}</p>
            </div>
          </div>

          {/* Full Message Preview */}
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 relative group">
              <button
                onClick={() =>
                  copyToClipboard(
                    languageMode === 'darija'
                      ? `${selectedPreset.darija.hook}\n\n${selectedPreset.darija.body}\n\n${selectedPreset.darija.callToAction}`
                      : `${selectedPreset.french.hook}\n\n${selectedPreset.french.body}\n\n${selectedPreset.french.callToAction}`,
                    'full'
                  )
                }
                className="absolute top-3 right-3 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1 text-xs"
              >
                {copiedKey === 'full' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-medium">تم النسخ</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>نسخ الرسالة كاملة</span>
                  </>
                )}
              </button>

              <div className="text-xs text-slate-200 space-y-3 leading-relaxed pr-8">
                <p className="font-semibold text-emerald-300">
                  {languageMode === 'darija' ? selectedPreset.darija.hook : selectedPreset.french.hook}
                </p>
                <p>
                  {languageMode === 'darija' ? selectedPreset.darija.body : selectedPreset.french.body}
                </p>
                <p className="font-medium text-slate-300">
                  {languageMode === 'darija' ? selectedPreset.darija.callToAction : selectedPreset.french.callToAction}
                </p>
              </div>
            </div>

            {/* Follow up message if seen with no reply */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 relative">
              <button
                onClick={() =>
                  copyToClipboard(
                    languageMode === 'darija' ? selectedPreset.followUpDarija : selectedPreset.followUpFrench,
                    'followup'
                  )
                }
                className="absolute top-3 right-3 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1 text-xs"
              >
                {copiedKey === 'followup' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-medium">تم النسخ</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>نسخ التذكير</span>
                  </>
                )}
              </button>

              <p className="text-[11px] font-bold text-amber-400 mb-1">
                رسالة التذكير (Relance après 48h بدون رد) :
              </p>
              <p className="text-xs text-slate-300 pr-8 leading-relaxed">
                {languageMode === 'darija' ? selectedPreset.followUpDarija : selectedPreset.followUpFrench}
              </p>
            </div>
          </div>
        </div>

        {/* Custom AI Generator Sidebar */}
        <div className="lg:col-span-5 bg-[#111827] border border-slate-800 rounded-xl p-6 space-y-5">
          <div className="border-b border-slate-800 pb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <h3 className="text-base font-bold text-white">توليد رسالة مخصصة بالذكاء الاصطناعي</h3>
          </div>

          <form onSubmit={handleGenerateCustomPitch} className="space-y-4 text-xs">
            <div>
              <label className="text-slate-300 font-medium block mb-1">
                الخدمة اللي كتقدمها (مثال: تصميم متاجر، تصوير، ترجمة)
              </label>
              <input
                type="text"
                placeholder="Ex: Montages Reels pour agences immobilières"
                value={customService}
                onChange={(e) => setCustomService(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-white placeholder-slate-600 focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-slate-300 font-medium block mb-1">
                نوع الكليان المستهدف (Niche / Client cible)
              </label>
              <input
                type="text"
                placeholder="Ex: Agence immobilière à Casablanca ou Marrakech"
                value={customClient}
                onChange={(e) => setCustomClient(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-white placeholder-slate-600 focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-300 font-medium block mb-1">اللغة المفضلة</label>
                <select
                  value={customLanguage}
                  onChange={(e) => setCustomLanguage(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-2 text-white focus:border-emerald-500 focus:outline-none"
                >
                  <option value="Moroccan Darija">Moroccan Darija</option>
                  <option value="French">Français</option>
                  <option value="English">English</option>
                  <option value="Arabic">العربية الفصحى</option>
                </select>
              </div>

              <div>
                <label className="text-slate-300 font-medium block mb-1">قناة الإرسال</label>
                <select
                  value={customChannel}
                  onChange={(e) => setCustomChannel(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-2 text-white focus:border-emerald-500 focus:outline-none"
                >
                  <option value="Instagram DM">Instagram DM</option>
                  <option value="WhatsApp">WhatsApp</option>
                  <option value="Cold Email">Cold Email</option>
                  <option value="LinkedIn Message">LinkedIn</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={isGenerating || !customService || !customClient}
              className="w-full py-2.5 px-4 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>جاري إنشاء الرسالة...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>توليد الرسائل بـ Gemini AI</span>
                </>
              )}
            </button>
          </form>

          {/* AI Custom Pitch Result */}
          {aiPitchResult && (
            <div className="mt-4 p-4 rounded-xl bg-slate-900 border border-slate-800 relative space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-emerald-400">النتيجة المقترحة :</span>
                <button
                  onClick={() => copyToClipboard(aiPitchResult, 'ai-result')}
                  className="p-1 px-2 text-xs rounded bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1 cursor-pointer"
                >
                  {copiedKey === 'ai-result' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedKey === 'ai-result' ? 'تم النسخ' : 'نسخ'}</span>
                </button>
              </div>
              <div className="text-xs text-slate-200 whitespace-pre-line leading-relaxed max-h-60 overflow-y-auto">
                {aiPitchResult}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
