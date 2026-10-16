import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Sparkles,
  RefreshCw,
  Copy,
  Check,
  Calculator,
  FileText,
  Layers,
  ChevronRight,
  TrendingUp,
  User,
  Bot,
  AlertCircle
} from 'lucide-react';
import { BLUEPRINTS } from '../data/blueprints';
import { PITCH_PRESETS } from '../data/pitchPresets';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  actionCard?: {
    type: 'calculator' | 'pitch' | 'blueprint';
    title: string;
    payload?: any;
  };
}

const INITIAL_CONVERSATION: Message[] = [
  {
    id: 'intro-1',
    role: 'assistant',
    content: `وعليكم السلام ورحمة الله وبركاته ! مرحبا بيك أخاي / أختي. هاني معاك دابا محادثة مباشرة (Tête-à-tête) باش نحطو اليد فاليد ونديرو خطة حقيقية كيفاش تبدا تدخل الفلوس من اليوم.

باش نبداو نيشان وبلا زواق، جاوبني على هاد 3 النقط :
1. **شحال عندك د رأس المال فجيبك دابا ؟** (واش 0 درهم، 200 درهم، ولا 1,000 درهم+)
2. **واش عندك غير التيليفون (Smartphone) ولا حتى البيسي (PC) ؟**
3. **فاش كتحس براسك مرتاح كثر ؟** (البيع والشرا، المونتاج فـ CapCut والتصاور، ولا باغي تهضر مع محلات وتجيب صفقات؟)

كتب ليا جوابك دابا، ولا كليكي على واحد من الاقتراحات التحت 👇`,
    timestamp: 'دابا',
  },
];

const QUICK_PROMPTS = [
  'عندي 0 درهم وغير التيليفون وبغيت نبدا ندخل الفلوس',
  'عندي بين 500 و 1,000 درهم وبغيت التجارة الإلكترونية COD',
  'عندي بيسي وكنفهم فـ المونتاج وCanva، كيفاش نلقى أول كليان ؟',
  'عطيني أحسن فكرة سريعة ندخل بيها أول 1,000 درهم هاد السيمانة',
];

interface ConversationalPartnerProps {
  onOpenCalculators: () => void;
  onOpenPitches: () => void;
  onOpenBlueprints: () => void;
}

