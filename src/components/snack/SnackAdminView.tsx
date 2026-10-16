import React, { useState, useRef } from 'react';
import { useSnack, MenuItem } from '../../context/SnackContext';
import {
  Flame,
  Plus,
  Trash2,
  Save,
  CheckCircle2,
  XCircle,
  Eye,
  Settings,
  DollarSign,
  Phone,
  QrCode,
  Sparkles,
  HelpCircle,
  ArrowRight,
  TrendingUp,
  RefreshCw,
  LogOut,
  Lock,
  Camera,
  Upload,
  Image as ImageIcon
} from 'lucide-react';

interface SnackAdminViewProps {
  onSwitchToClient: () => void;
}

const PRESET_FOOD_IMAGES = [
  {
    name: 'طاكوس مغربي',
    url: '/src/assets/images/snack_tacos_morocco_1792173196294.jpg',
  },
  {
    name: 'دوبل برغر',
    url: '/src/assets/images/snack_burger_gourmet_1792173197898.jpg',
  },
  {
    name: 'بيتزا إيطالية',
    url: '/src/assets/images/snack_pizza_artisan_1792173198435.jpg',
  },
];

export const SnackAdminView: React.FC<SnackAdminViewProps> = ({ onSwitchToClient }) => {
  const {
    settings,
    updateSettings,
    promo,
    updatePromo,
    menu,
    updateMenuItem,
    addMenuItem,
    deleteMenuItem,
    resetAllDefaults,
    logoutAdmin,
  } = useSnack();

  const [activeTab, setActiveTab] = useState<'promo' | 'prices' | 'settings' | 'pitch'>('prices');
  const [saveToast, setSaveToast] = useState<string | null>(null);

  // New item modal state
  const [isNewItemModalOpen, setIsNewItemModalOpen] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemNameDarija, setNewItemNameDarija] = useState('');
  const [newItemCategory, setNewItemCategory] = useState<MenuItem['category']>('tacos');
  const [newItemPrice, setNewItemPrice] = useState<number>(35);
  const [newItemDesc, setNewItemDesc] = useState('');
  const [newItemImage, setNewItemImage] = useState<string>(PRESET_FOOD_IMAGES[0].url);

  // Edit existing item image modal
  const [editingImageItemId, setEditingImageItemId] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const editFileInputRef = useRef<HTMLInputElement>(null);

  const showSavedNotification = (text: string) => {
    setSaveToast(text);
    setTimeout(() => setSaveToast(null), 2500);
  };

  // Handle phone camera or gallery upload (Converts to Base64 data URL so it works offline and instantaneously)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, isEditing = false) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('الصورة كبيرة بزاف. اختار صورة أصغر من 5 ميغابايت.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Url = event.target?.result as string;
      if (isEditing && editingImageItemId) {
        updateMenuItem(editingImageItemId, { image: base64Url });
        showSavedNotification('تم تغيير وتحديث صورة الوجبة بنجاح !');
        setEditingImageItemId(null);
      } else {
        setNewItemImage(base64Url);
        showSavedNotification('تم تحميل الصورة من هاتفك بنجاح !');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAddNewItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName || !newItemPrice) return;

    addMenuItem({
      name: newItemName,
      nameDarija: newItemNameDarija || newItemName,
      category: newItemCategory,
      price: Number(newItemPrice),
      description: newItemDesc || 'طبق شهي ومحضر طازج يومياً.',
      image: newItemImage || PRESET_FOOD_IMAGES[0].url,
      inStock: true,
    });

    setIsNewItemModalOpen(false);
    setNewItemName('');
    setNewItemNameDarija('');
    setNewItemDesc('');
    setNewItemImage(PRESET_FOOD_IMAGES[0].url);
    showSavedNotification('تمت إضافة الوجبة الجديدة بالصورة للمنيو بنجاح !');
  };

  const handleLogout = () => {
    logoutAdmin();
    onSwitchToClient();
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 pb-20">
      {/* Admin Top Header */}
      <header className="bg-[#111827] border-b border-slate-800 sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm font-bold text-white">لوحة تحكم المسير (Espace Gérant)</h1>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-mono">
                  جلسة آمنة (hamid123321)
                </span>
              </div>
              <p className="text-[11px] text-slate-400">{settings.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onSwitchToClient}
              className="px-3 py-1.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
              title="معاينة موقع الكليان"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>معاينة موقع الكليان</span>
            </button>

            <button
              onClick={handleLogout}
              className="px-3 py-1.5 text-xs text-slate-400 hover:text-red-400 hover:bg-slate-800 border border-slate-800 rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
              title="قفل لوحة التحكم وتسجيل الخروج"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">قفل</span>
            </button>
          </div>
        </div>
      </header>

      {/* Save Notification */}
      {saveToast && (
        <div className="fixed top-16 left-1/2 transform -translate-x-1/2 z-50 bg-emerald-500 text-slate-950 px-4 py-2 rounded-xl text-xs font-bold shadow-2xl flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4" />
          <span>{saveToast}</span>
        </div>
      )}

      {/* Main Tabs Navigation */}
      <main className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('prices')}
            className={`px-3.5 py-2 text-xs font-medium rounded-xl whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'prices'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>قائمة الوجبات وتغيير الصور (Menu & Photos)</span>
          </button>

          <button
            onClick={() => setActiveTab('promo')}
            className={`px-3.5 py-2 text-xs font-medium rounded-xl whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'promo'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>عروض وتخفيضات اليوم (Promos)</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-3.5 py-2 text-xs font-medium rounded-xl whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'settings'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>رقم الواتساب والعنوان (Paramètres)</span>
          </button>

          <button
            onClick={() => setActiveTab('pitch')}
            className={`px-3.5 py-2 text-xs font-medium rounded-xl whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'pitch'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>كيفاش تبيع هاد السيت وتشد 1,500 DH</span>
          </button>
        </div>

        {/* TAB 1: Menu Items, Prices & Photo Upload */}
        {activeTab === 'prices' && (
          <div className="bg-[#111827] border border-slate-800 rounded-2xl p-5 sm:p-7 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                  <span>تعديل أثمنة الوجبات وتغيير الصور مباشرة</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  تقدر تبدل صورة أي وجبة من كاميرا التيليفون أو من معرض الصور ديالك فـ ثانية.
                </p>
              </div>

              <button
                onClick={() => setIsNewItemModalOpen(true)}
                className="px-3.5 py-2 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة وجبة جديدة بالصورة</span>
              </button>
            </div>

            {/* Menu Items Cards */}
            <div className="space-y-3">
              {menu.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative group/img shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 rounded-lg object-cover bg-slate-800 border border-slate-700"
                      />
                      {/* Change image overlay button on click */}
                      <button
                        onClick={() => {
                          setEditingImageItemId(item.id);
                          editFileInputRef.current?.click();
                        }}
                        className="absolute inset-0 bg-black/60 rounded-lg flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity text-white cursor-pointer"
                        title="تغيير الصورة من التيليفون"
                      >
                        <Camera className="w-4 h-4 text-amber-400" />
                      </button>
                    </div>

                    <div>
                      <p className="text-xs font-bold text-white">
                        {item.nameDarija || item.name}
                      </p>
                      <p className="text-[11px] text-slate-400 capitalize">{item.category}</p>
                      <button
                        onClick={() => {
                          setEditingImageItemId(item.id);
                          editFileInputRef.current?.click();
                        }}
                        className="text-[11px] text-amber-400 hover:underline flex items-center gap-1 mt-1 cursor-pointer font-medium"
                      >
                        <Camera className="w-3 h-3" />
                        <span>تغيير صورة الوجبة من الهاتف</span>
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs">
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-400">الثمن :</span>
                      <div className="relative w-24">
                        <input
                          type="number"
                          value={item.price}
                          onChange={(e) =>
                            updateMenuItem(item.id, { price: Number(e.target.value) })
                          }
                          className="w-full bg-slate-950 border border-slate-700 rounded-md px-2 py-1 text-white font-mono font-bold text-right pr-7 focus:border-emerald-500 focus:outline-none"
                        />
                        <span className="absolute right-2 top-1 text-slate-500 font-mono text-[11px]">
                          DH
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        updateMenuItem(item.id, { inStock: !item.inStock });
                        showSavedNotification(
                          item.inStock
                            ? `تم وسم "${item.nameDarija}" كغير متوفر`
                            : `تم وسم "${item.nameDarija}" كمتوفر دابا`
                        );
                      }}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-colors cursor-pointer ${
                        item.inStock
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                          : 'bg-red-500/10 text-red-400 border border-red-500/30'
                      }`}
                    >
                      {item.inStock ? 'متوفر دابا ✅' : 'سالات السلعة ❌'}
                    </button>

                    <button
                      onClick={() => {
                        if (confirm(`واش باغي تحذف "${item.nameDarija}" نهائياً من المنيو؟`)) {
                          deleteMenuItem(item.id);
                          showSavedNotification('تم حذف الوجبة.');
                        }
                      }}
                      className="p-1 text-slate-500 hover:text-red-400 transition-colors cursor-pointer"
                      title="حذف"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Hidden file input for editing existing item image */}
            <input
              type="file"
              ref={editFileInputRef}
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileUpload(e, true)}
            />
          </div>
        )}

        {/* TAB 2: Daily Promo Manager */}
        {activeTab === 'promo' && (
          <div className="bg-[#111827] border border-slate-800 rounded-2xl p-5 sm:p-7 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Flame className="w-4 h-4 text-amber-400" />
                  <span>تعديل عرض اليوم الخارق (Promo du Jour)</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  هاد العرض كيطلع فشريط ملون فأعلى موقع الزبناء.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-medium text-slate-300">حالة العرض فالموقع :</span>
                <button
                  type="button"
                  onClick={() => {
                    updatePromo({ isActive: !promo.isActive });
                    showSavedNotification(promo.isActive ? 'تم إخفاء العرض من الموقع' : 'تم تفعيل وظهور العرض بالموقع !');
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    promo.isActive
                      ? 'bg-emerald-500 text-slate-950'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {promo.isActive ? 'مفعل وظاهر للزبناء ✅' : 'موقف مؤقتاً ❌'}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="sm:col-span-2">
                <label className="text-slate-300 font-medium block mb-1">
                  عنوان العرض بالدارجة (Titre de la promo)
                </label>
                <input
                  type="text"
                  value={promo.titleDarija}
                  onChange={(e) => updatePromo({ titleDarija: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-white font-medium focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-slate-300 font-medium block mb-1">
                  ثمن العرض المخفض (Prix Promo MAD)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={promo.promoPrice}
                    onChange={(e) => updatePromo({ promoPrice: Number(e.target.value) })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono font-bold focus:border-emerald-500 focus:outline-none"
                  />
                  <span className="absolute right-3 top-2 text-slate-500 font-mono">DH</span>
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-medium block mb-1">
                  الثمن القديم قبل التخفيض (Prix Barré)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={promo.originalPrice}
                    onChange={(e) => updatePromo({ originalPrice: Number(e.target.value) })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono font-bold focus:border-emerald-500 focus:outline-none"
                  />
                  <span className="absolute right-3 top-2 text-slate-500 font-mono">DH</span>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="text-slate-300 font-medium block mb-1">
                  وصف العرض ومكونات الوجبة
                </label>
                <textarea
                  rows={2}
                  value={promo.description}
                  onChange={(e) => updatePromo({ description: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-white font-medium focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                التعديلات تسجل تلقائياً ومحمية بالـ PIN السري.
              </span>
              <button
                type="button"
                onClick={() => {
                  showSavedNotification('تم حفظ العرض بنجاح وبان فالسيت !');
                  onSwitchToClient();
                }}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>حفظ ومعاينة النتيجة كزبون</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: Snack Coordinates & WhatsApp */}
        {activeTab === 'settings' && (
          <div className="bg-[#111827] border border-slate-800 rounded-2xl p-5 sm:p-7 space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Settings className="w-4 h-4 text-sky-400" />
                <span>إعدادات المحل، الواتساب، والرمز السري (PIN)</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="text-slate-300 font-medium block mb-1">
                  اسم السناك بالدارجة (Nom du Snack)
                </label>
                <input
                  type="text"
                  value={settings.nameDarija}
                  onChange={(e) => updateSettings({ nameDarija: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-slate-300 font-medium block mb-1">
                  رقم الواتساب لاستقبال الطلبات (مع الرمز الدولي 212)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={settings.whatsappNumber}
                    onChange={(e) => updateSettings({ whatsappNumber: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono focus:border-emerald-500 focus:outline-none"
                  />
                  <Phone className="w-3.5 h-3.5 text-slate-500 absolute right-3 top-2.5" />
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-medium block mb-1">
                  الرمز السري الخاص بك لدخول لوحة التحكم (Code PIN)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={settings.adminPin}
                    onChange={(e) => updateSettings({ adminPin: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono font-bold tracking-widest focus:border-emerald-500 focus:outline-none"
                  />
                  <Lock className="w-3.5 h-3.5 text-slate-500 absolute right-3 top-2.5" />
                </div>
                <p className="text-[10px] text-slate-400 mt-1">الرمز الحالي: hamid123321</p>
              </div>

              <div>
                <label className="text-slate-300 font-medium block mb-1">
                  سعر التوصيل العادي (Frais de livraison MAD)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={settings.deliveryFee}
                    onChange={(e) => updateSettings({ deliveryFee: Number(e.target.value) })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono focus:border-emerald-500 focus:outline-none"
                  />
                  <span className="absolute right-3 top-2 text-slate-500 font-mono">DH</span>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="text-slate-300 font-medium block mb-1">
                  العنوان بالتفصيل (Adresse exacte)
                </label>
                <input
                  type="text"
                  value={settings.address}
                  onChange={(e) => updateSettings({ address: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <button
                type="button"
                onClick={resetAllDefaults}
                className="text-xs text-slate-500 hover:text-red-400 cursor-pointer flex items-center gap-1"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>إعادة ضبط البيانات الأصلية</span>
              </button>

              <button
                type="button"
                onClick={() => showSavedNotification('تم حفظ الإعدادات بنجاح !')}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>حفظ التعديلات</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 4: Agency Guide */}
        {activeTab === 'pitch' && (
          <div className="bg-[#111827] border border-slate-800 rounded-2xl p-5 sm:p-7 space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-xs font-bold text-emerald-400">دليل البيع الميداني الحقيقي</span>
              <h2 className="text-lg font-bold text-white mt-1">
                كيفاش تشرح هاد السيستيم لمول السناك وتشد 1,500 درهم
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <p className="font-bold text-amber-400 text-sm">كيفاش كتدخل عندو ؟</p>
                <p className="text-slate-300 leading-relaxed font-sans">
                  "سلام خويا، السيت فيه لوحة تحكم سرية خاصة بيك نتا بوحدك بالرمز السري، تقدر تصور بها الساندويتشات بالكاميرا د التيليفون، أو تبدل الأثمنة وعروض اليوم فـ 10 ثواني بلا ما تحتاج تعيط لحتى شي مبرمج."
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <p className="font-bold text-emerald-400 text-sm">علاش مول السناك كيقبل ؟</p>
                <ul className="text-slate-300 space-y-1.5 leading-relaxed">
                  <li>• كيقدر يصور الطواجن والبرغر بكاميرا تيليفونو وتطلع فالسيت فالبلاصة.</li>
                  <li>• ما كيعطيش عمولة 30% لـ Glovo على كل طلبية.</li>
                  <li>• الكود QR كينقص عليه صداع طباعة المنيو فكل مرة كيتبدلو الأثمنة.</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Modal: Add New Dish With Picture Upload or Presets */}
      {isNewItemModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#151D2C] border border-slate-800 rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl my-8">
            <h3 className="text-base font-bold text-white">إضافة وجبة جديدة مع الصورة</h3>

            <form onSubmit={handleAddNewItem} className="space-y-4 text-xs">
              {/* Picture Upload / Preview Box */}
              <div>
                <label className="text-slate-300 block mb-1.5 font-bold">صورة الوجبة (Photo du plat)</label>
                <div className="flex items-center gap-4 p-3 bg-slate-900 border border-slate-800 rounded-xl">
                  <img
                    src={newItemImage}
                    alt="Preview"
                    className="w-16 h-16 rounded-lg object-cover bg-slate-800 border border-slate-700 shrink-0"
                  />
                  <div className="space-y-1.5 flex-1">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full py-2 px-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-lg flex items-center justify-center gap-1.5 cursor-pointer transition-colors text-xs"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>تصوير بالكاميرا أو رفع من الهاتف</span>
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, false)}
                    />
                    <p className="text-[10px] text-slate-400">
                      يمكنك التقاط صورة فورية بكاميرا الهاتف أو اختيارها من المعرض.
                    </p>
                  </div>
                </div>

                {/* Pre-made food photos quick selector */}
                <div className="mt-2 space-y-1">
                  <span className="text-[11px] text-slate-400 block">أو اختر صورة جاهزة بنقرة واحدة :</span>
                  <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    {PRESET_FOOD_IMAGES.map((img, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setNewItemImage(img.url)}
                        className={`flex items-center gap-1.5 p-1 rounded-lg border cursor-pointer shrink-0 transition-all ${
                          newItemImage === img.url
                            ? 'border-amber-400 bg-amber-400/10'
                            : 'border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <img src={img.url} alt={img.name} className="w-8 h-8 rounded object-cover" />
                        <span className="text-[10px] text-slate-300 pr-1">{img.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="text-slate-300 block mb-1">اسم الوجبة بالدارجة / العربية</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: طاكوس دجاج وموتزاريلا"
                  value={newItemNameDarija}
                  onChange={(e) => setNewItemNameDarija(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1">اسم الوجبة بالفرنسية</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Tacos Poulet Mozza"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 block mb-1">الصنف (Catégorie)</label>
                  <select
                    value={newItemCategory}
                    onChange={(e) => setNewItemCategory(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-2 text-white focus:border-emerald-500 focus:outline-none"
                  >
                    <option value="tacos">طاكوس (Tacos)</option>
                    <option value="burgers">برغر (Burgers)</option>
                    <option value="pizzas">بيتزا (Pizzas)</option>
                    <option value="plats">أطباق (Plats)</option>
                    <option value="boissons">مشروبات (Boissons)</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 block mb-1">الثمن (MAD)</label>
                  <input
                    type="number"
                    required
                    value={newItemPrice}
                    onChange={(e) => setNewItemPrice(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 block mb-1">وصف المكونات</label>
                <input
                  type="text"
                  placeholder="المكونات والصلصات..."
                  value={newItemDesc}
                  onChange={(e) => setNewItemDesc(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsNewItemModalOpen(false)}
                  className="px-3 py-2 rounded-lg text-slate-400 hover:text-white cursor-pointer"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg cursor-pointer transition-colors"
                >
                  إضافة الوجبة بالصورة للمنيو الآن
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
