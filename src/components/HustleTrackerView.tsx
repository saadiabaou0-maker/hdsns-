import React, { useState, useEffect } from 'react';
import { HustleLog } from '../types';
import { Plus, CheckCircle2, Circle, DollarSign, Send, PhoneCall, Trash2, TrendingUp } from 'lucide-react';

const INITIAL_LOGS: HustleLog[] = [
  {
    id: '1',
    date: 'Aujourd\'hui',
    type: 'outreach',
    note: 'إرسال 5 رسائل DM لمقاهي ومطاعم في الحي لعرض فيديو ريلز تجريبي',
    status: 'completed',
  },
  {
    id: '2',
    date: 'Hier',
    type: 'content-published',
    note: 'تصميم نموذج دعوة عرس رقمية على كانفا ووضعها في تيك توك',
    status: 'completed',
  },
  {
    id: '3',
    date: 'Ce mois-ci',
    type: 'closed-deal',
    note: 'إغلاق أول كليان شهري لإدارة ريلز متجر ملابس (Acompte 50%)',
    amountMAD: 1000,
    status: 'completed',
  },
];

export const HustleTrackerView: React.FC = () => {
  const [logs, setLogs] = useState<HustleLog[]>(() => {
    try {
      const saved = localStorage.getItem('floussi_hustle_logs');
      return saved ? JSON.parse(saved) : INITIAL_LOGS;
    } catch {
      return INITIAL_LOGS;
    }
  });

  const [note, setNote] = useState('');
  const [type, setType] = useState<HustleLog['type']>('outreach');
  const [amount, setAmount] = useState<string>('');

  useEffect(() => {
    localStorage.setItem('floussi_hustle_logs', JSON.stringify(logs));
  }, [logs]);

  const handleAddLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!note.trim()) return;

    const newLog: HustleLog = {
      id: Date.now().toString(),
      date: 'اليوم',
      type,
      note: note.trim(),
      amountMAD: amount ? Number(amount) : undefined,
      status: 'completed',
    };

    setLogs([newLog, ...logs]);
    setNote('');
    setAmount('');
  };

  const handleDelete = (id: string) => {
    setLogs(logs.filter((l) => l.id !== id));
  };

  const toggleStatus = (id: string) => {
    setLogs(
      logs.map((l) =>
        l.id === id
          ? { ...l, status: l.status === 'completed' ? 'pending' : 'completed' }
          : l
      )
    );
  };

  const totalEarned = logs
    .filter((l) => l.status === 'completed' && l.amountMAD)
    .reduce((acc, curr) => acc + (curr.amountMAD || 0), 0);

  const totalOutreach = logs.filter((l) => l.type === 'outreach').length;
  const dealsClosed = logs.filter((l) => l.type === 'closed-deal' && l.status === 'completed').length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="pb-2 border-b border-slate-800">
        <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-emerald-400" />
          <span>سجل المهام والمداخيل اليومية (Daily Hustle Pipeline)</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          تبع اتصالاتك مع الكليان، الرسائل المرسلة، والمبالغ المالية لي دخلتي. البيزنس كيبدا بالفعل اليومي.
        </p>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-[#111827] border border-slate-800">
          <p className="text-xs text-slate-400">مجموع المداخيل المسجلة</p>
          <p className="text-2xl font-extrabold text-emerald-400 font-mono tabular-nums mt-1">
            {totalEarned.toLocaleString()} DH
          </p>
          <p className="text-[11px] text-slate-500 mt-1">أرباح صافية بالدرهم المغربي</p>
        </div>

        <div className="p-4 rounded-xl bg-[#111827] border border-slate-800">
          <p className="text-xs text-slate-400">حملات التواصل (DMs & Outreach)</p>
          <p className="text-2xl font-extrabold text-white font-mono tabular-nums mt-1">
            {totalOutreach}
          </p>
          <p className="text-[11px] text-slate-500 mt-1">رسائل موجهة لمحلات وكليان</p>
        </div>

        <div className="p-4 rounded-xl bg-[#111827] border border-slate-800">
          <p className="text-xs text-slate-400">صفقات مغلقة بنجاح</p>
          <p className="text-2xl font-extrabold text-sky-400 font-mono tabular-nums mt-1">
            {dealsClosed}
          </p>
          <p className="text-[11px] text-slate-500 mt-1">عقود شهرية ومبيعات مباشرة</p>
        </div>
      </div>

      {/* Add New Action Form */}
      <div className="bg-[#111827] border border-slate-800 rounded-xl p-6">
        <h3 className="text-sm font-bold text-white mb-4">تسجيل خطوة أو دخل مالي جديد :</h3>

        <form onSubmit={handleAddLog} className="grid grid-cols-1 sm:grid-cols-12 gap-3 text-xs">
          <div className="sm:col-span-3">
            <label className="text-slate-400 block mb-1">نوع النشاط</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as any)}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-white focus:border-emerald-500 focus:outline-none"
            >
              <option value="outreach">إرسال DMs / تواصل</option>
              <option value="call">اتصال / لقاء مع كليان</option>
              <option value="closed-deal">صفقة مغلقة / مدخول (DH)</option>
              <option value="content-published">نشر محتوى / تصوير</option>
            </select>
          </div>

          <div className="sm:col-span-6">
            <label className="text-slate-400 block mb-1">تفاصيل الخطوة المنجزة</label>
            <input
              type="text"
              placeholder="مثال: رسلت 10 رسائل فأنستغرام لأطباء أسنان فكازا..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-white placeholder-slate-600 focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="text-slate-400 block mb-1">المبلغ المكتسب (اختياري)</label>
            <div className="relative">
              <input
                type="number"
                placeholder="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono focus:border-emerald-500 focus:outline-none"
              />
              <span className="absolute right-2.5 top-2 text-slate-500 font-mono">DH</span>
            </div>
          </div>

          <div className="sm:col-span-1 flex items-end">
            <button
              type="submit"
              disabled={!note.trim()}
              className="w-full py-2 bg-emerald-400 hover:bg-emerald-300 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-bold rounded-lg transition-colors flex items-center justify-center cursor-pointer"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>

      {/* Logs Table / List */}
      <div className="bg-[#111827] border border-slate-800 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-sm font-bold text-white">الأنشطة المسجلة مؤخراً</h3>
          <span className="text-xs text-slate-400 font-mono tabular-nums">{logs.length} عمليات</span>
        </div>

        <div className="divide-y divide-slate-800/80">
          {logs.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400">
              ما كاين حتى نشاط مسجل دابا. سجل أول خطوة درتيها اليوم !
            </div>
          ) : (
            logs.map((log) => (
              <div
                key={log.id}
                className="p-4 px-6 flex items-center justify-between gap-4 hover:bg-slate-900/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleStatus(log.id)}
                    className="text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer"
                  >
                    {log.status === 'completed' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Circle className="w-4 h-4 text-slate-500" />
                    )}
                  </button>

                  <div>
                    <p
                      className={`text-xs text-white leading-relaxed ${
                        log.status === 'completed' ? '' : 'line-through text-slate-500'
                      }`}
                    >
                      {log.note}
                    </p>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                      <span className="font-mono text-emerald-400/90">{log.date}</span>
                      <span aria-hidden="true">·</span>
                      <span className="capitalize text-slate-400">{log.type}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {log.amountMAD !== undefined && log.amountMAD > 0 && (
                    <span className="text-xs font-bold text-emerald-400 font-mono tabular-nums bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-md">
                      +{log.amountMAD} DH
                    </span>
                  )}

                  <button
                    onClick={() => handleDelete(log.id)}
                    className="text-slate-500 hover:text-red-400 transition-colors p-1 cursor-pointer"
                    title="حذف"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