export const ConversationalPartner: React.FC<ConversationalPartnerProps> = ({
  onOpenCalculators,
  onOpenPitches,
  onOpenBlueprints,
}) => {
  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      const saved = localStorage.getItem('floussi_chat_history');
      return saved ? JSON.parse(saved) : INITIAL_CONVERSATION;
    } catch {
      return INITIAL_CONVERSATION;
    }
  });

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [isSpeakingId, setIsSpeakingId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    localStorage.setItem('floussi_chat_history', JSON.stringify(messages));
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Speech Recognition (Microphone Speech-to-Text)
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'ar-MA'; // Moroccan Arabic or fallback

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInput((prev) => (prev ? `${prev} ${transcript}` : transcript));
        }
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const toggleMic = () => {
    if (!recognitionRef.current) {
      alert('خاصية الصوت غير مدعومة فهاد المتصفح. يمكنك الكتابة عادي.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.error(err);
        setIsListening(false);
      }
    }
  };

  // Text-To-Speech (Browser Audio voice)
  const toggleSpeech = (text: string, id: string) => {
    if ('speechSynthesis' in window) {
      if (isSpeakingId === id) {
        window.speechSynthesis.cancel();
        setIsSpeakingId(null);
      } else {
        window.speechSynthesis.cancel();
        // Remove markdown stars, hashes
        const cleanText = text.replace(/[*#_`]/g, '');
        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.lang = 'ar-SA';
        utterance.rate = 0.95;
        utterance.onend = () => setIsSpeakingId(null);
        utterance.onerror = () => setIsSpeakingId(null);
        setIsSpeakingId(id);
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  const handleSend = async (customText?: string) => {
    const userText = customText || input;
    if (!userText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: userText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newHistory = [...messages, userMessage];
    setMessages(newHistory);
    if (!customText) setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newHistory.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await response.json();

      let actionCard = undefined;
      const lowerReply = (data.reply || '').toLowerCase();
      if (lowerReply.includes('حاسبة') || lowerReply.includes('profit') || lowerReply.includes('calcul')) {
        actionCard = {
          type: 'calculator' as const,
          title: 'فتح حاسبة الأرباح الصافية (COD & Freelance)',
        };
      } else if (lowerReply.includes('رسالة') || lowerReply.includes('dm') || lowerReply.includes('pitch')) {
        actionCard = {
          type: 'pitch' as const,
          title: 'عرض نماذج رسائل الكليان الجاهزة للإرسال',
        };
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.reply || 'سمح ليا، عاود كتب ليا مرة أخرى عفاك.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actionCard,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error(err);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'تعذر الاتصال بالخادم. تأكد من الإنترنت ديالك وعاود جرّب.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const copyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const resetChat = () => {
    if (confirm('واش باغي تبدا محادثة جديدة من الصفر؟')) {
      setMessages(INITIAL_CONVERSATION);
      localStorage.removeItem('floussi_chat_history');
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      setIsSpeakingId(null);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] max-w-5xl mx-auto px-2 sm:px-4">
      {/* Top Conversation Header */}
      <div className="py-3 px-4 bg-[#111827] border border-slate-800 rounded-t-2xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-white">Floussi Copilot</h2>
              <span className="text-[11px] text-emerald-400 font-mono">محادثة حية بالدارجة</span>
            </div>
            <p className="text-[11px] text-slate-400">
              شريكك المقاولاتي لمشاريع ودخول الفلوس بالمغرب
            </p>
          </div>
        </div>

        {/* Action Shortcuts */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenCalculators}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 rounded-lg transition-colors cursor-pointer"
            title="حاسبات الأرباح"
          >
            <Calculator className="w-3.5 h-3.5 text-emerald-400" />
            <span>حاسبة الأرباح</span>
          </button>

          <button
            onClick={onOpenPitches}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 rounded-lg transition-colors cursor-pointer"
            title="رسائل الكليان"
          >
            <FileText className="w-3.5 h-3.5 text-sky-400" />
            <span>رسائل الكليان</span>
          </button>

          <button
            onClick={resetChat}
            className="px-3 py-1.5 text-xs text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer flex items-center gap-1"
            title="إعادة المحادثة من الصفر"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">محادثة جديدة</span>
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#0E131F] border-x border-slate-800 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.role === 'assistant' && (
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 mt-1">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div
              className={`max-w-[90%] sm:max-w-[80%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed relative group ${
                msg.role === 'user'
                  ? 'bg-emerald-500 text-slate-950 font-medium rounded-tr-none'
                  : 'bg-[#151D2C] border border-slate-800 text-slate-200 rounded-tl-none shadow-md'
              }`}
            >
              {/* Message control buttons for assistant */}
              {msg.role === 'assistant' && (
                <div className="absolute top-2.5 right-2.5 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => toggleSpeech(msg.content, msg.id)}
                    className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                    title={isSpeakingId === msg.id ? 'إيقاف الصوت' : 'استماع للرد بصوت مسموع'}
                  >
                    {isSpeakingId === msg.id ? (
                      <VolumeX className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Volume2 className="w-3.5 h-3.5" />
                    )}
                  </button>

                  <button
                    onClick={() => copyText(msg.content, msg.id)}
                    className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                    title="نسخ"
                  >
                    {copiedId === msg.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              )}

              {/* Message Body with Markdown formatting */}
              <div className="whitespace-pre-line pr-2 leading-relaxed font-sans">
                {msg.content}
              </div>

              {/* Interactive Tool Card (Triggered by AI advice) */}
              {msg.actionCard && (
                <div className="mt-3 pt-3 border-t border-slate-700/60">
                  <button
                    onClick={() => {
                      if (msg.actionCard?.type === 'calculator') onOpenCalculators();
                      if (msg.actionCard?.type === 'pitch') onOpenPitches();
                      if (msg.actionCard?.type === 'blueprint') onOpenBlueprints();
                    }}
                    className="w-full py-2 px-3 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center justify-between cursor-pointer transition-colors"
                  >
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{msg.actionCard.title}</span>
                    </span>
                    <ChevronRight className="w-4 h-4 text-emerald-400" />
                  </button>
                </div>
              )}

              <div
                className={`text-[10px] mt-2 font-mono tabular-nums text-right ${
                  msg.role === 'user' ? 'text-slate-800' : 'text-slate-500'
                }`}
              >
                {msg.timestamp}
              </div>
            </div>

            {msg.role === 'user' && (
              <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 shrink-0 mt-1">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3 justify-start items-center text-xs text-emerald-400">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <RefreshCw className="w-4 h-4 animate-spin" />
            </div>
            <span className="animate-pulse">Floussi Copilot كيفكر وكيكتب ليك بالدارجة...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts Carousel */}
      <div className="p-2.5 bg-[#0E131F] border-x border-slate-800 flex items-center gap-2 overflow-x-auto">
        <span className="text-[11px] text-slate-500 whitespace-nowrap shrink-0">أجوبة سريعة :</span>
        {QUICK_PROMPTS.map((prompt, i) => (
          <button
            key={i}
            onClick={() => handleSend(prompt)}
            disabled={isLoading}
            className="text-xs text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 px-3 py-1.5 rounded-lg whitespace-nowrap shrink-0 transition-colors cursor-pointer"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Chat Input Bar with Voice Mic */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-3 bg-[#111827] border border-slate-800 rounded-b-2xl flex items-center gap-2 shadow-2xl"
      >
        <button
          type="button"
          onClick={toggleMic}
          className={`p-2.5 rounded-xl border transition-colors cursor-pointer shrink-0 ${
            isListening
              ? 'bg-red-500/20 border-red-500 text-red-400 animate-pulse'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
          }`}
          title={isListening ? 'جاري الاستماع... انقر للإيقاف' : 'تحدث بالصوت'}
        >
          {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
        </button>

        <input
          type="text"
          placeholder="جاوبني هنا بالدارجة، الفرنسية، أو العربية (أو انقر على الميكروفون)..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading}
          className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
        />

        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="px-5 py-2.5 bg-emerald-400 hover:bg-emerald-300 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
        >
          <span>إرسال</span>
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
